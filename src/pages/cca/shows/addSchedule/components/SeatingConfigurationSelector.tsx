import React from "react";
import type { ScheduleFormData, SeatingConfiguration } from "../../../../../types/schedule";
import Dropdown from "../../../../../components/ui/Dropdown";

const seatOptions = [
  { label: "Free Seating", value: "freeSeating" },
  { label: "Controlled Seating", value: "controlledSeating" },
] as const satisfies ReadonlyArray<{ label: string; value: SeatingConfiguration }>;

interface Props {
  scheduleData: ScheduleFormData;
  setScheduleData: React.Dispatch<React.SetStateAction<ScheduleFormData>>;
}

const SeatingConfigurationSelector = ({ scheduleData, setScheduleData }: Props) => {
  return (
    <Dropdown<SeatingConfiguration>
      options={seatOptions}
      label="Seating Configuration"
      value={scheduleData.seatingConfiguation}
      disabled={scheduleData.ticketType === "nonTicketed"}
      onChange={(value) => setScheduleData((prev) => ({ ...prev, seatingConfiguation: value }))}
    />
  );
};

export default SeatingConfigurationSelector;
