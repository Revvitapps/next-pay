# NEXT-PAY

Next Pay Business Solutions public marketing platform.

## Tech Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons
- ESLint

## Local Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000`.

## Vercel Deployment
This project is optimized for Vercel. Import the repository into Vercel and deploy with the default Next.js settings.

## Environment Variables
- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL`
- `CONTACT_CC_EMAIL`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `CONTACT_WEBHOOK_URL`
- `CONTACT_WEBHOOK_TOKEN`
- `SERVICE_LEAD_INTERNAL_TO`
- `SERVICE_LEAD_INTERNAL_CC`
- `PARTNER_PAYROLL_EMAIL`
- `PARTNER_WORKERS_COMP_EMAIL`
- `PARTNER_BUSINESS_FINANCING_EMAIL`
- `PARTNER_REAL_ESTATE_FINANCING_EMAIL`
- `PARTNER_HR_BENEFITS_EMAIL`
- `PARTNER_TIME_ATTENDANCE_EMAIL`
- `PARTNER_TAX_CREDIT_EMAIL`
- `PARTNER_POS_PAYMENTS_EMAIL`

## Calculator API (Backend Foundation)
- `GET /api/calculator`
  - Returns industry catalog + question schema for the estimator flow.
- `POST /api/calculator`
  - Accepts:
    - `industryId`
    - `answers.businessStage`
    - `answers.operationModel`
    - `answers.checkoutCount`
    - `answers.locationCount`
    - `answers.currentTools[]`
    - `answers.primaryNeeds[]`
    - `answers.integrationTargets[]` (optional)
    - `answers.monthlyVolumeBand` (optional)
    - `answers.supportPreference`
  - Returns a scoped recommendation:
    - package tier
    - complexity score
    - projected timeline
    - recommended business stack/modules
    - suggested tools
    - model-based insights
    - next discovery questions
