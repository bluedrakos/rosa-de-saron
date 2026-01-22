import Link from "next/link";
import { PlayCircle } from "lucide-react";

interface Sermon {
  id: number;
  documentId: string;
  title: string;
  speaker: string;
  date: string;
  videoUrl: string;
  slug: string;
}

interface SermonListProps {
  sermons: Sermon[];
}

export default function SermonList({ sermons }: SermonListProps) {
  if (!sermons || sermons.length === 0) {
    return null;
  }

  // Helper to extract YouTube ID for thumbnail
  const getYoutubeThumbnail = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg` : null;
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Canal de YouTube</h2>
          <h3 className="text-3xl md:text-4xl font-heading font-bold text-secondary">Nuestras Reuniones</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sermons.map((sermon) => {
            const thumbnail = getYoutubeThumbnail(sermon.videoUrl);
            
            return (
              <a 
                key={sermon.id} 
                href={sermon.videoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group cursor-pointer block"
              >
                <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden mb-4 shadow-lg">
                  {thumbnail ? (
                    <img src={thumbnail} alt={sermon.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-secondary text-white">
                      <PlayCircle className="h-12 w-12" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle className="h-16 w-16 text-white" />
                  </div>
                </div>
                
                <h4 className="text-xl font-bold text-secondary group-hover:text-primary transition-colors">{sermon.title}</h4>
                <p className="text-sm text-gray-500 mt-1 uppercase tracking-wide">{sermon.speaker} • {sermon.date}</p>
              </a>
            );
          })}
        </div>
             
        <div className="text-center mt-12">
           <Link href="/reuniones" className="inline-block border-2 border-secondary text-secondary hover:bg-secondary hover:text-white px-8 py-3 rounded-full font-bold uppercase transition-colors">
             Ver Todas las Reuniones
           </Link>
        </div>
      </div>
    </section>
  );
}
