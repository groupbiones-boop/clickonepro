import { useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useOnlineVisitors, OnlineVisitor } from "@/hooks/useOnlineVisitors";
import { getCountryFlag } from "@/lib/geolocation";
import { Globe, Smartphone, Tablet, Monitor } from "lucide-react";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface MarkerGroup {
  lat: number;
  lon: number;
  visitors: OnlineVisitor[];
  count: number;
}

const getDeviceIcon = (deviceType: string) => {
  switch (deviceType.toLowerCase()) {
    case "mobile":
      return <Smartphone className="h-3 w-3" />;
    case "tablet":
      return <Tablet className="h-3 w-3" />;
    default:
      return <Monitor className="h-3 w-3" />;
  }
};

const formatTimeAgo = (minutes: number): string => {
  if (minutes < 1) return "agora";
  if (minutes === 1) return "1 min";
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours === 1) return "1h";
  return `${hours}h`;
};

const getMarkerColor = (count: number): string => {
  if (count >= 4) return "hsl(var(--destructive))";
  if (count >= 2) return "hsl(var(--chart-3))";
  return "hsl(var(--chart-4))";
};

const getMarkerSize = (count: number): number => {
  if (count >= 4) return 12;
  if (count >= 2) return 10;
  return 8;
};

const OnlineVisitorsMap = () => {
  const { visitors, count } = useOnlineVisitors();

  // Group visitors by approximate location (round to 1 decimal for grouping)
  const markerGroups = useMemo(() => {
    const groups = new Map<string, MarkerGroup>();

    visitors.forEach((visitor) => {
      if (visitor.lat === 0 && visitor.lon === 0) return;

      // Round coordinates to group nearby visitors
      const roundedLat = Math.round(visitor.lat * 10) / 10;
      const roundedLon = Math.round(visitor.lon * 10) / 10;
      const key = `${roundedLat},${roundedLon}`;

      if (groups.has(key)) {
        const group = groups.get(key)!;
        group.visitors.push(visitor);
        group.count++;
      } else {
        groups.set(key, {
          lat: visitor.lat,
          lon: visitor.lon,
          visitors: [visitor],
          count: 1,
        });
      }
    });

    return Array.from(groups.values());
  }, [visitors]);

  if (count === 0) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Mapa de Visitantes Online
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            Nenhum visitante online no momento
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Mapa de Visitantes Online
          <span className="ml-auto text-sm font-normal text-muted-foreground">
            {count} online
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[350px] md:h-[400px] w-full overflow-hidden rounded-b-lg">
          <TooltipProvider delayDuration={0}>
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 130,
                center: [0, 20],
              }}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <ZoomableGroup>
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
                          hover: { outline: "none", fill: "hsl(var(--muted-foreground) / 0.3)" },
                          pressed: { outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>

                {markerGroups.map((group, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <Marker coordinates={[group.lon, group.lat]}>
                        {/* Pulse animation ring */}
                        <circle
                          r={getMarkerSize(group.count) + 4}
                          fill={getMarkerColor(group.count)}
                          opacity={0.3}
                          className="animate-ping"
                          style={{ animationDuration: "2s" }}
                        />
                        {/* Main marker */}
                        <circle
                          r={getMarkerSize(group.count)}
                          fill={getMarkerColor(group.count)}
                          stroke="hsl(var(--background))"
                          strokeWidth={2}
                          className="cursor-pointer transition-transform hover:scale-125"
                        />
                        {/* Count badge for multiple visitors */}
                        {group.count > 1 && (
                          <text
                            textAnchor="middle"
                            y={4}
                            style={{
                              fontFamily: "system-ui",
                              fontSize: 10,
                              fontWeight: "bold",
                              fill: "hsl(var(--background))",
                            }}
                          >
                            {group.count}
                          </text>
                        )}
                      </Marker>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[250px] p-3">
                      <div className="space-y-2">
                        <div className="font-semibold flex items-center gap-2">
                          <span>{getCountryFlag(group.visitors[0].countryCode)}</span>
                          <span>
                            {group.visitors[0].city && `${group.visitors[0].city}, `}
                            {group.visitors[0].country}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {group.count} visitante{group.count > 1 ? "s" : ""}
                        </div>
                        <div className="space-y-1.5 pt-1 border-t border-border">
                          {group.visitors.slice(0, 3).map((v, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs">
                              <span className="flex-shrink-0">
                                {getDeviceIcon(v.device_type)}
                              </span>
                              <span className="truncate flex-1">{v.page_path}</span>
                              <span className="text-muted-foreground flex-shrink-0">
                                {formatTimeAgo(v.online_minutes)}
                              </span>
                            </div>
                          ))}
                          {group.visitors.length > 3 && (
                            <div className="text-xs text-muted-foreground">
                              +{group.visitors.length - 3} mais
                            </div>
                          )}
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </ZoomableGroup>
            </ComposableMap>
          </TooltipProvider>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 py-3 px-4 border-t border-border text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: "hsl(var(--chart-4))" }}
            />
            <span>1</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: "hsl(var(--chart-3))" }}
            />
            <span>2-3</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="w-3.5 h-3.5 rounded-full"
              style={{ backgroundColor: "hsl(var(--destructive))" }}
            />
            <span>4+</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OnlineVisitorsMap;
