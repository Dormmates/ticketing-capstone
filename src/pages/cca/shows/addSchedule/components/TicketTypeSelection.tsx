import React from "react";
import Dropdown from "../../../../../components/ui/Dropdown";
import type { ScheduleFormData, TicketType } from "../../../../../types/schedule";

const ticketTypes = [
  { label: "Ticketed", value: "ticketed" },
  { label: "Non-Ticketed", value: "nonTicketed" },
] as const satisfies ReadonlyArray<{ label: string; value: TicketType }>;

interface Props {
  scheduleData: ScheduleFormData;
  setScheduleData: React.Dispatch<React.SetStateAction<ScheduleFormData>>;
}

const TicketTypeSelection = ({ scheduleData, setScheduleData }: Props) => {
  return (
    <Dropdown<TicketType>
      options={ticketTypes}
      label="Ticket Type"
      value={scheduleData.ticketType}
      onChange={(value) => setScheduleData((prev) => ({ ...prev, ticketType: value }))}
    />
  );
};

export default TicketTypeSelection;
