import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getByGenre } from '../services/api';
import Loader from '../components/ui/Loader';
import Card from '../components/ui/Card';

const Genres = () => {
   const router = useParams<{ query: string; id: string }>();
   const { query, id } = router;

   const [state, setState] = useState({
      movieGenre: [],
      showsGenre: [],
      isLoading: true,
   });

   useEffect(() => {
      const fetchData = async () => {
         try {
            const [movieResponse, showResponse] = await Promise.all([
               getByGenre('movie', Number(id)),
               getByGenre('tv', Number(id)),
            ]);
            setState({
               movieGenre: movieResponse.results,
               showsGenre: showResponse.results,
               isLoading: false,
            });
         } catch (err) {
            console.log(err);
         }
      };
      fetchData();
   }, [query, id]);

   if (state.isLoading) return <Loader />;

   console.log(state.showsGenre);

   return (
      <section className="pt-28">
         <div className="container">
            <div className="mb-20">
               <h1 className="font-medium text-white text-3xl mb-10">
                  {query} Movies
               </h1>
               <div className="grid-row">
                  {state.movieGenre?.map(
                     ({ id, poster_path, title, release_date }) => (
                        <Card
                           key={id}
                           id={id}
                           title={title}
                           img={poster_path}
                           date={release_date}
                           type="movie"
                        />
                     )
                  )}
               </div>
            </div>
            {state.showsGenre.length > 0 && (
               <div className="mb-20">
                  <h1 className="font-medium text-white text-3xl mb-10">
                     {query} Shows
                  </h1>
                  <div className="grid-row">
                     {state.showsGenre?.map(
                        ({
                           id,
                           poster_path,
                           original_name,
                           first_air_date,
                        }) => (
                           <Card
                              key={id}
                              id={id}
                              title={original_name}
                              img={poster_path}
                              date={first_air_date}
                              type="tv"
                           />
                        )
                     )}
                  </div>
               </div>
            )}
         </div>
      </section>
   );
};

export default Genres;
