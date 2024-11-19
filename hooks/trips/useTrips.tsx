import { queryGetAllTrips } from "@/queries/trips-query";
import useTripStore from "@/stores/trip-store";
import { AllTripsResponse } from "@/types/trip";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";

const useTrips = () => {
  const { loading: tripsLoading, data } =
    useQuery<AllTripsResponse>(queryGetAllTrips);
  const { setTrips, setLoading } = useTripStore();

  useEffect(() => {
    setTrips(data?.tripCollection.items ?? []);
  }, [data, setTrips]);

  useEffect(() => {
    setLoading(tripsLoading);
  }, [tripsLoading, setLoading]);

  return {};
};

export default useTrips;
