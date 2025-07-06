"use client";
import Image from "next/image";
import Link from "next/link";

export default function DiagnosisMainPage() {
  const diseases = [
    {
      name: "Type 2 Diabetes",
      img: "/images/diabetes.jpeg",
      href: "/track/diagnosis/diabetes2",
    },
    {
      name: "Coronary Artery Disease",
      img: "/images/cadimg.jpg",
      href: "/track/diagnosis/cad",
    },
    {
      name: "Tuberculosis",
      img: "/images/tbimg.jpg",
      href: "/track/diagnosis/tb",
    },
    {
      name: "Polycystic Ovary Syndrome",
      img: "/images/pcosimg.jpg",
      href: "/track/diagnosis/pcos",
    },
    {
      name: "Chronic Kidney Disease (CKD)",
      img: "/images/kidney.jpg",
      href: "/track/diagnosis/ckd",
    },
    {
      name: "Hypothyroidism",
      img: "/images/thyroid.jpg",
      href: "/track/diagnosis/thyroid",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-blue-900">
          Disease Risk Self-Assessment
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Select a condition to check your risk based on symptoms.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {diseases.map((disease) => (
            <Link key={disease.name} href={disease.href} className="group">
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 flex flex-col items-center border border-gray-100 group-hover:border-blue-400">
                <div className="w-28 h-28 relative mb-4">
                  <Image
                    src={disease.img}
                    alt={disease.name}
                    fill
                    className="object-cover rounded-xl border border-gray-200"
                  />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 text-center group-hover:text-blue-700">
                  {disease.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
