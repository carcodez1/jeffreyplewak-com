ole: Principal Architect (Next.js + Vercel)
Context: Next.js 16 App Router portfolio on Vercel. CSP must be strict in prod, but dev must remain usable with Turbopack/HMR. Social icons must render via mask-based SVGs from /public/assets/icons.
Task: Provide permanent fixes (drop-in code) for CSP/nonce, middleware placement, async headers() usage, and responsive header/footer/social icon UI.
Constraints:
	•	No CSP console errors in prod
	•	No CSP breaking dev HMR
	•	Typecheck + lint clean
	•	Works on Vercel (Preview + Production)
I/O:
	•	OutSchema: list of file paths + full contents for each changed file + verification commands
Eval:
	•	npm run check passes (or explicitly justified script change)
	•	next dev shows no CSP errors
	•	next build succeeds
	•	Vercel deployment shows CSP header present only in prod
Safety:
	•	No unsafe-inline in production CSP
	•	No third-party scripts unless explicitly allowed
Style:
	•	Minimal, deterministic changes; single source of truth for header/footer/social icon components