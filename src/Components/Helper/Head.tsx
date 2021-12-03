import React from "react";

type HeadProps = {
  title: string;
  description?: string;
};
const Head = ({ title, description }: HeadProps) => {
  React.useEffect(() => {
    document.title = `${title} | Dogs`;
    document
      ?.querySelector("meta[name='description']")
      ?.setAttribute("content", description || "");
  }, [title, description]);
  return <></>;
};

export default Head;
