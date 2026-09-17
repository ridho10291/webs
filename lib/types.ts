export type GuestbookEntry = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
  avatar?: string;
};

export type ApiResponse<T = unknown> = {
  ok: boolean;
  error?: string;
  data?: T;
};