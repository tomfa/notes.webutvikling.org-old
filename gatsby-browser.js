import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { SyntaxHighLighter } from './src/components/SyntaxHighlighter';

const components = {
  wrapper: ({ children }) => <>{children}</>,
  pre: SyntaxHighLighter,
};

export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>{element}</MDXProvider>
);
