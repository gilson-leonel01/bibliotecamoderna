import { useState } from "react";

export default function NavItem({ icon, label, page }) {
  const [sidebarOpen, ] = useState(true);
  const [currentPage, setCurrentPage] = useState("dashboard");

  return (
    <button
      onClick={() => setCurrentPage(page)}
      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
        currentPage === page
          ? "bg-indigo-600 text-white"
          : "hover:bg-indigo-700 text-indigo-100"
      }`}
    >
      {icon}
      {sidebarOpen && <span>{label}</span>}
    </button>
  );
}
