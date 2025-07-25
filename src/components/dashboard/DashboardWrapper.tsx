import { ReactNode, FC, useState, memo } from "react";
import { LogOut, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DashboardWrapperProps {
  children: ReactNode;
}

const DashboardWrapper: FC<DashboardWrapperProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false); // Close menu on navigation
  };

  const handleLogout = () => {
    console.log("Logging out...");
    setIsMenuOpen(false); // Close menu on logout
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Hamburger Icon for Mobile */}
      {!isMenuOpen && (
        <button
          className="fixed top-4 right-5 z-50 sm:hidden p-2 bg-gray-800 text-white rounded"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
      )}

      {/* Side Menu */}
      <aside
        className={`fixed sm:static top-0 left-0 h-screen w-64 bg-gray-800 text-white flex flex-col transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform sm:translate-x-0 z-40`}
      >
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Promptly</h1>
          {isMenuOpen && (
            <button
              className="sm:hidden p-2 text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          )}
        </div>
        <nav className="flex-1 overflow-auto">
          <ul>
            <li>
              <button
                onClick={() => handleNavigation("/dashboard")}
                className="w-full text-left px-4 py-2 hover:bg-gray-700"
              >
                Dashboard
              </button>
            </li>
          </ul>
        </nav>
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 h-screen overflow-hidden">
        <div className="container mx-auto px-4 py-8 h-full overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default memo(DashboardWrapper);