"use client";

import React from "react";

const quizzes = [
  {
    name: "Anxiety",
    description: "Check your anxiety level with a quick self-assessment.",
    href: "/track/mentalhealth/anxiety",
    emoji: "😰",
  },
  {
    name: "Burnout",
    description: "Find out if you are experiencing burnout symptoms.",
    href: "/track/mentalhealth/burnout",
    emoji: "🔥",
  },
  {
    name: "Depression",
    description: "Assess your risk of depression with a simple quiz.",
    href: "/track/mentalhealth/depression",
    emoji: "😔",
  },
];

export default function MentalHealthMain() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-blue-900">
          Mental Health Self-Check
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Select a quiz to check your mental well-being.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {quizzes.map((quiz) => (
            <a key={quiz.name} href={quiz.href} className="group">
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col items-center border border-gray-100 group-hover:border-blue-400">
                <span className="text-4xl mb-3">{quiz.emoji}</span>
                <h2 className="text-lg font-semibold text-gray-900 text-center group-hover:text-blue-700 mb-2">
                  {quiz.name}
                </h2>
                <p className="text-gray-500 text-center text-sm">
                  {quiz.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
