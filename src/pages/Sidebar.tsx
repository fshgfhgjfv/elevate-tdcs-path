import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export interface SidebarItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

interface SidebarProps {
  items: SidebarItem[];
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ items, isOpen, onClose }: SidebarProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return path === "/dashboard" ? location.pathname === "/dashboard" : location.pathname.startsWith(path);
  };

  return (
    <aside className={`
      fixed lg:sticky top-20 left-0 h-[calc(100vh-5rem)] w-64
      bg-card border-r z-40 transition-transform duration-300
      ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
    `}>
      <div className="p-6">
        <h2 className="text-2xl font-bold gradient-text mb-6">Dashboard</h2>
        <nav className="space-y-2">
          {items.map((item) => (
            <Link key={item.path} to={item.path} onClick={onClose}>
              <Button
                variant={isActive(item.path) ? "default" : "ghost"}
                className={`
                  w-full justify-start gap-3 border-l-4
                  ${isActive(item.path)
                    ? "border-primary text-white gradient-primary hover:opacity-90"
                    : "border-transparent hover:bg-primary/10"}
                `}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
