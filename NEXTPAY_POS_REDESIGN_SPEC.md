# NextPay POS Page Redesign Spec

## Purpose

This document captures a proposed redesign direction for the NextPay POS and related product surfaces based on competitive review, current site structure, and the existing NextPay build system.

This is a planning document only. It is intended for client review before implementation.

## Primary Goal

Shift the POS experience from a generic service page into a more product-led, industry-relevant flow without rebuilding the entire site architecture.

The redesign should:

- make POS feel more tangible and visual
- help users self-identify by business type
- present terminal/setup options more clearly
- reduce overly text-heavy service sections
- keep the site premium, modern, and conversion-focused

## Core Principles

1. Keep the current architecture
- retain the existing Next.js routes and shared components where possible
- avoid introducing duplicate pages or duplicate taxonomies

2. Make POS feel product-led
- use larger product imagery
- use setup cards and use-case tiles
- reduce generic “service page” presentation

3. Keep copy concise
- fewer large paragraphs
- shorter outcome-driven headings
- stronger section labels

4. Keep the visual tone premium
- black / graphite base panels
- glass / frosted surfaces where helpful
- cyan accent only as a highlight
- avoid loud gradients or excessive teal blocks

## Competitive Direction Being Borrowed

The following patterns are worth adapting from the reviewed POS competitor page:

- industry-first POS positioning
- use-case tiles immediately under the hero
- feature modules framed as operational outcomes
- stronger recurring hardware visuals
- CTA blocks throughout the page, not only at the end

The following should not be copied:

- aggressive “free” pricing language
- cluttered page structure
- repetitive long-form text
- low-trust promo styling

## Pages / Areas Affected

### 1. `/services/point-of-sale-pos-systems`

This should become the primary POS landing page and receive the largest redesign effort.

### 2. `/services`

The services grid should visually support the stronger POS/product direction by making the POS card feel more product-forward.

### 3. Global `Products` dropdown

The nav should reinforce product categories more clearly and align with the updated POS structure.

### 4. Homepage product-adjacent areas

The homepage should better support the POS story by introducing stronger “recommended setup” or “business-type fit” cues.

### 5. Industry pages connected to POS

Relevant industry pages should link into the POS page and specific setup/use-case sections where appropriate.

## Proposed POS Page Structure

Route:
- `/services/point-of-sale-pos-systems`

### Section 1. Hero

Purpose:
- establish POS as a flagship operational product, not just a line item in a service list

Content:
- large POS image
- concise headline
- one subheadline
- CTA pair

Suggested structure:
- Eyebrow: `Point of Sale Systems`
- Headline: `POS Systems Built for the Way You Operate`
- Subheadline: `Modern checkout, reporting, staff controls, and payment tools in one connected setup.`
- CTAs:
  - `Get a Custom Quote`
  - `Upload My Statement`

Design direction:
- one large image block
- dark glass content panel
- minimal copy

### Section 2. POS Built for How You Operate

Purpose:
- help visitors quickly self-select by business type

Recommended use-case cards:
- Restaurants & Hospitality
- Retail
- Beauty & Personal Care
- Field / Home Services
- Multi-location Operators
- Mobile POS

Each card should include:
- short title
- one-line operational description
- relevant image or icon
- link to relevant industry page or quote flow

### Section 3. Recommended Terminal / Setup Types

Purpose:
- make the page feel product-led and visual

Recommended setup cards:
- Countertop POS
- Mobile POS
- Full Service Station
- Self-Service Kiosk

Each card should include:
- image
- 3 concise bullets
- ideal fit line

Example bullet style:
- Customer-facing checkout
- Receipt and drawer support
- Reporting and staff permissions

### Section 4. Core POS Capabilities

Purpose:
- frame POS features as real business outcomes

Recommended capability modules:
- Faster Checkout
- Real-Time Reporting
- Inventory and Staff Controls
- Multi-Location Visibility
- Loyalty and Customer Experience
- Online Ordering and Invoicing

Each capability block should use:
- short heading
- 1 sentence max
- optional supporting bullet or icon

### Section 5. Platform / Integration Logos

Purpose:
- reinforce credibility and ecosystem support

Use existing moving logo band.

Suggested section title:
- `Supported POS and Commerce Integrations`

### Section 6. Mid-Page CTA

Purpose:
- create a clear conversion point before the user reaches the end

Recommended CTA set:
- `Get a Custom Quote`
- `Upload My Statement`

### Section 7. Industry Connection Block

Purpose:
- connect POS directly to vertical use cases

Suggested layout:
- short intro
- 4 to 6 linked industry tiles

Suggested linked pages:
- Restaurants & Hospitality
- Retail Businesses
- Beauty & Personal Care
- Home Services & Contractors
- Professional & Business Services

### Section 8. Final CTA

Purpose:
- close the page with a clear next step

Recommended CTA set:
- `Get a Custom Quote`
- `Upload My Statement`

## Supporting Changes on Other Pages

### `/services`

Recommended changes:
- keep the existing service grid
- make the POS card a stronger visual anchor
- ensure the POS image and tagline emphasize a product/system feel
- reduce extra explanatory copy above the card grid

### Homepage

Recommended changes:
- add a small “recommended POS setups” or “built for your business type” strip below services or near product-related sections
- use 3 to 4 short cards only
- keep it visual, not text-heavy

### Products Dropdown

Recommended changes:
- keep categories simple
- use product-led labels
- align category naming with the POS page sections

Suggested categories:
- POS Systems
- Payment Acceptance
- Online Payments
- Business Financing

### Industry Pages

Recommended changes:
- add contextual links back into the POS page
- where relevant, reference the best-fit POS setup
- keep links focused and not repetitive

## Visual Direction

### What to Increase

- large product imagery
- black / graphite panel surfaces
- clear section contrast
- stronger visual hierarchy
- outcome-driven cards

### What to Reduce

- teal-heavy large panel backgrounds
- long descriptive paragraphs
- repeated service-style headings
- text-first layouts where imagery would communicate faster

### Recommended Palette Direction

- base: near-black / graphite
- panel: black glass / charcoal
- accent: cyan only for emphasis
- text: white / soft gray

## Existing Components / Routes to Reuse

These should be reused rather than replaced if possible:

- [page.tsx](/Users/mattbryan/NEXT-PAY/app/services/[serviceSlug]/page.tsx)
- [ServicesSection.tsx](/Users/mattbryan/NEXT-PAY/components/services/ServicesSection.tsx)
- [TerminalCards.tsx](/Users/mattbryan/NEXT-PAY/components/terminals/TerminalCards.tsx)
- [LogoBand.tsx](/Users/mattbryan/NEXT-PAY/components/trust/LogoBand.tsx)
- [Navbar.tsx](/Users/mattbryan/NEXT-PAY/components/nav/Navbar.tsx)
- [serviceVisuals.ts](/Users/mattbryan/NEXT-PAY/lib/content/serviceVisuals.ts)
- [catalog.ts](/Users/mattbryan/NEXT-PAY/lib/services/catalog.ts)

## Proposed Implementation Order

1. Redesign `/services/point-of-sale-pos-systems`
2. Tune POS-related setup/terminal cards
3. Refine Products dropdown labels and hierarchy
4. Add homepage POS support section
5. Add industry-to-POS internal linking
6. Final copy and visual polish

## Client Review Items

Before implementation, the client should confirm:

- which business types should be featured in the POS use-case row
- whether the setup cards should represent real hardware or abstract setup categories
- whether specific POS brands should be named directly in the content
- which imagery is approved for final use
- whether they want the POS page to remain broad or lean more restaurant / retail focused

## Summary

The redesign should not be a full rebuild.

It should be a structured upgrade that makes the POS experience:

- more visual
- more product-led
- more industry-specific
- less generic
- more aligned with buyer decision-making

That can be done cleanly within the current NextPay architecture.
