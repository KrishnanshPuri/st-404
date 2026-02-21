import React from 'react';
import { NavLink } from 'react-router-dom';

function Landing() {
  return (
    <div className="bg-zinc-950 text-zinc-100 selection:bg-blue-500/30">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: 200%;
          animation: marquee 30s linear infinite;
        }
      `}</style>

      {/* 1. MAIN HERO */}
      <section className="pt-32 pb-20 px-6 border-b border-zinc-900">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs font-medium text-blue-500 mb-8">
            NIT JALANDHAR CHAPTER
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            Engineering the <br />
            <span className="text-blue-500 text-glow">Intelligence of Tomorrow.</span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            A professional research and development club dedicated to mastering 
            Machine Learning, from mathematical foundations to production-ready systems.
          </p>
          <div className="flex justify-center gap-4">
            <NavLink to="/signin" className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md font-bold transition-all shadow-lg shadow-blue-600/20">
              Get Started
            </NavLink>
            <button className="px-8 py-3.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 rounded-md font-bold transition-all">
              Our Research
            </button>
          </div>
        </div>
      </section>

      {/* 2. MARQUEE SECTION */}
      <div className="py-12 border-b border-zinc-900 bg-zinc-900/10 overflow-hidden relative">
        <div className="animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-20 items-center px-10">
              <MarqueeItem text="PyTorch" />
              <MarqueeItem text="TensorFlow" />
              <MarqueeItem text="React" />
              <MarqueeItem text="C++" />
              <MarqueeItem text="CUDA" />
              <MarqueeItem text="Docker" />
              <MarqueeItem text="SQL" />
              <MarqueeItem text="Scikit-Learn" />
              <MarqueeItem text="NumPy" />
            </div>
          ))}
        </div>
      </div>

      {/* 3. FULL-SCREEN FEATURES */}
      <FeatureSection 
        index={0}
        title="Comprehensive ML Curriculum"
        desc="Master the entire stack. We cover everything from foundational Linear Algebra and Calculus to advanced Deep Learning architectures and LLM fine-tuning."
        image="https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=1000" // Placeholder: Math/Code
      />

      <FeatureSection 
        index={1}
        title="Interactive Coding Spaces"
        desc="Learn by building in our integrated IDE environments. Inspired by modern dev-learning platforms, we provide sandboxes to test your neural networks in real-time."
        image="https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1000" // Placeholder: Code IDE
      />

      <FeatureSection 
        index={2}
        title="Module-Based Learning"
        desc="No more overwhelming tutorials. Our curriculum is broken down into bite-sized, logical modules that ensure you master one concept before moving to the next."
        image="https://images.unsplash.com/photo-1454165833767-027ffea9e77b?auto=format&fit=crop&q=80&w=1000" // Placeholder: Structured Learning
      />

      <FeatureSection 
        index={3}
        title="Expert-Curated Content"
        desc="Stop sifting through outdated blogs. Our technical content is written and audited by industry experts and veteran researchers from NIT Jalandhar."
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1000" // Placeholder: Writing/Expert
      />

      {/* 4. MEET THE TEAM */}
      <section className="py-32 px-6 bg-zinc-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">Meet the Team</h2>
            <p className="text-zinc-500">The core engineers driving ML CLUB at NIT Jalandhar.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamMember name="Atharv Dubey" role="Founder & Core Engineer" />
            <TeamMember name="Krishnansh Puri" role="Full Stack Lead" />
            <TeamMember name="Krish Baghla" role="ML Research Lead" />
            <TeamMember name="Laksh Arora" role="Systems Architect" />
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="py-20 px-6 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <div className="text-xl font-bold text-white mb-2">ML CLUB</div>
            <p className="text-zinc-500 text-sm">© 2026 NIT Jalandhar. All rights reserved.</p>
          </div>
          <div className="flex gap-12 text-sm text-zinc-400">
            <a href="#" className="hover:text-blue-500 transition-colors">Documentation</a>
            <a href="#" className="hover:text-blue-500 transition-colors">GitHub</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Sub-components
function MarqueeItem({ text }) {
  return <span className="text-2xl font-black text-zinc-800 uppercase tracking-widest hover:text-blue-500/20 transition-colors">{text}</span>;
}

function FeatureSection({ index, title, desc, image }) {
  const isEven = index % 2 === 0;
  return (
    <section className={`min-h-screen flex items-center py-20 border-b border-zinc-900 ${isEven ? 'bg-zinc-950' : 'bg-zinc-900/30'}`}>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className={`${isEven ? 'md:order-1' : 'md:order-2'}`}>
          <div className="w-12 h-1 bg-blue-600 mb-8 rounded-full"></div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">{title}</h2>
          <p className="text-xl text-zinc-400 leading-relaxed mb-10">{desc}</p>
          <button className="text-blue-500 font-bold hover:underline flex items-center gap-2">
            Learn more about this feature <span>→</span>
          </button>
        </div>
        <div className={`${isEven ? 'md:order-2' : 'md:order-1'} group`}>
          <div className="relative aspect-video overflow-hidden rounded-xl border border-zinc-800 shadow-2xl">
            <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-blue-600/5 mix-blend-overlay"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamMember({ name, role }) {
  return (
    <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-blue-500/50 transition-all text-center group">
      <div className="w-20 h-20 bg-zinc-800 rounded-full mx-auto mb-6 flex items-center justify-center border-2 border-transparent group-hover:border-blue-500 transition-all overflow-hidden">
        <div className="text-2xl font-bold text-zinc-600">{name[0]}</div>
      </div>
      <h3 className="text-lg font-bold mb-1">{name}</h3>
      <p className="text-xs text-zinc-500 uppercase tracking-widest">{role}</p>
    </div>
  );
}

export default Landing;