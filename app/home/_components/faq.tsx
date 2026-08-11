"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui";
import React, { useMemo } from "react";
import SectionWrapper from "./section-wrapper";
import Link from "next/link";
import useGeneralStore from "@/stores/generalStore";
import { formatAmount } from "@/lib/utils";
import { m } from "motion/react";
import { fadeUp } from "@/lib/motion";

const Faq = () => {
  const { selectedCurrency, rates } = useGeneralStore();
  const faq = useMemo(
    () => [
      {
        question: "What is included in the package details?",
        answer: (
          <>
            <p>A typical package includes a planned itinerary, accommodation, ground transportation, activities, and sometimes breakfast or other meals.</p>
            <br />
            <p>Check your trip page for the full list of inclusions.</p>
          </>
        ),
      },
      {
        question: "Can I customize the travel package to meet my preferences?",
        answer:
          "Yes, you can customize the travel package to suit your needs. We are pretty flexible, but some changes might incur additional costs. Reach out to us, and we'll gladly work with you to find a solution that meets your requirements.",
      },
      {
        question: "How much does a trip cost?",
        answer: `Trips typically range from ${formatAmount(670, selectedCurrency, "USD")} to ${formatAmount(1340, selectedCurrency, "USD")}, depending on the destination. For the exact price and a detailed cost breakdown, visit the specific trip page.`,
      },
      {
        question: "Can I pay in installments?",
        answer:
          "Absolutely! We offer flexible payment plans to make travel more accessible for all. Simply pay the required deposit to secure your spot, then pay the remaining balance in installments.",
      },
      {
        question: "What is your refund policy?",
        answer: (
          <>
            Please refer to our{" "}
            <Link href="/legal" className="text-secondary-irish-green">
              Travel Policy & Terms and Conditions
            </Link>{" "}
            for full refund details.
          </>
        ),
      },
      {
        question: "What happens if I can't make the trip after payment?",
        answer: (
          <>
            Please refer to our{" "}
            <Link href="/legal" className="text-secondary-irish-green">
              Travel Policy & Terms and Conditions
            </Link>{" "}
            for cancellation and payment terms.
          </>
        ),
      },
      {
        question:
          "Is there a group chat or webinar for participants to connect?",
        answer:
          "Yes! You'll be added to a WhatsApp group before the trip, and we'll host a virtual Meet & Greet so everyone can connect.",
      },
      {
        question: "Can I choose to have a room to myself?",
        answer:
          "Yes, you can choose your sleeping arrangements. However, this comes with an additional cost.",
      },
      {
        question: "What if the group trip doesn't align with my schedule?",
        answer:
          "If a group trip doesn't fit your schedule, Trip Cooks can arrange private trips for groups of four or more, customized to your preferred destinations and dates.",
      },
      {
        question: "What should I pack?",
        answer:
          "We'll send you a detailed itinerary before your trip, including activities and any outfit recommendations where needed. This will help you plan your packing.",
      },
      {
        question: "Will I fit in if I don't know anyone on the trip?",
        answer:
          "Absolutely! Many of our trippers join solo and our group trips make it easy to connect and make new friends.",
      },
    ],
    // rates isn't referenced directly, but formatAmount reads it from the store
    // internally — without it here, prices stay stuck at default rates until
    // selectedCurrency also changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedCurrency, rates],
  );
  return (
    <section className="px-5 py-10 sm:py-[64px] sm:px-[109px]">
      <SectionWrapper className="flex flex-col sm:flex-row gap-5 xl:gap-[109px] w-full justify-between">
        <m.div
          className="sm:w-[445px] shrink-0"
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <h2 className="font-ogg-trial text-[24px] sm:text-[48px] leading-tight text-neutral-text dark:text-foreground">
            FAQs
          </h2>
          <p className="w-full sm:max-w-[451px] text-neutral-subtext mt-5 dark:text-[#BFC0C2] text-[13px] leading-[20px] sm:text-[16px] sm:leading-[24px]">
            Everything you need to know about TripCooks and pricing. Can&apos;t
            find what you&apos;re looking for? Please contact{" "}
            <a
              href="mailto:hello@tripcooks.tours"
              className="text-secondary-irish-green"
            >
              hello@tripcooks.tours
            </a>
          </p>
        </m.div>

        <div className="w-full">
          <Accordion
            type="single"
            defaultValue={faq[0].question}
            collapsible
            className="w-full flex flex-col gap-6"
          >
            {faq.map((item) => (
              <AccordionItem
                value={item.question}
                key={item.question}
                className="border-0 rounded-[10px] p-4 transition-colors data-[state=closed]:bg-[hsl(var(--bg-primary))] data-[state=open]:bg-[hsl(var(--bg-secondary))] data-[state=closed]:hover:bg-[hsl(var(--bg-secondary))]"
              >
                <AccordionTrigger className="text-left text-[hsl(var(--text-primary))] text-[15px] sm:text-[16px] leading-[20px] sm:leading-[22px] font-semibold py-0">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-[hsl(var(--text-secondary))] text-[13px] leading-[20px] sm:text-[14px] sm:leading-[20px] pt-[10px] pb-0">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SectionWrapper>
    </section>
  );
};

export default Faq;
