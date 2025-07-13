import React from "react";
import Dropdown from "../../../../../components/ui/Dropdown";
import TextInput from "../../../../../components/ui/TextInput";

import type { ErrorKeys, ScheduleFormData, SeatPricing } from "../../../../../types/schedule";

const pricingOptions = [
  { label: "Fixed", value: "fixed" },
  { label: "Sectioned Pricing", value: "sectionedPricing" },
] as const satisfies ReadonlyArray<{ label: string; value: SeatPricing }>;

interface Props {
  scheduleData: ScheduleFormData;
  ticketPrice: string;
  sectionedPrice: {
    orchestraLeft: string;
    orchestraMiddle: string;
    orchestraRight: string;
    balconyLeft: string;
    balconyMiddle: string;
    balconyRight: string;
  };
  setScheduleData: React.Dispatch<React.SetStateAction<ScheduleFormData>>;
  setTicketPrice: (value: string) => void;
  errors?: Partial<Record<ErrorKeys, string>>;
  handlePriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PricingSection = ({ scheduleData, ticketPrice, sectionedPrice, setScheduleData, setTicketPrice, errors, handlePriceChange }: Props) => {
  return (
    <div>
      <Dropdown<SeatPricing>
        options={pricingOptions}
        label="Seat Pricing"
        value={scheduleData.seatPricing}
        className="mb-5"
        onChange={(value) => setScheduleData((prev) => ({ ...prev, seatPricing: value }))}
      />

      {scheduleData.seatPricing === "fixed" ? (
        <TextInput
          placeholder="PHP"
          onChange={(e) => setTicketPrice(e.target.value)}
          label="Ticket Price"
          className="max-w-[250px]"
          type="number"
          isError={!!errors?.ticketPrice}
          errorMessage={errors?.ticketPrice}
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
                isError={!!errors?.orchestraLeft}
                errorMessage={errors?.orchestraLeft}
                value={sectionedPrice.orchestraLeft}
              />
              <TextInput
                onChange={handlePriceChange}
                label="Orchestra Middle"
                placeholder="PHP"
                className="w-full min-w-[300px]"
                name="orchestraMiddle"
                type="number"
                isError={!!errors?.orchestraMiddle}
                errorMessage={errors?.orchestraMiddle}
                value={sectionedPrice.orchestraMiddle}
              />
              <TextInput
                onChange={handlePriceChange}
                label="Orchestra Right"
                placeholder="PHP"
                className="w-full min-w-[300px]"
                name="orchestraRight"
                type="number"
                isError={!!errors?.orchestraRight}
                errorMessage={errors?.orchestraRight}
                value={sectionedPrice.orchestraRight}
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
                isError={!!errors?.balconyLeft}
                errorMessage={errors?.balconyLeft}
                value={sectionedPrice.balconyLeft}
              />
              <TextInput
                onChange={handlePriceChange}
                label="Balcony Middle"
                placeholder="PHP"
                className="w-full min-w-[300px]"
                name="orchestraMiddle"
                type="number"
                isError={!!errors?.balconyMiddle}
                errorMessage={errors?.balconyMiddle}
                value={sectionedPrice.balconyMiddle}
              />
              <TextInput
                onChange={handlePriceChange}
                label="Balcony Right"
                placeholder="PHP"
                className="w-full min-w-[300px]"
                name="orchestraRight"
                type="number"
                isError={!!errors?.balconyRight}
                errorMessage={errors?.balconyRight}
                value={sectionedPrice.balconyRight}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingSection;
