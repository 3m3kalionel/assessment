import React from "react";

import { TextHighlighterProps } from "../interfaces";

const TextHighlighter: React.FC<TextHighlighterProps> = ({
  text,
  textToMatch,
  className,
  snippet
}) => {
  const splitText = text.replace(
    new RegExp(`(${textToMatch})`, "ig"),
    `<span class=${className}>$1</span>`
  );

  return (
    <>
      {text && <span dangerouslySetInnerHTML={{ __html: splitText }} />}
      {/* {snippet && <span dangerouslySetInnerHTML={{ __html: snippet }} />} */}
    </>
  );
};

export default TextHighlighter;
