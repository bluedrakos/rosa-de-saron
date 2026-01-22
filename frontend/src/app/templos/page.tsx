import Link from "next/link";
import Image from "next/image";
import { fetchAPI, getStrapiMedia } from "@/lib/strapi";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { MapPin } from "lucide-react";

async function getTemplos() {
  try {
    const data = await fetchAPI("/templos", {
      populate: ["photo"]
    });
    return data?.data || [];
  } catch (error) {
    console.error("Error fetching templos:", error);
    return [];
  }
}

export default async function TemplosPage() {
  const templos = await getTemplos();

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-secondary text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-heading uppercase tracking-wider">
          nuestros templos
        </h1>
        <p className="mt-4 text-xl text-gray-300">Encuentra una iglesia cerca de ti</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {templos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templos.map((templo: any) => {
              const photoUrl = getStrapiMedia(templo.photo?.url);
              return (
                <div key={templo.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-100">
                  <div className="relative h-64 w-full">
                    {photoUrl ? (
                      <Image 
                        src={photoUrl} 
                        alt={templo.name} 
                        fill 
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">
                        Sin Foto
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-secondary mb-2">{templo.name}</h3>
                    {templo.address && (
                       <p className="flex items-start text-gray-600 mb-4">
                         <MapPin className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                         <span>{templo.address} {templo.city && `, ${templo.city}`}</span>
                       </p>
                    )}
                    {templo.pastor && (
                      <p className="text-sm font-medium text-primary uppercase tracking-wide mb-4">
                        Pastor: {templo.pastor}
                      </p>
                    )}
                    
                    {templo.description && (
                        <div className="text-gray-500 text-sm line-clamp-3">
                           <BlocksRenderer content={templo.description} />
                        </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
           <div className="text-center py-10">
              <p className="text-xl text-gray-500">Estamos actualizando nuestra lista de templos.</p>
           </div>
        )}
      </div>
    </div>
  );
}
