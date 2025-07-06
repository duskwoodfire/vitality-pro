'use client';

import { useState } from 'react';

export default function AnxietyChecker() {
  const questions = [
    'Feeling nervous, anxious, or on edge?',
    'Not being able to stop or control worrying?',
    'Worrying too much about different things?',
    'Trouble relaxing?',
    'Being so restless that it is hard to sit still?',
    'Becoming easily annoyed or irritable?',
    'Feeling afraid as if something awful might happen?',
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
    score <= 4
      ? 'Minimal anxiety'
      : score <= 9
      ? 'Mild anxiety'
      : score <= 14
      ? 'Moderate anxiety'
      : 'Severe anxiety';

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-purple-200 via-blue-200 to-purple-100 font-sans text-black">
      <div className="max-w-3xl mx-auto bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/20">
        <h1 className="text-3xl font-bold mb-2 text-center">Anxiety Self-Assessment</h1>
        <p className="text-center mb-6">
          Based on the <strong>GAD-7 (Generalized Anxiety Disorder-7)</strong>, a <strong>medically validated</strong> tool to assess anxiety symptoms.
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
                    {['Not at all', 'Several days', 'More than half the days', 'Nearly every day'][i]}
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
            <p className="text-black">Your anxiety score: {score}</p>
            <p className="mt-2">{severity}</p>
          </div>
        )}
      </div>
    </div>
  );
}
