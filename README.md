# Premium Developer Portfolio: Rajuri Likhitha

A world-class, premium, modern personal portfolio website built for **Rajuri Likhitha**, a Computer Science and Engineering student at **Ramaiah Institute of Technology** (GPA: 8.78), specializing in Deep Learning and Core Systems.

This portfolio is designed to immediately capture the attention of recruiters from top-tier tech firms (Google, Microsoft, Meta, OpenAI, etc.) and high-growth startups, balancing minimalist elegance with interactive polish.

---

## 🌟 Visual & Interactive Features

- **Dark Mode by Default**: Sleek dark aesthetics with high-contrast glowing indigo, violet, and emerald accents. Features a smooth theme toggle for Light Mode.
- **Intro Loader Screen**: A premium entrance sequence displaying a stylized loading counter and name reveal.
- **Dual-Ring Custom Cursor**: Smooth, spring-physics mouse pointer that expands and morphs over buttons, links, and cards. (Automatically disabled on touch screens for native usability).
- **Interactive Canvas Network**: An HTML5 particle network that gravitates away from the cursor and draws connections dynamically.
- **Command Palette (`Ctrl + K`)**: Instant access to section links, theme controls, copying contact emails, and downloading resumes via a terminal-like HUD.
- **GitHub Analytics Dashboard**: Integrated client-side REST checks that fetch real-time repository statistics, followers, stars, and language breakdowns, featuring a high-fidelity mock fallback cache to prevent rate-limiting/offline errors.
- **Projects Case Study Modals**: Deep-dive modals explaining the **Challenge**, **Approach**, **Architecture Workflow**, and **Key Metrics** for SafeUpload, HelixDB, and Plant Disease Detection.
- **Contact Form Confetti Burst**: Submission validations combined with an explosive success burst using `canvas-confetti`.

---

## 🛠️ Tech Stack

- **Core Framework**: [Next.js 15+ (App Router)](https://nextjs.org/)
- **Programming Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Interactive Effects**: [Canvas Confetti](https://github.com/catdad/canvas-confetti)

---

## 🚀 Getting Started

### 1. Pre-requisites
Ensure you have [Node.js (v18+)](https://nodejs.org/) installed on your machine.

### 2. Installation
Clone or navigate to the project directory and install the required dependencies:
```bash
npm install
```

### 3. Running Development Server
Start the local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the portfolio.

### 4. Build for Production
To build a highly optimized static bundle:
```bash
npm run build
```
You can preview the built production app locally using:
```bash
npm run start
```

---

## ⚙️ Customization Guide

### How to replace the Resume PDF:
Simply drop your official PDF file into the `public/` directory and name it `resume.pdf`. The download links and command palette actions are already configured to target this location:
`public/resume.pdf`

### How to update GitHub configurations:
The dashboard fetches data for the user `likhitharajuri03`. To use a different username, open [src/components/GitHubDashboard.tsx](file:///c:/Users/likhi/Downloads/Portfolio/src/components/GitHubDashboard.tsx) and update:
1. The `fallbackData` object.
2. The fetch calls in `useEffect`:
   ```typescript
   const profileRes = await fetch("https://api.github.com/users/YOUR_USERNAME");
   const reposRes = await fetch("https://api.github.com/users/YOUR_USERNAME/repos?sort=updated");
   ```

---

## ☁️ Deployment on Vercel

The portfolio is fully optimized for one-click deployment on [Vercel](https://vercel.com/):

1. Push your code repository to GitHub/GitLab.
2. Log in to Vercel and click **New Project**.
3. Select this repository.
4. Keep the default settings (Next.js preset) and click **Deploy**.
5. Vercel will automatically compile, optimize, and serve your portfolio on a global CDN.
