import Hero from "@/components/Hero";
import EventList from "@/components/EventList";
import SermonList from "@/components/SermonList";
import { fetchAPI } from "@/lib/strapi";

async function getHomepageData() {
  try {
    const data = await fetchAPI("/homepage", {
      populate: {
        heroImage: {
          fields: ["url", "alternativeText"]
        }
      }
    });
    return data?.data;
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return null;
  }
}

async function getUpcomingEvents() {
  try {
    const data = await fetchAPI("/events", {
      sort: ["date:asc"],
      pagination: {
        limit: 3
      },
      filters: {
        date: {
          $gte: new Date().toISOString()
        }
      }
    });
    return data?.data || [];
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

async function getRecentSermons() {
  try {
    const data = await fetchAPI("/reuniones", {
      sort: ["date:desc"],
      pagination: {
        limit: 3
      }
    });
    return data?.data || [];
  } catch (error) {
    console.error("Error fetching sermons:", error);
    return [];
  }
}

export default async function Home() {
  const homepageData = await getHomepageData();
  const events = await getUpcomingEvents();
  const sermons = await getRecentSermons();

  return (
    <div className="flex flex-col min-h-screen">
      <Hero data={homepageData} />
      <EventList events={events} />
      <SermonList sermons={sermons} />
      
      {/* Featured Video Section (Hardcoded or fetched if we had a featured video field) */}
      <section className="py-20 bg-secondary text-white text-center">
         <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 font-heading uppercase">Únete a nosotros en vivo</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Transmitimos nuestros servicios todos los domingos. ¡No te pierdas de lo que Dios está haciendo!
            </p>
            <a 
              href="https://www.youtube.com/@iglesiarosadesaron6024" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold uppercase transition-colors inline-flex items-center"
            >
              Ver Canal de YouTube
            </a>
         </div>
      </section>
    </div>
  );
}
