import { AnimationRoutes, Route } from "zmp-ui";
import HomePage from "@/pages/Home";
import AvailableTrip from "./pages/AvailabeTrip";
import RepickCore from "./pages/RepickCore/RepickCore";


// HomePage
export default function AppRoutes() {
    return (
        <AnimationRoutes>
            <Route>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/availableTrip" element={<AvailableTrip />}></Route>
                <Route path="/repickCore" element={<RepickCore />}></Route>
            </Route>
        </AnimationRoutes >
    );


}
