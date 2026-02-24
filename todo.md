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

## Phase 12: Resend Email Integration
- [x] Store Resend API key securely
- [x] Install Resend SDK
- [x] Create email sending helper (server/email.ts)
- [x] Update formRoutes to send emails via Resend for all 5 form types
- [x] Send formatted emails to matlockhomes@icloud.com
- [x] Write/update tests for email integration (8 tests passing)
- [x] Test and save checkpoint (21/21 tests passing)

## Bug Fix: Google Maps API loaded multiple times
- [x] Fix Google Maps API being included multiple times on homepage

## Phase 13: Phone Number, Call Button, and Services Cleanup
- [x] Change phone number from (727) 485-5996 to (727) 999-1959 across all files
- [x] Fix call button next to "Ready to build your dream home?" to open device dialer (tel: link) — already uses tel: link
- [x] Remove Kitchen/Bathroom Remodeling service page and all references
- [x] Remove Demolition Services page and all references
- [x] Update Services section on homepage to only show Custom Home Building and Home Renovations
- [x] Remove Kitchen/Bathroom Remodeling and Demolition from footer quick links
- [x] Remove Kitchen/Bathroom Remodeling and Demolition from navigation
- [x] Run tests and fix any issues (21/21 passing, zero TS errors)
- [x] Save checkpoint

## Bug Fix: Build-Ready Estates infinite loop
- [x] Fix Maximum call stack size exceeded error on /build-ready-estates page (was HMR race condition during editing; also fixed missed phone number on this page)

## Content Update: Keystone Property
- [x] Remove "Near Tampa International Airport" from Keystone property neighborhood highlights

## Content Update: Live Chat Services
- [x] Update live chat quick replies and AI responses to only reference Custom Home Building and Home Renovations

## Content Update: Homepage Background Video
- [x] Upload new MHCommercial video to S3 and replace homepage hero background video

## Phase 14: Consolidate to Single Service — Custom Home Building
- [x] Remove Home Renovations service page and route
- [x] Remove Home Renovations from navbar dropdown
- [x] Remove Home Renovations from footer quick links
- [x] Remove Renovate or Rebuild calculator component
- [x] Remove renovate-or-rebuild form route from server
- [x] Redesign Services section on homepage for single service (Custom Home Building)
- [x] Update live chat to only reference Custom Home Building
- [x] Update testimonials to reflect custom home building only
- [x] Update pricing tool to remove renovation option
- [x] Update meta tags and structured data
- [x] Update any remaining renovation/rebuild references across site (ContactSection, MobileIntakePopup, formRoutes)
- [x] Run tests and fix any issues (18/18 passing, zero TS errors)
- [x] Save checkpoint

## Visual Edit: ServicePageLayout
- [x] Remove the subtitle pill badge (icon + subtitle text in rounded pill) from ServicePageLayout hero

## Content Update: Custom Home Building Page
- [x] Remove "Transparent Pricing" and "Fully Custom Designs" feature boxes from Custom Home Building page

## Footer Restructure
- [x] Remove "Services" header/section from footer
- [x] Rename "Custom Home Building" to "Custom Homes" and move under Quick Links
- [x] Spread all links into two-column grid layout
- [x] Make "Quick Links" title larger with DM Serif Display font, styled like VersaHomes footer

## Bug: Contact form email not forwarding
- [x] Investigate and fix contact form submissions not being delivered to matlockhomes@icloud.com (was in spam folder, emails sending correctly)

## Email Sender Addresses Update
- [x] Contact form: from websiteinquiry@matlockcustomhomes.com
- [x] Chat transcripts: from WebChat@matlockcustomhomes.com
- [x] Estimator tool: from WebEstimateTool@matlockcustomhomes.com
- [x] Lot feasibility: from WebFeasibilityCheck@matlockcustomhomes.com

## Email Sender Update: Intake Form
- [x] Change intake/estimate form sender from WebEstimateTool to websiteinquiry@matlockcustomhomes.com

## Phase 15: Built-in CRM Dashboard
- [x] Design and create leads database table (name, email, phone, source, status, project type, budget, timeline, message, metadata)
- [x] Design and create lead_notes table for notes/follow-up tracking
- [x] Run database migrations (pnpm db:push)
- [x] Create server-side query helpers for leads CRUD
- [x] Create tRPC procedures for leads (list, getById, updateStatus, addNote, delete)
- [x] Update contact form route to save submission to leads table
- [x] Update Get Started intake form route to save submission to leads table
- [x] Update chat transcript route to save submission to leads table
- [x] Update lot feasibility route to save submission to leads table
- [x] Build CRM dashboard page with lead list table (sortable, filterable)
- [x] Add lead status management (New, Contacted, Qualified, Proposal, Won, Lost)
- [x] Add lead detail view with full submission data and notes
- [x] Add ability to add notes to leads
- [x] Add filtering by source, status, and date range
- [x] Add search functionality across leads
- [x] Protect CRM dashboard with admin role check
- [x] Add CRM link to navigation (admin only) — accessible at /admin/crm, protected by admin role check
- [x] Write vitest tests for CRM procedures (11 tests: list, getById, updateStatus, addNote, stats, filter by source/status, delete, non-admin rejection x3)
- [x] Save checkpoint
## Phase 16: Construction Photos Enhancement & Placement
- [x] Enhance 5 construction photos (brightness, contrast, color balance, sharpness)
- [x] Upload enhanced photos to S3
- [x] Add photos to Custom Home Building service page (hero image + 5-photo gallery section)
- [x] Add photos to Process section on homepage (alternating layout with photos alongside each step)
- [ ] Save checkpoint with photo integration
