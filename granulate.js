class CubeScene {
    constructor(scene) {
        this.scene = scene;
        this.cubes = [];
        this.activeCubes = new Set(); // 跟踪活跃的立方体
        this.colorPalette = []; // 存储颜色渐变方案
        this.initColorPalette();
        this.init();
    }

    // 初始化与星旋协调的渐变色板
    initColorPalette() {
        // 创建从蓝紫色到青色的渐变
        this.colorPalette = [
            new THREE.Color(0x8A2BE2), // 蓝紫色
            new THREE.Color(0x9370DB), // 中等紫色
            new THREE.Color(0x4169E1), // 皇家蓝
            new THREE.Color(0x1E90FF), // 道奇蓝
            new THREE.Color(0x00BFFF), // 深天蓝
            new THREE.Color(0x40E0D0), // 绿松石色
            new THREE.Color(0x00FFFF)  // 青色
        ];
    }

    // 随机数生成函数
    randomFloat(min, max) {
        return Math.random() * (max - min) + min
    }

    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    // 获取渐变颜色(基于位置)
    getGradientColor(progress) {
        const index = Math.floor(progress * (this.colorPalette.length - 1));
        const color1 = this.colorPalette[index];
        const color2 = this.colorPalette[Math.min(index + 1, this.colorPalette.length - 1)];

        const alpha = (progress * (this.colorPalette.length - 1)) % 1;

        const resultColor = new THREE.Color();
        resultColor.r = color1.r * (1 - alpha) + color2.r * alpha;
        resultColor.g = color1.g * (1 - alpha) + color2.g * alpha;
        resultColor.b = color1.b * (1 - alpha) + color2.b * alpha;

        return resultColor;
    }

    createRandomCube(existingPositions = [], minDistance = 3) {
        let position, isValidPosition;
        const areaSize = { x: 150, y: 100, z: 40 };

        do {
            position = {
                x: this.randomFloat(-areaSize.x/2, areaSize.x/2),
                y: this.randomFloat(-areaSize.y/2, areaSize.y/2),
                z: this.randomFloat(-areaSize.z/2, areaSize.z/2)
            };

            isValidPosition = existingPositions.every(existingPos => {
                const dx = existingPos.x - position.x;
                const dy = existingPos.y - position.y;
                const dz = existingPos.z - position.z;
                return Math.sqrt(dx*dx + dy*dy + dz*dz) >= minDistance;
            });
        } while (!isValidPosition);

        const size = this.randomFloat(2,6);

        // 基于Y轴位置决定颜色渐变进度
        const colorProgress = (position.y + areaSize.y/2) / areaSize.y;
        const baseColor = this.getGradientColor(colorProgress);

        // 添加随机颜色变化
        const hueVariation = this.randomFloat(-0.05, 0.05);
        baseColor.offsetHSL(hueVariation, 0, 0);

        // 创建渐变材质
        const material = this.createGradientMaterial(baseColor);

        const cube = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), material);
        cube.position.set(position.x, position.y, position.z);

        // 添加随机速度
        cube.velocity = {
            x: this.randomFloat(-0.2, 0.2),
            y: this.randomFloat(-0.2, 0.2),
            z: this.randomFloat(-0.1, 0.1)
        };

        return { cube, position };
    }

    createGradientMaterial(baseColor) {
        // 创建渐变纹理
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        // 创建径向渐变
        const gradient = ctx.createRadialGradient(
            128, 128, 10,
            128, 128, 128
        );

        // 设置渐变 - 从中心颜色到边缘暗色
        const centerColor = `rgb(${Math.floor(baseColor.r * 255)}, ${Math.floor(baseColor.g * 255)}, ${Math.floor(baseColor.b * 255)})`;
        const edgeColor = `rgb(${Math.floor(baseColor.r * 100)}, ${Math.floor(baseColor.g * 100)}, ${Math.floor(baseColor.b * 150)})`;

        gradient.addColorStop(0, centerColor);
        gradient.addColorStop(0.7, centerColor);
        gradient.addColorStop(1, edgeColor);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 256, 256);

        // 创建纹理
        const texture = new THREE.CanvasTexture(canvas);

        return new THREE.MeshPhongMaterial({
            map: texture,
            specular: 0x222222,
            shininess: 50,
            emissive: baseColor,
            emissiveIntensity: 0.2,
            transparent: true,
            opacity: 0.9
        });
    }

    init() {
        // 生成15-25个分散立方体
        const positions = []
        const cubeCount = this.randomInt(10, 20)

        for (let i = 0; i < cubeCount; i++) {
            const { cube, position } = this.createRandomCube(positions, 17)
            this.scene.add(cube)
            this.cubes.push(cube)
            this.activeCubes.add(cube);// 添加到活跃集合
            positions.push(position)
        }
        // 更新立方体计数显示
        this.updateCubeCount();

        // 光照配置
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
        this.scene.add(ambientLight)

        const pointLight = new THREE.PointLight(0xffffff, 1.2)
        pointLight.position.set(20, 20, 20)
        this.scene.add(pointLight)
    }

    removeCube(cube) {
        this.scene.remove(cube);
        this.activeCubes.delete(cube);
        this.updateCubeCount();
    }

    updateCubeCount() {
        document.getElementById('count').textContent = this.activeCubes.size;
    }

    getActiveCubes() {
        return Array.from(this.activeCubes);
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

    reset() {
        // 清除现有立方体
        this.cubes.forEach(cube => {
            this.scene.remove(cube);
        });

        this.cubes = [];
        this.activeCubes = new Set();

        // 重新初始化
        this.init();
    }
}