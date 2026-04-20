
type ErrorResponse = {
  message: string;
  reason: string;
  statusCode?: number;
};

export const ExtractErrorPayload = (err: any): ErrorResponse => {

  return {
    message: err?.response?.data?.message ?? "Unknown Error",
    reason: err?.response?.data?.cause ?? "Unknown Reason",
    statusCode:err?.response?.data?.statusCode??500
  };
};