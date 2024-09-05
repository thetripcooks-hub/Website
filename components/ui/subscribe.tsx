"use client";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Separator,
} from "@/components/ui";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SectionWrapper from "@/app/_components/section-wrapper";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});
const SubcribeToNewsLetter = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <section className="px-5 py-10 sm:py-20 sm:px-[8%]">
      <SectionWrapper className="flex flex-col gap-10 sm:gap-20">
        <div className="flex w-full justify-between flex-col sm:flex-row">
          <div>
            <h3 className="text-xl text-[#000000]">
              Subscribe to our Newsletter
            </h3>
            <p className="text-base text-neutral-subtext mt-4 sm:max-w-[337px]">
              Receive promo packages, be the first to know where we are going
              next!
            </p>
          </div>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex gap-5 flex-col sm:flex-row mt-10 sm:mt-0"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter your email address"
                          className="h-[54px] w-full sm:w-[384px] bg-neutral-grey-100 outline-none border-none focus-visible:ring-0 
                      text-neutral-text placeholder:text-neutral-text placeholder:opacity-50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="h-[54px] w-full sm:w-[166px]">
                  Subscribe
                </Button>
              </form>
            </Form>
          </div>
        </div>
        <Separator />
      </SectionWrapper>
    </section>
  );
};

export { SubcribeToNewsLetter };
