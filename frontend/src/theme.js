import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
    theme: {
        tokens: {
            colors: {
                brand: {
                    light: "#D6E6FE",
                    dark: "#102353",
                },
            },
        },
    },
});

export const system = createSystem(defaultConfig, customConfig);
