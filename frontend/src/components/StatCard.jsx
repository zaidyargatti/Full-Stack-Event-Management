export default function StatCard({ label, value, sublabel }) {
  return (
    <div className="bg-[#1a1a1a] text-white p-5 rounded-xl shadow-md w-full">
      <h3 className="text-sm text-gray-400">{label}</h3>
      <div className="text-2xl font-bold text-blue-400">{value}</div>
      {sublabel && <p className="text-xs text-gray-500 mt-1">{sublabel}</p>}
    </div>
  );
}
