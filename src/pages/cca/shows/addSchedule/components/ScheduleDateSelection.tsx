import type { ScheduleFormData } from "../../../../../types/schedule";
import DateInput from "../../../../../components/ui/DateInput";
import TimeInput from "../../../../../components/ui/TimeInput";

interface Props {
  scheduleData: ScheduleFormData;
  removeDate: (index: number) => void;
  handleDateChange: (value: Date, index: number) => void;
  handleTimeChange: (value: string, index: number) => void;
  errors?: Partial<Record<"dates", string>>;
}

const ScheduleDateSelection = ({ scheduleData, removeDate, handleDateChange, handleTimeChange, errors }: Props) => {
  return (
    <div className="flex flex-col gap-5">
      {scheduleData.dates.map((date, index) => {
        return (
          <div key={index} className="border p-2 border-lightGrey rounded-md w-fit relative">
            <div className="flex gap-5 w-fit">
              <DateInput
                isError={!!errors?.dates}
                errorMessage={errors?.dates}
                label="Date"
                onChange={(e) => handleDateChange(e, index)}
                value={date.date}
              />
              <TimeInput
                isError={!!errors?.dates}
                errorMessage={errors?.dates}
                label="Time"
                onChange={(e) => handleTimeChange(e, index)}
                value={date.time}
              />
            </div>
            <button
              type="button"
              className={`text-sm text-red mt-1 absolute -top-3 -right-1 font-bold z-10 ${scheduleData.dates.length === 1 && "hidden"}`}
              onClick={() => removeDate(index)}
            >
              X
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ScheduleDateSelection;
