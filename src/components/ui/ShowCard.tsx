import React from "react";

interface ShowCardProps {
  imagePath: string;
  showTitle?: string;
}

const ShowCard = ({ imagePath, showTitle }: ShowCardProps) => {
  return (
    <div className="flex flex-col gap-5">
      <img src={imagePath} alt="" />
      {showTitle !== "" && <h1>{showTitle}</h1>}
    </div>
  );
};

export default ShowCard;
