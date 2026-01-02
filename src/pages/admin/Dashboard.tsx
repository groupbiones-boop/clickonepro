import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth, AdminAuthProvider } from "@/contexts/AdminAuthContext";
import Sidebar from "./components/Sidebar";
import MobileSidebar from "./components/MobileSidebar";
import DateRangePicker from "./components/DateRangePicker";
import NotificationCenter from "./components/NotificationCenter";
import DashboardTab from "./components/DashboardTab";
import OverviewTab from "./components/OverviewTab";
import SiteTab from "./components/SiteTab";
import AudienceTab from "./components/AudienceTab";
import AcquisitionTab from "./components/AcquisitionTab";
import BlogTab from "./components/BlogTab";
import AlertsTab from "./components/AlertsTab";
import { Loader2 } from "lucide-react";
import { subDays, startOfDay, endOfDay } from "date-fns";

const DashboardContent = () => {
  const { user, isAdmin, isLoading } = useAdminAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [startDate, setStartDate] = useState(startOfDay(subDays(new Date(), 30)));
  const [endDate, setEndDate] = useState(endOfDay(new Date()));

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
        return <DashboardTab filters={filters} />;
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
        return <DashboardTab filters={filters} />;
    }
  };

  const tabTitles: Record<string, string> = {
    dashboard: "Dashboard",
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
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <MobileSidebar activeTab={activeTab} onTabChange={setActiveTab} />
            <h1 className="text-lg md:text-xl font-semibold">{tabTitles[activeTab] || activeTab}</h1>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onDateChange={handleDateChange}
            />
            <NotificationCenter />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {renderTab()}
        </main>
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
