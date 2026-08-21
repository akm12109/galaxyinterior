"use client";

import React, { useState } from 'react';
import { Mail, Phone, Send, ArrowRight, AlertCircle } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    website: '' // Honeypot field
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check
    if (formData.website !== '') {
      console.log('Bot detected');
      return;
    }

    // Client-side rate limiting (10 minutes)
    const lastSubTime = localStorage.getItem('last_inquiry_time');
    if (lastSubTime && Date.now() - parseInt(lastSubTime) < 10 * 60 * 1000) {
      alert('You can only submit one inquiry every 10 minutes to prevent spam.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const { website, ...dataToSubmit } = formData;
      await addDoc(collection(db, 'inquiries'), {
        ...dataToSubmit,
        type: 'contact',
        createdAt: serverTimestamp()
      });
      
      localStorage.setItem('last_inquiry_time', Date.now().toString());
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '', website: '' });
      
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-brand-navy pt-24 pb-20 relative overflow-hidden">
      
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-yellow/5 rounded-full blur-[120px] pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-yellow/5 rounded-full blur-[100px] pointer-events-none transform -translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div className="inline-block bg-brand-yellow/10 border border-brand-yellow/20 px-6 py-2 rounded-full mb-6">
            <span className="text-brand-yellow text-xs font-black tracking-[0.3em] uppercase">Get In Touch</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Let&apos;s build your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-200">dream space</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed">
            Have a project in mind? Our expert interior designers and constructors are ready to bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Contact Information */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl h-full flex flex-col justify-between">
              
              <div>
                <h2 className="text-3xl font-black text-white mb-10">Contact Information</h2>
                
                <div className="space-y-8">
                  {/* Primary Phone */}
                  <div className="flex items-start group">
                    <div className="w-14 h-14 rounded-2xl bg-brand-yellow/10 flex items-center justify-center border border-brand-yellow/20 group-hover:bg-brand-yellow group-hover:scale-110 transition-all duration-300 shadow-lg mr-6 flex-shrink-0">
                      <Phone className="w-6 h-6 text-brand-yellow group-hover:text-brand-navy transition-colors" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-2">Primary Phone</p>
                      <a 
                        href="tel:+919631980881" 
                        data-cursor-tooltip="contact-call-btn"
                        className="text-white text-xl md:text-2xl font-bold hover:text-brand-yellow transition-colors cursor-target"
                      >
                        +91 96319 80881
                      </a>
                    </div>
                  </div>

                  {/* Secondary Phone */}
                  <div className="flex items-start group">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-brand-yellow/10 group-hover:border-brand-yellow/30 transition-all duration-300 mr-6 flex-shrink-0">
                      <Phone className="w-6 h-6 text-gray-400 group-hover:text-brand-yellow transition-colors" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-2">Secondary Phone</p>
                      <a 
                        href="tel:+919122795726" 
                        data-cursor-tooltip="contact-call-btn"
                        className="text-white text-lg font-medium hover:text-brand-yellow transition-colors cursor-target"
                      >
                        +91 91227 95726
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start group">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-brand-yellow/10 group-hover:border-brand-yellow/30 transition-all duration-300 mr-6 flex-shrink-0">
                      <Mail className="w-6 h-6 text-gray-400 group-hover:text-brand-yellow transition-colors" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-2">Email Address</p>
                      <a 
                        href="mailto:info@galaxyinteriorindia.com" 
                        data-cursor-tooltip="contact-email-btn"
                        className="text-white text-lg font-medium hover:text-brand-yellow transition-colors cursor-target break-all"
                      >
                        info@galaxyinteriorindia.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-16 pt-10 border-t border-white/10">
                <p className="text-gray-400 text-sm leading-relaxed">
                  Available Mon-Sat, 9:00 AM - 7:00 PM. <br/>
                  Our team strives to respond to all inquiries within 24 hours.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
              <h2 className="text-3xl font-black text-brand-navy mb-2">Send a Message</h2>
              <p className="text-gray-500 mb-10 font-medium">Fill out the form below and we&apos;ll get back to you shortly.</p>
              
              {submitStatus === 'success' && (
                <div className="mb-8 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Send className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="font-bold">Message sent successfully! We&apos;ll be in touch soon.</p>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                  </div>
                  <p className="font-bold">Failed to send message. Please try again later.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-gray-50 border border-gray-200 text-brand-navy px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all font-medium placeholder:text-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-gray-50 border border-gray-200 text-brand-navy px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all font-medium placeholder:text-gray-300"
                    />
                  </div>
                </div>

                {/* Honeypot field - hidden from real users */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-xs font-bold text-gray-400 uppercase tracking-widest">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-gray-50 border border-gray-200 text-brand-navy px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all font-medium placeholder:text-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-bold text-gray-400 uppercase tracking-widest">Your Message</label>
                  <textarea 
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    className="w-full bg-gray-50 border border-gray-200 text-brand-navy px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all font-medium placeholder:text-gray-300 resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  data-cursor-tooltip="contact-submit-btn"
                  className="w-full bg-brand-navy hover:bg-brand-navy/90 text-white font-black text-sm tracking-widest uppercase py-5 rounded-xl transition-all shadow-xl shadow-brand-navy/20 cursor-target flex items-center justify-center group disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Send Message
                      <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
