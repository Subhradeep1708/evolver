import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ColorModeProvider } from "./color-mode";
import { Theme } from "@chakra-ui/react";
import { system } from "./../../theme.js";

export function Provider(props) {
    return (
        <ChakraProvider value={system}>
            <ColorModeProvider {...props} forcedTheme="light">
                <Theme appearance="dark">{props.children}</Theme>
            </ColorModeProvider>
        </ChakraProvider>
    );
}
