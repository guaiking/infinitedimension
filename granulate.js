class CubeScene {
    constructor(scene) {
        this.scene = scene;
        this.cubes = [];
        this.init();
    }

    // 随机数生成函数
    randomFloat(min, max) {
        return Math.random() * (max - min) + min
    }

    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    createRandomCube(existingPositions = [], minDistance = 5) {
        let position, isValidPosition
        const areaSize = {
            x: 80,
            y: 70,
            z: 20
        }

        do {
            position = {
                x: this.randomFloat(-areaSize.x, areaSize.x),
                y: this.randomFloat(-areaSize.y, areaSize.y),
                z: this.randomFloat(-areaSize.z, areaSize.z)
            }

            isValidPosition = existingPositions.every(existingPos => {
                const dx = existingPos.x - position.x
                const dy = existingPos.y - position.y
                const dz = existingPos.z - position.z
                return Math.sqrt(dx*dx + dy*dy + dz*dz) >= minDistance
            })
        } while (!isValidPosition)

        const size = this.randomFloat(2, 6)
        const color = new THREE.Color().setHSL(Math.random(), 0.7, 0.6)

        const geometry = new THREE.BoxGeometry(size, size, size)
        const material = new THREE.MeshPhongMaterial({
            color: color,
            specular: 0x222222,
            shininess: 100
        })

        const cube = new THREE.Mesh(geometry, material)
        cube.position.set(position.x, position.y, position.z)

        // 添加随机速度
        cube.velocity = {
            x: this.randomFloat(-0.08, 0.08),
            y: this.randomFloat(-0.08, 0.08),
            z: this.randomFloat(-0.08, 0.08)
        }

        return { cube, position }
    }

    init() {
        // 生成15-25个分散立方体
        const positions = []
        const cubeCount = this.randomInt(20, 30)

        for (let i = 0; i < cubeCount; i++) {
            const { cube, position } = this.createRandomCube(positions, 15)
            this.scene.add(cube)
            this.cubes.push(cube)
            positions.push(position)
        }

        // 光照配置
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
        this.scene.add(ambientLight)

        const pointLight = new THREE.PointLight(0xffffff, 1.2)
        pointLight.position.set(20, 20, 20)
        this.scene.add(pointLight)
    }

    animate() {
        const movementBoundary = { x: 100, y: 70, z: 30 }
        const baseRotationSpeed = 0.015

        this.cubes.forEach((cube, index) => {
            // 更新旋转
            const speedModifier = 0.8 + (index % 3) * 0.2
            cube.rotation.x += baseRotationSpeed * speedModifier
            cube.rotation.y += baseRotationSpeed * speedModifier * 0.7
            cube.rotation.z += baseRotationSpeed * speedModifier * 0.3

            // 更新位置
            cube.position.x += cube.velocity.x
            cube.position.y += cube.velocity.y
            cube.position.z += cube.velocity.z

            // 边界碰撞检测
            if (Math.abs(cube.position.x) > movementBoundary.x) {
                cube.velocity.x *= -1
                cube.position.x = Math.sign(cube.position.x) * movementBoundary.x
            }
            if (Math.abs(cube.position.y) > movementBoundary.y) {
                cube.velocity.y *= -1
                cube.position.y = Math.sign(cube.position.y) * movementBoundary.y
            }
            if (Math.abs(cube.position.z) > movementBoundary.z) {
                cube.velocity.z *= -1
                cube.position.z = Math.sign(cube.position.z) * movementBoundary.z
            }
        })
    }
}