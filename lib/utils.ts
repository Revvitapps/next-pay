import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type LeadPrefillPayload = {
  industry?: string;
  message?: string;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function track(eventName: string, payload?: Record<string, unknown>) {
  const details = payload ?? {};
  // Replace this console event with GA4/Segment/Zapier dispatch later.
  console.log(`[track] ${eventName}`, details);
}

export function scrollToSection(sectionId: string) {
  if (typeof window === 'undefined') {
    return;
  }

  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function prefillAndScrollContact(payload?: LeadPrefillPayload) {
  if (typeof window === 'undefined') {
    return;
  }

  window.dispatchEvent(new CustomEvent<LeadPrefillPayload>('prefill-contact', { detail: payload }));
  scrollToSection('contact');
}
