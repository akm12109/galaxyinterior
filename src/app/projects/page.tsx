"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { MapPin, ArrowRight, CheckCircle2, Clock, CalendarDays } from 'lucide-react';
import Link from 'next/link';

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  status: 'ongoing' | 'upcoming' | 'completed';
  location: string;
  area: string;
};

const MOCK_PROJECTS: Project[] = [
  // ONGOING
  {
    id: "p1",
    title: "Galaxy Towers Resi-Comm",
    description: "A mixed-use skyscraper featuring 120 luxury apartments and 3 floors of premium retail space in the heart of the city.",
    image: "https://images.unsplash.com/photo-1541888081297-c819dc788916?auto=format&fit=crop&q=80&w=1200",
    status: "ongoing",
    location: "Kolkata, WB",
    area: "150,000 sq.ft"
  },
  {
    id: "p2",
    title: "TechPark Phase II",
    description: "State-of-the-art commercial complex designed for modern IT companies with advanced smart-building management.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200",
    status: "ongoing",
    location: "Patna, BR",
    area: "85,000 sq.ft"
  },
  
  // UPCOMING
  {
    id: "p3",
    title: "Heritage Boutique Hotel",
    description: "Restoring an 80-year-old colonial bungalow and converting it into a luxury 40-key boutique hotel while retaining its charm.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200",
    status: "upcoming",
    location: "Ranchi, JH",
    area: "35,000 sq.ft"
  },
  {
    id: "p4",
    title: "Zen Garden Villas",
    description: "A gated community of 25 ultra-luxury villas focused on biophilic design and sustainable architecture.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
    status: "upcoming",
    location: "Deoghar, JH",
    area: "120,000 sq.ft"
  },

  // COMPLETED
  {
    id: "p5",
    title: "Aura Corporate HQ",
    description: "Award-winning interior design and fit-out for a leading multinational corporation, completed 2 weeks ahead of schedule.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    status: "completed",
    location: "Kolkata, WB",
    area: "45,000 sq.ft"
  },
  {
    id: "p6",
    title: "The Minimalist Residence",
    description: "A complete structural overhaul and interior styling for a private client, focusing on stark lines and natural light.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200",
    status: "completed",
    location: "Bhagalpur, BR",
    area: "4,500 sq.ft"
  },
  {
    id: "p7",
    title: "Marina Bay Condos",
    description: "Turnkey execution of 12 luxury waterfront apartments, featuring imported Italian marble and smart home automation.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
    status: "completed",
    location: "Kolkata, WB",
    area: "32,000 sq.ft"
  }
];

const ProjectCard = ({ project }: { project: Project }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group cursor-target flex flex-col h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
    <div className="relative h-64 overflow-hidden">
      <Image 
        src={project.image} 
        alt={project.title} 
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-700"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-transparent transition-colors duration-300"></div>
      
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase text-brand-navy flex items-center shadow-md">
        {project.status === 'completed' && <CheckCircle2 size={12} className="mr-1 text-green-600" />}
        {project.status === 'ongoing' && <Clock size={12} className="mr-1 text-brand-yellow" />}
        {project.status === 'upcoming' && <CalendarDays size={12} className="mr-1 text-blue-500" />}
        {project.status}
      </div>
    </div>
    
    <div className="p-8 flex flex-col flex-grow">
      <h3 className="text-2xl font-black text-brand-navy mb-3 group-hover:text-brand-yellow transition-colors">{project.title}</h3>
      <div className="flex items-center text-gray-500 text-xs font-bold tracking-widest uppercase mb-4">
        <MapPin size={14} className="mr-1 text-brand-yellow" />
        {project.location}
        <span className="mx-2 opacity-30">|</span>
        {project.area}
      </div>
      <p className="text-gray-600 font-medium leading-relaxed mb-8 flex-grow">
        {project.description}
      </p>
      
      <button className="flex items-center text-brand-navy font-black text-sm tracking-widest uppercase group-hover:text-brand-yellow transition-colors mt-auto">
        View Project Details <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-2 transition-transform" />
      </button>
    </div>
  </div>
);

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const loadedProjects = querySnapshot.docs.map(doc => ({
            id: doc.id,
            title: doc.data().title || 'Untitled Project',
            description: doc.data().description || '',
            image: doc.data().image || "https://images.unsplash.com/photo-1541888081297-c819dc788916?auto=format&fit=crop&q=80&w=1200",
            status: doc.data().status || 'ongoing',
            location: doc.data().location || 'Unknown Location',
            area: doc.data().area || ''
          })) as Project[];
          
          if (loadedProjects.length > 0) {
            setProjects(loadedProjects);
          }
        }
      } catch (error) {
        console.error("Error fetching projects from Firebase:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const ongoing = projects.filter(p => p.status === 'ongoing');
  const upcoming = projects.filter(p => p.status === 'upcoming');
  const completed = projects.filter(p => p.status === 'completed');

  return (
    <main className="bg-gray-50 min-h-screen pb-10">

      {/* HEADER */}
      <section className="bg-brand-navy text-white pt-40 pb-32 rounded-b-[3rem] relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full border-[1px] border-white/5"></div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10 text-center">
          <div className="inline-block px-6 py-2 border border-brand-yellow/30 rounded-full mb-6 backdrop-blur-sm bg-black/20">
            <span className="text-brand-yellow font-bold tracking-widest uppercase text-xs">Portfolio</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 drop-shadow-2xl text-white">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-200">Projects</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            From blueprints to reality. Explore our ongoing developments, future visions, and our proudest completed landmarks.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <div className="max-w-[1400px] mx-auto px-6 -mt-16 relative z-20 space-y-24 mb-24">
        
        {/* ONGOING PROJECTS */}
        <section>
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-brand-yellow rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-brand-yellow/20">
              <Clock className="text-brand-navy" size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-brand-navy">Ongoing Projects</h2>
              <p className="text-gray-500 font-medium">Currently under construction and development.</p>
            </div>
          </div>
            
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={`skeleton-${i}`} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col h-full animate-pulse">
                  <div className="h-64 bg-gray-200"></div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-4"></div>
                    <div className="flex items-center mb-6">
                      <div className="h-4 bg-gray-200 rounded-md w-1/4"></div>
                      <span className="mx-2 opacity-30">|</span>
                      <div className="h-4 bg-gray-200 rounded-md w-1/4"></div>
                    </div>
                    <div className="space-y-2 mb-8 flex-grow">
                      <div className="h-4 bg-gray-200 rounded-md w-full"></div>
                      <div className="h-4 bg-gray-200 rounded-md w-full"></div>
                      <div className="h-4 bg-gray-200 rounded-md w-4/5"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded-md w-1/2 mt-auto"></div>
                  </div>
                </div>
              ))
            ) : (
              ongoing.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))
            )}
          </div>
        </section>

        {/* UPCOMING PROJECTS */}
        {upcoming.length > 0 && (
          <section>
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-blue-500/20">
                <CalendarDays className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-black text-brand-navy">Upcoming Projects</h2>
                <p className="text-gray-500 font-medium">Future blueprints soon to break ground.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcoming.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        )}

        {/* COMPLETED PROJECTS */}
        {completed.length > 0 && (
          <section>
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-green-500/20">
                <CheckCircle2 className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-black text-brand-navy">Completed Projects</h2>
                <p className="text-gray-500 font-medium">Our delivered masterpieces and proud legacies.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {completed.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        )}

      </div>
      
      {/* CTA */}
      <section className="max-w-[1400px] mx-auto px-6">
        <div className="bg-brand-navy rounded-3xl p-12 md:p-20 text-center relative overflow-hidden cursor-target group border border-brand-yellow/20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888081297-c819dc788916?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Want to be our next success story?</h2>
            <p className="text-gray-300 text-lg font-medium mb-10 max-w-2xl mx-auto">
              Whether it&apos;s a commercial high-rise or your dream home, we have the expertise to build it better.
            </p>
            <Link href="/contact" className="inline-block bg-brand-yellow hover:bg-yellow-400 text-brand-navy px-12 py-5 rounded-full font-black text-sm tracking-widest uppercase shadow-2xl transition-transform hover:scale-105">
              Discuss Your Project
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
