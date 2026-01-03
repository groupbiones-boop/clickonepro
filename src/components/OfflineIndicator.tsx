import { WifiOff, Wifi, Clock, Loader2 } from "lucide-react";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { cn } from "@/lib/utils";

interface OfflineIndicatorProps {
  lastUpdated: Date;
  isRefreshing?: boolean;
  className?: string;
}

const getRelativeTime = (date: Date) => {
  const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
  if (minutes < 1) return "agora";
  if (minutes === 1) return "1 min";
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours === 1) return "1h";
  return `${hours}h`;
};

export const OfflineIndicator = ({ 
  lastUpdated, 
  isRefreshing,
  className 
}: OfflineIndicatorProps) => {
  const { isOnline, wasOffline } = useNetworkStatus();

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Connection Status */}
      {!isOnline ? (
        <div className="flex items-center gap-1 text-amber-500 bg-amber-500/10 px-2 py-1 rounded-full">
          <WifiOff className="h-3 w-3" />
          <span className="text-[10px] font-medium">Offline</span>
        </div>
      ) : wasOffline ? (
        <div className="flex items-center gap-1 text-green-500 bg-green-500/10 px-2 py-1 rounded-full animate-pulse">
          <Wifi className="h-3 w-3" />
          <span className="text-[10px] font-medium">Reconectado</span>
        </div>
      ) : null}

      {/* Last Updated */}
      <div className="flex items-center gap-1 text-muted-foreground">
        {isRefreshing ? (
          <>
            <Loader2 className="h-3 w-3 animate-spin" />
            <span className="text-[10px] hidden sm:inline">Atualizando...</span>
          </>
        ) : (
          <>
            <Clock className="h-3 w-3" />
            <span className="text-[10px]">{getRelativeTime(lastUpdated)}</span>
          </>
        )}
      </div>
    </div>
  );
};
