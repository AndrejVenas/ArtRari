import Auctions from "./Pages/Auctions/Auctions";
import Exhibitions from "./Pages/Exhibitions/Exhibitions";
import Login from "./Pages/Login/Login";
import Registration from "./Pages/Registration/Registration";

export const route = [
    {
        path: "/exhibitions",
        Element: Exhibitions
    },
    {
        path: "/auctions",
        Element: Auctions
    },
    {
        path: "/login",
        Element: Login
    },
    {
        path: "/registration",
        Element: Registration
    }
]