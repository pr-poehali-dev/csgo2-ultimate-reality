import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Game = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [health, setHealth] = useState(100);
  const [ammo, setAmmo] = useState(30);
  const [score, setScore] = useState(0);
  const [isPointerLocked, setIsPointerLocked] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1f2c);
    scene.fog = new THREE.Fog(0x1a1f2c, 10, 50);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.y = 1.6;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xf97316, 0.8);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xf97316, 1, 20);
    pointLight.position.set(0, 5, 0);
    scene.add(pointLight);

    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x2d3748,
      roughness: 0.8,
      metalness: 0.2,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const gridHelper = new THREE.GridHelper(100, 50, 0xf97316, 0x4a5568);
    scene.add(gridHelper);

    const boxes: THREE.Mesh[] = [];
    const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
    const boxMaterial = new THREE.MeshStandardMaterial({
      color: 0x8e9196,
      roughness: 0.7,
      metalness: 0.3,
    });

    for (let i = 0; i < 15; i++) {
      const box = new THREE.Mesh(boxGeometry, boxMaterial);
      box.position.set(
        Math.random() * 40 - 20,
        1,
        Math.random() * 40 - 20
      );
      box.castShadow = true;
      box.receiveShadow = true;
      scene.add(box);
      boxes.push(box);
    }

    const wallGeometry = new THREE.BoxGeometry(50, 5, 1);
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a5568,
      roughness: 0.8,
    });

    const wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
    wall1.position.set(0, 2.5, -25);
    wall1.castShadow = true;
    wall1.receiveShadow = true;
    scene.add(wall1);

    const wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
    wall2.position.set(0, 2.5, 25);
    wall2.castShadow = true;
    wall2.receiveShadow = true;
    scene.add(wall2);

    const wall3 = new THREE.Mesh(wallGeometry, wallMaterial);
    wall3.position.set(-25, 2.5, 0);
    wall3.rotation.y = Math.PI / 2;
    wall3.castShadow = true;
    wall3.receiveShadow = true;
    scene.add(wall3);

    const wall4 = new THREE.Mesh(wallGeometry, wallMaterial);
    wall4.position.set(25, 2.5, 0);
    wall4.rotation.y = Math.PI / 2;
    wall4.castShadow = true;
    wall4.receiveShadow = true;
    scene.add(wall4);

    const weaponGroup = new THREE.Group();
    camera.add(weaponGroup);
    scene.add(camera);

    const weaponGeometry = new THREE.BoxGeometry(0.15, 0.15, 0.8);
    const weaponMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1f2c,
      roughness: 0.3,
      metalness: 0.8,
    });
    const weapon = new THREE.Mesh(weaponGeometry, weaponMaterial);
    weapon.position.set(0.3, -0.3, -0.5);
    weaponGroup.add(weapon);

    const barrelGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.5);
    const barrelMaterial = new THREE.MeshStandardMaterial({
      color: 0x8e9196,
      roughness: 0.2,
      metalness: 0.9,
    });
    const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
    barrel.rotation.x = Math.PI / 2;
    barrel.position.set(0.3, -0.25, -0.75);
    weaponGroup.add(barrel);

    const velocity = new THREE.Vector3();
    const direction = new THREE.Vector3();
    let moveForward = false;
    let moveBackward = false;
    let moveLeft = false;
    let moveRight = false;
    let canJump = true;

    const euler = new THREE.Euler(0, 0, 0, 'YXZ');
    const PI_2 = Math.PI / 2;

    const onMouseMove = (event: MouseEvent) => {
      if (!isPointerLocked) return;

      const movementX = event.movementX || 0;
      const movementY = event.movementY || 0;

      euler.setFromQuaternion(camera.quaternion);
      euler.y -= movementX * 0.002;
      euler.x -= movementY * 0.002;
      euler.x = Math.max(-PI_2, Math.min(PI_2, euler.x));
      camera.quaternion.setFromEuler(euler);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'KeyW':
          moveForward = true;
          break;
        case 'KeyS':
          moveBackward = true;
          break;
        case 'KeyA':
          moveLeft = true;
          break;
        case 'KeyD':
          moveRight = true;
          break;
        case 'Space':
          if (canJump) {
            velocity.y += 8;
            canJump = false;
          }
          break;
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'KeyW':
          moveForward = false;
          break;
        case 'KeyS':
          moveBackward = false;
          break;
        case 'KeyA':
          moveLeft = false;
          break;
        case 'KeyD':
          moveRight = false;
          break;
      }
    };

    const onClick = () => {
      if (!isPointerLocked) {
        renderer.domElement.requestPointerLock();
        return;
      }

      setAmmo((prev) => {
        if (prev <= 0) return prev;

        weapon.position.z -= 0.05;
        setTimeout(() => {
          weapon.position.z += 0.05;
        }, 50);

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
        const intersects = raycaster.intersectObjects(boxes);

        if (intersects.length > 0) {
          const hitBox = intersects[0].object as THREE.Mesh;
          scene.remove(hitBox);
          boxes.splice(boxes.indexOf(hitBox), 1);
          setScore((s) => s + 10);
        }

        return prev - 1;
      });
    };

    const onPointerLockChange = () => {
      setIsPointerLocked(document.pointerLockElement === renderer.domElement);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    document.addEventListener('click', onClick);
    document.addEventListener('pointerlockchange', onPointerLockChange);

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize);

    let prevTime = performance.now();
    const animate = () => {
      requestAnimationFrame(animate);

      const time = performance.now();
      const delta = (time - prevTime) / 1000;

      velocity.x -= velocity.x * 10.0 * delta;
      velocity.z -= velocity.z * 10.0 * delta;
      velocity.y -= 9.8 * 5.0 * delta;

      direction.z = Number(moveForward) - Number(moveBackward);
      direction.x = Number(moveRight) - Number(moveLeft);
      direction.normalize();

      if (moveForward || moveBackward) velocity.z -= direction.z * 40.0 * delta;
      if (moveLeft || moveRight) velocity.x -= direction.x * 40.0 * delta;

      const moveVector = new THREE.Vector3();
      camera.getWorldDirection(moveVector);
      moveVector.y = 0;
      moveVector.normalize();

      const sideVector = new THREE.Vector3();
      sideVector.crossVectors(camera.up, moveVector).normalize();

      camera.position.add(moveVector.multiplyScalar(-velocity.z * delta));
      camera.position.add(sideVector.multiplyScalar(-velocity.x * delta));
      camera.position.y += velocity.y * delta;

      if (camera.position.y < 1.6) {
        velocity.y = 0;
        camera.position.y = 1.6;
        canJump = true;
      }

      camera.position.x = Math.max(-24, Math.min(24, camera.position.x));
      camera.position.z = Math.max(-24, Math.min(24, camera.position.z));

      boxes.forEach((box) => {
        box.rotation.y += 0.005;
      });

      prevTime = time;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
      document.removeEventListener('click', onClick);
      document.removeEventListener('pointerlockchange', onPointerLockChange);
      window.removeEventListener('resize', onWindowResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [isPointerLocked]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div ref={mountRef} className="w-full h-full" />

      {!isPointerLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
          <div className="text-center max-w-md p-8 bg-card border border-border rounded-lg">
            <Icon name="Crosshair" size={64} className="text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">CS:GO 2</h2>
            <p className="text-muted-foreground mb-6">
              Нажми на экран для начала игры
            </p>
            <div className="text-left space-y-2 mb-6 text-sm">
              <p><span className="text-primary font-bold">W, A, S, D</span> - Движение</p>
              <p><span className="text-primary font-bold">Мышь</span> - Обзор</p>
              <p><span className="text-primary font-bold">ЛКМ</span> - Стрелять</p>
              <p><span className="text-primary font-bold">Пробел</span> - Прыжок</p>
              <p><span className="text-primary font-bold">ESC</span> - Выход</p>
            </div>
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="border-primary text-primary"
            >
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              Вернуться на главную
            </Button>
          </div>
        </div>
      )}

      {isPointerLocked && (
        <>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
            <div className="relative w-8 h-8">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-primary"></div>
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary"></div>
            </div>
          </div>

          <div className="absolute top-4 left-4 space-y-2 z-20">
            <div className="bg-background/80 backdrop-blur-sm px-4 py-2 rounded border border-border">
              <div className="flex items-center gap-2">
                <Icon name="Heart" size={20} className="text-primary" />
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${health}%` }}
                  ></div>
                </div>
                <span className="text-sm font-bold">{health}</span>
              </div>
            </div>
            <div className="bg-background/80 backdrop-blur-sm px-4 py-2 rounded border border-border">
              <div className="flex items-center gap-2">
                <Icon name="Zap" size={20} className="text-primary" />
                <span className="text-lg font-bold">{ammo} / 30</span>
              </div>
            </div>
          </div>

          <div className="absolute top-4 right-4 z-20">
            <div className="bg-background/80 backdrop-blur-sm px-4 py-2 rounded border border-border">
              <div className="flex items-center gap-2">
                <Icon name="Target" size={20} className="text-primary" />
                <span className="text-2xl font-bold">{score}</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
            <div className="bg-background/80 backdrop-blur-sm px-4 py-2 rounded border border-border text-sm text-muted-foreground">
              ESC для выхода
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Game;
