# Demo validation - v0.1.2 / release review revision 3

Reviewed 13 October 2026. Evidence below is Codi's observed local checking, not independent certification, an exhaustive security audit or real troop acceptance. Runtime version remains v0.1.2.

## Checks observed in this review

- Nine Node rule/server tests passed on Windows Node 24.19.0: programme validation, stock/attendance/review rules, budget arithmetic, event preparation dates, storage/export restoration, damaged-data handling, static-server headers and route/method restrictions.
- A freshly extracted final review ZIP also passed all nine tests on Windows Node 22.17.1 and the limited package checker. Exact entry hashes and archive integrity checked against the separate manifest.
- Windows Chrome: initial fictional overview; invalid 121-minute total rejected; corrected programme saved/reloaded; meeting timer counted down and paused; saved block position and explicitly saved handover notes survived reload.
- Attendance/review: fresh blank attendance disabled all four review buttons; a present sample's review saved; changing the reviewed sample to absent rejected. No official award produced.
- Stock: unknown count remained blank, then explicit zero with a fictional count note saved as counted.
- Calendar: fictional event produced a preparation date two months earlier; checklist completion toggled.
- Budget: estimate R140 while actuals stayed unknown; entered income R150 minus costs R45 produced actual surplus R105.
- Activity search filtered to the memory sample; import changed block two's title while the valid total stayed 120 minutes.
- Actual browser export downloaded fictional JSON. Model restoration preserved the tested programme, attendance, review, zero stock, completed event task and saved notes. Reset cancellation preserved records; confirmed reset plus reload returned the starting state.
- All eleven views rendered at compact in-app browser width 349 pixels without page horizontal overflow (document width 334 pixels). This is compact desktop-browser evidence, not a physical phone test.
- Fresh Chrome desktop and normal compact screenshots inspected and included. No relevant captured app warning/error logs or framework overlays observed on tested surfaces.

## Evidence limits

Full-page/enlarged screenshot capture was unreliable and excluded. Normal viewport screenshots were captured through the supported observation API. A stale browser helper was bypassed with documented accessibility controls; a download-event timeout was resolved by verifying the actual saved JSON file. Tool failures are not counted as app failures or successful captures.

Public-code scope/name/credential checks are limited, not a full security audit. Private terms were used in memory and are not shipped. The local review source had no Git history or remote. Public release starts fresh demo-only history; its exact tracked files and Raiden/noreply commit metadata are checked before upload.

Physical phones, print-dialog output, non-Windows browser use, public-host headers, sponsor onboarding, accessibility conformance, long-running use and real troop outcomes remain unverified. GitHub CI covers Node tests and the limited package checker on Linux; inspect the repository Actions history for each result. It does not verify browser behaviour. Save form edits before navigation; timer countdown restarts on re-render. Export files remain after browser-local reset.

## Public release preparation — 13 October 2026

The owner approved MIT and publication of this fictional package. Release preparation adds `LICENSE`, updates licence/status copy and refreshes screenshots. Model, workflow handlers, server and tests are unchanged. The exact 21-file ZIP is extracted separately and checked on Windows Node 22 and 24. Licence/support copy is checked in the browser. Current CI evidence is available in GitHub Actions; package hashes are separate release assets.
