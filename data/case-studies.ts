import type { CaseStudy } from "@/types/case-study";

export const caseStudies: CaseStudy[] = [
  {
    slug: "children-checkin-checkout",
    title: "Children's Check-In / Check-Out System",
    tagline: "Case Study: Multi-Location Youth Program Platform",
    role: "Solo backend build",
    stack: [
      "NestJS",
      "GraphQL",
      "PostgreSQL",
      "TypeORM",
      "Custom job scheduler",
    ],
    excerpt:
      "This is a QR-code-based check-in and check-out system for a children's program, the process an organization uses to safely sign kids in for a session and verify who's allowed to pick them up afterward. It replaced a paper-based process that had no way to confirm who a child was released to, no live view of which kids were still waiting for pickup, and no safeguard when a staff member forgot to close out a session.",
    sections: [
      {
        heading: "Summary",
        blocks: [
          {
            type: "paragraph",
            text: "This is a QR-code-based check-in and check-out system for a children's program, the process an organization uses to safely sign kids in for a session and verify who's allowed to pick them up afterward. It replaced a paper-based process that had no way to confirm who a child was released to, no live view of which kids were still waiting for pickup, and no safeguard when a staff member forgot to close out a session.",
          },
          {
            type: "paragraph",
            text: "This feature was beyond generating a QR code which is just a few lines of code. The real problem was designing a safety-critical, two-sided handoff, drop-off and pickup, that holds up under real-world pressure: a crowd of guardians hitting the system at once, multiple staff members working in parallel, and the near-certainty that someone, somewhere, will forget a step. This case study is about the decisions that came out of answering that.",
          },
        ],
      },
      {
        heading: "Context",
        blocks: [
          {
            type: "paragraph",
            text: "What the system replaced: a program that looks after children in groups, running paper sign-in sheets across multiple physical locations (\"sites\"). Paper has no way to verify identity at pickup, no live visibility into who's still waiting to be collected, and no recovery path if a staff member simply forgets to mark a child as picked up.",
          },
          {
            type: "paragraph",
            text: "\"Check-in/check-out\" here means: a guardian drops a child off at the start of a session (check-in), and someone, usually the same guardian but not always, returns to collect them afterward (check-out). The system has to confirm the person doing the pickup is actually authorized, without becoming so slow or confusing that stressed guardians and busy staff can't use it.",
          },
          {
            type: "paragraph",
            text: "The hard part is that this runs under real conditions, not ideal ones: a rush of guardians checking in kids at the same time before sessions start, multiple staff working the front desk in parallel, and a system that has to hold up even when nobody's watching closely. Every decision below comes back to that pressure.",
          },
        ],
      },
      {
        heading: "Key Decisions",
        blocks: [
          {
            type: "subheading",
            text: "1. Two-factor checkout, not just a QR re-scan",
          },
          {
            type: "paragraph",
            text: "The obvious design is to scan the same QR code at checkout. I didn't go with that because a QR code is a static image, it can be photographed, and once it's photographed anyone holding that photo could claim the child, since the code itself never changes and isn't tied to a specific pickup event.",
          },
          {
            type: "paragraph",
            text: "Instead, check-in generates two separate things: the QR code, and a random 5-character code (checkinCode) freshly generated for that specific session. Checking a child back out requires both the QR scan and a match on that short code, which has to be relayed to whoever's doing the pickup. For parents or guardians, it's displayed on the authenticated login page for easy reference.",
          },
          {
            type: "subheading",
            text: "2. A second job queue, on purpose",
          },
          {
            type: "paragraph",
            text: "The codebase already had a job queue, BullMQ backed by Redis, for other background work. Reusing it here would've been the path of least resistance.",
          },
          {
            type: "paragraph",
            text: "I didn't. The two scheduled jobs this system needs, a daily sweep that force-closes any check-in left open from a previous day, and a job that flags likely-duplicate guardian records, run on a separate, purpose-built job framework backed directly by Postgres tables (job_queue, job_executions, job_logs).",
          },
          {
            type: "paragraph",
            text: "Reason: for jobs touching child safety data, like automatically force-closing a check-in at 3AM, I wanted every job's full history, what ran, when, what it logged, why it failed, answerable with a plain SQL query against the same database everything else lives in. No separate Redis client, no dashboard tool needed to investigate a support ticket. If something goes wrong with a child's check-in status, \"run one SQL query and get the answer\" beats infrastructure reuse. The existing Redis queue stayed in use for the text-to-speech pipeline, where raw processing speed matters more than a queryable audit trail.",
          },
          {
            type: "subheading",
            text: "3. A hard uniqueness rule on check-in state, with a scheduled escape hatch",
          },
          {
            type: "paragraph",
            text: "The safety rule is simple: a child can't be checked in twice at once. If a staff member tries to check in a child who's already checked in and not yet checked out, the system rejects it outright, no child ends up with two conflicting \"open\" check-in records.",
          },
          {
            type: "paragraph",
            text: "Left alone, that rule creates its own problem. If a staff member forgets to check a child out at the end of a session, that child is locked out of checking in again next time, until someone manually fixes it. A strict safety rule turns a normal human mistake into a recurring point of friction.",
          },
          {
            type: "paragraph",
            text: "So rather than loosen the rule, I added a scheduled cleanup job that only closes out check-ins from a previous calendar day, it's written so it can never touch the current day's active session, only ones that are genuinely abandoned from before. It targets the actual failure, a forgotten checkout, without weakening the safety property that caused it.",
          },
          {
            type: "subheading",
            text: "4. One shared live-updates channel, filtered per viewer, refreshed on every change",
          },
          {
            type: "paragraph",
            text: "Front-desk staff need a live-updating view of which kids are currently waiting to be picked up, without manually refreshing a page. This is built on a GraphQL subscription, a live connection that pushes updates to connected clients as things change, rather than clients repeatedly polling.",
          },
          {
            type: "paragraph",
            text: "Every check-in, checkout, or related action re-fetches the entire current checkout queue and pushes it through one shared channel. Each connected device filters that down to its own site, session, and age group locally, rather than the server trying to route each device only its relevant slice.",
          },
          {
            type: "paragraph",
            text: "A separate channel per site-and-filter combination would send less data per device, but it adds real complexity: more moving parts for routing updates correctly, and more ways a specific client could silently miss an update if the routing logic has a bug. I traded some extra data-on-the-wire and query cost for a simpler guarantee, every connected device is always working from the true, complete current state, filtered locally. Because that makes \"is this checked out\" and \"has this been sent to the guardian\" the most frequently checked conditions in the system, I added database indexes tuned specifically for those two lookups.",
          },
        ],
      },
      {
        heading: "What I Built",
        blocks: [
          {
            type: "list",
            items: [
              "A Checkin database record (Postgres, via TypeORM) with indexes built specifically around the system's busiest queries: by child and status, by checkout and guardian-notification status, by session, and by site.",
              "This sits inside a broader module alongside related records for Children, Guardians, and Alternative Contacts (secondary approved pickup people).",
              "Check-in and checkout actions are exposed as GraphQL mutations, protected by a permission check that allows any authenticated \"staff\" role through by default, and falls back to explicit granted permissions otherwise, with site access enforced on the server, so a staff member at one location can't view or clear another location's queue just by changing an ID in the request.",
              "The live checkout queue described above, delivered via GraphQL subscription.",
              "A daily scheduled job (on the custom job framework) that sweeps and closes stale, abandoned check-ins from prior days.",
              "A separate scheduled job that flags likely-duplicate guardian records using a ranked SQL query, for staff to review.",
              "QR codes are generated on the server as scannable images encoding the child's ID, and immediately converted back into plain text for fast, simple database lookups, so the QR image itself is just a delivery method, not something the system has to decode repeatedly to function.",
            ],
          },
        ],
      },
      {
        heading: "Outcome",
        blocks: [
          {
            type: "list",
            items: [
              "Faster check-in and check-out. No searching a paper sheet for a name or writing anything by hand, check-in is a scan, checkout is a scan plus a code, both close to instant even with a line of guardians waiting.",
              "A simpler process for staff. Staff no longer cross-reference a physical sign-in sheet against who's standing in front of them at pickup, the system tells them directly whether the person collecting a child is authorized to.",
              "Visibility that didn't exist before. The live checkout queue means staff can see, at a glance, exactly which kids are still waiting to be picked up, something that was previously impossible to know without physically counting name tags or asking around.",
              "Data that's queryable instead of locked in paper. Every check-in and checkout is now a structured database record instead of handwriting on a sheet. That made it possible to build a dashboard on top of the same data: attendance by site and session, how often the duplicate-guardian job catches real duplicates, and how many stale checkouts the nightly sweep cleans up, turning data that used to just sit on paper into something staff can actually act on.",
            ],
          },
        ],
      },
    ],
  },

  {
    slug: "devotional-tts",
    title: "Text-to-Speech for Daily Devotionals",
    tagline: "Case Study: Devotional Platform",
    role: "Solo backend build, reviewed by other teammates",
    stack: [
      "NestJS",
      "BullMQ",
      "Redis",
      "ElevenLabs API",
      "Cloudinary",
      "Contentful CMS",
    ],
    excerpt:
      "This is a daily devotional platform, an editor publishes a written devotional for users to read daily. I built the system that automatically turns that text into a spoken-word audio file the moment it's published, with no extra action from the editor.",
    sections: [
      {
        heading: "Summary",
        blocks: [
          {
            type: "paragraph",
            text: "This is a daily devotional platform, an editor publishes a written devotional (like a sermon) for users to read daily. I built the system that automatically turns that text into a spoken-word audio file the moment it's published, with no extra action from the editor.",
          },
          {
            type: "paragraph",
            text: "Converting text to speech is one API call. The actual problem was attaching a slow, third-party-dependent process to a content-publishing system without ever letting it slow that system down, or break it. This case study is about the decisions that came out of solving that.",
          },
        ],
      },
      {
        heading: "Context",
        blocks: [
          {
            type: "paragraph",
            text: "The platform's content lives in Contentful, a \"headless CMS\": basically a database with an editor-friendly writing interface on top, used by non-technical staff to publish content without touching code. When someone publishes a devotional, Contentful can notify other systems automatically via a webhook, a signal that says \"something was just published, here's the data,\" sent as an HTTP request to a URL I control.",
          },
          {
            type: "paragraph",
            text: "The goal was to give users who are disabled, or who just prefer listening, a way to consume the same devotional as audio, without asking content editors to record or upload anything themselves. Publishing the text stays the only step on their end; the audio just shows up.",
          },
          {
            type: "paragraph",
            text: "The catch is that \"call a text-to-speech API\" undersells the problem. Converting text to a spoken audio file (via ElevenLabs, a third-party voice-synthesis service) and hosting that file (via Cloudinary) together can take several seconds, sometimes longer. Too slow to run inside the same request Contentful uses to tell my system \"this was published.\" Do the work directly in that request, and a slow ElevenLabs response could time out or fail the entire publish action from the editor's point of view, over a feature they didn't even ask for in that moment.",
          },
          {
            type: "subheading",
            text: "That put two hard constraints on the design:",
          },
          {
            type: "list",
            items: [
              "The webhook had to return immediately, it couldn't sit and wait for audio generation to finish.",
              "Audio had to be optional infrastructure, not a dependency. If Redis (the queue's backing store), ElevenLabs, or Cloudinary went down or had a bad day, the core app, publishing and reading devotionals, had to keep working normally.",
            ],
          },
        ],
      },
      {
        heading: "Key Decisions",
        blocks: [
          {
            type: "subheading",
            text: "1. Async queue instead of inline generation",
          },
          {
            type: "paragraph",
            text: "Rather than doing the slow work (talking to ElevenLabs and Cloudinary) the moment the webhook arrives, the webhook drops a to-do item onto a queue and immediately replies \"got it.\" A separate background worker picks items off that queue on its own schedule and does the actual work. I used BullMQ, backed by Redis, to manage it.",
          },
          {
            type: "paragraph",
            text: "That means the webhook handler does exactly one fast thing: enqueue a job and return. Synthesis plus upload can take several seconds for a full devotional script, and neither a Contentful webhook nor its retry behavior is something you want to lean on for a job that slow. Putting the work on a worker means retries, backoff, and failure handling are owned by the queue system, not by Contentful's webhook delivery, so a slow or failed audio generation never becomes Contentful's problem, or the editor's.",
          },
          {
            type: "subheading",
            text: "2. Decoupling \"is it done\" from the data it produces",
          },
          {
            type: "paragraph",
            text: "This one came out of a real bug. The first version inferred \"audio already generated\" from whether audioUrl was non-empty, which is fragile, it conflates having a value with having a valid, current one. The moment audioUrl got touched by anything other than the worker, generation would silently stop firing, permanently, with no clean way to force a re-run short of guessing and nulling the field by hand.",
          },
          {
            type: "paragraph",
            text: "I replaced it with an explicit audioGenerated boolean, so \"done\" is its own fact rather than something inferred from a side effect. Small fix, but it turns an implicit state machine into an explicit one and gives you a manual escape hatch, flip the flag, instead of fighting the data.",
          },
          {
            type: "subheading",
            text: "3. Idempotent job identity, and not treating every failure the same",
          },
          {
            type: "paragraph",
            text: "Webhooks aren't perfectly reliable, and Contentful can fire the same \"published\" event twice for a single publish action. That's normal behavior for most webhook systems, not a bug on their end, but left unhandled it means one publish could kick off two separate, redundant audio-generation jobs.",
          },
          {
            type: "paragraph",
            text: "Every job gets a predictable, repeatable ID built from the content entry's own ID (devotional-tts-{entryId}), instead of a random one, which makes the job idempotent: running it twice with the same input has the same effect as running it once. If a duplicate webhook fires, the queue sees a job with that ID already exists and skips creating a second one.",
          },
          {
            type: "paragraph",
            text: "Failure handling got the same scrutiny. If writing the result back to Contentful fails, retrying won't help, that's a permanent problem like bad credentials or a locked entry, so it's marked UnrecoverableError and the job stops immediately rather than burning three retries with exponential backoff against ElevenLabs for nothing. A temporary network blip during synthesis, on the other hand, genuinely might succeed on retry, so it's allowed to retry normally.",
          },
          {
            type: "paragraph",
            text: "I also changed how the system decides whether Redis is usable. It used to just check whether a Redis URL was configured in the environment. I changed it to actually ping Redis and confirm it responds before relying on it, because Redis was self-hosted on our infrastructure (Coolify) and wasn't reliable enough to trust \"a URL is present\" as proof it was actually working.",
          },
        ],
      },
      {
        heading: "What I Built",
        blocks: [
          {
            type: "paragraph",
            text: "Putting it all together, here's the full path a devotional takes from published text to available audio:",
          },
          {
            type: "paragraph",
            text: "Contentful publish webhook (secured with a shared-secret header, so only Contentful can trigger it) → BullMQ queue on Redis → a single background worker that:",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "Pulls the entry via the Management API",
              "Converts rich text and structured fields (dates, scripture ranges, prayer blocks with automatic \"Amen\" handling) into a script meant to be spoken rather than read",
              "Sends it to ElevenLabs (eleven_multilingual_v2)",
              "Uploads the resulting mp3 to Cloudinary (as a video resource type, which is Cloudinary's way of hosting audio)",
              "Writes audioUrl + audioGenerated back to the entry",
            ],
          },
          {
            type: "paragraph",
            text: "All of it lives inside the existing NestJS monolith as a tts + queue module pair, no separate service.",
          },
        ],
      },
      {
        heading: "Outcome",
        blocks: [
          {
            type: "paragraph",
            text: "The qualitative signal since launch is indicative that more users are taking the daily devotional now that audio is available, particularly among users who wouldn't have engaged with the text-only version.",
          },
        ],
      },
    ],
  },
  
];
