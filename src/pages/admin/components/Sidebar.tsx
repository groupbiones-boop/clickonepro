import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Globe,
  Users,
  TrendingUp,
  FileText,
  Bell,
  Settings,
  LogOut,
  PenSquare,
} from "lucide-react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import logoWhite from "@/assets/clickone-logo-white.png";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "site", label: "Site", icon: Globe },
  { id: "audience", label: "Audience", icon: Users },
  { id: "acquisition", label: "Acquisition", icon: TrendingUp },
  { id: "blog", label: "Blog Analytics", icon: FileText },
  { id: "alerts", label: "Alerts", icon: Bell },
];

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const { signOut } = useAdminAuth();
  const location = useLocation();

  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen flex flex-col">
      <div className="p-6 border-b border-border">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoWhite} alt="ClickOne" className="h-8" />
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
              activeTab === item.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </button>
        ))}

        <div className="pt-4 border-t border-border mt-4">
          <Link
            to="/admin/blog"
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
              location.pathname === "/admin/blog"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <PenSquare className="h-5 w-5" />
            Blog Manager
          </Link>
        </div>
      </nav>

      <div className="p-4 border-t border-border">
        <button
          onClick={signOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
