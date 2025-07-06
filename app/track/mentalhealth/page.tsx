"use client";

import React from "react";

const quizzes = [
  {
    name: "Anxiety",
    description: "Check your anxiety level with a quick self-assessment.",
    href: "/track/mentalhealth/anxiety",
    emoji: "😰",
    subheading: "GAD-7: Trusted anxiety screening tool.",
  },
  {
    name: "Burnout",
    description: "Find out if you are experiencing burnout symptoms.",
    href: "/track/mentalhealth/burnout",
    emoji: "🔥",
    subheading: "CBI: Reliable burnout assessment.",
  },
  {
    name: "Depression",
    description: "Assess your risk of depression with a simple quiz.",
    href: "/track/mentalhealth/depression",
    emoji: "😔",
    subheading: "PHQ-9: Standard depression check.",
  },
];

export default function MentalHealthMain() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 px-6 py-16 flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-3 text-blue-900 drop-shadow-sm">
            Mental Health Self-Check
          </h1>
          <p className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Select a quiz to check your mental well-being.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quizzes.map((quiz) => (
              <a key={quiz.name} href={quiz.href} className="group">
                <div className="relative bg-white/80 rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 flex flex-col items-center border border-gray-100 group-hover:border-blue-500 h-full min-h-[320px]">
                  <span className="text-5xl mb-4 drop-shadow-sm">
                    {quiz.emoji}
                  </span>
                  <h2 className="text-xl font-semibold text-gray-900 text-center group-hover:text-blue-700 mb-2">
                    {quiz.name}
                  </h2>
                  <p className="text-gray-500 text-center text-base mb-3">
                    {quiz.description}
                  </p>
                  <div className="w-full flex-1 flex items-end">
                    <p className="text-xs text-blue-700 text-center font-semibold bg-blue-50 rounded-lg px-3 py-2 w-full tracking-wide shadow-sm">
                      {quiz.subheading}
                    </p>
                  </div>
                  <span className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 text-xs font-semibold bg-blue-100 px-2 py-1 rounded-full shadow">
                    Start
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <EmergencyMentalHealthSupport />
    </>
  );
}

// Emergency Mental Health Support Section (placed under the page)
function EmergencyMentalHealthSupport() {
  return (
    <div className="max-w-3xl mx-auto mt-24 flex flex-col items-center">
      <div className="w-full bg-white/90 border border-blue-100/60 rounded-2xl shadow-2xl backdrop-blur-lg px-0 md:px-0">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-0 md:gap-8 p-0 md:p-0">
          <div className="w-full p-8 md:p-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-block text-3xl align-middle bg-blue-100 rounded-full p-2 shadow-sm">
                🆘
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#084c61] tracking-tight">
                Emergency Mental Health Support – India
              </h2>
            </div>
            <p className="text-gray-700 mb-3 text-base md:text-lg text-left md:text-start">
              If you or someone you know is in crisis or needs immediate help,
              please reach out to the following helplines:
            </p>
            <ul className="text-left text-gray-800 text-sm md:text-base leading-relaxed mt-4 space-y-2 bg-gradient-to-br from-blue-50/60 via-white/80 to-blue-100/60 p-6 rounded-xl shadow border border-blue-100/40 backdrop-blur-md mx-auto max-w-2xl">
              <li>
                <span className="font-semibold text-blue-900">
                  iCall (TISS):
                </span>{" "}
                <span className="font-mono">+91 9152987821</span>{" "}
                <span className="text-xs text-blue-700 ml-1">(24/7)</span>
              </li>
              <li>
                <span className="font-semibold text-blue-900">
                  Vandrevala Foundation Helpline:
                </span>{" "}
                <span className="font-mono">1860 266 2345</span> /{" "}
                <span className="font-mono">9999 666 555</span>
              </li>
              <li>
                <span className="font-semibold text-blue-900">
                  Sumaitri (Delhi):
                </span>{" "}
                <span className="font-mono">+91 11 23389090</span>{" "}
                <span className="text-xs text-blue-700 ml-1">
                  (2 PM – 10 PM)
                </span>
              </li>
              <li>
                <span className="font-semibold text-blue-900">
                  AASRA (Mumbai):
                </span>{" "}
                <span className="font-mono">+91 9820466726</span>{" "}
                <span className="text-xs text-blue-700 ml-1">(24/7)</span>
              </li>
              <li>
                <span className="font-semibold text-blue-900">
                  Samaritans Mumbai:
                </span>{" "}
                <span className="font-mono">+91 8422984528 / 29 / 30</span>{" "}
                <span className="text-xs text-blue-700 ml-1">
                  (5 PM – 8 PM)
                </span>
              </li>
              <li>
                <span className="font-semibold text-blue-900">
                  iHelp (Mental Health India Foundation):
                </span>{" "}
                <span className="font-mono">+91 9480872079</span>
              </li>
            </ul>
            <p className="mt-6 text-xs text-gray-500 text-left md:text-start italic">
              These helplines are confidential and run by trained professionals
              or volunteers. Don’t hesitate to reach out.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
