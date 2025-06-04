import { useSearchParams } from "react-router-dom";

export default function Navbar() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e) => {
    const query = e.target.value;
    if (query) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({});
    }
  };

  return (
    <nav className="bg-gray-900 px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold text-cyan-300">🧱 Fullstack Block</h1>

      <input
        type="text"
        placeholder="🔎 Beiträge durchsuchen..."
        value={searchParams.get("search") || ""}
        onChange={handleChange}
        className="rounded-lg px-4 py-2 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
      />
    </nav>
  );
}
