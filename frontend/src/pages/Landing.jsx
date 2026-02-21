import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

function Landing() {
  const targetRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const xRaw = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const x = useSpring(xRaw, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="bg-zinc-950 text-zinc-100 selection:bg-blue-500/30">
      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-24 px-6 border-b border-zinc-900">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs font-medium text-blue-500 uppercase tracking-widest"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            NIT Jalandhar Chapter
          </motion.div>

          <h1 className="text-5xl md:text-[5.5rem] font-bold tracking-tight mb-8 leading-[1.05]">
            Engineering the <br />
            <span className="text-blue-500">Intelligence</span> of Tomorrow.
          </h1>
          
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            A professional research group led by Atharv Dubey at NIT Jalandhar, 
            focused on bridging the gap between mathematical theory and 
            production-ready ML infrastructure.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <NavLink to="/authentication" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold transition-all shadow-lg shadow-blue-600/20">
              Get Started
            </NavLink>
            <button className="px-8 py-4 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 rounded-lg font-bold transition-all">
              Research Papers
            </button>
          </div>
        </div>
      </section>

      {/* 2. TECHNOLOGY MARQUEE (New Section) */}
{/* MARQUEE SECTION */}
<div className="py-12 border-b border-zinc-900 bg-zinc-900/5 overflow-hidden">
  {/* CSS for the infinite scroll */}
  <style>{`
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee-slow {
      display: flex;
      width: max-content;
      animation: marquee 40s linear infinite;
    }
  `}</style>

  <div className="flex items-center gap-4 px-6 mb-6">
    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em]">
      Built with modern stacks
    </span>
    <div className="h-px flex-1 bg-zinc-900" />
  </div>

  <div className="flex overflow-hidden">
    <div className="animate-marquee-slow flex items-center">
      {/* We duplicate the content to create the seamless loop */}
      {[...Array(2)].map((_, i) => (
        <div key={i} className="flex gap-16 items-center px-8">
          <TechIcon name="PyTorch" />
          <TechIcon name="TensorFlow" />
          <TechIcon name="CUDA" />
          <TechIcon name="Docker" />
          <TechIcon name="React" />
          <TechIcon name="C++" />
          <TechIcon name="Scikit-Learn" />
          <TechIcon name="Tailwind" />
        </div>
      ))}
    </div>
  </div>
</div>

      {/* 3. METHODOLOGY */}
      <section className="py-24 px-6 bg-zinc-900/20 border-b border-zinc-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-16">
          <MethodologyItem 
            num="01" 
            title="Theory" 
            desc="Deep dives into Linear Algebra and Abstract Algebra foundations for AI." 
          />
          <MethodologyItem 
            num="02" 
            title="Systems" 
            desc="High-performance C++ and Docker infrastructure." 
          />
          <MethodologyItem 
            num="03" 
            title="Scale" 
            desc="Deploying open-source research engines like Velvex to the community." 
          />
        </div>
      </section>

      {/* 4. PINNED HORIZONTAL FEATURES */}
      <section ref={targetRef} className="relative h-[600vh] bg-zinc-950">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex">
            <FeatureSlide num="01" title="Full-Stack Curriculum" desc="Comprehensive paths covering Calculus, ML foundations, and LLM fine-tuning." img="https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1000" />
            <FeatureSlide num="02" title="Algorhythm Spaces" desc="Interactive competitive programming sandboxes for algorithm research." img="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1000" />
            <FeatureSlide num="03" title="Modular Architecture" desc="Learn structured system design focused on technical deep-retention." img="https://images.unsplash.com/photo-1454165833767-027ffea9e77b?q=80&w=1000" />
            <FeatureSlide num="04" title="Expert Mentorship" desc="Content audited by NIT Jalandhar veterans and industry experts." img="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1000" />
          </motion.div>
        </div>
      </section>

      {/* 5. ROADMAP */}
      <section className="py-32 px-6 bg-zinc-900/10 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">2026 Roadmap</h2>
            <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full" />
          </div>
          <div className="space-y-0 border-l border-zinc-800">
            <RoadmapItem q="Q1" title="Velvex 2.0 Docs Engine" desc="Deploying the high-performance C++ documentation engine." />
            <RoadmapItem q="Q2" title="Algorhythm Public Beta" desc="Opening our competitive programming platform for testing." />
            <RoadmapItem q="Q3" title="Neural Cryptography" desc="Research on group theory foundations in machine learning safety." />
          </div>
        </div>
      </section>

      {/* 6. TEAM */}
      <section className="py-32 px-6 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-20 text-center tracking-tighter text-zinc-100">Core Research Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <TeamMember name="Atharv Dubey" role="Founder & Core Engineer" />
            <TeamMember name="Krishnansh Puri" role="Full Stack Lead" />
            <TeamMember name="Krish Baghla" role="ML Research Lead" />
            <TeamMember name="Laksh Arora" role="Systems Architect" />
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-32 px-6 border-t border-zinc-900 bg-zinc-900/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-16 text-center text-zinc-100">Frequently Asked Questions</h2>
          <div className="grid gap-6">
            <FAQItem q="Who is the target audience for ML CLUB?" a="Engineers and researchers at NIT Jalandhar aiming for production-grade AI expertise." />
            <FAQItem q="What is Velvex?" a="A specialized C++ engine for documenting complex technical libraries." />
            <FAQItem q="Is coding knowledge required?" a="Yes. We leverage competitive programming and Docker for systems training." />
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="py-20 px-6 border-t border-zinc-900 bg-zinc-950">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-zinc-500">
          <div className="mb-8 md:mb-0 flex items-center gap-4">
            <span className="text-zinc-100 font-bold tracking-tighter">ML CLUB</span>
            <span className="text-zinc-800">|</span>
            <span>NIT Jalandhar</span>
          </div>
          <div className="flex gap-12">
            <a href="#" className="hover:text-blue-500 transition-colors">Twitter</a>
            <a href="https://github.com/AtharvDubey12/Algorhythm" className="hover:text-blue-500 transition-colors">GitHub</a>
            <a href="#" className="hover:text-blue-500 transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}


function TechIcon({ name }) {
  // Mapping names to simple path-based icons or recognizable placeholders
  const icons = {
    "PyTorch": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
    "TensorFlow": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
    "CUDA": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nvidia/nvidia-original.svg",
    "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    "Scikit-Learn": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg", // Using Pandas as a placeholder for Scikit
    "Tailwind": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original-wordmark.svg"
  };

  return (
    <div className="flex items-center gap-3 group cursor-default">
      <img 
        src={icons[name]} 
        alt={name} 
        className="w-6 h-6 grayscale group-hover:grayscale-0 transition-all duration-300 opacity-40 group-hover:opacity-100" 
      />
      <span className="text-xl font-bold text-zinc-800 uppercase tracking-tighter group-hover:text-blue-500 transition-colors duration-300">
        {name}
      </span>
    </div>
  );
}

// Sub-components for Google-Style branding
function MarqueeIcon({ text }) {
  return (
    <span className="text-xl md:text-3xl font-black text-zinc-800 uppercase tracking-tighter group-hover:text-blue-500/20 transition-colors duration-500 cursor-default">
      {text}
    </span>
  );
}

function MethodologyItem({ num, title, desc }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-blue-500 font-mono text-xs tracking-widest">{num} // {title.toUpperCase()}</div>
      <h3 className="text-2xl font-bold tracking-tight text-zinc-100">{title}</h3>
      <p className="text-zinc-500 leading-relaxed text-sm">{desc}</p>
    </div>
  );
}

function FeatureSlide({ num, title, desc, img }) {
  return (
    <div className="h-screen w-screen flex-shrink-0 flex items-center justify-center p-6 md:p-24">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-24 items-center">
        <div>
          <span className="text-blue-500 font-bold text-xs uppercase tracking-[0.3em] mb-6 block">Feature {num}</span>
          <h2 className="text-5xl md:text-7xl font-bold mb-10 tracking-tighter leading-[1.1] text-zinc-100">{title}</h2>
          <p className="text-xl text-zinc-400 leading-relaxed max-w-lg">{desc}</p>
        </div>
        <div className="aspect-video bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">
          <img src={img} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt={title} />
        </div>
      </div>
    </div>
  );
}

function RoadmapItem({ q, title, desc }) {
  return (
    <div className="relative pl-12 pb-16 group">
      <div className="absolute left-[-6px] top-0 w-3 h-3 rounded-full bg-blue-600 ring-8 ring-zinc-950 shadow-[0_0_15px_rgba(37,99,235,0.4)]" />
      <div className="flex flex-col gap-2">
        <span className="text-blue-500 font-bold font-mono text-sm uppercase tracking-widest">{q} Milestone</span>
        <h4 className="text-2xl font-bold group-hover:text-blue-400 transition-colors text-zinc-100">{title}</h4>
        <p className="text-zinc-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function TeamMember({ name, role }) {
  return (
    <div className="p-10 bg-zinc-900/30 border border-zinc-800 rounded-2xl hover:bg-zinc-900 transition-colors group">
      <div className="w-12 h-12 bg-zinc-800 rounded-lg mb-8 flex items-center justify-center text-zinc-600 font-black tracking-tighter group-hover:bg-blue-600 group-hover:text-white transition-all">
        {name[0]}
      </div>
      <h3 className="text-xl font-bold mb-2 text-zinc-100">{name}</h3>
      <p className="text-xs text-zinc-600 uppercase tracking-widest font-bold">{role}</p>
    </div>
  );
}

function FAQItem({ q, a }) {
  return (
    <div className="p-8 bg-zinc-900/40 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors">
      <h4 className="text-lg font-bold mb-3 text-zinc-200">{q}</h4>
      <p className="text-sm text-zinc-500 leading-relaxed">{a}</p>
    </div>
  );
}

export default Landing;