export default function Notification({ notif }) {
  if (!notif) return null;
  return (
    <div
      className={`fixed right-6 bottom-6 px-4 py-3 rounded-lg shadow-lg text-white transition-all ${
        notif.type === 'success' ? 'bg-green-600' : 'bg-red-600'
      }`}
    >
      {notif.message}
    </div>
  );
}
