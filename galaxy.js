class GalaxyScene {
    constructor(scene) {
        this.scene = scene;
        this.particles = null;
        this.keys = {};
        this.movementSpeed = 0.5;
        this.time = 0;
        this.init();
    }

    init() {
        this.createGalaxy();
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
        const scaleFactor = 1 + Math.sin(this.time) * 0.002

        const positions = this.particles.geometry.attributes.position.array
        for (let i = 0; i < positions.length; i += 3) {
            positions[i] *= scaleFactor
            positions[i + 2] *= scaleFactor
        }
        this.particles.geometry.attributes.position.needsUpdate = true
    }
}