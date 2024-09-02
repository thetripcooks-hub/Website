"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui";
import React, { useState } from "react";

const faq = [
  {
    question: "What is included in the package details?",
    answer:
      "A typical package includes flights, transportation, accommodation, activities, and occasionally breakfast or other meals. It varies depending on the destination country. We recommend you review the details for each package on our website to know what is covered and what might incur additional costs.",
  },
  {
    question: "Can I customize the travel package to meet my preferences?",
    answer: "",
  },
  {
    question: "How much does a trip cost?",
    answer: "",
  },
  {
    question: "Can I pay in instalments?",
    answer: "",
  },
  {
    question: "What is your refund policy?",
    answer: "",
  },
  {
    question: "What happens if I can't make the trip after payment?",
    answer: "",
  },
  {
    question: "When will I receive my flight information?",
    answer: "",
  },
  {
    question: "What are the luggage restrictions?",
    answer: "",
  },
  {
    question: "Is there a group chat or webinar for participants to connect?",
    answer: "",
  },
];

const Faq = () => {
  const [selected, setSelected] = useState(faq[0].question);
  return (
    <section className="px-5 py-10 sm:py-20 sm:px-[8%] flex flex-col sm:flex-row gap-5 xl:gap-32 w-full justify-between">
      <div>
        <h3 className="text-[32px] font-medium sm:text-5xl">FAQs</h3>
        <p className="w-full sm:max-w-[582px] text-neutral-subtext mt-5">
          Everyting you need to know about tripcooks and pricing. Can’t find
          what yoy’re looking for? Please contact mail@tripcooks.com
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
              <AccordionTrigger
                className="text-left text-neutral-text text-lg sm:text-lg"
                isOpen={selected === item.question}
                onClick={() => setSelected(item.question)}
              >
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-neutral-subtext text-base">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
