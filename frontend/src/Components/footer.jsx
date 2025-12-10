// import React from "react";
// import { Facebook, Twitter, Instagram, Pinterest } from "lucide-react";

// export default function Footer() {
//   return (
//     <footer className="bg-black text-gray-300 py-14 px-4 md:px-16 border-t border-gray-800">
//       <div
//         className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-24 lg:gap-32"
//       >
//         {/* Logo + Text */}
//         <div className="space-y-5 max-w-sm">
//           <img
//             src="/image/logo-white.png"
//             alt="ModaStitch Logo"
//             className="w-28"
//           />

//           <p className="leading-relaxed text-sm text-gray-400">
//             ModaStitch – Your go-to online destination for trendy, handcrafted
//             fashion. Shop stylish apparel with comfort, quality & elegance at
//             your fingertips.
//           </p>

//           {/* Social Icons */}
//           <div className="flex space-x-4 pt-2">
//             <a
//               className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition shadow-lg hover:scale-105"
//               href="#"
//             >
//               <Facebook size={18} />
//             </a>
//             <a
//               className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition shadow-lg hover:scale-105"
//               href="#"
//             >
//               <Twitter size={18} />
//             </a>
//             <a
//               className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition shadow-lg hover:scale-105"
//               href="#"
//             >
//               <Instagram size={18} />
//             </a>
//             <a
//               className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition shadow-lg hover:scale-105"
//               href="#"
//             >
//               <Pinterest size={18} />
//             </a>
//           </div>
//         </div>

//         {/* Need Help */}
//         <div className="space-y-4">
//           <h3 className="font-semibold text-lg text-white border-b border-gray-700 pb-1 w-max">
//             Need Help
//           </h3>
//           <ul className="space-y-2 text-sm">
//             <li className="hover:text-white transition cursor-pointer">Contact Us</li>
//             <li className="hover:text-white transition cursor-pointer">Track Order</li>
//             <li className="hover:text-white transition cursor-pointer">FAQs</li>
//             <li className="hover:text-white transition cursor-pointer">My Account</li>
//           </ul>
//         </div>

//         {/* Quick Links */}
//         <div className="space-y-4">
//           <h3 className="font-semibold text-lg text-white border-b border-gray-700 pb-1 w-max">
//             Quick Links
//           </h3>
//           <ul className="space-y-2 text-sm">
//             <li className="hover:text-white transition cursor-pointer">Orders</li>
//             <li className="hover:text-white transition cursor-pointer">Wishlist</li>
//             <li className="hover:text-white transition cursor-pointer">Cart</li>
//             <li className="hover:text-white transition cursor-pointer">Shop</li>
//           </ul>
//         </div>

//         {/* More Info */}
//         <div className="space-y-4">
//           <h3 className="font-semibold text-lg text-white border-b border-gray-700 pb-1 w-max">
//             More Info
//           </h3>
//           <ul className="space-y-2 text-sm">
//             <li className="hover:text-white transition cursor-pointer">About Us</li>
//             <li className="hover:text-white transition cursor-pointer">Privacy Policy</li>
//             <li className="hover:text-white transition cursor-pointer">Terms and Condition</li>
//             <li className="hover:text-white transition cursor-pointer">
//               Return and Refund Policy
//             </li>
//           </ul>
//         </div>
//       </div>
//     </footer>
//   );
// }




import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 px-6 mt-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">

        {/* Brand Section */}
        <div className="col-span-2">
          <h3 className="text-3xl font-extrabold tracking-wide">ModaStitch</h3>

          <p className="mt-4 text-gray-300 leading-relaxed max-w-sm">
            ModaStitch – Your go-to online destination for trendy, handcrafted
            fashion. Shop stylish apparel with comfort, quality & elegance at
             your fingertips.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-6">
            <a className="w-10 h-10 bg-white/10 flex items-center justify-center rounded-full hover:bg-white hover:text-black transition">
              <i className="fa fa-github text-xl"></i>
            </a>

            <a className="w-10 h-10 bg-white/10 flex items-center justify-center rounded-full hover:bg-white hover:text-black transition">
              <i className="fa fa-instagram text-xl"></i>
            </a>

            <a className="w-10 h-10 bg-white/10 flex items-center justify-center rounded-full hover:bg-white hover:text-black transition">
              <i className="fa fa-linkedin-square text-xl"></i>
            </a>

            <a className="w-10 h-10 bg-white/10 flex items-center justify-center rounded-full hover:bg-white hover:text-black transition">
              <i className="fa fa-facebook-official text-xl"></i>
            </a>
          </div>
        </div>

        {/* Column 1 */}
        <div>
          <h4 className="text-lg font-semibold mb-4">COMPANY</h4>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-white cursor-pointer">About</li>
            <li className="hover:text-white cursor-pointer">Features</li>
            <li className="hover:text-white cursor-pointer">Work</li>
            <li className="hover:text-white cursor-pointer">Career</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="text-lg font-semibold mb-4">HELP</h4>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-white cursor-pointer">Customer Support</li>
            <li className="hover:text-white cursor-pointer">Delivery Details</li>
            <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="text-lg font-semibold mb-4">FAQ</h4>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-white cursor-pointer">Account</li>
            <li className="hover:text-white cursor-pointer">Manage Account</li>
            <li className="hover:text-white cursor-pointer">Order</li>
            <li className="hover:text-white cursor-pointer">Payment</li>
          </ul>
        </div>

        
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 mt-12 pt-6 text-center text-gray-400 text-sm">
        ModaStitch © 2000-2023 • All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;

