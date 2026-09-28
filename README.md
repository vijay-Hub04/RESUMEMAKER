# CareerAI — AI-Powered Resume ATS Checker & Job Platform

A modern, responsive SaaS frontend application for analyzing resume ATS compatibility, tracking user growth metrics, and providing smart career workflows.

## 🚀 Included Pages

* **Dashboard (`/`)**
  * Hero section with platform value propositions
  * Key performance statistics cards
  * **Application User Growth** interactive bar chart (Recharts)
  * Drag-and-drop resume upload section with general ATS checking
* **Login (`/login`)**
  * Form validation, password visibility toggle, remember me, and 1-Click Demo Login
* **Register (`/register`)**
  * Full name, email, password, password confirmation, and terms agreement validation

## 🛠️ Tech Stack

* **Core:** React 19, Vite, JavaScript
* **Routing:** React Router v7
* **State Management:** Redux Toolkit & React-Redux
* **Styling:** Tailwind CSS, PostCSS, Autoprefixer
* **UI & Animations:** Framer Motion, Lucide React
* **Charts:** Recharts
* **Notifications:** React Hot Toast
* **HTTP:** Axios instance with interceptors

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vijay-Hub04/RESUMEMAKER.git
   cd RESUMEMAKER
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 🎨 Features & Highlights

* **Light/Dark Mode:** Seamless theme switching with animated Sun/Moon toggle and `localStorage` persistence.
* **Responsive Design:** Mobile-first layout with smooth collapsible drawer navigation.
* **Component Architecture:** Modular common components (`Button`, `Input`, `Loader`, `Modal`, `ThemeToggle`).
