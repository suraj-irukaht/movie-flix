import { useLocation } from 'react-router-dom';
import { fetchSearch } from '../../services/api';
import { useEffect, useState } from 'react';
import Card from '../../components/ui/Card';
import Loader from '../../components/ui/Loader';

interface Search {
   id: number;
   title: string;
   original_name: string;
   poster_path: string;
   release_date: number;
   media_type: string;
   first_air_date: number;
}

interface ApiResponse {
   results: Search[];
}

const Search = () => {
   const location = useLocation();
   const { query } = location.state || { query: '' };
   const [result, setResult] = useState<ApiResponse | null>(null);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetchSearch(query);
            setResult(response);
            setIsLoading(false);
         } catch (err) {
            console.log(err);
         }
      };
      fetchData();
   }, [query]);

   if (isLoading) return <Loader />;

   return (
      <section className="py-28">
         <div className="container">
            <h1 className="mb-14">Search Results for: {query}</h1>
            <div className="grid-row">
               {result?.results?.map((item) => (
                  <Card
                     key={item.id}
                     id={item.id}
                     title={
                        item.media_type === 'movie'
                           ? item.title
                           : item.original_name
                     }
                     img={item.poster_path}
                     date={
                        item.media_type === 'movie'
                           ? item.release_date
                           : item.first_air_date
                     }
                     type={item.media_type}
                  />
               ))}
            </div>
         </div>
      </section>
   );
};

export default Search;
