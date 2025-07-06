"use client";
import { useState } from "react";

const questions = [
  "Do you experience chest pain or discomfort?",
  "Do you often feel shortness of breath?",
  "Do you feel fatigue during physical activity?",
  "Do you have a fast or irregular heartbeat?",
  "Do you feel pain in the arms, neck, jaw, or back?",
  "Do you feel dizziness or lightheadedness?",
  "Do you experience nausea with physical effort?",
  "Have you been diagnosed with high blood pressure?",
  "Do you have high cholesterol levels?",
  "Do you have a family history of heart disease?",
];

const options = ["Yes", "No", "Don't Know"];

export default function CADForm() {
  const [form, setForm] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    symptoms: {} as Record<number, string>,
  });
  const [result, setResult] = useState<string | null>(null);

  const handleSymptomChange = (idx: number, value: string) => {
    setForm((prev) => ({
      ...prev,
      symptoms: { ...prev.symptoms, [idx]: value },
    }));
  };

  const handleInputChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckRisk = () => {
    const yesCount = Object.values(form.symptoms).filter(
      (v) => v === "Yes"
    ).length;
    const riskPercent = Math.round((yesCount / questions.length) * 100);
    let level = "Low Risk";
    if (riskPercent >= 70) level = "High Risk";
    else if (riskPercent >= 40) level = "Moderate Risk";
    setResult(`${level} — ${riskPercent}% chance based on symptoms`);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 text-black font-sans">
      <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-lg p-8 space-y-8">
        <h1 className="text-3xl font-bold text-center">
          Coronary Artery Disease Symptom Checker
        </h1>
        <p className="text-center text-gray-600">
          Answer the following questions to assess your risk for Coronary Artery
          Disease. This tool provides an early risk indication and is not a
          diagnosis.
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
          {questions.map((q, idx) => (
            <div
              key={q}
              className="p-4 bg-white/70 border border-gray-200 rounded-xl shadow-sm space-y-2"
            >
              <div className="font-medium">{q}</div>
              <div className="flex gap-6">
                {options.map((opt) => (
                  <label key={opt} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`q${idx}`}
                      value={opt}
                      checked={form.symptoms[idx] === opt}
                      onChange={() => handleSymptomChange(idx, opt)}
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
          <div className="text-center text-lg font-semibold text-black mt-4">
            Result: {result}
          </div>
        )}
      </div>
    </div>
  );
}
