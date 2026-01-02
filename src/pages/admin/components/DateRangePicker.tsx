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
import { CalendarIcon } from "lucide-react";

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onDateChange: (start: Date, end: Date) => void;
}

const presets = [
  { label: "Today", days: 0 },
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 90 days", days: 90 },
  { label: "Last year", days: 365 },
];

const DateRangePicker = ({ startDate, endDate, onDateChange }: DateRangePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

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
            "justify-start text-left font-normal",
            !startDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {startDate ? (
            endDate ? (
              <>
                {format(startDate, "MMM d, yyyy")} - {format(endDate, "MMM d, yyyy")}
              </>
            ) : (
              format(startDate, "MMM d, yyyy")
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <div className="flex">
          <div className="border-r border-border p-3 space-y-1">
            {presets.map((preset) => (
              <Button
                key={preset.label}
                variant="ghost"
                size="sm"
                className="w-full justify-start"
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
              numberOfMonths={2}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateRangePicker;
