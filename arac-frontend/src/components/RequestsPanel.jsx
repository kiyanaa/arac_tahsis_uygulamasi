export default function RequestsPanel({ requests, onDelete, onTake }) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-lg text-gray-700">📑 İstek Listesi</h3>
      <table className="w-full text-sm border rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-2 py-1 text-left">Kullanan</th>
            <th className="px-2 py-1 text-left">Yer</th>
            <th className="px-2 py-1 text-left">Gidilecek</th>
            <th className="px-2 py-1">Başlangıç</th>
            <th className="px-2 py-1">Son</th>
            <th className="px-2 py-1">Neden</th>
            <th className="px-2 py-1">Eylemler</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r, i) => (
            <tr key={i} className="border-t hover:bg-gray-50">
              <td className="px-2 py-1">{r.kullanan}</td>
              <td className="px-2 py-1">{r.yer}</td>
              <td className="px-2 py-1">{r.gidilecek_yer}</td>
              <td className="px-2 py-1">{r.baslangic}</td>
              <td className="px-2 py-1">{r.son}</td>
              <td className="px-2 py-1">{r.neden}</td>
              <td className="px-2 py-1 space-x-2">
                <button
                  onClick={() => onTake(r)}
                  className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                >
                  Aracı Al
                </button>
                <button
                  onClick={() => onDelete(r.kullanan)}
                  className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
