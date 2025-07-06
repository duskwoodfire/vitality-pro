'use client';

import { useState } from 'react';

export default function BurnoutChecker() {
  const questions = [
    'How often do you feel tired?',
    'How often are you physically exhausted?',
    'How often are you emotionally exhausted?',
    'How often do you feel worn out at the end of the working day?',
    'How often do you feel weak and susceptible to illness?',
    'Do you have enough energy for family and friends during leisure time?',
  ];

  const [responses, setResponses] = useState(Array(questions.length).fill(''));
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (index: number, value: string) => {
    const updated = [...responses];
    updated[index] = value;
    setResponses(updated);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    if (responses.some(r => r === '')) {
      alert('Please answer all questions.');
      return;
    }
    setSubmitted(true);
  };

  const score = responses.reduce((acc, cur) => acc + parseInt(cur), 0);
  const severity =
    score <= 10
      ? 'Low risk of burnout'
      : score <= 20
      ? 'Moderate risk of burnout'
      : 'High risk of burnout';

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-purple-200 via-blue-200 to-purple-100 font-sans text-black">
      <div className="max-w-3xl mx-auto bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/20">
        <h1 className="text-3xl font-bold mb-2 text-center">Burnout Self-Assessment</h1>
        <p className="text-center mb-6">
          Based on the <strong>Copenhagen Burnout Inventory (CBI)</strong>, a <strong>medically validated</strong> tool to assess burnout symptoms.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map((q, index) => (
            <div key={index}>
              <p className="mb-2 font-medium">{index + 1}. {q}</p>
              <div className="flex gap-4">
                {['0', '1', '2', '3'].map((val, i) => (
                  <label key={i} className="flex items-center gap-1">
                    <input
                      type="radio"
                      name={`q${index}`}
                      value={val}
                      checked={responses[index] === val}
                      onChange={() => handleChange(index, val)}
                      className="accent-red-500 cursor-pointer"
                    />
                    {['Never', 'Sometimes', 'Often', 'Always'][i]}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-[#0b3954] text-white px-6 py-2 rounded-full hover:bg-[#12617c] transition"
            >
              Submit
            </button>
          </div>
        </form>

        {submitted && (
          <div className="mt-8 text-center text-xl font-semibold">
            <p className="text-black">Your burnout score: {score}</p>
            <p className="mt-2">{severity}</p>
          </div>
        )}
      </div>
    </div>
  );
}
