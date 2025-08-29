import { Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 h-16 bg-white border-b">
      {/* Search */}
      <div className="flex items-center w-full max-w-lg">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Right */}
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Bell size={20} />
        </button>
        <div className="flex items-center space-x-2">
          <img
            src="https://i.pravatar.cc/40"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-medium">Tom Cook</span>
        </div>
      </div>
    </header>
  );
}
