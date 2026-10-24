
# ParetoAI

ParetoAI is a React and Vite study-planning app for students preparing for entrance exams. It includes a saved student profile, routine planner, topic progress checklist, analytics, focus timer, and optional local Ollama tutoring.

## Run locally

```sh
npm install
npm run dev
```

## Local Gemma topic helper

The topic checklist can use Ollama's local `gemma3:1b` model to explain topics and generate quizzes. Prompts are sent to Ollama on this computer at `http://localhost:11434`; this feature does not use a hosted AI service.

1. Install Ollama and download the model with `ollama pull gemma3:1b`.
2. Start Ollama, then start this app with `npm run dev`.
3. If the browser blocks the request with a CORS error, allow the app's origin in Ollama. For the default Vite address in Windows PowerShell, run `setx OLLAMA_ORIGINS "http://localhost:5173"` and restart Ollama. If the app uses another address, use that exact origin instead.
4. Open the topic checklist and select **Explain this topic** or **Generate a quiz**.

## Exam syllabus and video links

The checklist is a study aid and is not automatically synchronized with exam syllabi. Use the official exam-site link in the checklist to verify topics for your attempt year. YouTube buttons search for lessons using the selected exam, year, subject, and topic instead of linking to fixed video IDs.

Attempt-year options only include upcoming years, based on the typical month shown for each exam. Confirm actual dates on the official exam site.

Gemma can suggest an attempt year from the available future options and rank topics already in the selected checklist subject using the student's study hours and saved progress. These are local AI planning suggestions, not official exam dates or syllabus verification.
