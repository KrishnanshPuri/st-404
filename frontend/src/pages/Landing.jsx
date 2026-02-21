import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

function Landing() {
  const targetRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Smooth spring physics for that premium feel
  const xRaw = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const x = useSpring(xRaw, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    // Note: Removed overflow-x-hidden from here to ensure sticky doesn't break
    <div className="bg-zinc-950 text-zinc-100 selection:bg-blue-500/30">
      
      {/* 1. MAIN HERO */}
      <section className="pt-32 pb-20 px-6 border-b border-zinc-900">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900 text-xs font-medium text-blue-500 mb-8 uppercase tracking-widest">
            NIT Jalandhar Chapter
          </div>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8">
            Engineering <span className="text-blue-500">Intelligence.</span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-12">
            A professional research group at NIT Jalandhar focused on the full lifecycle of AI—from mathematical theory to production deployment.
          </p>
          <div className="flex justify-center gap-4">
            <NavLink to="/authentication" className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md font-bold transition-all shadow-lg shadow-blue-600/20">
              Get Started
            </NavLink>
          </div>
        </div>
      </section>

      {/* 2. THE METHODOLOGY */}
      <section className="py-24 px-6 border-b border-zinc-900 bg-zinc-900/10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="text-blue-500 font-mono text-sm">01 / THEORY</div>
            <h3 className="text-xl font-bold">Mathematical Rigor</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">We dive deep into the Linear Algebra and Group Theory that powers modern transformers.</p>
          </div>
          <div className="space-y-4">
            <div className="text-blue-500 font-mono text-sm">02 / BUILD</div>
            <h3 className="text-xl font-bold">Systems Engineering</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">C++ optimization and Docker-driven deployment for high-performance ML infrastructure.</p>
          </div>
          <div className="space-y-4">
            <div className="text-blue-500 font-mono text-sm">03 / SCALE</div>
            <h3 className="text-xl font-bold">Open Research</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">Contributing to the global AI community through open-source projects like Velvex.</p>
          </div>
        </div>
      </section>

      {/* 3. PINNED HORIZONTAL SECTION */}
      {/* targetRef must be on this large container */}
      <section ref={targetRef} className="relative h-[600vh] bg-zinc-950">
        {/* This div MUST be sticky top-0 and h-screen */}
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex">
            <FeatureSlide num="01" title="End-to-End Curriculum" desc="Full stack ML: from Calculus to LLM deployment." img="https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1000" />
            <FeatureSlide num="02" title="Coding Spaces" desc="Interactive sandboxes for real-time model testing." img="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1000" />
            <FeatureSlide num="03" title="Module Learning" desc="Structured paths for deep technical retention." img="https://images.unsplash.com/photo-1454165833767-027ffea9e77b?q=80&w=1000" />
            <FeatureSlide num="04" title="Expert Content" desc="Curated and audited by NITJ research veterans." img="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1000" />
          </motion.div>
        </div>
      </section>

      {/* 4. 2026 ROADMAP */}
      <section className="py-32 px-6 bg-zinc-900/10 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-16 text-center">2026 Project Roadmap</h2>
          <div className="space-y-12 border-l border-zinc-800 ml-4 md:ml-0">
            <RoadmapItem quarter="Q1" title="Velvex 2.0 Launch" desc="Full release of the C++ documentation engine with LLM integration." />
            <RoadmapItem quarter="Q2" title="Algorhythm Public Beta" desc="Deploying the competitive programming platform for the NITJ community." />
            <RoadmapItem quarter="Q3" title="Neural-Math Research" desc="Publishing findings on group theory foundations in cryptographic ML." />
          </div>
        </div>
      </section>

      {/* 5. TEAM SECTION */}
      <section className="py-32 px-6 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-20 text-center tracking-tighter">The Core Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamMember name="Atharv Dubey" role="Founder & Core Engineer" />
            <TeamMember name="Krishnansh Puri" role="Full Stack Lead" />
            <TeamMember name="Krish Baghla" role="ML Research Lead" />
            <TeamMember name="Laksh Arora" role="Systems Architect" />
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="py-32 px-6 border-t border-zinc-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <FAQItem q="Who can join ML CLUB?" a="The club is currently open to students and researchers at NIT Jalandhar with a passion for building AI systems." />
            <FAQItem q="Do I need advanced math knowledge?" a="While we dive into group theory, we provide the foundational modules to get you up to speed." />
            <FAQItem q="What is Algorhythm?" a="It is our custom competitive programming platform designed specifically for neural-based algorithm research." />
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="py-20 px-6 border-t border-zinc-900 bg-zinc-950">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-zinc-500">
          <p>© 2026 ML CLUB NIT Jalandhar.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-blue-500 transition-colors">Documentation</a>
            <a href="#" className="hover:text-blue-500 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Sub-components
function FeatureSlide({ num, title, desc, img }) {
  return (
    <div className="h-screen w-screen flex-shrink-0 flex items-center justify-center p-6 md:p-24">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1">
          <span className="text-blue-500 font-mono text-sm tracking-widest uppercase mb-4 block">Feature {num}</span>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">{title}</h2>
          <p className="text-xl text-zinc-400 leading-relaxed">{desc}</p>
        </div>
        <div className="order-1 md:order-2 aspect-video bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800">
          <img src={img} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt={title} />
        </div>
      </div>
    </div>
  );
}

function RoadmapItem({ quarter, title, desc }) {
  return (
    <div className="relative pl-8 md:pl-0 md:flex md:gap-12 group">
      <div className="absolute left-[-5px] top-0 w-[10px] h-[10px] rounded-full bg-blue-600 ring-4 ring-zinc-950 z-10" />
      <div className="hidden md:block w-24 text-blue-500 font-bold text-xl">{quarter}</div>
      <div className="pb-8">
        <h4 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{title}</h4>
        <p className="text-zinc-500">{desc}</p>
      </div>
    </div>
  );
}

function FAQItem({ q, a }) {
  return (
    <div className="p-6 bg-zinc-900/30 border border-zinc-800 rounded-lg">
      <h4 className="font-bold text-zinc-200 mb-2">{q}</h4>
      <p className="text-sm text-zinc-500 leading-relaxed">{a}</p>
    </div>
  );
}

function TeamMember({ name, role }) {
  return (
    <div className="p-10 bg-zinc-900/30 border border-zinc-900 rounded-xl text-center hover:border-blue-500/30 transition-all">
      <div className="w-14 h-14 bg-zinc-800 rounded mx-auto mb-6 flex items-center justify-center text-zinc-600 font-bold">{name[0]}</div>
      <h3 className="font-bold">{name}</h3>
      <p className="text-[10px] text-zinc-600 uppercase tracking-[0.2em] mt-2 font-bold">{role}</p>
    </div>
  );
}

export default Landing;