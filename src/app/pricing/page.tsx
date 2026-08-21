"use client";

import React from 'react';
import { CheckCircle2, Gem, ShieldCheck, Sparkles, PaintBucket } from 'lucide-react';


const PRICING_DATA = [
  { service: "False Ceiling", basic: "₹75/sq.ft", standard: "₹120/sq.ft", premium: "₹160/sq.ft" },
  { service: "Wallpaper Work", basic: "₹80/sq.ft", standard: "₹120/sq.ft", premium: "₹180/sq.ft" },
  { service: "Wooden Flooring", basic: "₹140/sq.ft", standard: "₹220/sq.ft", premium: "₹350/sq.ft" },
  { service: "Tiles Work", basic: "₹120/sq.ft", standard: "₹180/sq.ft", premium: "₹220/sq.ft" },
  { service: "Furniture & Carpentry", basic: "₹1,400/sq.ft", standard: "₹1,600/sq.ft", premium: "₹2,200/sq.ft" },
  { service: "Modular Kitchen", basic: "₹1.25 Lakh से", standard: "₹1.75 Lakh से", premium: "₹2.50 Lakh से" },
  { service: "PVC Paneling/Ceiling", basic: "₹120/sq.ft", standard: "₹160/sq.ft", premium: "₹220/sq.ft" },
  { service: "Glass Work", basic: "₹450/sq.ft", standard: "₹650/sq.ft", premium: "₹900/sq.ft" },
  { service: "ACP Cladding", basic: "₹250/sq.ft", standard: "₹350/sq.ft", premium: "₹500/sq.ft" },
  { service: "LED / Profile Lighting", basic: "₹250/point", standard: "₹450/point", premium: "₹750/point" },
  { service: "2D & 3D Interior Design", basic: "₹30/sq.ft", standard: "₹50/sq.ft", premium: "₹80/sq.ft" },
  { service: "Renovation Work", basic: "₹800/sq.ft से", standard: "₹1,200/sq.ft से", premium: "₹1,800/sq.ft से" },
  { service: "Electrical & Plumbing", basic: "Included", standard: "Included", premium: "Included" }
];

const PACKAGES = [
  {
    name: "BASIC",
    subtitle: "Budget Friendly",
    icon: <PaintBucket size={32} className="text-white" />,
    color: "bg-gray-800",
    features: [
      "Simple modern design",
      "Standard materials",
      "Basic false ceiling",
      "Basic wallpaper/paint finish",
      "Standard electrical & plumbing coordination",
      "Functional furniture design"
    ]
  },
  {
    name: "STANDARD",
    subtitle: "Modern Luxury",
    icon: <Sparkles size={32} className="text-brand-navy" />,
    color: "bg-brand-yellow",
    recommended: true,
    features: [
      "Better quality materials",
      "Designer false ceiling",
      "Premium wallpaper",
      "Modular furniture",
      "Profile/LED lighting",
      "Modular kitchen",
      "Detailed 2D + 3D design",
      "Better hardware & finishing"
    ]
  },
  {
    name: "PREMIUM",
    subtitle: "Luxury Interior",
    icon: <Gem size={32} className="text-white" />,
    color: "bg-brand-navy",
    features: [
      "Luxury hotel-style design",
      "Premium plywood/veneer/laminate",
      "Designer ceiling & wall paneling",
      "Premium modular kitchen",
      "Premium hardware",
      "Designer lighting",
      "Glass & decorative elements",
      "Detailed 3D visualization",
      "Complete execution & coordination"
    ]
  }
];

export default function PricingPage() {
  return (
    <main className="bg-gray-50 min-h-screen pb-10">

      {/* HEADER */}
      <section className="bg-brand-navy text-white pt-40 pb-32 relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full border-[1px] border-white/5"></div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10 text-center">
          <div className="inline-block px-6 py-2 border border-brand-yellow/30 rounded-full mb-6 backdrop-blur-sm bg-black/20">
            <span className="text-brand-yellow font-bold tracking-widest uppercase text-xs">Transparent Pricing</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 drop-shadow-2xl text-white">
            Investment <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-200">Plans</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Clear, comprehensive, and competitive pricing models tailored to your exact requirements and aesthetic vision.
          </p>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 -mt-16 relative z-20 space-y-24 mb-24">
        
        {/* PACKAGE DETAILS */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white drop-shadow-lg">Package में क्या मिलेगा?</h2>
            <p className="text-brand-yellow font-medium mt-2">What you get in each tier</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PACKAGES.map((pkg, index) => (
              <div 
                key={index} 
                data-cursor-tooltip={pkg.recommended ? "pricing-standard-pkg" : (pkg.name === "BASIC" ? "pricing-basic-pkg" : "pricing-premium-pkg")}
                className={`relative rounded-3xl overflow-hidden cursor-target shadow-2xl transition-transform hover:-translate-y-2 ${pkg.color} ${pkg.recommended ? 'scale-105 md:scale-110 z-10' : ''}`}
              >
                {pkg.recommended && (
                  <div className="absolute top-0 inset-x-0 bg-white/20 text-brand-navy text-center py-2 text-xs font-black tracking-widest uppercase backdrop-blur-md">
                    Most Popular
                  </div>
                )}
                
                <div className={`p-10 ${pkg.recommended ? 'pt-14' : ''}`}>
                  <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6">
                    {pkg.icon}
                  </div>
                  
                  <h3 className={`text-3xl font-black mb-1 ${pkg.recommended ? 'text-brand-navy' : 'text-white'}`}>
                    {pkg.name}
                  </h3>
                  <div className={`text-sm font-bold tracking-widest uppercase mb-8 ${pkg.recommended ? 'text-brand-navy/70' : 'text-brand-yellow'}`}>
                    {pkg.subtitle}
                  </div>
                  
                  <ul className="space-y-4">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle2 size={20} className={`shrink-0 mr-3 mt-0.5 ${pkg.recommended ? 'text-brand-navy' : 'text-brand-yellow'}`} />
                        <span className={`font-medium ${pkg.recommended ? 'text-brand-navy/90' : 'text-gray-300'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-10 pt-8 border-t border-white/10">
                    <button className={`w-full py-4 rounded-full font-black text-sm tracking-widest uppercase transition-colors ${
                      pkg.recommended 
                        ? 'bg-brand-navy text-white hover:bg-gray-900' 
                        : 'bg-brand-yellow text-brand-navy hover:bg-yellow-400'
                    }`}>
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DETAILED PRICING TABLE */}
        <section className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-brand-navy">Detailed Rate Card</h2>
            <p className="text-gray-500 font-medium mt-2">Itemized cost breakdown per square foot & point</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-brand-navy">
                  <th className="p-6 font-black text-brand-navy uppercase tracking-widest text-sm w-1/4">Work / Service</th>
                  <th className="p-6 font-black text-gray-500 uppercase tracking-widest text-sm w-1/4 text-center bg-gray-50 rounded-tl-xl">Basic</th>
                  <th className="p-6 font-black text-brand-navy uppercase tracking-widest text-sm w-1/4 text-center bg-brand-yellow/10 border-x-2 border-brand-yellow">Standard</th>
                  <th className="p-6 font-black text-gray-500 uppercase tracking-widest text-sm w-1/4 text-center bg-gray-50 rounded-tr-xl">Premium</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {PRICING_DATA.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors group">
                    <td className="p-6 font-bold text-brand-navy flex items-center">
                      <div className="w-2 h-2 rounded-full bg-brand-yellow mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      {item.service}
                    </td>
                    <td className="p-6 text-center font-medium text-gray-600 bg-gray-50/50">{item.basic}</td>
                    <td className="p-6 text-center font-black text-brand-navy bg-brand-yellow/5 border-x-2 border-brand-yellow/30">{item.standard}</td>
                    <td className="p-6 text-center font-medium text-gray-600 bg-gray-50/50">{item.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-8 p-6 bg-blue-50 text-blue-800 rounded-2xl flex items-start text-sm font-medium">
            <ShieldCheck size={24} className="shrink-0 mr-4 text-blue-600" />
            <p>
              <strong>Note:</strong> The above rates are indicative and may vary based on specific material choices, brand selections, site conditions, and total volume of work. For a precise quotation tailored to your unique requirements, please book a site consultation.
            </p>
          </div>
        </section>
        
      </div>
      
      {/* CTA */}
      <section className="bg-brand-navy py-24 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready to get an exact estimate?
          </h2>
          <p className="text-gray-400 text-lg font-medium mb-10">
            Our experts will visit your site, understand your vision, and provide a detailed BOQ (Bill of Quantities) with zero hidden charges.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button data-cursor-tooltip="pricing-site-visit" className="w-full sm:w-auto bg-brand-yellow hover:bg-yellow-400 text-brand-navy px-12 py-5 rounded-full font-black text-sm tracking-widest uppercase shadow-2xl transition-transform hover:scale-105 cursor-target">
              Book Free Site Visit
            </button>
            <button data-cursor-tooltip="pricing-pdf" className="w-full sm:w-auto bg-transparent border-2 border-white/20 hover:border-white hover:bg-white/10 text-white px-12 py-5 rounded-full font-black text-sm tracking-widest uppercase transition-all cursor-target">
              Download Pricing PDF
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}
