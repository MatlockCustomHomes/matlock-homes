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
- [ ] Save checkpoint
