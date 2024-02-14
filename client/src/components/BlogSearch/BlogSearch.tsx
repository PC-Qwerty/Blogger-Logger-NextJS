import { useState } from "react";

type BlogSearchProps = {
  onSearch: (searchTerm: string) => void;
};

export default function BlogSearch({ onSearch }: BlogSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // Call the onSearch prop with the search term
    onSearch(searchTerm);
  };

  return (
    <div className="flex items-center space-x-2 mt-7 w-2/4">
      <input
        type="text"
        placeholder="Search blogs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 px-2 py-1 rounded-md"
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          height: "50px",
          outline: "none",
          backgroundColor: "rgb(237, 238, 238)",
        }}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Search
      </button>
    </div>
  );
}
