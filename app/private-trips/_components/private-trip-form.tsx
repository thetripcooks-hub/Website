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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/components/ui";
import React from "react";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type PrivateTripInformation = {
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  noOfGuests: number;
  nationalitiesOfGuests: string[];
  budgetPerPerson: string;
  proposedDate: string;
  currentCountry: string;
  specialRequest: string;
};

export const PrivateTripSchema: ZodType<PrivateTripInformation> = z.object({
  email: z.string({}).email({
    message: "Please enter a valid email address",
  }),
  firstName: z.string(),
  lastName: z.string(),
  country: z.string(),
  noOfGuests: z.number(),
  nationalitiesOfGuests: z.array(z.string()),
  budgetPerPerson: z.string(),
  proposedDate: z.string(),
  currentCountry: z.string(),
  specialRequest: z.string(),
});

const PrivateTripForm = () => {
  const form = useForm<PrivateTripInformation>({
    values: {
      email: "",
      firstName: "",
      lastName: "",
      country: "",
      noOfGuests: 4,
      nationalitiesOfGuests: [],
      budgetPerPerson: "",
      proposedDate: "",
      currentCountry: "",
      specialRequest: "",
    },
    mode: "onChange",
    resolver: zodResolver(PrivateTripSchema),
  });
  const onSubmit = () => {};
  return (
    <Card className="w-full sm:w-1/2 shadow-none border-none  sm:p-6 sm:max-w-[573px]">
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
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter last name here"
                        className="bg-[#F7F7F9] h-[59px] focus-visible:ring-0 border-none placeholder:text-[#ABABAB] text-base leading-[19.5px] w-full"
                        type="text"
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-[#F7F7F9] h-[59px] focus-visible:ring-0 border-none placeholder:text-[#ABABAB] text-base leading-[19.5px]">
                          <SelectValue
                            placeholder="Select country here"
                            className="placeholder:text-[#ABABAB] "
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {["Nigeria", "Ghana"].map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                    (There should be a minimum of 4 guests per trip)*
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter number of guests here"
                      className="bg-[#F7F7F9] h-[59px] focus-visible:ring-0 border-none placeholder:text-[#ABABAB] text-base leading-[19.5px]"
                      type="number"
                      min={4}
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
                  <FormLabel>Enter budget here</FormLabel>
                  <FormControl>
                    <div className="flex items-center bg-[#F7F7F9] h-[59px] rounded-l-md pl-3">
                      $
                      <Input
                        placeholder="Enter budget here"
                        className="bg-[#F7F7F9] h-[59px] focus-visible:ring-0 border-none placeholder:text-[#ABABAB] text-base leading-[19.5px] pl-1"
                        type="number"
                        {...field}
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
                  <FormLabel>What date do you have planned?*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter date here"
                      className="bg-[#F7F7F9] h-[59px] focus-visible:ring-0 border-none placeholder:text-[#ABABAB] text-base leading-[19.5px]"
                      type="date"
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
                    possible*
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter message here"
                      className="bg-[#F7F7F9]  focus-visible:ring-0 border-none placeholder:text-[#ABABAB] text-base leading-[19.5px]"
                      {...field}
                      rows={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-fit">Submit</Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default PrivateTripForm;
