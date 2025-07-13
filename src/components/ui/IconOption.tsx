import React from "react";

interface IconOptionProps {
  imagePath: string;
}

const IconOption = ({ imagePath }: IconOptionProps) => {
  return (
    <div className="flex items-center justify-center">
      <img src={imagePath} alt="" />
    </div>
  );
};

export default IconOption;
