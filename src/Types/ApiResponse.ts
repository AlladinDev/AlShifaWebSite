import type { ApiError } from "./ApiError";
import type { ApiSuccess } from "./ApiSuccess";

export type ApiResponse=Promise<ApiSuccess|ApiError>
