# NextPay Completion Handoff

You are taking over an in-progress Next.js website rebuild for the NextPay site in the existing repo.

Repo:
`/Users/mattbryan/NEXT-PAY`

## Critical Instruction
Do not assume anything is done just because prior notes say it was done.
You must verify every requested change directly in the actual rendered local site and in the source files before marking it complete.

## The Problem To Solve
A number of changes were reportedly "done" in prior work, but when reviewed in the live local site they were either:
- not actually implemented
- implemented in the wrong component
- partially implemented
- overwritten later
- or visually not rendering as intended

## Your Job
Finish the site properly.
Audit every item below against the local site and source code.
Fix all mismatches.
Do not stop at "I changed the file."
Verify in the rendered site.

## Operational Rules
1. Work in the existing repo structure only.
2. Do not rebuild the whole site from scratch.
3. Reuse existing components/data where possible.
4. Before marking anything done, verify it in the local rendered site.
5. If a change is only local, say so clearly.
6. If a change is committed/pushed, say so clearly.
7. Do not say something is complete unless it is actually visible in the local site.
8. Keep all public-facing copy customer-facing only.
9. Hidden/internal review pages may remain hidden and noindexed.
10. If you find contradictory implementations across components, consolidate them.

## Section 1 — Global Brand / Content Rules

### Branding
- Public brand must always be `NextPay`
- Never show:
  - Next Pay
  - NEXT-PAY
  - Next-Pay
  - Nextpay
- Scrub public-facing partner / internal / proposal-style language

### Replace partner language with white-labeled language
- Business Services
- NextPay provides...
- NextPay helps businesses...
- Our business services include...

### Remove internal/client-review sounding phrases from the live site
Example:
- remove phrases like `Logos that reinforce every conversation`
- use plain live-site language like `Trusted Network`

### Marketing service naming
- Replace public-facing `Marketing, Outreach & Lead Generation`
- Use `Network Building` everywhere public-facing
- Internal slugs can remain if needed for routing stability

## Section 2 — Global UI / Visual Rules

### Overall direction
- Premium fintech
- Black / graphite / dark glass base
- Less teal-heavy fill everywhere
- Teal/cyan used as accent, not as every panel background
- Stronger visual rhythm, less “info splattered on a page”

### Interactive behavior
- Everything clickable on the public site should clearly “light up” on hover/focus
- Hover states should be visibly stronger and consistent
- Buttons, links, pills, cards, and clickable tiles should all clearly respond

### CTA color hierarchy
- Journey / quote buttons should be teal
- If two buttons are adjacent, only the quote/journey button should be teal
- Neighboring non-quote button should be black/dark
- Top-right navbar button should remain quote wording and teal:
  - `Get Your Quote`

## Section 3 — Nav / Header / Mobile Menu

### Fix and verify
- Hamburger menu must work on the actual rendered site
- Products and Industries dropdowns must be readable and responsive
- Dropdown background should be black or frosted dark, not teal-heavy
- Dropdown options should not be cut off on narrower desktop widths
- Desktop nav and mobile/hamburger breakpoints must behave correctly

### Logo
- Use the cleaned/scrubbed NextPay logo in top-left
- Replace old logo asset everywhere shared logo is used
- No background strip behind logo if scrubbed version exists

## Section 4 — Homepage / Services Flow

### Core service emphasis
The three top business lines must be clearly prioritized:
1. Payment Processing & POS Systems
2. Business Lending
3. Network Building

Bring some styling from the proposed redesign into the live site:
- stronger CTA feel
- more guided flow
- less clutter
- more intentional hierarchy

### Services section requirements
- Remove duplicate or leftover pill rows
- The three featured service cards should not have duplicated grouped pills
- Each featured card should feel clean:
  - title
  - short description
  - one grouped pill row
  - one clear CTA line
- Make the whole featured card clickable, not just a small sub-element

### Move / reorder content correctly
- The three major business lines should occupy the primary featured positions
- Old capability-style items like:
  - Operations + Infrastructure Stack
  - Service Delivery Workflow
  - Automation + Enablement
  should not still be competing in the same top spots if they were already moved

### Verify layout / stacking
- Fix any broken card stacking / row gaps / awkward empty desktop space
- Business Brokerage should not leave dead open areas in the grid
- Desktop layouts must look intentional, not broken

## Section 5 — Business Services Content

Business Services structure should present:
- Payment Processing & Merchant Services
- Point of Sale (POS) Systems
- Online Payments, E-Commerce & Invoicing
- Business Financing & Funding
- Payroll & Workers’ Compensation
- Network Building
- Business Brokerage

Do not revert to partner-service framing.

### Verify
- Business Services heading appears once where appropriate
- Remove repeated “Business Services” blocks that sit too close together
- Remove stray eyebrow/heading duplication where not needed

## Section 6 — Industries Flow

Industries page should be simplified:
- Remove preview behavior
- Remove mini-quote/pre-reveal behavior
- Each sector tile should go directly to its page
- Each industry tile should go directly to its page

### CTA wording on industry surfaces
- Use `Start Your Journey`
- But keep global CTA hierarchy rules intact

Industry pages should not pre-reveal setups before user input unless explicitly desired later.

### Verify
- sectors link correctly
- industries link correctly
- no extra preview buttons remain if user asked to remove them
- no extra mini-quote blocks remain if user asked to remove them

## Section 7 — Quote / Journey Flow

This is one of the biggest unresolved items.

### Reference direction
- RedFynn for journey UX
- Galaxy only for merchant-content structure and educational sections

### The journey should feel like
- easy selection tiles
- one step at a time
- simple to read
- no overload
- recommendation info held until the end
- collect user/contact info at the end, not up front

### Current problem
- prior work only partially moved the journey in this direction
- it still feels too much like a form embedded in a page

### Required outcome
- `/pricing` should feel like an isolated journey, not a normal marketing page
- Use large tile-based steps
- One clear decision per step
- Minimal surrounding content
- Recommendation/setup output should only appear after choices are made
- Contact info capture should come at the end
- Journey wording can say `Start Your Journey`
- Top-right nav button should still say `Get Your Quote`

### Use RedFynn-style ideas
- business stage
- industry
- sub-sector
- needs/services
- sales/volume
- timeline
- final recommendation
- contact capture last

Do not ask for too much info up front.

## Section 8 — Galaxy-Derived Merchant Content

Use Galaxy-style merchant processor content blocks, but rewrite for NextPay and keep it premium/compliance-safe.

Add/verify on:
- `/services/payment-processing-merchant-services`
- `/services/point-of-sale-pos-systems`

### Payment Processing page should cover
- flexible terms
- accepts all major cards
- speed & security
- transparent pricing
- 24/7 support
- next-day funding
- auto batch-out
- reporting visibility

### Programs section should include
- Flat Rate
- Interchange Plus
- Dual Pricing / Customer Pay
- Cash Discount

Use compliance-safe phrasing.
Do not use cheap or risky promo copy like:
- FREE processing fees
- lowest price guarantee
- blanket zero-cost claims

### Merchant FAQ should cover
- lowering fees without upsetting customers
- merchant pay vs customer pay
- chargebacks / disputes
- deposit timing
- auto batch
- reporting

### POS page should cover
- recommended setups
- countertop / mobile / full service / kiosk
- reporting
- payroll visibility
- batch scheduling
- device highlights
- FAQ

Verify all of that is actually rendered in the live local service pages.

## Section 9 — Logos / Trust Sections

All logos should:
- be clear
- full color where intended
- moving/scrolling if used as trust/logo bands
- have alt text
- look production-ready

### Logo system
- verify all payment / processor / POS / platform logos are actually wired and rendering
- verify color rendering is correct
- replace low-quality placeholders where possible
- ensure trust-band wording is customer-facing only

### Trust/logo band copy
- use simple public-facing wording like:
  - Trusted Network
  - Trusted POS Brands
  - Trusted Brands

Remove internal-sounding or proposal-sounding headings.

## Section 10 — Images / Asset Fit

This has been repeatedly inconsistent. Verify every visible image in the rendered site.

### Critical image issues to verify/fix
- Business Brokerage image:
  - correct asset
  - no baked text
  - not stretched
  - correct crop/fit on all surfaces it appears on
- Payment Processing tile image:
  - must look like payment processing
- POS image:
  - use correct futuristic POS image where intended
- Service detail hero images:
  - no text overlapping if source image contains text
  - overlay/content should not fight image content

If necessary:
- use per-surface image fit rules
- use `object-cover`, `object-contain`, or custom object-position appropriately
- do not stretch images unnaturally

## Section 11 — Live-Site Copy Cleanup

Scan all public pages for repetitive or awkward phrasing.
Especially:
- repeated service/category labels
- repeated “Business Services”
- repeated trust-band copy
- repeated journey wording
- client-review/proposal language leaking into public pages

Keep live site copy:
- short
- customer-facing
- premium
- not internal

## Section 12 — Contact / Statement Upload / Turnstile

Verify the current live code state:
- Turnstile env names:
  - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
  - `TURNSTILE_SECRET_KEY`
- Statement upload:
  - Vercel Blob-backed persistence
  - no local filesystem writes in production
  - current production persistence was moved to Blob
- Resend/env wiring:
  - `RESEND_API_KEY`
  - `CONTACT_FROM_EMAIL`
  - `CONTACT_TO_EMAIL`
  - optional `CONTACT_CC_EMAIL`

Do not rebuild backend unless needed.
Just verify current state and ensure the live forms/journey submit correctly.

## Section 13 — Local Vs Deployed Truth

The prior issue was:
- local source did not always match what the user saw
- or changes were claimed complete when not actually verified in the rendered site
- or changes were still uncommitted/pushed

You must:
1. inspect source
2. inspect rendered local site
3. confirm both match
4. only then say the item is done

If something is “done in source but not visible,” diagnose why.
Do not assume cache.
Prove it.

## Section 14 — Git / Vercel

Note:
- pushes have been succeeding
- GitHub reports repo moved from:
  - `Revvitapps/NEXT-PAY`
  to:
  - `Revvitapps/next-pay`
- verify whether local `origin` needs updating
- verify whether Vercel is actually deploying the latest commits
- if user asks to push, commit and push clearly
- do not leave large batches uncommitted if the user is expecting deployed changes

## Section 15 — Output Required

Work through all items above and return:

1. **Completed and verified**
- items fixed in both source and rendered local site

2. **Completed in source but not yet verified visually**
- if any remain, explain exactly why

3. **Still unresolved**
- exact remaining issues
- exact files/components involved

4. **Files changed**
- list all files touched

5. **If pushed**
- provide commit hashes
- say whether Vercel should now deploy them

Most important:
Do not claim completion unless the rendered local site actually matches the requested change.
