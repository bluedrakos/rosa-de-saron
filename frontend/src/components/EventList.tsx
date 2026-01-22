import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar, MapPin, Clock } from "lucide-react";

interface Event {
  id: number;
  documentId: string;
  title: string;
  date: string; // ISO string
  location: string;
  slug: string;
}

interface EventListProps {
  events: Event[];
}

export default function EventList({ events }: EventListProps) {
  if (!events || events.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Calendario</h2>
          <h3 className="text-3xl md:text-4xl font-heading font-bold text-secondary">Próximos Eventos</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border-l-4 border-primary">
              <div className="p-6">
                <div className="flex items-center text-primary mb-4 font-bold">
                   <Calendar className="mr-2 h-5 w-5" />
                   <span className="uppercase text-sm">
                     {event.date ? format(new Date(event.date), "d 'de' MMMM", { locale: es }) : "Fecha por definir"}
                   </span>
                </div>
                
                <h4 className="text-xl font-bold text-secondary mb-3">{event.title}</h4>
                
                <div className="space-y-2 text-gray-500 mb-6">
                  {event.date && (
                    <div className="flex items-center text-sm">
                      <Clock className="mr-2 h-4 w-4" />
                      {format(new Date(event.date), "h:mm a")}
                    </div>
                  )}
                  {event.location && (
                    <div className="flex items-center text-sm">
                      <MapPin className="mr-2 h-4 w-4" />
                      {event.location}
                    </div>
                  )}
                </div>

                <Link
                  href={`/eventos/${event.slug || event.documentId}`}
                  className="text-primary font-bold uppercase text-sm hover:underline tracking-wider"
                >
                  Ver Detalles &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
           <Link href="/eventos" className="inline-block border-2 border-secondary text-secondary hover:bg-secondary hover:text-white px-8 py-3 rounded-full font-bold uppercase transition-colors">
             Ver Todos los Eventos
           </Link>
        </div>
      </div>
    </section>
  );
}
