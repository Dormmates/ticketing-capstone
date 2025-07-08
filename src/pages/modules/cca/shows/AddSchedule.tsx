import { useParams } from "react-router-dom";
import { useGetShow } from "../../../../_lib/@react-client-query/show";
import DateInput from "../../../../components/ui/DateInput";
import { useState } from "react";
import { ContentWrapper } from "../../../../components/layout/Wrapper";
import BreadCrumb from "../../../../components/ui/BreadCrumb";
import TimeInput from "../../../../components/ui/TimeInput";
import Button from "../../../../components/ui/Button";
import Dropdown from "../../../../components/ui/Dropdown";
import TextInput from "../../../../components/ui/TextInput";

type ScheduleDateTime = {
  date: Date;
  time?: string;
};

const ticketTypes = [
  { label: "Ticketed", value: "ticketed" },
  { label: "Non-Ticketed", value: "nonTicketed" },
];

const seatOptions = [
  { label: "Free Seating", value: "freeSeating" },
  { label: "Controlled Seating", value: "controlledSeating" },
];

const prcingOptions = [
  { label: "Fixed", value: "fixed" },
  { label: "Sectioned Pricing", value: "sectionedPricing" },
];

const AddSchedule = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetShow(id as string);

  const [scheduleData, setScheduleData] = useState({
    dates: [{ date: new Date(), time: "" }] as ScheduleDateTime[],
    ticketType: "ticketed",
    seatingConfiguation: "freeSeating",
    seatPricing: "fixed",
    commisionFee: 0,
    totalOrchestra: 0,
    totalBalcony: 0,
    totalComplimentary: 0,
    orchestraControlNumber: "",
    balconyControlNumber: "",
    complimentaryControlNumber: "",
  });

  if (isLoading) {
    return <h1>Fetching Show information...</h1>;
  }

  if (isError) {
    return <h1>Error Fetching show {error.message}</h1>;
  }

  if (!data) {
    return <h1>Error Fetching show</h1>;
  }

  const addAnotherDate = () => {
    setScheduleData((prev) => ({
      ...prev,
      dates: [...prev.dates, { date: new Date(), time: "" }],
    }));
  };

  const removeDate = (index: number) => {
    const newDates = scheduleData.dates.filter((_, i) => i !== index);
    setScheduleData((prev) => ({
      ...prev,
      dates: newDates,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setScheduleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (value: Date, index: number) => {
    const updatedDates = scheduleData.dates;
    updatedDates[index] = { ...updatedDates[index], date: value };
    setScheduleData((prev) => ({ ...prev, dates: updatedDates }));
  };

  const handleTimeChange = (value: string, index: number) => {
    const updatedTime = scheduleData.dates;
    updatedTime[index] = { ...updatedTime[index], time: value };
    setScheduleData((prev) => ({ ...prev, dates: updatedTime }));
  };

  return (
    <ContentWrapper className="lg:!p-20 flex flex-col">
      <BreadCrumb
        backLink={`/shows/${id}`}
        items={[
          { name: data.title, path: `/shows/${id}` },
          { name: "Add Schedule", path: "" },
        ]}
      />
      <h1 className="text-3xl mt-10">Add Schedule for {data.title}</h1>

      <div className="mt-5 flex flex-col gap-5">
        {/* Information */}
        <div className="flex flex-col gap-5">
          <div className="flex gap-5 flex-wrap">
            <div className="flex flex-col gap-5">
              {scheduleData.dates.map((date, index) => {
                return (
                  <div className="border p-2 border-lightGrey rounded-md w-fit relative">
                    <div className="flex gap-5 w-fit">
                      <DateInput
                        isError={!date.date}
                        errorMessage="Please Choose Date"
                        label="Date"
                        onChange={(e) => handleDateChange(e, index)}
                        value={date.date}
                      />
                      <TimeInput
                        isError={!date.time}
                        errorMessage="Please choose time"
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

            <Button onClick={addAnotherDate} variant="plain" className="!text-black font-normal underline !p-0 !w-fit !h-fit self-end">
              Add Another Schedule
            </Button>
          </div>

          <div>
            <Dropdown
              options={ticketTypes}
              label="Ticket Type"
              value={scheduleData.ticketType}
              onChange={(e) => setScheduleData((prev) => ({ ...prev, ticketType: e as string }))}
            />
          </div>

          <div>
            <Dropdown
              options={seatOptions}
              label="Seating Configuration"
              value={scheduleData.seatingConfiguation}
              onChange={(e) => setScheduleData((prev) => ({ ...prev, seatingConfiguation: e as string }))}
            />
          </div>
          <div>
            <Dropdown
              options={prcingOptions}
              label="Seat Pricing"
              value={scheduleData.seatPricing}
              onChange={(e) => setScheduleData((prev) => ({ ...prev, seatPricing: e as string }))}
            />
          </div>
          <div>
            <TextInput
              placeholder="PHP"
              onChange={handleInputChange}
              label="Commission Fee"
              className="max-w-[200px]"
              type="number"
              name="commisionFee"
              value={scheduleData.commisionFee + ""}
            />
          </div>
        </div>

        {/* Ticket Details */}

        <div>
          <div>Total Numbers</div>
          <div>Control Numbers</div>
        </div>

        {/* Seat Map */}

        <div>
          <div>Total Numbers</div>
          <div>Control Numbers</div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default AddSchedule;
