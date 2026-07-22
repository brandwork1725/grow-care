import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RotateCcw, ZoomIn, ZoomOut, Layers, Sun, ShieldCheck } from "lucide-react";
import { Product } from "../../types";

interface Props {
  product: Product;
  className?: string;
}

export const Product3DViewer: React.FC<Props> = ({ product, className = "" }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [wireframe, setWireframe] = useState(false);
  const [activeColorHex, setActiveColorHex] = useState(
    product.colors[0]?.hex || "#D4AF37"
  );

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 5 / zoomLevel);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Studio Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffaed, 2.0);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const backLight = new THREE.DirectionalLight(0xd4af37, 1.2);
    backLight.position.set(-3, -2, -3);
    scene.add(backLight);

    // Product Model Group
    const productGroup = new THREE.Group();
    scene.add(productGroup);

    // Material setup
    const meshColor = new THREE.Color(activeColorHex);
    const productMaterial = new THREE.MeshPhysicalMaterial({
      color: meshColor,
      metalness: product.modelType === "earrings" || product.modelType === "accessory" ? 0.95 : 0.4,
      roughness: 0.2,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      wireframe: wireframe,
    });

    // Build geometry based on modelType
    let productMesh: THREE.Mesh;

    if (product.modelType === "handbag") {
      // Sculpted Bag body + handle
      const bagGeo = new THREE.BoxGeometry(1.6, 1.2, 0.7, 10, 10, 10);
      productMesh = new THREE.Mesh(bagGeo, productMaterial);

      // Add handle torus
      const handleGeo = new THREE.TorusGeometry(0.5, 0.06, 16, 50, Math.PI);
      const handleMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.95,
        roughness: 0.1,
      });
      const handleMesh = new THREE.Mesh(handleGeo, handleMat);
      handleMesh.position.set(0, 0.6, 0);
      productMesh.add(handleMesh);
    } else if (product.modelType === "earrings") {
      // Chandelier drop
      const dropGeo = new THREE.ConeGeometry(0.4, 1.2, 8);
      productMesh = new THREE.Mesh(dropGeo, productMaterial);
      productMesh.rotation.x = Math.PI;

      const ringGeo = new THREE.TorusGeometry(0.3, 0.04, 16, 32);
      const ringMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95 });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.set(0, 0.7, 0);
      productMesh.add(ringMesh);
    } else if (product.modelType === "flower") {
      // Vase + petals
      const vaseGeo = new THREE.CylinderGeometry(0.5, 0.3, 1.4, 16);
      productMesh = new THREE.Mesh(vaseGeo, productMaterial);

      const petalGeo = new THREE.DodecahedronGeometry(0.6);
      const petalMat = new THREE.MeshPhysicalMaterial({
        color: 0x004b23,
        roughness: 0.1,
        transmission: 0.5,
      });
      const petalMesh = new THREE.Mesh(petalGeo, petalMat);
      petalMesh.position.set(0, 0.9, 0);
      productMesh.add(petalMesh);
    } else {
      // Accessory / General Luxury Cylinder
      const geo = new THREE.CylinderGeometry(0.9, 0.9, 0.3, 32);
      productMesh = new THREE.Mesh(geo, productMaterial);
    }

    productGroup.add(productMesh);

    // Orbital Dragging logic
    let isDragging = false;
    let previousPos = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousPos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const delta = {
        x: e.clientX - previousPos.x,
        y: e.clientY - previousPos.y,
      };

      productGroup.rotation.y += delta.x * 0.01;
      productGroup.rotation.x += delta.y * 0.01;

      previousPos = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domCanvas = renderer.domElement;
    domCanvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    let animId: number;
    const renderLoop = () => {
      if (!isDragging) {
        productGroup.rotation.y += 0.006;
      }
      camera.position.z = 5 / zoomLevel;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      domCanvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, [product, zoomLevel, wireframe, activeColorHex]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[360px] rounded-2xl bg-gradient-to-b from-neutral-900 via-neutral-950 to-black border border-amber-500/20 overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top 3D Badge */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-amber-500/30 text-amber-300 text-[11px] font-medium backdrop-blur-md">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>360° Interactive 3D Showcase</span>
      </div>

      {/* Color Swatch Bar */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 p-1 rounded-full bg-black/60 border border-amber-500/20 backdrop-blur-md">
        {product.colors.map((c) => (
          <button
            key={c.name}
            onClick={() => setActiveColorHex(c.hex)}
            style={{ backgroundColor: c.hex }}
            className={`w-5 h-5 rounded-full border border-white/20 transition ${
              activeColorHex === c.hex ? "ring-2 ring-amber-400 scale-110" : "opacity-70 hover:opacity-100"
            }`}
            title={c.name}
          />
        ))}
      </div>

      {/* Bottom Tool Overlay */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 rounded-full bg-black/80 border border-amber-500/30 text-neutral-300 text-xs backdrop-blur-md shadow-xl">
        <button
          onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 2.0))}
          className="p-1 hover:text-amber-300 transition"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.6))}
          className="p-1 hover:text-amber-300 transition"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <div className="h-3 w-px bg-neutral-700" />
        <button
          onClick={() => setWireframe(!wireframe)}
          className={`p-1 transition ${wireframe ? "text-amber-300" : "hover:text-white"}`}
          title="Toggle Wireframe Mesh"
        >
          <Layers className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoomLevel(1.0)}
          className="p-1 hover:text-amber-300 transition"
          title="Reset Camera"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
