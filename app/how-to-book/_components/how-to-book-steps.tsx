import Image from "next/image";
import Link from "next/link";

const steps = [
  {
    number: "1",
    title: "Choose Your Adventure",
    body: (
      <>
        <p>
          Head to our{" "}
          <Link href="/trips" className="text-[#09af0d]">
            Trips page
          </Link>{" "}
          and browse our curated rollout of group trips. Already have a trip in
          mind? Simply use the search bar to quickly find your destination.
        </p>
        <br />
        <p>
          Each trip page includes your itinerary, accommodation details,
          activities, inclusions, and payment terms, so you know exactly what to
          expect before booking. Do have a look at our{" "}
          <Link href="/terms" className="text-[#09af0d]">
            terms and conditions
          </Link>{" "}
          too.
        </p>
      </>
    ),
  },
  {
    number: "2",
    title: "Secure Your Spot with a Deposit",
    body: (
      <>
        <p>
          Found your next adventure? Great! Now it&apos;s time to lock in your
          place. Click &apos;Book Now&apos; and you&apos;ll be redirected to the
          payment screen to pay your deposit. You can also click on &apos;Add to
          Cart&apos; to book multiple trips or for multiple slots.
        </p>
        <br />
        <p>
          Prefer to pay in your own currency? Simply use the currency selector
          at the top right of the page to switch to your preferred option before
          completing your payment.
        </p>
        <br />
        <p>
          The deposit amount varies by trip and your balance is spread in
          instalments so you can pay conveniently leading to the trip start
          date.
        </p>
      </>
    ),
  },
  {
    number: "3",
    title: "Welcome to the Family, Tripper!",
    body: (
      <>
        <p>
          Once your payment goes through, you&apos;re officially part of the
          TripCooks family. You will receive a confirmation mail and as your
          departure date gets closer, you&apos;ll be added to a private group
          chat with your fellow Trippers where important updates, packing tips,
          travel reminders, and trip details will be shared.
        </p>
        <br />
        <p>
          You will also be invited to a e-Meet and Greet a month to the trip for
          you and the other Trippers to get to know each other! Can&apos;t wait!
        </p>
      </>
    ),
  },
  {
    number: "4",
    title: "Prefer Something More Personal? Book a Private Trip",
    body: (
      <>
        <p>
          Group trips not your thing? Or maybe you have specific destinations in
          mind that aren&apos;t part of our yearly trip rollout. We&apos;ve got
          you.
        </p>
        <br />
        <p>
          Simply click{" "}
          <Link href="/private-trips" className="text-[#09af0d]">
            Private trips
          </Link>{" "}
          under the Trips menu and fill out the short form in detail about
          what you&apos;re looking for. Whether it&apos;s a solo getaway, a
          romantic escape, a birthday trip, or something fun with your crew,
          we&apos;ll cook up a custom experience just for you.
        </p>
      </>
    ),
  },
  {
    number: "5",
    title: "Got Questions? We're Just One Tap Away",
    body: (
      <>
        <p>
          We get it. Sometimes you need a little more clarity before committing.
          Maybe you&apos;re unsure about what&apos;s included, visa
          requirements, payment plans, or you just want to know more about a
          destination.
        </p>
        <br />
        <p>
          Whatever it is, we&apos;re here to help. Just tap{" "}
          <Link href="/contact" className="text-[#09af0d]">
            Contact
          </Link>{" "}
          in the top menu, send us a message and our team will get back to you
          as quickly as possible.
        </p>
      </>
    ),
  },
];

function StepBadge({ number }: { number: string }) {
  return (
    <div
      className="bg-[#daf3db] flex items-center justify-center shrink-0"
      style={{
        width: "35.318px",
        padding: "6.142px",
        borderRadius: "76.777px",
      }}
    >
      <span
        className="font-ogg-trial font-bold text-[var(--text-primary,#212121)] dark:text-[#212121] whitespace-nowrap"
        style={{ fontSize: "18.427px", lineHeight: "23.033px" }}
      >
        {number}
      </span>
    </div>
  );
}

export default function HowToBookSteps() {
  return (
    <section className="bg-white dark:bg-[var(--bg-primary)] w-full px-4 sm:px-[89px] py-[48px]">
      <div className="flex items-start justify-between gap-10">
        {/* Steps list */}
        <div className="flex flex-col gap-[42px] w-full sm:w-[676px]">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col gap-[24px]">
              {/* Header row: badge + title */}
              <div className="flex gap-[12px] items-start">
                <StepBadge number={step.number} />
                <h2 className="font-medium text-[22px] sm:text-[24px] leading-[33px] sm:leading-[36px] text-[#212121] dark:text-foreground flex-1 min-w-0">
                  {step.title}
                </h2>
              </div>
              {/* Body text */}
              <div className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[24px] font-normal text-[#6C707A] dark:text-[#8C909B]">
                {step.body}
              </div>
            </div>
          ))}
        </div>

        {/* Sticky rotated image — desktop only */}
        <div
          className="hidden sm:flex items-center justify-center shrink-0 sticky top-[120px]"
          style={{ width: "472px", height: "542px" }}
        >
          <div style={{ transform: "rotate(6.64deg)" }}>
            <div
              className="relative overflow-hidden"
              style={{
                width: "422.17px",
                height: "455.299px",
                border: "6.796px solid white",
                borderRadius: "10.193px",
                boxShadow:
                  "0px 3.398px 24.973px 1.699px rgba(146,146,146,0.25)",
              }}
            >
              <Image
                src="/img/how-to-book-photo.jpg"
                alt="Trip Cooks group adventure"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
