import { FC } from "react";
import { Box, Header, Text } from "zmp-ui";
import appConfig from "../../../app-config.json";

export const Welcome: FC = () => {
  return (
    <Header
      className="app-header no-border pl-4 flex-none pb-[6px]"
      showBackIcon={false}
      backgroundColor="#BBD6F2"
      title={
        (
          <Box flex alignItems="center" className="space-x-2">
            <img
              alt="logo"
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="w-8 h-8 rounded-lg border-inset"
              src={"/assets/favicon-gm2uUTZD.webp"}
            />
            <Box>
              <Text.Title size="small">{appConfig.app.title}</Text.Title>
            </Box>
          </Box>
        ) as unknown as string
      }
    />
  );
};

