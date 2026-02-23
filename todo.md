# Matlock Custom Homes - New Features TODO

## Phase 1: Full-Stack Upgrade
- [x] Upgrade project with web-db-user feature
- [x] Verify server is running and backend routes work

## Phase 2: Lot Feasibility Checker
- [x] Build LotFeasibilityChecker component (address, flood zone, lot size, HOA, waterfront inputs)
- [x] Add feasibility logic (preliminary feasibility + permitting considerations)
- [x] Integrate below photos in WhyChooseSection

## Phase 3: Renovate or Rebuild Calculator
- [x] Build RenovateOrRebuild component (home age, sq ft, desired addition, budget inputs)
- [x] Add cost estimation logic for renovation vs rebuild
- [x] Add to CustomHomeBuilding service page
- [x] Add to HomeRenovations service page

## Phase 4: Backend Email Routes
- [x] Create email API route for contact form submissions
- [x] Create email API route for estimate tool results
- [x] Create email API route for chatbox conversations
- [x] Create email API route for lot feasibility checker results
- [x] Create email API route for renovate/rebuild calculator results
- [x] All emails sent to matlockhomes@icloud.com (via notifyOwner)

## Phase 5: Frontend Integration
- [x] Connect contact form to email endpoint
- [x] Connect estimate tool to email endpoint
- [x] Connect chatbox to email endpoint
- [x] Connect lot feasibility checker to email endpoint
- [x] Connect renovate/rebuild calculator to email endpoint

## Phase 6: Testing & Checkpoint
- [x] Test all forms and email delivery (13 vitest tests passing)
- [x] Save checkpoint (version 587969d1)

## Phase 7: Convert Tools to Dedicated Pages
- [x] Create /tools/lot-feasibility page with gold-themed design
- [x] Replace inline LotFeasibilityChecker in WhyChooseSection with gold CTA button/link
- [x] Create /tools/renovate-or-rebuild page with gold-themed design
- [x] Replace inline RenovateOrRebuild in CustomHomeBuilding with gold CTA button/link
- [x] Replace inline RenovateOrRebuild in HomeRenovations with gold CTA button/link
- [x] Register new routes in App.tsx
- [x] Test and save checkpoint

## Phase 8: Redesign Tools with Lighter Aesthetic
- [x] Redesign LotFeasibilityChecker component — light background, clean inputs, gold accents
- [x] Redesign RenovateOrRebuild component — light background, clean inputs, gold accents
- [x] Lighten LotFeasibilityPage hero and layout
- [x] Lighten RenovateOrRebuildPage hero and layout
- [x] Test and save checkpoint (13/13 tests passing)

## Phase 9: Build-Ready Estates Page
- [x] Gather property details from Zillow listings (6841 Oelsner St & 17524 Boy Scout Rd)
- [x] Create premium Build-Ready Estates page with lot+home package cards
- [x] Include lot location, proposed home design, package price, lot size, neighborhood highlights
- [x] Add "View Full Listing" and "Inquire About This Home" CTAs
- [x] Add Build-Ready Estates to navigation bar (desktop + mobile)
- [x] Register route in App.tsx
- [x] Test and save checkpoint (13/13 tests passing)

## Phase 10: Remove Projects, Add Build-Ready Estates Quick Link
- [x] Remove Projects section from homepage (Home.tsx)
- [x] Remove Projects from desktop navigation (Navbar.tsx)
- [x] Remove Projects from mobile navigation (Navbar.tsx)
- [x] Remove Projects from footer quick links (Footer.tsx)
- [x] Add Build-Ready Estates as a footer quick link
- [x] Test and save checkpoint (13/13 tests passing)

## Phase 11: Notification Forwarding & Google Maps
- [x] Enable notification forwarding to matlockhomes@icloud.com — already wired via notifyOwner, user needs to enable email forwarding in Settings > Notifications
- [x] Add Google Maps embed to Contact section (8219 Massachusetts Ave, New Port Richey, FL 34653)
- [x] Test and save checkpoint (13/13 tests passing, maps verified)
