"use client";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from "@/components/ui";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
    <section className="px-5 pt-0 pb-10 sm:py-[64px] sm:px-[100px]">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-[109px]">
          <div className="sm:w-[337px] shrink-0">
            <h3 className="font-medium text-[16px] sm:text-[20px] leading-[24px] sm:leading-[30px] text-[hsl(var(--text-primary))]">
              Subscribe to our Newsletter
            </h3>
            <p className="text-[14px] sm:text-[16px] leading-[18px] sm:leading-[24px] text-[hsl(var(--text-secondary))] mt-[5px]">
              Receive promo packages, be the first to know where we are going next!
            </p>
          </div>

          <div className="flex-1 sm:flex-initial">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col sm:flex-row gap-3 sm:gap-[22px] sm:items-start"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full sm:w-[384px] sm:max-w-[384px] shrink-0">
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          className="h-[54px] rounded-full bg-[hsl(var(--bg-secondary))] border-none focus-visible:ring-0 text-[hsl(var(--text-primary))] placeholder:text-[hsl(var(--text-secondary))]"
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
                  className="h-[56px] w-full sm:w-[185px] rounded-full shrink-0"
                  loading={loading}
                  disabled={loading}
                >
                  Subscribe
                </Button>
              </form>
            </Form>
          </div>
        </div>

        <div className="w-full border-t border-dashed border-[hsl(var(--border))] mt-10 sm:mt-[64px]" />
      </div>
    </section>
  );
};

export { SubcribeToNewsLetter };
