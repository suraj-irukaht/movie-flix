import { FaCirclePlay } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
interface Card {
   img: string;
   title: string;
   date: number;
   type: string;
   id: number;
}
const Card = ({ img, title, date, type, id }: Card) => {
   return (
      <div className="mb-4">
         <Link
            to={`/${type}/${id}`}
            className="overflow-hidden rounded-lg pt-[120%] mb-4 relative group block"
         >
            <div className="bg-img">
               <div className="absolute inset-0 z-10 flex items-center justify-center bg-purple/40 opacity-0 group-hover:opacity-100 duration-300 transition-opacity">
                  <FaCirclePlay className="text-6xl text-purple" />
               </div>
               <img
                  src={`${
                     img
                        ? `https://image.tmdb.org/t/p/original${img}`
                        : 'https://placehold.co/600x400?text=No+Image'
                  }`}
                  alt={title}
               />
            </div>
         </Link>
         <div className="text-sm ">
            <h2 className="mb-2">{title}</h2>
            <div className="flex items-center justify-between text-white/70">
               {new Date(date).getFullYear()}
               <span className="uppercase text-white/50 text-[12px]">
                  {type}
               </span>
            </div>
         </div>
      </div>
   );
};

export default Card;
