import { queryGetAllTrips } from "@/queries/trips-query";
import useTripStore from "@/stores/trip-store";
import { AllTripsResponse } from "@/types/trip";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";

const useTrips = () => {
  const { loading: tripsLoading, data } =
    useQuery<AllTripsResponse>(queryGetAllTrips);
  const { setTrips, setLoading, trips, setTotalTrips } = useTripStore();

  useEffect(() => {
    setTrips(data?.tripCollection.items ?? []);
    setTotalTrips(data?.tripCollection?.total ?? 9);
  }, [data, setTotalTrips, setTrips]);

  useEffect(() => {
    setLoading(tripsLoading);
  }, [tripsLoading, setLoading]);

  return { trips };
};

export default useTrips;
