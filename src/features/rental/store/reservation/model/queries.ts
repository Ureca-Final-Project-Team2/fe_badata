import { useMutation } from "@tanstack/react-query";

import { END_POINTS } from "@/shared/api/endpoints";
import { axiosInstance } from "@/shared/lib/axios/axiosInstance";

export const useDeleteRentalMutation = () => {
  return useMutation({
    mutationFn: async (reservationId: number) => {
      await axiosInstance.delete(END_POINTS.RENTAL.DELETE_RESERVATION(reservationId));
    },
  });
};
