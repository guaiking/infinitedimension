// 在 map.js 中添加以下代码
const map = new AMap.Map('mapContainer', {
    viewMode: '3D',      // 必须启用3D模式
    pitch: 55,           // 初始俯仰角
    rotation: -25,       // 初始旋转角度
    showIndoorMap: false,
    zoom: 17,
    center: [116.397428, 39.90923]
});

// 启用地图交互（修改之前禁用的配置）
map.setStatus({
    scrollWheel: true,    // 允许滚轮缩放
    rotateEnable: true,   // 允许旋转
    pitchEnable: true     // 允许俯仰
});

// 添加鼠标拖动处理
let isDragging = false;
let lastX = 0;
let lastY = 0;

// 鼠标按下事件
map.on('mousedown', (e) => {
    isDragging = true;
    lastX = e.pixel.x;
    lastY = e.pixel.y;
});

// 鼠标移动事件
map.on('mousemove', (e) => {
    if (isDragging) {
        const deltaX = e.pixel.x - lastX;
        const deltaY = e.pixel.y - lastY;

        // 调整地图旋转角度
        const newRotation = map.getRotation() - deltaX * 0.1;
        map.setRotation(newRotation);

        // 调整地图俯仰角（限制在30-80度之间）
        const newPitch = map.getPitch() - deltaY * 0.1;
        map.setPitch(Math.max(30, Math.min(80, newPitch)));

        lastX = e.pixel.x;
        lastY = e.pixel.y;
    }
});

// 鼠标释放事件
map.on('mouseup', () => {
    isDragging = false;
});

// 添加惯性效果（可选）
let momentumTimer;
map.on('mouseup', () => {
    if (momentumTimer) clearInterval(momentumTimer);

    let speedX = lastDeltaX * 0.5;
    let speedY = lastDeltaY * 0.5;

    momentumTimer = setInterval(() => {
        if (Math.abs(speedX) < 0.1 && Math.abs(speedY) < 0.1) {
            clearInterval(momentumTimer);
            return;
        }

        map.setRotation(map.getRotation() - speedX);
        map.setPitch(Math.max(30, Math.min(80, map.getPitch() - speedY)));

        speedX *= 0.85;
        speedY *= 0.85;
    }, 16);
});
window.amap = map;


