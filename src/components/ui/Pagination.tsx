interface Pagination {
   activePage: number;
   totalPages: number;
   handleDecrement: () => void;
   handleIncrement: () => void;
}
const Pagination: React.FC<Pagination> = ({
   activePage,
   totalPages,
   handleDecrement,
   handleIncrement,
}) => {
   return (
      <div className="flex gap-2 items-center pt-10">
         <a
            href="#"
            className={`text-white/90 bg-blue-100 rounded-md py-2 px-3 border-blue-100 border hover:bg-transparent hover:border-blue-100 ${
               activePage === 1 && 'opacity-50 pointer-events-none'
            }`}
            onClick={handleDecrement}
         >
            Prev
         </a>
         <a
            href="#"
            className={`text-white/90 bg-blue-100 rounded-md py-2 px-3 border-blue-100 border hover:bg-transparent hover:border-blue-100 ${
               activePage === totalPages && 'opacity-50 pointer-events-none'
            }`}
            onClick={handleIncrement}
         >
            Next
         </a>
         <div>
            {activePage} out of {totalPages}
         </div>
      </div>
   );
};

export default Pagination;
