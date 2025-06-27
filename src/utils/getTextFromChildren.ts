import React from "react";

const getTextFromChildren = (children: React.ReactNode): string => {
  if (typeof children === "string" || typeof children === "number" || typeof children === "boolean") {
    return children.toString();
  }

  if (children == null) {
    return "";
  }

  if (Array.isArray(children)) {
    return children.map(getTextFromChildren).join(" ");
  }

  if (React.isValidElement(children)) {
    return getTextFromChildren(children.props.children);
  }

  return "";
};

export default getTextFromChildren;
