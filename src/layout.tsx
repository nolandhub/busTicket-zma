import { getSystemInfo } from "zmp-sdk";
import {
  App,
  SnackbarProvider,
  ZMPRouter,
} from "zmp-ui";

import BottomNav from "./components/common/Navbar";

import { AppProps } from "zmp-ui/app";
import AppRoutes from "./routesApp";
import { ConfigProvider } from "./components/common/config-provider";
import { RecoilRoot } from "recoil";
import { getConfig } from "./utils/getConfig";

const FixedSnackbarProvider =
  SnackbarProvider as unknown as React.ComponentType<{ children?: React.ReactNode }>;

const Layout = () => {
  return (
    <RecoilRoot>
      <ConfigProvider
        cssVariables={{
          "--zmp-primary-color": getConfig((c) => c.template.primaryColor),
          "--zmp-background-color": "#f4f5f6",
        }}
      >
        <App theme={getSystemInfo().zaloTheme as AppProps["theme"]}>
          <FixedSnackbarProvider >
            <ZMPRouter>
              <AppRoutes />
              <BottomNav />
            </ZMPRouter>
          </FixedSnackbarProvider>
        </App>
      </ConfigProvider>
    </RecoilRoot>



  );
};
export default Layout;
