import { ref as l, onMounted as p, openBlock as c, createElementBlock as d, createElementVNode as u, Fragment as i, renderList as m } from "vue";
const f = (t, e) => {
  const r = t.__vccOpts || t;
  for (const [o, s] of e)
    r[o] = s;
  return r;
}, y = { class: "starry-sky-bg" }, h = { class: "stars" }, g = {
  __name: "send-record",
  props: {
    starsCount: {
      type: [Number, String],
      default: () => 800
    },
    distance: {
      type: [Number, String],
      default: () => 800
    }
  },
  setup(t) {
    const e = t, r = l();
    return p(() => {
      r.value.forEach((s) => {
        let n = 0.1 + Math.random() * 1, _ = e.distance + Math.random() * 300;
        s.style.transformOrigin = `0 0 ${_}px`, s.style.transform = `translate3d(0,0,-${_}px) rotateY(${Math.random() * 360}deg) rotateX(${Math.random() * -50}deg) scale(${n},${n})`;
      });
    }), (o, s) => (c(), d("div", y, [
      u("div", h, [
        (c(!0), d(i, null, m(t.starsCount, (n) => (c(), d("div", {
          key: n,
          class: "star",
          ref_for: !0,
          ref_key: "star",
          ref: r
        }))), 128))
      ])
    ]));
  }
}, a = /* @__PURE__ */ f(g, [["__scopeId", "data-v-704d07dd"]]);
a.install = (t) => {
  t.component(a.__name, a);
};
const v = [a], x = (t) => {
  v.forEach((e) => {
    t.component(e.__name, e);
  });
}, $ = {
  install: x
};
export {
  a as SendRecord,
  $ as default
};
