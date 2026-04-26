# 🌌 BVM Labs (Trimurti UI)

BVM Labs is a Next.js application built with a deeply conceptual **Trimurti UI** design system. It embodies the cycle of creation, preservation, and transformation through interactive 3D visuals and a carefully curated aesthetic.

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + Vanilla CSS (CSS Variables for themes)
- **Animation:** GSAP, Framer Motion, Lenis (Smooth Scrolling)
- **3D Graphics:** React Three Fiber, Drei, Three.js
- **Typography:** Custom fonts via `next/font`

## 🎨 Design Philosophy

**Theme:** Brahma (Create) · Vishnu (Sustain) · Mahesh (Transform)
> "Quiet confidence. Not noise."

The design follows strict principles:
- **Clarity > Decoration**
- **Consistency > Creativity**
- **Spacious layouts & minimal clutter**
- Motion with restraint (slow fades, ease-out curves)
- A highly disciplined color system mapped to the Trimurti concept.

For more details on the design language, refer to `design.md`.

---

## 💻 Local Development

First, install the dependencies:

```bash
npm install
```

Then, run the development server (runs on port `3100` by default):

```bash
npm run dev
```

Open [http://localhost:3100](http://localhost:3100) with your browser to see the result.

---

## 🚀 Production Deployment (EC2 + PM2 + Nginx)

This project is configured to generate a **Next.js standalone build** to minimize the production footprint, and it uses **PM2 in cluster mode** to maximize CPU utilization.

### 1. Build the Project

Run the custom production build command. This compiles the Next.js app and copies the necessary static assets (`public` and `.next/static`) into the standalone directory.

```bash
npm ci
npm run build:prod
```

### 2. Start the App with PM2

We use `ecosystem.config.cjs` to define the PM2 configuration.

```bash
# Create a logs directory if it doesn't exist
mkdir -p logs

# Start the application using PM2
pm2 start ecosystem.config.cjs

# Save the PM2 process list so it restarts automatically on server reboot
pm2 save
```

The application will now be running locally on **port `3100`**.

### 3. Expose via Nginx (Reverse Proxy)

To expose the application to the internet, set up an Nginx reverse proxy. Add the following location block to your Nginx configuration (e.g., `/etc/nginx/sites-available/default`):

```nginx
server {
    listen 80;
    server_name yourdomain.com; # Replace with your domain or IP

    # Route traffic to the PM2 service on port 3100
    location / {
        proxy_pass http://127.0.0.1:3100;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Aggressively cache Next.js static assets
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3100;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }
}
```

Test and reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Updating in Production

To update the live application with zero downtime:

```bash
git pull origin main
npm ci
npm run build:prod
pm2 reload bvm-app
```
