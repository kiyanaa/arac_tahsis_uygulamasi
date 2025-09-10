export default function AddVehicleForm({ addForm, setAddForm, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <h3 className="font-semibold text-lg text-gray-700">🚗 Araç Ekle</h3>
      <input
        placeholder="Plaka"
        required
        value={addForm.plaka}
        onChange={e => setAddForm(s => ({ ...s, plaka: e.target.value }))}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
      />
      <input
        placeholder="Yer"
        required
        value={addForm.yer}
        onChange={e => setAddForm(s => ({ ...s, yer: e.target.value }))}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
      />
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600">Tahsisli mi?</label>
        <input
          type="checkbox"
          checked={addForm.tahsis}
          onChange={e => setAddForm(s => ({ ...s, tahsis: e.target.checked }))}
        />
        <input
          placeholder="Tahsisli kişi"
          value={addForm.tahsisli}
          onChange={e => setAddForm(s => ({ ...s, tahsisli: e.target.value }))}
          className="p-2 border rounded-lg flex-1 focus:ring-2 focus:ring-indigo-400"
        />
      </div>
      <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
        Araç Ekle
      </button>
    </form>
  );
}
