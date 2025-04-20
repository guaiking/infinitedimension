// const { Scene, WebGLRenderer, PerspectiveCamera, BoxGeometry, MeshBasicMaterial, Mesh } = require('three')
//
// // 初始化场景
// const scene = new Scene()
// const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
// const renderer = new WebGLRenderer({
//     alpha: true,      // 启用透明度通道
//     antialias: true   // 可选抗锯齿
// })
//
//
// const THREE = require('three');
//
// // 添加键盘状态跟踪对象
// const keyStates = {
//     w: false,
//     s: false,
//     a: false,
//     d: false,
//     q: false,
//     e: false
// };
//
// // 添加移动参数
// const movementSpeed = 0.1;
// const rotationSpeed = 0.02;
//
// // 初始化立方体（修改原有代码）
// let cube; // 将 cube 声明提升到全局作用域
//
// // 键盘事件监听
// window.addEventListener('keydown', (e) => {
//     switch(e.key.toLowerCase()) {
//         case 'w': keyStates.w = true; break;
//         case 's': keyStates.s = true; break;
//         case 'a': keyStates.a = true; break;
//         case 'd': keyStates.d = true; break;
//         case 'q': keyStates.q = true; break;
//         case 'e': keyStates.e = true; break;
//     }
// });
//
// window.addEventListener('keyup', (e) => {
//     switch(e.key.toLowerCase()) {
//         case 'w': keyStates.w = false; break;
//         case 's': keyStates.s = false; break;
//         case 'a': keyStates.a = false; break;
//         case 'd': keyStates.d = false; break;
//         case 'q': keyStates.q = false; break;
//         case 'e': keyStates.e = false; break;
//     }
// });
//
// // 设置渲染器尺寸
// renderer.setSize(window.innerWidth, window.innerHeight)
// document.body.appendChild(renderer.domElement)
//
// // 创建立方体
// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshPhongMaterial({
//     color: 0x00ff00,
//     shininess: 100
// });
//
// cube = new THREE.Mesh(geometry, material);
// scene.add(cube);
//
// // 添加基础光照（重要！）
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);
// const pointLight = new THREE.PointLight(0xffffff, 1);
// pointLight.position.set(5, 5, 5);
// scene.add(pointLight);
//
//
// camera.position.z = 5
//
//
//
// // 动画循环
// let lastCubeX = 0;
// let lastCubeY = 0;
//
// // 在 renderer.js 中添加
// function updateCamera() {
//     // 将地图视角参数转换为Three.js相机参数
//     const pitch = map.getPitch();  // 俯仰角（0-80）
//     const rotation = map.getRotation(); // 旋转角度（0-360）
//
//     // 计算相机位置
//     const distance = 50; // 固定观察距离
//     const radian = rotation * Math.PI / 180;
//     const height = distance * Math.tan(pitch * Math.PI / 180);
//
//     camera.position.x = distance * Math.cos(radian);
//     camera.position.z = distance * Math.sin(radian);
//     camera.position.y = height;
//
//     camera.lookAt(cube.position);
// }
//
// // 修改动画循环
// function animate() {
//     requestAnimationFrame(animate);
//
//     // 计算速度
//     // velocity.x = 0;
//     // velocity.z = 0;
//     //
//     // if(keyStates.w) velocity.z -= movementSpeed;
//     // if(keyStates.s) velocity.z += movementSpeed;
//     // if(keyStates.a) velocity.x -= movementSpeed;
//     // if(keyStates.d) velocity.x += movementSpeed;
//     //
//     // // 应用惯性
//     // cube.position.add(velocity);
//     // velocity.multiplyScalar(damping);
//
//     // 保持原有旋转
//     cube.rotation.x += rotationSpeed;
//     cube.rotation.y += rotationSpeed;
//
//     // 新增移动控制
//     if(keyStates.q) cube.position.z -= movementSpeed; // 前移
//     if(keyStates.e) cube.position.z += movementSpeed; // 后移
//     if(keyStates.a) cube.position.x -= movementSpeed; // 左移
//     if(keyStates.d) cube.position.x += movementSpeed; // 右移
//     if(keyStates.w) cube.position.y += movementSpeed; // 上移
//     if(keyStates.s) cube.position.y -= movementSpeed; // 下移
//
//     renderer.render(scene, camera);
// }
//
//
// // 处理窗口大小变化
// window.addEventListener('resize', () => {
//     camera.aspect = window.innerWidth / window.innerHeight
//     camera.updateProjectionMatrix()
//     renderer.setSize(window.innerWidth, window.innerHeight)
// })
//
// animate()

// const { Scene, WebGLRenderer, PerspectiveCamera, BoxGeometry, MeshBasicMaterial, Mesh } = require('three')
//
//
//
// // 初始化场景
// const scene = new Scene()
// const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
// const renderer = new WebGLRenderer({
//     alpha: true,      // 启用透明度通道
//     antialias: true   // 可选抗锯齿
// })
//
//
// const THREE = require('three');
//
// // 添加键盘状态跟踪对象
// const keyStates = {
//     w: false,
//     s: false,
//     a: false,
//     d: false,
//     q: false,
//     e: false
// };
//
// // 添加移动参数
// const movementSpeed = 0.1;
// const rotationSpeed = 0.02;
//
// // 初始化立方体（修改原有代码）
// let cube; // 将 cube 声明提升到全局作用域
//
// const galaxy = new Galaxy()
// window.galaxy = galaxy
//
// // 键盘事件监听
// window.addEventListener('keydown', (e) => {
//     switch(e.key.toLowerCase()) {
//         case 'w': keyStates.w = true; break;
//         case 's': keyStates.s = true; break;
//         case 'a': keyStates.a = true; break;
//         case 'd': keyStates.d = true; break;
//         case 'q': keyStates.q = true; break;
//         case 'e': keyStates.e = true; break;
//     }
// });
//
// window.addEventListener('keyup', (e) => {
//     switch(e.key.toLowerCase()) {
//         case 'w': keyStates.w = false; break;
//         case 's': keyStates.s = false; break;
//         case 'a': keyStates.a = false; break;
//         case 'd': keyStates.d = false; break;
//         case 'q': keyStates.q = false; break;
//         case 'e': keyStates.e = false; break;
//     }
// });
//
// // 设置渲染器尺寸
// renderer.setSize(window.innerWidth, window.innerHeight)
// document.body.appendChild(renderer.domElement)
//
// // 创建立方体
// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshPhongMaterial({
//     color: 0x00ff00,
//     shininess: 100
// });
//
// cube = new THREE.Mesh(geometry, material);
// scene.add(cube);
//
// // 添加基础光照（重要！）
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);
// const pointLight = new THREE.PointLight(0xffffff, 1);
// pointLight.position.set(5, 5, 5);
// scene.add(pointLight);
//
//
// camera.position.z = 5
//
//
//
// // 动画循环
// let lastCubeX = 0;
// let lastCubeY = 0;
//
// function animate() {
//     requestAnimationFrame(animate);
//
//     // 保存当前帧位置
//     const currentX = cube.position.x;
//     const currentY = cube.position.y;
//
//     // 处理立方体移动
//     cube.rotation.x += rotationSpeed;
//     cube.rotation.y += rotationSpeed;
//
//     if(keyStates.q) cube.position.z -= movementSpeed;
//     if(keyStates.e) cube.position.z += movementSpeed;
//     if(keyStates.a) cube.position.x -= movementSpeed;
//     if(keyStates.d) cube.position.x += movementSpeed;
//     if(keyStates.w) cube.position.y += movementSpeed;
//     if(keyStates.s) cube.position.y -= movementSpeed;
//
//     // 计算位移差
//     const deltaX = cube.position.x - lastCubeX;
//     const deltaY = cube.position.y - lastCubeY;
//
//     // 同步地图参数
//     if (window.amap) {
//         // 调整旋转角度（X轴位移影响rotation）
//         const currentRotation = window.amap.getRotation();
//         const newRotation = currentRotation - deltaX * 0.5; // 灵敏度系数0.5
//         window.amap.setRotation(newRotation);
//
//         // 调整俯仰角（Y轴位移影响pitch）
//         const currentPitch = window.amap.getPitch();
//         const newPitch = currentPitch + deltaY * 0.5;
//         window.amap.setPitch(Math.max(30, Math.min(80, newPitch)));
//     }
//
//     // 更新上一帧位置
//     lastCubeX = cube.position.x;
//     lastCubeY = cube.position.y;
//
//     renderer.render(scene, camera);
// }
//
//
// // 处理窗口大小变化
// window.addEventListener('resize', () => {
//     camera.aspect = window.innerWidth / window.innerHeight
//     camera.updateProjectionMatrix()
//     renderer.setSize(window.innerWidth, window.innerHeight)
// })
//
// animate()

// const { Scene, WebGLRenderer, PerspectiveCamera, BufferGeometry, PointsMaterial, Points, Float32BufferAttribute, Color } = require('three')
//
// // 初始化场景
// const scene = new Scene()
// const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
// const renderer = new WebGLRenderer({
//     alpha: true,
//     antialias: true
// })
//
// const THREE = require('three');
//
// // 键盘状态跟踪
// const keyStates = {
//     w: false,
//     s: false,
//     a: false,
//     d: false,
//     q: false,
//     e: false
// };
//
// // 移动参数
// const movementSpeed = 0.3; // 提升移动速度
// const rotationSpeed = 0.02;
//
// // 初始化粒子系统容器
// let galaxyContainer = new THREE.Object3D();
// let particles;
//
// // 键盘事件监听
// window.addEventListener('keydown', (e) => {
//     switch(e.key.toLowerCase()) {
//         case 'w': keyStates.w = true; break;
//         case 's': keyStates.s = true; break;
//         case 'a': keyStates.a = true; break;
//         case 'd': keyStates.d = true; break;
//         case 'q': keyStates.q = true; break;
//         case 'e': keyStates.e = true; break;
//     }
// });
//
// window.addEventListener('keyup', (e) => {
//     switch(e.key.toLowerCase()) {
//         case 'w': keyStates.w = false; break;
//         case 's': keyStates.s = false; break;
//         case 'a': keyStates.a = false; break;
//         case 'd': keyStates.d = false; break;
//         case 'q': keyStates.q = false; break;
//         case 'e': keyStates.e = false; break;
//     }
// });
//
// // 设置渲染器
// renderer.setSize(window.innerWidth, window.innerHeight)
// document.body.appendChild(renderer.domElement)
//
// // 创建星旋粒子系统
// function createGalaxy() {
//     const geometry = new BufferGeometry()
//     const vertices = []
//     const colors = []
//     const particleCount = 5000
//
//     // 生成螺旋分布（保持不变）
//     for (let i = 0; i < particleCount; i++) {
//         const radius = Math.sqrt(Math.random()) * 30
//         const angle = radius * 0.5
//         const phi = Math.random() * Math.PI * 2
//
//         const x = Math.cos(phi + angle) * radius
//         const y = Math.sin(phi * 0.5 + angle) * radius * 0.2
//         const z = Math.sin(phi + angle) * radius
//
//         vertices.push(x, y, z)
//
//         const color = new Color()
//         color.setHSL(0.7 + radius * 0.01, 0.8, 0.5 + Math.random() * 0.3)
//         colors.push(color.r, color.g, color.b)
//     }
//
//     geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3))
//     geometry.setAttribute('color', new Float32BufferAttribute(colors, 3))
//
//     const material = new PointsMaterial({
//         size: 1.2,
//         vertexColors: true,
//         transparent: true,
//         opacity: 0.9,
//         sizeAttenuation: true,
//         depthWrite: false
//     })
//
//     particles = new Points(geometry, material)
//     galaxyContainer.add(particles)
//     scene.add(galaxyContainer)
// }
//
// createGalaxy()
//
// // 设置相机
// camera.position.set(0, 80, 130)
// camera.lookAt(galaxyContainer.position)
//
// // 动画控制变量
// let lastPositionX = 0
// let lastPositionY = 0
// let time = 0
//
// function animate() {
//     requestAnimationFrame(animate)
//     time = Date.now() * 0.001
//
//     // 星旋自身动画（独立运行）
//     particles.rotation.y += 0.002
//
//     // 动态缩放效果
//     const scaleFactor = 1 + Math.sin(time) * 0.3 // 增强缩放效果
//     galaxyContainer.scale.set(scaleFactor, scaleFactor, scaleFactor)
//
//     // 保存当前帧位置
//     const currentX = galaxyContainer.position.x;
//     const currentY = galaxyContainer.position.y;
//
//     // 处理立方体移动
//     // galaxyContainer.rotation.x += rotationSpeed;
//     // galaxyContainer.rotation.y += rotationSpeed;
//     // 键盘控制星系容器位置
//     if(keyStates.q) galaxyContainer.position.z -= movementSpeed
//     if(keyStates.e) galaxyContainer.position.z += movementSpeed
//     if(keyStates.a) galaxyContainer.position.x -= movementSpeed
//     if(keyStates.d) galaxyContainer.position.x += movementSpeed
//     if(keyStates.w) galaxyContainer.position.y += movementSpeed
//     if(keyStates.s) galaxyContainer.position.y -= movementSpeed
//
//     // 计算位移差（基于容器位置）
//     const deltaX = galaxyContainer.position.x - lastPositionX
//     const deltaY = galaxyContainer.position.y - lastPositionY
//
//     // 同步地图参数
//     if (window.amap) {
//         const currentRotation = window.amap.getRotation()
//         const newRotation = currentRotation - deltaX * 0.5
//         window.amap.setRotation(newRotation)
//
//         const currentPitch = window.amap.getPitch()
//         const newPitch = currentPitch + deltaY * 0.5
//         window.amap.setPitch(Math.max(30, Math.min(80, newPitch)))
//     }
//
//     // 更新位置记录
//     lastPositionX = galaxyContainer.position.x
//     lastPositionY = galaxyContainer.position.y
//
//     // 保持相机朝向星系中心
//     camera.lookAt(galaxyContainer.position)
//
//     renderer.render(scene, camera)
// }
//
// // 窗口大小调整
// window.addEventListener('resize', () => {
//     camera.aspect = window.innerWidth / window.innerHeight
//     camera.updateProjectionMatrix()
//     renderer.setSize(window.innerWidth, window.innerHeight)
// })
//
// animate()


const {
    Scene, WebGLRenderer, PerspectiveCamera,
    PointsMaterial, BufferGeometry, Points,
    Color, Float32BufferAttribute
} = require('three')

class Galaxy {
    constructor() {
        this.scene = new Scene()
        this.camera = new PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000)
        this.renderer = new WebGLRenderer({
            antialias: true,
            alpha: true
        })

        this.particles = null
        this.keys = {}
        this.movementSpeed = 0.5
        this.time = 0
        this.init()
        this.initControls()
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.style.margin = '0'
        document.body.style.overflow = 'hidden'
        document.body.appendChild(this.renderer.domElement)

        this.createGalaxy()

        this.camera.position.set(0, 80, 130)
        this.camera.lookAt(0, 0, 0)

        this.animate()
    }

    initControls() {
        window.addEventListener('keydown', (e) => this.onKeyDown(e))
        window.addEventListener('keyup', (e) => this.onKeyUp(e))
    }

    onKeyDown(event) {
        this.keys[event.key] = true
    }

    onKeyUp(event) {
        this.keys[event.key] = false
    }

    createGalaxy() {
        const geometry = new BufferGeometry()
        const vertices = []
        const colors = []
        const particleCount = 5000

        for (let i = 0; i < particleCount; i++) {
            const radius = Math.sqrt(Math.random()) * 30
            const angle = radius * 0.5
            const phi = Math.random() * Math.PI * 2

            const x = Math.cos(phi + angle) * radius
            const y = Math.sin(phi * 0.5 + angle) * radius * 0.2
            const z = Math.sin(phi + angle) * radius

            vertices.push(x, y, z)

            const color = new Color()
            color.setHSL(
                0.7 + radius * 0.01,
                0.8,
                0.5 + Math.random() * 0.3
            )
            colors.push(color.r, color.g, color.b)
        }

        geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3))
        geometry.setAttribute('color', new Float32BufferAttribute(colors, 3))

        const material = new PointsMaterial({
            size: 1.2,
            vertexColors: true,
            transparent: true,
            opacity: 0.9,
            sizeAttenuation: true,
            depthWrite: false
        })

        this.particles = new Points(geometry, material)
        this.scene.add(this.particles)
    }

    animate() {
        requestAnimationFrame(() => this.animate())

        // 键盘控制移动
        if (this.keys['w']) this.particles.position.y += this.movementSpeed
        if (this.keys['s']) this.particles.position.y -= this.movementSpeed
        if (this.keys['a']) this.particles.position.x -= this.movementSpeed
        if (this.keys['d']) this.particles.position.x += this.movementSpeed
        if (this.keys['q']) this.particles.position.z -= this.movementSpeed
        if (this.keys['e']) this.particles.position.z += this.movementSpeed

        // 原有动画效果
        this.particles.rotation.y += 0.002
        this.time = Date.now() * 0.001
        const scaleFactor = 1 + Math.sin(this.time) * 0.001

        const positions = this.particles.geometry.attributes.position.array
        for (let i = 0; i < positions.length; i += 3) {
            positions[i] *= scaleFactor
            positions[i + 2] *= scaleFactor
        }
        this.particles.geometry.attributes.position.needsUpdate = true

        this.renderer.render(this.scene, this.camera)
    }
}

const galaxy = new Galaxy()
window.galaxy = galaxy

window.addEventListener('resize', () => {
    galaxy.camera.aspect = window.innerWidth / window.innerHeight
    galaxy.camera.updateProjectionMatrix()
    galaxy.renderer.setSize(window.innerWidth, window.innerHeight)
})
