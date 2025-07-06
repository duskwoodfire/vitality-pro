"use client";
import { useState } from "react";

const symptoms = [
  "Fatigue or tiredness",
  "Weight gain without changes in diet",
  "Cold intolerance",
  "Dry skin",
  "Depression or mood changes",
  "Constipation",
  "Puffy face",
  "Hoarseness",
  "Slow heart rate",
  "Thinning hair or hair loss",
  "Memory problems or difficulty concentrating (brain fog)",
  "Irregular or heavy menstrual periods",
];

export default function HypothyroidismChecker() {
  const [form, setForm] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    symptoms: {} as Record<string, string>,
  });
  const [result, setResult] = useState<string | null>(null);

  const handleSymptomChange = (symptom: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      symptoms: { ...prev.symptoms, [symptom]: value },
    }));
  };

  const handleInputChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckRisk = () => {
    const score = Object.values(form.symptoms).filter(
      (v) => v === "yes"
    ).length;
    const percent = Math.round((score / symptoms.length) * 100);
    let message = "Low Risk";
    if (percent >= 70) message = "High Risk";
    else if (percent >= 40) message = "Moderate Risk";
    setResult(`${message} — ${percent}% symptoms matched`);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 text-black font-sans">
      <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-lg p-8 space-y-8">
        <h1 className="text-3xl font-bold text-center">
          Hypothyroidism Symptom Checker
        </h1>
        <p className="text-center text-gray-600">
          Answer the following questions to assess your risk for Hypothyroidism.
          This tool provides an early risk indication and is not a diagnosis.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            placeholder="Age"
            value={form.age}
            onChange={(e) => handleInputChange("age", e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            type="number"
          />
          <div>
            <select
              value={form.gender}
              onChange={(e) => handleInputChange("gender", e.target.value)}
              className="p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white text-gray-700"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <input
            placeholder="Weight (kg)"
            value={form.weight}
            onChange={(e) => handleInputChange("weight", e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            type="number"
          />
          <input
            placeholder="Height (cm)"
            value={form.height}
            onChange={(e) => handleInputChange("height", e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            type="number"
          />
        </div>

        <div className="space-y-4">
          {symptoms.map((symptom) => (
            <div
              key={symptom}
              className="p-4 bg-white/70 border border-gray-200 rounded-xl shadow-sm space-y-2"
            >
              <div className="font-medium">{symptom}</div>
              <div className="flex gap-6">
                {["yes", "no", "don't know"].map((opt) => (
                  <label key={opt} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={symptom}
                      value={opt}
                      checked={form.symptoms[symptom] === opt}
                      onChange={() => handleSymptomChange(symptom, opt)}
                      className="accent-red-500"
                    />
                    <span className="capitalize">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleCheckRisk}
          className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
        >
          Check Risk
        </button>

        {result && (
          <div className="text-center text-lg font-semibold text-black">
            Result: {result}
          </div>
        )}
      </div>
    </div>
  );
}
