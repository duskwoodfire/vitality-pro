'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function MentalHealth() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen w-full px-6 py-12 bg-gradient-to-br from-[#cce9e4] via-[#e4f2ff] to-[#e0f7fa] font-sans text-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#084c61] drop-shadow-lg">
          Mental Health Matters
        </h1>
        <p className="text-lg md:text-xl mb-10 text-gray-700 font-medium">
          Your mental well-being is important. This section offers supportive resources and confidential conversations for burnout, anxiety, and depression. Talk to our AI assistant below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto my-10">
        {[
          {
            title: 'Burnout Checker',
            desc: 'Feeling drained or mentally exhausted? Take a quick self-assessment.',
            href: '/mentalhealth/burnout',
          },
          {
            title: 'Depression Checker',
            desc: 'Identify early signs of depression with our guided symptom checker.',
            href: '/mentalhealth/depression',
          },
          {
            title: 'Anxiety Checker',
            desc: 'Assess your anxiety symptoms and receive supportive insights.',
            href: '/mentalhealth/anxiety',
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="p-6 bg-white/30 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl transition text-center border border-white/20"
          >
            <h2 className="text-2xl font-semibold text-[#0b3954] mb-3">{item.title}</h2>
            <p className="text-gray-700 mb-4">{item.desc}</p>
            <Link href={item.href}>
              <button className="px-4 py-2 bg-[#0b3954] text-white rounded-full hover:bg-[#12617c] transition">
                Start
              </button>
            </Link>
          </div>
        ))}
      </div>

      <p className="text-sm text-center text-gray-600 mt-10">
        Note: The AI assistant is not a replacement for professional help. For severe or urgent concerns, please reach out to a certified mental health professional.
      </p>

      <div className="max-w-4xl mx-auto mt-16 text-center">
        <h2 className="text-2xl font-bold text-[#084c61] mb-4">Emergency Mental Health Support – India</h2>
        <p className="text-gray-700 mb-2">If you or someone you know is in crisis or needs immediate help, please reach out to the following helplines:</p>
        <ul className="text-left text-gray-800 text-sm leading-relaxed mt-4 space-y-2 bg-white/40 p-6 rounded-2xl shadow border border-white/20 backdrop-blur-md">
          <li><strong>iCall (TISS):</strong> +91 9152987821 (Available 24/7)</li>
          <li><strong>Vandrevala Foundation Helpline:</strong> 1860 266 2345 / 9999 666 555</li>
          <li><strong>Sumaitri (Delhi):</strong> +91 11 23389090 (2 PM – 10 PM)</li>
          <li><strong>AASRA (Mumbai):</strong> +91 9820466726 (Available 24/7)</li>
          <li><strong>Samaritans Mumbai:</strong> +91 8422984528 / 29 / 30 (5 PM – 8 PM)</li>
          <li><strong>iHelp (Mental Health India Foundation):</strong> +91 9480872079</li>
        </ul>
        <p className="mt-4 text-xs text-gray-600">
          These helplines are confidential and run by trained professionals or volunteers. Don’t hesitate to reach out.
        </p>
      </div>

      {/* Floating Dialogflow Messenger Chatbot */}
      <div
        dangerouslySetInnerHTML={{
          __html: `
            <df-messenger
              chat-icon="/chatboticon.jpg"
              intent="WELCOME"
              chat-title="vitalitybot"
              agent-id="8aa5c668-069b-4ec7-9899-4112302c97b4"
              language-code="en">
            </df-messenger>
          `,
        }}
      />
    </div>
  );
}
