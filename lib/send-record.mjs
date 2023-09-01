import { defineComponent as U, reactive as E, computed as I, ref as S, openBlock as M, createElementBlock as P, createElementVNode as w, toDisplayString as V, createCommentVNode as j, withDirectives as B, createTextVNode as z, vShow as D, pushScopeId as L, popScopeId as k } from "vue";
var T = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function W(m) {
  return m && m.__esModule && Object.prototype.hasOwnProperty.call(m, "default") ? m.default : m;
}
var O = { exports: {} };
/*!
 * 
 * js-audio-recorder - js audio recorder plugin
 * 
 * @version v1.0.7
 * @homepage https://github.com/2fps/recorder
 * @author 2fps <echoweb@126.com> (https://www.zhuyuntao.cn)
 * @license MIT
 *         
 */
(function(m, g) {
  (function(_, l) {
    m.exports = l();
  })(T, function() {
    return function(_) {
      var l = {};
      function p(a) {
        if (l[a])
          return l[a].exports;
        var i = l[a] = { i: a, l: !1, exports: {} };
        return _[a].call(i.exports, i, i.exports, p), i.l = !0, i.exports;
      }
      return p.m = _, p.c = l, p.d = function(a, i, o) {
        p.o(a, i) || Object.defineProperty(a, i, { enumerable: !0, get: o });
      }, p.r = function(a) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(a, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(a, "__esModule", { value: !0 });
      }, p.t = function(a, i) {
        if (1 & i && (a = p(a)), 8 & i || 4 & i && typeof a == "object" && a && a.__esModule)
          return a;
        var o = /* @__PURE__ */ Object.create(null);
        if (p.r(o), Object.defineProperty(o, "default", { enumerable: !0, value: a }), 2 & i && typeof a != "string")
          for (var t in a)
            p.d(o, t, (function(n) {
              return a[n];
            }).bind(null, t));
        return o;
      }, p.n = function(a) {
        var i = a && a.__esModule ? function() {
          return a.default;
        } : function() {
          return a;
        };
        return p.d(i, "a", i), i;
      }, p.o = function(a, i) {
        return Object.prototype.hasOwnProperty.call(a, i);
      }, p.p = "", p(p.s = 1);
    }([function(_, l, p) {
      function a(i, o, t) {
        for (var n = 0; n < t.length; n++)
          i.setUint8(o + n, t.charCodeAt(n));
      }
      Object.defineProperty(l, "__esModule", { value: !0 }), l.compress = function(i, o, t) {
        for (var n = o / t, f = Math.max(n, 1), c = i.left, r = i.right, e = Math.floor((c.length + r.length) / n), d = new Float32Array(e), s = 0, v = 0; s < e; ) {
          var u = Math.floor(v);
          d[s] = c[u], s++, r.length && (d[s] = r[u], s++), v += f;
        }
        return d;
      }, l.encodePCM = function(i, o, t) {
        t === void 0 && (t = !0);
        var n = 0, f = i.length * (o / 8), c = new ArrayBuffer(f), r = new DataView(c);
        if (o === 8)
          for (var e = 0; e < i.length; e++, n++) {
            var d = (s = Math.max(-1, Math.min(1, i[e]))) < 0 ? 128 * s : 127 * s;
            d = +d + 128, r.setInt8(n, d);
          }
        else
          for (e = 0; e < i.length; e++, n += 2) {
            var s = Math.max(-1, Math.min(1, i[e]));
            r.setInt16(n, s < 0 ? 32768 * s : 32767 * s, t);
          }
        return r;
      }, l.encodeWAV = function(i, o, t, n, f, c) {
        c === void 0 && (c = !0);
        var r = t > o ? o : t, e = f, d = new ArrayBuffer(44 + i.byteLength), s = new DataView(d), v = n, u = 0;
        a(s, u, "RIFF"), u += 4, s.setUint32(u, 36 + i.byteLength, c), a(s, u += 4, "WAVE"), a(s, u += 4, "fmt "), u += 4, s.setUint32(u, 16, c), u += 4, s.setUint16(u, 1, c), u += 2, s.setUint16(u, v, c), u += 2, s.setUint32(u, r, c), u += 4, s.setUint32(u, v * r * (e / 8), c), u += 4, s.setUint16(u, v * (e / 8), c), u += 2, s.setUint16(u, e, c), a(s, u += 2, "data"), u += 4, s.setUint32(u, i.byteLength, c), u += 4;
        for (var y = 0; y < i.byteLength; )
          s.setUint8(u, i.getUint8(y)), u++, y++;
        return s;
      };
    }, function(_, l, p) {
      var a, i = this && this.__extends || (a = function(c, r) {
        return (a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, d) {
          e.__proto__ = d;
        } || function(e, d) {
          for (var s in d)
            d.hasOwnProperty(s) && (e[s] = d[s]);
        })(c, r);
      }, function(c, r) {
        function e() {
          this.constructor = c;
        }
        a(c, r), c.prototype = r === null ? Object.create(r) : (e.prototype = r.prototype, new e());
      });
      Object.defineProperty(l, "__esModule", { value: !0 });
      var o = p(2), t = p(0), n = p(3), f = function(c) {
        function r(e) {
          e === void 0 && (e = {});
          var d = c.call(this, e) || this;
          return d.isrecording = !1, d.ispause = !1, d.isplaying = !1, d;
        }
        return i(r, c), r.prototype.setOption = function(e) {
          e === void 0 && (e = {}), this.setNewOption(e);
        }, r.prototype.start = function() {
          return this.isrecording ? Promise.reject() : (this.isrecording = !0, this.startRecord());
        }, r.prototype.pause = function() {
          this.isrecording && !this.ispause && (this.ispause = !0, this.pauseRecord());
        }, r.prototype.resume = function() {
          this.isrecording && this.ispause && (this.ispause = !1, this.resumeRecord());
        }, r.prototype.stop = function() {
          this.isrecording && (this.isrecording = !1, this.ispause = !1, this.stopRecord());
        }, r.prototype.play = function() {
          this.stop(), this.isplaying = !0, this.onplay && this.onplay(), n.default.addPlayEnd(this.onplayend);
          var e = this.getWAV();
          e.byteLength > 44 && n.default.play(e.buffer);
        }, r.prototype.getPlayTime = function() {
          return n.default.getPlayTime();
        }, r.prototype.pausePlay = function() {
          !this.isrecording && this.isplaying && (this.isplaying = !1, this.onpauseplay && this.onpauseplay(), n.default.pausePlay());
        }, r.prototype.resumePlay = function() {
          this.isrecording || this.isplaying || (this.isplaying = !0, this.onresumeplay && this.onresumeplay(), n.default.resumePlay());
        }, r.prototype.stopPlay = function() {
          this.isrecording || (this.isplaying = !1, this.onstopplay && this.onstopplay(), n.default.stopPlay());
        }, r.prototype.destroy = function() {
          return n.default.destroyPlay(), this.destroyRecord();
        }, r.prototype.getRecordAnalyseData = function() {
          return this.getAnalyseData();
        }, r.prototype.getPlayAnalyseData = function() {
          return n.default.getAnalyseData();
        }, r.prototype.getPCM = function() {
          this.stop();
          var e = this.getData();
          return e = t.compress(e, this.inputSampleRate, this.outputSampleRate), t.encodePCM(e, this.oututSampleBits, this.littleEdian);
        }, r.prototype.getPCMBlob = function() {
          return new Blob([this.getPCM()]);
        }, r.prototype.downloadPCM = function(e) {
          e === void 0 && (e = "recorder");
          var d = this.getPCMBlob();
          o.downloadPCM(d, e);
        }, r.prototype.getWAV = function() {
          var e = this.getPCM();
          return t.encodeWAV(e, this.inputSampleRate, this.outputSampleRate, this.config.numChannels, this.oututSampleBits, this.littleEdian);
        }, r.prototype.getWAVBlob = function() {
          return new Blob([this.getWAV()], { type: "audio/wav" });
        }, r.prototype.downloadWAV = function(e) {
          e === void 0 && (e = "recorder");
          var d = this.getWAVBlob();
          o.downloadWAV(d, e);
        }, r.prototype.download = function(e, d, s) {
          o.download(e, d, s);
        }, r.prototype.getChannelData = function() {
          var e = this.getPCM(), d = e.byteLength, s = this.littleEdian, v = { left: null, right: null };
          if (this.config.numChannels === 2) {
            var u = new DataView(new ArrayBuffer(d / 2)), y = new DataView(new ArrayBuffer(d / 2));
            if (this.config.sampleBits === 16)
              for (var h = 0; h < d / 2; h += 2)
                u.setInt16(h, e.getInt16(2 * h, s), s), y.setInt16(h, e.getInt16(2 * h + 2, s), s);
            else
              for (h = 0; h < d / 2; h += 2)
                u.setInt8(h, e.getInt8(2 * h)), y.setInt8(h, e.getInt8(2 * h + 1));
            v.left = u, v.right = y;
          } else
            v.left = e;
          return v;
        }, r;
      }(p(5).default);
      l.default = f;
    }, function(_, l, p) {
      function a(i, o, t) {
        var n = document.createElement("a");
        n.href = window.URL.createObjectURL(i), n.download = o + "." + t, n.click();
      }
      Object.defineProperty(l, "__esModule", { value: !0 }), l.downloadWAV = function(i, o) {
        o === void 0 && (o = "recorder"), a(i, o, "wav");
      }, l.downloadPCM = function(i, o) {
        o === void 0 && (o = "recorder"), a(i, o, "pcm");
      }, l.download = function(i, o, t) {
        return a(i, o, t);
      };
    }, function(_, l, p) {
      Object.defineProperty(l, "__esModule", { value: !0 });
      var a = p(4), i = null, o = 0, t = 0, n = null, f = null, c = null, r = !1, e = 0, d = function() {
      };
      function s() {
        return r = !1, n.decodeAudioData(c.slice(0), function(y) {
          (i = n.createBufferSource()).onended = function() {
            r || (e = n.currentTime - t + o, d());
          }, i.buffer = y, i.connect(f), f.connect(n.destination), i.start(0, o), t = n.currentTime;
        }, function(y) {
          a.throwError(y);
        });
      }
      function v() {
        i && (i.stop(), i = null);
      }
      var u = function() {
        function y() {
        }
        return y.play = function(h) {
          return n || (n = new (window.AudioContext || window.webkitAudioContext)(), (f = n.createAnalyser()).fftSize = 2048), this.stopPlay(), c = h, e = 0, s();
        }, y.pausePlay = function() {
          v(), o += n.currentTime - t, r = !0;
        }, y.resumePlay = function() {
          return s();
        }, y.stopPlay = function() {
          o = 0, c = null, v();
        }, y.destroyPlay = function() {
          this.stopPlay();
        }, y.getAnalyseData = function() {
          var h = new Uint8Array(f.frequencyBinCount);
          return f.getByteTimeDomainData(h), h;
        }, y.addPlayEnd = function(h) {
          h === void 0 && (h = function() {
          }), d = h;
        }, y.getPlayTime = function() {
          var h = r ? o : n.currentTime - t + o;
          return e || h;
        }, y;
      }();
      l.default = u;
    }, function(_, l, p) {
      Object.defineProperty(l, "__esModule", { value: !0 }), l.throwError = function(a) {
        throw new Error(a);
      };
    }, function(_, l, p) {
      Object.defineProperty(l, "__esModule", { value: !0 });
      var a = p(0), i = function() {
        function o(t) {
          t === void 0 && (t = {}), this.size = 0, this.lBuffer = [], this.rBuffer = [], this.tempPCM = [], this.inputSampleBits = 16, this.fileSize = 0, this.duration = 0, this.needRecord = !0;
          var n, f = new (window.AudioContext || window.webkitAudioContext)();
          this.inputSampleRate = f.sampleRate, this.setNewOption(t), this.littleEdian = (n = new ArrayBuffer(2), new DataView(n).setInt16(0, 256, !0), new Int16Array(n)[0] === 256), o.initUserMedia();
        }
        return o.prototype.setNewOption = function(t) {
          t === void 0 && (t = {}), this.config = { sampleBits: ~[8, 16].indexOf(t.sampleBits) ? t.sampleBits : 16, sampleRate: ~[8e3, 11025, 16e3, 22050, 24e3, 44100, 48e3].indexOf(t.sampleRate) ? t.sampleRate : this.inputSampleRate, numChannels: ~[1, 2].indexOf(t.numChannels) ? t.numChannels : 1 }, this.outputSampleRate = this.config.sampleRate, this.oututSampleBits = this.config.sampleBits;
        }, o.prototype.startRecord = function() {
          var t = this;
          return this.context && this.destroyRecord(), this.initRecorder(), navigator.mediaDevices.getUserMedia({ audio: !0 }).then(function(n) {
            t.audioInput = t.context.createMediaStreamSource(n), t.stream = n;
          }).then(function() {
            t.audioInput.connect(t.analyser), t.analyser.connect(t.recorder), t.recorder.connect(t.context.destination);
          });
        }, o.prototype.pauseRecord = function() {
          this.needRecord = !1;
        }, o.prototype.resumeRecord = function() {
          this.needRecord = !0;
        }, o.prototype.stopRecord = function() {
          this.audioInput && this.audioInput.disconnect(), this.source && this.source.stop(), this.recorder.disconnect(), this.analyser.disconnect(), this.needRecord = !0;
        }, o.prototype.destroyRecord = function() {
          return this.clearRecordStatus(), this.stopStream(), this.closeAudioContext();
        }, o.prototype.getAnalyseData = function() {
          var t = new Uint8Array(this.analyser.frequencyBinCount);
          return this.analyser.getByteTimeDomainData(t), t;
        }, o.prototype.getData = function() {
          return this.flat();
        }, o.prototype.clearRecordStatus = function() {
          this.lBuffer.length = 0, this.rBuffer.length = 0, this.size = 0, this.fileSize = 0, this.PCM = null, this.audioInput = null, this.duration = 0;
        }, o.prototype.flat = function() {
          var t = null, n = new Float32Array(0);
          this.config.numChannels === 1 ? t = new Float32Array(this.size) : (t = new Float32Array(this.size / 2), n = new Float32Array(this.size / 2));
          for (var f = 0, c = 0; c < this.lBuffer.length; c++)
            t.set(this.lBuffer[c], f), f += this.lBuffer[c].length;
          for (f = 0, c = 0; c < this.rBuffer.length; c++)
            n.set(this.rBuffer[c], f), f += this.rBuffer[c].length;
          return { left: t, right: n };
        }, o.prototype.initRecorder = function() {
          var t = this;
          this.clearRecordStatus(), this.context = new (window.AudioContext || window.webkitAudioContext)(), this.analyser = this.context.createAnalyser(), this.analyser.fftSize = 2048;
          var n = this.context.createScriptProcessor || this.context.createJavaScriptNode;
          this.recorder = n.apply(this.context, [4096, this.config.numChannels, this.config.numChannels]), this.recorder.onaudioprocess = function(f) {
            if (t.needRecord) {
              var c, r = f.inputBuffer.getChannelData(0), e = null;
              t.lBuffer.push(new Float32Array(r)), t.size += r.length, t.config.numChannels === 2 && (e = f.inputBuffer.getChannelData(1), t.rBuffer.push(new Float32Array(e)), t.size += e.length), t.fileSize = Math.floor(t.size / Math.max(t.inputSampleRate / t.outputSampleRate, 1)) * (t.oututSampleBits / 8), c = 100 * Math.max.apply(Math, r), t.duration += 4096 / t.inputSampleRate, t.onprocess && t.onprocess(t.duration), t.onprogress && t.onprogress({ duration: t.duration, fileSize: t.fileSize, vol: c });
            }
          };
        }, o.prototype.stopStream = function() {
          this.stream && this.stream.getTracks && (this.stream.getTracks().forEach(function(t) {
            return t.stop();
          }), this.stream = null);
        }, o.prototype.closeAudioContext = function() {
          return this.context && this.context.close && this.context.state !== "closed" ? this.context.close() : new Promise(function(t) {
            t();
          });
        }, o.initUserMedia = function() {
          navigator.mediaDevices === void 0 && (navigator.mediaDevices = {}), navigator.mediaDevices.getUserMedia === void 0 && (navigator.mediaDevices.getUserMedia = function(t) {
            var n = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            return n ? new Promise(function(f, c) {
              n.call(navigator, t, f, c);
            }) : Promise.reject(new Error("浏览器不支持 getUserMedia !"));
          });
        }, o.prototype.transformIntoPCM = function(t, n) {
          var f = new Float32Array(t), c = new Float32Array(n), r = a.compress({ left: f, right: c }, this.inputSampleRate, this.outputSampleRate);
          return a.encodePCM(r, this.oututSampleBits, this.littleEdian);
        }, o.getPermission = function() {
          return this.initUserMedia(), navigator.mediaDevices.getUserMedia({ audio: !0 }).then(function(t) {
            t && t.getTracks().forEach(function(n) {
              return n.stop();
            });
          });
        }, o;
      }();
      l.default = i;
    }]).default;
  });
})(O);
var F = O.exports, N = F;
const G = /* @__PURE__ */ W(N), R = (m) => (L("data-v-c9a9518c"), m = m(), k(), m), $ = /* @__PURE__ */ R(() => /* @__PURE__ */ w("svg", {
  width: "20",
  height: "20",
  t: "1693473966123",
  class: "icon",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "4112"
}, [
  /* @__PURE__ */ w("path", {
    d: "M827.246871 451.075419c-12.94994-0.588401-23.925922 9.432837-24.51637 22.382776-0.093121 2.062985-0.418532 6.353708-1.106194 12.542664-1.170662 10.54824-2.959402 22.35924-5.490038 35.106566-7.226588 36.413328-18.898419 72.794933-35.917024 106.534362-47.672766 94.508467-126.925784 150.334937-248.217245 150.71663-121.290437-0.381693-200.546525-56.208163-248.217245-150.71663-17.018605-33.739429-28.692482-70.120011-35.919071-106.534362-2.529613-12.747325-4.317329-24.558325-5.487991-35.106566-0.687662-6.188956-1.014096-10.479679-1.108241-12.542664-0.588401-12.94994-11.564383-22.971178-24.514323-22.382776-12.951987 0.588401-22.973224 11.564383-22.382776 24.51637 0.5137 11.339256 2.63092 30.394241 7.446599 54.654784 8.000208 40.316218 20.946055 80.665181 40.051181 118.537743 51.840692 102.776781 138.972145 167.127392 265.456884 175.017082l0 85.599563L291.185872 909.400962c-12.96529 0-23.473621 10.510378-23.473621 23.473621 0 12.96529 10.508331 23.473621 23.473621 23.473621l441.857477 0c12.963243 0 23.473621-10.508331 23.473621-23.473621 0-12.963243-10.510378-23.473621-23.473621-23.473621L534.272259 909.400962l0-85.454254c127.791501-7.209192 215.690434-71.734788 267.86063-175.162392 19.104103-37.872562 32.050973-78.221526 40.051181-118.537743 4.815679-24.260543 6.930853-43.315528 7.446599-54.654784C850.217025 462.639802 840.197834 451.66382 827.246871 451.075419zM510.171352 700.19215c106.568131 0 193.353706-86.506213 193.353706-193.220676L703.525058 260.871449c0-106.59269-86.567611-193.220676-193.353706-193.220676-106.570177 0-193.353706 86.508259-193.353706 193.220676l0 246.100024C316.817646 613.567233 403.385257 700.19215 510.171352 700.19215zM363.764887 260.871449c0-80.693834 65.674769-146.273435 146.407488-146.273435 80.8197 0 146.407488 65.570391 146.407488 146.273435l0 246.100024c0 80.69588-65.674769 146.273435-146.407488 146.273435-80.8197 0-146.407488-65.568345-146.407488-146.273435L363.764887 260.871449z",
    fill: "#272636",
    "p-id": "4113"
  })
], -1)), q = [
  $
], H = { key: 0 }, J = { class: "icon-box" }, K = /* @__PURE__ */ R(() => /* @__PURE__ */ w("path", {
  d: "M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m0 981.333333C253.866667 981.333333 42.666667 770.133333 42.666667 512S253.866667 42.666667 512 42.666667s469.333333 211.2 469.333333 469.333333-211.2 469.333333-469.333333 469.333333z",
  fill: "#515151",
  "p-id": "5084"
}, null, -1)), Q = /* @__PURE__ */ R(() => /* @__PURE__ */ w("path", {
  d: "M672 441.6l-170.666667-113.066667c-57.6-38.4-106.666667-12.8-106.666666 57.6v256c0 70.4 46.933333 96 106.666666 57.6l170.666667-113.066666c57.6-42.666667 57.6-106.666667 0-145.066667z",
  fill: "#515151",
  "p-id": "5085"
}, null, -1)), X = /* @__PURE__ */ R(() => /* @__PURE__ */ w("path", {
  d: "M511.474 884.11c-205.692 0-373.042-167.083-373.042-372.46 0-205.371 167.35-372.46 373.042-372.46 205.698 0 373.042 167.089 373.042 372.46 0 205.376-167.344 372.46-373.042 372.46m0-819.412c-246.84 0-447.649 200.496-447.649 446.951 0 246.457 200.809 446.951 447.649 446.951 246.842 0 447.649-200.494 447.649-446.951 0-246.455-200.808-446.951-447.649-446.951m127.768 580.701V378.6c0-20.573-16.701-37.247-37.301-37.247-20.606 0-37.307 16.675-37.307 37.247v266.799c0 20.574 16.701 37.249 37.307 37.249 20.601 0 37.301-16.675 37.301-37.249m-179.876 0V378.6c0-20.573-16.701-37.247-37.301-37.247-20.606 0-37.307 16.675-37.307 37.247v266.799c0 20.574 16.701 37.249 37.307 37.249 20.6 0 37.301-16.675 37.301-37.249",
  fill: "#515151",
  "p-id": "6104"
}, null, -1)), Y = [
  X
], Z = /* @__PURE__ */ R(() => /* @__PURE__ */ w("br", null, null, -1)), tt = /* @__PURE__ */ R(() => /* @__PURE__ */ w("svg", {
  t: "1693479917670",
  class: "icon",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "7988",
  width: "20",
  height: "20"
}, [
  /* @__PURE__ */ w("path", {
    d: "M510.825 162c-98.288 0-187.097 40.292-250.839 105.148V182h-60.201v200h200.672v-60H291.104c53.349-61.229 131.967-100 219.721-100 160.7 0 290.974 129.837 290.974 290 0 160.162-130.274 290-290.974 290-147.075 0-268.592-108.777-288.152-250H162c19.926 174.451 168.456 310 348.825 310C704.773 862 862 705.3 862 512S704.773 162 510.825 162z",
    fill: "#515151",
    "p-id": "7989"
  })
], -1)), et = [
  tt
], nt = { style: { "margin-top": "300px" } }, C = 1, b = 2, x = 3, ot = /* @__PURE__ */ U({
  __name: "send-record",
  setup(m) {
    const g = E(new G()), _ = I(() => c(g.duration)), l = S(C);
    function p() {
      if (l.value === C) {
        a();
        return;
      }
      if (l.value === b) {
        i();
        return;
      }
    }
    function a() {
      console.log(g), g.start().then(
        () => {
          console.log("开始录音");
        },
        (s) => {
          console.log(`异常了,${s.name}:${s.message}`);
        }
      ), l.value = b;
    }
    function i() {
      g == null || g.stop(), console.log(g.file), l.value = x;
    }
    function o() {
      g.play();
    }
    function t() {
      g.pausePlay();
    }
    function n() {
      l.value = C;
    }
    function f() {
      console.log("wav: ", g.getWAVBlob()), g.downloadWAV();
    }
    function c(s) {
      const v = Math.floor(s), u = Math.floor(v / 60), y = v % 60;
      return `${u < 10 ? "0" + u : u}:${y < 10 ? "0" + y : y}`;
    }
    g.onprogress = (s) => {
      console.log("音频总数据：", s);
    }, g.onplay = () => {
      console.log("%c回调监听，开始播放音频", "color: #2196f3");
    }, g.onpauseplay = () => {
      console.log("%c回调监听，暂停播放音频", "color: #2196f3");
    }, g.onresumeplay = () => {
      console.log("%c回调监听，恢复播放音频", "color: #2196f3");
    }, g.onstopplay = () => {
      console.log("%c回调监听，停止播放音频", "color: #2196f3");
    }, g.onplayend = () => {
      g.isplaying = !1, console.log("%c回调监听，音频已经完成播放", "color: #2196f3");
    };
    const r = S(new Audio());
    async function e(s) {
      const v = s.target.files[0];
      if (v.isLoaded) {
        r.value.play();
        return;
      }
      await d(v), r.value.play();
    }
    function d(s) {
      return new Promise((v, u) => {
        var y = URL.createObjectURL(s), h = new Audio(y);
        r.value = h, h.addEventListener("loadedmetadata", () => {
          s.isLoaded = !0, v(h);
        }), h.addEventListener("error", u);
      });
    }
    return (s, v) => (M(), P("div", null, [
      w("div", {
        ref: "recorderIconBox",
        class: "icon-box",
        onClick: p
      }, q, 512),
      w("div", null, [
        l.value === b || l.value === x ? (M(), P("span", H, V(_.value), 1)) : j("", !0)
      ]),
      B(w("div", J, [
        g.isplaying ? (M(), P("svg", {
          key: 1,
          onClick: t,
          width: "20",
          height: "20",
          t: "1693477687958",
          class: "icon",
          viewBox: "0 0 1024 1024",
          version: "1.1",
          xmlns: "http://www.w3.org/2000/svg",
          "p-id": "6103"
        }, Y)) : (M(), P("svg", {
          key: 0,
          onClick: o,
          width: "20",
          height: "20",
          t: "1693477278174",
          class: "icon",
          viewBox: "0 0 1024 1024",
          version: "1.1",
          xmlns: "http://www.w3.org/2000/svg",
          "p-id": "5083"
        }, [
          K,
          z(),
          Q
        ])),
        w("button", { onClick: f }, "下载wav"),
        Z
      ], 512), [
        [D, l.value === x]
      ]),
      B(w("div", {
        class: "icon-box",
        onClick: n
      }, et, 512), [
        [D, l.value === x]
      ]),
      w("div", nt, [
        w("input", {
          type: "file",
          onChange: e
        }, null, 32)
      ])
    ]));
  }
});
const it = (m, g) => {
  const _ = m.__vccOpts || m;
  for (const [l, p] of g)
    _[l] = p;
  return _;
}, A = /* @__PURE__ */ it(ot, [["__scopeId", "data-v-c9a9518c"]]);
A.install = (m) => {
  m.component(A.__name, A);
};
const rt = [A], st = (m) => {
  rt.forEach((g) => {
    m.component(g.__name, g);
  });
}, ct = {
  install: st
};
export {
  A as SendRecord,
  ct as default
};
