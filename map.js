// 在 map.js 中添加以下代码
const map = new AMap.Map('mapContainer', {
    viewMode: '3D',      // 必须启用3D模式
    pitch: 55,           // 初始俯仰角
    rotation: 0,       // 初始旋转角度
    showIndoorMap: false,
    zoom: 17,
    center: [116.397428, 39.90923]
});

// 添加卫星图层
// const satellite = new AMap.TileLayer.Satellite();
// map.add(satellite);

// map.js 修改边界限制逻辑
map.on('moveend', () => {
    const center = map.getCenter()

    // 动态计算边界限制（中国范围示例）
    const clampedLng = Math.max(73.66, Math.min(135.05, center.lng))
    const clampedLat = Math.max(3.86, Math.min(53.55, center.lat))

    if (center.lng !== clampedLng || center.lat !== clampedLat) {
        map.setCenter([clampedLng, clampedLat])

        // 同步重置星旋位置
        if (window.galaxy) {
            window.galaxy.particles.position.set(0, 0, 0)
        }
    }
})


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

const miniMap = new AMap.Map('miniMap', {
    viewMode: '2D',      // 2D模式
    zoom: 10,            // 更小的缩放级别
    center: [116.397428, 39.90923],
    interactive: false,  // 禁用交互
    showIndoorMap: false,
    layers: [            // 使用简化的道路图层
        new AMap.TileLayer.RoadNet()
    ]
});

// 添加星旋标记
const starMarker = new AMap.Marker({
    position: map.getCenter(),
    content: '<img src="image/marking.png" style="width:24px;height:24px;" id="marking">',
    offset: new AMap.Pixel(-12, -12)
});
miniMap.add(starMarker);

// 同步更新星旋标记位置
// map.on('move', () => {
//     starMarker.setPosition(map.getCenter());
// });
map.on('movestart', updateStarMarker);
map.on('moveend', updateStarMarker);
map.on('zoomchange', updateStarMarker);
function updateStarMarker() {
    starMarker.setPosition(map.getCenter());
}
updateStarMarker()

// 同步主地图和小地图的中心点
map.on('movestart', updateMiniMap);
map.on('moveend', updateMiniMap);
map.on('zoomchange', updateMiniMap);

function updateMiniMap() {
    miniMap.setCenter(map.getCenter());
    //miniMap.setZoom(map.getZoom() - 3);  // 小地图显示更广的视野
}

// 初始同步
updateMiniMap();

//添加小地图比例尺控件
miniMap.addControl(new AMap.Scale({
    position: 'LB',
    offset: [10, -10]
}));


// 更新标记位置
// map.on('move', () => {
//     starMarker.setPosition(map.getCenter());
// });

window.amap = map;




