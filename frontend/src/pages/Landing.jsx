import React, { useRef, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// --- 3D Morphing Galaxy Component ---
function ParticleGalaxy() {
  const pointsRef = useRef();
  
  // Generate 5000 particles in a spherical/galaxy formation
  const particlesCount = 5000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      const distance = 2.5 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      pos[i * 3] = distance * Math.sin(phi) * Math.cos(theta);     // x
      pos[i * 3 + 1] = distance * Math.sin(phi) * Math.sin(theta); // y
      pos[i * 3 + 2] = distance * Math.cos(phi);                   // z
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    // The "Moving In From Out" Effect
    // Starts massive (scale 5) and smoothly shrinks to normal (scale 1)
    pointsRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.02);
    
    // Smooth morphing rotation
    pointsRef.current.rotation.y += delta * 0.05;
    pointsRef.current.rotation.x += delta * 0.02;
  });

  return (
    // Initial scale is 5 to start "outside" the viewport
    <points ref={pointsRef} scale={[5, 5, 5]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.015} 
        color="#a855f7" // Elegant purple/indigo AI glow
        sizeAttenuation 
        transparent 
        opacity={0.6} 
        blending={THREE.AdditiveBlending} 
      />
    </points>
  );
}

function Landing() {
  // Ultra-smooth, elegant scroll animation settings
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } }
  };

  return (
    <div className="bg-black text-zinc-200 selection:bg-purple-500/30 overflow-hidden font-sans">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: 200%;
          animation: marquee 40s linear infinite;
        }
      `}</style>

      {/* 1. MAIN HERO */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-6">
        
        {/* 3D Galaxy Canvas */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
            <ParticleGalaxy />
          </Canvas>
          {/* Subtle vignette overlay to blend edges into pure black */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]"></div>
        </div>

        {/* Hero Content - Glassmorphism & Minimalist */}
        <div className="max-w-5xl mx-auto text-center relative z-10 mt-20">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-medium tracking-widest text-zinc-400 uppercase mb-8"
          >
            NIT Jalandhar Chapter
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600"
          >
            Intelligence, <br />
            Architected.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
          >
            A premier research and development club mastering the mathematical and structural foundations of modern Machine Learning systems.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <NavLink to="/signin" className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-zinc-200 transition-colors shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)]">
              Initialize Sequence
            </NavLink>
            <button className="px-8 py-4 bg-transparent border border-white/20 hover:border-white/50 hover:bg-white/5 text-white rounded-full font-semibold transition-all">
              Explore Research
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. SUBTLE MARQUEE */}
      <div className="py-8 border-y border-white/5 bg-white/[0.02] overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10"></div>
        <div className="animate-marquee whitespace-nowrap opacity-40">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-24 items-center px-12">
              <MarqueeItem text="PyTorch" />
              <MarqueeItem text="TensorFlow" />
              <MarqueeItem text="React" />
              <MarqueeItem text="C++" />
              <MarqueeItem text="CUDA" />
              <MarqueeItem text="Docker" />
              <MarqueeItem text="JavaScript" />
              <MarqueeItem text="NumPy" />
            </div>
          ))}
        </div>
      </div>

      {/* 3. MINIMALIST FEATURES */}
      <div className="py-32 space-y-32">
        <FeatureSection 
          index={0}
          title="The Math Behind the Magic."
          desc="We strip away the abstraction. Understand the core logic from foundational Linear Algebra to deploying high-performance models in C++ and Python."
        />
        <FeatureSection 
          index={1}
          title="Sandboxed Innovation."
          desc="Test and iterate instantly. We provide integrated environments modeled after industry-standard IDEs to run neural networks in real-time."
        />
        <FeatureSection 
          index={2}
          title="Curated Mastery."
          desc="Structured, module-based learning paths vetted by NIT Jalandhar's veteran researchers. No noise, just signal."
        />
      </div>

      {/* 4. TEAM SECTION */}
      <section className="py-32 px-6 border-t border-white/5 relative">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 bg-purple-500/10 blur-[100px] pointer-events-none"></div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="max-w-6xl mx-auto relative z-10"
        >
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">The Core Protocol</h2>
            <p className="text-zinc-500 text-lg font-light">Engineers driving the future of ML at NIT Jalandhar.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <TeamMember name="Atharv Dubey" role="Founder & Core Engineer" delay={0.1} />
            <TeamMember name="Krishnansh Puri" role="Full Stack Lead" delay={0.2} />
            <TeamMember name="Krish Baghla" role="ML Research Lead" delay={0.3} />
            <TeamMember name="Laksh Arora" role="Systems Architect" delay={0.4} />
          </div>
        </motion.div>
      </section>

      {/* 5. FOOTER */}
      <footer className="py-12 px-6 border-t border-white/10 bg-black">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <div className="text-lg font-bold tracking-widest text-white mb-1">ML CLUB</div>
            <p className="text-zinc-600 text-xs uppercase tracking-wider">NIT Jalandhar © 2026</p>
          </div>
          <div className="flex gap-8 text-sm font-medium text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">Documentation</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- Sub-components ---

function MarqueeItem({ text }) {
  return <span className="text-xl font-light text-zinc-300 tracking-[0.2em] uppercase">{text}</span>;
}

function FeatureSection({ index, title, desc }) {
  const isEven = index % 2 === 0;
  
  return (
    <section className="px-6">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-center"
      >
        <div className={`md:col-span-5 ${isEven ? 'md:order-1' : 'md:order-2 md:col-start-8'}`}>
          <div className="w-8 h-[2px] bg-purple-500 mb-8"></div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-white">{title}</h2>
          <p className="text-lg text-zinc-400 font-light leading-relaxed mb-8">{desc}</p>
          <button className="text-sm font-semibold tracking-widest uppercase text-white hover:text-purple-400 transition-colors flex items-center gap-3">
            Read Docs <span className="text-lg">→</span>
          </button>
        </div>
        
        <div className={`md:col-span-6 ${isEven ? 'md:order-2 md:col-start-7' : 'md:order-1'}`}>
          {/* Abstract geometric wireframe box replacing the heavy images */}
          <div className="aspect-square md:aspect-[4/3] rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm flex items-center justify-center relative overflow-hidden group">
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
             <div className="w-32 h-32 border border-purple-500/30 rounded-full group-hover:scale-110 transition-transform duration-1000 ease-out flex items-center justify-center">
                <div className="w-16 h-16 border border-white/20 rounded-full"></div>
             </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function TeamMember({ name, role, delay }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay, duration: 0.8, ease: "easeOut" }}
      className="p-8 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] hover:border-white/10 transition-all text-center group"
    >
      <div className="w-16 h-16 bg-black border border-white/10 rounded-full mx-auto mb-6 flex items-center justify-center text-xl font-light text-zinc-300 group-hover:border-purple-500/50 transition-colors shadow-inner">
        {name[0]}
      </div>
      <h3 className="text-base font-semibold text-white mb-2 tracking-wide">{name}</h3>
      <p className="text-xs text-zinc-500 uppercase tracking-widest font-medium">{role}</p>
    </motion.div>
  );
}

export default Landing;