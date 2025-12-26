import { useCurrency, Currency } from "@/contexts/CurrencyContext";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { IndianRupee, DollarSign, ChevronDown } from "lucide-react";

const CurrencySelector = () => {
  const { currency, setCurrency } = useCurrency();

  const currencies: { value: Currency; label: string; icon: React.ReactNode }[] = [
    { value: 'INR', label: '₹ INR', icon: <IndianRupee className="h-4 w-4" /> },
    { value: 'USD', label: '$ USD', icon: <DollarSign className="h-4 w-4" /> },
  ];

  const currentCurrency = currencies.find(c => c.value === currency);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1 text-xs">
          {currentCurrency?.icon}
          <span className="hidden sm:inline">{currentCurrency?.label}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        {currencies.map((curr) => (
          <DropdownMenuItem
            key={curr.value}
            onClick={() => setCurrency(curr.value)}
            className={currency === curr.value ? 'bg-accent' : ''}
          >
            <span className="flex items-center gap-2">
              {curr.icon}
              {curr.label}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrencySelector;
