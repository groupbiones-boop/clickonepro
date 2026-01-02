import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, subDays, startOfDay, endOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onDateChange: (start: Date, end: Date) => void;
}

const presets = [
  { label: "Hoje", days: 0 },
  { label: "7 dias", days: 7 },
  { label: "30 dias", days: 30 },
  { label: "90 dias", days: 90 },
  { label: "1 ano", days: 365 },
];

const DateRangePicker = ({ startDate, endDate, onDateChange }: DateRangePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const handlePresetClick = (days: number) => {
    const end = endOfDay(new Date());
    const start = startOfDay(days === 0 ? new Date() : subDays(new Date(), days));
    onDateChange(start, end);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-start text-left font-normal min-w-0",
            !startDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="h-4 w-4 shrink-0 md:mr-2" />
          <span className="hidden md:inline">
            {startDate ? (
              endDate ? (
                <>
                  {format(startDate, "d MMM", { locale: ptBR })} - {format(endDate, "d MMM", { locale: ptBR })}
                </>
              ) : (
                format(startDate, "d MMM yyyy", { locale: ptBR })
              )
            ) : (
              "Selecione"
            )}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <div className={cn("flex", isMobile ? "flex-col" : "flex-row")}>
          <div className={cn(
            "border-border p-3 space-y-1",
            isMobile ? "border-b flex flex-wrap gap-1" : "border-r"
          )}>
            {presets.map((preset) => (
              <Button
                key={preset.label}
                variant="ghost"
                size="sm"
                className={cn(
                  "justify-start",
                  isMobile ? "flex-1 min-w-[70px]" : "w-full"
                )}
                onClick={() => handlePresetClick(preset.days)}
              >
                {preset.label}
              </Button>
            ))}
          </div>
          <div className="p-3">
            <Calendar
              mode="range"
              selected={{
                from: startDate,
                to: endDate,
              }}
              onSelect={(range) => {
                if (range?.from && range?.to) {
                  onDateChange(startOfDay(range.from), endOfDay(range.to));
                }
              }}
              numberOfMonths={isMobile ? 1 : 2}
              locale={ptBR}
              className="pointer-events-auto"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateRangePicker;
