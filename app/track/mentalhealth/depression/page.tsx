"use client";
import { useState } from "react";

const questions = [
  "Little interest or pleasure in doing things?",
  "Feeling down, depressed, or hopeless?",
  "Trouble falling or staying asleep, or sleeping too much?",
  "Feeling tired or having little energy?",
  "Poor appetite or overeating?",
  "Feeling bad about yourself — or that you are a failure or have let yourself or your family down?",
  "Trouble concentrating on things, such as reading or watching TV?",
  "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual?",
  "Thoughts that you would be better off dead or of hurting yourself in some way?",
];

const options = [
  "Not at all",
  "Several days",
  "More than half the days",
  "Nearly every day",
];

export default function DepressionQuiz() {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (idx: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [idx]: value }));
  };

  const handleSubmit = () => {
    const score = Object.values(answers).reduce(
      (acc, val) => acc + options.indexOf(val),
      0
    );
    let level = "Minimal Depression";
    if (score >= 20) level = "Severe Depression";
    else if (score >= 15) level = "Moderately Severe Depression";
    else if (score >= 10) level = "Moderate Depression";
    else if (score >= 5) level = "Mild Depression";
    setResult(`${level} (Score: ${score})`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center py-10 px-2">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2 text-center">
          Depression Self-Assessment
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Over the last 2 weeks, how often have you been bothered by the
          following problems?
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="space-y-6 mb-8">
            {questions.map((q, idx) => (
              <div key={idx} className="bg-blue-50 rounded-xl p-4">
                <div className="font-medium text-gray-800 mb-3">{q}</div>
                <div className="flex flex-col gap-2">
                  {options.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`q${idx}`}
                        value={opt}
                        checked={answers[idx] === opt}
                        onChange={() => handleAnswer(idx, opt)}
                        className="accent-blue-600 h-4 w-4"
                        required={idx === 0}
                      />
                      <span className="text-gray-700 text-sm">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-700 to-blue-400 text-white font-semibold rounded-full hover:opacity-90 transition mb-4"
          >
            Check My Depression Level
          </button>
        </form>
        {result && (
          <div
            className={`rounded-xl p-5 text-center font-semibold text-lg mt-2
            ${
              result.includes("Severe")
                ? "bg-red-100 text-red-700"
                : result.includes("Moderate")
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-700"
            }`}
          >
            {result}
          </div>
        )}
      </div>
    </div>
  );
}
