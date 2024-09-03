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
      "The cost of a trip with us generally ranges from 500 pounds to 1,000 pounds, depending on the destination and the activities included. To get a more detailed breakdown, please visit our trips page, where you will find the specific prices for each destination.",
  },
  {
    question: "Can I pay in installments?",
    answer:
      "Absolutely, you can pay in installments. We offer flexible payment plans for our trips. However, to reserve your spot, a deposit of 300 pounds is required.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "A portion of the base price is refundable if you cancel at least two (2) weeks before the trip.",
  },
  {
    question: "What happens if I can't make the trip after payment?",
    answer:
      "If you can't make the trip after payment, you may be able to transfer your payment to another scheduled trip. However, this could incur additional costs.",
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
      " Yes, there's a group chat for all trippers. Everyone is added after the deadline for securing a slot. We also host an e-meet-and-greet a week before the trip, where you can also get any additional information.",
  },
  {
    question: "Can I choose my sleeping arrangments?",
    answer:
      "You can choose your sleeping arrangements, but this might come with an additional cost for those interested.",
  },
  {
    question:
      "I want to go on a particular group trip but the date doesn't work for me, what can I do?",
    answer:
      "If a particular group trip doesn't align with your schedule, Trip Cooks can organize private trips for groups of at least four (4) people to the destinations you're interested in, tailored to dates that work for you.",
  },
  {
    question: "What activities are included in the package?",
    answer:
      "Our travel packages embrace a mix of travel and vacation experiences. Included activities often feature cruises, landmark sightseeing, adrenaline-pumping adventures, and dining experiences. Rest assured, there is something for everyone to enjoy.",
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
                isopen={selected === item.question}
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
