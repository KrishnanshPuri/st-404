import React, { useState, useRef, useMemo, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// --- Reusable Animation Variants ---
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.5 }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } 
  }
};

// --- Premium Mouse Trail (Shadow Ring) ---
function MouseTrail() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Fast spring for the core (follows almost instantly)
  const coreConfig = { damping: 20, stiffness: 400 };
  const coreX = useSpring(mouseX, coreConfig);
  const coreY = useSpring(mouseY, coreConfig);

  // Heavier spring for the aura (creates the "liquid" lag)
  const auraConfig = { damping: 30, stiffness: 100 };
  const auraX = useSpring(mouseX, auraConfig);
  const auraY = useSpring(mouseY, auraConfig);

  useEffect(() => {
    const moveMouse = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveMouse);
    return () => window.removeEventListener("mousemove", moveMouse);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* 1. THE AURA: The lagging, blurry glow */}
      <motion.div
        style={{ translateX: auraX, translateY: auraY }}
        className="fixed top-0 left-0 w-16 h-16 pointer-events-none z-[9998] mix-blend-screen hidden lg:block"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-blue-500/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl" />
        <div className="absolute top-0 left-0 w-12 h-12 border border-blue-500/20 rounded-full -translate-x-1/2 -translate-y-1/2 scale-75" />
      </motion.div>

      {/* 2. THE CORE: The sharp point of focus */}
      <motion.div
        style={{ translateX: coreX, translateY: coreY }}
        className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-[9999] mix-blend-screen hidden lg:block"
      >
        {/* Sharp inner dot */}
        <div className="absolute top-0 left-0 w-1 h-1 bg-blue-400 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#60a5fa]" />
        
        {/* Subtle expanding pulse */}
        <motion.div 
          animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-4 h-4 border border-blue-400/30 rounded-full -translate-x-1/2 -translate-y-1/2" 
        />
      </motion.div>
    </>
  );
}

// --- 3D Morphing Galaxy ---
function ParticleGalaxy() {
  const pointsRef = useRef();
  const particlesCount = 5000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      const distance = 2.5 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = distance * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = distance * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = distance * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.02);
    pointsRef.current.rotation.y += delta * 0.05;
    pointsRef.current.rotation.x += delta * 0.02;
  });

  return (
    <points ref={pointsRef} scale={[5, 5, 5]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#94A3B8" sizeAttenuation transparent opacity={0.6} blending={THREE.AdditiveBlending} />
    </points>
  );
}

// --- Feature Visuals ---
const NeuralGraph = () => (
  <svg width="200" height="200" viewBox="0 0 200 200" className="opacity-60">
    {[...Array(6)].map((_, i) => (
      <motion.circle
        key={i}
        cx={40 + (i % 2) * 120}
        cy={40 + Math.floor(i / 2) * 60}
        r="4"
        fill="#60A5FA"
        animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
      />
    ))}
    <motion.path
      d="M40 40 L160 40 M40 100 L160 100 M40 160 L160 160 M40 40 L160 100 M40 160 L160 100"
      stroke="#60A5FA"
      strokeWidth="0.5"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
    />
  </svg>
);

const TensorCube = () => (
  <div className="relative w-32 h-32 border border-blue-500/20 rotate-45 group-hover:rotate-90 transition-transform duration-1000">
    <div className="absolute inset-2 border border-blue-400/40" />
    <motion.div animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-blue-500/10" />
  </div>
);

const ModuleBlocks = () => (
  <div className="grid grid-cols-2 gap-2">
    {[...Array(4)].map((_, i) => (
      <motion.div key={i} whileHover={{ scale: 1.1, backgroundColor: "rgba(96, 165, 250, 0.2)" }} className="w-12 h-12 border border-white/10 rounded-lg flex items-center justify-center text-[10px] text-blue-400 font-mono">MOD_{i}</motion.div>
    ))}
  </div>
);

function Landing() {
  const techStack = [
    { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" },
    { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
    { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
    { name: "CUDA", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nvidia/nvidia-original.svg" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
    { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg" }
  ];

  return (
    <div className="bg-black text-zinc-200 selection:bg-blue-500/30 overflow-hidden font-sans">
      <MouseTrail />
      
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee-infinite {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .marquee-container:hover .animate-marquee-infinite {
          animation-play-state: paused;
        }
      `}</style>

      {/* 1. HERO SECTION - Full Stagger Entry */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative min-h-screen flex flex-col justify-center items-center px-6"
      >
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
            <ParticleGalaxy />
          </Canvas>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10 mt-20">
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-medium tracking-widest text-zinc-400 uppercase mb-8">
            NIT Jalandhar Chapter
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-400">
            Intelligence, <br /> Architected.
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            A premier research and development club mastering the mathematical and structural foundations of modern Machine Learning systems.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <NavLink to="/signin" className="px-8 py-4 bg-blue-100 text-black rounded-full font-semibold hover:bg-blue-300 transition-all duration-300 shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]">
              Initialize Sequence
            </NavLink>
          </motion.div>
        </div>
      </motion.section>

      {/* 2. MARQUEE SECTION - Smooth Reveal */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="py-6 border-y border-white/5 bg-black overflow-hidden relative marquee-container"
      >
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
        <div className="animate-marquee-infinite">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-12 items-center px-6">
              {techStack.map((tech, idx) => (
                <MarqueeItem key={`${i}-${idx}`} text={tech.name} icon={tech.icon} />
              ))}
            </div>
          ))}
        </div>
      </motion.div>

      {/* 3. FEATURES SECTION - Alternating Slide Reveal */}
      <div className="py-32 space-y-48">
        <FeatureSection index={0} visual={<NeuralGraph />} title="The Math Behind the Magic." desc="We strip away the abstraction. Understand the core logic from foundational Linear Algebra to deploying high-performance models in C++ and Python." />
        <FeatureSection index={1} visual={<TensorCube />} title="Sandboxed Innovation." desc="Test and iterate instantly. We provide integrated environments modeled after industry-standard IDEs to run neural networks in real-time." />
        <FeatureSection index={2} visual={<ModuleBlocks />} title="Curated Mastery." desc="Structured, module-based learning paths vetted by NIT Jalandhar's veteran researchers. No noise, just signal." />
      </div>

      {/* 4. TEAM SECTION - Staggered Cards */}
      <section className="py-32 px-6 border-t border-white/5 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 bg-blue-800/15 blur-[100px]" />
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto relative z-10"
        >
          <div className="text-center mb-24">
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-6 text-blue-300">The Core Protocol</motion.h2>
            <motion.p variants={fadeInUp} className="text-zinc-500 font-light italic">Engineers driving the future of ML at NIT Jalandhar.</motion.p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <TeamMember name="Atharv Dubey" role="Founder & Core Engineer" />
            <TeamMember name="Krishnansh Puri" role="Full Stack Lead" />
            <TeamMember name="Krish Baghla" role="ML Research Lead" />
            <TeamMember name="Laksh Arora" role="Systems Architect" />
          </div>
        </motion.div>
      </section>

      <footer className="py-12 px-6 border-t border-white/10 bg-black text-center">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-zinc-600 text-xs uppercase tracking-widest">NIT JALANDHAR © 2026</motion.p>
      </footer>
    </div>
  );
}

// Sub-components
function MarqueeItem({ text, icon }) {
  return (
    <div className="flex items-center group cursor-pointer">
      <div className="w-0 opacity-0 group-hover:w-8 group-hover:opacity-100 transition-all duration-500 flex items-center">
        <img src={icon} alt={text} className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all duration-300" />
      </div>
      <span className="text-sm font-semibold text-zinc-500 tracking-[0.3em] uppercase group-hover:text-blue-400 group-hover:pl-2 transition-all">
        {text}
      </span>
    </div>
  );
}

function FeatureSection({ index, title, desc, visual }) {
  const isEven = index % 2 === 0;
  return (
    <section className="px-6">
      <motion.div 
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-center"
      >
        <div className={`md:col-span-5 ${isEven ? 'md:order-1' : 'md:order-2 md:col-start-8'}`}>
          <div className="w-8 h-[2px] bg-blue-500 mb-8" />
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-blue-300 tracking-tight">{title}</h2>
          <p className="text-lg text-zinc-400 font-light leading-relaxed mb-8">{desc}</p>
        </div>
        <div className={`md:col-span-6 ${isEven ? 'md:order-2 md:col-start-7' : 'md:order-1'}`}>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="aspect-square md:aspect-[4/3] rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm flex items-center justify-center relative overflow-hidden group transition-all duration-500"
          >
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
             <div className="z-10">{visual}</div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function TeamMember({ name, role }) {
  return (
    <motion.div 
      variants={fadeInUp}
      whileHover={{ y: -5, borderColor: "rgba(59, 130, 246, 0.2)" }}
      className="p-8 bg-white/[0.02] border border-white/5 rounded-2xl text-center group transition-all duration-300"
    >
      <div className="w-16 h-16 bg-black border border-white/10 rounded-full mx-auto mb-6 flex items-center justify-center text-xl text-blue-500 group-hover:border-blue-400 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all">
        {name[0]}
      </div>
      <h3 className="text-base font-semibold text-blue-100 mb-2">{name}</h3>
      <p className="text-xs text-zinc-500 uppercase tracking-widest">{role}</p>
    </motion.div>
  );
}

export default Landing;