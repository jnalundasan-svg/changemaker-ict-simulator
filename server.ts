import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'ChangeMaker ICT Simulator API' });
});

// AI Evaluation endpoint for authentic assessment feedback
app.post('/api/evaluate', async (req, res) => {
  try {
    const { studentName, scenario, responses, calculatedScores } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // If no key is set, return a structured fallback response gracefully
      return res.json({
        success: true,
        usingFallback: true,
        facilitatorNotes: generateCurriculumFeedback(responses, calculatedScores),
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const prompt = `You are a Senior High School Empowerment Technologies Assessment Facilitator and Community ICT Adviser in the Philippines.
Evaluate the following student's advocacy project responses for the simulation.

Student: ${studentName || 'Student'}
Advocacy Issue: ${scenario?.title || 'Community Advocacy'}
Community Context: ${scenario?.location || 'Philippine Community'}
Scenario Overview: ${scenario?.description || 'Advocacy simulation'}

Scores already calculated according to DepEd rubric:
- Problem Analysis: ${calculatedScores?.problemAnalysis || 0} / 15
- Online Research Skills: ${calculatedScores?.researchSkills || 0} / 20
- ICT Solution Design: ${calculatedScores?.solutionDesign || 0} / 20
- Content Creation: ${calculatedScores?.contentCreation || 0} / 15
- Digital Ethics & Citizenship: ${calculatedScores?.ethics || 0} / 20
- Reflection: ${calculatedScores?.reflection || 0} / 10
Total Score: ${calculatedScores?.total || 0} / 100

Student Submissions:
[Phase 1 Problem Analysis]
Main Issue: ${responses?.phase1?.mainIssue || 'N/A'}
Stakeholders: ${responses?.phase1?.stakeholders || 'N/A'}
Consequences if Unresolved: ${responses?.phase1?.consequences || 'N/A'}

[Phase 2 Research Skills]
Credible vs Questionable selection & evaluation:
${JSON.stringify(responses?.phase2?.evaluations || {})}
Verification Recommendations: ${responses?.phase2?.verificationMethods || 'N/A'}

[Phase 3 ICT Solution Design]
Platform Chosen: ${responses?.phase3?.platform || 'N/A'}
Platform Justification: ${responses?.phase3?.justification || 'N/A'}
Target Audience Profile: ${responses?.phase3?.audience || 'N/A'}
Expected Outcomes: ${responses?.phase3?.outcomes || 'N/A'}

[Phase 4 Content Creation]
Slogan: ${responses?.phase4?.slogan || 'N/A'}
Social Media Post: ${responses?.phase4?.post || 'N/A'}
Call to Action: ${responses?.phase4?.cta || 'N/A'}
Hashtags: ${responses?.phase4?.hashtags || 'N/A'}
Infographic Caption: ${responses?.phase4?.caption || 'N/A'}

[Phase 5 Digital Ethics Dilemmas]
Decisions and Justifications:
${JSON.stringify(responses?.phase5?.dilemmas || {})}

[Phase 6 Reflection]
Reflection Essay:
${responses?.phase6?.essay || 'N/A'}

Please write a warm, encouraging, yet academically rigorous assessment evaluation (180-260 words).
Structure your feedback with:
1. Executive Commendation: Acknowledge the student's strongest ICT advocacy strengths and digital citizenship mindset.
2. Constructive Growth Pointer: One specific Empowerment Technologies area to deepen (e.g. lateral research verification, media accessibility, fair use, or metrics tracking).
3. Community Adviser Word of Encouragement: Inspiring closing about youth leadership and ICT for Philippine social change.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    const aiFeedback = response.text || generateCurriculumFeedback(responses, calculatedScores);

    res.json({
      success: true,
      usingFallback: false,
      facilitatorNotes: aiFeedback,
    });
  } catch (error: any) {
    console.error('Error generating AI evaluation:', error);
    // Fallback gracefully on any API error
    const fallbackNotes = generateCurriculumFeedback(req.body?.responses, req.body?.calculatedScores);
    res.json({
      success: true,
      usingFallback: true,
      facilitatorNotes: fallbackNotes,
    });
  }
});

function generateCurriculumFeedback(responses: any, calculatedScores: any): string {
  const total = calculatedScores?.total || 80;
  const issue = responses?.phase3?.platform || 'selected platform';

  if (total >= 90) {
    return `Commendation: Outstanding digital advocacy project! You demonstrated a comprehensive grasp of ICT as a platform for social change, aligning your ${issue} with the needs of your local stakeholders. Your research source analysis and ethical decision-making regarding data privacy and copyright reflect exemplary digital citizenship.

Growth Pointer: Consider exploring quantitative key performance indicators (KPIs) such as organic reach, conversion rates, and community offline action tracking to gauge tangible advocacy impact over a 6-month campaign cycle.

Adviser Closing: Mabuhay ang kabataang lider! You have proven that technology in the hands of informed and empathetic youth is a powerful engine for authentic community transformation. Keep championing responsible digital citizenship!`;
  } else if (total >= 80) {
    return `Commendation: Very good performance in applying Empowerment Technologies principles to your advocacy scenario. Your problem analysis accurately identified the critical community challenges, and your proposed ${issue} demonstrates practical audience awareness and engaging messaging.

Growth Pointer: Strengthen your lateral reading and verification strategies when analyzing online sources. In digital ethics, continue reinforcing the boundaries established by the Data Privacy Act (RA 10173) and intellectual property fair use guidelines.

Adviser Closing: Keep harnessing your digital skills to amplify voices in your community. With purposeful planning and strict ethical responsibility, your advocacy initiatives will inspire real community mobilization!`;
  } else {
    return `Commendation: Good initial effort in framing an ICT solution for community advocacy. Your core message shows genuine empathy for the stakeholders affected by this issue.

Growth Pointer: To maximize your campaign's social impact, focus on audience profiling (evaluating device access and digital literacy in Philippine communities) and ensure that every claim is verified through reliable, accredited sources before publication.

Adviser Closing: Social change begins with awareness and deliberate action. Review your digital ethics and verification frameworks, and continue refining your skills as an ethical digital change maker!`;
  }
}

// Dev vs Production static handling
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`ChangeMaker Server running at http://0.0.0.0:${port}`);
  });
}

startServer();
