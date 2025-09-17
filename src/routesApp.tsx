import { AnimationRoutes, Route } from "zmp-ui";
import HomePage from "@/pages/Home";

export default function AppRoutes() {
    return (
        <AnimationRoutes>
            <Route>
                <Route path="/" element={<HomePage />}></Route>
                {/* <Route path="/search" element={<SearchPage />}></Route>
                    <Route path="/category" element={<CategoryPage />}></Route>
                    <Route path="/notification" element={<NotificationPage />}></Route>
                    <Route path="/cart" element={<CartPage />}></Route>
                    <Route path="/profile" element={<ProfilePage />}></Route>
                    <Route path="/result" element={<CheckoutResultPage />}></Route> */}
            </Route>
        </AnimationRoutes >
    );


}
