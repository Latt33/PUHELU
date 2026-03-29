Deployment notes — set env vars and publish

1) Commit & push your changes

```bash
git add -A
git commit -m "Expose API prefix and use VITE_API_PREFIX in frontend"
git push origin master
```

2) Frontend (Vercel) environment variables — required
-- `VITE_API_URL` = https://puhelu-production.up.railway.app
-- `VITE_API_PREFIX` = /api/v1

Note: the backend listens on port `8080` in production. Railway will forward traffic to the container port configured by the `PORT` environment variable. If you're testing locally with Docker Compose, the compose mapping now exposes `8080:8080`.

Notes: Vite reads `VITE_` variables at build time — changing them requires a redeploy/rebuild.

3) Backend (Railway) environment variables — recommended
- `CORS_ORIGINS` = https://<your-frontend-domain> (comma-separated if multiple)

4) How to set env vars
- Vercel: Project → Settings → Environment Variables → Add `VITE_API_URL` and `VITE_API_PREFIX` for the Production environment, then Redeploy.
- Railway: Service → Environment → Add `CORS_ORIGINS` (and any other secrets), then Redeploy.

5) Quick verification
- Browser DevTools Network: confirm Request URL is `https://<railway-host>/api/v1/analyze-patient` and that request returns 200/400/500 as expected (not 404).
- Server logs: look for `[REQ] POST /api/v1/analyze-patient` printed by the backend logging middleware.
- curl test:
```bash
curl -i https://puhelu-production.up.railway.app/api/v1/health
```

If you'd like, I can commit this file for you and then guide you through adding the variables in the Vercel UI.
