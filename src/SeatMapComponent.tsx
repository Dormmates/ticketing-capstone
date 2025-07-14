import React, { useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { FlattenedSeatMap, FlattenedSeat } from "./types/seat.ts";

interface Props {
  seatClick: (seat: FlattenedSeat) => void;
  rowClick: (seats: FlattenedSeat[]) => void;
  seatMap: FlattenedSeatMap;
}

const getSeatColor = (seat: FlattenedSeat) => {
  switch (seat.status) {
    case "vip":
      return "#facc15"; // yellow
    case "reserved":
      return "#f87171"; // red
    case "sold":
      return "#9ca3af"; // gray
    case "complimentarySeat":
      return "#38bdf8"; // blue
    case "available":
    default:
      return "#ffffff"; // white
  }
};

type ContextType = { contentRef: React.RefObject<HTMLDivElement> };

const SeatMapComponent = ({ seatClick, rowClick, seatMap }: Props) => {
  const { contentRef } = useOutletContext<ContextType>();
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [scale, setScale] = useState(1);
  const [hoveredSeat, setHoveredSeat] = useState<null | FlattenedSeat>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e: React.MouseEvent<SVGRectElement>, seat: FlattenedSeat) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const scrollY = contentRef?.current?.scrollTop ?? 0;
    const height = tooltipRef?.current?.offsetHeight ?? 0;

    setTooltipPos({
      x: rect.x,
      y: rect.y - scrollY / 10 + height,
    });

    setHoveredSeat(seat);
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

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);
  const resetView = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Group seats by section and then by row
  const grouped = seatMap.reduce<Record<string, Record<string, FlattenedSeat[]>>>((acc, seat) => {
    if (!acc[seat.section]) acc[seat.section] = {};
    if (!acc[seat.section][seat.row]) acc[seat.section][seat.row] = [];
    acc[seat.section][seat.row].push(seat);
    return acc;
  }, {});

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
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {Object.entries(grouped).map(([sectionName, rows]) => (
            <g key={sectionName} id={sectionName.replace(/\s+/g, "_")}>
              {Object.entries(rows).map(([rowName, seats]) => {
                const seatNumbers = seats.map((s) => parseInt(s.seatNumber.match(/\d+/)?.[0] || "0"));
                const rowLabel = `${rowName} ${Math.min(...seatNumbers)}-${Math.max(...seatNumbers)}`;

                return (
                  <g key={`${sectionName}-${rowName}`}>
                    <text
                      className="hover:underline cursor-pointer"
                      onClick={() => rowClick(seats)}
                      x={seats[0].x - 5}
                      y={seats[0].y + 12}
                      fontSize="10"
                      textAnchor="end"
                      fill="black"
                    >
                      {rowLabel}
                    </text>

                    {seats.map((seat) => (
                      <rect
                        key={seat.seatNumber}
                        id={seat.seatNumber}
                        x={seat.x}
                        y={seat.y}
                        width="14"
                        height="14"
                        fill={getSeatColor(seat)}
                        stroke="black"
                        className="hover:fill-blue-200 transition-colors cursor-pointer"
                        onClick={() => seatClick(seat)}
                        onMouseEnter={(e) => handleMouseEnter(e, seat)}
                        onMouseLeave={() => setHoveredSeat(null)}
                      />
                    ))}
                  </g>
                );
              })}

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

        {hoveredSeat && (
          <div
            ref={tooltipRef}
            className="fixed z-20 bg-white shadow-lg rounded px-2 py-1 text-xs border border-gray-300"
            style={{
              top: tooltipPos.y,
              left: tooltipPos.x,
              pointerEvents: "none",
            }}
          >
            <div>
              <strong>{hoveredSeat.seatNumber}</strong>
            </div>
            <div>Section: {hoveredSeat.section}</div>
            <div>Row: {hoveredSeat.row}</div>
            <div>Price: ₱{hoveredSeat.ticketPrice.toFixed(2)}</div>
            <div>Status: {hoveredSeat.status}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeatMapComponent;
