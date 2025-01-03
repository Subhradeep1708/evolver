import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
    theme: {
        tokens: {
            colors: {
                brand: {
                    light: "#D6E6FE",
                    dark: "#1D2974",
                },
            },
        },
    },
});

export const system = createSystem(defaultConfig, customConfig);
