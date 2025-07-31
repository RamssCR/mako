import { z } from 'zod'

export const frontendSchema = z.object({
  VITE_BACKEND_URL: z.url().describe('The URL of the backend server'),
  VITE_SENTRY_DSN: z.string().optional().describe('The DSN for Sentry error tracking'),
})

export const firebaseSchema = z.object({
  VITE_FIREBASE_API_KEY: z.string().describe('Firebase API key'),
  VITE_FIREBASE_AUTH_DOMAIN: z.string().describe('Firebase Auth domain'),
  VITE_FIREBASE_PROJECT_ID: z.string().describe('Firebase Project ID'),
  VITE_FIREBASE_STORAGE_BUCKET: z.string().describe('Firebase Storage bucket'),
  VITE_FIREBASE_MESSAGING_SENDER_ID: z.string().describe('Firebase Messaging sender ID'),
  VITE_FIREBASE_APP_ID: z.string().describe('Firebase App ID'),
  VITE_FIREBASE_MEASUREMENT_ID: z.string().optional().describe('Firebase Measurement ID'),
})

export const nodeSchema = z.object({
  SENTRY_ORG: z.string().optional().describe('Sentry organization slug'),
  SENTRY_PROJECT: z.string().optional().describe('Sentry project slug'),
})
