'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { db } from '../../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import TargetCursor from '@/components/TargetCursor';

const SLIDER_IMAGES = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000"
];

const PARTNER_LOGOS = [
  "/partner_logos/Century_Plyboards.svg.png",
  "/partner_logos/Greenply_logo.svg.png",
  "/partner_logos/Havells_Logo.svg.png",
  "/partner_logos/Panasonic_logo.svg.png",
  "/partner_logos/Pidilite_logo.svg.png",
  "/partner_logos/Ultratech_Cement_Logo.svg.png",
  "/partner_logos/godrej.png",
  "/partner_logos/kajaria.png",
  "/partner_logos/skydecor.png",
  "/partner_logos/somany.png"
];

const FURNITURE_ITEMS = [
  { title: "Luxury Velvet Sofa", type: "Luxury", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600" },
  { title: "Marble Dining Table", type: "Grand", img: "https://images.unsplash.com/photo-1617806118233-18e1c0955534?auto=format&fit=crop&q=80&w=600" },
  { title: "Designer King Bed", type: "Modern", img: "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=600" },
  { title: "Sleek Glass Wardrobe", type: "Chic", img: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=600" }
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Furniture filter state
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Reviews state
  const [reviews, setReviews] = useState([{
    id: "mock1",
    name: "Rahul Singhania",
    location: "Ranchi",
    review: "Galaxy Interior transformed our bare plot into a modern masterpiece. The attention to detail and itemised transparency was unmatched.",
    rating: 5
  }]);

  // Form state
  const [reviewName, setReviewName] = useState("");
  const [reviewLocation, setReviewLocation] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch reviews from Firebase
  useEffect(() => {
    const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedReviews = [];
      querySnapshot.forEach((doc) => {
        fetchedReviews.push({ id: doc.id, ...doc.data() });
      });
      if (fetchedReviews.length > 0) {
        setReviews(fetchedReviews);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewLocation || !reviewText) return;
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "reviews"), {
        name: reviewName,
        location: reviewLocation,
        review: reviewText,
        rating: reviewRating,
        createdAt: serverTimestamp()
      });
      setReviewName("");
      setReviewLocation("");
      setReviewText("");
      setReviewRating(5);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDER_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main>
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
        targetSelector="button, a, .cursor-target"
      />
    <div className="relative w-full min-h-[calc(100vh-8rem)] flex items-center mt-[-2rem]">
      
      {/* Background Slider */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {SLIDER_IMAGES.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={src} 
              alt="Background" 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-12 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Side: Headlines and Stats */}
        <div className="w-full lg:w-3/5 flex flex-col items-start pt-10">
          
          <h1 className="text-5xl md:text-[5.5rem] font-black text-brand-yellow leading-[1.1] tracking-tight mb-2 drop-shadow-lg">
            Construct Your <br />
            Dream Home
          </h1>
          
          <div className="bg-brand-navy px-6 py-3 inline-block mt-4 rounded-sm shadow-xl">
            <span className="text-white text-3xl md:text-5xl font-black">
              with GALAXY INTERIOR
            </span>
          </div>
          
          <div className="bg-brand-navy/80 backdrop-blur-md px-6 py-5 mt-8 rounded-md border border-white/10 max-w-2xl shadow-xl">
            <p className="text-white text-lg font-medium leading-relaxed">
              Turning ideas into <span className="font-black text-brand-yellow">concrete reality</span> with itemised BOQ and zero hidden costs.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mt-10">
            <button className="bg-brand-yellow hover:bg-yellow-400 text-brand-navy px-10 py-4 rounded-full text-lg font-black tracking-wide shadow-lg transition-colors cursor-target">
              Pricing
            </button>
            <button className="bg-transparent hover:bg-white/10 text-white border-2 border-white px-8 py-4 rounded-full text-lg font-bold tracking-wide transition-colors cursor-target">
              Explore Packages
            </button>
          </div>
          
          <div className="bg-brand-navy/80 backdrop-blur-md px-8 py-6 mt-16 rounded-xl border border-white/10 flex flex-wrap gap-10 shadow-xl">
            <div>
              <div className="text-brand-yellow text-4xl font-black mb-1">8+</div>
              <div className="text-white text-xs font-bold tracking-widest uppercase">Years Experience</div>
            </div>
            <div>
              <div className="text-brand-yellow text-4xl font-black mb-1">120+</div>
              <div className="text-white text-xs font-bold tracking-widest uppercase">Homes Built</div>
            </div>
            <div>
              <div className="text-brand-yellow text-4xl font-black mb-1">20+</div>
              <div className="text-white text-xs font-bold tracking-widest uppercase">Expert Team</div>
            </div>
          </div>

        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/3 max-w-md shrink-0">
          <div className="bg-white rounded-2xl p-8 shadow-2xl relative overflow-hidden">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-yellow"></div>
            
            <h3 className="text-2xl font-black text-brand-navy mb-8 text-center">
              Talk to Our Expert
            </h3>
            
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input 
                  type="text" 
                  placeholder="Name" 
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 focus:border-brand-yellow transition-colors placeholder:text-gray-400"
                />
              </div>
              
              <div className="flex border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-brand-yellow/50 focus-within:border-brand-yellow transition-colors bg-white">
                <div className="bg-gray-50 px-4 py-3 border-r border-gray-300 flex items-center text-sm font-medium text-gray-600">
                  IN +91
                </div>
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  className="w-full px-4 py-3 text-sm focus:outline-none placeholder:text-gray-400"
                />
              </div>
              
              <div className="relative">
                <select defaultValue="" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 focus:border-brand-yellow transition-colors appearance-none bg-white text-gray-600">
                  <option value="" disabled>Location of your Plot - City*</option>
                  <option value="godda">Godda</option>
                  <option value="ranchi">Ranchi</option>
                  <option value="patna">Patna</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                  <ChevronDown size={16} />
                </div>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-brand-yellow hover:bg-yellow-400 text-brand-navy font-black text-lg py-4 rounded-lg mt-4 transition-colors shadow-md cursor-target"
              >
                Book Free Consultation
              </button>
            </form>
            
            <p className="text-[10px] text-gray-400 text-center mt-6 leading-tight">
              By submitting, you agree to our <a href="#" className="text-brand-yellow hover:underline">privacy policy</a>, allowing us to use your information as outlined.
            </p>
          </div>
        </div>

      </div>
    </div>


    {/* Expertise Section */}
    <section className="py-24 bg-white text-brand-navy">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h4 className="text-brand-yellow text-sm font-bold tracking-widest uppercase mb-4">Expertise</h4>
            <h2 className="text-4xl md:text-5xl font-black">Bespoke Solutions</h2>
            <p className="text-gray-600 max-w-xl mt-6 font-medium text-lg leading-relaxed">
              We offer a 360-degree approach to architecture and interiors, ensuring quality and luxury at every step of your home building.
            </p>
          </div>
          <div className="hidden md:block">
             <div className="text-gray-500 text-sm tracking-widest uppercase font-bold flex items-center">
               <span className="w-12 h-px bg-brand-yellow mr-4"></span>
               Swipe to explore
               <span className="w-12 h-px bg-brand-yellow ml-4"></span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Architectural Plan", desc: "Modern architectural & structural blueprints for your dream home." },
            { title: "2D Floor Plan", desc: "Detailed 2D floor plans ensuring solid foundations and accurate mapping." },
            { title: "3D Design", desc: "Immersive 3D visualization to preview your interior and exterior." },
            { title: "Interior Projects", desc: "Bespoke custom interiors crafted to fit your lifestyle and taste." },
            { title: "Construction", desc: "Full-service construction execution with high-quality materials." },
            { title: "Modular Kitchen", desc: "Smart, highly efficient & elegant kitchen solutions for modern homes." }
          ].map((service, index) => (
            <div key={index} className="bg-gray-50 p-10 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-yellow/50 transition-all group cursor-pointer">
              <h3 className="text-brand-navy text-2xl font-black mb-4 group-hover:text-brand-yellow transition-colors">{service.title}</h3>
              <p className="text-gray-500 font-medium mb-8 leading-relaxed h-16">{service.desc}</p>
              <button className="text-brand-yellow text-sm font-bold tracking-widest uppercase flex items-center group-hover:underline underline-offset-4">
                EXPLORE <ChevronDown className="ml-2 -rotate-90 w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Collections Section */}
    <section className="py-24 bg-brand-gray-light">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-16">
          <h4 className="text-brand-yellow text-sm font-bold tracking-widest uppercase mb-4">Collections</h4>
          <h2 className="text-4xl md:text-5xl font-black text-brand-navy mb-6">Premium Furniture</h2>
          <p className="text-brand-gray font-medium max-w-2xl mx-auto text-lg">
            From ergonomic office setups to luxurious home comfort, we provide bespoke furniture that defines your living space.
          </p>
        </div>

        {/* Categories */}
        <div className="flex justify-center space-x-4 mb-12 flex-wrap gap-y-4">
          {["All", "Luxury", "Grand", "Modern", "Chic"].map((cat) => (
            <button 
              key={cat} 
              onClick={() => setSelectedCategory(cat)}
              className={`px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-all shadow-sm ${selectedCategory === cat ? 'bg-brand-navy text-brand-yellow' : 'bg-white text-brand-navy hover:bg-gray-100 border border-gray-200'}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {FURNITURE_ITEMS.filter(item => selectedCategory === "All" || item.type === selectedCategory).map((item, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 group">
              <div className="h-64 overflow-hidden relative bg-gray-200">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-brand-yellow text-brand-navy text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-widest">
                  Premium
                </div>
              </div>
              <div className="p-6">
                <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">{item.type}</div>
                <h3 className="text-xl font-black text-brand-navy mb-6">{item.title}</h3>
                <button className="w-full border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white font-bold text-xs tracking-widest uppercase py-3 rounded-lg transition-colors">
                  Enquire Now
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <button className="bg-brand-yellow hover:bg-yellow-400 text-brand-navy px-12 py-5 rounded-full font-black text-sm tracking-widest uppercase shadow-lg transition-colors">
            GET CUSTOM FURNITURE
          </button>
        </div>
      </div>
    </section>

    {/* Client Voices */}
    <section className="py-24 bg-brand-navy relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#101e38] skew-x-[-15deg] transform origin-bottom hidden lg:block"></div>
      
      <div className="relative max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div className="text-white pr-0 lg:pr-12">
          <h4 className="text-brand-yellow text-sm font-bold tracking-widest uppercase mb-4">Client Voices</h4>
          <h2 className="text-4xl md:text-6xl font-black leading-tight mb-8">What Our<br/>Clients Say</h2>
          <p className="text-gray-400 text-xl font-medium leading-relaxed mb-12 max-w-md">
            Real testimonials from elite home owners and corporate directors across Jharkhand, Bihar, and beyond.
          </p>
          
          {/* Real Testimonial from Firebase */}
          {reviews.length > 0 && (
            <div className="bg-[#162442] p-8 rounded-2xl border-l-4 border-brand-yellow shadow-2xl relative transition-all">
              <div className="text-brand-yellow text-4xl font-serif absolute top-4 right-6 opacity-30">"</div>
              <p className="text-gray-300 italic mb-6">"{reviews[0].review}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-600 rounded-full mr-4 flex items-center justify-center font-bold text-white">
                  {reviews[0].name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-bold text-white">{reviews[0].name}</h4>
                  <p className="text-brand-yellow text-xs tracking-widest uppercase font-bold">{reviews[0].location}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white p-10 rounded-3xl shadow-2xl z-10 relative">
          <h3 className="text-3xl font-black text-brand-navy mb-8">Share Your Experience</h3>
          
          <form className="space-y-6" onSubmit={handleSubmitReview}>
            <div>
              <input type="text" value={reviewName} onChange={e => setReviewName(e.target.value)} required placeholder="Your Name" className="w-full border-b-2 border-gray-200 px-0 py-4 focus:outline-none focus:border-brand-yellow transition-colors bg-transparent font-medium placeholder:font-normal" />
            </div>
            
            <div className="relative">
              <select value={reviewLocation} onChange={e => setReviewLocation(e.target.value)} required className="w-full border-b-2 border-gray-200 px-0 py-4 focus:outline-none focus:border-brand-yellow transition-colors bg-transparent appearance-none font-medium text-gray-700">
                <option value="" disabled>Select Location</option>
                <option>Ranchi</option>
                <option>Godda</option>
                <option>Bhagalpur</option>
                <option>Banka</option>
                <option>Deoghar</option>
                <option>Hazaribagh</option>
                <option>Dumka</option>
                <option>Kishanganj</option>
                <option>Purnea</option>
                <option>Kolkata</option>
                <option>Patna</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none text-gray-400">
                <ChevronDown size={20} />
              </div>
            </div>
            
            <div className="flex items-center space-x-2 pt-4">
               <span className="text-gray-500 mr-4 font-medium">Your Rating:</span>
               {[1,2,3,4,5].map(star => (
                 <svg key={star} onClick={() => setReviewRating(star)} className={`w-8 h-8 ${star <= reviewRating ? 'text-brand-yellow' : 'text-gray-300'} fill-current cursor-pointer hover:scale-110 transition-transform`} viewBox="0 0 24 24">
                   <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                 </svg>
               ))}
            </div>
            
            <div className="pt-4">
              <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} required placeholder="Write your review..." rows={4} className="w-full border-2 border-gray-200 rounded-xl p-4 focus:outline-none focus:border-brand-yellow transition-colors font-medium resize-none"></textarea>
            </div>
            
            <button type="submit" disabled={isSubmitting} className="w-full bg-brand-navy hover:bg-[#162442] text-white font-black text-lg py-5 rounded-xl transition-colors shadow-lg disabled:opacity-50">
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-32 bg-brand-yellow relative overflow-hidden">
      {/* Abstract bg pattern */}
      <div className="absolute inset-0 opacity-10 flex items-center justify-center">
         <div className="w-[800px] h-[800px] border-[100px] border-brand-navy rounded-full absolute"></div>
      </div>
      
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <h4 className="text-brand-navy text-sm font-bold tracking-[0.3em] uppercase mb-6">READY TO BUILD?</h4>
        <h2 className="text-5xl md:text-7xl font-black text-brand-navy leading-none mb-12">
          Let's craft your perfect space together.
        </h2>
        
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button className="w-full sm:w-auto bg-brand-navy hover:bg-[#162442] text-white px-12 py-5 rounded-full font-black text-sm tracking-widest uppercase shadow-2xl transition-transform hover:scale-105 cursor-target">
            ENQUIRE NOW
          </button>
          <button className="w-full sm:w-auto bg-transparent hover:bg-white/30 text-brand-navy border-2 border-brand-navy px-12 py-5 rounded-full font-black text-sm tracking-widest uppercase transition-colors cursor-target">
            VIEW PROJECTS
          </button>
        </div>
      </div>
    </section>

    {/* Trusted Partners */}
    <section className="py-16 bg-brand-gray-light text-center border-b border-gray-200 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <h4 className="text-sm font-bold tracking-widest text-brand-navy uppercase mb-2">Our Trusted Partners</h4>
        <p className="text-brand-gray font-medium mb-10">Winning collaborations that produce winning designs.</p>
        
        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden flex items-center h-24 mask-image-gradient">
          <div className="flex animate-marquee gap-16 md:gap-32 min-w-max items-center">
            {/* Render logos multiple times for seamless infinite scroll */}
            {[...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS].map((src, index) => (
              <img 
                key={index} 
                src={src} 
                alt="Partner Logo" 
                className="h-12 md:h-16 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            ))}
          </div>
        </div>
      </div>
    </section>

    </main>
  );
}
