import { tagTypes } from "../tag-types";
import { baseAPI } from "./baseApi";
import {
  ISystemSettingsResponse,
  IUpdateSystemSettingsPayload,
} from "@/types/systemSettings.types";

const OTPSettingsURL = `/v1/settings/system/otp`;

export const otpSettingsApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    // ** Get system settings
    getOTPSettings: build.query<ISystemSettingsResponse, void>({
      query: () => ({
        url: `${OTPSettingsURL}`,
        method: "GET",
      }),
      providesTags: [tagTypes.systemSettings],
    }),

    // ** Update system settings (admin only)
    updateOTPSettings: build.mutation<
      ISystemSettingsResponse,
      IUpdateSystemSettingsPayload
    >({
      query: (data) => ({
        url: `${OTPSettingsURL}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.systemSettings],
    }),
  }),
});

export const { useGetOTPSettingsQuery, useUpdateOTPSettingsMutation } =
  otpSettingsApi;
