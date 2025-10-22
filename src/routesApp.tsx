import { AnimationRoutes, Route } from "zmp-ui";
import HomePage from "@/pages/Home";
import AvailableTrip from "./pages/AvailabeTrip";
import BookingPage from "./pages/Booking";
// import RepickCore from "./pages/RepickCore";

// HomePage
export default function AppRoutes() {
    return (
        <AnimationRoutes>
            <Route>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/availableTrip" element={<AvailableTrip />}></Route>
                <Route path="/booking" element={<BookingPage />}></Route>

                {/* Turn on navigate returnDate - p */}
                {/* <Route path="/repickCore" element={<RepickCore />}></Route> */}
            </Route>
        </AnimationRoutes>
    );
}
