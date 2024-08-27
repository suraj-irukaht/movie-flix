import { Link } from 'react-router-dom';

interface Component {
   img: string;
   title: string;
   desc: string;
   rating: number;
   type: string;
   id: number;
}

const Slide = ({ img, title, desc, rating, type, id }: Component) => {
   return (
      <div className="h-[75vh] min-h-[650px] relative flex items-end">
         <div className="bg-img">
            <img
               src={`https://image.tmdb.org/t/p/original${img}`}
               alt={title}
            />
         </div>
         <div className="absolute inset-0 bg-gradient-to-r from-black to-black/5"></div>
         <div className="absolute left-0 bottom-0 bg-gradient-to-t from-black to-transparent h-[200px] w-full"></div>
         <div className="container">
            <div className="relative z-10 text-white py-10 max-w-[600px]">
               <h2 className="text-3xl font-bold mb-4">{title}</h2>
               <div className="mb-4">Ratings: {rating}</div>
               <p>{desc.split('').slice(0, 150).join('')}...</p>
               <Link
                  to={`/${type}/${id}`}
                  className="text-sm py-2 px-5 bg-transparent border border-blue-100 rounded-full inline-flex items-center justify-center uppercase text-blue-100"
               >
                  Watch now
               </Link>
            </div>
         </div>
      </div>
   );
};

export default Slide;

//  const Slide = ({ img, title, desc }: Component) => {
//     return (
//        <Box position={'relative'} height={'100dvh'}>
//           <Image src={`https://image.tmdb.org/t/p/original${img}`} alt={title} />
//           <Heading as="h1" size="lg" mt={4} textAlign="center">
//              {title}
//           </Heading>
//           <Box as="p" color="gray.600" fontSize="sm" fontWeight="medium">
//              {desc}
//           </Box>
//        </Box>
//     );
//  };
