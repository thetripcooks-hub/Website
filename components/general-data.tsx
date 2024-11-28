"use cliet";
import { queryGetPrivateTripPage } from "@/queries/private-query";
import { queryGetReviews } from "@/queries/review-query";
import { queryGetOurServices } from "@/queries/services-query";
import { queryGetTripcooksExperience } from "@/queries/trip-experience-query";
import useGeneralStore from "@/stores/generalStore";
import { PrivateTripResponse } from "@/types/private-trip";
import { AllReviewsResponse } from "@/types/review";
import { OurServicesResponse } from "@/types/services";
import { TripExperienceResponse } from "@/types/trip-experience";
import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";

const GeneralData = ({ children }: { children: React.ReactNode }) => {
  const {
    setServices,
    setLoadingServices,
    setReviews,
    setLoadingReviews,
    setTripcooksExperience,
    setLoadingTripcooksExperience,
    setPrivateTrip,
    setLoadingPrivateTrip,
  } = useGeneralStore();

  // Fetch services data
  const { data: servicesData, loading: servicesLoading } =
    useQuery<OurServicesResponse>(queryGetOurServices);

  useEffect(() => {
    setLoadingServices(servicesLoading);
    if (servicesData) {
      setServices(servicesData.ourServicesCollection.items);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [servicesData, servicesLoading]);

  // Fetch reviews data
  const { data: reviewsData, loading: reviewsLoading } =
    useQuery<AllReviewsResponse>(queryGetReviews);
  useEffect(() => {
    setLoadingReviews(reviewsLoading);
    if (reviewsData) {
      setReviews(reviewsData.ourWallOfLoveCollection.items);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviewsData, reviewsLoading]);

  // Fetch tripcooks experience data
  const { data: tripcooksExperienceData, loading: tripcooksExperienceLoading } =
    useQuery<TripExperienceResponse>(queryGetTripcooksExperience);

  useEffect(() => {
    setLoadingTripcooksExperience(tripcooksExperienceLoading);
    if (tripcooksExperienceData) {
      setTripcooksExperience(
        tripcooksExperienceData.tripcooksExperienceCollection.items
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripcooksExperienceData, tripcooksExperienceLoading]);

  // Fetch private trip data
  const { data: privateTripData, loading: privateTripLoading } =
    useQuery<PrivateTripResponse>(queryGetPrivateTripPage);

  useEffect(() => {
    setLoadingPrivateTrip(privateTripLoading);
    if (privateTripData) {
      setPrivateTrip(privateTripData.privateTripPageCollection.items);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [privateTripData, privateTripLoading]);

  return <>{children}</>;
};

export default GeneralData;
