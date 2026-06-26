# Team Member Profile Pages

Build dedicated profile pages for each leadership/team member, linked from the About page grid. Mobile-first, premium feel matching the existing dark navy + gold aesthetic.

## Route & Navigation
- New route: `/team/:slug` → `TeamMember.tsx`
- Slug derived from name (e.g., `toba-ooye`)
- About page leadership cards become clickable, navigating to the profile
- Back link to `/about#leadership`

## Data Model
Create `src/data/team.ts` exporting a typed `TeamMember[]` so the owner (with the future backend/CMS) can edit one source of truth. Each member:

```ts
{
  slug, name, role, department,
  headshot, candidShot,           // two-photo hero
  introVideo?,                    // 15s vertical intro (mp4 src or YouTube/Vimeo embed)
  linkedinUrl,
  bio, location, joinedYear,
  timeline: [{ year, title, description }],   // promotion journey
  certifications: [{ name, issuer, year }],
  qa: [{ question, answer }],                 // social-style Q&A bubbles
  mediaTag,                                   // hashtag/ID used to filter company social posts
  mediaFeed: [{                               // curated, managed media
    type: 'image' | 'video',
    src, thumbnail?, caption?, project?
  }]
}
```

Pre-populate the existing 19 leadership names from About.tsx with placeholder timelines/Q&A so every card has a working profile out of the gate.

## Page Sections

**1. Virtual Handshake Hero**
- Split-screen on desktop (50/50), stacked on mobile
- Left: professional headshot with name, role, department, location, LinkedIn icon button (gold hover)
- Right: candid on-site photo with a circular play button overlay; click/tap opens the 15s intro video in a modal (Dialog). On desktop, hover auto-plays muted preview
- Sticky mini-CTA on mobile: "Message on LinkedIn"

**2. About / Bio block**
- Short paragraph, joined year, location, key strengths as gold pill badges

**3. "From the Ground Up" Career Timeline**
- Vertical timeline on mobile, horizontal on desktop (lg+)
- Gold connector line, navy nodes, role title + year + 1-line description per step
- Adjacent "Certifications earned with us" card listing licenses/certs with issuer and year

**4. Social-Style Q&A Callouts**
- Grid of chat-bubble cards (alternating left/right alignment, like iMessage)
- Each card: question in muted bubble, answer in gold-accent bubble
- 4–6 rapid-fire prompts (e.g., "Favorite project so far?", "Tool you can't work without?", "Best on-site lesson?")

**5. Curated Media Feed**
- Tabs: "On the Job" (managed gallery) | "Featured Posts" (company social filtered by `mediaTag`)
- Responsive masonry/grid (2 cols mobile, 3 tablet, 4 desktop)
- Cards show image/video thumb, caption, project tag; video items get a play overlay and open in a lightbox
- For Featured Posts, render as an embedded carousel of company IG/TikTok thumbnails filtered by the member's tag — content is managed in `team.ts` (no third-party API calls in this phase; backend wires real IG/TikTok later)

**6. CTA footer**
- "Work with [Name] on your next project" → links to `/enquiry?team=<slug>`

## Components to add
- `src/pages/TeamMember.tsx`
- `src/components/team/HeroSplit.tsx`
- `src/components/team/IntroVideoDialog.tsx`
- `src/components/team/CareerTimeline.tsx`
- `src/components/team/QABubbles.tsx`
- `src/components/team/MediaFeed.tsx`
- `src/data/team.ts`

## About page changes
- Wrap each leadership card in a `<Link to={`/team/${slug}`}>`
- Keep current layout/visuals intact, just add hover affordance

## Styling
- Reuse existing tokens: `navy-gradient`, `text-gold-gradient`, `bg-card`, `border-gold/10`
- Touch targets ≥ 44px (per project UX standards)
- All images `loading="lazy"`, video `preload="metadata"`

## Out of scope (deferred to backend phase)
- Live Instagram/TikTok API integration — for now `mediaFeed` is editable static data
- CMS admin to edit profiles — will be added with the planned backend (Lovable Cloud)
- Per-member analytics

## Open questions
1. For the intro video, should I use a placeholder `.mp4` slot per member (you upload later), or embed YouTube/Vimeo IDs?
2. For media, confirm "managed gallery only for now" is fine — I won't call Instagram/TikTok APIs in this phase.
3. Do you want profile pages for all 19 leadership members, or just the senior leadership (e.g., CEO + managers) with the rest staying as cards without profiles?
