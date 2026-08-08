import { randomUUID } from "crypto";

export function getId(): string {
  return randomUUID();
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function sanitizeText(input: string, maxLength: number): string {
  return input.replace(/<[^>]*>/g, "").trim().slice(0, maxLength);
}