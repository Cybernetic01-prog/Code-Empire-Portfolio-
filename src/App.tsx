import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Mail, Phone, ArrowUpRight, ShieldCheck, Code, Globe, User, LayoutTemplate } from 'lucide-react';

const PROJECTS = [
  { 
    id: 1, 
    title: "AeroTrace: Global Traffic OS", 
    domain: "Logistics & Real-time Telemetry",
    features: "Real-time global vector tracking, mission log archiving, and encrypted blockchain ticketing modules.",
    skills: "Demonstrated ability to manage complex data visualization and multi-module system architecture.",
    tags: ["Logistics", "Telemetry", "Data Vis"], 
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800" 
  },
  { 
    id: 2, 
    title: "SignalTracer v3.0.0", 
    domain: "OSINT & Intelligence",
    features: "Global phone number tracing with integrated OpenStreetMap API support and line-type verification.",
    skills: "Integration of third-party Map APIs and data parsing.",
    tags: ["OSINT", "API", "Parsing"], 
    img: "https://images.unsplash.com/photo-1551808525-51a94da548ce?q=80&w=800" 
  },
  { 
    id: 3, 
    title: "LinkTrap V4.0.2", 
    domain: "Cybersecurity / Threat Analysis",
    features: "A live \"Detonation Terminal\" for suspicious URLs, utilizing a sandboxed environment and AI-driven safety verdicts.",
    skills: "Security-first mindset and implementation of AI analysis logic.",
    tags: ["Cybersec", "AI", "Sandbox"], 
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800" 
  },
  { 
    id: 4, 
    title: "YouTube Ads Blocker / Streamer", 
    domain: "Web Automation",
    features: "Bypassing traditional ad-insertion by utilizing yt_dlp to extract direct media streams.",
    skills: "Python scripting, library management (yt_dlp, webbrowser), and network request handling.",
    tags: ["Python", "Automation", "CLI"], 
    img: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=800" 
  },
  { 
    id: 5, 
    title: "UniTest Connect", 
    domain: "Educational SaaS / FinTech",
    features: "High-fidelity authentication interface with secure password toggles and a clean, professional user experience.",
    skills: "UI/UX design and frontend state management.",
    tags: ["SaaS", "UI/UX", "Frontend"], 
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800" 
  },
  { 
    id: 6, 
    title: "AeroTrace: Terminal Bookings", 
    domain: "Blockchain / Commerce Module",
    features: "Commerce Module displaying sector routes and seat allocations. Integrates a Global Link Secure blockchain ticketing node with AES-4096 encryption.",
    skills: "Cryptography application and secure transaction rendering.",
    tags: ["Commerce", "Security", "Blockchain"], 
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800" 
  },
  { 
    id: 7, 
    title: "AeroTrace: Mission Archive", 
    domain: "Analytics & Data Logging",
    features: "Historical archive of mission logs detailing routing configurations and operational statuses across multiple global vectors.",
    skills: "High-capacity data mapping and temporal logging strategies.",
    tags: ["Analytics", "Archive", "Data"], 
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800" 
  },
  { 
    id: 8, 
    title: "AeroTrace: Vector Density", 
    domain: "System Metrics & Auditing",
    features: "Operational volume audit tracking AES-256 encrypted primary vector logs and displaying telemetry density timelines.",
    skills: "Security auditing and chronological data visualization.",
    tags: ["Metrics", "Audit", "System"], 
    img: "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?q=80&w=800" 
  },
];

const DISCORD_SVG = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 127.14 96.36">
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.1,46,96,53,91.08,65.69,84.69,65.69Z" />
  </svg>
);

function MotionTyping({ text }: { text: string }) {
  return (
    <motion.span initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
      {text.split('').map((char, i) => (
        <motion.span 
          key={i} 
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} 
          transition={{ duration: 0.05, delay: i * 0.03 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

function ProjectModal({ project, onClose }: { project: any, onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        onClick={onClose}
        className="absolute inset-0 bg-[#0A0A0B]/80 backdrop-blur-md cursor-pointer" 
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="relative w-full max-w-4xl bg-[#111113] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-10 p-3 bg-black/50 backdrop-blur-md rounded-full text-zinc-400 hover:text-white hover:bg-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="w-full md:w-1/2 h-64 md:h-auto border-b md:border-b-0 md:border-r border-white/5 p-2 bg-zinc-900/50">
          <div className="w-full h-full rounded-2xl overflow-hidden">
            <img src={project.img} alt={project.title} className="w-full h-full object-cover opacity-80" />
          </div>
        </div>
        
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag: string) => (
              <span key={tag} className="text-xs text-indigo-500 font-mono tracking-widest uppercase">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-3xl font-light tracking-tight text-white/90 mb-2">{project.title}</h3>
          
          {project.domain && (
            <div className="text-indigo-400 font-mono text-xs uppercase tracking-widest mb-6">
              Domain: {project.domain}
            </div>
          )}

          <div className="space-y-4 mb-10">
            {project.features && (
              <div>
                <h4 className="text-white font-semibold text-sm mb-1">Key Features</h4>
                <p className="text-zinc-400 leading-relaxed text-sm">{project.features}</p>
              </div>
            )}
            {project.skills && (
              <div>
                <h4 className="text-white font-semibold text-sm mb-1">Technical Skill</h4>
                <p className="text-zinc-400 leading-relaxed text-sm">{project.skills}</p>
              </div>
            )}
            {project.desc && (
              <p className="text-zinc-400 leading-relaxed text-sm">{project.desc}</p>
            )}
          </div>

          <button className="w-fit px-8 py-4 bg-white text-black text-xs font-bold rounded-full hover:bg-indigo-500 hover:text-white transition-colors flex items-center gap-2">
            VIEW LIVE SPECS <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function App() {
  const [sidebar, setSidebar] = useState(false);
  const [activeProject, setActiveProject] = useState<any>(null);

  const row1 = PROJECTS.slice(0, 4);
  const row2 = PROJECTS.slice(4, 8);

  const scrollToSection = (id: string) => {
    setSidebar(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#F5F5F5] font-sans selection:bg-indigo-500/30 selection:text-white">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0A0A0B]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 tracking-tight cursor-pointer" onClick={() => scrollToSection('home')}>
            <div className="w-8 h-8 bg-indigo-600 shadow-lg shadow-indigo-500/20 rounded-xl flex items-center justify-center">
              <Code className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-light text-white/90">Code<span className="font-bold text-indigo-500">Empire.</span></span>
          </div>
          <button 
            onClick={() => setSidebar(true)} 
            className="p-2 -mr-2 text-zinc-500 hover:text-white transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Sidebar Drawer */}
      <AnimatePresence>
        {sidebar && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebar(false)} 
              className="absolute inset-0 bg-[#0A0A0B]/60 backdrop-blur-sm cursor-pointer" 
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-sm bg-[#111113] border-l border-white/5 h-full shadow-2xl flex flex-col p-8"
            >
              <div className="flex items-center justify-between mb-12">
                <span className="font-light tracking-tight text-xl text-white/90">Menu</span>
                <button onClick={() => setSidebar(false)} className="p-2 -mr-2 bg-white/5 rounded-full hover:bg-white/10 text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-col gap-6 text-2xl font-light transition-all">
                {['Home', 'Projects', 'About', 'Services', 'Contact'].map((item) => (
                  <button 
                    key={item} 
                    onClick={() => scrollToSection(item.toLowerCase())} 
                    className="text-left text-zinc-500 hover:text-indigo-400 transition-colors focus:outline-none"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section id="home" className="pt-40 pb-20 px-6 md:pt-52 md:pb-32 overflow-hidden relative">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="px-4 py-2 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-8 inline-flex items-center gap-2 bg-[#111113]"
            >
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              Available for new projects
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="font-light text-5xl md:text-7xl lg:text-8xl tracking-tight text-white/90 max-w-5xl mb-8 leading-[1.05]"
            >
              The minimal <span className="font-bold text-indigo-500">architecture</span> of modern web logic.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12"
            >
              Hi, I'm Joshua Alagoa — operating as <strong className="text-white">CodeEmpire</strong> (or <em className="text-indigo-400">OpusLabs</em>). I build highly scalable, interactive, and strictly engineered digital environments focusing on performance and sophisticated design.
            </motion.p>
          </div>
        </section>

        {/* Marquee Projects Section */}
        <section id="projects" className="py-20 bg-[#0F0F12] border-y border-white/5 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-12 flex items-center justify-between">
             <h2 className="text-3xl font-light tracking-tight text-white/90">Featured <span className="font-bold text-indigo-500">Builds</span></h2>
             <span className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase">Selected Works</span>
          </div>

          <div className="flex flex-col gap-6">
            {/* Row 1 - Scrolls Left */}
            <div className="relative w-full overflow-hidden flex">
               <div className="marquee-container">
                 {[...row1, ...row1, ...row1].map((p, index) => (
                   <ProjectCard key={`${p.id}-${index}`} project={p} onClick={() => setActiveProject(p)} />
                 ))}
               </div>
            </div>

            {/* Row 2 - Scrolls Right */}
            <div className="relative w-full overflow-hidden flex">
               <div className="marquee-container reverse">
                 {[...row2, ...row2, ...row2].map((p, index) => (
                   <ProjectCard key={`${p.id}-${index}`} project={p} onClick={() => setActiveProject(p)} />
                 ))}
               </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div>
               <h2 className="text-4xl md:text-5xl font-light text-white/90 tracking-tight mb-8 leading-tight">
                 Engineering precision over <span className="font-bold text-indigo-500">excessive noise.</span>
               </h2>
               <div className="space-y-6 text-zinc-400 text-sm leading-relaxed">
                 <p>
                   I'm Joshua Alagoa, a versatile developer known for exploring technological boundaries. Operating under the moniker <strong className="text-white">CodeEmpire</strong>, my approach strictly favors secure systems, high-performance infrastructures, and polished user interfaces over flashy, disjointed distractions.
                 </p>
                 <p>
                   From crafting Python-based backend media scraping scripts like the YouTube Stream Extractor, to building massive global React structures like AeroTracker and Unitest Connect, I focus on the invisible architecture.
                 </p>
               </div>
             </div>
             <div className="relative rounded-3xl overflow-hidden bg-zinc-900/50 aspect-square md:aspect-video lg:aspect-[4/5] flex items-center justify-center border border-white/5 group hover:border-indigo-500/50 transition-all">
               <User className="w-32 h-32 text-zinc-700 transition-transform duration-700 group-hover:scale-110 group-hover:text-indigo-400" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] to-transparent" />
             </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-32 px-6 bg-[#111113] text-[#F5F5F5] flex flex-col items-center border-y border-white/5 relative overflow-hidden">
           <div className="max-w-7xl mx-auto w-full relative z-10">
             <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
               <h2 className="text-4xl md:text-5xl font-light tracking-tight leading-tight max-w-xl text-white/90">
                 Core services & <span className="font-bold text-indigo-500">capabilities.</span>
               </h2>
               <p className="text-zinc-500 max-w-sm text-sm uppercase tracking-widest font-mono">From minimal frontends to strictly sandboxed analytical systems.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <ServiceCard 
                  icon={<LayoutTemplate />} 
                  title="Modern Web Applications" 
                  desc="Developing sophisticated React-based single page applications with rich, interactive user experiences." 
                />
                <ServiceCard 
                  icon={<ShieldCheck />} 
                  title="System Security" 
                  desc="Architecting sandboxed analytical UI interfaces, secure portals, and authenticated system architectures." 
                />
                <ServiceCard 
                  icon={<Globe />} 
                  title="Real-time Telemetry" 
                  desc="Handling complex asynchronous APIs to build massive mapping dashboards and tracking logistics." 
                />
                <ServiceCard 
                  icon={<Code />} 
                  title="Automation & Scripts" 
                  desc="Python-based CLI infrastructure traversing and extracting secured multimedia formats or bulk data points." 
                />
             </div>
           </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:justify-between items-start">
             <div className="max-w-xl">
               <h2 className="text-5xl md:text-7xl font-light text-white/90 mb-6 tracking-tight">Let's <span className="font-bold text-indigo-500">connect.</span></h2>
               <p className="text-zinc-500 text-xl leading-relaxed mb-12">
                 Ready to architect your next system or revamp an existing environment? Reach out through the channels below.
               </p>
               
               <div className="flex flex-col sm:flex-row flex-wrap items-center gap-6">
                  {/* Curved Contact Icons/Containers */}
                  <a href="mailto:codeempire01@gmail.com" className="group flex items-center justify-between gap-8 p-6 bg-zinc-900/50 rounded-3xl border border-white/5 hover:border-indigo-500/50 hover:bg-zinc-900/80 transition-all text-white/90 w-full md:w-auto">
                     <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-full bg-[#111113] flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                         <Mail className="w-5 h-5" />
                       </div>
                       <div>
                         <div className="text-[10px] font-semibold text-indigo-500 uppercase tracking-[0.2em] mb-1">Email</div>
                         <div className="font-mono text-sm">codeempire01@gmail.com</div>
                       </div>
                     </div>
                  </a>

                  <a href="tel:+2348137981597" className="group flex items-center justify-between gap-8 p-6 bg-zinc-900/50 rounded-3xl border border-white/5 hover:border-indigo-500/50 hover:bg-zinc-900/80 transition-all text-white/90 w-full md:w-auto">
                     <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-full bg-[#111113] flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                         <Phone className="w-5 h-5" />
                       </div>
                       <div>
                         <div className="text-[10px] font-semibold text-indigo-500 uppercase tracking-[0.2em] mb-1">Phone</div>
                         <div className="font-mono text-sm">+234 813 798 1597</div>
                       </div>
                     </div>
                  </a>

                  {/* Hidden Discord Link */}
                  <a href="https://discord.gg/qt2MCVG4" target="_blank" rel="noopener noreferrer" title="Discord Link" className="group p-4 bg-zinc-900/50 rounded-2xl border border-white/5 hover:bg-zinc-900/80 hover:border-indigo-500/50 transition-all">
                    <span className="sr-only">Join my Discord Server</span>
                    <div className="p-3 bg-[#111113] rounded-xl shadow-sm text-zinc-500 group-hover:text-indigo-400 transition-colors">
                      {DISCORD_SVG}
                    </div>
                  </a>
               </div>
             </div>
          </div>
        </section>

      </main>

      <footer className="bg-[#0F0F12] border-t border-white/5 py-8 flex flex-col items-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between w-full items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Code className="w-4 h-4 text-white" />
            </div>
            <p className="text-sm text-zinc-500 font-mono">© {new Date().getFullYear()} CodeEmpire.</p>
          </div>
          <div className="flex items-center gap-8 text-[10px] font-bold tracking-widest uppercase text-zinc-400 group">
             <span className="hover:text-indigo-400 transition-colors cursor-pointer">Minimal</span>
             <span className="hover:text-indigo-400 transition-colors cursor-pointer">Scalable</span>
             <span className="hover:text-indigo-400 transition-colors cursor-pointer">Secure</span>
          </div>
        </div>
      </footer>

      {/* Overlays / Modals */}
      <AnimatePresence>
        {activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}
      </AnimatePresence>

    </div>
  );
}

function ProjectCard({ project, onClick }: { key?: string | number, project: any, onClick: () => void }) {
  return (
    <div 
      className="group w-[320px] md:w-[420px] mx-3 flex-shrink-0 cursor-pointer overflow-hidden rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-indigo-500/50 transition-all duration-300"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden bg-[#111113] p-2 border-b border-white/5">
        <div className="w-full h-full rounded-2xl overflow-hidden relative">
          <img 
            src={project.img} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#0A0A0B]/40 group-hover:bg-indigo-500/10 transition-colors duration-500" />
        </div>
      </div>
      
      <div className="p-6 md:p-8 flex flex-col justify-between min-h-[220px]">
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 2).map((tag: string) => (
              <span key={tag} className="text-[10px] text-indigo-500 font-mono tracking-widest uppercase">
                {tag}
              </span>
            ))}
          </div>
          
          <h3 className="font-sans font-semibold text-2xl text-white/90 leading-tight">
            <MotionTyping text={project.title} /><span className="animate-pulse text-indigo-500 ml-1">|</span>
          </h3>
        </div>
        
        <button className="mt-8 w-fit px-6 py-3 bg-white text-black text-xs font-bold rounded-full group-hover:bg-indigo-500 group-hover:text-white transition-colors flex items-center gap-2">
          VIEW DETAILS <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

function ServiceCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-indigo-500/50 transition-all flex flex-col justify-between group">
      <div>
        <div className="p-4 bg-[#111113] w-max rounded-2xl text-indigo-400 group-hover:text-white group-hover:bg-indigo-600 transition-colors mb-8 shadow-lg shadow-indigo-500/10">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white/90 mb-4 group-hover:text-indigo-400 transition-colors">{title}</h3>
        <p className="text-zinc-400 leading-relaxed text-sm group-hover:text-zinc-300 transition-colors">{desc}</p>
      </div>
    </div>
  );
}
