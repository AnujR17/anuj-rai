import * as THREE from "three";
import { compositions, release, strands } from "./skein-geometry";

export function createSkeinRenderer(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, preserveDrawingBuffer: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-267, 267, 200, -200, 1, 1400);
  camera.position.set(0, 300, 560);
  camera.lookAt(0, 15, 0);

  scene.add(new THREE.HemisphereLight(0xfffff5, 0x688073, 2.6));
  const sun = new THREE.DirectionalLight(0xfff7e8, 3.6);
  sun.position.set(-180, 420, 160);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.left = -320; sun.shadow.camera.right = 320;
  sun.shadow.camera.top = 260; sun.shadow.camera.bottom = -260;
  sun.shadow.camera.near = 1; sun.shadow.camera.far = 1000;
  sun.shadow.normalBias = .35;
  sun.shadow.bias = -.00008;
  sun.shadow.radius = 3;
  scene.add(sun);
  const fill = new THREE.DirectionalLight(0xf0f7ff, 1.8);
  fill.position.set(150, 110, -200);
  scene.add(fill);

  const floorGeometry = new THREE.PlaneGeometry(1800, 1800);
  const floorMaterial = new THREE.ShadowMaterial({ color: 0x3d5141, opacity: .22 });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  const bundle = new THREE.Group();
  scene.add(bundle);
  const meshes = strands.map((strand, i) => {
    const curve = (points: typeof compositions[number]["closed"]) => new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)), false, "centripetal");
    const closed = new THREE.TubeGeometry(curve(compositions[i].closed), 180, strand.radius, 8, false);
    const opened = new THREE.TubeGeometry(curve(compositions[i].open), 180, strand.radius, 8, false);
    closed.morphAttributes.position = [opened.getAttribute("position").clone()];
    closed.morphAttributes.normal = [opened.getAttribute("normal").clone()];
    closed.computeBoundingSphere();
    opened.dispose();
    const material = new THREE.MeshStandardMaterial({ color: strand.color, metalness: .48, roughness: .3 });
    const mesh = new THREE.Mesh(closed, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.frustumCulled = false;
    bundle.add(mesh);
    return mesh;
  });

  return {
    resize(width: number, height: number) {
      renderer.setSize(width, height, false);
      const halfWidth = 200 * width / height;
      camera.left = -halfWidth; camera.right = halfWidth;
      camera.updateProjectionMatrix();
    },
    render(progress: number, x: number, y: number) {
      meshes.forEach((mesh, i) => { mesh.morphTargetInfluences![0] = release(i, progress); });
      bundle.rotation.y = x * .055;
      bundle.rotation.x = y * .025;
      renderer.render(scene, camera);
    },
    dispose() {
      meshes.forEach(mesh => { mesh.geometry.dispose(); mesh.material.dispose(); });
      floorGeometry.dispose(); floorMaterial.dispose();
      sun.shadow.map?.dispose();
      renderer.dispose(); renderer.forceContextLoss();
    },
  };
}
