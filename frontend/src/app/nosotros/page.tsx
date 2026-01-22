import Image from "next/image";
import { fetchAPI, getStrapiMedia } from "@/lib/strapi";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

async function getAboutData() {
  try {
    const data = await fetchAPI("/about-page");
    return data?.data;
  } catch (error) {
    console.error("Error fetching about page:", error);
    return null;
  }
}

async function getTeamMembers() {
  try {
    const data = await fetchAPI("/team-members", {
      populate: ["photo"]
    });
    return data?.data || [];
  } catch (error) {
    console.error("Error fetching team:", error);
    return [];
  }
}

export default async function AboutPage() {
  const aboutData = await getAboutData();
  const teamMembers = await getTeamMembers();

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-secondary text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-heading uppercase tracking-wider">
          Quiénes Somos
        </h1>
        <p className="mt-4 text-xl text-gray-300">Conoce nuestra historia y nuestra fe</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 space-y-16">
        
        {/* History Section */}
        <section>
          <h2 className="text-3xl font-bold text-secondary mb-6 border-l-4 border-primary pl-4">
            Nuestra Historia
          </h2>
          <div className="prose prose-lg text-gray-600">
            {aboutData?.history ? (
              <BlocksRenderer content={aboutData.history} />
            ) : (
              <p>Información histórica próximamente.</p>
            )}
          </div>
        </section>

        {/* Faith Statement */}
        <section className="bg-accent p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-secondary mb-6 border-l-4 border-primary pl-4">
            Declaración de Fe
          </h2>
          <div className="prose prose-lg text-gray-600">
             {aboutData?.faithStatement ? (
              <BlocksRenderer content={aboutData.faithStatement} />
            ) : (
              <p>Declaración de fe próximamente.</p>
            )}
          </div>
        </section>

        {/* Team/Organigram Section */}
        <section>
          <h2 className="text-3xl font-bold text-secondary mb-10 text-center uppercase tracking-widest">
            Nuestro Equipo
          </h2>
          
          {teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {teamMembers.map((member: any) => {
                 const photoUrl = getStrapiMedia(member.photo?.url);
                 return (
                  <div key={member.id} className="text-center group">
                    <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:border-primary transition-colors">
                      {photoUrl ? (
                        <Image 
                          src={photoUrl} 
                          alt={member.name} 
                          fill 
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                          Sin Foto
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-secondary">{member.name}</h3>
                    <p className="text-primary font-medium uppercase text-sm tracking-wide">{member.role}</p>
                    
                    {member.bio && (
                       <div className="mt-3 text-sm text-gray-500 line-clamp-3">
                          <BlocksRenderer content={member.bio} />
                       </div>
                    )}
                  </div>
                 );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500 italic">No hay miembros del equipo registrados aún.</p>
          )}
        </section>

      </div>
    </div>
  );
}
