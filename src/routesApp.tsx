import { AnimationRoutes, Route } from "zmp-ui";
import HomePage from "@/pages/Home";
import AvailableTrip from "./pages/AvailabeTrip";
import SetDate from "./pages/setReturnDate";


// HomePage
export default function AppRoutes() {
    return (
        <AnimationRoutes>
            <Route>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/availableTrip" element={<AvailableTrip />}></Route>
                <Route path="/setReturnDate" element={<SetDate />}></Route>
            </Route>
        </AnimationRoutes >
    );


}
