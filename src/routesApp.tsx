import { AnimationRoutes, Route } from "zmp-ui";
import HomePage from "@/pages/Home";
import AvailableTrip from "./pages/AvailabeTrip";


// HomePage
export default function AppRoutes() {
    return (
        <AnimationRoutes>
            <Route>
                <Route path="/" element={<AvailableTrip />}></Route>
                <Route path="/availableTrip" element={<AvailableTrip />}></Route>

            </Route>
        </AnimationRoutes >
    );


}
