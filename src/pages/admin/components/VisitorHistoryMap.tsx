import { useMemo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MapPin, Flame, Clock } from "lucide-react";
import { useVisitorHistory, VisitorHistoryPoint } from "@/hooks/useVisitorHistory";
import { useSitePages } from "@/hooks/useSitePages";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface MarkerGroup {
  lat: number;
  lon: number;
  count: number;
  points: VisitorHistoryPoint[];
}

const getMarkerColor = (count: number): string => {
  if (count >= 10) return "hsl(var(--destructive))";
  if (count >= 5) return "hsl(var(--chart-3))";
  if (count >= 2) return "hsl(var(--chart-2))";
  return "hsl(var(--chart-4))";
};

const getMarkerSize = (count: number): number => {
  if (count >= 10) return 12;
  if (count >= 5) return 10;
  if (count >= 2) return 8;
  return 6;
};

const getOpacityByRecency = (timestamp: string): number => {
  const age = Date.now() - new Date(timestamp).getTime();
  const hoursAgo = age / (1000 * 60 * 60);
  // More recent = more opaque
  if (hoursAgo < 1) return 1;
  if (hoursAgo < 6) return 0.8;
  if (hoursAgo < 12) return 0.6;
  return 0.4;
};

export default function VisitorHistoryMap() {
  const [pageFilter, setPageFilter] = useState<string>("all");
  const { data: historyData, isLoading } = useVisitorHistory(pageFilter);
  const { data: sitePages } = useSitePages();

  // Group visitors by rounded lat/lon
  const markerGroups = useMemo(() => {
    if (!historyData?.historyPoints) return [];

    const groups = new Map<string, MarkerGroup>();
    
    historyData.historyPoints.forEach((point) => {
      // Round to 1 decimal for grouping nearby visitors
      const roundedLat = Math.round(point.lat * 10) / 10;
      const roundedLon = Math.round(point.lon * 10) / 10;
      const key = `${roundedLat},${roundedLon}`;

      if (groups.has(key)) {
        const group = groups.get(key)!;
        group.count++;
        group.points.push(point);
      } else {
        groups.set(key, {
          lat: roundedLat,
          lon: roundedLon,
          count: 1,
          points: [point],
        });
      }
    });

    return Array.from(groups.values());
  }, [historyData?.historyPoints]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Mapa de Atividade - Últimas 24h
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">Carregando mapa...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Mapa de Atividade - Últimas 24h
          </CardTitle>
          <div className="flex items-center gap-2">
            <Select value={pageFilter} onValueChange={setPageFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filtrar por página" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as páginas</SelectItem>
                {sitePages?.slice(0, 20).map((page) => (
                  <SelectItem key={page.path} value={page.path}>
                    {page.path} ({page.visits})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {markerGroups.length === 0 ? (
          <div className="h-[400px] flex items-center justify-center text-muted-foreground">
            Nenhuma atividade geográfica nas últimas 24 horas
          </div>
        ) : (
          <>
            <div className="h-[400px] bg-muted/20 rounded-lg overflow-hidden">
              <ComposableMap
                projectionConfig={{
                  scale: 140,
                  center: [0, 20],
                }}
                style={{ width: "100%", height: "100%" }}
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="hsl(var(--muted))"
                        stroke="hsl(var(--border))"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: "none" },
                          hover: { outline: "none", fill: "hsl(var(--muted-foreground)/0.3)" },
                          pressed: { outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>

                <TooltipProvider>
                  {markerGroups.map((group, index) => {
                    const mostRecent = group.points[0];
                    const opacity = getOpacityByRecency(mostRecent.timestamp);

                    return (
                      <Marker key={index} coordinates={[group.lon, group.lat]}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <g style={{ cursor: "pointer", opacity }}>
                              {/* Outer ring */}
                              <circle
                                r={getMarkerSize(group.count) + 3}
                                fill={getMarkerColor(group.count)}
                                fillOpacity={0.3}
                              />
                              {/* Inner circle */}
                              <circle
                                r={getMarkerSize(group.count)}
                                fill={getMarkerColor(group.count)}
                                stroke="hsl(var(--background))"
                                strokeWidth={1}
                              />
                              {/* Count badge for multiple visitors */}
                              {group.count > 1 && (
                                <text
                                  textAnchor="middle"
                                  y={4}
                                  fill="hsl(var(--background))"
                                  fontSize={8}
                                  fontWeight="bold"
                                >
                                  {group.count}
                                </text>
                              )}
                            </g>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-xs">
                            <div className="space-y-1">
                              <p className="font-semibold">
                                {mostRecent.city}, {mostRecent.country}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {group.count} visita{group.count > 1 ? "s" : ""} nas últimas 24h
                              </p>
                              <div className="border-t pt-1 mt-1">
                                {group.points.slice(0, 3).map((point, i) => (
                                  <p key={i} className="text-xs">
                                    {point.page_path} • {formatDistanceToNow(new Date(point.timestamp), { addSuffix: true, locale: ptBR })}
                                  </p>
                                ))}
                                {group.points.length > 3 && (
                                  <p className="text-xs text-muted-foreground">
                                    +{group.points.length - 3} mais
                                  </p>
                                )}
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </Marker>
                    );
                  })}
                </TooltipProvider>
              </ComposableMap>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap items-center justify-between mt-4 gap-4 text-sm">
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground">
                  Total: <strong>{historyData?.totalVisits || 0}</strong> visitas
                </span>
                {historyData?.peakHour && (
                  <span className="flex items-center gap-1 text-chart-3">
                    <Flame className="h-4 w-4" />
                    Pico: {historyData.peakHour.hour.toString().padStart(2, "0")}:00 ({historyData.peakHour.count} visitas)
                  </span>
                )}
              </div>
              
              {/* Legend */}
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "hsl(var(--chart-4))" }} />
                  1
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "hsl(var(--chart-2))" }} />
                  2-4
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "hsl(var(--chart-3))" }} />
                  5-9
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "hsl(var(--destructive))" }} />
                  10+
                </span>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
