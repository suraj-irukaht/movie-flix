import { useEffect, useState } from 'react';
import { info } from '../../services/api';
import Card from '../../components/ui/Card';
import Pagination from '../../components/ui/Pagination';
import Loader from '../../components/ui/Loader';

interface Movie {
   id: number;
   title: string;
   poster_path: string;
   release_date: number;
   media_type?: string;
}
interface ApiResponse {
   results: Movie[];
}

const Movies = () => {
   const [result, setResult] = useState<ApiResponse | null>(null);
   const [isLoading, setIsLoading] = useState(true);
   const [activePage, setActivePage] = useState(1);
   const [totalPage, setTotalPage] = useState(0);

   useEffect(() => {
      const fetchInfo = async () => {
         try {
            const response = await info('movie', activePage);
            setResult(response);
            setActivePage(response?.page);
            setTotalPage(response?.total_pages);
            setIsLoading(false);
         } catch (err) {
            console.log(err);
            setIsLoading(false);
         }
      };
      fetchInfo();
   }, [activePage]);

   if (isLoading) return <Loader />;

   const handleDecrement = () => {
      if (activePage > 1) {
         setActivePage(activePage - 1);
      }
   };
   const handleIncrement = () => {
      if (activePage < totalPage) {
         setActivePage(activePage + 1);
      }
   };

   return (
      <section className="py-28">
         <div className="container">
            <h1 className="mb-10 font-medium text-3xl">Tv shows</h1>
            <div className="grid-row">
               {result?.results?.map(
                  ({
                     id,
                     title,
                     poster_path,
                     release_date,
                     media_type,
                  }: Movie) => (
                     <Card
                        key={id}
                        id={id}
                        title={title}
                        img={poster_path}
                        date={release_date}
                        type={media_type || 'movie'}
                     />
                  )
               )}
            </div>
            <Pagination
               activePage={activePage}
               totalPages={totalPage}
               handleDecrement={() => handleDecrement}
               handleIncrement={() => handleIncrement}
            />
         </div>
      </section>
   );
};

export default Movies;
