import React, { useState, useEffect } from "react";
import axios from "axios";
import { CarFront, ClipboardList } from "lucide-react"; // ikonlar

import AracList from "./components/AracList";
import AddVehicleForm from "./components/AddVehicleForm";
import RequestForm from "./components/RequestForm";
import TakeVehicleForm from "./components/TakeVehicleForm";
import ReturnVehicleForm from "./components/ReturnVehicleForm";
import UpdateTimeForm from "./components/UpdateTimeForm";
import RequestsPanel from "./components/RequestsPanel";
import Notification from "./components/Notification";
import UpdateVehicleForm from "./components/UpdateVehicleForm";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function App() {
  const [vehicles, setVehicles] = useState([]);
  const [requests, setRequests] = useState([]);
  const [notif, setNotif] = useState(null);

  const [addForm, setAddForm] = useState({
    plaka: "",
    yer: "",
    tahsis: false,
    tahsisli: "",
  });
  const [requestForm, setRequestForm] = useState({
    kullanan: "",
    yer: "",
    gidilecek_yer: "",
    baslangic: "",
    son: "Belli değil",
    neden: "Yok",
    aciliyet: "Yok",
  });
  const [takeForm, setTakeForm] = useState({
    plaka: "",
    kullanan: "",
    yer: "",
    baslangic: "",
    son: "",
    neden: "",
  });
  const [returnForm, setReturnForm] = useState({
    plaka: "",
    yer: "",
    son: "",
    neden: "İş",
  });
  const [timeForm, setTimeForm] = useState({ plaka: "", son: "" });
  const [updateForm, setUpdateForm] = useState({
    plaka: "",
    yer: "",
    durum: "",
    kullanan: "",
    baslangic: "",
    son: "",
    tahsis: false,
    tahsisli: "",
  });

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    await Promise.all([fetchVehicles(), fetchRequests()]);
  }

  async function fetchVehicles() {
    try {
      const res = await axios.get(`${API}/araclar`);
      setVehicles(res.data || []);
    } catch (err) {
      showError(err);
    }
  }

  async function fetchRequests() {
    try {
      const res = await axios.get(`${API}/istekler`);
      setRequests(res.data || []);
    } catch (err) {
      showError(err);
    }
  }

  function showSuccess(message) {
    setNotif({ type: "success", message });
    setTimeout(() => setNotif(null), 3000);
  }
  function showError(err) {
    const message =
      err?.response?.data?.detail || err?.message || JSON.stringify(err);
    setNotif({ type: "error", message });
    setTimeout(() => setNotif(null), 5000);
  }

  async function handleAddVehicle(e) {
    e?.preventDefault();
    await axios.post(`${API}/arac_ekle`, addForm);
    showSuccess("Araç eklendi");
    setAddForm({ plaka: "", yer: "", tahsis: false, tahsisli: "" });
    await fetchVehicles();
  }

  async function handleCreateRequest(e) {
    e.preventDefault();
    try {
      await axios.post(`${API}/istek_olustur`, requestForm);
      showSuccess("İstek oluşturuldu");
      setRequestForm({
        kullanan: "",
        yer: "",
        gidilecek_yer: "",
        baslangic: "",
        son: "Belli değil",
        neden: "Yok",
        aciliyet: "Yok",
      });
      await fetchRequests();
    } catch (err) {
      showError(err);
    }
  }

  async function handleUpdateVehicle(e) {
    e.preventDefault();
    try {
      const payload = { ...updateForm };
      delete payload.plaka;
      await axios.put(
        `${API}/arac_guncelle/${encodeURIComponent(updateForm.plaka)}`,
        payload
      );
      showSuccess("Araç güncellendi");
      setUpdateForm({
        plaka: "",
        yer: "",
        durum: "",
        kullanan: "",
        baslangic: "",
        son: "",
        tahsis: false,
        tahsisli: "",
      });
      await fetchVehicles();
    } catch (err) {
      showError(err);
    }
  }

  async function handleTakeVehicle(plaka) {
    await axios.post(
      `${API}/uzerine_al/${encodeURIComponent(plaka)}`,
      takeForm
    );
    showSuccess("Araç üzerine alındı");
    await loadAll();
  }

  async function handleReturnVehicle(e) {
    e?.preventDefault();
    await axios.post(`${API}/iade`, returnForm);
    showSuccess("Araç iade edildi");
    setReturnForm({ plaka: "", yer: "", son: "", neden: "İş" });
    await fetchVehicles();
  }

  async function handleUpdateTime(e) {
    e?.preventDefault();
    await axios.post(
      `${API}/saat_guncelle/${encodeURIComponent(timeForm.plaka)}`,
      null,
      { params: { son: timeForm.son } }
    );
    showSuccess("Saat güncellendi");
    setTimeForm({ plaka: "", son: "" });
    await fetchVehicles();
  }

  async function handleDeleteRequestByKullanan(kullanan) {
    try {
      await axios.delete(`${API}/istek_sil`, { params: { kullanan } });
      showSuccess("İstek silindi");
      await fetchRequests();
    } catch (err) {
      showError(err);
    }
  }

  function prefillTakeFormFromVehicle(arac) {
    setTakeForm({
      plaka: arac.plaka,
      kullanan: "",
      yer: arac.yer || "",
      baslangic: "",
      son: "",
      neden: "",
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8">
      <header className="max-w-6xl mx-auto mb-8">
        <h1 className="text-4xl font-extrabold text-blue-800 flex items-center gap-3">
          <CarFront className="w-10 h-10 text-blue-600" />
          Araç Tahsis Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Araçları ve istekleri kolayca yönetin 🚗✅
        </p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* SOL TARAF: Araçlar */}
        <section className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-700">
              <CarFront className="w-6 h-6 text-blue-600" />
              Araç Listesi
            </h2>
            <AracList
              vehicles={vehicles}
              onHazirla={prefillTakeFormFromVehicle}
              onUzerineAl={handleTakeVehicle}
            />
          </div>

          {/* Araç İşlemleri */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 space-y-6">
            <h2 className="text-xl font-bold text-blue-700">Araç İşlemleri</h2>
            <AddVehicleForm
              addForm={addForm}
              setAddForm={setAddForm}
              onSubmit={handleAddVehicle}
            />
            <UpdateVehicleForm
              updateForm={updateForm}
              setUpdateForm={setUpdateForm}
              onSubmit={handleUpdateVehicle}
            />
            <TakeVehicleForm
              takeForm={takeForm}
              setTakeForm={setTakeForm}
              onSubmit={handleTakeVehicle}
            />
            <ReturnVehicleForm
              returnForm={returnForm}
              setReturnForm={setReturnForm}
              onSubmit={handleReturnVehicle}
            />
            <UpdateTimeForm
              timeForm={timeForm}
              setTimeForm={setTimeForm}
              onSubmit={handleUpdateTime}
            />
          </div>
        </section>

        {/* SAĞ TARAF: İstekler */}
        <section className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-green-700">
              <ClipboardList className="w-6 h-6 text-green-600" />
              İstek Listesi
            </h2>
            <RequestsPanel
              requests={requests}
              onDelete={handleDeleteRequestByKullanan}
              onTake={(it) => {
                setTakeForm((s) => ({
                  ...s,
                  plaka: "",
                  kullanan: it.kullanan,
                  yer: it.yer,
                  baslangic: it.baslangic,
                  son: "",
                  neden: "",
                }));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>

          {/* İstek İşlemleri */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 space-y-6">
            <h2 className="text-xl font-bold text-green-700">İstek İşlemleri</h2>
            <RequestForm
              requestForm={requestForm}
              setRequestForm={setRequestForm}
              onSubmit={handleCreateRequest}
            />
          </div>
        </section>
      </main>

      {notif && <Notification notif={notif} />}
    </div>
  );
}
