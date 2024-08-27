import { useParams } from 'react-router-dom';
import { details, video, similar } from '../services/api';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import Card from '../components/ui/Card';
import Loader from '../components/ui/Loader';

interface Video {
   id: number;
   type: string;
   key: string;
}

interface Genre {
   id: number;
   name: string;
}

interface ProductionCompany {
   id: number;
   name: string;
}

interface MovieDetails {
   id: number;
   title: string;
   genres: Genre[];
   overview: string;
   runtime: number;
   vote_average: number;
   poster_path: string;
   release_date: number;
   production_companies: ProductionCompany[];
}

interface TVDetails {
   id: number;
   original_name: string;
   genres: Genre[];
   overview: string;
   episode_run_time: number[];
   vote_average: number;
   poster_path: string;
   first_air_date: number;
   production_companies: ProductionCompany[];
   origin_country: string[];
   number_of_episodes: number;
   number_of_seasons: number;
}

interface State {
   details: MovieDetails | TVDetails | null;
   video: Video[];
   similar: (MovieDetails | TVDetails)[];
   isLoading: boolean;
}

const DetailsPage = () => {
   const router = useParams<{ type: string; id: string }>();
   const { type = '', id = '' } = router;

   const [state, setState] = useState<State>({
      details: null,
      video: [],
      similar: [],
      isLoading: true,
   });

   useEffect(() => {
      const fetchData = async () => {
         try {
            const [detailsData, videoData, similarData] = await Promise.all([
               details(type, Number(id)),
               video(type, Number(id)),
               similar(type, Number(id)),
            ]);

            setState({
               details: detailsData,
               video: videoData.results,
               similar: similarData.results.slice(0, 8),
               isLoading: false,
            });
         } catch (err) {
            console.log(err);
         }
      };
      fetchData();
   }, [type, id]);

   if (state.isLoading) return <Loader />;
   if (state.details === null) return <div>No data found</div>;

   const videoFile = state.video.find(
      (video: Video) => video.type === 'Trailer'
   );

   const isMovie = (): boolean => type === 'movie';

   const {
      title,
      original_name,
      genres,
      overview,
      runtime,
      poster_path,
      release_date,
      first_air_date,
      production_companies,
      origin_country,
      number_of_episodes,
      number_of_seasons,
   } = state.details as MovieDetails & TVDetails;

   return (
      <>
         <section className="pt-20">
            <div className="container">
               <div className="relative aspect-video flex md:max-w-[90%] mx-auto">
                  {videoFile ? (
                     <iframe
                        className="absolute inset-0"
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${videoFile.key}`}
                        allowFullScreen
                        title="Trailer"
                     ></iframe>
                  ) : (
                     <div className="uppercase text-4xl text-white/70 flex-grow w-full flex items-center justify-center">
                        <span>Sorry! No trailer found</span>
                     </div>
                  )}
               </div>
            </div>
         </section>
         <section className="py-28">
            <div className="container">
               <div className="flex flex-wrap">
                  <div className="sm:flex sm:flex-wrap lg:w-[65%] md:pr-6">
                     <div className="sm:w-[35%]">
                        <div className="overflow-hidden rounded-lg pt-[140%] mb-4 relative w-full">
                           <div className="bg-img">
                              <img
                                 src={`https://image.tmdb.org/t/p/original${poster_path}`}
                                 alt={isMovie() ? title : original_name}
                              />
                           </div>
                        </div>
                     </div>
                     <div className="sm:w-[65%] sm:pl-6 md:pl-5 pt-4 sm:pt-0 mb-20 sm:mb-10">
                        <h1 className="text-2xl text-white/90 font-semibold mb-6">
                           {isMovie() ? title : original_name}
                        </h1>
                        <div className="flex items-center text-lg mb-4">
                           <FaStar className="text-yellow-500 mr-2" />
                           <span className="mr-4">
                              {state.details.vote_average}
                           </span>
                           {isMovie()
                              ? runtime + ' min'
                              : number_of_episodes + ' episodes'}
                        </div>
                        <div className="mb-3 text-white/50">{overview}</div>
                        <ul className="space-y-3 text-white/50">
                           <li className="flex">
                              <span className="min-w-40">Country:</span>
                              <span>{origin_country[0]}</span>
                           </li>
                           <li className="flex">
                              <span className="min-w-40">Genre:</span>
                              <span>
                                 <span>
                                    {genres
                                       .map((genre) => genre.name)
                                       .join(', ')}
                                 </span>
                              </span>
                           </li>
                           <li className="flex">
                              <span className="min-w-40">Released:</span>
                              <span>
                                 {isMovie() ? release_date : first_air_date}
                              </span>
                           </li>
                           <li className="flex">
                              <span className="min-w-40">Production:</span>
                              <span>
                                 {production_companies
                                    .map((company) => company.name)
                                    .join(', ')}
                              </span>
                           </li>
                           {!isMovie() && (
                              <li className="flex">
                                 <span className="min-w-40">Seasons:</span>
                                 <span>{number_of_seasons}</span>
                              </li>
                           )}
                        </ul>
                     </div>
                  </div>
                  <div className="w-full lg:w-[35%]">
                     <h2 className="text-3xl mb-6">You may also like</h2>
                     <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
                        {state.similar.length > 1
                           ? state.similar.map((item) => (
                                <Card
                                   key={item.id}
                                   id={item.id}
                                   title={
                                      'title' in item
                                         ? item.title
                                         : item.original_name
                                   }
                                   img={item.poster_path}
                                   date={
                                      'release_date' in item
                                         ? item.release_date
                                         : item.first_air_date
                                   }
                                   type={'title' in item ? 'movie' : 'tv'}
                                />
                             ))
                           : 'No data available'}
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
};

export default DetailsPage;
