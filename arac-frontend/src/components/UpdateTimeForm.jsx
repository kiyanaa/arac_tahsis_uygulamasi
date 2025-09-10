export default function UpdateTimeForm({ timeForm, setTimeForm, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <h3 className="font-semibold text-lg text-gray-700">⏱️ Süre Güncelle</h3>
      <input
        placeholder="Plaka"
        required
        value={timeForm.plaka}
        onChange={e => setTimeForm(s => ({ ...s, plaka: e.target.value }))}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
      />
      <input
        placeholder="Yeni Bitiş"
        value={timeForm.son}
        onChange={e => setTimeForm(s => ({ ...s, son: e.target.value }))}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
      />
      <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        Güncelle
      </button>
    </form>
  );
}
