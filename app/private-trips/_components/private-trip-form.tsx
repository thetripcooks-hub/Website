"use client";
import {
  Button,
  Card,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  // Select,
  // SelectContent,
  // SelectItem,
  // SelectTrigger,
  // SelectValue,
  Textarea,
} from "@/components/ui";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn, dollars } from "@/lib/utils";
// import { getCountryNames } from "@/constants/countries";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import dayjs from "dayjs";

const SERVICE_ID = process.env.NEXT_PUBLIC_PRIVATE_TRIP_SERVICE_ID || "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_PRIVATE_TRIP_TEMPLATE_ID || "";

type PrivateTripInformation = {
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  noOfGuests: number;
  nationalitiesOfGuests: string;
  budgetPerPerson: string;
  proposedDate: string;
  currentCountry: string;
  specialRequest: string;
};

export const PrivateTripSchema: ZodType<PrivateTripInformation> = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  firstName: z.string().min(2, "Name must be at least 2 characters"),
  lastName: z.string().min(2, "Name must be at least 2 characters"),
  country: z.string().min(2, "Required"),
  noOfGuests: z.coerce.number().min(4, "Minimum of 4 people"),
  nationalitiesOfGuests: z.string(), //z.array(z.string()).min(1, "Required"),
  budgetPerPerson: z.string().min(1, "Required"),
  proposedDate: z.string(),
  currentCountry: z.string().min(2, "Required"),
  specialRequest: z.string(),
});

const PrivateTripForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<PrivateTripInformation>({
    values: {
      email: "",
      firstName: "",
      lastName: "",
      country: "",
      noOfGuests: 4,
      nationalitiesOfGuests: "",
      budgetPerPerson: "",
      proposedDate: "",
      currentCountry: "",
      specialRequest: "",
    },
    mode: "onChange",
    resolver: zodResolver(PrivateTripSchema),
  });
  const onSubmit = (values: PrivateTripInformation) => {
    setLoading(true);
    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, {
        values: {
          ...values,
          budgetPerPerson: dollars.format(Number(values.budgetPerPerson)),
          proposedDate: dayjs(values.proposedDate).format("DD/MM/YYYY"),
        },
      })
      .then(
        () => {
          toast.success("Message sent successfully");
          form.reset();
          setLoading(false);
        },
        (error) => {
          setLoading(false);
          toast.success(error);
        }
      );
  };

  return (
    <Card className="w-full lg:w-1/2 shadow-none border-none  lg:p-6 lg:max-w-[573px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 sm:flex-row p-0 sm:gap-2.5">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter first name here"
                        className="bg-[#F7F7F9] h-[59px] focus-visible:ring-0 border-none placeholder:text-[#ABABAB] text-base leading-[19.5px]"
                        type="text"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter last name here"
                        className="bg-[#F7F7F9] h-[59px] focus-visible:ring-0 border-none placeholder:text-[#ABABAB] text-base leading-[19.5px] w-full"
                        type="text"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email address here"
                      className="bg-[#F7F7F9] h-[59px] focus-visible:ring-0 border-none placeholder:text-[#ABABAB] text-base leading-[19.5px]"
                      type="email"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What country are you interested in?*</FormLabel>
                  <FormControl>
                    {/* <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    > */}
                    {/* <FormControl> */}
                    <Input
                      placeholder="Enter country here"
                      className="bg-[#F7F7F9] h-[59px] focus-visible:ring-0 border-none placeholder:text-[#ABABAB] text-base leading-[19.5px]"
                      type="text"
                      disabled={loading}
                      {...field}
                    />
                    {/* <SelectTrigger className="bg-[#F7F7F9] h-[59px] focus-visible:ring-0 border-none data-[placeholder]:text-[#ABABAB] text-base leading-[19.5px]">
                          <SelectValue
                            placeholder="Select country here"
                            className="data-[placeholder]:text-[#ABABAB]"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {getCountryNames().map((country) => (
                          <SelectItem key={country.name} value={country.name}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="noOfGuests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    How many people are coming on this trip? <br />
                    (There should be a minimum of 4 people per trip)*
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter number of people here"
                      className="bg-[#F7F7F9] h-[59px] focus-visible:ring-0 border-none placeholder:text-[#ABABAB] text-base leading-[19.5px]"
                      type="number"
                      min={4}
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nationalitiesOfGuests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    What are the nationalities of your people?
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter their different nationalities"
                      className="bg-[#F7F7F9] h-[59px] focus-visible:ring-0 border-none placeholder:text-[#ABABAB] text-base leading-[19.5px]"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="budgetPerPerson"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    What is your budget for the trip? per person*
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center bg-[#F7F7F9] h-[59px] rounded-l-md pl-3">
                      $
                      <Input
                        placeholder="Enter budget here"
                        className="bg-[#F7F7F9] h-[59px] focus-visible:ring-0 border-none placeholder:text-[#ABABAB] text-base leading-[19.5px] pl-1"
                        type="text"
                        disabled={loading}
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          field.onChange({
                            target: {
                              value: Number(value).toLocaleString(),
                            },
                          });
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="proposedDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What date do you have planned?</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter date here"
                      className={cn(
                        "bg-[#F7F7F9] h-[59px] focus-visible:ring-0 border-none data-[placeholder]:text-[#ABABAB] text-base leading-[19.5px]",
                        !field.value.length && "text-[#ABABAB]"
                      )}
                      type="date"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currentCountry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What country are you located in?*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter country here"
                      className="bg-[#F7F7F9] h-[59px] focus-visible:ring-0 border-none placeholder:text-[#ABABAB] text-base leading-[19.5px]"
                      type="text"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specialRequest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Any special requests? Feel free to be as detailed as
                    possible
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter message here"
                      className="bg-[#F7F7F9]  focus-visible:ring-0 border-none placeholder:text-[#ABABAB] text-base leading-[19.5px]"
                      disabled={loading}
                      {...field}
                      rows={8}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              loading={loading}
              disabled={loading}
              className="w-fit"
              variant="default"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default PrivateTripForm;
