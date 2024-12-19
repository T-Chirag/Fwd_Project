// // src/pages/CartPage.js
// import React from "react";
// import { useCart } from "../context/CartContext";

// const CartPage = () => {
//   const { cart, removeFromCart, clearCart } = useCart();

//   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   return (
//     <div className="min-h-screen bg-gray-50 py-10">
//       <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>

//       {cart.length === 0 ? (
//         <p className="text-center text-lg text-gray-500">Your cart is empty.</p>
//       ) : (
//         <div className="max-w-4xl mx-auto">
//           <ul className="divide-y divide-gray-200">
//             {cart.map((item) => (
//               <li key={item.id} className="flex items-center justify-between py-4">
//                 <div className="flex items-center">
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="w-16 h-16 object-cover rounded"
//                   />
//                   <div className="ml-4">
//                     <h2 className="text-lg font-bold">{item.title}</h2>
//                     <p>${item.price} x {item.quantity}</p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => removeFromCart(item.id)}
//                   className="text-red-500 hover:underline"
//                 >
//                   Remove
//                 </button>
//               </li>
//             ))}
//           </ul>

//           <div className="text-right mt-6">
//             <h3 className="text-xl font-bold">Total: ${total.toFixed(2)}</h3>
//             <button
//               onClick={clearCart}
//               className="bg-red-600 text-white px-4 py-2 rounded mt-2 hover:bg-red-700"
//             >
//               Clear Cart
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartPage;
