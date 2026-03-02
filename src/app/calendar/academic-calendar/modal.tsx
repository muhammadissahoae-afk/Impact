import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PrimaryButton from "@/components/PrimaryButton";

type EventsModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  date: Date | null;
  events: string[];
};

export function EventsModal({
  isOpen,
  onOpenChange,
  date,
  events,
}: EventsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-i-primary">
            Events on {date?.toDateString() || ""}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-2 my-4">
          {events.length > 0 ? (
            events.map((ev, i) => (
              <div key={i} className="p-2 bg-gray-100 rounded">
                {ev}
              </div>
            ))
          ) : (
            <div className="text-gray-500">No events</div>
          )}
        </div>
        <DialogFooter>
          <PrimaryButton onClick={() => onOpenChange(false)}>
            Close
          </PrimaryButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
