"use client";

import React from "react";

export default function PricingPage() {
  return (
    <div className="min-h-screen w-full bg-white text-black font-sans">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Vitality Pro Membership Pricing
        </h1>
        <p className="text-center text-lg text-gray-600 mb-12">
          Choose the plan that fits your needs and unlock premium healthcare
          services.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              title: "1 Month",
              price: "₹199",
              benefits: [
                "1 Free Appointment",
                "Free Dental Checkup",
                "Free Medicine Delivery",
              ],
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
            },
          ].map((plan, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition text-center"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {plan.title}
              </h2>
              <p className="text-2xl font-bold text-blue-600 mb-4">
                {plan.price}
              </p>
              <ul className="text-sm text-gray-700 space-y-2">
                {plan.benefits.map((benefit, bidx) => (
                  <li key={bidx} className="leading-tight">
                    • {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
