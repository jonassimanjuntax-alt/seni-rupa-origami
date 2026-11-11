import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, ZoomIn, ZoomOut, RefreshCw } from 'lucide-react';

interface ThreeOrigamiFinalModelProps {
  levelId: number;
  artName: string;
  category: string;
  primaryColor: string;
}

export const ThreeOrigamiFinalModel: React.FC<ThreeOrigamiFinalModelProps> = ({
  levelId,
  artName,
  category,
  primaryColor,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);

  const [autoRotate, setAutoRotate] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Drag interaction
  const isDraggingRef = useRef(false);
  const prevPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth || 640;
    const height = containerRef.current.clientHeight || 480;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 3, 6);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.1);
    dirLight.position.set(5, 8, 6);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0xdbeafe, 0.5);
    rimLight.position.set(-5, 2, -4);
    scene.add(rimLight);

    // Subtle Ground shadow plane
    const shadowGeo = new THREE.PlaneGeometry(8, 8);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.12 });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -0.8;
    shadowMesh.receiveShadow = true;
    scene.add(shadowMesh);

    // Build the specific origami model
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    const color = new THREE.Color(primaryColor);
    const paperMat = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.55,
      metalness: 0.08,
      flatShading: true,
      side: THREE.DoubleSide,
    });

    const whiteMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.7,
      metalness: 0.02,
      flatShading: true,
      side: THREE.DoubleSide,
    });

    const stemMat = new THREE.MeshStandardMaterial({
      color: 0x16a34a,
      roughness: 0.6,
      flatShading: true,
    });

    if (levelId === 1) {
      // PERAHU KERTAS 3D MODEL
      // Main central sail
      const sailGeo = new THREE.BufferGeometry();
      const sailVertices = new Float32Array([
        0, 1.4, 0,
        -0.8, 0, 0.3,
        0.8, 0, 0.3,

        0, 1.4, 0,
        0.8, 0, -0.3,
        -0.8, 0, -0.3,
      ]);
      sailGeo.setAttribute('position', new THREE.BufferAttribute(sailVertices, 3));
      sailGeo.computeVertexNormals();
      const sailMesh = new THREE.Mesh(sailGeo, paperMat);
      sailMesh.castShadow = true;
      modelGroup.add(sailMesh);

      // Hull left and right
      const hullLeftGeo = new THREE.BufferGeometry();
      const hullLeftVerts = new Float32Array([
        -1.6, 0.35, 0,
        -0.8, 0, 0.6,
        0.8, 0, 0.6,

        -1.6, 0.35, 0,
        0.8, 0, 0.6,
        1.6, 0.35, 0,

        // bottom
        -1.6, 0.35, 0,
        1.6, 0.35, 0,
        0, -0.6, 0,
      ]);
      hullLeftGeo.setAttribute('position', new THREE.BufferAttribute(hullLeftVerts, 3));
      hullLeftGeo.computeVertexNormals();
      const hullLeftMesh = new THREE.Mesh(hullLeftGeo, paperMat);
      hullLeftMesh.castShadow = true;
      modelGroup.add(hullLeftMesh);

      // Hull right
      const hullRightGeo = new THREE.BufferGeometry();
      const hullRightVerts = new Float32Array([
        -1.6, 0.35, 0,
        0.8, 0, -0.6,
        -0.8, 0, -0.6,

        -1.6, 0.35, 0,
        1.6, 0.35, 0,
        0.8, 0, -0.6,

        // bottom
        -1.6, 0.35, 0,
        0, -0.6, 0,
        1.6, 0.35, 0,
      ]);
      hullRightGeo.setAttribute('position', new THREE.BufferAttribute(hullRightVerts, 3));
      hullRightGeo.computeVertexNormals();
      const hullRightMesh = new THREE.Mesh(hullRightGeo, paperMat);
      hullRightMesh.castShadow = true;
      modelGroup.add(hullRightMesh);
    } else if (levelId === 2) {
      // PESAWAT KERTAS 3D MODEL
      const jetGeo = new THREE.BufferGeometry();
      const jetVerts = new Float32Array([
        // Nose to left wingtip
        0, 0.1, 1.8,
        -1.8, 0.3, -1.2,
        0, 0, -1.0,

        // Nose to right wingtip
        0, 0.1, 1.8,
        0, 0, -1.0,
        1.8, 0.3, -1.2,

        // Keel / Fuselage bottom left
        0, 0.1, 1.8,
        0, -0.7, -0.8,
        0, 0, -1.0,

        // Wing edges
        -1.8, 0.3, -1.2,
        -1.8, 0.6, -1.1,
        0, 0, -1.0,

        1.8, 0.3, -1.2,
        0, 0, -1.0,
        1.8, 0.6, -1.1,
      ]);
      jetGeo.setAttribute('position', new THREE.BufferAttribute(jetVerts, 3));
      jetGeo.computeVertexNormals();
      const jetMesh = new THREE.Mesh(jetGeo, paperMat);
      jetMesh.castShadow = true;
      modelGroup.add(jetMesh);
    } else if (levelId === 3) {
      // IKAN ORIGAMI 3D MODEL
      const fishBodyGeo = new THREE.BufferGeometry();
      const fishVerts = new Float32Array([
        // Head / Nose
        -1.5, 0, 0,
        0, 0.8, 0.4,
        0, -0.7, 0.4,

        -1.5, 0, 0,
        0, -0.7, -0.4,
        0, 0.8, -0.4,

        // Back body
        0, 0.8, 0.4,
        1.2, 0, 0.1,
        0, -0.7, 0.4,

        0, 0.8, -0.4,
        0, -0.7, -0.4,
        1.2, 0, -0.1,

        // Upper tail fin
        1.2, 0, 0,
        2.2, 0.9, 0.2,
        1.8, 0, 0,

        // Lower tail fin
        1.2, 0, 0,
        1.8, 0, 0,
        2.2, -0.9, -0.2,

        // Pectoral fin
        -0.3, -0.2, 0.4,
        0.3, -0.6, 0.9,
        0.3, -0.1, 0.4,

        -0.3, -0.2, -0.4,
        0.3, -0.1, -0.4,
        0.3, -0.6, -0.9,
      ]);
      fishBodyGeo.setAttribute('position', new THREE.BufferAttribute(fishVerts, 3));
      fishBodyGeo.computeVertexNormals();
      const fishMesh = new THREE.Mesh(fishBodyGeo, paperMat);
      fishMesh.castShadow = true;
      modelGroup.add(fishMesh);

      // Eye beads
      const eyeGeo = new THREE.SphereGeometry(0.09, 12, 12);
      const eyeMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.1 });
      const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
      leftEye.position.set(-0.8, 0.2, 0.32);
      modelGroup.add(leftEye);

      const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
      rightEye.position.set(-0.8, 0.2, -0.32);
      modelGroup.add(rightEye);
    } else {
      // BUNGA TULIP ORIGAMI 3D MODEL
      // Petals (4 folded quadrants)
      const petalGeo = new THREE.BufferGeometry();
      const petalVerts = new Float32Array([
        // Front Petal
        0, -0.4, 0,
        -0.7, 0.6, 0.6,
        0, 1.2, 0.8,

        0, -0.4, 0,
        0, 1.2, 0.8,
        0.7, 0.6, 0.6,

        // Back Petal
        0, -0.4, 0,
        0, 1.2, -0.8,
        -0.7, 0.6, -0.6,

        0, -0.4, 0,
        0.7, 0.6, -0.6,
        0, 1.2, -0.8,

        // Left Petal
        0, -0.4, 0,
        -0.8, 1.2, 0,
        -0.6, 0.6, 0.7,

        0, -0.4, 0,
        -0.6, 0.6, -0.7,
        -0.8, 1.2, 0,

        // Right Petal
        0, -0.4, 0,
        0.6, 0.6, 0.7,
        0.8, 1.2, 0,

        0, -0.4, 0,
        0.8, 1.2, 0,
        0.6, 0.6, -0.7,
      ]);
      petalGeo.setAttribute('position', new THREE.BufferAttribute(petalVerts, 3));
      petalGeo.computeVertexNormals();
      const tulipHead = new THREE.Mesh(petalGeo, paperMat);
      tulipHead.castShadow = true;
      modelGroup.add(tulipHead);

      // Stem (Cylinder)
      const stemGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.8, 8);
      const stemMesh = new THREE.Mesh(stemGeo, stemMat);
      stemMesh.position.set(0, -1.2, 0);
      stemMesh.castShadow = true;
      modelGroup.add(stemMesh);

      // Folded Leaf
      const leafGeo = new THREE.BufferGeometry();
      const leafVerts = new Float32Array([
        0, -1.4, 0,
        0.6, -0.6, 0.3,
        0, -0.7, 0,

        0, -1.4, 0,
        0, -0.7, 0,
        -0.6, -0.6, -0.3,
      ]);
      leafGeo.setAttribute('position', new THREE.BufferAttribute(leafVerts, 3));
      leafGeo.computeVertexNormals();
      const leafMesh = new THREE.Mesh(leafGeo, stemMat);
      leafMesh.castShadow = true;
      modelGroup.add(leafMesh);
    }

    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const newW = containerRef.current.clientWidth;
      const newH = containerRef.current.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // Render loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (autoRotate && modelGroup) {
        modelGroup.rotation.y += 0.01;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [levelId, primaryColor, autoRotate]);

  // Handle pointer drag rotation
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    prevPosRef.current = { x: e.clientX, y: e.clientY };
    setAutoRotate(false);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !modelGroupRef.current) return;
    const dx = e.clientX - prevPosRef.current.x;
    const dy = e.clientY - prevPosRef.current.y;
    prevPosRef.current = { x: e.clientX, y: e.clientY };

    modelGroupRef.current.rotation.y += dx * 0.012;
    modelGroupRef.current.rotation.x = Math.max(-0.8, Math.min(0.8, modelGroupRef.current.rotation.x + dy * 0.012));
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handleZoom = (delta: number) => {
    if (!cameraRef.current) return;
    const newZoom = Math.max(0.6, Math.min(1.8, zoomLevel + delta));
    setZoomLevel(newZoom);
    cameraRef.current.position.z = 6 / newZoom;
    cameraRef.current.position.y = 3 / newZoom;
  };

  const handleResetCamera = () => {
    if (!modelGroupRef.current || !cameraRef.current) return;
    modelGroupRef.current.rotation.set(0, 0, 0);
    cameraRef.current.position.set(0, 3, 6);
    setZoomLevel(1);
    setAutoRotate(true);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-radial from-white to-slate-100 rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-200/80">
      {/* 3D WebGL Canvas */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      />

      {/* Header Overlay */}
      <div className="absolute top-4 left-6 bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-slate-200">
        <div className="text-xs font-bold text-red-600 uppercase tracking-wider">Hasil Karya 3D</div>
        <div className="text-2xl font-black text-slate-900">{artName}</div>
        <div className="text-sm font-semibold text-slate-600">Kategori: {category}</div>
      </div>

      {/* IFP Floating 3D Controls */}
      <div className="absolute bottom-5 right-6 flex items-center gap-2.5 bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-2xl border border-slate-200">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`px-4 py-2.5 rounded-xl font-bold text-base flex items-center gap-2 transition-all ${
            autoRotate
              ? 'bg-red-600 text-white shadow-md shadow-red-500/30'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
          aria-label={autoRotate ? 'Jeda Putar Otomatis' : 'Putar Otomatis'}
        >
          <RotateCw className={`w-5 h-5 ${autoRotate ? 'animate-spin' : ''}`} />
          {autoRotate ? 'Memutar' : 'Putar'}
        </button>

        <button
          onClick={() => handleZoom(0.2)}
          className="p-2.5 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 rounded-xl"
          aria-label="Perbesar Tampilan 3D"
        >
          <ZoomIn className="w-6 h-6" />
        </button>

        <button
          onClick={() => handleZoom(-0.2)}
          className="p-2.5 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 rounded-xl"
          aria-label="Perkecil Tampilan 3D"
        >
          <ZoomOut className="w-6 h-6" />
        </button>

        <button
          onClick={handleResetCamera}
          className="p-2.5 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 rounded-xl"
          aria-label="Atur Ulang Posisi Kamera"
        >
          <RefreshCw className="w-6 h-6" />
        </button>
      </div>

      {/* Guidance badge */}
      <div className="absolute bottom-5 left-6 bg-slate-900/80 backdrop-blur-md text-white text-sm font-medium px-4 py-2 rounded-xl pointer-events-none flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
        Sentuh dan geser layar untuk mengamati dari seluruh sudut (360°)
      </div>
    </div>
  );
};
