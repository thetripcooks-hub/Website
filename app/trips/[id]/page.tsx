"use client";
import { generateTripLink } from "@/lib/utils";
import { useParams } from "next/navigation";
import useTripStore from "@/stores/trip-store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CustomLoader } from "@/components/ui";

const Page = () => {
  const router = useRouter();
  const { id } = useParams();
  const { trips } = useTripStore();

  const foundTrip = trips.find((trip) => trip.sys.id === id);

  if (!foundTrip) {
    toast.error("Trip not found");
    router.push(`/home`);
  } else {
    router.push(generateTripLink(foundTrip));
  }

  return (
    <div className="w-screen flex justify-center items-center h-[calc(100vh-95px)]">
      <CustomLoader />
    </div>
  );
};

export default Page;
