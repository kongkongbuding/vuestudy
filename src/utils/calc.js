/* eslint-disable */

/*
 * calc
 * @ cll1
 */

// 两点距离 { x, y }
const dist = (p1,p2) => Math.sqrt(Math.pow(p1.x - p2.x,2) + Math.pow(p1.y - p2.y,2))

// 叉乘 { x, y }
const crossMul = (v1, v2) => v1.x * v2.y - v1.y * v2.x

// 线相交
const checkCross = (p1, p2, p3, p4) => {
  let v1 = { x: p1.x - p3.x, y: p1.y - p3.y },
    v2 = { x: p2.x - p3.x, y: p2.y - p3.y },
    v3 = { x: p4.x - p3.x, y: p4.y - p3.y },
    v = crossMul(v1, v3) * crossMul(v2, v3)

  v1 = { x: p3.x - p1.x, y: p3.y - p1.y }
  v2 = { x: p4.x - p1.x, y: p4.y - p1.y }
  v3 = { x: p2.x - p1.x, y: p2.y - p1.y }

  return v <= 0 && crossMul(v1, v3) * crossMul(v2, v3) <= 0 ? true : false
}

// point in area 奇内 偶外
const hitArea = (point, polygon) => {
  let p1 = point,
    p2 = { x: -100, y: point.y },
    p3,
    p4,
    count = 0

  for (let i = 0, len = polygon.length - 1; i < len; i++) {
    p3 = polygon[i]
    p4 = polygon[i + 1]
    if (checkCross(p1, p2, p3, p4)) count++
  }

  p3 = polygon[polygon.length - 1]
  p4 = polygon[0]
  if (checkCross(p1, p2, p3, p4)) count++

  return count % 2 == 0 ? false : true
}

/**
 * @ point hit line
 * @param lp 点坐标
 * @param _l_ll 线数据
 * @param _l_d 命中误差
 * @param loop 是否封闭
 * @param returnI 查询击中线段序列
 */

const hitLine = (lp, _l_ll, _l_d, loop, returnI) => {
  let hit = false,
    index = -1

  if (_l_ll.length < 2) return hit

  if (!!loop) _l_ll.push(_l_ll[0])

  for (let i = 0, _l_len = _l_ll.length - 1; i < _l_len; i++) {
    let _l_a = _l_ll[i],
      _l_b = _l_ll[i + 1]

    if (
      lp.x < Math.max(_l_a.x, _l_b.x) + _l_d &&
      lp.x > Math.min(_l_a.x, _l_b.x) - _l_d &&
      lp.y < Math.max(_l_a.y, _l_b.y) + _l_d &&
      lp.y > Math.min(_l_a.y, _l_b.y) - _l_d
    ) {
      if (_l_a.x == _l_b.x) {
        if (Math.abs(lp.x - _l_a.x) <= _l_d) {
          hit = true
          index = i + 1
          break
        }
      } else if (_l_a.y == _l_b.y) {
        if (Math.abs(lp.y - _l_a.y) <= _l_d) {
          hit = true
          index = i + 1
          break
        }
      } else {
        let _la = _l_b.y - _l_a.y,
          _lb = _l_a.x - _l_b.x,
          _lc = _l_a.y * _l_b.x - _l_a.x * _l_b.y,
          _l_calc_d = Math.abs(
            (_la * lp.x + _lb * lp.y + _lc) /
              Math.sqrt(Math.pow(_la, 2) + Math.pow(_lb, 2))
          )

        if (_l_calc_d <= _l_d) {
          hit = true
          index = i + 1
          break
        }
      }
    }
  }

  if (!!returnI) return { hit: hit, index: index }
  return hit
}

/**
 * @ point in rect
 * @param _trotate 旋转角度
 * @param _x x轴长度
 * @param _y y轴长度
 * @param _tx 中心点x
 * @param _ty 中心点y
 * @param lp 点击位置
 */
const hitRect = (_trotate,_x,_y,_tx,_ty,lp) => { 

  let _xy   = Math.atan(_y / _x),
      _cgm  = Math.abs(((Math.atan((lp.y - _ty) / (lp.x - _tx)) - _trotate) + Math.PI / 4) % Math.PI - Math.PI / 4) % Math.PI,
      __tML = (_cgm > _xy && _cgm < Math.PI - _xy) ? _y / Math.cos(Math.PI / 2 - _cgm) : Math.abs(_x / Math.cos(_cgm)),
      __tL  = dist({x: lp.x, y: lp.y},{x: _tx, y: _ty});
      
  return __tL < __tML
}

// 阶乘 不要用for
const factorial = n => {
  if (n === 1) return 1
  return n * factorial(n - 1)
}

// 组合排序
const C = (n, k) => factorial(n) / (factorial(k) * factorial(n - k))

// 基函数
const BEZ = (n, k, t) => C(n, k) * Math.pow(t, k) * Math.pow(1 - t, n - k)

// bezier
const PBezier = (arr, l, t) => {
  let px = 0,
    py = 0,
    n = l - 1
  for (let i = 0, b; i < l; i++) {
    b = BEZ(n, i, t)
    px += arr[i].x * b
    py += arr[i].y * b
  }
  return [px, py]
}

// 燕尾
const coattail = (arr, step) => {
  let points = [{ x: arr[0].x, y: arr[0].y }],
    l = arr.length,
    p0 = [arr[0].x, arr[0].y],
    num = Math.ceil(1 / step + 1) * 2,
    ci = 1,
    p

  if (l < 2) return arr
  for (let i = step; i < 1; i += step, ci++) {
    p = PBezier(arr, l, i)
    let r = 12 - i * 9,
      radians = Math.atan2(p[1] - p0[1], p[0] - p0[0]) - Math.PI / 2,
      offsetX = r * Math.cos(radians),
      offsetY = r * Math.sin(radians)
    points[ci] = { x: p[0] + offsetX, y: p[1] + offsetY }
    points[num - ci] = { x: p[0] - offsetX, y: p[1] - offsetY }
    p0 = p
  }

  p = [arr[l - 1].x, arr[l - 1].y]
  let r = 24,
    radians = Math.atan2(p[1] - p0[1], p[0] - p0[0])
  p = { x: p0[0] + 10 * Math.cos(radians), y: p0[1] + 10 * Math.sin(radians) }
  points[ci++] = {
    x: p.x + r * Math.cos(Math.PI * 1.25 + radians),
    y: p.y + r * Math.sin(Math.PI * 1.25 + radians)
  }
  points[ci++] = p
  points[ci] = {
    x: p.x + r * Math.cos(Math.PI * 0.75 + radians),
    y: p.y + r * Math.sin(Math.PI * 0.75 + radians)
  }

  points.push({ x: arr[0].x, y: arr[0].y })
  return points
}

// 获取最大差值
const getMaxProfit = v => {
  if (v.length < 2) return 0
  let mP = v[0],
    max = 0,
    i = 0,
    len = v.length
  for (; i < len; i++)
    (mP = Math.min(mP, v[i])), (max = Math.max(max, v[i] - mP))

  return max
}

export default {
  dist,
  crossMul,
  checkCross,
  hitArea,
  hitLine,
  hitRect,
  factorial,
  C,
  BEZ,
  PBezier,
  coattail,
  getMaxProfit
}
