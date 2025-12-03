import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalendlyModal = ({ isOpen, onClose }: CalendlyModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] h-[80vh] p-0 overflow-hidden">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="text-xl font-semibold">Book a Free Session</DialogTitle>
        </DialogHeader>
        <div className="flex-1 h-full min-h-[500px]">
          <iframe
            src="https://calendly.com/rudranarayanswain/30min"
            width="100%"
            height="100%"
            frameBorder="0"
            title="Schedule a meeting"
            className="min-h-[500px]"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
