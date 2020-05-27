import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { SyntaxHighLighter } from "./src/components/SyntaxHighlighter"
import { Image } from "./src/components/Image"

const components = {
  wrapper: ({ children }) => <>{children}</>,
  pre: SyntaxHighLighter,
  img: Image,
}

export const wrapRootElement = ({ element }) => {
  return <MDXProvider components={components}>{element}</MDXProvider>
}
