"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui";
import React from "react";
import SectionWrapper from "./section-wrapper";
import Link from "next/link";

const faq = [
  {
    question: "What is included in the package details?",
    answer:
      "A typical package includes flights, transportation, accommodation, activities, and occasionally breakfast or other meals. It varies depending on the destination country.We recommend you review the details for each package on our website to know what is covered and what might incur additional costs.",
  },
  {
    question: "Can I customize the travel package to meet my preferences?",
    answer:
      "Yes, you can customize the travel package to suit your needs. We are pretty flexible, but some changes might incur additional costs. Reach out to us, and we'll gladly work with you to find a solution that meets your requirements.",
  },
  {
    question: "How much does a trip cost?",
    answer:
      "The cost of a trip with us generally ranges from £500 to £1,000, depending on the destination and the activities included. To get a more detailed breakdown, please visit our trips page, where you will find the specific prices for each destination.",
  },
  {
    question: "Can I pay in instalments?",
    answer:
      "Absolutely! We offer flexible payment plans for our trips. However, to reserve your spot, a deposit of £300 is required.",
  },
  {
    question: "What is your refund policy?",
    answer: (
      <>
        Kindly refer to the Terms and Conditions page under our{" "}
        <Link href="/legal" className="text-secondary-irish-green">
          Travel Policy
        </Link>
      </>
    ),
  },
  {
    question: "What happens if I can't make the trip after payment?",
    answer: (
      <>
        Kindly refer to the Terms and Conditions page under our{" "}
        <Link href="/legal" className="text-secondary-irish-green">
          Travel Policy
        </Link>
      </>
    ),
  },
  {
    question: "When will I receive my flight information?",
    answer:
      "You will receive your flight information when you book your slot, and it will be included as part of your travel itinerary. If you need it earlier, you can request the information before booking your slot.",
  },
  {
    question: "What are the luggage restrictions?",
    answer:
      "Our trips are generally designed with backpack-style travel in mind, but you can add extra luggage bags for an additional fee paid to the airline.",
  },
  {
    question: "Is there a group chat or webinar for participants to connect?",
    answer:
      "Yes! All trippers are added to the Tripcooks WhatsApp group after the deadline for securing a slot. We also host an e-Meet & Greet before the trip for every one to get familiar with each other.",
  },
  {
    question: "Can I choose to have a room to myself?",
    answer:
      "Yes, you can choose your sleeping arrangements. However, this comes with an additional cost.",
  },
  {
    question: "Group trip doesn’t align with my schedule.",
    answer:
      "If a group trip doesn’t fit your schedule, TripCooks can arrange private trips for groups of four or more, customized to your preferred destinations and dates.",
  },
  {
    question: "What activities are included in the package?",
    answer:
      "Our travel packages embrace a mix of travel and vacation experiences. Included activities often feature cruises, landmark sightseeing, adrenaline-pumping adventures, and dining experiences. Rest assured, there is something for everyone to enjoy.",
  },
];

const Faq = () => {
  return (
    <section className="px-5 py-10 sm:py-20 sm:px-[8%]">
      <SectionWrapper className="flex flex-col sm:flex-row gap-5 xl:gap-32 w-full justify-between">
        <div>
          <h3 className="text-[32px] font-medium sm:text-5xl">FAQs</h3>
          <p className="w-full sm:max-w-[582px] text-neutral-subtext mt-5 dark:text-[#BFC0C2]">
            Everything you need to know about traveling with Trip Cooks. Can’t
            find what you’re looking for? Contact us using our{" "}
            <Link href="/contact" className="text-secondary-irish-green">
              form.
            </Link>
          </p>
        </div>

        <div className="w-full">
          <Accordion
            type="single"
            defaultValue={faq[0].question}
            collapsible
            className="w-full"
          >
            {faq.map((item) => (
              <AccordionItem value={item.question} key={item.question}>
                <AccordionTrigger className="text-left text-neutral-text text-lg sm:text-lg dark:text-foreground">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-neutral-subtext text-base dark:text-[#BFC0C2] text-start sm:text-justify">
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
