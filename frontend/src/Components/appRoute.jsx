import MainPage from "../Pages/Buyer/MainPage";
import Login from "../Pages/Login"
import Signup from "../Pages/Signup"
import About from "../Pages/Buyer/About"
import Tshirt from "../Pages/Buyer/Tshirt";
import Shirt from "../Pages/Buyer/Shirt";
import Wishlist from "../Pages/Buyer/Wishlist"
import Item from "../Pages/Buyer/Item";
import Admin from "../Pages/Admin/Admin";
import Cart from "../Pages/Buyer/Cart";
import ProductData from "../Pages/Admin/ProductData";
import UserData from "../Pages/Admin/UserData";
import Dashboard from "../Pages/Admin/Dashboard";
import OrderUpdate from "../Pages/Admin/OrderUpdate"
import Payment from "../Pages/Buyer/Payment";
import Order from "../Pages/Buyer/Order";



const appRoute=[
    {path:"/",Component:MainPage,name:"Home",role:"buyer"},
    {path:"/about",Component:About,name:"About",role:"buyer"},
    {path:"/tshirt",Component:Tshirt,name:"T-shirt",role:"buyer"},
    {path:"/shirt",Component:Shirt,name:"Shirt",role:"buyer"},
    {path:"/admin",Component:Admin,role:"admin"},
    {path:"/dashboard",Component:Dashboard,name:"Dashboard",role:"admin"},
    {path:"/cart",Component:Cart},
    {path:"/wishlist",Component:Wishlist},
    {path:"/tshirt/:id",Component:Item},
    {path:"/login",Component:Login},
    {path:"/sign",Component:Signup},
    {path:"/product",Component:ProductData,role:"admin"},
    {path:"/userdata",Component:UserData,role:"admin"},
    {path:"/orderupdate",Component:OrderUpdate,role:"admin"},
    {path:"/payment",Component:Payment},
    {path:"/order",Component:Order}
]

export default appRoute