import {
  RadioGroupItem,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { useState } from "react";

const InstallmentItem = () => {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  return (
    <div className="flex gap-1 text-sm leading-[17.07px] text-secondary-irish-green mt-1">
      <p>Installment Plan</p>
      <TooltipProvider>
        <Tooltip delayDuration={0} open={show}>
          <TooltipTrigger
            onMouseEnter={toggleShow}
            onMouseLeave={toggleShow}
            onTouchStart={toggleShow}
            onTouchEnd={toggleShow}
          >
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.99935 1.83366C4.33268 1.83366 1.33268 4.83366 1.33268 8.50032C1.33268 12.167 4.33268 15.167 7.99935 15.167C11.666 15.167 14.666 12.167 14.666 8.50033C14.666 4.83366 11.666 1.83366 7.99935 1.83366Z"
                stroke="#079307"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 11.167L8 7.83366"
                stroke="#079307"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.00391 5.83301L7.99792 5.83301"
                stroke="#079307"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            align="center"
            arrowPadding={0}
            className="border border-solid border-neutral-grey-300 bg-white text-[#020E0B] p-2 text-xs leading-[20px]"
          >
            <TooltipArrow fill="white" stroke="#E1E6EF" strokeWidth={2} />
            Pay $300 today and save your spot on this trip.
            <br />
            $900 due 10th July,2024
            <br />
            $900 due 10th July, 2024
            <br />
            $900 due 10th July, 2024
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

const PaymentTypeItem = ({
  value,
  title,
  description,
  isActive = false,
  isInstallment,
  handleClick,
}: {
  value: string;
  title: string;
  description: string;
  isActive?: boolean;
  isInstallment?: boolean;
  handleClick: () => void;
}) => (
  <div>
    <div className="flex justify-between gap-5 font-alexandria">
      <div
        className={cn(
          "flex flex-col gap-2.5 max-w-[245px] sm:max-w-full text-neutral-grey-500",
          isActive && "text-[#020E0B]"
        )}
      >
        <h3 className="text-base leading-[19.5px]">{title}</h3>
        <p className="text-sm leading-[17.07px]">{description}</p>
      </div>
      <RadioGroupItem
        value={value}
        id={value}
        onClick={handleClick}
        className={cn(isActive && "border-secondary-irish-green")}
      />
    </div>
    {isInstallment ? <InstallmentItem /> : null}
  </div>
);

export default PaymentTypeItem;
