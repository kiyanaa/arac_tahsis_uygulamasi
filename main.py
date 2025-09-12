from fastapi import FastAPI, HTTPException
from fastapi import Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker, Session


Base = declarative_base()# Veritabanı bağlantısı
engine = create_engine("sqlite:///araclar.db")
SessionLocal = sessionmaker(bind=engine)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def arac_ekle(db = Depends(get_db), plaka: str = "34ABC01", yer: str = "Bölge1", tahsis: bool = False, tahsisli: str = ""):
    # Aynı plaka var mı kontrol
    mevcut = db.query(AracDB).filter(AracDB.plaka == plaka).first()
    if mevcut:
        raise HTTPException(status_code=400, detail="Bu plaka zaten mevcut")
    
    yeni_arac = AracDB(plaka=plaka, yer=yer, tahsis=tahsis, tahsisli=tahsisli)
    db.add(yeni_arac)
    db.commit()
    db.refresh(yeni_arac)  # eklenen veriyi geri al
    return yeni_arac

# Arac tablosu
class AracDB(Base):
    __tablename__ = "araclar"
    id = Column(Integer, primary_key=True, index=True)
    plaka = Column(String, unique=True, index=True)
    yer = Column(String)
    durum = Column(String, default="uygun")  # kullanımda, uygun, istekte gibi
    konum = Column(String, nullable=True)     # aracın o anki konumu
    kullanan = Column(String, nullable=True)  # aracı kullanan kişi
    baslangic = Column(String, nullable=True)
    son = Column(String, nullable=True)
    tahsis = Column(Boolean, default=False)  # True/False
    tahsisli = Column(String, nullable=True) # tahsis edilen kişi

# Tabloyu oluştur
Base.metadata.create_all(bind=engine)
class IstekDB(Base):
    __tablename__ = "istekler"
    id = Column(Integer, primary_key=True, index=True)
    kullanan = Column(String, index=True)
    yer = Column(String)
    gidilecek_yer = Column(String)
    baslangic = Column(String)
    son = Column(String, default="Belli değil")
    neden = Column(String, default="Yok")
    aciliyet = Column(String, default="Yok")

# Tabloyu oluştur
Base.metadata.create_all(bind=engine)




app = FastAPI(title="Araç Tahsis Uygulaması")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or set to ["http://localhost:5173"] for Vite default
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------
# Modeller
# ----------------------------
class UpdateVehicleForm(BaseModel):
    yer: Optional[str] = None
    durum: Optional[str] = None
    kullanan: Optional[str] = None
    baslangic: Optional[str] = None
    son: Optional[str] = None
    tahsis: Optional[bool] = None
    tahsisli: Optional[str] = None

class IstekModel(BaseModel):
    kullanan: str
    yer: str
    gidilecek_yer: str
    baslangic: str
    son: Optional[str] = "Belli değil"
    neden: Optional[str] = "Yok"
    aciliyet: Optional[str] = "Yok"

class IadeModel(BaseModel):
    plaka: str
    yer: str
    son: str
    neden: Optional[str] = "İş"

class UzerineAlModel(BaseModel):
    kullanan: str
    yer: str
    baslangic: str
    son: str
    neden: str

class AracCreate(BaseModel):
    plaka: str
    yer: str
    tahsis: bool = False
    tahsisli: str = None

# ----------------------------
# Veri Sınıfları
# ----------------------------
class Istek:
    def __init__(self, model: IstekModel):
        self.kullanan = model.kullanan
        self.yer = model.yer
        self.gidilecek_yer = model.gidilecek_yer
        self.baslangic = model.baslangic
        self.son = model.son
        self.neden = model.neden
        self.aciliyet = model.aciliyet

    def istek_bilgileri(self):
        return self.__dict__

class Arac:
    def __init__(self, plaka: str, yer: str):
        self.plaka = plaka
        self.yer = yer
        self.tahsis = False
        self.kisi = None
        self.durum = "uygun"
        self.kullanan = None
        self.baslangic = None
        self.son = None
        self.neden = None

    def uzerine_al(self, model: UzerineAlModel):
        self.kullanan = model.kullanan
        self.durum = "kullanımda"
        self.yer = model.yer
        self.baslangic = model.baslangic
        self.son = model.son
        self.neden = model.neden

    def arac_iade(self, model: IadeModel):
        self.durum = "uygun"
        self.kullanan = None
        self.yer = model.yer
        self.baslangic = None
        self.son = model.son
        self.neden = model.neden

    def saat_guncelle(self, son: str):
        self.son = son

    def arac_bilgileri(self):
        return {
            "plaka": self.plaka,
            "tahsis": self.tahsis,
            "tahsisli kişi": self.kisi,
            "durum": self.durum,
            "kullanan": self.kullanan,
            "yer": self.yer,
            "baslangic": self.baslangic,
            "son": self.son,
            "neden": self.neden
        }



def init_istek_listesi():
    db = next(get_db())
    return db.query(IstekDB).all()

istek_listesi = init_istek_listesi()

def init_arac_listesi():
    db = next(get_db())
    return db.query(AracDB).all()

arac_listesi = init_arac_listesi()


# ----------------------------
# Endpoints
# ----------------------------


@app.get("/araclar")
def get_araclar(db = Depends(get_db)):
    return db.query(AracDB).all()

@app.get("/araclar/{plaka}")
def get_arac_by_plaka(plaka: str, db: Session = Depends(get_db)):
    arac = db.query(AracDB).filter(AracDB.plaka == plaka).first()
    if not arac:
        raise HTTPException(status_code=404, detail="Araç bulunamadı")
    return arac

@app.get("/istekler")
def get_istekler(db: Session = Depends(get_db)):
    return db.query(IstekDB).all()

@app.post("/istek_olustur")
def arac_iste(model: IstekModel, db: Session = Depends(get_db)):
    mevcut = db.query(IstekDB).filter(IstekDB.kullanan == model.kullanan).first()
    if mevcut:
        raise HTTPException(status_code=400, detail="Kişinin zaten bir isteği var")
    
    yeni_istek = IstekDB(
        kullanan=model.kullanan,
        yer=model.yer,
        gidilecek_yer=model.gidilecek_yer,
        baslangic=model.baslangic,
        son=model.son,
        neden=model.neden,
        aciliyet=model.aciliyet
    )
    db.add(yeni_istek)
    db.commit()
    db.refresh(yeni_istek)
    
    return {"status": "İstek oluşturuldu", "istek": {
        "id": yeni_istek.id,
        "kullanan": yeni_istek.kullanan,
        "yer": yeni_istek.yer,
        "gidilecek_yer": yeni_istek.gidilecek_yer,
        "baslangic": yeni_istek.baslangic,
        "son": yeni_istek.son,
        "neden": yeni_istek.neden,
        "aciliyet": yeni_istek.aciliyet
    }}

@app.post("/uzerine_al/{plaka}")
def arac_uzerine_al(plaka: str, model: UzerineAlModel, db: Session = Depends(get_db)):
    arac = db.query(AracDB).filter(AracDB.plaka == plaka).first()
    if not arac:
        raise HTTPException(status_code=404, detail="Araç bulunamadı")
    if arac.kullanan == "" or arac.kullanan == None:
        arac.kullanan = model.kullanan
        arac.durum = "kullanımda"
        arac.yer = model.yer
        arac.baslangic = model.baslangic
        arac.son = model.son
        arac.neden = model.neden
    

        db.commit()
        db.refresh(arac)
        # Eğer kullanıcı için bir istek varsa sil (aynı session içinde yeniden sorgula)
        istek = db.query(IstekDB).filter(IstekDB.kullanan == model.kullanan).first()
        if istek:
            db.delete(istek)
            db.commit()
    else:
        raise HTTPException(status_code=400, detail="Araç zaten kullanımda")
    
    return {"status": "Araç üzerine alındı", "arac": arac.__dict__}

@app.post("/iade")
def arac_iade(model: IadeModel, db: Session = Depends(get_db)):
    arac = db.query(AracDB).filter(AracDB.plaka == model.plaka).first()
    if not arac:
        raise HTTPException(status_code=404, detail="Araç bulunamadı")
    
    arac.durum = "uygun"
    arac.kullanan = None
    arac.yer = model.yer
    arac.baslangic = None
    arac.son = model.son
    arac.neden = model.neden

    db.commit()
    db.refresh(arac)
    return {"status": "Araç iade edildi", "arac": arac.__dict__}

@app.post("/saat_guncelle/{plaka}")
def arac_saat_guncelle(plaka: str, son: str, db: Session = Depends(get_db)):
    arac = db.query(AracDB).filter(AracDB.plaka == plaka).first()
    if not arac:
        raise HTTPException(status_code=404, detail="Araç bulunamadı")
    
    arac.son = son
    db.commit()
    db.refresh(arac)
    return {"status": "Araç saat güncellendi", "arac": arac.__dict__}

@app.post("/arac_ekle")
def arac_ekle(arac: AracCreate, db = Depends(get_db)):
    # Aynı plaka var mı kontrol
    mevcut = db.query(AracDB).filter(AracDB.plaka == arac.plaka).first()
    if mevcut:
        raise HTTPException(status_code=400, detail="Bu plaka zaten mevcut")
    
    yeni_arac = AracDB(
        plaka=arac.plaka,
        yer=arac.yer,
        tahsis=arac.tahsis,
        tahsisli=arac.tahsisli
    )
    db.add(yeni_arac)
    db.commit()
    db.refresh(yeni_arac)
    return {"status": "Araç eklendi", "arac": {
        "id": yeni_arac.id,
        "plaka": yeni_arac.plaka,
        "yer": yeni_arac.yer,
        "tahsis": yeni_arac.tahsis,
        "tahsisli": yeni_arac.tahsisli
    }}

@app.put("/arac_guncelle/{plaka}")
def update_vehicle(plaka: str, form: UpdateVehicleForm, db: Session = Depends(get_db)):
    arac = db.query(AracDB).filter(AracDB.plaka == plaka).first()
    if not arac:
        raise HTTPException(status_code=404, detail="Araç bulunamadı")

    for key, value in form.dict(exclude_unset=True).items():
        setattr(arac, key, value)

    db.commit()
    db.refresh(arac)
    return {"status": "Araç güncellendi", "arac": arac.__dict__}

@app.delete("/araclar/{plaka}")
def delete_arac(plaka: str, db: Session = Depends(get_db)):

    arac = db.query(AracDB).filter(AracDB.plaka == plaka).first()
    if not arac:
        raise HTTPException(status_code=404, detail="Araç bulunamadı")

    db.delete(arac)
    db.commit()
    return {"status": "Araç silindi", "plaka": plaka}
@app.delete("/istek_sil")
def istek_sil( kullanan: str, db: Session = Depends(get_db)):
    if kullanan is None:
        raise HTTPException(status_code=400, detail="Silmek için kullanan belirtilmeli")
    
    query = db.query(IstekDB)
    
    if kullanan is not None:
        query = query.filter(IstekDB.kullanan == kullanan)
    
    istek = query.first()
    if not istek:
        raise HTTPException(status_code=404, detail="İstek bulunamadı")
    
    db.delete(istek)
    db.commit()
    
    return {"status": "İstek silindi", "kullanan": istek.kullanan}


