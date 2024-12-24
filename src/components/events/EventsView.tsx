import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, MoreVertical, Plus, Archive, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventDialog } from "./EventDialog";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  facilitator: string;
  objectives: string;
  status: "upcoming" | "archived";
}

export function EventsView() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Growing with Jesus",
      date: "2024-01-20",
      time: "15:00",
      location: "Church Auditorium",
      facilitator: "Sis. Brittany",
      objectives: "Deepen our faith in God and love for Jesus as His disciples.",
      status: "upcoming",
    },
    {
      id: "2",
      title: "Dating: A Kingdom or Secular Culture?",
      date: "2024-02-17",
      time: "15:00",
      location: "The Odeyemis' House",
      facilitator: "Sis. Tosin & Bro. Bryan",
      objectives: "Examine the concept of dating through the lens of a kingdom perspective.",
      status: "upcoming",
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleArchive = (eventId: string) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, status: "archived" as const } : event
    ));
  };

  const handleDelete = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const EventCard = ({ event }: { event: Event }) => (
    <Card className="p-6 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
          <div className="space-y-2 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(event.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
          </div>
          <p className="mt-4 text-sm">{event.objectives}</p>
          <p className="mt-2 text-sm font-medium">Facilitator: {event.facilitator}</p>
        </div>
        {user?.role === "admin" && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleArchive(event.id)}>
                <Archive className="mr-2 h-4 w-4" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleDelete(event.id)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </Card>
  );

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Youth Ministry Events</h2>
        <Button 
          onClick={() => setDialogOpen(true)}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" /> New Event
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="archived">Archived Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4">
          {events
            .filter(event => event.status === "upcoming")
            .map(event => (
              <EventCard key={event.id} event={event} />
            ))}
        </TabsContent>
        
        <TabsContent value="archived" className="space-y-4">
          {events
            .filter(event => event.status === "archived")
            .map(event => (
              <EventCard key={event.id} event={event} />
            ))}
        </TabsContent>
      </Tabs>

      <EventDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen}
        onSubmit={(data) => {
          setEvents([...events, {
            id: (events.length + 1).toString(),
            ...data,
            status: "upcoming"
          }]);
        }}
      />
    </div>
  );
}
