const THREE = require('three');
class MainRenderer {
    constructor() {
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000)
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        })

        this.cubeScene = new CubeScene(this.scene)
        this.galaxyScene = new GalaxyScene(this.scene)
        this.keys = {}

        this.init()
        this.initControls()
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.style.margin = '0'
        document.body.style.overflow = 'hidden'
        document.body.appendChild(this.renderer.domElement)

        this.camera.position.set(0, 100, 150)
        this.camera.lookAt(0, 0, 0)

        this.animate()
    }

    initControls() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.key] = true
            this.galaxyScene.onKeyDown(e)
        })
        window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false
            this.galaxyScene.onKeyUp(e)
        })
    }

    animate() {
        requestAnimationFrame(() => this.animate())

        this.cubeScene.animate()
        this.galaxyScene.animate()

        this.renderer.render(this.scene, this.camera)
    }
}

// 初始化主渲染器
const mainRenderer = new MainRenderer()
window.mainRenderer = mainRenderer

// 窗口大小调整
window.addEventListener('resize', () => {
    mainRenderer.camera.aspect = window.innerWidth / window.innerHeight
    mainRenderer.camera.updateProjectionMatrix()
    mainRenderer.renderer.setSize(window.innerWidth, window.innerHeight)
})