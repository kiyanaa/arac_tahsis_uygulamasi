export default function RequestForm({ requestForm, setRequestForm, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <h3 className="font-semibold text-lg text-gray-700">📋 İstek Oluştur</h3>
      <input
        required
        placeholder="Kullanan"
        value={requestForm.kullanan}
        onChange={e => setRequestForm(s => ({ ...s, kullanan: e.target.value }))}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
      />
      <input
        placeholder="Bulunduğu yer"
        value={requestForm.yer}
        onChange={e => setRequestForm(s => ({ ...s, yer: e.target.value }))}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
      />
      <input
        placeholder="Gidilecek yer"
        value={requestForm.gidilecek_yer}
        onChange={e => setRequestForm(s => ({ ...s, gidilecek_yer: e.target.value }))}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
      />
      <input
        placeholder="Başlangıç (tarih/saat)"
        value={requestForm.baslangic}
        onChange={e => setRequestForm(s => ({ ...s, baslangic: e.target.value }))}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
      />
      <div className="flex gap-2">
        <input
          placeholder="Son"
          value={requestForm.son}
          onChange={e => setRequestForm(s => ({ ...s, son: e.target.value }))}
          className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
        />
        <input
          placeholder="Neden"
          value={requestForm.neden}
          onChange={e => setRequestForm(s => ({ ...s, neden: e.target.value }))}
          className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
        />
      </div>
      <button className="w-full py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
        İstek Gönder
      </button>
    </form>
  );
}
