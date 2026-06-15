"use client";
import React, { useState } from "react";
import FormBgSvg from "./form-bg-svg";
import {
  Button,
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

const ContactSchema: ZodType<ContactInformation> = z.object({
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
        toast.error(error);
      },
    );
  };

  return (
    <section className="bg-background px-5 sm:px-[100px] pt-6 sm:pt-[93px] pb-10 sm:pb-20">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-10 lg:max-w-[1280px] lg:mx-auto">
        {/* Left: heading + description */}
        <div className="sm:w-[550px] w-full sm:shrink-0">
          <p className="text-[#09af0d] text-base font-medium leading-6">
            Contact us
          </p>
          <h1 className="font-ogg-trial text-[40px] sm:text-[48px] leading-[60px] sm:leading-[72px] text-[hsl(var(--text-primary))] mt-1">
            Let&apos;s stay in touch...
          </h1>
          <p className="text-base text-[hsl(var(--text-secondary))] leading-[31px] mt-4">
            Got some enquiries about our trips? Need some help with our pricing
            structure? Interested in us planning a private trip for you?
            <br />
            <br />
            Reach out to us and we&apos;ll respond as soon as we can. Please
            provide as much information as possible
          </p>
        </div>

        {/* Right: form card container */}
        <div className="relative bg-[#DAF3DB] dark:bg-[hsl(164,89%,7%)] rounded-[23px] overflow-hidden sm:w-[574px] w-full flex items-center justify-center sm:min-h-[713px] min-h-[678px] shrink-0">
          {/* Decorative background SVG — inlined so CSS vars resolve for fill colour */}
          <FormBgSvg className="absolute pointer-events-none w-[2012px] max-w-none -left-[593px] top-[36px] h-[642px] [--fill-0:#9EC99F] dark:[--fill-0:#5DB86C]" />

          {/* Inner form card */}
          <div className="relative z-10 bg-[#FAFAFA] dark:bg-background border border-border rounded-[12px] flex flex-col gap-[21px] p-[29.5px] sm:w-[469px] w-[calc(100%-32px)] my-8 sm:my-0">
            <h2 className="font-ogg-trial text-[24px] sm:text-[32px] leading-9 sm:leading-[48px] text-[hsl(var(--text-primary))]">
              Leave us a message
            </h2>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-[21px]"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-[11px] space-y-0">
                      <FormLabel className="text-[14px] font-medium text-[hsl(var(--text-secondary))] leading-[21px]">
                        Email Address
                        <span className="text-[#09af0d]">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter email address here"
                          type="email"
                          disabled={loading}
                          className="bg-[hsl(var(--bg-secondary))] h-[46px] sm:h-[54px] rounded-full border-none text-[14px] placeholder:text-[hsl(var(--text-secondary))] focus-visible:ring-0"
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
                    <FormItem className="flex flex-col gap-[11px] space-y-0">
                      <FormLabel className="text-[14px] font-medium text-[hsl(var(--text-secondary))] leading-[21px]">
                        Email Subject
                        <span className="text-[#09af0d]">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter email subject here"
                          disabled={loading}
                          className="bg-[hsl(var(--bg-secondary))] h-[46px] sm:h-[54px] rounded-full border-none text-[14px] placeholder:text-[hsl(var(--text-secondary))] focus-visible:ring-0"
                          {...field}
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
                    <FormItem className="flex flex-col gap-[11px] space-y-0">
                      <FormLabel className="text-[14px] font-medium text-[hsl(var(--text-secondary))] leading-[21px]">
                        Message
                        <span className="text-[#09af0d]">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter message here"
                          disabled={loading}
                          rows={6}
                          className="bg-[hsl(var(--bg-secondary))] min-h-[155px] rounded-[12px] border-none text-[14px] placeholder:text-[hsl(var(--text-secondary))] focus-visible:ring-0 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={loading}
                  loading={loading}
                  variant="default"
                  className="w-[185px] h-[56px] text-base font-medium"
                >
                  Send message
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
