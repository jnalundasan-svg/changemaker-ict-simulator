# ChangeMaker: ICT for Social Impact Simulator

An AI-powered assessment platform for Senior High School students taking **Empowerment Technologies** (DepEd K to 12 Curriculum).

ChangeMaker evaluates authentic application of knowledge—moving beyond rote memorization to assess how learners diagnose community problems, evaluate digital information, design ICT interventions, create advocacy media, practice digital citizenship, and reflect on technology's role in positive social transformation.

---

## 🌟 Key Features

- **Philippine-Localized Advocacy Scenarios**:
  - Covers 10 distinct community issues (Cyberbullying, Online Misinformation, Plastic Waste Pollution, Disaster Preparedness, Mental Health Awareness, Internet Addiction, Copyright & Fair Use, Environmental Conservation, Animal Welfare, and Youth Volunteer Mobilization).
  - Authentic Philippine contexts (e.g., Laguna, Marikina, Caloocan, Montalban/Rizal, Batangas, Tondo, Angono, Quezon City, and Iloilo).
- **6 Authentic Assessment Phases (100-Point Rubric)**:
  1. *Phase 1: Problem Analysis* (15 pts) – Core issues, stakeholders, and long-term societal risks.
  2. *Phase 2: Online Research Skills* (20 pts) – Evaluating credible vs. questionable sources, spotting red flags, and designing verification protocols.
  3. *Phase 3: ICT Solution Design* (20 pts) – Platform selection, audience profiling (digital literacy, device availability), and measurable outcomes.
  4. *Phase 4: Content Creation Challenge* (15 pts) – Campaign slogans, social media posts, calls-to-action, hashtags, and infographic captions with live mockup preview.
  5. *Phase 5: Digital Ethics Simulation* (20 pts) – Resolving real-world dilemmas under Philippine laws (RA 10173, RA 8293, RA 10627, DepEd DO 40, s. 2012).
  6. *Phase 6: Reflection Essay* (10 pts) – 150–250 word synthesis on responsible ICT with live word tracking.
- **Automated Scoring & DepEd Rating Scale**:
  - Automatically calculates raw scores, percentage, and performance levels:
    - **90–100**: Outstanding
    - **85–89**: Very Satisfactory
    - **80–84**: Satisfactory
    - **75–79**: Fairly Satisfactory
    - **Below 75**: Needs Improvement
- **AI Community Adviser Feedback**:
  - Leverages Google Gemini (`@google/genai`) to produce qualitative commendations, growth pointers, and community guidance.
- **Certificate of Social Impact**:
  - Generates a printable DepEd-style achievement certificate complete with breakdown and performance marks.
- **Password-Protected Teacher Dashboard**:
  - Default password: `changemaker2026`
  - Class analytics, score distributions, passing rate metrics, and individual portfolio inspection.
  - CSV exports (standard CSV and Excel-compatible format with UTF-8 BOM).
  - Record management (delete single record, clear class section, or reset database).
- **Session Autosave**:
  - LocalStorage persistence with timestamp indicators and toast notifications so students never lose progress on page refresh.

---

## 🚀 Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide React, Motion
- **Backend / Server**: Node.js, Express, `tsx`
- **AI Integration**: `@google/genai` (Gemini 3.8 Flash)
- **Build Tool**: Vite 8

---

## 🛠️ Getting Started Locally

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (version 18+ recommended)
- npm or yarn

### 2. Clone the Repository
```bash
git clone https://github.com/<your-username>/changemaker-ict-simulator.git
cd changemaker-ict-simulator
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Add your Google Gemini API key:
```env
GEMINI_API_KEY="your-gemini-api-key-here"
```
*(Note: If no API key is provided, the simulator gracefully falls back to built-in rubric-calibrated feedback.)*

### 5. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 6. Build for Production
```bash
npm run build
npm start
```

---

## 🔒 Security & Privacy

- Sensitive data such as `.env` and API keys are ignored by `.gitignore`.
- Student records are stored locally in the browser (`localStorage`) and never transmitted to third parties other than the server-side proxy route for AI feedback evaluation.

---

## 📜 License

Distributed under the Apache 2.0 License.
