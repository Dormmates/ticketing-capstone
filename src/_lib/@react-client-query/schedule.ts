import { useMutation, useQuery } from "@tanstack/react-query";
import { request } from "../api";

import type { ScheduleFormData, SeatingConfiguration, TicketType } from "../../types/schedule";

interface AddSchedulePayload extends ScheduleFormData {
  showId: string;
}

interface ShowSchedule {
  commissionFee: string;
  contactNumber: number;
  datetime: string;
  facebookLink: number;
  femaleCount: number;
  isArchived: boolean;
  isOpen: boolean;
  isRescheduled: boolean;
  maleCount: number;
  scheduleId: string;
  seatingType: SeatingConfiguration;
  showId: string;
  ticketType: TicketType;
}

export const useAddSchedule = () => {
  return useMutation<any, Error, AddSchedulePayload>({
    mutationFn: async (payLoad: AddSchedulePayload) => {
      const res = await request("/api/schedule", payLoad, "post");
      return res.data;
    },
  });
};

export const useGetShowSchedules = (showId: string) => {
  return useQuery<{ schedules: ShowSchedule[] }, Error>({
    queryKey: ["schedules", showId],
    queryFn: async () => {
      const res = await request<{ schedules: ShowSchedule[] }>("/api/schedule", { showId }, "get");
      return res.data;
    },
  });
};
