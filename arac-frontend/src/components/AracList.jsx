export default function AracList({ vehicles, onHazirla, onUzerineAl }) {
  return (
    <div className="space-y-3">
      <h2 className="font-semibold text-lg text-gray-700">🚘 Araç Listesi</h2>
      <table className="w-full text-sm border rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-2 py-1 text-left">Plaka</th>
            <th className="px-2 py-1 text-left">Yer</th>
            <th className="px-2 py-1">Durum</th>
            <th className="px-2 py-1">Kullanan</th>
            <th className="px-2 py-1">Başlangıç</th>
            <th className="px-2 py-1">Son</th>
            <th className="px-2 py-1">Tahsisli</th>
            <th className="px-2 py-1">Eylemler</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map(a => (
            <tr key={a.plaka} className="border-t hover:bg-gray-50">
              <td className="px-2 py-1">{a.plaka}</td>
              <td className="px-2 py-1">{a.yer}</td>
              <td className="px-2 py-1">{a.durum}</td>
              <td className="px-2 py-1">{a.kullanan || '-'}</td>
              <td className="px-2 py-1">{a.baslangic || '-'}</td>
              <td className="px-2 py-1">{a.son || '-'}</td>
              <td className="px-2 py-1">{a.tahsis ? a.tahsisli : '-'}</td>
              <td className="px-2 py-1 space-x-2">
                <button
                  onClick={() => onHazirla(a)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded text-xs hover:bg-yellow-600"
                >
                  Hazırla
                </button>
                <button
                  onClick={() => onUzerineAl(a.plaka)}
                  disabled={a.durum !== 'uygun'}
                  className={`px-2 py-1 text-xs rounded ${
                    a.durum === 'uygun'
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  Üzerine Al
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
