
type ErrorResponse = {
  message: string;
  reason: string;
  statusCode?: number;
};

export const ExtractErrorPayload = (err: unknown): ErrorResponse => {
  const { response } = err as { response: { data: { message: string,cause:string,statusCode:number } } }
  return {
    message: response?.data?.message ?? "Unknown Error",
    reason: response?.data?.cause ?? "Unknown Reason",
    statusCode:response?.data?.statusCode??500
  };
};
