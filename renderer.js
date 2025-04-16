const { Scene, WebGLRenderer, PerspectiveCamera, BoxGeometry, MeshBasicMaterial, Mesh } = require('three')

// 初始化场景
const scene = new Scene()
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new WebGLRenderer({
    alpha: true,      // 启用透明度通道
    antialias: true   // 可选抗锯齿
})


const THREE = require('three');

// 添加键盘状态跟踪对象
const keyStates = {
    w: false,
    s: false,
    a: false,
    d: false,
    q: false,
    e: false
};

// 添加移动参数
const movementSpeed = 0.1;
const rotationSpeed = 0.02;

// 初始化立方体（修改原有代码）
let cube; // 将 cube 声明提升到全局作用域

// 键盘事件监听
window.addEventListener('keydown', (e) => {
    switch(e.key.toLowerCase()) {
        case 'w': keyStates.w = true; break;
        case 's': keyStates.s = true; break;
        case 'a': keyStates.a = true; break;
        case 'd': keyStates.d = true; break;
        case 'q': keyStates.q = true; break;
        case 'e': keyStates.e = true; break;
    }
});

window.addEventListener('keyup', (e) => {
    switch(e.key.toLowerCase()) {
        case 'w': keyStates.w = false; break;
        case 's': keyStates.s = false; break;
        case 'a': keyStates.a = false; break;
        case 'd': keyStates.d = false; break;
        case 'q': keyStates.q = false; break;
        case 'e': keyStates.e = false; break;
    }
});

// 设置渲染器尺寸
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// 创建立方体
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    shininess: 100
});

cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 添加基础光照（重要！）
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);


camera.position.z = 5



// 动画循环
let lastCubeX = 0;
let lastCubeY = 0;

function animate() {
    requestAnimationFrame(animate);

    // 保存当前帧位置
    const currentX = cube.position.x;
    const currentY = cube.position.y;

    // 处理立方体移动
    cube.rotation.x += rotationSpeed;
    cube.rotation.y += rotationSpeed;

    if(keyStates.q) cube.position.z -= movementSpeed;
    if(keyStates.e) cube.position.z += movementSpeed;
    if(keyStates.a) cube.position.x -= movementSpeed;
    if(keyStates.d) cube.position.x += movementSpeed;
    if(keyStates.w) cube.position.y += movementSpeed;
    if(keyStates.s) cube.position.y -= movementSpeed;

    // 计算位移差
    const deltaX = cube.position.x - lastCubeX;
    const deltaY = cube.position.y - lastCubeY;

    // 同步地图参数
    if (window.amap) {
        // 调整旋转角度（X轴位移影响rotation）
        const currentRotation = window.amap.getRotation();
        const newRotation = currentRotation - deltaX * 0.5; // 灵敏度系数0.5
        window.amap.setRotation(newRotation);

        // 调整俯仰角（Y轴位移影响pitch）
        const currentPitch = window.amap.getPitch();
        const newPitch = currentPitch + deltaY * 0.5;
        window.amap.setPitch(Math.max(30, Math.min(80, newPitch)));
    }

    // 更新上一帧位置
    lastCubeX = cube.position.x;
    lastCubeY = cube.position.y;

    renderer.render(scene, camera);
}


// 处理窗口大小变化
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})

animate()
