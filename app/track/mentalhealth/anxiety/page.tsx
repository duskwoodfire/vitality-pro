"use client";
import { useState } from "react";

const questions = [
  "Feeling nervous, anxious, or on edge?",
  "Not being able to stop or control worrying?",
  "Worrying too much about different things?",
  "Trouble relaxing?",
  "Being so restless that it is hard to sit still?",
  "Becoming easily annoyed or irritable?",
  "Feeling afraid as if something awful might happen?",
];

const options = [
  "Not at all",
  "Several days",
  "More than half the days",
  "Nearly every day",
];

export default function AnxietyQuiz() {
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
    let level = "Minimal Anxiety";
    if (score >= 15) level = "Severe Anxiety";
    else if (score >= 10) level = "Moderate Anxiety";
    else if (score >= 5) level = "Mild Anxiety";
    setResult(`${level} (Score: ${score})`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center py-10 px-2">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2 text-center">
          Anxiety Self-Assessment
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
            Check My Anxiety Level
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
