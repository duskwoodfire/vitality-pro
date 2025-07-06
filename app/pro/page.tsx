"use client";

import React from "react";

const plans = [
  {
    title: "1 Month",
    price: "₹199",
    benefits: [
      "1 Free Appointment",
      "Free Dental Checkup",
      "Free Medicine Delivery",
    ],
    highlight: false,
  },
  {
    title: "6 Months",
    price: "₹499",
    benefits: [
      "3 Free Appointments",
      "2 Dental Checkups",
      "Free Medicine Delivery",
      "Priority Support",
    ],
    highlight: true,
  },
  {
    title: "1 Year",
    price: "₹1499",
    benefits: [
      "Unlimited Appointments",
      "Quarterly Dental Checkups",
      "24/7 Medicine Delivery",
      "Priority Support",
      "Exclusive Health Tips",
    ],
    highlight: false,
  },
];

export default function ProPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-white text-black font-sans">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-blue-900 drop-shadow-sm">
          Vitality Pro Membership
        </h1>
        <p className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Unlock personalized healthcare services and priority access by
          becoming a Vitality Pro member.
        </p>

        {/* Membership Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative bg-white border-2 rounded-2xl p-8 shadow-md hover:shadow-xl transition text-center flex flex-col items-center ${plan.highlight ? "border-blue-500 scale-105 z-10" : "border-gray-200"}`}
            >
              {plan.highlight && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow">
                  Most Popular
                </span>
              )}
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {plan.title}
              </h2>
              <p className="text-3xl font-extrabold text-blue-700 mb-4">
                {plan.price}
              </p>
              <ul className="text-sm text-gray-700 space-y-2 mb-6 text-left w-full max-w-xs mx-auto">
                {plan.benefits.map((benefit, bidx) => (
                  <li key={bidx} className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                    {benefit}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-2 px-6 rounded-full font-semibold transition text-white ${plan.highlight ? "bg-blue-700 hover:bg-blue-800" : "bg-gray-800 hover:bg-gray-900"}`}
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>

        {/* Membership Form */}
        <div className="rounded-2xl bg-white/60 backdrop-blur-md p-1 shadow-lg">
          <div className="rounded-2xl p-8 bg-white shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">
              Join Vitality Membership
            </h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Full Name"
                className="p-3 rounded-xl bg-white border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="p-3 rounded-xl bg-white border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="p-3 rounded-xl bg-white border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Address"
                className="p-3 rounded-xl bg-white border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select className="p-3 rounded-xl bg-white border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-1 md:col-span-2">
                <option value="">Select Plan</option>
                <option value="1month">1 Month</option>
                <option value="6months">6 Months</option>
                <option value="yearly">Yearly</option>
              </select>
              <button
                type="submit"
                className="col-span-1 md:col-span-2 py-3 px-6 bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold rounded-full hover:opacity-90 transition shadow"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-20 text-center">
          <h3 className="text-xl font-semibold mb-2 text-blue-900">
            Contact Us
          </h3>
          <p className="mb-1 text-black">Phone: +91-8777391047</p>
          <p className="mb-1 text-black">Email: team2025vitality@gmail.com</p>
          <p className="text-black">
            Address: Techno India University,West Bengal,India
          </p>
        </div>
      </div>
    </div>
  );
}
