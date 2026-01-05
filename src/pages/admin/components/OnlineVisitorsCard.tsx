import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useOnlineVisitors, OnlineVisitor } from "@/hooks/useOnlineVisitors";
import { getCountryFlag } from "@/lib/geolocation";
import { Monitor, Smartphone, Tablet, Users, ChevronRight } from "lucide-react";

const getDeviceIcon = (deviceType: string) => {
  switch (deviceType?.toLowerCase()) {
    case "mobile":
      return <Smartphone className="h-3.5 w-3.5" />;
    case "tablet":
      return <Tablet className="h-3.5 w-3.5" />;
    default:
      return <Monitor className="h-3.5 w-3.5" />;
  }
};

const formatTimeAgo = (minutes: number): string => {
  if (minutes < 1) return "agora";
  if (minutes === 1) return "1min";
  if (minutes < 60) return `${minutes}min`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h`;
};

const VisitorRow = ({ visitor }: { visitor: OnlineVisitor }) => {
  const flag = getCountryFlag(visitor.countryCode);
  const location = [visitor.city, visitor.region].filter(Boolean).join(", ") || visitor.country;

  return (
    <div className="flex items-center gap-3 py-2 px-1 hover:bg-muted/50 rounded-lg transition-colors">
      <span className="text-lg" title={visitor.country}>
        {flag}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{visitor.page_path}</p>
        <p className="text-xs text-muted-foreground truncate">{location}</p>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        {getDeviceIcon(visitor.device_type)}
        <span className="text-xs whitespace-nowrap">{formatTimeAgo(visitor.online_minutes)}</span>
      </div>
    </div>
  );
};

const OnlineVisitorsCard = ({ className }: { className?: string }) => {
  const { visitors, count, byCountry } = useOnlineVisitors();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const topCountries = byCountry.slice(0, 4);
  const recentVisitors = visitors.slice(0, 5);

  return (
    <>
      <Card className={className}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="relative">
                <Users className="h-5 w-5" />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-chart-4 rounded-full animate-pulse" />
                )}
              </div>
              <span className="flex items-center gap-2">
                <span className="text-2xl font-bold">{count}</span>
                <span className="text-sm font-normal text-muted-foreground">Online agora</span>
              </span>
            </CardTitle>
            {count > 5 && (
              <Button variant="ghost" size="sm" onClick={() => setIsDialogOpen(true)}>
                Ver todos
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {count === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              Nenhum visitante online no momento
            </p>
          ) : (
            <div className="space-y-4">
              {/* Country breakdown */}
              {topCountries.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {topCountries.map((c) => (
                    <div
                      key={c.countryCode}
                      className="flex items-center gap-1.5 px-2 py-1 bg-muted rounded-full text-sm"
                    >
                      <span>{getCountryFlag(c.countryCode)}</span>
                      <span className="font-medium">{c.count}</span>
                    </div>
                  ))}
                  {byCountry.length > 4 && (
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-muted rounded-full text-sm text-muted-foreground">
                      +{byCountry.length - 4} países
                    </div>
                  )}
                </div>
              )}

              {/* Recent visitors list */}
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                  Atividade recente
                </p>
                {recentVisitors.map((visitor) => (
                  <VisitorRow key={visitor.session_id} visitor={visitor} />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Full list dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="relative">
                <Users className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-chart-4 rounded-full animate-pulse" />
              </div>
              {count} Visitantes Online
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Country breakdown in dialog */}
            {byCountry.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {byCountry.map((c) => (
                  <div
                    key={c.countryCode}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-muted rounded-full text-sm"
                  >
                    <span>{getCountryFlag(c.countryCode)}</span>
                    <span className="font-medium">{c.country}</span>
                    <span className="text-muted-foreground">({c.count})</span>
                  </div>
                ))}
              </div>
            )}

            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-1">
                {visitors.map((visitor) => (
                  <VisitorRow key={visitor.session_id} visitor={visitor} />
                ))}
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OnlineVisitorsCard;
