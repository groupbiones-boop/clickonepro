import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth, AdminAuthProvider } from "@/contexts/AdminAuthContext";
import Sidebar from "./components/Sidebar";
import MobileSidebar from "./components/MobileSidebar";
import DateRangePicker from "./components/DateRangePicker";
import NotificationCenter from "./components/NotificationCenter";
import DarkModeToggle from "@/components/DarkModeToggle";
import DashboardTab from "./components/DashboardTab";
import OverviewTab from "./components/OverviewTab";
import SiteTab from "./components/SiteTab";
import AudienceTab from "./components/AudienceTab";
import AcquisitionTab from "./components/AcquisitionTab";
import BlogTab from "./components/BlogTab";
import AlertsTab from "./components/AlertsTab";
import { CampaignsTab } from "./components/CampaignsTab";
import { OfflineIndicator } from "@/components/OfflineIndicator";
import { useRealtimeDashboard } from "@/hooks/useRealtimeDashboard";
import { Loader2, LayoutDashboard, BarChart3, Users, TrendingUp, Target } from "lucide-react";
import { subDays, startOfDay, endOfDay } from "date-fns";
import { cn } from "@/lib/utils";

const DashboardContent = () => {
  const { user, isAdmin, isLoading } = useAdminAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [startDate, setStartDate] = useState(startOfDay(subDays(new Date(), 30)));
  const [endDate, setEndDate] = useState(endOfDay(new Date()));
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [, forceUpdate] = useState(0);

  // Update relative time display every minute
  useEffect(() => {
    const interval = setInterval(() => forceUpdate(n => n + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  const handleDataUpdate = useCallback(() => {
    setLastUpdated(new Date());
  }, []);

  const handleRefresh = useCallback(() => {
    setLastUpdated(new Date());
    setIsRefreshing(false);
  }, []);

  const handleRefreshStart = useCallback(() => {
    setIsRefreshing(true);
  }, []);

  // Enable realtime sync
  useRealtimeDashboard(handleDataUpdate);

  const handleTabChange = (newTab: string) => {
    if (newTab === activeTab) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(newTab);
      setIsTransitioning(false);
    }, 300);
  };

  const quickAccessTabs = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "campaigns", icon: Target, label: "Campanhas" },
    { id: "overview", icon: BarChart3, label: "Visão Geral" },
    { id: "acquisition", icon: TrendingUp, label: "Aquisição" },
  ];

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  const filters = { startDate, endDate };

  const handleDateChange = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
  };

  const renderTab = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <DashboardTab 
            filters={filters} 
            onRefresh={handleRefresh}
            onRefreshStart={handleRefreshStart}
          />
        );
      case "campaigns":
        return <CampaignsTab filters={filters} />;
      case "overview":
        return <OverviewTab filters={filters} />;
      case "site":
        return <SiteTab filters={filters} />;
      case "audience":
        return <AudienceTab filters={filters} />;
      case "acquisition":
        return <AcquisitionTab filters={filters} />;
      case "blog":
        return <BlogTab filters={filters} />;
      case "alerts":
        return <AlertsTab />;
      default:
        return (
          <DashboardTab 
            filters={filters} 
            onRefresh={handleRefresh}
            onRefreshStart={handleRefreshStart}
          />
        );
    }
  };

  const tabTitles: Record<string, string> = {
    dashboard: "Dashboard",
    campaigns: "Campanhas",
    overview: "Visão Geral",
    site: "Site",
    audience: "Audiência",
    acquisition: "Aquisição",
    blog: "Analytics do Blog",
    alerts: "Alertas",
  };

  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden md:block">
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <MobileSidebar activeTab={activeTab} onTabChange={handleTabChange} />
            <h1 className="text-lg md:text-xl font-semibold">{tabTitles[activeTab] || activeTab}</h1>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <OfflineIndicator 
              lastUpdated={lastUpdated} 
              isRefreshing={isRefreshing}
              className="hidden sm:flex"
            />
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onDateChange={handleDateChange}
            />
            <DarkModeToggle />
            <NotificationCenter />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto pb-20 md:pb-6 relative">
          {/* Loading Overlay */}
          {isTransitioning && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10 animate-fade-in">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground">Carregando...</span>
              </div>
            </div>
          )}
          
          {/* Tab Content */}
          <div 
            key={activeTab} 
            className={cn(
              "transition-opacity duration-200",
              isTransitioning ? "opacity-50" : "opacity-100 animate-fade-in"
            )}
          >
            {renderTab()}
          </div>
        </main>

        {/* Bottom Navigation - Mobile Only */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border z-50">
          <div className="flex justify-around items-center h-full px-2">
            {quickAccessTabs.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={cn(
                  "flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all duration-200",
                  activeTab === item.id
                    ? "text-primary scale-105"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 transition-transform duration-200",
                  activeTab === item.id && "scale-110"
                )} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <AdminAuthProvider>
      <DashboardContent />
    </AdminAuthProvider>
  );
};

export default Dashboard;
