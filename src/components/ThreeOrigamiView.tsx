import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrigamiStep } from '../types';
import { soundFX } from '../utils/audio';

interface ThreeOrigamiViewProps {
  step: OrigamiStep;
  paperColor: string;
  paperBackFaceColor: string;
  isSlowMotion: boolean;
  onAnimationEnd?: () => void;
  foldProgress: number; // 0 to 1
  setFoldProgress: React.Dispatch<React.SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ThreeOrigamiView: React.FC<ThreeOrigamiViewProps> = ({
  step,
  paperColor,
  paperBackFaceColor,
  isSlowMotion,
  foldProgress,
  setFoldProgress,
  isPlaying,
  setIsPlaying,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // Mesh references
  const stationaryMeshRef = useRef<THREE.Mesh | null>(null);
  const foldingGroupRef = useRef<THREE.Group | null>(null);
  const creaseLineRef = useRef<THREE.Line | null>(null);
  const arrowGroupRef = useRef<THREE.Group | null>(null);
  const markersGroupRef = useRef<THREE.Group | null>(null);

  // Drag rotation state
  const isDraggingRef = useRef(false);
  const prevMousePosRef = useRef({ x: 0, y: 0 });
  const sceneRotationRef = useRef({ x: 0.35, y: -0.2 });

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth || 600;
    const height = containerRef.current.clientHeight || 420;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfbfbfb);
    sceneRef.current = scene;

    // 2. Camera (Isometric high angle)
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 4.5, 6.5);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 3. Renderer with soft shadows
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.95);
    dirLight.position.set(4, 8, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 25;
    dirLight.shadow.bias = -0.001;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xffedd5, 0.4);
    fillLight.position.set(-4, 3, -3);
    scene.add(fillLight);

    // 5. Floor Shadow receiver
    const shadowGeo = new THREE.PlaneGeometry(10, 10);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.15 });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -0.05;
    shadowMesh.receiveShadow = true;
    scene.add(shadowMesh);

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const newW = containerRef.current.clientWidth;
      const newH = containerRef.current.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (scene) {
        // Apply user drag rotation
        scene.rotation.x = sceneRotationRef.current.x;
        scene.rotation.y = sceneRotationRef.current.y;
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
  }, []);

  // Build origami step geometry and visual indicators
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Clean up previous step objects
    if (stationaryMeshRef.current) scene.remove(stationaryMeshRef.current);
    if (foldingGroupRef.current) scene.remove(foldingGroupRef.current);
    if (creaseLineRef.current) scene.remove(creaseLineRef.current);
    if (arrowGroupRef.current) scene.remove(arrowGroupRef.current);
    if (markersGroupRef.current) scene.remove(markersGroupRef.current);

    const baseColorNum = new THREE.Color(paperColor);
    const backColorNum = new THREE.Color(paperBackFaceColor);

    // Material with subtle paper sheen
    const paperFrontMat = new THREE.MeshStandardMaterial({
      color: baseColorNum,
      roughness: 0.65,
      metalness: 0.05,
      side: THREE.FrontSide,
    });

    const paperBackMat = new THREE.MeshStandardMaterial({
      color: backColorNum,
      roughness: 0.75,
      metalness: 0.02,
      side: THREE.BackSide,
    });

    // Helper to create dual-sided paper mesh with slight thickness
    const createPaperPiece = (geom: THREE.BufferGeometry) => {
      const group = new THREE.Group();

      const frontMesh = new THREE.Mesh(geom, paperFrontMat);
      frontMesh.castShadow = true;
      frontMesh.receiveShadow = true;

      const backMesh = new THREE.Mesh(geom, paperBackMat);
      backMesh.castShadow = true;
      backMesh.receiveShadow = true;

      group.add(frontMesh);
      group.add(backMesh);
      return group;
    };

    // Construct geometry depending on step config
    const size = 2.4;
    const half = size / 2;
    const { creaseAxis } = step.meshConfig;

    // Base stationary half & Folding half
    let statGeo: THREE.BufferGeometry;
    let foldGeo: THREE.BufferGeometry;

    if (creaseAxis === 'horizontal') {
      // Split horizontally at y = 0
      statGeo = new THREE.PlaneGeometry(size, half);
      statGeo.translate(0, half / 2, 0);

      foldGeo = new THREE.PlaneGeometry(size, half);
      foldGeo.translate(0, -half / 2, 0);
    } else if (creaseAxis === 'vertical') {
      // Split vertically at x = 0
      statGeo = new THREE.PlaneGeometry(half, size);
      statGeo.translate(half / 2, 0, 0);

      foldGeo = new THREE.PlaneGeometry(half, size);
      foldGeo.translate(-half / 2, 0, 0);
    } else if (creaseAxis === 'diagonal_main' || creaseAxis === 'diagonal_anti') {
      // Triangular fold along diagonal
      const shapeStat = new THREE.Shape();
      shapeStat.moveTo(-half, -half);
      shapeStat.lineTo(half, half);
      shapeStat.lineTo(half, -half);
      shapeStat.closePath();
      statGeo = new THREE.ShapeGeometry(shapeStat);

      const shapeFold = new THREE.Shape();
      shapeFold.moveTo(-half, -half);
      shapeFold.lineTo(half, half);
      shapeFold.lineTo(-half, half);
      shapeFold.closePath();
      foldGeo = new THREE.ShapeGeometry(shapeFold);
    } else {
      // General polygonal fold
      statGeo = new THREE.PlaneGeometry(size, half * 1.2);
      statGeo.translate(0, half * 0.4, 0);

      foldGeo = new THREE.PlaneGeometry(size * 0.8, half * 0.8);
      foldGeo.translate(0, -half * 0.4, 0);
    }

    // Lie paper flat on XZ plane
    statGeo.rotateX(-Math.PI / 2);
    foldGeo.rotateX(-Math.PI / 2);

    const statPiece = createPaperPiece(statGeo);
    scene.add(statPiece);
    stationaryMeshRef.current = statPiece as unknown as THREE.Mesh;

    // Folding hinge group
    const foldGroup = new THREE.Group();
    const foldPiece = createPaperPiece(foldGeo);
    foldGroup.add(foldPiece);
    scene.add(foldGroup);
    foldingGroupRef.current = foldGroup;

    // Dashed Crease Line
    const creasePoints = [];
    if (creaseAxis === 'horizontal') {
      creasePoints.push(new THREE.Vector3(-half * 1.05, 0.015, 0));
      creasePoints.push(new THREE.Vector3(half * 1.05, 0.015, 0));
    } else if (creaseAxis === 'vertical') {
      creasePoints.push(new THREE.Vector3(0, 0.015, -half * 1.05));
      creasePoints.push(new THREE.Vector3(0, 0.015, half * 1.05));
    } else {
      creasePoints.push(new THREE.Vector3(-half * 1.05, 0.015, half * 1.05));
      creasePoints.push(new THREE.Vector3(half * 1.05, 0.015, -half * 1.05));
    }

    const lineGeo = new THREE.BufferGeometry().setFromPoints(creasePoints);
    const lineMat = new THREE.LineDashedMaterial({
      color: step.foldType === 'lipatan_gunung' ? 0xdc2626 : 0x2563eb,
      dashSize: 0.12,
      gapSize: 0.08,
      linewidth: 3,
    });
    const creaseLine = new THREE.Line(lineGeo, lineMat);
    creaseLine.computeLineDistances();
    scene.add(creaseLine);
    creaseLineRef.current = creaseLine;

    // Big Red 3D Direction Arrow
    const arrowGroup = new THREE.Group();
    const arrowCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0, 0.1, 0.8),
      new THREE.Vector3(0, 1.2, 0.4),
      new THREE.Vector3(0, 0.35, -0.6)
    );
    const tubeGeo = new THREE.TubeGeometry(arrowCurve, 20, 0.05, 8, false);
    const arrowMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0x991b1b,
      roughness: 0.3,
    });
    const tubeMesh = new THREE.Mesh(tubeGeo, arrowMat);
    arrowGroup.add(tubeMesh);

    // Arrow Cone head
    const coneGeo = new THREE.ConeGeometry(0.16, 0.35, 16);
    const coneMesh = new THREE.Mesh(coneGeo, arrowMat);
    coneMesh.position.set(0, 0.35, -0.6);
    coneMesh.rotation.x = -Math.PI / 1.5;
    arrowGroup.add(coneMesh);
    scene.add(arrowGroup);
    arrowGroupRef.current = arrowGroup;

    // Corner point markers (Titik A and Titik B)
    const markersGroup = new THREE.Group();
    const markerSphereGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const markerMatA = new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xd97706 });
    const markerA = new THREE.Mesh(markerSphereGeo, markerMatA);
    markerA.position.set(-half * 0.8, 0.12, half * 0.8);
    markersGroup.add(markerA);

    const markerMatB = new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x059669 });
    const markerB = new THREE.Mesh(markerSphereGeo, markerMatB);
    markerB.position.set(-half * 0.8, 0.12, -half * 0.8);
    markersGroup.add(markerB);
    scene.add(markersGroup);
    markersGroupRef.current = markersGroup;
  }, [step, paperColor, paperBackFaceColor]);

  // Update folding rotation along foldProgress
  useEffect(() => {
    if (!foldingGroupRef.current) return;
    const { foldAngleStart, foldAngleEnd, creaseAxis } = step.meshConfig;
    const currentAngle = foldAngleStart + (foldAngleEnd - foldAngleStart) * foldProgress;

    // Smooth hinge motion
    if (creaseAxis === 'horizontal') {
      foldingGroupRef.current.rotation.x = -currentAngle;
    } else if (creaseAxis === 'vertical') {
      foldingGroupRef.current.rotation.z = currentAngle;
    } else {
      foldingGroupRef.current.rotation.x = -currentAngle * 0.7;
      foldingGroupRef.current.rotation.z = currentAngle * 0.7;
    }

    // Hide or fade arrow as folding nears completion
    if (arrowGroupRef.current) {
      arrowGroupRef.current.visible = foldProgress < 0.9;
    }
  }, [foldProgress, step]);

  // Animation ticker for auto play
  useEffect(() => {
    if (!isPlaying) return;

    let timer: number;
    const speed = isSlowMotion ? 0.006 : 0.016;

    const tick = () => {
      setFoldProgress((prev) => {
        const next = prev + speed;
        if (next >= 1) {
          setIsPlaying(false);
          soundFX.playFold();
          return 1;
        }
        return next;
      });
      timer = requestAnimationFrame(tick);
    };

    timer = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(timer);
  }, [isPlaying, isSlowMotion, setFoldProgress, setIsPlaying]);

  // Touch and mouse drag handlers for 3D camera rotation
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    prevMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - prevMousePosRef.current.x;
    const dy = e.clientY - prevMousePosRef.current.y;
    prevMousePosRef.current = { x: e.clientX, y: e.clientY };

    sceneRotationRef.current.y += dx * 0.01;
    sceneRotationRef.current.x = Math.max(0.05, Math.min(1.2, sceneRotationRef.current.x + dy * 0.01));
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      className="relative w-full h-full select-none cursor-grab active:cursor-grabbing rounded-2xl overflow-hidden bg-slate-900/5 shadow-inner"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      role="region"
      aria-label="Tampilan Animasi 3D Kertas Origami"
    >
      <div ref={containerRef} className="w-full h-full" />

      {/* Floating 3D Interaction Badge */}
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md text-slate-700 text-sm font-semibold flex items-center gap-1.5 pointer-events-none">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
        Geser layar untuk memutar sudut pandang 3D
      </div>

      {/* Legenda Visual Kertas 3D */}
      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-lg border border-slate-200 text-xs text-slate-700 flex flex-col gap-1.5 max-w-xs pointer-events-none">
        <div className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-red-500 rounded-sm"></span>
          Legenda Teknik Lipatan:
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-1 bg-blue-500 border-dashed border-b-2"></span>
          <span>Garis Putus: Tempat Melipat</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-red-500 font-bold text-sm">➔</span>
          <span>Panah Merah: Arah Melipat</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
          <span>Titik Temu Sudut</span>
        </div>
      </div>
    </div>
  );
};
