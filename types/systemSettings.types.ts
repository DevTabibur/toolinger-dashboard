export interface ISystemSettings {
  _id?: string;
  otpType: "SMS" | "EMAIL";
  otpDigitLimit: number;
  otpExpireTime: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ISystemSettingsResponse {
  success: boolean;
  message: string;
  data: ISystemSettings;
}

export interface IUpdateSystemSettingsPayload {
  otpType?: "SMS" | "EMAIL";
  otpDigitLimit?: number;
  otpExpireTime?: number;
}
