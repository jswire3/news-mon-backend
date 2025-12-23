# News Monitor Backend

Email alerting backend for the news monitoring system.

## Setup

1. Deploy to Vercel
2. Add environment variables:
   - `SENDGRID_API_KEY` - Your SendGrid API key
   - `SENDER_EMAIL` - Your verified sender email

## Endpoint

POST /api/send-alert

Body:
{
  "email": "recipient@example.com",
  "topic": "Topic name",
  "count": 10,
  "articles": [...]
}
```

Click "Commit new file"

---

**3. Deploy to Vercel**

Now that all files are in GitHub:

1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import your `news-monitor-backend` repository
4. Click "Deploy"
5. After deployment, go to Settings → Environment Variables
6. Add:
   - `SENDGRID_API_KEY` = (your SendGrid key)
   - `SENDER_EMAIL` = (your verified email)
7. Go to Deployments → Redeploy

**4. Get Your URL**

Your backend URL will be:
```
https://news-monitor-backend-YOUR-USERNAME.vercel.app/api/send-alert
```

Copy this and paste it in the monitoring app!

---

## Still Getting 404?

If you still see 404 after following these exact steps:

1. Check your GitHub repo - does it look like this?
```
news-monitor-backend/
├── api/
│   └── send-alert.js
├── package.json
├── vercel.json
└── README.md
