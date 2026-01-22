import Image from "next/image";
import { fetchAPI, getStrapiMedia } from "@/lib/strapi";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

// Fetch team members (now called Pastorado in UI, but API ID is team-members)
async function getPastorate() {
  try {
    const data = await fetchAPI("/team-members", {
      populate: ["photo"]
    });
    return data?.data || [];
  } catch (error) {
    console.error("Error fetching pastorado:", error);
    return [];
  }
}

export default async function PastoradoPage() {
  const pastores = await getPastorate();

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-secondary text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-heading uppercase tracking-wider">
          Nuestro Pastorado
        </h1>
        <p className="mt-4 text-xl text-gray-300">Conoce a quienes nos guían</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {pastores.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
             {pastores.map((pastor: any) => {
                 const photoUrl = getStrapiMedia(pastor.photo?.url);
                 return (
                  <div key={pastor.id} className="text-center group">
                    <div className="relative w-64 h-64 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:border-primary transition-colors">
                      {photoUrl ? (
                        <Image 
                          src={photoUrl} 
                          alt={pastor.name} 
                          fill 
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                          Sin Foto
                        </div>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-secondary">{pastor.name}</h3>
                    <p className="text-primary font-bold uppercase tracking-widest mt-1">{pastor.role}</p>
                    
                    {pastor.bio && (
                       <div className="mt-4 text-gray-600 leading-relaxed max-w-md mx-auto">
                          <BlocksRenderer content={pastor.bio} />
                       </div>
                    )}
                  </div>
                 );
              })}
          </div>
        ) : (
          <p className="text-center text-gray-500 italic">No hay información del pastorado disponible aún.</p>
        )}
      </div>
    </div>
  );
}
