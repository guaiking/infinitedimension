class GalaxyScene {
    constructor(scene) {
        this.scene = scene;
        this.particles = null;
        this.starCore = null; // 星旋核心
        this.keys = {};
        this.movementSpeed = 1;
        this.time = 0;
        this.radius = 5; // 碰撞检测半径
        this.init();
    }

    init() {
        this.createGalaxy();
        this.createStarCore();
    }

    createStarCore() {
        // 创建渐变纹理
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        // 创建径向渐变
        const gradient = ctx.createRadialGradient(
            128, 128, 0,
            128, 128, 128
        );

        // 设置渐变颜色 - 从青色到紫色
        gradient.addColorStop(0, 'rgba(0, 255, 255, 1)');
        gradient.addColorStop(0.5, 'rgba(128, 0, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 0, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 256, 256);

        // 创建纹理
        const texture = new THREE.CanvasTexture(canvas);

        // 创建星旋核心
        const geometry = new THREE.SphereGeometry(this.radius, 64, 64);

        const material = new THREE.MeshPhongMaterial({
            map: texture,
            transparent: true,
            opacity: 0.9,
            emissive: 0x88ffff,
            emissiveIntensity: 0.8,
            specular: 0xffffff,
            shininess: 100,
            blending: THREE.AdditiveBlending
        });

        this.starCore = new THREE.Mesh(geometry, material);
        this.scene.add(this.starCore);


    }

    createGalaxy() {
        const geometry = new THREE.BufferGeometry()
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

            const color = new THREE.Color()
            color.setHSL(
                0.7 + radius * 0.01,
                0.8,
                0.5 + Math.random() * 0.3
            )
            colors.push(color.r, color.g, color.b)
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

        const material = new THREE.PointsMaterial({
            size: 1,
            vertexColors: true,
            transparent: true,
            opacity: 0.9,
            sizeAttenuation: true,
            depthWrite: false
        })

        this.particles = new THREE.Points(geometry, material)
        this.scene.add(this.particles)
    }

    onKeyDown(event) {
        this.keys[event.key] = true
    }

    onKeyUp(event) {
        this.keys[event.key] = false
    }

    animate() {

        // 更新星旋核心位置(跟随粒子中心)
        if (this.particles && this.starCore) {
            // 位置同步
            this.starCore.position.copy(this.particles.position);

            // 旋转同步 (速度比粒子快2倍)
            this.starCore.rotation.y = this.particles.rotation.y * 2;


        }

        // 键盘控制移动
        if (this.keys['w']||this.keys['W']) this.particles.position.y += this.movementSpeed
        if (this.keys['s']||this.keys['S']) this.particles.position.y -= this.movementSpeed
        if (this.keys['a']||this.keys['A']) this.particles.position.x -= this.movementSpeed
        if (this.keys['d']||this.keys['D']) this.particles.position.x += this.movementSpeed
        if (this.keys['k']||this.keys['K']) this.particles.position.z -= this.movementSpeed
        if (this.keys['j']||this.keys['J']) this.particles.position.z += this.movementSpeed

        // 原有动画效果
        this.particles.rotation.y += 0.002
        this.time = Date.now() * 0.001
        const scaleFactor = 1 + Math.sin(this.time) * 0.002

        const positions = this.particles.geometry.attributes.position.array
        for (let i = 0; i < positions.length; i += 3) {
            positions[i] *= scaleFactor
            positions[i + 2] *= scaleFactor
        }
        this.particles.geometry.attributes.position.needsUpdate = true
    }

    getStarCore() {
        return {
            position: this.starCore.position,
            radius: this.radius
        };
    }

    reset() {
        // 重置星旋位置
        if (this.particles) {
            this.particles.position.set(0, 0, 0);
            this.particles.rotation.set(0, 0, 0);
        }
    }
}