import MainPage from "../Pages/Buyer/MainPage";
import Login from "../Pages/Login"
import Signup from "../Pages/Signup"
import About from "../Pages/Buyer/About"
import Tshirt from "../Pages/Buyer/Tshirt";
import Shirt from "../Pages/Buyer/Shirt";
import Wishlist from "../Pages/Buyer/Wishlist"
import Item from "../Pages/Buyer/Item";
import Admin from "../Pages/Admin/Admin";



const appRoute=[
    {path:"/",Component:MainPage,name:"Home"},
    {path:"/about",Component:About,name:"About"},
    {path:"/tshirt",Component:Tshirt,name:"T-shirt"},
    {path:"/shirt",Component:Shirt,name:"Shirt"},
    {path:"/admin",Component:Admin},
    {path:"/wishlist",Component:Wishlist},
    {path:"/tshirt/:id",Component:Item},
    {path:"/login",Component:Login},
    {path:"/sign",Component:Signup}
]

export default appRoute