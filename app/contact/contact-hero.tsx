"use client";
import React, { useState } from "react";
import SectionWrapper from "../home/_components/section-wrapper";
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
  Textarea,
} from "@/components/ui";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

const SERVICE_ID = process.env.NEXT_PUBLIC_CONTACT_SERVICE_ID || "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_CONTACT_TEMPLATE_ID || "";

type ContactInformation = {
  email: string;
  emailSubject: string;
  message: string;
};

export const ContactSchema: ZodType<ContactInformation> = z.object({
  email: z.string({}).email({
    message: "Please enter a valid email address",
  }),
  emailSubject: z.string(),
  message: z
    .string({
      required_error: "Message is required",
    })
    .min(1, { message: "Message is required" }),
});

const ContactHero = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<ContactInformation>({
    values: {
      email: "",
      emailSubject: "",
      message: "",
    },
    mode: "onChange",
    resolver: zodResolver(ContactSchema),
  });
  const onSubmit = (values: ContactInformation) => {
    setLoading(true);
    emailjs.send(SERVICE_ID, TEMPLATE_ID, values).then(
      () => {
        setLoading(false);
        toast.success("Message sent successfully");
        form.reset();
      },
      (error) => {
        setLoading(false);
        toast.success(error);
      }
    );
  };
  return (
    <div className="px-5 py-10 sm:py-20 sm:px-[8%]">
      <SectionWrapper className="flex flex-col sm:flex-row justify-between gap-10">
        <div className="sm:max-w-[550px] w-full text-neutral-subtext sm:text-secondary-forest-green">
          <h4 className="font-semibold text-[36px] leading-[43.88px] text-neutral-text sm:text-[40px] sm:leading-[48.76px] dark:text-foreground">
            Let’s stay in touch..
          </h4>
          <div className="text-base leading-[26.08px] mt-5 dark:text-[#BFC0C2]">
            <p>
              Got some enquiries about a trip? Need somem help with our prcing
              structure? Need general support during your stay? Let us know
            </p>
            <h5 className="my-5 font-semibold">
              We’re here for you, literally
            </h5>
            <p>
              If you have any questions, just reach out to us and we’ll respond
              as soon as we can. Please provide as much information as possible
            </p>
          </div>
        </div>
        {/* contact form */}
        <Card className="w-full sm:w-1/2 shadow-none border-none sm:border sm:border-solid sm:p-6 sm:border-[#E1E6EF] sm:max-w-[573px] dark:border-[#383E47] dark:bg-background">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-5">
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
                  name="emailSubject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Subject</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter email subject here"
                          disabled={loading}
                          {...field}
                          className="bg-[#F7F7F9] h-[59px] focus-visible:ring-0 border-none placeholder:text-[#ABABAB] text-base leading-[19.5px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message*</FormLabel>
                      <FormControl>
                        <Textarea
                          // type="text"
                          placeholder="Enter message here"
                          disabled={loading}
                          {...field}
                          rows={8}
                          className="bg-[#F7F7F9] focus-visible:ring-0 border-none placeholder:text-[#ABABAB] text-base leading-[19.5px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={loading}
                  loading={loading}
                  variant="default"
                  className="w-fit"
                >
                  Send Message
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </SectionWrapper>
    </div>
  );
};

export default ContactHero;
