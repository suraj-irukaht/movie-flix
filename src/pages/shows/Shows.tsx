import { useEffect, useState } from 'react';
import { info } from '../../services/api';
import Card from '../../components/ui/Card';
import Pagination from '../../components/ui/Pagination';
import Loader from '../../components/ui/Loader';

interface Shows {
   id: number;
   original_name: string;
   poster_path: string;
   first_air_date: number;
   media_type?: string;
}
interface ApiResponse {
   results: Shows[];
}

const Shows = () => {
   const [result, setResult] = useState<ApiResponse | null>(null);
   const [isLoading, setIsLoading] = useState(true);
   const [activePage, setActivePage] = useState(1);
   const [totalPage, setTotalPage] = useState(0);

   useEffect(() => {
      const fetchInfo = async () => {
         try {
            const response = await info('tv', activePage);
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

   console.log(result);

   return (
      <section className="py-28">
         <div className="container">
            <h1 className="mb-10 font-medium text-3xl">Tv shows</h1>
            <div className="grid-row">
               {result?.results?.map(
                  ({
                     id,
                     original_name,
                     poster_path,
                     first_air_date,
                     media_type,
                  }: Shows) => (
                     <Card
                        key={id}
                        id={id}
                        title={original_name}
                        img={poster_path}
                        date={first_air_date}
                        type={media_type || 'tv'}
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

export default Shows;
