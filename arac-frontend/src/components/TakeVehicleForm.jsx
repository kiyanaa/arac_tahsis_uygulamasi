export default function TakeVehicleForm({ takeForm, setTakeForm, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <h3 className="font-semibold text-lg text-gray-700">🚙 Araç Üzerine Al</h3>

      <input
        placeholder="Plaka"
        required
        value={takeForm.plaka}
        onChange={e => setTakeForm(s => ({ ...s, plaka: e.target.value }))}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400"
      />

      <input
        placeholder="Kullanan"
        required
        value={takeForm.kullanan}
        onChange={e => setTakeForm(s => ({ ...s, kullanan: e.target.value }))}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400"
      />

      <input
        placeholder="Gidilecek Yer"
        required
        value={takeForm.gidilecek_yer}
        onChange={e => setTakeForm(s => ({ ...s, gidilecek_yer: e.target.value }))}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400"
      />

      <input
        type="datetime-local"
        placeholder="Başlangıç Saati"
        required
        value={takeForm.baslangic_saati}
        onChange={e => setTakeForm(s => ({ ...s, baslangic_saati: e.target.value }))}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400"
      />

      <input
        type="datetime-local"
        placeholder="Bitiş Saati"
        required
        value={takeForm.bitis_saati}
        onChange={e => setTakeForm(s => ({ ...s, bitis_saati: e.target.value }))}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400"
      />

      <input
        placeholder="Neden"
        value={takeForm.neden}
        onChange={e => setTakeForm(s => ({ ...s, neden: e.target.value }))}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400"
      />

      <button className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
        Üzerine Al
      </button>
    </form>
  );
}
