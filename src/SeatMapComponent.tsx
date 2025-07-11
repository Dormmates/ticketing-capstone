import React, { useRef, useState } from "react";
import { seatMap as seatMetaData } from "../seatdata.ts";

const SeatMapComponent: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const seatMap = seatMetaData;

  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    const delta = -e.deltaY;
    const newScale = delta > 0 ? scale * 1.1 : scale * 0.9;
    setScale(Math.min(Math.max(newScale, 0.5), 3));
  };

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-full h-[80vh] border border-gray-300 rounded-lg overflow-hidden">
      <div className="absolute top-2 left-2 z-10 flex space-x-2">
        <button onClick={() => setScale((prev) => Math.min(prev + 0.1, 3))} className="px-3 py-1 bg-white border border-gray-300 rounded shadow">
          +
        </button>
        <button onClick={() => setScale((prev) => Math.max(prev - 0.1, 0.5))} className="px-3 py-1 bg-white border border-gray-300 rounded shadow">
          -
        </button>
        <button onClick={resetView} className="px-3 py-1 bg-white border border-gray-300 rounded shadow">
          Reset
        </button>
      </div>

      <div className="w-full h-full overflow-hidden flex justify-center items-center">
        <svg
          ref={svgRef}
          width="1305"
          height="700"
          viewBox="0 0 1005 442"
          className="bg-gray-100"
          style={{
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            transformOrigin: "0 0",
            cursor: isDragging ? "grabbing" : "grab",
          }}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {/* Render sections */}
          {Object.entries(seatMap).map(([sectionName, rows]) => (
            <g key={sectionName} id={sectionName.replace(/\s+/g, "_")}>
              {/* Render rows */}
              {Object.entries(rows).map(([rowName, seats]) => {
                if (!seats.length) return null;

                // Get seat range from seatNumber like "A1" and "A10"
                const seatNumbers = seats
                  .map((seat) => seat.seatNumber.match(/\d+/)?.[0])
                  .filter(Boolean)
                  .map(Number);
                const min = Math.min(...seatNumbers);
                const max = Math.max(...seatNumbers);
                const rowLabel = `${rowName}${min}-${max}`;

                return (
                  <g key={`${sectionName}-${rowName}`} id={`${rowName}`}>
                    {/* Row label (to the left of the first seat) */}
                    <text x={seats[0].x - 5} y={seats[0].y + 12} fontSize="10" textAnchor="end" fill="black">
                      {rowLabel}
                    </text>

                    {/* Render seats */}
                    {seats.map((seat) => (
                      <rect
                        key={seat.seatNumber}
                        id={seat.seatNumber}
                        x={seat.x}
                        y={seat.y}
                        width="14"
                        height="14"
                        fill="white"
                        stroke="black"
                        className="hover:fill-blue-200 transition-colors cursor-pointer"
                        onClick={() => console.log(`Selected seat: ${seat.seatNumber}`)}
                      />
                    ))}
                  </g>
                );
              })}

              {/* Section label – place it above the first row of the section */}
              {(() => {
                const allSeats = Object.values(rows).flat();
                if (allSeats.length === 0) return null;
                const minX = Math.min(...allSeats.map((seat) => seat.x));
                const minY = Math.min(...allSeats.map((seat) => seat.y));
                return (
                  <text x={minX} y={minY - 10} fontSize="12" fontWeight="bold" fill="black">
                    {sectionName.replace(/_/g, " ").toUpperCase()}
                  </text>
                );
              })()}
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default SeatMapComponent;
