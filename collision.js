class CollisionDetector {
    static sphereBoxCollision(sphere, box) {
        // 获取立方体的边界
        const boxSize = box.geometry.parameters.width / 2;
        const boxMin = {
            x: box.position.x - boxSize,
            y: box.position.y - boxSize,
            z: box.position.z - boxSize
        };
        const boxMax = {
            x: box.position.x + boxSize,
            y: box.position.y + boxSize,
            z: box.position.z + boxSize
        };

        // 计算球体到立方体的最近点
        const closestPoint = {
            x: Math.max(boxMin.x, Math.min(sphere.position.x, boxMax.x)),
            y: Math.max(boxMin.y, Math.min(sphere.position.y, boxMax.y)),
            z: Math.max(boxMin.z, Math.min(sphere.position.z, boxMax.z))
        };

        // 计算距离
        const distance = Math.sqrt(
            Math.pow(closestPoint.x - sphere.position.x, 2) +
            Math.pow(closestPoint.y - sphere.position.y, 2) +
            Math.pow(closestPoint.z - sphere.position.z, 2)
        );

        return distance < sphere.radius;
    }
}