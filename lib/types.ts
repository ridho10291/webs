export type GuestbookEntry = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

export type ApiResponse<T = unknown> = {
  ok: boolean;
  error?: string;
  data?: T;
};