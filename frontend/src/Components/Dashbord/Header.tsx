import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useChatState } from "../../Context/UserContext";
import { EllipsisVertical, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, setUser } = useChatState();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userData");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-gray-800">TaskMate</h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-7">
          <div className="flex flex-col">
            <p className="text-sm font-bold text-center">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          <div>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <EllipsisVertical />
              </DropdownTrigger>
              <DropdownMenu aria-label="User actions" variant="flat">
                <DropdownItem
                  key="logout"
                  color="danger"
                  startContent={<LogOut className="w-5 h-5" />}
                  onClick={handleLogout}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
