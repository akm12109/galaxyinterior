
import Image from 'next/image';

const SERVICES = [
  {
    id: "design-facilities",
    title: "Design Facilities",
    desc: "Comprehensive spatial planning, 2D floor plans, and immersive 3D visualizations. We bridge the gap between imagination and reality, ensuring every square foot is optimized for both aesthetics and functionality.",
    img: "/services/service_design_1787300013035.jpg"
  },
  {
    id: "construction-project",
    title: "Construction Project",
    desc: "End-to-end structural execution. Our engineering team ensures robust foundations and flawless civil work, utilizing premium raw materials to build structures that stand the test of time.",
    img: "/services/service_construction_1787300029220.jpg"
  },
  {
    id: "interior-project",
    title: "Interior Project",
    desc: "Crafting environments that reflect your personality. From modular kitchens and false ceilings to bespoke furniture and ambient lighting, our interiors are synonymous with luxury and comfort.",
    img: "/services/service_interior_1787300041689.jpg"
  },
  {
    id: "turnkey-project",
    title: "Turnkey Project",
    desc: "A zero-hassle, A-to-Z execution model. We handle everything from conceptualization to the final coat of paint. You get a single point of contact and total peace of mind until we hand over the keys.",
    img: "/services/service_turnkey_1787300070398.jpg"
  },
  {
    id: "renovation-project",
    title: "Renovation Project",
    desc: "Breathe new life into outdated spaces. We expertly handle civil alterations and modernizations, transforming your existing property into a contemporary masterpiece without compromising structural integrity.",
    img: "/services/service_renovation_1787300085173.jpg"
  }
];

export default function ServicesPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-brand-navy pt-32 pb-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h4 className="text-brand-yellow font-bold tracking-widest uppercase mb-4 text-sm">Our Services</h4>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8">Uncompromising Excellence</h1>
          <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
            From visionary blueprints to the final coat of paint, we deliver a seamless, world-class experience at every stage of building your dream space.
          </p>
        </div>
      </section>

      {/* Services List */}
      <div className="max-w-[1400px] mx-auto py-16 px-6">
        {SERVICES.map((service, index) => {
          const isEven = index % 2 === 0;
          return (
            <div 
              key={service.id} 
              id={service.id} 
              className={`flex flex-col lg:flex-row items-stretch min-h-[500px] mb-24 lg:mb-32 group scroll-mt-32 ${!isEven ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2 relative overflow-hidden rounded-3xl shadow-2xl h-[400px] lg:h-auto">
                <Image 
                  src={service.img} 
                  alt={service.title} 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-brand-navy/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              
              {/* Content Side */}
              <div className={`w-full lg:w-1/2 flex flex-col justify-center py-12 lg:py-0 ${isEven ? 'lg:pl-20' : 'lg:pr-20'}`}>
                <div className="text-brand-yellow font-black text-6xl md:text-8xl opacity-10 mb-[-2rem] select-none">
                  0{index + 1}
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-brand-navy mb-8 relative z-10">
                  {service.title}
                </h2>
                <div className="w-20 h-1 bg-brand-yellow mb-8"></div>
                <p className="text-gray-600 text-lg font-medium leading-relaxed">
                  {service.desc}
                </p>
                <div className="mt-12">
                  <button className="px-8 py-4 bg-brand-navy hover:bg-[#162442] text-white font-bold text-sm tracking-widest uppercase rounded-full shadow-lg transition-colors flex items-center">
                    Discuss Project
                    <span className="ml-4 text-brand-yellow">→</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
