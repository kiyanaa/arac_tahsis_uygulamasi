export default function ReturnVehicleForm({ returnForm, setReturnForm, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <h3 className="font-semibold text-lg text-gray-700">↩️ Araç Teslim</h3>

      <input
        placeholder="Plaka"
        required
        value={returnForm.plaka}
        onChange={e => setReturnForm(s => ({ ...s, plaka: e.target.value }))}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-400"
      />

      <input
        placeholder="Bırakılma Yeri"
        required
        value={returnForm.birakilma_yeri}
        onChange={e => setReturnForm(s => ({ ...s, birakilma_yeri: e.target.value }))}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-400"
      />

      <input
        type="datetime-local"
        placeholder="Bırakılma Saati"
        required
        value={returnForm.birakilma_saati}
        onChange={e => setReturnForm(s => ({ ...s, birakilma_saati: e.target.value }))}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-400"
      />

      <button className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
        Teslim Et
      </button>
    </form>
  );
}
