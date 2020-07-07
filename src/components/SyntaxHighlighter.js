import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';

const getLanguage = props => {
  const className = props.children.props.className || '';
  const matches = className.match(/language-(?<lang>.*)/);
  const language =
    matches && matches.groups && matches.groups.lang ? matches.groups.lang : '';
  return language;
};

const getCode = props => props.children.props.children;

export const SyntaxHighLighter = props => (
  <Highlight
    {...defaultProps}
    theme={theme}
    code={getCode(props)}
    language={getLanguage(props)}
  >
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre
        className={className}
        style={{ padding: '1rem', paddingBottom: 0, ...style }}
      >
        {tokens.map((line, i) => (
          <div {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              <span {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
);
