# CIDR Visualizer

An interactive and professional web application that visualizes CIDR (Classless Inter-Domain Routing) blocks, showing key IP range details in a user-friendly UI. Ideal for Cloud, DevOps, and Network Engineers.

---

## The Challenge

Planning subnets using CIDR notation can be error-prone and unintuitive, especially when dealing with cloud infrastructure. Engineers often need quick, visual feedback on ranges, usable IPs, and subnet layouts.

---

## The Objective

Build a modern tool that:
- Parses and visualizes any CIDR block
- Shows usable IP range, subnet mask, IP count
- Includes responsive UI with light/dark mode
- Provides subnetting examples for VPC design

---

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Deployment**: Vercel

---

## Live Demo

👉 [cidr-visualiser.vercel.app](https://cidr-visualiser.vercel.app)

---

## Project Structure

```
cidr-visualiser/
├── assets/              # Profile image and branding
├── public/              # Static files
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── page.tsx         # Home (CIDR Input)
│   │   ├── layout.tsx       # Shared layout
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   └── vpc-subnetting/  # Subnetting examples
│   ├── lib/             # Utility logic
│   │   └── cidrUtils.ts
│   └── components/      # (Optional) Reusable components
├── next.config.ts
├── package.json
├── tsconfig.json
├── README.md
```

---

## How to Run Locally

### 1. Clone the Repo

```bash
git clone https://github.com/Here2ServeU/cidr-visualiser.git
cd cidr-visualiser
```

### 2. Install Dependencies

```bash
npm install
npm install @heroicons/react
```

### 3. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## How to Deploy (Vercel)

1. Push your repo to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click **"New Project"**, import your repo
4. Deploy with default settings or add a custom domain

---

## VPC Subnetting Examples

Navigate to the **"VPC Subnetting"** tab to view real-world subnetting plans:

- AWS-style VPC `10.0.0.0/16` with Public/Private subnets
- GCP/Azure examples with logical segmentation
- Each subnet shows CIDR block + Availability Zone

---

## About the Author

**Emmanuel Naweji** – Cloud & DevOps Engineer helping companies build secure, automated infrastructure. Founder of multiple IT upskilling programs.

- Book a consultation](https://here4you.setmore.com)
- [LinkedIn Profile](https://linkedin.com/in/ready2assist)

---

## License

MIT © 2025 Emmanuel Naweji  
Use freely with attribution. No warranties provided.

