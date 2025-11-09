import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X } from "lucide-react";

interface CourseFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  priceRange: [number, number];
  duration: string[];
  specialization: string[];
  placement: boolean | null;
}

const specializations = [
  "Bug Bounty Hunting",
  "Penetration Testing",
  "Network Security",
  "Web Security",
  "Ethical Hacking",
];

const durations = ["1-2 months", "3 months", "6+ months"];

export const CourseFilters = ({ onFilterChange }: CourseFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 100000],
    duration: [],
    specialization: [],
    placement: null,
  });

  const handlePriceChange = (value: number[]) => {
    const newFilters = { ...filters, priceRange: [value[0], value[1]] as [number, number] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleDuration = (duration: string) => {
    const newDuration = filters.duration.includes(duration)
      ? filters.duration.filter((d) => d !== duration)
      : [...filters.duration, duration];
    const newFilters = { ...filters, duration: newDuration };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleSpecialization = (spec: string) => {
    const newSpec = filters.specialization.includes(spec)
      ? filters.specialization.filter((s) => s !== spec)
      : [...filters.specialization, spec];
    const newFilters = { ...filters, specialization: newSpec };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const togglePlacement = () => {
    const newPlacement = filters.placement === true ? null : true;
    const newFilters = { ...filters, placement: newPlacement };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters: FilterState = {
      priceRange: [0, 10000],
      duration: [],
      specialization: [],
      placement: null,
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const activeFilterCount =
    filters.duration.length +
    filters.specialization.length +
    (filters.placement !== null ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 100000 ? 1 : 0);

  return (
    <div className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-4"
      >
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <Badge variant="default" className="ml-2">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
        {activeFilterCount > 0 && (
          <Button variant="ghost" onClick={resetFilters} className="gap-2">
            <X className="w-4 h-4" />
            Clear All
          </Button>
        )}
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6 shadow-glow-lg">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Price Range */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">
                    Price Range
                  </Label>
                  <div className="space-y-4">
                    <Slider
                      min={0}
                      max={100000}
                      step={5000}
                      value={filters.priceRange}
                      onValueChange={handlePriceChange}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>₹{filters.priceRange[0].toLocaleString()}</span>
                      <span>₹{filters.priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Duration</Label>
                  <div className="flex flex-wrap gap-2">
                    {durations.map((duration) => (
                      <Badge
                        key={duration}
                        variant={filters.duration.includes(duration) ? "default" : "outline"}
                        className="cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => toggleDuration(duration)}
                      >
                        {duration}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Specialization */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">
                    Specialization
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {specializations.map((spec) => (
                      <Badge
                        key={spec}
                        variant={filters.specialization.includes(spec) ? "default" : "outline"}
                        className="cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => toggleSpecialization(spec)}
                      >
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Placement */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">
                    Additional Features
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant={filters.placement === true ? "default" : "outline"}
                      className="cursor-pointer hover:scale-105 transition-transform"
                      onClick={togglePlacement}
                    >
                      Placement Assistance
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
