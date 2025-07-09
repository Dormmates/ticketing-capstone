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
import ControlNumberInputTutorial from "../../../../components/ui/ControlNumberInputTutorial";

type ErrorKeys =
  | "dates"
  | "commisionFee"
  | "totalOrchestra"
  | "orchestraControlNumber"
  | "totalBalcony"
  | "balconyControlNumber"
  | "totalComplimentary"
  | "complimentaryControlNumber"
  | "ticketPrice"
  | "sectionedPrice";

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

const parseControlNumbers = (input: string): number[] => {
  const parts = input.split(",").map((part) => part.trim());
  const numbers: number[] = [];

  for (const part of parts) {
    if (part.includes("-")) {
      const [startStr, endStr] = part.split("-").map((s) => s.trim());
      const start = parseInt(startStr, 10);
      const end = parseInt(endStr, 10);
      if (isNaN(start) || isNaN(end) || start > end) {
        throw new Error(`Invalid range: "${part}"`);
      }
      for (let i = start; i <= end; i++) {
        numbers.push(i);
      }
    } else {
      const num = parseInt(part, 10);
      if (isNaN(num)) {
        throw new Error(`Invalid number: "${part}"`);
      }
      numbers.push(num);
    }
  }

  return numbers;
};

const formatLabel = (key: string) =>
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .replace("Orchestra", "Orchestra ")
    .replace("Balcony", "Balcony ")
    .trim();

const AddSchedule = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetShow(id as string);

  const [scheduleData, setScheduleData] = useState({
    dates: [{ date: new Date(), time: "" }] as ScheduleDateTime[],
    ticketType: "ticketed",
    seatingConfiguation: "freeSeating",
    seatPricing: "fixed",
    commisionFee: undefined,
    totalOrchestra: undefined,
    totalBalcony: undefined,
    totalComplimentary: undefined,
    orchestraControlNumber: "",
    balconyControlNumber: "",
    complimentaryControlNumber: "",
  });

  const [ticketPrice, setTicketPrice] = useState("");
  const [sectionedPrice, setSectionedPrice] = useState({
    orchestraLeft: "",
    orchestraMiddle: "",
    orchestraRight: "",
    balconyLeft: "",
    balconyMiddle: "",
    balconyRight: "",
  });

  const [errors, setErrors] = useState<Partial<Record<ErrorKeys, string>>>({});

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

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSectionedPrice((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    let isValid = true;

    if (scheduleData.dates.length === 0 || scheduleData.dates.some((d) => !d.date || !d.time)) {
      newErrors.dates = "Each schedule must have a date and time.";
      isValid = false;
    } else {
      const seen = new Set<string>();
      for (const { date, time } of scheduleData.dates) {
        const key = `${new Date(date).toDateString()}_${time}`;
        if (seen.has(key)) {
          newErrors.dates = "Duplicate date and time entries are not allowed.";
          isValid = false;
          break;
        }
        seen.add(key);
      }
    }

    if (scheduleData.ticketType === "ticketed") {
      if (scheduleData.seatPricing === "fixed") {
        if (!ticketPrice || Number(ticketPrice) <= 0) {
          newErrors.ticketPrice = "Ticket price must be a positive number";
          isValid = false;
        }
      } else if (scheduleData.seatPricing === "sectionedPricing") {
        const sectionPrices = Object.entries(sectionedPrice);
        const emptyField = sectionPrices.find(([_, val]) => !val || isNaN(Number(val)) || Number(val) <= 0);

        if (emptyField) {
          newErrors.sectionedPrice = `Section "${formatLabel(emptyField[0])}" must have a valid price`;
          isValid = false;
        }
      }

      if (!scheduleData.commisionFee || Number(scheduleData.commisionFee) < 0) {
        newErrors.commisionFee = "Commission fee must be a non-negative number";
        isValid = false;
      }

      const sectionConfigs: {
        label: string;
        total: number;
        control: string;
        totalField: ErrorKeys;
        controlField: ErrorKeys;
      }[] = [
        {
          label: "Orchestra",
          total: Number(scheduleData.totalOrchestra),
          control: scheduleData.orchestraControlNumber,
          totalField: "totalOrchestra",
          controlField: "orchestraControlNumber",
        },
        {
          label: "Balcony",
          total: Number(scheduleData.totalBalcony),
          control: scheduleData.balconyControlNumber,
          totalField: "totalBalcony",
          controlField: "balconyControlNumber",
        },
        {
          label: "Complimentary",
          total: Number(scheduleData.totalComplimentary),
          control: scheduleData.complimentaryControlNumber,
          totalField: "totalComplimentary",
          controlField: "complimentaryControlNumber",
        },
      ];

      const used = new Set<number>();

      for (const section of sectionConfigs) {
        const { total, control, label, totalField, controlField } = section;

        if (!total || total <= 0) {
          newErrors[totalField] = `Please input a valid number of ${label.toLowerCase()} tickets`;
          isValid = false;
        }

        if (!control) {
          newErrors[controlField] = `Please enter control numbers for ${label.toLowerCase()} tickets`;
          isValid = false;
          continue;
        }

        try {
          const parsed = parseControlNumbers(control);

          if (parsed.length !== total) {
            newErrors[controlField] = `${label} control numbers do not match total (${parsed.length} vs ${total})`;
            isValid = false;
          }

          for (const num of parsed) {
            if (used.has(num)) {
              newErrors[controlField] = `${label} has duplicate or overlapping control number: ${num}`;
              isValid = false;
              break;
            }
            used.add(num);
          }
        } catch (err) {
          newErrors[controlField] = `${label} control number error: ${(err as Error).message}`;
          isValid = false;
        }
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    alert("Can Now Add");
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
                        isError={!!errors.dates}
                        errorMessage={errors.dates}
                        label="Date"
                        onChange={(e) => handleDateChange(e, index)}
                        value={date.date}
                      />
                      <TimeInput
                        isError={!!errors.dates}
                        errorMessage={errors.dates}
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
              className="min-w-[250px]"
              options={ticketTypes}
              label="Ticket Type"
              value={scheduleData.ticketType}
              onChange={(e) => setScheduleData((prev) => ({ ...prev, ticketType: e as string }))}
            />
          </div>

          <div>
            <Dropdown
              className="min-w-[250px]"
              options={seatOptions}
              label="Seating Configuration"
              disabled={scheduleData.ticketType == "nonTicketed"}
              value={scheduleData.ticketType == "nonTicketed" ? "freeSeating" : scheduleData.seatingConfiguation}
              onChange={(e) => setScheduleData((prev) => ({ ...prev, seatingConfiguation: e as string }))}
            />
          </div>
          {scheduleData.ticketType == "ticketed" && (
            <div>
              <Dropdown
                className="min-w-[250px] mb-5"
                options={prcingOptions}
                label="Seat Pricing"
                value={scheduleData.seatPricing}
                onChange={(e) => setScheduleData((prev) => ({ ...prev, seatPricing: e as string }))}
              />

              {scheduleData.seatPricing === "fixed" ? (
                <TextInput
                  placeholder="PHP"
                  onChange={(e) => setTicketPrice(e.target.value)}
                  label="Ticket Price"
                  className="max-w-[250px]"
                  type="number"
                  isError={!!errors.ticketPrice}
                  errorMessage={errors.ticketPrice}
                  value={ticketPrice}
                />
              ) : (
                <div className="border border-lightGrey rounded-md w-full p-5">
                  <div className="w-full flex flex-col gap-5">
                    <div className="flex gap-5 w-full">
                      <TextInput
                        onChange={handlePriceChange}
                        label="Orchestra Left"
                        placeholder="PHP"
                        className="w-full min-w-[300px]"
                        name="orchestraLeft"
                        type="number"
                        isError={!!errors.sectionedPrice}
                        errorMessage={errors.sectionedPrice}
                        value={sectionedPrice.orchestraLeft + ""}
                      />
                      <TextInput
                        onChange={handlePriceChange}
                        label="Orchestra Middle"
                        placeholder="PHP"
                        className="w-full min-w-[300px]"
                        name="orchestraMiddle"
                        type="number"
                        isError={!!errors.sectionedPrice}
                        errorMessage={errors.sectionedPrice}
                        value={sectionedPrice.orchestraMiddle + ""}
                      />
                      <TextInput
                        onChange={handlePriceChange}
                        label="Orchestra Right"
                        placeholder="PHP"
                        className="w-full min-w-[300px]"
                        name="orchestraRight"
                        type="number"
                        isError={!!errors.sectionedPrice}
                        errorMessage={errors.sectionedPrice}
                        value={sectionedPrice.orchestraRight + ""}
                      />
                    </div>
                    <div className="w-full flex  gap-5">
                      <TextInput
                        onChange={handlePriceChange}
                        label="Balcony Left"
                        placeholder="PHP"
                        className="w-full min-w-[300px]"
                        name="orchestraLeft"
                        type="number"
                        isError={!!errors.sectionedPrice}
                        errorMessage={errors.sectionedPrice}
                        value={sectionedPrice.balconyLeft + ""}
                      />
                      <TextInput
                        onChange={handlePriceChange}
                        label="Balcony Middle"
                        placeholder="PHP"
                        className="w-full min-w-[300px]"
                        name="orchestraMiddle"
                        type="number"
                        isError={!!errors.sectionedPrice}
                        errorMessage={errors.sectionedPrice}
                        value={sectionedPrice.balconyMiddle + ""}
                      />
                      <TextInput
                        onChange={handlePriceChange}
                        label="Balcony Right"
                        placeholder="PHP"
                        className="w-full min-w-[300px]"
                        name="orchestraRight"
                        type="number"
                        isError={!!errors.sectionedPrice}
                        errorMessage={errors.sectionedPrice}
                        value={sectionedPrice.balconyRight + ""}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {scheduleData.ticketType == "ticketed" && (
            <div>
              <TextInput
                placeholder="PHP"
                onChange={handleInputChange}
                label="Commission Fee"
                className="max-w-[250px]"
                type="number"
                name="commisionFee"
                value={scheduleData.commisionFee + ""}
                isError={!!errors.commisionFee}
                errorMessage={errors.commisionFee}
              />
            </div>
          )}
        </div>

        {/* Ticket Details */}

        {scheduleData.ticketType == "ticketed" && (
          <>
            <hr className="text-lightGrey" />
            <div className="flex flex-col gap-5">
              <h1 className="text-xl mb-5">Ticket Details</h1>
              <ControlNumberInputTutorial className="-mt-5" />
              <div className="flex gap-5 ">
                <TextInput
                  onChange={handleInputChange}
                  label={
                    <p>
                      Total Number of <span className="font-bold">Orchestra Tickets</span>
                    </p>
                  }
                  className="w-full min-w-[300px]"
                  name="totalOrchestra"
                  type="number"
                  value={scheduleData.totalOrchestra + ""}
                  isError={!!errors.totalOrchestra}
                  errorMessage={errors.totalOrchestra}
                />

                <TextInput
                  onChange={handleInputChange}
                  label={
                    <p>
                      Total Number of <span className="font-bold">Balcony Tickets</span>
                    </p>
                  }
                  className="w-full min-w-[300px]"
                  name="totalBalcony"
                  type="number"
                  value={scheduleData.totalBalcony + ""}
                  isError={!!errors.totalBalcony}
                  errorMessage={errors.totalBalcony}
                />

                <TextInput
                  onChange={handleInputChange}
                  label={
                    <p>
                      Total Number of <span className="font-bold">Complimentary Tickets</span>
                    </p>
                  }
                  className="w-full min-w-[300px]"
                  name="totalComplimentary"
                  type="number"
                  value={scheduleData.totalComplimentary + ""}
                  isError={!!errors.totalComplimentary}
                  errorMessage={errors.totalComplimentary}
                />
              </div>
              <h2>Ticket Control Numbers</h2>
              <div className="flex gap-5 w-full">
                <TextInput
                  onChange={handleInputChange}
                  label={
                    <p>
                      Control Number of <span className="font-bold">Orchestra Tickets</span>
                    </p>
                  }
                  placeholder="eg. 1-250"
                  className="w-full min-w-[300px]"
                  name="orchestraControlNumber"
                  value={scheduleData.orchestraControlNumber}
                  isError={!!errors.orchestraControlNumber}
                  errorMessage={errors.orchestraControlNumber}
                />

                <TextInput
                  onChange={handleInputChange}
                  label={
                    <p>
                      Control Number of <span className="font-bold">Balcony Tickets</span>
                    </p>
                  }
                  placeholder="eg. 251-500"
                  className="w-full min-w-[300px]"
                  name="balconyControlNumber"
                  value={scheduleData.balconyControlNumber}
                  isError={!!errors.balconyControlNumber}
                  errorMessage={errors.balconyControlNumber}
                />

                <TextInput
                  onChange={handleInputChange}
                  label={
                    <p>
                      Control Number of <span className="font-bold">Complimentary Tickets</span>
                    </p>
                  }
                  placeholder="eg. 501-750"
                  className="w-full min-w-[300px]"
                  name="complimentaryControlNumber"
                  value={scheduleData.complimentaryControlNumber}
                  isError={!!errors.complimentaryControlNumber}
                  errorMessage={errors.complimentaryControlNumber}
                />
              </div>
            </div>
          </>
        )}

        {/* Seat Map */}
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </ContentWrapper>
  );
};

export default AddSchedule;
