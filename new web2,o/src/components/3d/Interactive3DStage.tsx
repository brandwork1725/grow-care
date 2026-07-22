import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RotateCw, Sparkles, Sun, Eye } from "lucide-react";

interface Props {
  className?: string;
  onExploreClick?: () => void;
}

export const Interactive3DStage: React.FC<Props> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [materialTheme, setMaterialTheme] = useState<"gold" | "obsidian" | "emerald">("gold");
  const [isAutoSpinning, setIsAutoSpinning] = useState(true);
  const [isExploded, setIsExploded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Scene Setup
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 7);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffdfa9, 2.5);
    mainLight.position.set(5, 5, 5);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const goldRimLight = new THREE.PointLight(0xd4af37, 3, 10);
    goldRimLight.position.set(-4, -2, 3);
    scene.add(goldRimLight);

    const fillLight = new THREE.DirectionalLight(0x4040ff, 0.4);
    fillLight.position.set(-5, 0, -5);
    scene.add(fillLight);

    // Group for core sculpture
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Get color based on state
    const getColorHex = (theme: string) => {
      if (theme === "obsidian") return 0x18181b;
      if (theme === "emerald") return 0x004b23;
      return 0xd4af37; // gold
    };

    // Central Core Geometry
    const coreGeo = new THREE.IcosahedronGeometry(1.4, 2);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: getColorHex(materialTheme),
      metalness: materialTheme === "obsidian" ? 0.3 : 0.92,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 1.0,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // Inner wireframe overlay
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xffe5a3,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const wireMesh = new THREE.Mesh(coreGeo, wireMat);
    wireMesh.scale.setScalar(1.02);
    mainGroup.add(wireMesh);

    // Concentric Glass/Gold Rings
    const ringGroup = new THREE.Group();
    mainGroup.add(ringGroup);

    const ringMat = new THREE.MeshPhysicalMaterial({
      color: 0xfffdf7,
      metalness: 0.8,
      roughness: 0.1,
      transmission: 0.6,
      opacity: 0.85,
      transparent: true,
      ior: 1.5,
    });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.04, 16, 100), ringMat);
    ring1.rotation.x = Math.PI / 3;
    ringGroup.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.7, 0.03, 16, 100), ringMat);
    ring2.rotation.y = Math.PI / 4;
    ringGroup.add(ring2);

    // Floating Diamonds / Blocks
    const floatGroup = new THREE.Group();
    mainGroup.add(floatGroup);

    const floatGeo = new THREE.OctahedronGeometry(0.25);
    const floatMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.95,
      roughness: 0.1,
    });

    const floatingItems: THREE.Mesh[] = [];
    for (let i = 0; i < 8; i++) {
      const mesh = new THREE.Mesh(floatGeo, floatMat);
      const angle = (i / 8) * Math.PI * 2;
      const radius = 3.2;
      mesh.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 1.5,
        Math.sin(angle) * radius
      );
      floatGroup.add(mesh);
      floatingItems.push(mesh);
    }

    // Particle Stars
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      particlePos[i] = (Math.random() - 0.5) * 15;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffd700,
      size: 0.04,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Interactivity / Mouse tracking
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let mouseWorld = new THREE.Vector2();

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseWorld.x = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
      mouseWorld.y = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;

      // Light cursor tracking
      mainLight.position.x = mouseWorld.x * 5;
      mainLight.position.y = mouseWorld.y * 5;

      if (!isDragging) return;

      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y,
      };

      mainGroup.rotation.y += deltaMove.x * 0.01;
      mainGroup.rotation.x += deltaMove.y * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const domCanvas = renderer.domElement;
    domCanvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    // Animation Loop
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      if (isAutoSpinning && !isDragging) {
        mainGroup.rotation.y += 0.005;
        ringGroup.rotation.x += 0.003;
        ringGroup.rotation.z += 0.002;
      }

      // Floating items animation
      floatingItems.forEach((item, idx) => {
        item.position.y += Math.sin(elapsedTime * 2 + idx) * 0.003;
        item.rotation.x += 0.01;
        item.rotation.y += 0.01;
      });

      // Explosion mode effect
      const targetScale = isExploded ? 1.4 : 1.0;
      const ringTargetScale = isExploded ? 1.3 : 1.0;
      coreMesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
      ringGroup.scale.lerp(new THREE.Vector3(ringTargetScale, ringTargetScale, ringTargetScale), 0.05);

      particles.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      domCanvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, [materialTheme, isAutoSpinning, isExploded]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[450px] md:h-[580px] rounded-none overflow-hidden bg-[#EBE8E3] dark:bg-neutral-900 border border-black/10 dark:border-white/10 shadow-2xl backdrop-blur-xl group ${className}`}
    >
      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* 3D Controls Floating Bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-5 py-2.5 rounded-none bg-[#0A0A0A]/90 text-[#F5F2ED] border border-[#D4AF37]/30 backdrop-blur-md shadow-2xl text-xs font-sans z-10 transition-all">
        <button
          onClick={() => setIsAutoSpinning(!isAutoSpinning)}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs uppercase tracking-wider font-semibold transition ${
            isAutoSpinning ? "text-[#D4AF37]" : "hover:text-white"
          }`}
          title="Toggle Auto Spin"
        >
          <RotateCw className={`w-3.5 h-3.5 ${isAutoSpinning ? "animate-spin" : ""}`} />
          <span>{isAutoSpinning ? "Orbiting" : "Paused"}</span>
        </button>

        <div className="h-3 w-px bg-neutral-700" />

        {/* Material Swatches */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMaterialTheme("gold")}
            className={`w-5 h-5 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-300 transition ${
              materialTheme === "gold" ? "ring-2 ring-[#D4AF37] scale-110" : "opacity-70 hover:opacity-100"
            }`}
            title="18K Gold Material"
          />
          <button
            onClick={() => setMaterialTheme("obsidian")}
            className={`w-5 h-5 rounded-full bg-neutral-800 border border-neutral-600 transition ${
              materialTheme === "obsidian" ? "ring-2 ring-neutral-200 scale-110" : "opacity-70 hover:opacity-100"
            }`}
            title="Obsidian Glass"
          />
          <button
            onClick={() => setMaterialTheme("emerald")}
            className={`w-5 h-5 rounded-full bg-[#064E3B] border border-emerald-400 transition ${
              materialTheme === "emerald" ? "ring-2 ring-emerald-400 scale-110" : "opacity-70 hover:opacity-100"
            }`}
            title="Emerald Gemstone"
          />
        </div>

        <div className="h-3 w-px bg-neutral-700" />

        <button
          onClick={() => setIsExploded(!isExploded)}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs uppercase tracking-wider font-semibold transition ${
            isExploded ? "text-[#D4AF37]" : "hover:text-white"
          }`}
          title="Expand Structure"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{isExploded ? "Contract" : "Expand 3D"}</span>
        </button>
      </div>

      {/* Hover Instruction Overlay */}
      <div className="absolute top-4 left-4 flex items-center gap-2 px-3.5 py-1.5 bg-[#0A0A0A]/80 border border-white/10 text-[10px] font-sans tracking-widest uppercase text-[#D4AF37] backdrop-blur-sm pointer-events-none">
        <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
        <span>3D View: Drag to Rotate • Cursor Lighting</span>
      </div>
    </div>
  );
};
