import { queryGetAllTrips } from "@/queries/trips-query";
import useTripStore from "@/stores/trip-store";
import { AllTripsResponse } from "@/types/trip";
import { normalizeTripCurrency } from "@/lib/utils";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";

const useTrips = () => {
  const { loading: tripsLoading, data } =
    useQuery<AllTripsResponse>(queryGetAllTrips);
  const { setTrips, setLoading, trips } = useTripStore();

  useEffect(() => {
    setTrips((data?.tripCollection.items ?? []).map(normalizeTripCurrency));
  }, [data, setTrips]);

  useEffect(() => {
    setLoading(tripsLoading);
  }, [tripsLoading, setLoading]);

  return { trips };
};

export default useTrips;
