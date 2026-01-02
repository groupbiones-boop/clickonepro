import { useState } from "react";
import { Bell, Check, CheckCheck, AlertTriangle, Info, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useRealtimeNotifications, Notification } from "@/hooks/useRealtimeNotifications";

const severityIcons = {
  info: Info,
  warning: AlertTriangle,
  critical: AlertCircle,
  success: Check,
};

const severityColors = {
  info: "text-blue-500",
  warning: "text-yellow-500",
  critical: "text-red-500",
  success: "text-green-500",
};

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, isAnimating, markAsRead, markAllAsRead } = useRealtimeNotifications();

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "relative transition-all",
            isAnimating && "animate-bounce"
          )}
        >
          <Bell className={cn(
            "h-5 w-5 transition-all",
            isAnimating && "text-primary"
          )} />
          {unreadCount > 0 && (
            <span className={cn(
              "absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center",
              isAnimating && "animate-pulse"
            )}>
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h4 className="font-semibold">Notificações</h4>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs"
            >
              <CheckCheck className="h-4 w-4 mr-1" />
              Marcar tudo como lido
            </Button>
          )}
        </div>
        <ScrollArea className="h-80">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              Nenhuma notificação ainda
            </div>
          ) : (
            <div className="divide-y divide-border">
              {notifications.map((notification) => {
                const Icon = severityIcons[notification.severity as keyof typeof severityIcons] || Info;
                const colorClass = severityColors[notification.severity as keyof typeof severityColors] || "text-muted-foreground";

                return (
                  <button
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={cn(
                      "w-full p-4 text-left hover:bg-accent transition-colors",
                      !notification.read && "bg-accent/50"
                    )}
                  >
                    <div className="flex gap-3">
                      <Icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", colorClass)} />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {notification.title}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDistanceToNow(new Date(notification.created_at), {
                            addSuffix: true,
                            locale: ptBR,
                          })}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
