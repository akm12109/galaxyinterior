"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Phone, LayoutGrid, ChevronDown, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { Logo } from '@/components/ui/Logo';

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getLinkStyle = (path: string) => {
    // Basic match or starts with for services
    const isActive = path === '/' ? pathname === '/' : pathname.startsWith(path);
    
    if (isActive) {
      return "bg-brand-yellow/20 text-brand-yellow px-4 py-2 rounded-full border border-brand-yellow/30 h-max flex items-center";
    }
    return "hover:text-brand-yellow transition-colors h-full flex items-center px-4";
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-white/5 backdrop-blur-md">
      {/* Top Bar */}
      <div className="bg-brand-navy text-white/80 text-[10px] font-medium tracking-widest uppercase py-2 hidden md:block">
        <div className="max-w-[1400px] mx-auto px-6 flex justify-end items-center">
          <div className="flex space-x-3 items-center">
            <span>GODDA</span>
            <span className="text-brand-yellow/50">|</span>
            <span>RANCHI</span>
            <span className="text-brand-yellow/50">|</span>
            <span>BHAGALPUR</span>
            <span className="text-brand-yellow/50">|</span>
            <span>BANKA</span>
            <span className="text-brand-yellow/50">|</span>
            <span>DEOGHAR</span>
            <span className="text-brand-yellow/50">|</span>
            <span>HAZARIBAGH</span>
            <span className="text-brand-yellow/50">|</span>
            <span>DUMKA</span>
            <span className="text-brand-yellow/50">|</span>
            <span>KISHANGANJ</span>
            <span className="text-brand-yellow/50">|</span>
            <span>PURNEA</span>
            <span className="text-brand-yellow/50">|</span>
            <span>KOLKATA</span>
            <span className="text-brand-yellow/50">|</span>
            <span>PATNA</span>
            
            <a href="tel:+919631980881" className="flex items-center text-brand-yellow ml-8 hover:text-white transition-colors">
              <Phone size={12} className="mr-2" />
              +91 96319 80881
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="bg-[#6b768a] text-white">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo overlapping space */}
          <div className="w-64 h-full relative">
            <div className="absolute top-[-40px] left-[-24px] bg-[#0b162c] border-r-4 border-b-4 border-[#1c2c4d] p-6 pr-8 rounded-br-2xl shadow-xl flex flex-col items-center justify-center h-28 w-64">
               <Link href="/" className="w-full h-full flex items-center justify-center">
                 <Logo className="scale-90" />
               </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-4 text-xs font-bold tracking-widest uppercase h-full">
            <Link href="/" className={getLinkStyle('/')}>
              HOME
            </Link>
            
            <div className="relative group h-full flex items-center">
              <Link href="/services" className={getLinkStyle('/services')}>
                OUR SERVICES <ChevronDown size={14} className="ml-1 opacity-70 group-hover:rotate-180 transition-transform" />
              </Link>
              
              {/* Mega Menu Dropdown */}
              <div className="absolute top-[100%] left-1/2 -translate-x-1/2 w-max opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pt-2">
                <div className="bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 flex gap-4 relative overflow-hidden">
                  
                  {/* Subtle decorative background element */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-yellow/10 rounded-full blur-3xl"></div>
                  
                  {[
                    { title: "Design Facilities", img: "/services/service_design_1787300013035.jpg" },
                    { title: "Construction Project", img: "/services/service_construction_1787300029220.jpg" },
                    { title: "Interior Project", img: "/services/service_interior_1787300041689.jpg" },
                    { title: "Turnkey Project", img: "/services/service_turnkey_1787300070398.jpg" },
                    { title: "Renovation Project", img: "/services/service_renovation_1787300085173.jpg" }
                  ].map((service, index) => (
                    <Link href={`/services/${service.title.replace(/\s+/g, '-').toLowerCase()}`} key={index} className="block w-40 group/card relative z-10">
                      <div className="bg-[#1c2c4d] rounded-xl overflow-hidden shadow-md h-full border border-gray-800 hover:border-brand-yellow/50 transition-colors flex flex-col">
                        <div className="h-28 w-full overflow-hidden relative bg-gray-900">
                          <img src={service.img} alt={service.title} className="w-full h-full object-cover opacity-70 group-hover/card:scale-110 group-hover/card:opacity-100 transition-all duration-500" />
                        </div>
                        <div className="p-4 flex-grow flex items-center justify-between">
                          <h4 className="font-bold text-[11px] leading-tight text-white group-hover/card:text-brand-yellow transition-colors pr-2">{service.title}</h4>
                          <span className="text-gray-500 group-hover/card:text-brand-yellow transition-colors text-xs">↗</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                  
                </div>
              </div>
            </div>

            <Link href="/gallery" className={getLinkStyle('/gallery')}>GALLERY</Link>
            <Link href="/projects" className={getLinkStyle('/projects')}>PROJECTS</Link>
            <Link href="/pricing" className={getLinkStyle('/pricing')}>PRICING</Link>
            <Link href="/about" className={getLinkStyle('/about')}>ABOUT</Link>
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <Link href="/dashboard" className="bg-brand-yellow hover:bg-yellow-400 text-brand-navy px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase flex items-center transition-all shadow-[0_0_15px_rgba(241,184,33,0.4)]">
              <LayoutGrid size={14} className="mr-2" />
              DASHBOARD
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-brand-yellow transition-colors"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#1c2c4d] border-t border-white/10 shadow-2xl max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col p-6 space-y-6 text-sm font-bold tracking-widest uppercase">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center ${pathname === '/' ? 'text-brand-yellow' : 'text-white'}`}>
              HOME
            </Link>
            
            <div className="flex flex-col space-y-4 border-l-2 border-brand-yellow/30 pl-4">
              <span className="text-gray-400 text-xs">OUR SERVICES</span>
              {[
                { title: "Design Facilities", link: "design-facilities" },
                { title: "Construction Project", link: "construction-project" },
                { title: "Interior Project", link: "interior-project" },
                { title: "Turnkey Project", link: "turnkey-project" },
                { title: "Renovation Project", link: "renovation-project" }
              ].map((service, index) => (
                <Link 
                  key={index} 
                  href={`/services/${service.link}`} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center text-xs ${pathname.includes(service.link) ? 'text-brand-yellow' : 'text-white'}`}
                >
                  {service.title}
                </Link>
              ))}
            </div>

            <Link href="/gallery" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center ${pathname === '/gallery' ? 'text-brand-yellow' : 'text-white'}`}>GALLERY</Link>
            <Link href="/projects" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center ${pathname === '/projects' ? 'text-brand-yellow' : 'text-white'}`}>PROJECTS</Link>
            <Link href="/pricing" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center ${pathname === '/pricing' ? 'text-brand-yellow' : 'text-white'}`}>PRICING</Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center ${pathname === '/about' ? 'text-brand-yellow' : 'text-white'}`}>ABOUT</Link>
            
            <a href="tel:+919631980881" className="bg-brand-yellow text-brand-navy px-4 py-3 rounded-xl flex items-center justify-center mt-4">
              <Phone size={16} className="mr-2" /> CALL +91 96319 80881
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
