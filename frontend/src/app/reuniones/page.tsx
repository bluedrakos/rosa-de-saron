import { fetchAPI } from "@/lib/strapi";
import VideoGrid from "@/components/VideoGrid";
import Pagination from "@/components/Pagination";

interface SearchParams {
  page?: string;
}

async function getReuniones(page: number) {
  try {
    const pageSize = 9; // Number of videos per page
    const data = await fetchAPI("/reuniones", {
      sort: ["date:desc"],
      pagination: {
        page: page,
        pageSize: pageSize,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching reuniones:", error);
    return null;
  }
}

export default async function ReunionesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const data = await getReuniones(currentPage);
  const reuniones = data?.data || [];
  const meta = data?.meta || {};

  return (
    <div className="bg-white min-h-screen">
       {/* Header */}
       <div className="bg-secondary text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-heading uppercase tracking-wider">
          Nuestras Reuniones
        </h1>
        <p className="mt-4 text-xl text-gray-300">Revive nuestros servicios y mensajes</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {reuniones.length > 0 ? (
          <>
            <VideoGrid videos={reuniones} />
            
            {/* Pagination Controls */}
            {meta.pagination && (
              <Pagination pageCount={meta.pagination.pageCount} />
            )}
          </>
        ) : (
          <p className="text-center text-gray-500 italic">No hay reuniones disponibles para mostrar.</p>
        )}
      </div>
    </div>
  );
}
