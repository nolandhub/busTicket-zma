import { Box } from "zmp-ui";
import RouteIndicator from "./RouteIndicatorIcon";

export function TripItem() {
    return (
        <Box className="p-2">
            <RouteIndicator defStart="New York" defEnd="Canada" />



        </Box>
    );
}
