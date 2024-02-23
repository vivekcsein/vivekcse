let e = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
  t = /(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
  r = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi,
  n = /(^[#\.][a-z]|[a-y][a-z])/i,
  o = Math.PI / 180,
  i = Math.sin,
  l = Math.cos,
  a = Math.abs,
  s = Math.sqrt,
  h = (e) => "string" == typeof e,
  p = (e) => "number" == typeof e,
  g = (e) => Math.round(1e5 * e) / 1e5 || 0;
function c(e) {
  let t,
    r = 0;
  for (e.reverse(); r < e.length; r += 2)
    (t = e[r]), (e[r] = e[r + 1]), (e[r + 1] = t);
  e.reversed = !e.reversed;
}
let d = {
  rect: "rx,ry,x,y,width,height",
  circle: "r,cx,cy",
  ellipse: "rx,ry,cx,cy",
  line: "x1,x2,y1,y2",
};
function f(e, r) {
  let n,
    i,
    o,
    l,
    a,
    h,
    s,
    p,
    g,
    c,
    f,
    u,
    m,
    x,
    M,
    b,
    w,
    P,
    z,
    N,
    A,
    v,
    T = e.tagName.toLowerCase(),
    S = 0.552284749831;
  return "path" !== T && e.getBBox
    ? ((h = ((e, t) => {
        let r,
          n = document.createElementNS("http://www.w3.org/2000/svg", "path"),
          i = [].slice.call(e.attributes),
          o = i.length;
        for (t = "," + t + ","; --o > -1; )
          (r = i[o].nodeName.toLowerCase()),
            t.indexOf("," + r + ",") < 0 &&
              n.setAttributeNS(null, r, i[o].nodeValue);
        return n;
      })(e, "x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points")),
      (v = ((e, t) => {
        let r = t ? t.split(",") : [],
          n = {},
          i = r.length;
        for (; --i > -1; ) n[r[i]] = +e.getAttribute(r[i]) || 0;
        return n;
      })(e, d[T])),
      "rect" === T
        ? ((l = v.rx),
          (a = v.ry || l),
          (i = v.x),
          (o = v.y),
          (c = v.width - 2 * l),
          (f = v.height - 2 * a),
          l || a
            ? ((u = i + l * (1 - S)),
              (m = i + l),
              (x = m + c),
              (M = x + l * S),
              (b = x + l),
              (w = o + a * (1 - S)),
              (P = o + a),
              (z = P + f),
              (N = z + a * S),
              (A = z + a),
              (n =
                "M" +
                b +
                "," +
                P +
                " V" +
                z +
                " C" +
                [
                  b,
                  N,
                  M,
                  A,
                  x,
                  A,
                  x - (x - m) / 3,
                  A,
                  m + (x - m) / 3,
                  A,
                  m,
                  A,
                  u,
                  A,
                  i,
                  N,
                  i,
                  z,
                  i,
                  z - (z - P) / 3,
                  i,
                  P + (z - P) / 3,
                  i,
                  P,
                  i,
                  w,
                  u,
                  o,
                  m,
                  o,
                  m + (x - m) / 3,
                  o,
                  x - (x - m) / 3,
                  o,
                  x,
                  o,
                  M,
                  o,
                  b,
                  w,
                  b,
                  P,
                ].join(",") +
                "z"))
            : (n =
                "M" +
                (i + c) +
                "," +
                o +
                " v" +
                f +
                " h" +
                -c +
                " v" +
                -f +
                " h" +
                c +
                "z"))
        : "circle" === T || "ellipse" === T
          ? ("circle" === T
              ? ((l = a = v.r), (p = l * S))
              : ((l = v.rx), (a = v.ry), (p = a * S)),
            (i = v.cx),
            (o = v.cy),
            (s = l * S),
            (n =
              "M" +
              (i + l) +
              "," +
              o +
              " C" +
              [
                i + l,
                o + p,
                i + s,
                o + a,
                i,
                o + a,
                i - s,
                o + a,
                i - l,
                o + p,
                i - l,
                o,
                i - l,
                o - p,
                i - s,
                o - a,
                i,
                o - a,
                i + s,
                o - a,
                i + l,
                o - p,
                i + l,
                o,
              ].join(",") +
              "z"))
          : "line" === T
            ? (n = "M" + v.x1 + "," + v.y1 + " L" + v.x2 + "," + v.y2)
            : ("polyline" !== T && "polygon" !== T) ||
              ((g = (e.getAttribute("points") + "").match(t) || []),
              (i = g.shift()),
              (o = g.shift()),
              (n = "M" + i + "," + o + " L" + g.join(",")),
              "polygon" === T && (n += "," + i + "," + o + "z")),
      h.setAttribute("d", _((h._gsRawPath = y(n)))),
      r &&
        e.parentNode &&
        (e.parentNode.insertBefore(h, e), e.parentNode.removeChild(e)),
      h)
    : e;
}
function u(e, t, r, n, h, p, g, c, d) {
  if (e === c && t === d) return;
  (r = a(r)), (n = a(n));
  let f = (h % 360) * o,
    u = l(f),
    _ = i(f),
    m = Math.PI,
    y = 2 * m,
    x = (e - c) / 2,
    M = (t - d) / 2,
    b = u * x + _ * M,
    w = -_ * x + u * M,
    P = b * b,
    z = w * w,
    N = P / (r * r) + z / (n * n);
  N > 1 && ((r = s(N) * r), (n = s(N) * n));
  let A = r * r,
    v = n * n,
    T = (A * v - A * z - v * P) / (A * z + v * P);
  T < 0 && (T = 0);
  let S = (p === g ? -1 : 1) * s(T),
    C = S * ((r * w) / n),
    I = S * ((-n * b) / r),
    V = (e + c) / 2 + (u * C - _ * I),
    R = (t + d) / 2 + (_ * C + u * I),
    O = (b - C) / r,
    F = (w - I) / n,
    H = (-b - C) / r,
    L = (-w - I) / n,
    j = O * O + F * F,
    U = (F < 0 ? -1 : 1) * Math.acos(O / s(j)),
    Y =
      (O * L - F * H < 0 ? -1 : 1) *
      Math.acos((O * H + F * L) / s(j * (H * H + L * L)));
  isNaN(Y) && (Y = m),
    !g && Y > 0 ? (Y -= y) : g && Y < 0 && (Y += y),
    (U %= y),
    (Y %= y);
  let X,
    G = Math.ceil(a(Y) / (y / 4)),
    q = [],
    B = Y / G,
    D = ((4 / 3) * i(B / 2)) / (1 + l(B / 2)),
    E = u * r,
    Q = _ * r,
    J = _ * -n,
    K = u * n;
  for (X = 0; X < G; X++)
    (b = l((h = U + X * B))),
      (w = i(h)),
      (O = l((h += B))),
      (F = i(h)),
      q.push(b - D * w, w + D * b, O + D * F, F - D * O, O, F);
  for (X = 0; X < q.length; X += 2)
    (b = q[X]),
      (w = q[X + 1]),
      (q[X] = b * E + w * J + V),
      (q[X + 1] = b * Q + w * K + R);
  return (q[X - 2] = c), (q[X - 1] = d), q;
}
function y(t) {
  let n,
    i,
    o,
    l,
    h,
    s,
    p,
    g,
    c,
    d,
    f,
    _,
    m,
    y,
    x,
    M =
      (t + "")
        .replace(r, (e) => {
          let t = +e;
          return t < 1e-4 && t > -1e-4 ? 0 : t;
        })
        .match(e) || [],
    b = [],
    w = 0,
    P = 0,
    z = M.length,
    N = 0,
    A = "ERROR: malformed path: " + t,
    v = function (e, t, r, n) {
      (d = (r - e) / 3),
        (f = (n - t) / 3),
        p.push(e + d, t + f, r - d, n - f, r, n);
    };
  if (!t || !isNaN(M[0]) || isNaN(M[1])) return console.log(A), b;
  for (n = 0; n < z; n++)
    if (
      ((m = h),
      isNaN(M[n]) ? ((h = M[n].toUpperCase()), (s = h !== M[n])) : n--,
      (o = +M[n + 1]),
      (l = +M[n + 2]),
      s && ((o += w), (l += P)),
      n || ((g = o), (c = l)),
      "M" === h)
    )
      p && (p.length < 8 ? (b.length -= 1) : (N += p.length)),
        (w = g = o),
        (P = c = l),
        (p = [o, l]),
        b.push(p),
        (n += 2),
        (h = "L");
    else if ("C" === h)
      p || (p = [0, 0]),
        s || (w = P = 0),
        p.push(
          o,
          l,
          w + 1 * M[n + 3],
          P + 1 * M[n + 4],
          (w += 1 * M[n + 5]),
          (P += 1 * M[n + 6])
        ),
        (n += 6);
    else if ("S" === h)
      (d = w),
        (f = P),
        ("C" !== m && "S" !== m) ||
          ((d += w - p[p.length - 4]), (f += P - p[p.length - 3])),
        s || (w = P = 0),
        p.push(d, f, o, l, (w += 1 * M[n + 3]), (P += 1 * M[n + 4])),
        (n += 4);
    else if ("Q" === h)
      (d = w + (2 / 3) * (o - w)),
        (f = P + (2 / 3) * (l - P)),
        s || (w = P = 0),
        (w += 1 * M[n + 3]),
        (P += 1 * M[n + 4]),
        p.push(d, f, w + (2 / 3) * (o - w), P + (2 / 3) * (l - P), w, P),
        (n += 4);
    else if ("T" === h)
      (d = w - p[p.length - 4]),
        (f = P - p[p.length - 3]),
        p.push(
          w + d,
          P + f,
          o + (2 / 3) * (w + 1.5 * d - o),
          l + (2 / 3) * (P + 1.5 * f - l),
          (w = o),
          (P = l)
        ),
        (n += 2);
    else if ("H" === h) v(w, P, (w = o), P), (n += 1);
    else if ("V" === h) v(w, P, w, (P = o + (s ? P - w : 0))), (n += 1);
    else if ("L" === h || "Z" === h)
      "Z" === h && ((o = g), (l = c), (p.closed = !0)),
        ("L" === h || a(w - o) > 0.5 || a(P - l) > 0.5) &&
          (v(w, P, o, l), "L" === h && (n += 2)),
        (w = o),
        (P = l);
    else if ("A" === h) {
      if (
        ((y = M[n + 4]),
        (x = M[n + 5]),
        (d = M[n + 6]),
        (f = M[n + 7]),
        (i = 7),
        y.length > 1 &&
          (y.length < 3
            ? ((f = d), (d = x), i--)
            : ((f = x), (d = y.substr(2)), (i -= 2)),
          (x = y.charAt(1)),
          (y = y.charAt(0))),
        (_ = u(
          w,
          P,
          +M[n + 1],
          +M[n + 2],
          +M[n + 3],
          +y,
          +x,
          (s ? w : 0) + 1 * d,
          (s ? P : 0) + 1 * f
        )),
        (n += i),
        _)
      )
        for (i = 0; i < _.length; i++) p.push(_[i]);
      (w = p[p.length - 2]), (P = p[p.length - 1]);
    } else console.log(A);
  return (
    (n = p.length),
    n < 6
      ? (b.pop(), (n = 0))
      : p[0] === p[n - 2] && p[1] === p[n - 1] && (p.closed = !0),
    (b.totalPoints = N + n),
    b
  );
}
function _(e) {
  p(e[0]) && (e = [e]);
  let t,
    r,
    n,
    i,
    o = "",
    l = e.length;
  for (r = 0; r < l; r++) {
    for (
      i = e[r], o += "M" + g(i[0]) + "," + g(i[1]) + " C", t = i.length, n = 2;
      n < t;
      n++
    )
      o +=
        g(i[n++]) +
        "," +
        g(i[n++]) +
        " " +
        g(i[n++]) +
        "," +
        g(i[n++]) +
        " " +
        g(i[n++]) +
        "," +
        g(i[n]) +
        " ";
    i.closed && (o += "z");
  }
  return o;
}
let m,
  w,
  x,
  M,
  b,
  P = () =>
    m ||
    ("undefined" != typeof window &&
      (m = window.gsap) &&
      m.registerPlugin &&
      m),
  N = (e) => "function" == typeof e,
  v = Math.atan2,
  S = Math.cos,
  T = Math.sin,
  z = Math.sqrt,
  A = Math.PI,
  C = 2 * A,
  O = 0.3 * A,
  R = 0.7 * A,
  I = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,
  L = /(^[#\.][a-z]|[a-y][a-z])/i,
  F = /[achlmqstvz]/i,
  V = (e) => console && console.warn(e),
  j = function () {
    return String.fromCharCode.apply(null, arguments);
  },
  Y = j(103, 114, 101, 101, 110, 115, 111, 99, 107, 46, 99, 111, 109),
  G = j(103, 115, 97, 112, 46, 99, 111, 109),
  X = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}:?\d*$/,
  q = void ("undefined" != typeof window && window.location.host),
  E = (e) => {
    let t,
      r = e.length,
      n = 0,
      i = 0;
    for (t = 0; t < r; t++) (n += e[t++]), (i += e[t]);
    return [n / (r / 2), i / (r / 2)];
  },
  H = (e) => {
    let t,
      r,
      n,
      i = e.length,
      o = e[0],
      l = o,
      a = e[1],
      h = a;
    for (n = 6; n < i; n += 6)
      (t = e[n]),
        (r = e[n + 1]),
        t > o ? (o = t) : t < l && (l = t),
        r > a ? (a = r) : r < h && (h = r);
    return (
      (e.centerX = (o + l) / 2),
      (e.centerY = (a + h) / 2),
      (e.size = (o - l) * (a - h))
    );
  },
  U = (e, t = 3) => {
    let r,
      n,
      i,
      o,
      l,
      a,
      h,
      s,
      p,
      g,
      c,
      d,
      f,
      u,
      _,
      m,
      y = e.length,
      x = e[0][0],
      M = x,
      b = e[0][1],
      w = b,
      P = 1 / t;
    for (; --y > -1; )
      for (l = e[y], r = l.length, o = 6; o < r; o += 6)
        for (
          p = l[o],
            g = l[o + 1],
            c = l[o + 2] - p,
            u = l[o + 3] - g,
            d = l[o + 4] - p,
            _ = l[o + 5] - g,
            f = l[o + 6] - p,
            m = l[o + 7] - g,
            a = t;
          --a > -1;

        )
          (h = P * a),
            (s = 1 - h),
            (n = (h * h * f + 3 * s * (h * d + s * c)) * h + p),
            (i = (h * h * m + 3 * s * (h * _ + s * u)) * h + g),
            n > x ? (x = n) : n < M && (M = n),
            i > b ? (b = i) : i < w && (w = i);
    return (
      (e.centerX = (x + M) / 2),
      (e.centerY = (b + w) / 2),
      (e.left = M),
      (e.width = x - M),
      (e.top = w),
      (e.height = b - w),
      (e.size = (x - M) * (b - w))
    );
  },
  B = (e, t) => t.length - e.length,
  D = (e, t) => {
    let r = e.size || H(e),
      n = t.size || H(t);
    return Math.abs(n - r) < (r + n) / 20
      ? t.centerX - e.centerX || t.centerY - e.centerY
      : n - r;
  },
  W = (e, t) => {
    let r,
      n,
      i = e.slice(0),
      o = e.length,
      l = o - 2;
    for (t |= 0, r = 0; r < o; r++)
      (n = (r + t) % l), (e[r++] = i[n]), (e[r] = i[n + 1]);
  },
  Q = (e, t, r, n, i) => {
    let o,
      l,
      a,
      h,
      s = e.length,
      p = 0,
      g = s - 2;
    for (r *= 6, l = 0; l < s; l += 6)
      (o = (l + r) % g),
        (h = e[o] - (t[l] - n)),
        (a = e[o + 1] - (t[l + 1] - i)),
        (p += z(a * a + h * h));
    return p;
  },
  Z = (e, t, r) => {
    let n,
      i,
      o,
      l = e.length,
      a = E(e),
      h = E(t),
      s = h[0] - a[0],
      p = h[1] - a[1],
      g = Q(e, t, 0, s, p),
      d = 0;
    for (o = 6; o < l; o += 6)
      (i = Q(e, t, o / 6, s, p)), i < g && ((g = i), (d = o));
    if (r)
      for (n = e.slice(0), c(n), o = 6; o < l; o += 6)
        (i = Q(n, t, o / 6, s, p)), i < g && ((g = i), (d = -o));
    return d / 6;
  },
  k = (e, t, r) => {
    let n,
      i,
      o,
      l,
      a,
      h,
      s = e.length,
      p = 1e20,
      g = 0,
      c = 0;
    for (; --s > -1; )
      for (n = e[s], h = n.length, a = 0; a < h; a += 6)
        (i = n[a] - t),
          (o = n[a + 1] - r),
          (l = z(i * i + o * o)),
          l < p && ((p = l), (g = n[a]), (c = n[a + 1]));
    return [g, c];
  },
  $ = (e, t, r, n, i, o) => {
    let l,
      a,
      h,
      s,
      p,
      g = t.length,
      c = 0,
      d = Math.min(e.size || H(e), t[r].size || H(t[r])) * n,
      f = 1e20,
      u = e.centerX + i,
      _ = e.centerY + o;
    for (a = r; a < g && ((l = t[a].size || H(t[a])), !(l < d)); a++)
      (h = t[a].centerX - u),
        (s = t[a].centerY - _),
        (p = z(h * h + s * s)),
        p < f && ((c = a), (f = p));
    return (p = t[c]), t.splice(c, 1), p;
  },
  J = (e, t) => {
    let r,
      n,
      i,
      o,
      l,
      a,
      h,
      s,
      p,
      g,
      c,
      d,
      f,
      u,
      _ = 0,
      m = e.length,
      y = t / ((m - 2) / 6);
    for (f = 2; f < m; f += 6)
      for (_ += y; _ > 0.999999; )
        (r = e[f - 2]),
          (n = e[f - 1]),
          (i = e[f]),
          (o = e[f + 1]),
          (l = e[f + 2]),
          (a = e[f + 3]),
          (h = e[f + 4]),
          (s = e[f + 5]),
          (u = 1 / ((Math.floor(_) || 1) + 1)),
          (p = r + (i - r) * u),
          (c = i + (l - i) * u),
          (p += (c - p) * u),
          (c += (l + (h - l) * u - c) * u),
          (g = n + (o - n) * u),
          (d = o + (a - o) * u),
          (g += (d - g) * u),
          (d += (a + (s - a) * u - d) * u),
          e.splice(
            f,
            4,
            r + (i - r) * u,
            n + (o - n) * u,
            p,
            g,
            p + (c - p) * u,
            g + (d - g) * u,
            c,
            d,
            l + (h - l) * u,
            a + (s - a) * u
          ),
          (f += 6),
          (m += 6),
          _--;
    return e;
  },
  K = (e, t, r, n, i) => {
    let o,
      l,
      a,
      h,
      s,
      p,
      g,
      d = t.length - e.length,
      f = d > 0 ? t : e,
      u = d > 0 ? e : t,
      _ = 0,
      m = "complexity" === n ? B : D,
      y = "position" === n ? 0 : "number" == typeof n ? n : 0.8,
      x = u.length,
      M = "object" == typeof r && r.push ? r.slice(0) : [r],
      b = "reverse" === M[0] || M[0] < 0,
      w = "log" === r;
    if (u[0]) {
      if (
        f.length > 1 &&
        (e.sort(m),
        t.sort(m),
        (p = f.size || U(f)),
        (p = u.size || U(u)),
        (p = f.centerX - u.centerX),
        (g = f.centerY - u.centerY),
        m === D)
      )
        for (x = 0; x < u.length; x++) f.splice(x, 0, $(u[x], f, x, y, p, g));
      if (d)
        for (
          d < 0 && (d = -d),
            f[0].length > u[0].length &&
              J(u[0], ((f[0].length - u[0].length) / 6) | 0),
            x = u.length;
          _ < d;

        )
          (h = f[x].size || H(f[x])),
            (a = k(u, f[x].centerX, f[x].centerY)),
            (h = a[0]),
            (s = a[1]),
            (u[x++] = [h, s, h, s, h, s, h, s]),
            (u.totalPoints += 8),
            _++;
      for (x = 0; x < e.length; x++)
        (o = t[x]),
          (l = e[x]),
          (d = o.length - l.length),
          d < 0 ? J(o, (-d / 6) | 0) : d > 0 && J(l, (d / 6) | 0),
          b && !1 !== i && !l.reversed && c(l),
          (r = M[x] || 0 === M[x] ? M[x] : "auto") &&
            (l.closed ||
            (Math.abs(l[0] - l[l.length - 2]) < 0.5 &&
              Math.abs(l[1] - l[l.length - 1]) < 0.5)
              ? "auto" === r || "log" === r
                ? ((M[x] = r = Z(l, o, !x || !1 === i)),
                  r < 0 && ((b = !0), c(l), (r = -r)),
                  W(l, 6 * r))
                : "reverse" !== r &&
                  (x && r < 0 && c(l), W(l, 6 * (r < 0 ? -r : r)))
              : !b &&
                  (("auto" === r &&
                    Math.abs(o[0] - l[0]) +
                      Math.abs(o[1] - l[1]) +
                      Math.abs(o[o.length - 2] - l[l.length - 2]) +
                      Math.abs(o[o.length - 1] - l[l.length - 1]) >
                      Math.abs(o[0] - l[l.length - 2]) +
                        Math.abs(o[1] - l[l.length - 1]) +
                        Math.abs(o[o.length - 2] - l[0]) +
                        Math.abs(o[o.length - 1] - l[1])) ||
                    r % 2)
                ? (c(l), (M[x] = -1), (b = !0))
                : "auto" === r
                  ? (M[x] = 0)
                  : "reverse" === r && (M[x] = -1),
            l.closed !== o.closed && (l.closed = o.closed = !1));
      return w && V("shapeIndex:[" + M.join(",") + "]"), (e.shapeIndex = M), M;
    }
  },
  ee = (e, t, r, n, i) => {
    let o = y(e[0]),
      l = y(e[1]);
    K(o, l, t || 0 === t ? t : "auto", r, i) &&
      ((e[0] = _(o)),
      (e[1] = _(l)),
      ("log" !== n && !0 !== n) ||
        V('precompile:["' + e[0] + '","' + e[1] + '"]'));
  },
  te = (e, t) => {
    let r,
      n,
      i,
      o,
      l,
      a,
      h,
      s = 0,
      p = parseFloat(e[0]),
      g = parseFloat(e[1]),
      c = p + "," + g + " ";
    for (
      i = e.length, r = (0.5 * t) / (0.5 * i - 1), n = 0;
      n < i - 2;
      n += 2
    ) {
      if (
        ((s += r),
        (a = parseFloat(e[n + 2])),
        (h = parseFloat(e[n + 3])),
        s > 0.999999)
      )
        for (l = 1 / (Math.floor(s) + 1), o = 1; s > 0.999999; )
          (c +=
            (p + (a - p) * l * o).toFixed(2) +
            "," +
            (g + (h - g) * l * o).toFixed(2) +
            " "),
            s--,
            o++;
      (c += a + "," + h + " "), (p = a), (g = h);
    }
    return c;
  },
  re = (e) => {
    let t = e[0].match(I) || [],
      r = e[1].match(I) || [],
      n = r.length - t.length;
    n > 0 ? (e[0] = te(t, n)) : (e[1] = te(r, -n));
  },
  ne = (e) =>
    isNaN(e)
      ? re
      : (t) => {
          re(t),
            (t[1] = ((e, t) => {
              if (!t) return e;
              let r,
                n,
                i,
                o = e.match(I) || [],
                l = o.length,
                a = "";
              for (
                "reverse" === t
                  ? ((n = l - 1), (r = -2))
                  : ((n = (2 * (parseInt(t, 10) || 0) + 1 + 100 * l) % l),
                    (r = 2)),
                  i = 0;
                i < l;
                i += 2
              )
                (a += o[n - 1] + "," + o[n] + " "), (n = (n + r) % l);
              return a;
            })(t[1], parseInt(e, 10)));
        },
  oe = (e, t) => {
    let r,
      n,
      i,
      o,
      l,
      a,
      h,
      s,
      p,
      g,
      c,
      d,
      f = e.length,
      u = 0.2 * (t || 1);
    for (; --f > -1; ) {
      for (
        n = e[f],
          c = n.isSmooth = n.isSmooth || [0, 0, 0, 0],
          d = n.smoothData = n.smoothData || [0, 0, 0, 0],
          c.length = 4,
          s = n.length - 2,
          h = 6;
        h < s;
        h += 6
      )
        (i = n[h] - n[h - 2]),
          (o = n[h + 1] - n[h - 1]),
          (l = n[h + 2] - n[h]),
          (a = n[h + 3] - n[h + 1]),
          (p = v(o, i)),
          (g = v(a, l)),
          (r = Math.abs(p - g) < u),
          r &&
            ((d[h - 2] = p),
            (d[h + 2] = g),
            (d[h - 1] = z(i * i + o * o)),
            (d[h + 3] = z(l * l + a * a))),
          c.push(r, r, 0, 0, r, r);
      n[s] === n[0] &&
        n[s + 1] === n[1] &&
        ((i = n[0] - n[s - 2]),
        (o = n[1] - n[s - 1]),
        (l = n[2] - n[0]),
        (a = n[3] - n[1]),
        (p = v(o, i)),
        (g = v(a, l)),
        Math.abs(p - g) < u &&
          ((d[s - 2] = p),
          (d[2] = g),
          (d[s - 1] = z(i * i + o * o)),
          (d[3] = z(l * l + a * a)),
          (c[s - 2] = c[s - 1] = !0)));
    }
    return e;
  },
  ie = (e) => {
    let t = e.trim().split(" ");
    return {
      x:
        (~e.indexOf("left")
          ? 0
          : ~e.indexOf("right")
            ? 100
            : isNaN(parseFloat(t[0]))
              ? 50
              : parseFloat(t[0])) / 100,
      y:
        (~e.indexOf("top")
          ? 0
          : ~e.indexOf("bottom")
            ? 100
            : isNaN(parseFloat(t[1]))
              ? 50
              : parseFloat(t[1])) / 100,
    };
  },
  le =
    "Use MorphSVGPlugin.convertToPath() to convert to a path before morphing.",
  ae = function (e, t, r, n) {
    let i,
      o,
      l = this._origin,
      a = this._eOrigin,
      h = e[r] - l.x,
      s = e[r + 1] - l.y,
      p = z(h * h + s * s),
      g = v(s, h);
    var c;
    return (
      (h = t[r] - a.x),
      (s = t[r + 1] - a.y),
      (i = v(s, h) - g),
      (o = (c = i) !== c % A ? c + (c < 0 ? C : -C) : c),
      !n && x && Math.abs(o + x.ca) < O && (n = x),
      (this._anchorPT = x =
        {
          _next: this._anchorPT,
          t: e,
          sa: g,
          ca: n && o * n.ca < 0 && Math.abs(o) > R ? i : o,
          sl: p,
          cl: z(h * h + s * s) - p,
          i: r,
        })
    );
  },
  se = (e) => {
    (m = P()),
      (b = b || (m && m.plugins.morphSVG)),
      m && b
        ? ((w = m.utils.toArray), (b.prototype._tweenRotation = ae), (M = 1))
        : e && V("Please register");
  };
const he = {
  version: "1.2.3",
  name: "morphSVG",
  rawVars: 1,
  register(e, t) {
    (m = e), (b = t);
  },
  init(e, t, r, n, i) {
    if ((M || se(1), !t)) return V("invalid shape"), !1;
    let o, l, a, h, s, p, g, c, d, u, m, b, P, z, A, v, T, S, C, R, O, H;
    if (
      (N(t) && (t = t.call(r, n, e, i)),
      "string" == typeof t || t.getBBox || t[0])
    )
      t = { shape: t };
    else if ("object" == typeof t) {
      for (l in ((o = {}), t))
        o[l] = N(t[l]) && "render" !== l ? t[l].call(r, n, e, i) : t[l];
      t = o;
    }
    let j = e.nodeType ? window.getComputedStyle(e) : {},
      Y = j.fill + "",
      X = !(
        "none" === Y ||
        "0" === (Y.match(I) || [])[3] ||
        "evenodd" === j.fillRule
      ),
      G = (t.origin || "50 50").split(",");
    if (
      ((o = (e.nodeName + "").toUpperCase()),
      (s = "POLYLINE" === o || "POLYGON" === o),
      "PATH" !== o && !s && !t.prop)
    )
      return V("Cannot morph a <" + o + "> element. " + le), !1;
    if (((l = "PATH" === o ? "d" : "points"), !t.prop && !N(e.setAttribute)))
      return !1;
    if (
      ((h = ((e, t, r) => {
        let n, i;
        return (
          (!("string" == typeof e) ||
            L.test(e) ||
            (e.match(I) || []).length < 3) &&
            ((n = w(e)[0]),
            n
              ? ((i = (n.nodeName + "").toUpperCase()),
                t && "PATH" !== i && ((n = f(n, !1)), (i = "PATH")),
                (e = n.getAttribute("PATH" === i ? "d" : "points") || ""),
                n === r && (e = n.getAttributeNS(null, "data-original") || e))
              : (V("WARNING: invalid morph to: " + e), (e = !1))),
          e
        );
      })(t.shape || t.d || t.points || "", "d" === l, e)),
      s && F.test(h))
    )
      return V("A <" + o + "> cannot accept path data. " + le), !1;
    if (
      ((p = t.shapeIndex || 0 === t.shapeIndex ? t.shapeIndex : "auto"),
      (g = t.map || he.defaultMap),
      (this._prop = t.prop),
      (this._render = t.render || he.defaultRender),
      (this._apply =
        "updateTarget" in t ? t.updateTarget : he.defaultUpdateTarget),
      (this._rnd = Math.pow(10, isNaN(t.precision) ? 2 : +t.precision)),
      (this._tween = r),
      h)
    ) {
      if (
        ((this._target = e),
        (T = "object" == typeof t.precompile),
        (u = this._prop ? e[this._prop] : e.getAttribute(l)),
        this._prop ||
          e.getAttributeNS(null, "data-original") ||
          e.setAttributeNS(null, "data-original", u),
        "d" === l || this._prop)
      ) {
        if (
          ((u = y(T ? t.precompile[0] : u)),
          (m = y(T ? t.precompile[1] : h)),
          !T && !K(u, m, p, g, X))
        )
          return !1;
        for (
          ("log" !== t.precompile && !0 !== t.precompile) ||
            V('precompile:["' + _(u) + '","' + _(m) + '"]'),
            O = "linear" !== (t.type || he.defaultType),
            O &&
              ((u = oe(u, t.smoothTolerance)),
              (m = oe(m, t.smoothTolerance)),
              u.size || U(u),
              m.size || U(m),
              (R = ie(G[0])),
              (this._origin = u.origin =
                { x: u.left + R.x * u.width, y: u.top + R.y * u.height }),
              G[1] && (R = ie(G[1])),
              (this._eOrigin = {
                x: m.left + R.x * m.width,
                y: m.top + R.y * m.height,
              })),
            this._rawPath = e._gsRawPath = u,
            P = u.length;
          --P > -1;

        )
          for (
            A = u[P],
              v = m[P],
              c = A.isSmooth || [],
              d = v.isSmooth || [],
              z = A.length,
              x = 0,
              b = 0;
            b < z;
            b += 2
          )
            (v[b] === A[b] && v[b + 1] === A[b + 1]) ||
              (O
                ? c[b] && d[b]
                  ? ((S = A.smoothData),
                    (C = v.smoothData),
                    (H = b + (b === z - 4 ? 7 - z : 5)),
                    (this._controlPT = {
                      _next: this._controlPT,
                      i: b,
                      j: P,
                      l1s: S[b + 1],
                      l1c: C[b + 1] - S[b + 1],
                      l2s: S[H],
                      l2c: C[H] - S[H],
                    }),
                    (a = this._tweenRotation(A, v, b + 2)),
                    this._tweenRotation(A, v, b, a),
                    this._tweenRotation(A, v, H - 1, a),
                    (b += 4))
                  : this._tweenRotation(A, v, b)
                : ((a = this.add(A, b, A[b], v[b], 0, 0, 0, 0, 0, 1)),
                  (a =
                    this.add(A, b + 1, A[b + 1], v[b + 1], 0, 0, 0, 0, 0, 1) ||
                    a)));
      } else
        a = this.add(
          e,
          "setAttribute",
          e.getAttribute(l) + "",
          h + "",
          n,
          i,
          0,
          ne(p),
          l
        );
      O &&
        (this.add(
          this._origin,
          "x",
          this._origin.x,
          this._eOrigin.x,
          0,
          0,
          0,
          0,
          0,
          1
        ),
        (a = this.add(
          this._origin,
          "y",
          this._origin.y,
          this._eOrigin.y,
          0,
          0,
          0,
          0,
          0,
          1
        ))),
        a && (this._props.push("morphSVG"), (a.end = h), (a.endProp = l));
    }
    return q;
  },
  render(e, t) {
    let r,
      n,
      i,
      o,
      l,
      a,
      h,
      s,
      p,
      g,
      c,
      d,
      f,
      u = t._rawPath,
      _ = t._controlPT,
      m = t._anchorPT,
      y = t._rnd,
      x = t._target,
      M = t._pt;
    for (; M; ) M.r(e, M.d), (M = M._next);
    if (1 === e && t._apply)
      for (M = t._pt; M; )
        M.end &&
          (t._prop ? (x[t._prop] = M.end) : x.setAttribute(M.endProp, M.end)),
          (M = M._next);
    else if (u) {
      for (; m; )
        (a = m.sa + e * m.ca),
          (l = m.sl + e * m.cl),
          (m.t[m.i] = t._origin.x + S(a) * l),
          (m.t[m.i + 1] = t._origin.y + T(a) * l),
          (m = m._next);
      for (i = e < 0.5 ? 2 * e * e : (4 - 2 * e) * e - 1; _; )
        (h = _.i),
          (o = u[_.j]),
          (f = h + (h === o.length - 4 ? 7 - o.length : 5)),
          (a = v(o[f] - o[h + 1], o[f - 1] - o[h])),
          (c = T(a)),
          (d = S(a)),
          (p = o[h + 2]),
          (g = o[h + 3]),
          (l = _.l1s + i * _.l1c),
          (o[h] = p - d * l),
          (o[h + 1] = g - c * l),
          (l = _.l2s + i * _.l2c),
          (o[f - 1] = p + d * l),
          (o[f] = g + c * l),
          (_ = _._next);
      if (((x._gsRawPath = u), t._apply)) {
        for (r = "", n = " ", s = 0; s < u.length; s++)
          for (
            o = u[s],
              l = o.length,
              r +=
                "M" + ((o[0] * y) | 0) / y + " " + ((o[1] * y) | 0) / y + " C",
              h = 2;
            h < l;
            h++
          )
            r += ((o[h] * y) | 0) / y + " ";
        t._prop ? (x[t._prop] = r) : x.setAttribute("d", r);
      }
    }
    t._render && u && t._render.call(t._tween, u, x);
  },
  kill(e) {
    this._pt = this._rawPath = 0;
  },
  getRawPath: function (e) {
    let t,
      r = (e = (h(e) && n.test(e) && document.querySelector(e)) || e)
        .getAttribute
        ? e
        : 0;
    return r && (e = e.getAttribute("d"))
      ? (r._gsPath || (r._gsPath = {}),
        (t = r._gsPath[e]),
        t && !t._dirty ? t : (r._gsPath[e] = y(e)))
      : e
        ? h(e)
          ? y(e)
          : p(e[0])
            ? [e]
            : e
        : console.warn("Expecting a <path> element or an SVG path data string");
  },
  stringToRawPath: y,
  rawPathToString: _,
  normalizeStrings(e, t, { shapeIndex: r, map: n }) {
    let i = [e, t];
    return ee(i, r, n), i;
  },
  pathFilter: ee,
  pointsFilter: re,
  getTotalSize: U,
  equalizeSegmentQuantity: K,
  convertToPath: (e, t) => w(e).map((e) => f(e, !1 !== t)),
  defaultType: "linear",
  defaultUpdateTarget: !0,
  defaultMap: "size",
};
P() && m.registerPlugin(he);
export default he;
export { he as SVGPlugin };
