import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface EventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: any) => void;
}

export function EventDialog({ open, onOpenChange, onSubmit }: EventDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    facilitator: "",
    objectives: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
            <DialogDescription>
              Add a new event to the youth ministry calendar.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  className="bg-gray-50"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="facilitator">Facilitator</Label>
                <Input
                  id="facilitator"
                  className="bg-gray-50"
                  value={formData.facilitator}
                  onChange={(e) =>
                    setFormData({ ...formData, facilitator: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  className="bg-gray-50"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  className="bg-gray-50"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  className="bg-gray-50"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <Label htmlFor="objectives">Objectives</Label>
              <Textarea
                id="objectives"
                className="bg-gray-50"
                value={formData.objectives}
                onChange={(e) =>
                  setFormData({ ...formData, objectives: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-primary hover:bg-primary/90">Create Event</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}