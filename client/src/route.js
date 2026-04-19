import Auctions from "./Pages/Auctions/Auctions";
import CreateExhibition from "./Pages/CreateExhibition/CreateExhibition";
import Exhibitions from "./Pages/Exhibitions/Exhibitions";
import Login from "./Pages/Login/Login";
import Registration from "./Pages/Registration/Registration";
import WorkDownload from "./Pages/WorkDownload/WorkDownload";

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
    },
    {
        path: "/createExhibition",
        Element: CreateExhibition
    },
    {
        path: "/WorkDownload",
        Element: WorkDownload
    }
]