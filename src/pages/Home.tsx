import { useEffect, useState } from 'react';
import { nowPlaying, trending, popular, comingSoon } from '../services/api';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { RiMovieLine } from 'react-icons/ri';
import { CiBoxList } from 'react-icons/ci';
import 'swiper/css';
import 'swiper/css/pagination';
import Slide from '../components/ui/Slide';
import Card from '../components/ui/Card';
import Loader from '../components/ui/Loader';

const Home = () => {
   interface Movie {
      id: number;
      title: string;
      overview: string;
      backdrop_path: string;
      vote_average: number;
      poster_path: string;
      original_title: string;
      media_type: string;
      release_date: number;
      name: string;
      first_air_date: number;
   }

   interface State {
      nowPlayingMovies: Movie[];
      trendingMovies: Movie[];
      trendingShows: Movie[];
      popularMovies: Movie[];
      popularShows: Movie[];
      comingSoonMovies: Movie[];
      comingSoonShows: Movie[];
      isLoading: boolean;
   }

   const [state, setState] = useState<State>({
      nowPlayingMovies: [],
      trendingMovies: [],
      trendingShows: [],
      popularMovies: [],
      popularShows: [],
      comingSoonMovies: [],
      comingSoonShows: [],
      isLoading: true,
   });

   const [timeFrame, setTimeFrame] = useState('day');
   const [isMovie, setIsMovie] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const [
               nowPlayingData,
               trendingMoviesData,
               trendingShowsData,
               popularMoviesData,
               popularShowsData,
               comingSoonMoviesData,
               comingSoonShowsData,
            ] = await Promise.all([
               nowPlaying(),
               trending(timeFrame, 'movie'),
               trending(timeFrame, 'tv'),
               popular('movie'),
               popular('tv'),
               comingSoon('movie', 'upcoming'),
               comingSoon('tv', 'on_the_air'),
            ]);

            setState({
               nowPlayingMovies: nowPlayingData?.results.slice(0, 8),
               trendingMovies: trendingMoviesData?.results.slice(0, 12),
               trendingShows: trendingShowsData?.results.slice(0, 12),
               popularMovies: popularMoviesData?.results.slice(0, 12),
               popularShows: popularShowsData?.results.slice(0, 12),
               comingSoonMovies: comingSoonMoviesData?.results.slice(0, 12),
               comingSoonShows: comingSoonShowsData?.results.slice(0, 12),
               isLoading: false,
            });
         } catch (err) {
            console.error(err);
         }
      };
      fetchData();
   }, [timeFrame]);

   if (state.isLoading) return <Loader />;

   return (
      <>
         <section>
            <Swiper
               modules={[Pagination, Autoplay]}
               spaceBetween={50}
               slidesPerView={1}
               pagination={{
                  type: 'bullets',
                  bulletClass: 'swiper-custom-bullet',
                  bulletActiveClass: 'swiper-custom-bullet-active',
                  clickable: true,
               }}
               autoplay={{
                  delay: 6000,
                  disableOnInteraction: false,
               }}
            >
               {state.nowPlayingMovies?.map(
                  ({
                     id,
                     backdrop_path,
                     title,
                     overview,
                     vote_average,
                     media_type,
                  }) => (
                     <SwiperSlide key={id}>
                        <Slide
                           img={backdrop_path}
                           title={title}
                           desc={overview}
                           rating={vote_average}
                           type={media_type || 'movie'}
                           id={id}
                        />
                     </SwiperSlide>
                  )
               )}
            </Swiper>
         </section>
         <section className="py-28">
            <div className="container">
               <div className="flex flex-wrap items-center gap-5 justify-between mb-10">
                  <div className="flex items-center gap-5">
                     <h2 className="text-xl">Trending</h2>
                     <div className="flex gap-1">
                        <a
                           href="#"
                           className={`tag ${isMovie && 'bg-blue-100'}`}
                           onClick={(e) => {
                              e.preventDefault();
                              setIsMovie(true);
                           }}
                        >
                           <RiMovieLine /> Movies
                        </a>
                        <a
                           href="#"
                           className={`tag ${!isMovie && 'bg-blue-100'}`}
                           onClick={(e) => {
                              e.preventDefault();
                              setIsMovie(false);
                           }}
                        >
                           <CiBoxList /> Shows
                        </a>
                     </div>
                  </div>
                  <div className="flex items-center gap-5 uppercase text-sm">
                     <a
                        href="#"
                        className={`${
                           timeFrame === 'day' ? 'text-blue-100' : 'text-white'
                        } hover:text-blue-100`}
                        onClick={(e) => {
                           e.preventDefault();
                           setTimeFrame('day');
                        }}
                     >
                        Day
                     </a>
                     <a
                        href="#"
                        className={`${
                           timeFrame === 'week' ? 'text-blue-100' : 'text-white'
                        } hover:text-blue-100`}
                        onClick={(e) => {
                           e.preventDefault();
                           setTimeFrame('week');
                        }}
                     >
                        Week
                     </a>
                  </div>
               </div>
               <div className="grid-row">
                  {isMovie
                     ? state.trendingMovies.map(
                          ({
                             id,
                             original_title,
                             poster_path,
                             media_type,
                             release_date,
                          }) => (
                             <Card
                                key={id}
                                id={id}
                                title={original_title}
                                img={poster_path}
                                date={release_date}
                                type={media_type}
                             />
                          )
                       )
                     : state.trendingShows.map(
                          ({
                             id,
                             name,
                             poster_path,
                             media_type,
                             first_air_date,
                          }) => (
                             <Card
                                key={id}
                                id={id}
                                title={name}
                                img={poster_path}
                                date={first_air_date}
                                type={media_type}
                             />
                          )
                       )}
               </div>
            </div>
         </section>
         <section className="pb-28">
            <div className="container">
               <h2 className="text-xl mb-8">Popular Movies</h2>
               <div className="grid-row">
                  {state.popularMovies.map(
                     ({
                        id,
                        original_title,
                        poster_path,
                        media_type,
                        release_date,
                     }) => (
                        <Card
                           key={id}
                           id={id}
                           title={original_title}
                           img={poster_path}
                           date={release_date}
                           type={media_type || 'movie'}
                        />
                     )
                  )}
               </div>
            </div>
         </section>
         <section className="pb-28">
            <div className="container">
               <h2 className="text-xl mb-8">Popular Shows</h2>
               <div className="grid-row">
                  {state.popularShows.map(
                     ({
                        id,
                        name,
                        poster_path,
                        media_type,
                        first_air_date,
                     }) => (
                        <Card
                           key={id}
                           id={id}
                           title={name}
                           img={poster_path}
                           date={first_air_date}
                           type={media_type || 'tv'}
                        />
                     )
                  )}
               </div>
            </div>
         </section>
         <section className="pb-28">
            <div className="container">
               <h2 className="text-xl mb-8">Upcoming Movies</h2>
               <div className="grid-row">
                  {state.comingSoonMovies.map(
                     ({
                        id,
                        original_title,
                        poster_path,
                        media_type,
                        release_date,
                     }) => (
                        <Card
                           key={id}
                           id={id}
                           title={original_title}
                           img={poster_path}
                           date={release_date}
                           type={media_type || 'movie'}
                        />
                     )
                  )}
               </div>
            </div>
         </section>
         <section className="pb-28">
            <div className="container">
               <h2 className="text-xl mb-8">Upcoming Shows</h2>
               <div className="grid-row">
                  {state.comingSoonShows.map(
                     ({
                        id,
                        name,
                        poster_path,
                        media_type,
                        first_air_date,
                     }) => (
                        <Card
                           key={id}
                           id={id}
                           title={name}
                           img={poster_path}
                           date={first_air_date}
                           type={media_type || 'tv'}
                        />
                     )
                  )}
               </div>
            </div>
         </section>
      </>
   );
};

export default Home;
