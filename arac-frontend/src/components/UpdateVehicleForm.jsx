export default function UpdateVehicleForm({ updateForm, setUpdateForm, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <h3 className="font-semibold text-lg text-gray-700">🛠️ Araç Güncelle</h3>

      <input
        placeholder="Plaka"
        required
        value={updateForm.plaka}
        onChange={e => setUpdateForm(s => ({ ...s, plaka: e.target.value }))}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
      />

      <input
        placeholder="Yer"
        value={updateForm.yer}
        onChange={e => setUpdateForm(s => ({ ...s, yer: e.target.value }))}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
      />

      <input
        placeholder="Kullanan"
        value={updateForm.kullanan}
        onChange={e => setUpdateForm(s => ({ ...s, kullanan: e.target.value }))}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
      />

      <input
        type="datetime-local"
        placeholder="Başlangıç"
        value={updateForm.baslangic}
        onChange={e => setUpdateForm(s => ({ ...s, baslangic: e.target.value }))}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
      />

      <input
        type="datetime-local"
        placeholder="Bitiş"
        value={updateForm.son}
        onChange={e => setUpdateForm(s => ({ ...s, son: e.target.value }))}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
      />

      <input
        placeholder="Durum"
        value={updateForm.durum}
        onChange={e => setUpdateForm(s => ({ ...s, durum: e.target.value }))}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
      />

      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600">Tahsisli mi?</label>
        <input
          type="checkbox"
          checked={updateForm.tahsis}
          onChange={e => setUpdateForm(s => ({ ...s, tahsis: e.target.checked }))}
        />
        <input
          placeholder="Tahsisli Kişi"
          value={updateForm.tahsisli}
          onChange={e => setUpdateForm(s => ({ ...s, tahsisli: e.target.value }))}
          className="p-2 border rounded-lg flex-1 focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <button className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
        Güncelle
      </button>
    </form>
  );
}
