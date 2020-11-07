import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/core';
import { LoaderDemo } from './LoaderDemo';

const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};
const customTheme = extendTheme({ config });

const App = () => {
  return (
    <ChakraProvider theme={customTheme}>
      <div>
        <LoaderDemo />
      </div>
    </ChakraProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
