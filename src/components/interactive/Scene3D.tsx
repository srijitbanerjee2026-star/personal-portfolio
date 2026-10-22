"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// ============================================================================
// RELATIVISTIC 4D-PERSPECTIVE GARGANTAUA SHADER ENGINE
// ============================================================================
const GargantuaShader = {
  uniforms: {
    uTime: { value: 0 },
    uTiltAngle: { value: 0 },
    uShockwave: { value: 0 },
    uColorHot: { value: new THREE.Color("#FFFDF5") },   // Thermal core white
    uColorGold: { value: new THREE.Color("#D4AF37") },  // Relativistic gold
    uColorMid: { value: new THREE.Color("#E65100") },   // Plasma orange
    uColorOuter: { value: new THREE.Color("#2E0200") }, // Deep falloff red
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vWorldPosition;
    varying vec3 vNormal;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform float uTiltAngle;
    uniform float uShockwave;
    uniform vec3 uColorHot;
    uniform vec3 uColorGold;
    uniform vec3 uColorMid;
    uniform vec3 uColorOuter;

    varying vec2 vUv;
    varying vec3 vWorldPosition;
    varying vec3 vNormal;

    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                         -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + vec4(C.xx, C.zz);
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
            + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m;
      m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 st = vUv * 2.0 - 1.0;
      float radius = length(st);
      float angle = atan(st.y, st.x);

      if (radius < 0.31 || radius > 0.98) discard;

      float speed = 0.85 / (radius * radius + 0.12);
      float rotatedAngle = angle + uTime * speed + uTiltAngle * 0.2;

      vec2 noiseCoord = vec2(radius * 7.5, rotatedAngle * 3.2);
      float noiseVal = snoise(noiseCoord) * 0.5 + 0.5;
      noiseVal += snoise(noiseCoord * 2.5 + vec2(uTime * 0.35)) * 0.25;

      if (uShockwave > 0.001) {
        float waveDist = abs(radius - (0.33 + uShockwave * 0.65));
        float waveIntensity = exp(-waveDist * 18.0) * (1.0 - uShockwave) * 0.8;
        noiseVal += waveIntensity;
      }

      float normR = (radius - 0.31) / (0.98 - 0.31);
      float density = smoothstep(0.0, 0.14, normR) * (1.0 - smoothstep(0.42, 1.0, normR));
      density *= (0.7 + 0.35 * noiseVal);

      float dopplerFactor = sin(angle - 0.25) * 0.24 + 1.0;
      density *= dopplerFactor;

      vec3 color = mix(uColorHot, uColorGold, smoothstep(0.0, 0.2, normR));
      color = mix(color, uColorMid, smoothstep(0.2, 0.55, normR));
      color = mix(color, uColorOuter, smoothstep(0.55, 1.0, normR));

      gl_FragColor = vec4(color * density * 1.55, density * 0.72);
    }
  `,
};

interface Scene3DProps {
  scrollProgress?: number;
  onInteracted?: () => void;
}

export default function Scene3D({ scrollProgress = 0, onInteracted }: Scene3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(scrollProgress);
  const shockwaveRef = useRef(0);

  const [webglSupported] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      const testCanvas = document.createElement("canvas");
      return !!(testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl"));
    } catch {
      return false;
    }
  });

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    if (!webglSupported) return;
    const container = mountRef.current;
    if (!container) return;

    // ------------------------------------------------------------------------
    // 1. SCENE & CAMERA SETUP
    // ------------------------------------------------------------------------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.25, 6.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // Master system group containing black hole
    const systemGroup = new THREE.Group();
    scene.add(systemGroup);

    // ------------------------------------------------------------------------
    // 2. CORE HORIZON & EINSTEIN RING ARC
    // ------------------------------------------------------------------------
    const coreGeo = new THREE.SphereGeometry(1.0, 64, 64);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    systemGroup.add(coreMesh);

    // Lensing Photon Halo Ring
    const ringGeo = new THREE.SphereGeometry(1.045, 64, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xffcc33,
      transparent: true,
      opacity: 0.32,
      side: THREE.BackSide,
    });
    const photonRing = new THREE.Mesh(ringGeo, ringMat);
    systemGroup.add(photonRing);

    // Inner glowing atmospheric corona
    const coronaGeo = new THREE.SphereGeometry(1.12, 48, 48);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0xff5500,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
    });
    const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
    systemGroup.add(coronaMesh);

    // ------------------------------------------------------------------------
    // 3. ACCRETION DISK & LENSED ARCS
    // ------------------------------------------------------------------------
    const diskGeo = new THREE.RingGeometry(1.04, 3.75, 160, 1);
    const diskShaderMat = new THREE.ShaderMaterial({
      vertexShader: GargantuaShader.vertexShader,
      fragmentShader: GargantuaShader.fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uTiltAngle: { value: 0 },
        uShockwave: { value: 0 },
        uColorHot: { value: new THREE.Color("#FFFDF5") },
        uColorGold: { value: new THREE.Color("#D4AF37") },
        uColorMid: { value: new THREE.Color("#E65100") },
        uColorOuter: { value: new THREE.Color("#350300") },
      },
      side: THREE.DoubleSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const mainDisk = new THREE.Mesh(diskGeo, diskShaderMat);
    mainDisk.rotation.x = Math.PI / 2.25;
    systemGroup.add(mainDisk);

    const lensedShaderMat = diskShaderMat.clone();
    const lensedDisk = new THREE.Mesh(diskGeo, lensedShaderMat);
    lensedDisk.scale.set(0.92, 0.92, 0.92);
    systemGroup.add(lensedDisk);

    // ------------------------------------------------------------------------
    // 4. PARTICLES & STAR FIELD
    // ------------------------------------------------------------------------
    const particleCount = 2000;
    const particleGeo = new THREE.BufferGeometry();
    const pos = new Float32Array(particleCount * 3);
    const cols = new Float32Array(particleCount * 3);

    const cWhite = new THREE.Color("#FFFDF5");
    const cGold = new THREE.Color("#D4AF37");
    const cRed = new THREE.Color("#7F1D1D");

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.08 + Math.random() * 3.4;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 0.14;

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      const norm = (radius - 1.08) / 3.4;
      const col = radius < 1.8 ? cWhite.clone().lerp(cGold, norm) : cGold.clone().lerp(cRed, norm);

      cols[i * 3] = col.r;
      cols[i * 3 + 1] = col.g;
      cols[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(cols, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.024,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    mainDisk.add(particles);

    // Deep Space Stars
    const starCount = 1000;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      starPos[i] = (Math.random() - 0.5) * 140;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.12,
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
    });
    scene.add(new THREE.Points(starGeo, starMat));

    // ------------------------------------------------------------------------
    // 5. STAGE 3: BINARY STELLAR COLLISION & SUPERNOVA BURST ENGINE
    // Two binary stars that spiral inward, collide at Stage 3, and detonate!
    // ------------------------------------------------------------------------
    const binaryGroup = new THREE.Group();
    scene.add(binaryGroup);

    // Star A (Gold Plasma Star)
    const starAGeo = new THREE.SphereGeometry(0.24, 32, 32);
    const starAMat = new THREE.MeshBasicMaterial({
      color: 0xffb703,
      wireframe: false,
    });
    const starA = new THREE.Mesh(starAGeo, starAMat);
    binaryGroup.add(starA);

    // Star A Atmosphere Glow
    const glowAGeo = new THREE.SphereGeometry(0.38, 32, 32);
    const glowAMat = new THREE.MeshBasicMaterial({
      color: 0xff5400,
      transparent: true,
      opacity: 0.45,
      side: THREE.BackSide,
    });
    const glowA = new THREE.Mesh(glowAGeo, glowAMat);
    starA.add(glowA);

    // Star B (Electric Cyan / White Companion Star)
    const starBGeo = new THREE.SphereGeometry(0.19, 32, 32);
    const starBMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: false,
    });
    const starB = new THREE.Mesh(starBGeo, starBMat);
    binaryGroup.add(starB);

    // Star B Atmosphere Glow
    const glowBGeo = new THREE.SphereGeometry(0.32, 32, 32);
    const glowBMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.45,
      side: THREE.BackSide,
    });
    const glowB = new THREE.Mesh(glowBGeo, glowBMat);
    starB.add(glowB);

    // Supernova Merger Flash Sphere
    const flashGeo = new THREE.SphereGeometry(1.2, 32, 32);
    const flashMat = new THREE.MeshBasicMaterial({
      color: 0xfffdf0,
      transparent: true,
      opacity: 0,
      side: THREE.BackSide,
    });
    const flashMesh = new THREE.Mesh(flashGeo, flashMat);
    binaryGroup.add(flashMesh);

    // Supernova Expansion Ring
    const shockRingGeo = new THREE.RingGeometry(0.1, 0.4, 64);
    const shockRingMat = new THREE.MeshBasicMaterial({
      color: 0xffaa00,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    const shockRing = new THREE.Mesh(shockRingGeo, shockRingMat);
    shockRing.rotation.x = Math.PI / 2;
    binaryGroup.add(shockRing);

    // Supernova Dispersal Spark Particles (1,200 points)
    const sparkCount = 1200;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkPositions = new Float32Array(sparkCount * 3);
    const sparkVelocities = new Float32Array(sparkCount * 3);
    const sparkColors = new Float32Array(sparkCount * 3);

    const cSparkGold = new THREE.Color("#fbbf24");
    const cSparkCyan = new THREE.Color("#38bdf8");

    for (let i = 0; i < sparkCount; i++) {
      // Unit sphere distribution
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random());
      const sinPhi = Math.sin(phi);

      const vx = r * sinPhi * Math.cos(theta);
      const vy = r * sinPhi * Math.sin(theta);
      const vz = r * Math.cos(phi);

      sparkPositions[i * 3] = 0;
      sparkPositions[i * 3 + 1] = 0;
      sparkPositions[i * 3 + 2] = 0;

      sparkVelocities[i * 3] = vx * (1.8 + Math.random() * 2.5);
      sparkVelocities[i * 3 + 1] = vy * (1.8 + Math.random() * 2.5);
      sparkVelocities[i * 3 + 2] = vz * (1.8 + Math.random() * 2.5);

      const col = Math.random() > 0.5 ? cSparkGold : cSparkCyan;
      sparkColors[i * 3] = col.r;
      sparkColors[i * 3 + 1] = col.g;
      sparkColors[i * 3 + 2] = col.b;
    }

    sparkGeo.setAttribute("position", new THREE.BufferAttribute(sparkPositions, 3));
    sparkGeo.setAttribute("color", new THREE.BufferAttribute(sparkColors, 3));

    const sparkMat = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    const sparkPoints = new THREE.Points(sparkGeo, sparkMat);
    binaryGroup.add(sparkPoints);

    // ------------------------------------------------------------------------
    // 6. STAGE 4: COMPUTATIONAL NEURAL NODE MATRIX
    // ------------------------------------------------------------------------
    const nodeCount = 400;
    const nodeGeo = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i++) {
      nodePositions[i * 3] = (Math.random() - 0.5) * 8.0;
      nodePositions[i * 3 + 1] = (Math.random() - 0.5) * 4.5;
      nodePositions[i * 3 + 2] = (Math.random() - 0.5) * 4.0;
    }
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));
    const nodeMat = new THREE.PointsMaterial({
      size: 0.045,
      color: 0xd4af37,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    const neuralNodes = new THREE.Points(nodeGeo, nodeMat);
    scene.add(neuralNodes);

    // ------------------------------------------------------------------------
    // 7. POINTER & DRAG CONTROLS
    // ------------------------------------------------------------------------
    let targetRotY = 0;
    let targetRotX = 0;
    let currentRotY = 0;
    let currentRotX = 0;

    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;

      if (isDragging) {
        const deltaX = e.clientX - previousPointerX;
        const deltaY = e.clientY - previousPointerY;
        targetRotY += deltaX * 0.006;
        targetRotX += deltaY * 0.006;
      } else {
        targetRotY = normX * 0.42;
        targetRotX = normY * 0.28;
      }

      previousPointerX = e.clientX;
      previousPointerY = e.clientY;
    };

    const handlePointerDown = (e: MouseEvent) => {
      isDragging = true;
      previousPointerX = e.clientX;
      previousPointerY = e.clientY;
      shockwaveRef.current = 0.01;
      if (onInteracted) onInteracted();
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const deltaX = touch.clientX - previousPointerX;
        const deltaY = touch.clientY - previousPointerY;
        targetRotY += deltaX * 0.006;
        targetRotX += deltaY * 0.006;
        previousPointerX = touch.clientX;
        previousPointerY = touch.clientY;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        previousPointerX = e.touches[0].clientX;
        previousPointerY = e.touches[0].clientY;
        shockwaveRef.current = 0.01;
      }
    };

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mouseup", handlePointerUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // ------------------------------------------------------------------------
    // 8. MULTI-STAGE COSMIC ANIMATION LOOP
    // ------------------------------------------------------------------------
    let animId: number;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;
      const p = scrollRef.current; // 0.0 to 1.0

      // Accretion shockwave animation
      if (shockwaveRef.current > 0) {
        shockwaveRef.current += 0.018;
        if (shockwaveRef.current > 1.0) shockwaveRef.current = 0;
      }

      // Update shader uniforms
      diskShaderMat.uniforms.uTime.value = elapsed;
      diskShaderMat.uniforms.uTiltAngle.value = currentRotX;
      diskShaderMat.uniforms.uShockwave.value = shockwaveRef.current;

      lensedShaderMat.uniforms.uTime.value = elapsed * 0.88;
      lensedShaderMat.uniforms.uTiltAngle.value = currentRotY;
      lensedShaderMat.uniforms.uShockwave.value = shockwaveRef.current;

      // Particle rotation
      particles.rotation.y = elapsed * 0.14;

      // Lerp pointer inertia
      currentRotY = THREE.MathUtils.lerp(currentRotY, targetRotY, 0.05);
      currentRotX = THREE.MathUtils.lerp(currentRotX, targetRotX, 0.05);

      systemGroup.rotation.y = currentRotY;
      systemGroup.rotation.x = currentRotX;

      // ----------------------------------------------------------------------
      // STAGE 1 & 2: ZOOMING TOWARD SINGULARITY / WARP TRANSIT
      // ----------------------------------------------------------------------
      const targetZ = 6.2 - p * 3.6;
      const targetY = 0.25 - p * 0.9;
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.08);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.08);
      camera.lookAt(0, -p * 0.45, 0);

      // Black hole scales gently with scroll depth
      const targetScale = Math.max(1.0 - p * 0.25, 0.65);
      systemGroup.scale.set(targetScale, targetScale, targetScale);

      // ----------------------------------------------------------------------
      // STAGE 3: BINARY STAR SPIRAL & SUPERNOVA COLLISION (p: 0.28 to 0.65)
      // ----------------------------------------------------------------------
      if (p >= 0.22 && p <= 0.72) {
        binaryGroup.visible = true;
        binaryGroup.position.set(0, -0.2 - (p - 0.35) * 1.5, 1.2);

        // Pre-collision spiral (0.24 to 0.46)
        if (p < 0.46) {
          const spiralProgress = (p - 0.22) / 0.24; // 0 -> 1
          const orbitRadius = (1.0 - spiralProgress) * 2.8 + 0.12;
          const orbitSpeed = elapsed * (3.0 + spiralProgress * 14.0); // accelerates rapidly!

          starA.visible = true;
          starB.visible = true;
          starA.position.set(
            Math.cos(orbitSpeed) * orbitRadius,
            Math.sin(orbitSpeed * 0.7) * 0.35,
            Math.sin(orbitSpeed) * orbitRadius
          );
          starB.position.set(
            -Math.cos(orbitSpeed) * orbitRadius,
            -Math.sin(orbitSpeed * 0.7) * 0.35,
            -Math.sin(orbitSpeed) * orbitRadius
          );

          flashMat.opacity = 0;
          shockRingMat.opacity = 0;
          sparkMat.opacity = 0;
        } else {
          // COLLISION MERGER & SUPERNOVA EXPANSION (p >= 0.46)
          const burstProgress = Math.min((p - 0.46) / 0.18, 1.0); // 0 -> 1

          starA.visible = burstProgress < 0.2;
          starB.visible = burstProgress < 0.2;

          // Flash intensity peak then fade
          flashMat.opacity = Math.max((1.0 - burstProgress) * 0.9, 0);
          const flashScale = 0.5 + burstProgress * 3.5;
          flashMesh.scale.set(flashScale, flashScale, flashScale);

          // Expanding shockwave ring
          shockRingMat.opacity = Math.max((1.0 - burstProgress) * 0.75, 0);
          const ringScale = 0.2 + burstProgress * 5.0;
          shockRing.scale.set(ringScale, ringScale, ringScale);

          // Exploding supernova spark particles
          sparkMat.opacity = Math.max((1.0 - burstProgress * 0.8) * 0.85, 0);
          const currentPositions = sparkGeo.attributes.position.array as Float32Array;
          for (let i = 0; i < sparkCount; i++) {
            currentPositions[i * 3] = sparkVelocities[i * 3] * burstProgress * 2.8;
            currentPositions[i * 3 + 1] = sparkVelocities[i * 3 + 1] * burstProgress * 2.8;
            currentPositions[i * 3 + 2] = sparkVelocities[i * 3 + 2] * burstProgress * 2.8;
          }
          sparkGeo.attributes.position.needsUpdate = true;
        }
      } else {
        binaryGroup.visible = false;
      }

      // ----------------------------------------------------------------------
      // STAGE 4: COMPUTATIONAL NEURAL LATTICE (p >= 0.60)
      // ----------------------------------------------------------------------
      if (p >= 0.58) {
        const latticeOpacity = Math.min((p - 0.58) / 0.15, 0.45);
        nodeMat.opacity = latticeOpacity;
        neuralNodes.rotation.y = elapsed * 0.08;
        neuralNodes.rotation.x = Math.sin(elapsed * 0.1) * 0.05;
      } else {
        nodeMat.opacity = 0;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      diskGeo.dispose();
      coreGeo.dispose();
      ringGeo.dispose();
      particleGeo.dispose();
      starGeo.dispose();
      starAGeo.dispose();
      starBGeo.dispose();
      flashGeo.dispose();
      shockRingGeo.dispose();
      sparkGeo.dispose();
      nodeGeo.dispose();
      if (container) container.innerHTML = "";
    };
  }, [onInteracted, webglSupported]);

  if (!webglSupported) {
    return (
      <div className="fixed inset-0 z-0 bg-[#020204] flex items-center justify-center">
        <div className="relative w-72 h-72 rounded-full bg-gradient-to-r from-orange-600 via-amber-500 to-black animate-pulse shadow-[0_0_120px_rgba(255,100,0,0.6)]">
          <div className="absolute inset-4 rounded-full bg-black shadow-inner" />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 bg-[#020204] cursor-grab active:cursor-grabbing"
      title="Click and drag to orbit the black hole"
    />
  );
}