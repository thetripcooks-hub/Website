import type { Metadata } from "next";
import { SubcribeToNewsLetter, Footer } from "@/components/ui";
import React from "react";

export const metadata: Metadata = {
  title: "Travel Policy | Trip Cooks",
  description:
    "Read Trip Cooks' privacy policy, terms and conditions, cancellation, refund policy, and travel guidelines.",
  alternates: { canonical: "https://tripcooks.tours/legal" },
  openGraph: {
    title: "Travel Policy | Trip Cooks",
    description:
      "Read Trip Cooks' privacy policy, terms and conditions, cancellation, refund policy, and travel guidelines.",
    url: "https://tripcooks.tours/legal",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Policy | Trip Cooks",
    description:
      "Read Trip Cooks' privacy policy, terms and conditions, cancellation, refund policy, and travel guidelines.",
  },
};
import ReadyToStart from "../home/_components/ready-to-start";

const Page = () => {
  return (
    <main>
      <div className="px-5 py-10 sm:px-[100px] sm:py-[80px] text-[hsl(var(--text-secondary))] text-[14px] sm:text-[16px] leading-[26px] sm:leading-[28px]">
        <div className="lg:max-w-[1280px] lg:mx-auto">
        <h1 className="font-ogg-trial text-[40px] sm:text-[56px] leading-[1.3] text-left sm:text-center mb-10 text-[hsl(var(--text-primary))]">
          Our travel policy
        </h1>

        <h2 className="font-ogg-trial text-[28px] sm:text-[36px] leading-[1.3] text-[hsl(var(--text-primary))]">
          Privacy policy
        </h2>
        <div className="flex flex-col gap-5 mt-5">
          <p>
            At Trip Cooks, we prioritize the protection of your personal and
            financial information. This commitment is reflected in the strict
            privacy policies we have adopted. This policy outlines how we
            collect, use, and protect your data.
          </p>
          <p>
            <strong className="text-[hsl(var(--text-primary))] text-[16px] font-semibold">
              Personal Information:{" "}
            </strong>
            We collect personal details such as your name, email address, and
            areas of interest. This information is used to identify you
            individually and enhance your experience with our services.
          </p>{" "}
          <p>
            <strong className="text-[hsl(var(--text-primary))] text-[16px] font-semibold">
              {" "}
              Links to Third-Party Sites:{" "}
            </strong>{" "}
            Trip Cooks may include links to third-party websites or resources
            for your convenience. Please note that these external sites are not
            under the control of Trip Cooks, and therefore we are not
            responsible for their content or any links they may contain. The
            inclusion of such links does not imply endorsement or referral by
            Trip Cooks.
          </p>
        </div>

        <h2 className="font-ogg-trial text-[28px] sm:text-[36px] leading-[1.3] text-[hsl(var(--text-primary))] mt-16 sm:mt-20">
          Terms and conditions
        </h2>

        <div className="mb-5">
          <h3 className="text-[18px] sm:text-[20px] font-semibold leading-[1.4] text-[hsl(var(--text-primary))] mt-10 mb-5">
            Liability
          </h3>
          <p>
            When we provide services or products from third-party suppliers, we
            act as your representative in sourcing them based on the information
            you provide during our consultations. While we carefully select
            these third-party suppliers, we cannot be held responsible for any
            issues, damages, or losses that may occur as a result of using or
            relying on their products or services. This includes any services or
            goods obtained through external websites or resources not directly
            affiliated with Trip Cooks. However, we are committed to assisting
            you in resolving any concerns or disputes that may arise with these
            third-party suppliers. You acknowledge that any agreements or
            contracts between you and these suppliers are independent, and Trip
            Cooks disclaims any and all liability for their actions or
            omissions.
          </p>

          <h3 className="text-[18px] sm:text-[20px] font-semibold leading-[1.4] text-[hsl(var(--text-primary))] mt-10 mb-5">
            Travel Insurance
          </h3>

          <p>
            Trip Cooks highly recommends that you purchase a comprehensive
            insurance policy at the time of booking, which should cover personal
            liability, personal accidents, lost or delayed baggage, medical
            expenses, cancellation, and more. You acknowledge and agree to
            assume full responsibility for any loss, injury, death, or damage to
            yourself, your family, or dependents arising from your participation
            in any travel or event arrangements. It is your responsibility to
            ensure that you have adequate insurance coverage to protect against
            any losses incurred. Please note that Trip Cooks does not provide
            insurance policies and cannot accept liability for any losses.
          </p>

          <h3 className="text-[18px] sm:text-[20px] font-semibold leading-[1.4] text-[hsl(var(--text-primary))] mt-10 mb-5">
            Cancellation and Refund
          </h3>

          <p>
            If you wish to cancel your booking, you must notify Trip Cooks in
            writing. The cancellation will take effect from the date we receive
            your written notification. Please include the reason(s) for
            cancellation, as your insurance policy may cover certain
            circumstances.
          </p>

          {/* refund policy */}
          <h3 className="text-[18px] sm:text-[20px] font-semibold leading-[1.4] text-[hsl(var(--text-primary))] my-5">
            Refund Policy
          </h3>

          <p>
            Your eligibility for a refund will depend on when we receive your
            cancellation notice. Refunds will be as follows:
          </p>

          <ul className="list-disc pl-8 sm:pl-10 my-2 flex flex-col gap-1">
            <li>
              <span className="font-medium">
                Four (4) months or more prior to travel —
              </span>{" "}
              Refund of 100% of the total payment made.
            </li>
            <li>
              <span className="font-medium">Less than four (4) months —</span>
              Refund of 60% of the total payment made.
            </li>
            <li>
              <span className="font-medium">Less than six (6) weeks —</span> No
              refund (100% of the total payment will be retained).
            </li>
          </ul>
          <p>
            If flights are inclusive in a trip’s package, refunds will be
            subject to the airline’s terms and conditions for ticket
            cancellations.
          </p>

          <h3 className="text-[18px] sm:text-[20px] font-semibold leading-[1.4] text-[hsl(var(--text-primary))] my-5">
            Visa Status impacting Refunds
          </h3>
          <p>
            If your visa is denied and no payments have been made for travel services or accommodations, you will receive a full refund minus any non-refundable service fees.
          </p>

          <h3 className="text-[18px] sm:text-[20px] font-semibold leading-[1.4] text-[hsl(var(--text-primary))] mt-10 mb-5">
            Travel Documents
          </h3>

          <p>
            It is your responsibility to ensure that all necessary travel
            documents, including valid passports (with at least 6 months&apos;
            validity beyond your return date), visas, inoculation certificates,
            and any other required documents, are in order before your travel
            begins.
          </p>

          <h3 className="text-[18px] sm:text-[20px] font-semibold leading-[1.4] text-[hsl(var(--text-primary))] mt-10 mb-5">
            Itinerary Changes
          </h3>
          <p>
            Trip Cooks reserves the right to make changes to the itinerary,
            accommodations, or activities due to reasons beyond our control,
            such as weather conditions, natural disasters, political
            instability, or unforeseen events.
            <br />
            Participants will be promptly notified of any significant changes.
            Efforts will be made to provide suitable alternatives, and any
            resulting cost adjustments will be communicated and agreed upon.
          </p>

          <h3 className="text-[18px] sm:text-[20px] font-semibold leading-[1.4] text-[hsl(var(--text-primary))] mt-10 mb-5">
            Tripper Conduct
          </h3>

          <p>
            Trippers are expected to behave responsibly, ethically, and
            respectfully towards fellow trippers, local communities, and the
            environment. Any tripper engaging in disruptive or unsafe behavior,
            as determined by Trip Cooks, may be asked to leave the trip, with no
            refund provided.
          </p>

          <h3 className="text-[18px] sm:text-[20px] font-semibold leading-[1.4] text-[hsl(var(--text-primary))] mt-10 mb-5">
            Health and Safety
          </h3>

          <p>
            Trippers are responsible for ensuring they are physically and
            mentally fit for the trip. Any pre-existing medical conditions must
            be disclosed to Trip Cooks before the trip.
            <br />
            Trip Cooks is not liable for any health issues or injuries that may
            occur during the trip. Trippers are encouraged to carry necessary
            medications and seek medical advice before embarking on their
            journey.
          </p>

          <h3 className="text-[18px] sm:text-[20px] font-semibold leading-[1.4] text-[hsl(var(--text-primary))] mt-10 mb-5">
            Photography and Media
          </h3>

          <p>
            Trippers may be photographed or filmed during the trip. By booking a
            trip with Trip Cooks, you grant permission for Trip Cooks to use
            such media for promotional and documentation purposes.
            <br /> <br />
            {/* Trip Cooks may collect still and video images during the course of
            your holiday for advertising and promotional uses. By booking a trip
            with Trip Cooks, you agree that these images may be collected and
            used at Trip Cooks&apos; discretion, including for commercial
            purposes. The images may be cropped, altered, combined, or otherwise
            edited, and you agree that Trip Cooks will retain ownership of all
            rights associated with such images.
            <br /> <br /> */}
            {/* Trip Cooks reserves the right to assign, grant, transfer, or
            otherwise give to a third party the rights and ownership of any
            images collected. This includes but is not limited to employees,
            independent contractors, and other entities authorized by Trip Cooks
            to capture content for any authorized purpose, whether for
            commercial or personal use.
            <br /> <br /> */}
            If you do not wish to be on camera nor on video, please notify Trip
            Cooks before the start of your trip.
            <br /> <br />
            {/* By booking a trip with Trip Cooks, you agree that any still and
            video images you capture during your holiday are for personal use
            only. Unless you obtain written permission from Trip Cooks, you
            agree that you will not use any content captured for commercial
            purposes. This does not prevent you from using content for personal
            use and sharing it on your personal social media channels. If you
            breach this clause, Trip Cooks reserves the right to enforce the
            removal of such content.
            <br /> <br /> */}
            <span>
              By booking the Trip Cooks Experience, trippers acknowledge that
              they have read, understood, and agreed to these terms and
              conditions.
            </span>
          </p>
        </div>
        </div>
      </div>
      <ReadyToStart />
      <SubcribeToNewsLetter />
      <Footer />
    </main>
  );
};

export default Page;
