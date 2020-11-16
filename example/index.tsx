import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Box, ChakraProvider, extendTheme, Flex } from '@chakra-ui/core';
import { LoaderDemo } from './LoaderDemo';
import { Footer } from './components/Footer';

const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};
const customTheme = extendTheme({ config });

const App = () => {
  return (
    <ChakraProvider theme={customTheme}>
      <Flex minH="100vh" flexDirection="column">
        <Box flexGrow={1}>
          <LoaderDemo />
        </Box>

        <Footer />
      </Flex>
    </ChakraProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
