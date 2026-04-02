# NextPay Quiz Questions And Logic

This file summarizes the current quiz flow, questions, answer options, and recommendation logic used in the guided quiz experience.

Primary source files:
- `components/calculator/GuidedSolutionQuiz.tsx`
- `components/industries/industryData.ts`
- `lib/calculator/catalog.ts`
- `lib/calculator/types.ts`

## Quiz Overview

Current quiz title:
- `Find the right NextPay setup one step at a time`

Current intro copy:
- `Make one decision per step. Recommendations stay hidden until the end, and we only ask for your contact details after the setup is ready.`

Progress labels:
1. `Business Stage`
2. `Industry`
3. `Needs`
4. `Volume`
5. `Timeline`

Completion behavior:
- Recommendations are hidden until the final step is complete.
- The user then sees recommended POS, payment setup, service recommendations, and a contact form to submit the journey.

## Step 1: Business Stage

Prompt:
- `What defines you best?`

Support text:
- `Choose the option that best reflects where your business is today.`

Options:
- `I have an existing business.`
  - stored value: `existing`
- `I'm opening a new business.`
  - stored value: `new`

Logic:
- Selecting either option auto-advances to Step 2.

## Step 2: Industry

Prompt:
- `What industry are you in?`

Support text:
- `Select the industry and business type that best matches your operation.`

Sector options:
- `Restaurants`
  - stored value: `restaurants`
- `Retail`
  - stored value: `retail`
- `Services`
  - stored value: `services`
- `High-Risk Businesses`
  - stored value: `high-risk`

When a sector is selected:
- the quiz clears any previously selected industry
- the quiz clears any previously selected sub-sector / business type
- the quiz shows matching industry options for that sector

Industry options by sector:

### Restaurants
- `Restaurants & Hospitality`

Sub-sector options:
- `Full Service`
- `Quick Service`
- `Cafe`
- `Bar/Nightclub`
- `Food Truck`

### Retail
- `Retail Businesses`

Sub-sector options:
- `Grocery`
- `Apparel`
- `Liquor`
- `Specialty Retail`
- `Pet Supply`

### Services
- `Automotive Businesses`
  - `Auto`
  - `Repair`
  - `Dealership Service`
  - `Car Wash`
  - `Towing`
- `Beauty & Personal Care`
  - `Salon`
  - `Spa`
  - `Medical Spa`
  - `Tattoo`
  - `Massage`
- `Entertainment & Specialty Businesses`
  - `Events`
  - `Entertainment Centers`
  - `Golf`
  - `Nonprofit`
  - `Childcare`
- `Fitness & Membership Businesses`
  - `Gym`
  - `Yoga`
  - `Pilates`
  - `CrossFit`
  - `Training`
- `Healthcare & Medical Practices`
  - `Dental`
  - `Medical Clinic`
  - `Chiropractic`
  - `Dermatology`
  - `Veterinary`
- `Home Services & Contractors`
  - `HVAC`
  - `Plumbing`
  - `Electrical`
  - `Roofing`
  - `Landscaping`
- `Professional & Business Services`
  - `Law`
  - `Accounting`
  - `Agency`
  - `Consulting`
  - `Engineering`

### High-Risk
- `High-Risk Businesses`

Sub-sector options:
- `CBD`
- `Smoke/Vape`
- `Peptides`
- `Travel Agency`
- `SEO Marketing`
- `Nutraceuticals`
- `Telemedicine`

Logic:
- Selecting an industry stores the industry id and preselects the first sub-sector as `businessType`.
- Selecting a sub-sector stores `businessType`.
- Once sector, industry, and business type are present, the quiz auto-advances to Step 3.

## Step 3: Needs

Prompt:
- `What do you need right now?`

Support text:
- `Pick the services that matter most to your next phase.`

Instruction:
- `Select all that apply.`

Available toggles:
- `POS system`
  - field: `needPosSystem`
  - default: `true`
- `Online payments`
  - field: `needOnlinePayments`
  - default: `true`
- `Dual pricing / cash discount`
  - field: `interestedInDualPricing`
  - default: `false`
- `Financing`
  - field: `needFinancing`
  - default: `false`
- `Payroll`
  - field: `needPayroll`
  - default: `false`
- `Marketing services`
  - field: `needMarketingServices`
  - default: `false`

Logic:
- The user can continue only if at least one of these toggles is selected.
- This step does not auto-advance.

## Step 4: Volume

Prompt:
- `Tell us about your sales volume`

Support text:
- `A few quick volume details help narrow the right setup.`

Inputs:
- `Monthly card volume`
  - field: `monthlyCardVolume`
  - must be greater than `0`
- `Average ticket size`
  - field: `averageTicketSize`
  - must be greater than `0`
- `Number of locations`
  - field: `numberOfLocations`
  - must be greater than `0`

Logic:
- If all three values are greater than zero, the step can continue.
- If these values are supplied through auto-advance logic, the quiz advances to Step 5.

## Step 5: Timeline

Prompt:
- `How soon are you looking to implement?`

Support text:
- `Implementation timing helps shape the rollout path.`

Options:
- `< 1 month`
  - stored value: `urgent`
- `2-3 months`
  - stored value: `standard`
- `4+ months`
  - stored value: `planned`

Logic:
- Selecting a timeline completes the quiz after a short loading state.

## Continue / Validation Logic

Step-level validation rules:
- Step 1 requires `businessStage`
- Step 2 requires `industrySector`, `industry`, and `businessType`
- Step 3 requires at least one selected need
- Step 4 requires positive values for monthly volume, average ticket, and locations
- Step 5 requires `timeline`

Error message when trying to continue without valid input:
- `Please complete this step before continuing.`

## Recommendation Logic

The quiz produces three core outputs:
- recommended POS platform
- recommended payment setup
- recommended service list

### POS Recommendation Logic

Source function:
- `resolvePosRecommendation(industryId, locations)`

Rules:
- if industry id contains `restaurants` or `hospitality`
  - if locations > 2: `SkyTab + Clover`
  - else: `Clover`
- if industry id contains `retail`
  - if locations > 2: `Square + Dejavoo`
  - else: `Square`
- if industry id contains `home-services` or `contractors`
  - `FieldPulse + SwipeSimple`
- if industry id contains `high-risk`
  - `NMI + Dejavoo`
- otherwise
  - if locations > 3: `PAX + Valor`
  - else: `SwipeSimple`

### Payment Setup Logic

Source function:
- `resolvePaymentSetup(needsOnline, dualPricing)`

Rules:
- if `needOnlinePayments = true` and `interestedInDualPricing = true`
  - `Hybrid in-person + online gateway setup with compliant dual-pricing deployment.`
- if `needOnlinePayments = true` and `interestedInDualPricing = false`
  - `Interchange-plus setup with gateway, payment links, and recurring billing support.`
- if `needOnlinePayments = false` and `interestedInDualPricing = true`
  - `In-person dual-pricing setup with compliant receipt and pricing display workflow.`
- otherwise
  - `Interchange-plus in-person setup focused on approval performance and transparent pricing.`

### Service Recommendation Logic

Source function:
- `resolveServiceRecommendations(input)`

Always included:
- `Payment Processing & Merchant Services`

Added conditionally:
- if `needPosSystem = true`
  - `Point of Sale Systems`
- if `needOnlinePayments = true`
  - `Online Payments, E-Commerce & Invoicing`
- if `needFinancing = true`
  - `Business Financing & Funding`
- if `needPayroll = true`
  - `Payroll & Workers' Compensation`
- if `needMarketingServices = true`
  - `Network Building`

## Industry-Specific Data Used By The Quiz

The quiz relies on industry profile data for:
- sector filtering
- industry labels
- sub-sector options
- downstream recommended setup/hardware in related industry quote flows

Current industry profiles:
- `Automotive Businesses`
- `Beauty & Personal Care`
- `Entertainment & Specialty Businesses`
- `Fitness & Membership Businesses`
- `Healthcare & Medical Practices`
- `High-Risk Businesses`
- `Home Services & Contractors`
- `Professional & Business Services`
- `Restaurants & Hospitality`
- `Retail Businesses`

## Lead Submission Logic After Quiz Completion

After recommendations are shown, the user can submit contact details.

Required fields:
- `fullName`
- `company`
- `email`
- `phone`
- `turnstileToken`

Validation errors:
- if required contact fields missing
  - `Please complete your contact details.`
- if Turnstile site key is unavailable
  - `Verification is temporarily unavailable. Please try again shortly.`
- if Turnstile token is missing
  - `Please complete the verification challenge.`

Submission type:
- `/api/contact`
- `submissionType: "journey"`

The lead message currently includes:
- business stage
- industry
- sub-sector
- recommended POS
- recommended payment setup
- recommended services
- monthly volume
- average ticket
- locations
- timeline

## Related Calculator / Savings Schema

Separate from the guided quiz, there is also a calculator schema in `lib/calculator/catalog.ts`.

Base calculator questions there:
- `Monthly Processing Volume`
- `Average Transaction Size`
- `Pricing Model`

Pricing model options:
- `Dual Pricing`
  - hint: businesses can pass card processing costs to customers through compliant dual-pricing programs
- `Interchange Plus`
  - hint: businesses pay card processing fees directly with interchange plus a markup

Industry blueprint data there includes:
- positioning statement by industry
- default solution-path statements by industry

## Review Notes

Potential review concerns:
- some question wording is clear and functional, but not especially premium or persuasive
- some logic is hardcoded by string matching on industry id, which is fine operationally but should be documented if recommendations become more complex
- default values currently set `needPosSystem = true` and `needOnlinePayments = true`, which may influence user outcomes unless actively changed
- the quiz currently asks for contact details only after recommendations are revealed, which is a strong trust pattern and likely worth keeping
