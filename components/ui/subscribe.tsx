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
import SectionWrapper from "@/app/home/_components/section-wrapper";
import jsonp from "jsonp";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});
const SubcribeToNewsLetter = () => {
  const [loading, setLoading] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    jsonp(
      `https://gmail.us21.list-manage.com/subscribe/post?u=d038f1377a6c1ab407c1ab719&amp;id=6420cfe4a7&amp;f_id=003080e6f0&EMAIL=${values.email}`,
      { param: "c" },
      (_, data) => {
        const { msg, result } = data;
        if (result === "success") {
          setLoading(false);
          form.reset();
          return toast.success(msg);
        } else {
          setLoading(false);
          toast.error(msg);
        }
      }
    );
  };

  return (
    <section className="px-5 py-10 sm:py-20 sm:px-[8%]">
      <SectionWrapper className="flex flex-col gap-10 sm:gap-20">
        <div className="flex w-full justify-between flex-col sm:flex-row mb-5 sm:gap-5">
          <div>
            <h3 className="text-xl text-[#000000] font-medium dark:text-foreground">
              Subscribe to our Newsletter
            </h3>
            <p className="text-base text-neutral-subtext mt-4 sm:max-w-[337px] dark:text-[#BFC0C2]">
              Receive promo packages, be the first to know where we are going
              next!
            </p>
          </div>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex gap-5 flex-col lg:flex-row mt-10 sm:mt-0"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="sm:w-[384px]">
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          className="h-[54px] w-full bg-neutral-grey-100 outline-none border-none focus-visible:ring-0 
                      text-neutral-text placeholder:text-neutral-text placeholder:opacity-50 dark:placeholder:opacity-100 dark:placeholder:text-foreground"
                          {...field}
                          name="EMAIL"
                          id="mce-EMAIL"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="h-[54px] w-full sm:w-[166px]"
                  loading={loading}
                  disabled={loading}
                >
                  Subscribe
                </Button>
              </form>
            </Form>
          </div>
        </div>
        <Separator className="dark:bg-neutral-grey-300" />
      </SectionWrapper>
    </section>
  );
};

export { SubcribeToNewsLetter };
