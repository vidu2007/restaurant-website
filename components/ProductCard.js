// export default function ProductCard({ product }) {
//   const { image, name, description, price } = product;

//   return (
//     <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300 ease-in-out flex flex-col md:flex-row items-center p-4 m-2 w-full max-w-sm md:max-w-none md:w-auto">
//       {/* Product Image */}
//       <div className="flex-shrink-0 w-full md:w-1/3 h-48 md:h-full overflow-hidden rounded-md md:rounded-none md:rounded-l-lg">
//         <img
//           src={image}
//           alt={name}
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Product Details */}
//       <div className="p-4 flex-grow text-center md:text-left">
//         <h3 className="text-xl font-semibold text-rose-800 mb-2">{name}</h3>
//         <p className="text-gray-700 text-sm mb-3">{description}</p>
//         <div className="flex items-center justify-center md:justify-start mt-4">
//           <span className="text-2xl font-bold text-rose-900">${price.toFixed(2)}</span>
//           <button className="ml-4 px-4 py-2 bg-rose-700 text-white font-medium text-2xl md:text-lg lg:text-lg rounded-full hover:bg-rose-800 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-opacity-50">
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };