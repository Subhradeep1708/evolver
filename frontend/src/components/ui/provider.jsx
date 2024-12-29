import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ColorModeProvider } from "./color-mode";
import { Theme } from "@chakra-ui/react";

export function Provider(props) {
    return (
        <ChakraProvider value={defaultSystem}>
            <ColorModeProvider {...props} forcedTheme="light">
                <Theme appearance="light">{props.children}</Theme>
            </ColorModeProvider>
        </ChakraProvider>
    );
}
