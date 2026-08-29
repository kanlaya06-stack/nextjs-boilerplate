function TrueCosmetic3DViewer({ product, darkMode }: { product: typeof initialProducts[0]; darkMode: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const autoRotateRef = useRef(isAutoRotate);
  autoRotateRef.current = isAutoRotate;

  const cardGroupRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);

  useEffect(() => {
    let animationFrameId: number;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationX = 0;
    let targetRotationY = 0;

    const scriptId = 'three-js-cdn';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    const initThree = () => {
      const THREE = (window as any).THREE;
      if (!THREE || !containerRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
      camera.position.set(0, 0, 4.5);
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(renderer.domElement);

      // Light
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0xec4899, 2, 10);
      pointLight.position.set(2, 3, 4);
      scene.add(pointLight);

      const cardGroup = new THREE.Group();
      cardGroupRef.current = cardGroup;
      scene.add(cardGroup);

      const textureLoader = new THREE.TextureLoader();
      textureLoader.setCrossOrigin('anonymous');

      textureLoader.load(
        product.image,
        (texture) => {
          texture.minFilter = THREE.LinearFilter;

          // 1. กระจกแผ่นหน้า (รูปสินค้า)
          const frontGeo = new THREE.PlaneGeometry(1.8, 2.4);
          const frontMat = new THREE.MeshBasicMaterial({ map: texture, side: THREE.FrontSide });
          const frontMesh = new THREE.Mesh(frontGeo, frontMat);
          frontMesh.position.z = 0.06;
          cardGroup.add(frontMesh);

          // 2. ขอบเคสกระจก 3D หนาเว้า
          const boxGeo = new THREE.BoxGeometry(1.85, 2.45, 0.1);
          const boxMat = new THREE.MeshStandardMaterial({
            color: darkMode ? 0x1e293b : 0xf8fafc,
            metalness: 0.8,
            roughness: 0.2,
          });
          const boxMesh = new THREE.Mesh(boxGeo, boxMat);
          cardGroup.add(boxMesh);

          // 3. กรอบทองล้อมรอบ (Gold Border Accent)
          const frameGeo = new THREE.BoxGeometry(1.9, 2.5, 0.08);
          const frameMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.1 });
          const frameMesh = new THREE.Mesh(frameGeo, frameMat);
          frameMesh.position.z = -0.02;
          cardGroup.add(frameMesh);

          setIsLoading(false);
        },
        undefined,
        () => setIsLoading(false)
      );

      const domElem = renderer.domElement;

      const handlePointerDown = (x: number, y: number) => {
        isDragging = true;
        previousMousePosition = { x, y };
      };

      const handlePointerMove = (x: number, y: number) => {
        if (!isDragging) return;
        const deltaX = x - previousMousePosition.x;
        const deltaY = y - previousMousePosition.y;

        targetRotationY += deltaX * 0.01;
        targetRotationX += deltaY * 0.01;

        previousMousePosition = { x, y };
      };

      const handlePointerEnd = () => {
        isDragging = false;
      };

      domElem.addEventListener('mousedown', (e) => handlePointerDown(e.clientX, e.clientY));
      window.addEventListener('mousemove', (e) => handlePointerMove(e.clientX, e.clientY));
      window.addEventListener('mouseup', handlePointerEnd);

      domElem.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
      });
      window.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1) handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      });
      window.addEventListener('touchend', handlePointerEnd);

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        if (cardGroup) {
          if (autoRotateRef.current && !isDragging) {
            targetRotationY += 0.015;
          }

          cardGroup.rotation.y += (targetRotationY - cardGroup.rotation.y) * 0.08;
          cardGroup.rotation.x += (targetRotationX - cardGroup.rotation.x) * 0.08;
        }

        renderer.render(scene, camera);
      };

      animate();
    };

    if ((window as any).THREE) {
      initThree();
    } else {
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.onload = () => initThree();
        document.head.appendChild(script);
      } else {
        script.addEventListener('load', initThree);
      }
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [product, darkMode]);

  const handleResetView = () => {
    if (cardGroupRef.current) {
      cardGroupRef.current.rotation.set(0, 0, 0);
    }
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 0, 4.5);
    }
  };

  const handleZoom = (delta: number) => {
    if (cameraRef.current) {
      cameraRef.current.position.z = Math.max(2.8, Math.min(6.0, cameraRef.current.position.z + delta));
    }
  };

  return (
    <div className="relative w-full h-80 rounded-2xl bg-slate-950/90 border border-pink-500/30 overflow-hidden flex items-center justify-center">
      {isLoading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/90 text-pink-400 gap-3">
          <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs font-semibold">กำลังโหลดแสดงผล 3D Showcase...</span>
        </div>
      )}

      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
        <span className="text-[10px] text-pink-300 bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-md border border-pink-500/20">
          ✨ หมุนดูการ์ด 3D แบบ 360°
        </span>

        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            type="button"
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition backdrop-blur-md border ${
              isAutoRotate
                ? 'bg-pink-600/80 text-white border-pink-400'
                : 'bg-black/60 text-slate-300 border-white/20 hover:text-white'
            }`}
          >
            {isAutoRotate ? '⏸️ หยุดหมุน' : '▶️ หมุน'}
          </button>
          
          <button
            type="button"
            onClick={() => handleZoom(-0.6)}
            className="w-7 h-7 bg-black/60 text-white rounded-lg border border-white/20 flex items-center justify-center text-xs font-bold hover:bg-pink-600 transition"
          >
            +
          </button>

          <button
            type="button"
            onClick={() => handleZoom(0.6)}
            className="w-7 h-7 bg-black/60 text-white rounded-lg border border-white/20 flex items-center justify-center text-xs font-bold hover:bg-pink-600 transition"
          >
            -
          </button>

          <button
            type="button"
            onClick={handleResetView}
            className="px-2.5 py-1 bg-black/60 text-slate-300 rounded-lg border border-white/20 text-xs font-bold hover:text-white transition"
          >
            🎯 รีเซ็ต
          </button>
        </div>
      </div>
    </div>
  );
}