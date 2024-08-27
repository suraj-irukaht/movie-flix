import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { genre } from '../../services/api';
import { IoMenuOutline } from 'react-icons/io5';
import { useRef } from 'react';

interface Genre {
   id: number;
   name: string;
}

const Header = () => {
   const [showForm, setShowForm] = useState(false);
   const [query, setQuery] = useState('');
   const [genres, setGenres] = useState<Genre[]>([]);
   const [height, setHeight] = useState(0);
   const [showDropdown, setShowDropdown] = useState(false);
   const [showNav, setShowNav] = useState(false);
   const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1024);
   const navigate = useNavigate();

   const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      navigate('/search', { state: { query: query } });
      setQuery('');
      setShowForm(false);
   };

   const dropdown = useRef<HTMLUListElement>(null);
   const updateView = () => {
      setIsMobileView(window.innerWidth < 1024);
   };

   useEffect(() => {
      const fetchGenres = async () => {
         try {
            const response = await genre('movie');
            setGenres(response.genres);
         } catch (err) {
            console.error(err);
         }
      };

      const getHeight = () => {
         if (dropdown.current && isMobileView) {
            const height = dropdown.current.scrollHeight;
            setHeight(height);
         }
      };
      window.addEventListener('resize', updateView);
      fetchGenres();
      getHeight();
      return () => {
         window.removeEventListener('resize', updateView);
      };
   }, [height, isMobileView]);

   return (
      <header className="py-4 absolute top-0 left-0 w-full z-50 bg-gradient-to-b from-black to-transparent">
         <div className="container flex items-center justify-between gap-5">
            <Link
               to="/"
               className="uppercase font-bold text-xl text-white flex-shrink-0"
            >
               MOVIE-FLIX
            </Link>
            <nav
               className={`absolute top-full bg-blue-200 w-full left-0 p-4 transition-transform duration-300 ease-in-out ${
                  showNav ? 'translate-x-0' : 'translate-x-full'
               } lg:translate-x-0 lg:static lg:bg-transparent lg:p-0`}
            >
               <ul className="space-y-4 lg:space-y-0 lg:flex lg:items-center lg:gap-4 lg:justify-end">
                  <li>
                     <Link
                        to="/"
                        className="text-white lg:py-3 hover:text-blue-100 inline-block"
                     >
                        Home
                     </Link>
                  </li>
                  <li className="relative">
                     <button
                        className="text-white text-left group lg:py-3 hover:text-blue-100 transition-colors duration-300"
                        onClick={() => {
                           setShowDropdown(!showDropdown);
                        }}
                     >
                        Genre
                        <div
                           className="transition-[height] duration-500 ease-in-out overflow-hidden lg:absolute lg:-left-[90px] lg:h-auto lg:top-full 
                           lg:opacity-0 lg:invisible lg:group-hover:opacity-100 lg:group-hover:visible lg:transition-opacity"
                           style={
                              isMobileView
                                 ? {
                                      height: !showDropdown
                                         ? '0px'
                                         : `${height}px`,
                                   }
                                 : undefined
                           }
                        >
                           <ul
                              className="grid grid-cols-3 text-sm font-thin gap-2 pt-3 pb-1 lg:rounded-md lg:bg-blue-100 lg:w-[360px]  lg:p-4"
                              ref={dropdown}
                           >
                              {genres.map(({ id, name }) => (
                                 <li key={id} className="">
                                    <Link
                                       className="text-white hover:text-blue-100"
                                       to={`/genre/${encodeURIComponent(
                                          name
                                       )}/${id}`}
                                    >
                                       {name}
                                    </Link>
                                 </li>
                              ))}
                           </ul>
                        </div>
                     </button>
                  </li>
                  <li>
                     <Link
                        to="/movies"
                        className="text-white lg:py-3 hover:text-blue-100 inline-block"
                     >
                        Movies
                     </Link>
                  </li>
                  <li>
                     <Link
                        to="/shows"
                        className="text-white lg:py-3 hover:text-blue-100 inline-block"
                     >
                        Shows
                     </Link>
                  </li>
                  <li className="relative">
                     <button
                        className="text-white"
                        onClick={() => setShowForm(!showForm)}
                     >
                        Search
                     </button>
                     <form
                        action="#"
                        className={`absolute top-full right-0 transition-opacity ${
                           showForm
                              ? 'opacity-100 visible'
                              : 'opacity-0 invisible'
                        }`}
                        onSubmit={handleSearch}
                     >
                        <input
                           type="text"
                           placeholder="Search..."
                           name=""
                           id=""
                           className="h-10 w-[250px] bg-blue-100 rounded-full text-white py-3 px-4"
                           value={query}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              setQuery(e.target.value)
                           }
                        />
                     </form>
                  </li>
               </ul>
            </nav>
            <button onClick={() => setShowNav(!showNav)} className="lg:hidden">
               <IoMenuOutline />
            </button>
         </div>
      </header>
   );
};

export default Header;
