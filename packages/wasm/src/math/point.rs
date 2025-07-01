use nalgebra::Vector2;
use wasm_bindgen::prelude::*;

/// 计算三个点之间的夹角 (单位为弧度)
/// - 参数 `x1`, `y1`: 第一个点 A 的坐标
/// - 参数 `x2`, `y2`: 第二个点 B 的坐标 (夹角顶点)
/// - 参数 `x3`, `y3`: 第三个点 C 的坐标
/// - 返回值：角度 (弧度)
#[wasm_bindgen(js_name = calculateAngle)]
pub fn calculate_angle(x1: f64, y1: f64, x2: f64, y2: f64, x3: f64, y3: f64) -> f64 {
    // 计算向量 BA 和 BC
    let ba = Vector2::new(x1 - x2, y1 - y2); // 向量 BA
    let bc = Vector2::new(x3 - x2, y3 - y2); // 向量 BC

    // 计算点积和叉积
    let dot_product = ba.dot(&bc);
    let cross_product = ba.x * bc.y - ba.y * bc.x;

    // 计算角度（弧度）
    let angle_radians = cross_product.atan2(dot_product);

    // 返回角度 (弧度)
    angle_radians
}
