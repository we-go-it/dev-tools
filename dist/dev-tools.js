//#region node_modules/@vue/shared/dist/shared.esm-bundler.js
// @__NO_SIDE_EFFECTS__
function e(e) {
	let t = /* @__PURE__ */ Object.create(null);
	for (let n of e.split(",")) t[n] = 1;
	return (e) => e in t;
}
var t = {}, n = [], r = () => {}, i = () => !1, a = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), o = (e) => e.startsWith("onUpdate:"), s = Object.assign, c = (e, t) => {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}, l = Object.prototype.hasOwnProperty, u = (e, t) => l.call(e, t), d = Array.isArray, f = (e) => x(e) === "[object Map]", p = (e) => x(e) === "[object Set]", m = (e) => x(e) === "[object Date]", h = (e) => typeof e == "function", g = (e) => typeof e == "string", _ = (e) => typeof e == "symbol", v = (e) => typeof e == "object" && !!e, y = (e) => (v(e) || h(e)) && h(e.then) && h(e.catch), b = Object.prototype.toString, x = (e) => b.call(e), S = (e) => x(e).slice(8, -1), C = (e) => x(e) === "[object Object]", w = (e) => g(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, T = /* @__PURE__ */ e(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), ee = (e) => {
	let t = /* @__PURE__ */ Object.create(null);
	return ((n) => t[n] || (t[n] = e(n)));
}, te = /-\w/g, E = ee((e) => e.replace(te, (e) => e.slice(1).toUpperCase())), ne = /\B([A-Z])/g, re = ee((e) => e.replace(ne, "-$1").toLowerCase()), ie = ee((e) => e.charAt(0).toUpperCase() + e.slice(1)), ae = ee((e) => e ? `on${ie(e)}` : ""), D = (e, t) => !Object.is(e, t), oe = (e, ...t) => {
	for (let n = 0; n < e.length; n++) e[n](...t);
}, se = (e, t, n, r = !1) => {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		writable: r,
		value: n
	});
}, O = (e) => {
	let t = parseFloat(e);
	return isNaN(t) ? e : t;
}, ce, le = () => ce ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
function ue(e) {
	if (d(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = g(r) ? me(r) : ue(r);
			if (i) for (let e in i) t[e] = i[e];
		}
		return t;
	}
	if (g(e) || v(e)) return e;
}
var de = /;(?![^(]*\))/g, fe = /:([^]+)/, pe = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function me(e) {
	let t = {};
	return e.replace(pe, (e) => e.startsWith("/*") ? "" : e).split(de).forEach((e) => {
		if (e) {
			let n = e.split(fe);
			n.length > 1 && (t[n[0].trim()] = n[1].trim());
		}
	}), t;
}
function k(e) {
	let t = "";
	if (g(e)) t = e;
	else if (d(e)) for (let n = 0; n < e.length; n++) {
		let r = k(e[n]);
		r && (t += r + " ");
	}
	else if (v(e)) for (let n in e) e[n] && (t += n + " ");
	return t.trim();
}
function he(e) {
	if (!e) return null;
	let { class: t, style: n } = e;
	return t && !g(t) && (e.class = k(t)), n && (e.style = ue(n)), e;
}
var ge = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", _e = /* @__PURE__ */ e(ge);
ge + "";
function ve(e) {
	return !!e || e === "";
}
function ye(e, t, n) {
	if (e.length !== t.length) return !1;
	let r = !0;
	for (let i = 0; r && i < e.length; i++) r = Ce(e[i], t[i], n);
	return r;
}
function be(e, t, n) {
	if (e.size !== t.size) return !1;
	let r = Array.from(t), i = new Uint8Array(r.length);
	for (let t of e) {
		let e = -1;
		for (let a = 0; a < r.length; a++) if (!i[a] && Ce(t, r[a], n)) {
			e = a;
			break;
		}
		if (e < 0) return !1;
		i[e] = 1;
	}
	return !0;
}
function xe(e, t, n) {
	let r = f(e), i = f(t);
	if (r || i || (r = p(e), i = p(t), r || i)) return r && i ? be(e, t, n) : !1;
	if (Object.keys(e).length !== Object.keys(t).length) return !1;
	for (let r in e) {
		let i = e.hasOwnProperty(r), a = t.hasOwnProperty(r);
		if (i && !a || !i && a || !Ce(e[r], t[r], n)) return !1;
	}
	return String(e) === String(t);
}
function Se(e, t, n, r) {
	n ||= [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()];
	let [i, a] = n;
	if (i.has(e) || a.has(t)) return i.get(e) === t && a.get(t) === e;
	i.set(e, t), a.set(t, e);
	let o = r(e, t, n);
	return i.delete(e), a.delete(t), o;
}
function Ce(e, t, n) {
	if (e === t) return !0;
	let r = m(e), i = m(t);
	return r || i ? r && i ? e.getTime() === t.getTime() : !1 : (r = _(e), i = _(t), r || i ? e === t : (r = d(e), i = d(t), r || i ? r && i ? Se(e, t, n, ye) : !1 : (r = v(e), i = v(t), r || i ? !r || !i ? !1 : Se(e, t, n, xe) : String(e) === String(t))));
}
function we(e, t) {
	return e.findIndex((e) => Ce(e, t));
}
var Te = (e) => !!(e && e.__v_isRef === !0), A = (e) => g(e) ? e : e == null ? "" : d(e) || v(e) && (e.toString === b || !h(e.toString)) ? Te(e) ? A(e.value) : JSON.stringify(e, Ee, 2) : String(e), Ee = (e, t) => Te(t) ? Ee(e, t.value) : f(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[De(t, r) + " =>"] = n, e), {}) } : p(t) ? { [`Set(${t.size})`]: [...t.values()].map((e) => De(e)) } : _(t) ? De(t) : v(t) && !d(t) && !C(t) ? String(t) : t, De = (e, t = "") => _(e) ? `Symbol(${e.description ?? t})` : e, Oe, ke = class {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && Oe && (Oe.active ? (this.parent = Oe, this.index = (Oe.scopes || (Oe.scopes = [])).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
	}
	get active() {
		return this._active;
	}
	pause() {
		if (this._active) {
			this._isPaused = !0;
			let e, t;
			if (this.scopes) {
				let n = this.scopes.slice();
				for (e = 0, t = n.length; e < t; e++) n[e].pause();
			}
			for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].pause();
		}
	}
	resume() {
		if (this._active && this._isPaused) {
			this._isPaused = !1;
			let e, t;
			if (this.scopes) {
				let n = this.scopes.slice();
				for (e = 0, t = n.length; e < t; e++) n[e].resume();
			}
			let n = this.effects.slice();
			for (e = 0, t = n.length; e < t; e++) n[e].resume();
		}
	}
	run(e) {
		if (this._active) {
			let t = Oe;
			try {
				return Oe = this, e();
			} finally {
				Oe = t;
			}
		}
	}
	on() {
		++this._on === 1 && (this.prevScope = Oe, Oe = this);
	}
	off() {
		if (this._on > 0 && --this._on === 0) {
			if (Oe === this) Oe = this.prevScope;
			else {
				let e = Oe;
				for (; e;) {
					if (e.prevScope === this) {
						e.prevScope = this.prevScope;
						break;
					}
					e = e.prevScope;
				}
			}
			this.prevScope = void 0;
		}
	}
	stop(e) {
		if (this._active) {
			this._active = !1;
			let t, n;
			for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].stop();
			for (this.effects.length = 0, t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]();
			if (this.cleanups.length = 0, this.scopes) {
				let e = this.scopes.slice();
				for (t = 0, n = e.length; t < n; t++) e[t].stop(!0);
				this.scopes.length = 0;
			}
			if (!this.detached && this.parent && !e) {
				let e = this.parent.scopes.pop();
				e && e !== this && (this.parent.scopes[this.index] = e, e.index = this.index);
			}
			this.parent = void 0;
		}
	}
};
function Ae() {
	return Oe;
}
var je, Me = /* @__PURE__ */ new WeakSet(), Ne = class {
	constructor(e) {
		this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Oe && (Oe.active ? Oe.effects.push(this) : this.flags &= -2);
	}
	pause() {
		this.flags |= 64;
	}
	resume() {
		this.flags & 64 && (this.flags &= -65, Me.has(this) && (Me.delete(this), this.trigger()));
	}
	notify() {
		this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Le(this);
	}
	run() {
		if (!(this.flags & 1)) return this.fn();
		this.flags |= 2, Xe(this), Be(this);
		let e = je, t = Ke;
		je = this, Ke = !0;
		try {
			return this.fn();
		} finally {
			Ve(this), je = e, Ke = t, this.flags &= -3;
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let e = this.deps; e; e = e.nextDep) We(e);
			this.deps = this.depsTail = void 0, Xe(this), this.onStop && this.onStop(), this.flags &= -2;
		}
	}
	trigger() {
		this.flags & 64 ? Me.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
	}
	runIfDirty() {
		He(this) && this.run();
	}
	get dirty() {
		return He(this);
	}
}, Pe = 0, Fe, Ie;
function Le(e, t = !1) {
	if (e.flags |= 8, t) {
		e.next = Ie, Ie = e;
		return;
	}
	e.next = Fe, Fe = e;
}
function Re() {
	Pe++;
}
function ze() {
	if (--Pe > 0) return;
	if (Ie) {
		let e = Ie;
		for (Ie = void 0; e;) {
			let t = e.next;
			e.next = void 0, e.flags &= -9, e = t;
		}
	}
	let e;
	for (; Fe;) {
		let t = Fe;
		for (Fe = void 0; t;) {
			let n = t.next;
			if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
				t.trigger();
			} catch (t) {
				e ||= t;
			}
			t = n;
		}
	}
	if (e) throw e;
}
function Be(e) {
	for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Ve(e) {
	let t, n = e.depsTail, r = n;
	for (; r;) {
		let e = r.prevDep;
		r.version === -1 ? (r === n && (n = e), We(r), Ge(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = e;
	}
	e.deps = t, e.depsTail = n;
}
function He(e) {
	for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (Ue(t.dep.computed) || t.dep.version !== t.version)) return !0;
	return !!e._dirty;
}
function Ue(e) {
	if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Ze) || (e.globalVersion = Ze, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !He(e)))) return;
	e.flags |= 2;
	let t = e.dep, n = je, r = Ke;
	je = e, Ke = !0;
	try {
		Be(e);
		let n = e.fn(e._value);
		(t.version === 0 || D(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
	} catch (e) {
		throw t.version++, e;
	} finally {
		je = n, Ke = r, Ve(e), e.flags &= -3;
	}
}
function We(e, t = !1) {
	let { dep: n, prevSub: r, nextSub: i } = e;
	if (r && (r.nextSub = i, e.prevSub = void 0), i && (i.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
		n.computed.flags &= -5;
		for (let e = n.computed.deps; e; e = e.nextDep) We(e, !0);
	}
	!t && !--n.sc && n.map && n.map.delete(n.key);
}
function Ge(e) {
	let { prevDep: t, nextDep: n } = e;
	t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
var Ke = !0, qe = [];
function Je() {
	qe.push(Ke), Ke = !1;
}
function Ye() {
	let e = qe.pop();
	Ke = e === void 0 || e;
}
function Xe(e) {
	let { cleanup: t } = e;
	if (e.cleanup = void 0, t) {
		let e = je;
		je = void 0;
		try {
			t();
		} finally {
			je = e;
		}
	}
}
var Ze = 0, Qe = class {
	constructor(e, t) {
		this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	}
}, $e = class {
	constructor(e) {
		this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
	}
	track(e) {
		if (!je || !Ke || je === this.computed) return;
		let t = this.activeLink;
		if (t === void 0 || t.sub !== je) t = this.activeLink = new Qe(je, this), je.deps ? (t.prevDep = je.depsTail, je.depsTail.nextDep = t, je.depsTail = t) : je.deps = je.depsTail = t, et(t);
		else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
			let e = t.nextDep;
			e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = je.depsTail, t.nextDep = void 0, je.depsTail.nextDep = t, je.depsTail = t, je.deps === t && (je.deps = e);
		}
		return t;
	}
	trigger(e) {
		this.version++, Ze++, this.notify(e);
	}
	notify(e) {
		Re();
		try {
			for (let e = this.subs; e; e = e.prevSub) e.sub.notify() && e.sub.dep.notify();
		} finally {
			ze();
		}
	}
};
function et(e) {
	if (e.dep.sc++, e.sub.flags & 4) {
		let t = e.dep.computed;
		if (t && !e.dep.subs) {
			t.flags |= 20;
			for (let e = t.deps; e; e = e.nextDep) et(e);
		}
		let n = e.dep.subs;
		n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
	}
}
var tt = /* @__PURE__ */ new WeakMap(), nt = /* @__PURE__ */ Symbol(""), rt = /* @__PURE__ */ Symbol(""), it = /* @__PURE__ */ Symbol("");
function at(e, t, n) {
	if (Ke && je) {
		let t = tt.get(e);
		t || tt.set(e, t = /* @__PURE__ */ new Map());
		let r = t.get(n);
		r || (t.set(n, r = new $e()), r.map = t, r.key = n), r.track();
	}
}
function ot(e, t, n, r, i, a) {
	let o = tt.get(e);
	if (!o) {
		Ze++;
		return;
	}
	let s = (e) => {
		e && e.trigger();
	};
	if (Re(), t === "clear") o.forEach(s);
	else {
		let i = d(e), a = i && w(n);
		if (i && n === "length") {
			let e = Number(r);
			o.forEach((t, n) => {
				(n === "length" || n === it || !_(n) && n >= e) && s(t);
			});
		} else switch ((n !== void 0 || o.has(void 0)) && s(o.get(n)), a && s(o.get(it)), t) {
			case "add":
				i ? a && s(o.get("length")) : (s(o.get(nt)), f(e) && s(o.get(rt)));
				break;
			case "delete":
				i || (s(o.get(nt)), f(e) && s(o.get(rt)));
				break;
			case "set": f(e) && s(o.get(nt));
		}
	}
	ze();
}
function st(e, t) {
	let n = tt.get(e);
	return n && n.get(t);
}
function ct(e) {
	let t = /* @__PURE__ */ j(e);
	return t === e || (at(t, "iterate", it), /* @__PURE__ */ qt(e)) ? t : /* @__PURE__ */ Kt(e) ? /* @__PURE__ */ Gt(e) ? t.map((e) => Zt(Xt(e))) : t.map(Zt) : t.map(Xt);
}
function lt(e) {
	return at(e = /* @__PURE__ */ j(e), "iterate", it), e;
}
function ut(e, t) {
	return /* @__PURE__ */ Kt(e) ? Zt(/* @__PURE__ */ Gt(e) ? Xt(t) : t) : Xt(t);
}
var dt = {
	__proto__: null,
	[Symbol.iterator]() {
		return ft(this, Symbol.iterator, (e) => ut(this, e));
	},
	concat(...e) {
		return ct(this).concat(...e.map((e) => d(e) ? ct(e) : e));
	},
	entries() {
		return ft(this, "entries", (e) => (e[1] = ut(this, e[1]), e));
	},
	every(e, t) {
		return mt(this, "every", e, t, void 0, arguments);
	},
	filter(e, t) {
		return mt(this, "filter", e, t, (e) => e.map((e) => ut(this, e)), arguments);
	},
	find(e, t) {
		return mt(this, "find", e, t, (e) => ut(this, e), arguments);
	},
	findIndex(e, t) {
		return mt(this, "findIndex", e, t, void 0, arguments);
	},
	findLast(e, t) {
		return mt(this, "findLast", e, t, (e) => ut(this, e), arguments);
	},
	findLastIndex(e, t) {
		return mt(this, "findLastIndex", e, t, void 0, arguments);
	},
	forEach(e, t) {
		return mt(this, "forEach", e, t, void 0, arguments);
	},
	includes(...e) {
		return gt(this, "includes", e);
	},
	indexOf(...e) {
		return gt(this, "indexOf", e);
	},
	join(e) {
		return ct(this).join(e);
	},
	lastIndexOf(...e) {
		return gt(this, "lastIndexOf", e);
	},
	map(e, t) {
		return mt(this, "map", e, t, void 0, arguments);
	},
	pop() {
		return _t(this, "pop");
	},
	push(...e) {
		return _t(this, "push", e);
	},
	reduce(e, ...t) {
		return ht(this, "reduce", e, t);
	},
	reduceRight(e, ...t) {
		return ht(this, "reduceRight", e, t);
	},
	shift() {
		return _t(this, "shift");
	},
	some(e, t) {
		return mt(this, "some", e, t, void 0, arguments);
	},
	splice(...e) {
		return _t(this, "splice", e);
	},
	toReversed() {
		return ct(this).toReversed();
	},
	toSorted(e) {
		return ct(this).toSorted(e);
	},
	toSpliced(...e) {
		return ct(this).toSpliced(...e);
	},
	unshift(...e) {
		return _t(this, "unshift", e);
	},
	values() {
		return ft(this, "values", (e) => ut(this, e));
	}
};
function ft(e, t, n) {
	let r = lt(e), i = r[t]();
	return r !== e && !/* @__PURE__ */ qt(e) && (i._next = i.next, i.next = () => {
		let e = i._next();
		return e.done || (e.value = n(e.value)), e;
	}), i;
}
var pt = Array.prototype;
function mt(e, t, n, r, i, a) {
	let o = lt(e), s = o !== e && !/* @__PURE__ */ qt(e), c = o[t];
	if (c !== pt[t]) {
		let t = c.apply(e, a);
		return s ? Xt(t) : t;
	}
	let l = n;
	o !== e && (s ? l = function(t, r) {
		return n.call(this, ut(e, t), r, e);
	} : n.length > 2 && (l = function(t, r) {
		return n.call(this, t, r, e);
	}));
	let u = c.call(o, l, r);
	return s && i ? i(u) : u;
}
function ht(e, t, n, r) {
	let i = lt(e), a = i !== e && !/* @__PURE__ */ qt(e), o = n, s = !1;
	i !== e && (a ? (s = r.length === 0, o = function(t, r, i) {
		return s && (s = !1, t = ut(e, t)), n.call(this, t, ut(e, r), i, e);
	}) : n.length > 3 && (o = function(t, r, i) {
		return n.call(this, t, r, i, e);
	}));
	let c = i[t](o, ...r);
	return s ? ut(e, c) : c;
}
function gt(e, t, n) {
	let r = /* @__PURE__ */ j(e);
	at(r, "iterate", it);
	let i = r[t](...n);
	return (i === -1 || i === !1) && /* @__PURE__ */ Jt(n[0]) ? (n[0] = /* @__PURE__ */ j(n[0]), r[t](...n)) : i;
}
function _t(e, t, n = []) {
	Je(), Re();
	let r = (/* @__PURE__ */ j(e))[t].apply(e, n);
	return ze(), Ye(), r;
}
var vt = /* @__PURE__ */ e("__proto__,__v_isRef,__isVue"), yt = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(_));
function bt(e) {
	_(e) || (e = String(e));
	let t = /* @__PURE__ */ j(this);
	return at(t, "has", e), t.hasOwnProperty(e);
}
var xt = class {
	constructor(e = !1, t = !1) {
		this._isReadonly = e, this._isShallow = t;
	}
	get(e, t, n) {
		if (t === "__v_skip") return e.__v_skip;
		let r = this._isReadonly, i = this._isShallow;
		if (t === "__v_isReactive") return !r;
		if (t === "__v_isReadonly") return r;
		if (t === "__v_isShallow") return i;
		if (t === "__v_raw") return n === (r ? i ? zt : Rt : i ? Lt : It).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
		let a = d(e);
		if (!r) {
			let e;
			if (a && (e = dt[t])) return e;
			if (t === "hasOwnProperty") return bt;
		}
		let o = Reflect.get(e, t, /* @__PURE__ */ Qt(e) ? e : n);
		if ((_(t) ? yt.has(t) : vt(t)) || (r || at(e, "get", t), i)) return o;
		if (/* @__PURE__ */ Qt(o)) {
			let e = a && w(t) ? o : o.value;
			return r && v(e) ? /* @__PURE__ */ Ut(e) : e;
		}
		return v(o) ? r ? /* @__PURE__ */ Ut(o) : /* @__PURE__ */ Vt(o) : o;
	}
}, St = class extends xt {
	constructor(e = !1) {
		super(!1, e);
	}
	set(e, t, n, r) {
		let i = e[t], a = d(e) && w(t);
		if (!this._isShallow) {
			let e = /* @__PURE__ */ Kt(i);
			if (!/* @__PURE__ */ qt(n) && !/* @__PURE__ */ Kt(n) && (i = /* @__PURE__ */ j(i), n = /* @__PURE__ */ j(n)), !a && /* @__PURE__ */ Qt(i) && !/* @__PURE__ */ Qt(n)) return e || (i.value = n), !0;
		}
		let o = a ? Number(t) < e.length : u(e, t), s = Reflect.set(e, t, n, /* @__PURE__ */ Qt(e) ? e : r);
		return e === /* @__PURE__ */ j(r) && s && (o ? D(n, i) && ot(e, "set", t, n, i) : ot(e, "add", t, n)), s;
	}
	deleteProperty(e, t) {
		let n = u(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
		return i && n && ot(e, "delete", t, void 0, r), i;
	}
	has(e, t) {
		let n = Reflect.has(e, t);
		return (!_(t) || !yt.has(t)) && at(e, "has", t), n;
	}
	ownKeys(e) {
		return at(e, "iterate", d(e) ? "length" : nt), Reflect.ownKeys(e);
	}
}, Ct = class extends xt {
	constructor(e = !1) {
		super(!0, e);
	}
	set(e, t) {
		return !0;
	}
	deleteProperty(e, t) {
		return !0;
	}
}, wt = /* @__PURE__ */ new St(), Tt = /* @__PURE__ */ new Ct(), Et = /* @__PURE__ */ new St(!0), Dt = (e) => e, Ot = (e) => Reflect.getPrototypeOf(e);
function kt(e, t, n) {
	return function(...r) {
		let i = this.__v_raw, a = /* @__PURE__ */ j(i), o = f(a), c = e === "entries" || e === Symbol.iterator && o, l = e === "keys" && o, u = i[e](...r), d = n ? Dt : t ? Zt : Xt;
		return !t && at(a, "iterate", l ? rt : nt), s(Object.create(u), { next() {
			let { value: e, done: t } = u.next();
			return t ? {
				value: e,
				done: t
			} : {
				value: c ? [d(e[0]), d(e[1])] : d(e),
				done: t
			};
		} });
	};
}
function At(e) {
	return function(...t) {
		return e === "delete" ? !1 : e === "clear" ? void 0 : this;
	};
}
function jt(e, t) {
	let n = {
		get(n) {
			let r = this.__v_raw, i = /* @__PURE__ */ j(r), a = /* @__PURE__ */ j(n);
			e || (D(n, a) && at(i, "get", n), at(i, "get", a));
			let { has: o } = Ot(i), s = t ? Dt : e ? Zt : Xt;
			if (o.call(i, n)) return s(r.get(n));
			if (o.call(i, a)) return s(r.get(a));
			r !== i && r.get(n);
		},
		get size() {
			let t = this.__v_raw;
			return !e && at(/* @__PURE__ */ j(t), "iterate", nt), t.size;
		},
		has(t) {
			let n = this.__v_raw, r = /* @__PURE__ */ j(n), i = /* @__PURE__ */ j(t);
			return e || (D(t, i) && at(r, "has", t), at(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
		},
		forEach(n, r) {
			let i = this, a = i.__v_raw, o = /* @__PURE__ */ j(a), s = t ? Dt : e ? Zt : Xt;
			return !e && at(o, "iterate", nt), a.forEach((e, t) => n.call(r, s(e), s(t), i));
		}
	};
	return s(n, e ? {
		add: At("add"),
		set: At("set"),
		delete: At("delete"),
		clear: At("clear")
	} : {
		add(e) {
			let n = /* @__PURE__ */ j(this), r = Ot(n), i = /* @__PURE__ */ j(e), a = !t && !/* @__PURE__ */ qt(e) && !/* @__PURE__ */ Kt(e) ? i : e;
			return r.has.call(n, a) || D(e, a) && r.has.call(n, e) || D(i, a) && r.has.call(n, i) || (n.add(a), ot(n, "add", a, a)), this;
		},
		set(e, n) {
			!t && !/* @__PURE__ */ qt(n) && !/* @__PURE__ */ Kt(n) && (n = /* @__PURE__ */ j(n));
			let r = /* @__PURE__ */ j(this), { has: i, get: a } = Ot(r), o = i.call(r, e);
			o ||= (e = /* @__PURE__ */ j(e), i.call(r, e));
			let s = a.call(r, e);
			return r.set(e, n), o ? D(n, s) && ot(r, "set", e, n, s) : ot(r, "add", e, n), this;
		},
		delete(e) {
			let t = /* @__PURE__ */ j(this), { has: n, get: r } = Ot(t), i = n.call(t, e);
			i ||= (e = /* @__PURE__ */ j(e), n.call(t, e));
			let a = r ? r.call(t, e) : void 0, o = t.delete(e);
			return i && ot(t, "delete", e, void 0, a), o;
		},
		clear() {
			let e = /* @__PURE__ */ j(this), t = e.size !== 0, n = e.clear();
			return t && ot(e, "clear", void 0, void 0, void 0), n;
		}
	}), [
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((r) => {
		n[r] = kt(r, e, t);
	}), n;
}
function Mt(e, t) {
	let n = jt(e, t);
	return (t, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? t : Reflect.get(u(n, r) && r in t ? n : t, r, i);
}
var Nt = { get: /* @__PURE__ */ Mt(!1, !1) }, Pt = { get: /* @__PURE__ */ Mt(!1, !0) }, Ft = { get: /* @__PURE__ */ Mt(!0, !1) }, It = /* @__PURE__ */ new WeakMap(), Lt = /* @__PURE__ */ new WeakMap(), Rt = /* @__PURE__ */ new WeakMap(), zt = /* @__PURE__ */ new WeakMap();
function Bt(e) {
	switch (e) {
		case "Object":
		case "Array": return 1;
		case "Map":
		case "Set":
		case "WeakMap":
		case "WeakSet": return 2;
		default: return 0;
	}
}
// @__NO_SIDE_EFFECTS__
function Vt(e) {
	return /* @__PURE__ */ Kt(e) ? e : Wt(e, !1, wt, Nt, It);
}
// @__NO_SIDE_EFFECTS__
function Ht(e) {
	return Wt(e, !1, Et, Pt, Lt);
}
// @__NO_SIDE_EFFECTS__
function Ut(e) {
	return Wt(e, !0, Tt, Ft, Rt);
}
function Wt(e, t, n, r, i) {
	if (!v(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
	let a = i.get(e);
	if (a) return a;
	let o = Bt(S(e));
	if (o === 0) return e;
	let s = new Proxy(e, o === 2 ? r : n);
	return i.set(e, s), s;
}
// @__NO_SIDE_EFFECTS__
function Gt(e) {
	return /* @__PURE__ */ Kt(e) ? /* @__PURE__ */ Gt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Kt(e) {
	return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function qt(e) {
	return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Jt(e) {
	return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function j(e) {
	let t = e && e.__v_raw;
	return t ? /* @__PURE__ */ j(t) : e;
}
function Yt(e) {
	return !u(e, "__v_skip") && Object.isExtensible(e) && se(e, "__v_skip", !0), e;
}
var Xt = (e) => v(e) ? /* @__PURE__ */ Vt(e) : e, Zt = (e) => v(e) ? /* @__PURE__ */ Ut(e) : e;
// @__NO_SIDE_EFFECTS__
function Qt(e) {
	return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function M(e) {
	return en(e, !1);
}
// @__NO_SIDE_EFFECTS__
function $t(e) {
	return en(e, !0);
}
function en(e, t) {
	return /* @__PURE__ */ Qt(e) ? e : new tn(e, t);
}
var tn = class {
	constructor(e, t) {
		this.dep = new $e(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ j(e), this._value = t ? e : Xt(e), this.__v_isShallow = t;
	}
	get value() {
		return this.dep.track(), this._value;
	}
	set value(e) {
		let t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ qt(e) || /* @__PURE__ */ Kt(e);
		e = n ? e : /* @__PURE__ */ j(e), D(e, t) && (this._rawValue = e, this._value = n ? e : Xt(e), this.dep.trigger());
	}
};
function nn(e) {
	e.dep && e.dep.trigger();
}
function N(e) {
	return /* @__PURE__ */ Qt(e) ? e.value : e;
}
function rn(e) {
	return h(e) ? e() : N(e);
}
var an = {
	get: (e, t, n) => t === "__v_raw" ? e : N(Reflect.get(e, t, n)),
	set: (e, t, n, r) => {
		let i = e[t];
		return /* @__PURE__ */ Qt(i) && !/* @__PURE__ */ Qt(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
	}
};
function on(e) {
	return /* @__PURE__ */ Gt(e) ? e : new Proxy(e, an);
}
var sn = class {
	constructor(e) {
		this.__v_isRef = !0, this._value = void 0;
		let t = this.dep = new $e(), { get: n, set: r } = e(t.track.bind(t), t.trigger.bind(t));
		this._get = n, this._set = r;
	}
	get value() {
		return this._value = this._get();
	}
	set value(e) {
		this._set(e);
	}
};
function cn(e) {
	return new sn(e);
}
// @__NO_SIDE_EFFECTS__
function ln(e) {
	let t = d(e) ? Array(e.length) : {};
	for (let n in e) t[n] = pn(e, n);
	return t;
}
var un = class {
	constructor(e, t, n) {
		this._object = e, this._defaultValue = n, this.__v_isRef = !0, this._value = void 0, this._key = _(t) ? t : String(t), this._raw = /* @__PURE__ */ j(e);
		let r = !0, i = e;
		if (!d(e) || _(this._key) || !w(this._key)) do
			r = !/* @__PURE__ */ Jt(i) || /* @__PURE__ */ qt(i);
		while (r && (i = i.__v_raw));
		this._shallow = r;
	}
	get value() {
		let e = this._object[this._key];
		return this._shallow && (e = N(e)), this._value = e === void 0 ? this._defaultValue : e;
	}
	set value(e) {
		if (this._shallow && /* @__PURE__ */ Qt(this._raw[this._key])) {
			let t = this._object[this._key];
			if (/* @__PURE__ */ Qt(t)) {
				t.value = e;
				return;
			}
		}
		this._object[this._key] = e;
	}
	get dep() {
		return st(this._raw, this._key);
	}
}, dn = class {
	constructor(e) {
		this._getter = e, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
	}
	get value() {
		return this._value = this._getter();
	}
};
// @__NO_SIDE_EFFECTS__
function fn(e, t, n) {
	return /* @__PURE__ */ Qt(e) ? e : h(e) ? new dn(e) : v(e) && arguments.length > 1 ? pn(e, t, n) : /* @__PURE__ */ M(e);
}
function pn(e, t, n) {
	return new un(e, t, n);
}
var mn = class {
	constructor(e, t, n) {
		this.fn = e, this.setter = t, this._value = void 0, this.dep = new $e(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Ze - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
	}
	notify() {
		if (this.flags |= 16, !(this.flags & 8) && je !== this) return Le(this, !0), !0;
	}
	get value() {
		let e = this.dep.track();
		return Ue(this), e && (e.version = this.dep.version), this._value;
	}
	set value(e) {
		this.setter && this.setter(e);
	}
};
// @__NO_SIDE_EFFECTS__
function hn(e, t, n = !1) {
	let r, i;
	return h(e) ? r = e : (r = e.get, i = e.set), new mn(r, i, n);
}
var gn = {}, _n = /* @__PURE__ */ new WeakMap(), vn = void 0;
function yn(e, t = !1, n = vn) {
	if (n) {
		let t = _n.get(n);
		t || _n.set(n, t = []), t.push(e);
	}
}
function bn(e, n, i = t) {
	let { immediate: a, deep: o, once: s, scheduler: l, augmentJob: u, call: f } = i, p = (e) => o ? e : /* @__PURE__ */ qt(e) || o === !1 || o === 0 ? xn(e, 1) : xn(e), m, g, _, v, y = !1, b = !1;
	if (/* @__PURE__ */ Qt(e) ? (g = () => e.value, y = /* @__PURE__ */ qt(e)) : /* @__PURE__ */ Gt(e) ? (g = () => p(e), y = !0) : d(e) ? (b = !0, y = e.some((e) => /* @__PURE__ */ Gt(e) || /* @__PURE__ */ qt(e)), g = () => e.map((e) => {
		if (/* @__PURE__ */ Qt(e)) return e.value;
		if (/* @__PURE__ */ Gt(e)) return p(e);
		if (h(e)) return f ? f(e, 2) : e();
	})) : g = h(e) ? n ? f ? () => f(e, 2) : e : () => {
		if (_) {
			Je();
			try {
				_();
			} finally {
				Ye();
			}
		}
		let t = vn;
		vn = m;
		try {
			return f ? f(e, 3, [v]) : e(v);
		} finally {
			vn = t;
		}
	} : r, n && o) {
		let e = g, t = o === !0 ? Infinity : o;
		g = () => xn(e(), t);
	}
	let x = Ae(), S = () => {
		m.stop(), x && x.active && c(x.effects, m);
	};
	if (s && n) {
		let e = n;
		n = (...t) => {
			let n = e(...t);
			return S(), n;
		};
	}
	let C = b ? Array(e.length).fill(gn) : gn, w = (e) => {
		if (m.flags & 1 && (m.dirty || e)) {
			if (n) {
				let t = m.run();
				if (e || o || y || (b ? t.some((e, t) => D(e, C[t])) : D(t, C))) {
					_ && _();
					let e = vn;
					vn = m;
					try {
						let e = [
							t,
							C === gn ? void 0 : b && C[0] === gn ? [] : C,
							v
						];
						C = t, f ? f(n, 3, e) : n(...e);
					} finally {
						vn = e;
					}
				}
			} else m.run();
		}
	};
	return u && u(w), m = new Ne(g), m.scheduler = l ? () => l(w, !1) : w, v = (e) => yn(e, !1, m), _ = m.onStop = () => {
		let e = _n.get(m);
		if (e) {
			if (f) f(e, 4);
			else for (let t of e) t();
			_n.delete(m);
		}
	}, n ? a ? w(!0) : C = m.run() : l ? l(w.bind(null, !0), !0) : m.run(), S.pause = m.pause.bind(m), S.resume = m.resume.bind(m), S.stop = S, S;
}
function xn(e, t = Infinity, n) {
	if (t <= 0 || !v(e) || e.__v_skip || (n ||= /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
	if (n.set(e, t), t--, /* @__PURE__ */ Qt(e)) xn(e.value, t, n);
	else if (d(e)) for (let r = 0; r < e.length; r++) xn(e[r], t, n);
	else if (p(e) || f(e)) e.forEach((e) => {
		xn(e, t, n);
	});
	else if (C(e)) {
		for (let r in e) xn(e[r], t, n);
		for (let r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && xn(e[r], t, n);
	}
	return e;
}
//#endregion
//#region node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
function Sn(e, t, n, r) {
	try {
		return r ? e(...r) : e();
	} catch (e) {
		wn(e, t, n);
	}
}
function Cn(e, t, n, r) {
	if (h(e)) {
		let i = Sn(e, t, n, r);
		return i && y(i) && i.catch((e) => {
			wn(e, t, n);
		}), i;
	}
	if (d(e)) {
		let i = [];
		for (let a = 0; a < e.length; a++) i.push(Cn(e[a], t, n, r));
		return i;
	}
}
function wn(e, n, r, i = !0) {
	let a = n ? n.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: s } = n && n.appContext.config || t;
	if (n) {
		let t = n.parent, i = n.proxy, a = `https://vuejs.org/error-reference/#runtime-${r}`;
		for (; t;) {
			let n = t.ec;
			if (n) {
				for (let t = 0; t < n.length; t++) if (n[t](e, i, a) === !1) return;
			}
			t = t.parent;
		}
		if (o) {
			Je(), Sn(o, null, 10, [
				e,
				i,
				a
			]), Ye();
			return;
		}
	}
	Tn(e, r, a, i, s);
}
function Tn(e, t, n, r = !0, i = !1) {
	if (i) throw e;
	console.error(e);
}
var En = [], Dn = -1, On = [], kn = null, An = 0, jn = /* @__PURE__ */ Promise.resolve(), Mn = null;
function Nn(e) {
	let t = Mn || jn;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function Pn(e) {
	let t = Dn + 1, n = En.length;
	for (; t < n;) {
		let r = t + n >>> 1, i = En[r], a = Bn(i);
		a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
	}
	return t;
}
function Fn(e) {
	if (!(e.flags & 1)) {
		let t = Bn(e), n = En[En.length - 1];
		!n || !(e.flags & 2) && t >= Bn(n) ? En.push(e) : En.splice(Pn(t), 0, e), e.flags |= 1, In();
	}
}
function In() {
	Mn ||= jn.then(Vn);
}
function Ln(e) {
	if (!d(e)) kn && e.id === -1 ? kn.splice(An + 1, 0, e) : e.flags & 1 || (On.push(e), e.flags |= 1);
	else for (let t = 0; t < e.length; t++) On.push(e[t]);
	In();
}
function Rn(e, t, n = Dn + 1) {
	for (; n < En.length; n++) {
		let t = En[n];
		if (t && t.flags & 2) {
			if (e && t.id !== e.uid) continue;
			En.splice(n, 1), n--, t.flags & 4 && (t.flags &= -2), t(), t.flags & 4 || (t.flags &= -2);
		}
	}
}
function zn(e) {
	if (On.length) {
		let e = [...new Set(On)].sort((e, t) => Bn(e) - Bn(t));
		if (On.length = 0, kn) {
			for (let t = 0; t < e.length; t++) kn.push(e[t]);
			return;
		}
		for (kn = e, An = 0; An < kn.length; An++) {
			let e = kn[An];
			e.flags & 4 && (e.flags &= -2), e.flags & 8 || e(), e.flags &= -2;
		}
		kn = null, An = 0;
	}
}
var Bn = (e) => e.id == null ? e.flags & 2 ? -1 : Infinity : e.id;
function Vn(e) {
	try {
		for (Dn = 0; Dn < En.length; Dn++) {
			let e = En[Dn];
			e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), Sn(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2));
		}
	} finally {
		for (; Dn < En.length; Dn++) {
			let e = En[Dn];
			e && (e.flags &= -2);
		}
		Dn = -1, En.length = 0, zn(e), Mn = null, (En.length || On.length) && Vn(e);
	}
}
var Hn = null, Un = null;
function Wn(e) {
	let t = Hn;
	return Hn = e, Un = e && e.type.__scopeId || null, t;
}
function P(e, t = Hn, n) {
	if (!t || e._n) return e;
	let r = (...n) => {
		r._d && ji(-1);
		let i = Wn(t), a = Di.length, o;
		try {
			o = e(...n);
		} finally {
			for (let e = Di.length; e > a; e--) ki();
			Wn(i), r._d && ji(1);
		}
		return o;
	};
	return r._n = !0, r._c = !0, r._d = !0, r;
}
function Gn(e, n) {
	if (Hn === null) return e;
	let r = ca(Hn), i = e.dirs ||= [];
	for (let e = 0; e < n.length; e++) {
		let [a, o, s, c = t] = n[e];
		a && (h(a) && (a = {
			mounted: a,
			updated: a
		}), a.deep && xn(o), i.push({
			dir: a,
			instance: r,
			value: o,
			oldValue: void 0,
			arg: s,
			modifiers: c
		}));
	}
	return e;
}
function Kn(e, t, n, r) {
	let i = e.dirs, a = t && t.dirs;
	for (let o = 0; o < i.length; o++) {
		let s = i[o];
		a && (s.oldValue = a[o].value);
		let c = s.dir[r];
		c && (Je(), Cn(c, n, 8, [
			e.el,
			s,
			e,
			t
		]), Ye());
	}
}
function qn(e, t) {
	if (Ji) {
		let n = Ji.provides, r = Ji.parent && Ji.parent.provides;
		r === n && (n = Ji.provides = Object.create(r)), n[e] = t;
	}
}
function Jn(e, t, n = !1) {
	let r = Yi();
	if (r || Fr) {
		let i = Fr ? Fr._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return n && h(t) ? t.call(r && r.proxy) : t;
	}
}
var Yn = /* @__PURE__ */ Symbol.for("v-scx"), Xn = () => Jn(Yn);
function Zn(e, t) {
	return $n(e, null, { flush: "sync" });
}
function Qn(e, t, n) {
	return $n(e, t, n);
}
function $n(e, n, i = t) {
	let { immediate: a, deep: o, flush: c, once: l } = i, u = s({}, i), d = n && a || !n && c !== "post", f;
	if (ta) {
		if (c === "sync") {
			let e = Xn();
			f = e.__watcherHandles ||= [];
		} else if (!d) {
			let e = () => {};
			return e.stop = r, e.resume = r, e.pause = r, e;
		}
	}
	let p = Ji;
	u.call = (e, t, n) => Cn(e, p, t, n);
	let m = !1;
	c === "post" ? u.scheduler = (e) => {
		di(e, p && p.suspense);
	} : c !== "sync" && (m = !0, u.scheduler = (e, t) => {
		t ? e() : Fn(e);
	}), u.augmentJob = (e) => {
		n && (e.flags |= 4), m && (e.flags |= 2, p && (e.id = p.uid, e.i = p));
	};
	let h = bn(e, n, u);
	return ta && (f ? f.push(h) : d && h()), h;
}
var er = /* @__PURE__ */ Symbol("_vte"), tr = (e) => e.__isTeleport, nr = /* @__PURE__ */ Symbol("_leaveCb");
function rr(e) {
	let t = e[0];
	if (e.length > 1) {
		for (let n of e) if (n.type !== Ti) {
			t = n;
			break;
		}
	}
	return t;
}
function ir(e) {
	if (!pr(e)) return tr(e.type) && e.children ? rr(e.children) : e;
	if (e.component) return e.component.subTree;
	let { shapeFlag: t, children: n } = e;
	if (n) {
		if (t & 16) return n[0];
		if (t & 32 && h(n.default)) return n.default();
	}
}
function ar(e, t) {
	if (e.shapeFlag & 6 && e.component) {
		e.transition = t;
		let n = e.component.subTree;
		ar(tr(n.type) && ir(n) || n, t);
	} else e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function or(e, t) {
	return h(e) ? /* @__PURE__ */ s({ name: e.name }, t, { setup: e }) : e;
}
function sr(e) {
	e.ids = [
		e.ids[0] + e.ids[2]++ + "-",
		0,
		0
	];
}
function cr(e, t) {
	let n;
	return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var lr = /* @__PURE__ */ new WeakMap();
function ur(e, n, r, a, o = !1) {
	if (d(e)) {
		e.forEach((e, t) => ur(e, n && (d(n) ? n[t] : n), r, a, o));
		return;
	}
	if (fr(a) && !o) {
		a.shapeFlag & 512 && a.type.__asyncResolved && a.component.subTree.component && ur(e, n, r, a.component.subTree);
		return;
	}
	let s = a.shapeFlag & 4 ? ca(a.component) : a.el, l = o ? null : s, { i: f, r: p } = e, m = n && n.r, _ = f.refs === t ? f.refs = {} : f.refs, v = f.setupState, y = /* @__PURE__ */ j(v), b = v === t ? i : (e) => !cr(_, e) && u(y, e), x = (e, t) => !(t && cr(_, t));
	if (m != null && m !== p) {
		if (dr(n), g(m)) _[m] = null, b(m) && (v[m] = null);
		else if (/* @__PURE__ */ Qt(m)) {
			let e = n;
			x(m, e.k) && (m.value = null), e.k && (_[e.k] = null);
		}
	}
	if (h(p)) Sn(p, f, 12, [l, _]);
	else {
		let t = g(p), n = /* @__PURE__ */ Qt(p);
		if (t || n) {
			let i = () => {
				if (e.f) {
					let n = t ? b(p) ? v[p] : _[p] : x(p) || !e.k ? p.value : _[e.k];
					if (o) d(n) && c(n, s);
					else if (d(n)) n.includes(s) || n.push(s);
					else if (t) _[p] = [s], b(p) && (v[p] = _[p]);
					else {
						let t = [s];
						x(p, e.k) && (p.value = t), e.k && (_[e.k] = t);
					}
				} else t ? (_[p] = l, b(p) && (v[p] = l)) : n && (x(p, e.k) && (p.value = l), e.k && (_[e.k] = l));
			};
			if (l) {
				let t = () => {
					i(), lr.delete(e);
				};
				t.id = -1, lr.set(e, t), di(t, r);
			} else dr(e), i();
		}
	}
}
function dr(e) {
	let t = lr.get(e);
	t && (t.flags |= 8, lr.delete(e));
}
le().requestIdleCallback, le().cancelIdleCallback;
var fr = (e) => !!e.type.__asyncLoader, pr = (e) => e.type.__isKeepAlive;
function mr(e, t, n = Ji, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			Je();
			let i = Qi(n), a = Cn(t, n, e, r);
			return i(), Ye(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	}
}
var hr = (e) => (t, n = Ji) => {
	(!ta || e === "sp") && mr(e, (...e) => t(...e), n);
}, gr = hr("m"), _r = hr("u"), vr = hr("bum"), yr = "components";
function br(e, t) {
	return Cr(yr, e, !0, t) || e;
}
var xr = /* @__PURE__ */ Symbol.for("v-ndc");
function Sr(e) {
	return g(e) ? Cr(yr, e, !1) || e : e || xr;
}
function Cr(e, t, n = !0, r = !1) {
	let i = Hn || Ji;
	if (i) {
		let n = i.type;
		if (e === yr) {
			let e = la(n, !1);
			if (e && (e === t || e === E(t) || e === ie(E(t)))) return n;
		}
		let a = wr(i[e] || n[e], t) || wr(i.appContext[e], t);
		return !a && r ? n : a;
	}
}
function wr(e, t) {
	return e && (e[t] || e[E(t)] || e[ie(E(t))]);
}
function F(e, t, n, r) {
	let i, a = n && n[r], o = d(e);
	if (o || g(e)) {
		let n = o && /* @__PURE__ */ Gt(e), r = !1, s = !1;
		n && (r = !/* @__PURE__ */ qt(e), s = /* @__PURE__ */ Kt(e), e = lt(e)), i = Array(e.length);
		for (let n = 0, o = e.length; n < o; n++) i[n] = t(r ? s ? Zt(Xt(e[n])) : Xt(e[n]) : e[n], n, void 0, a && a[n]);
	} else if (typeof e == "number") {
		i = Array(e);
		for (let n = 0; n < e; n++) i[n] = t(n + 1, n, void 0, a && a[n]);
	} else if (v(e)) {
		if (e[Symbol.iterator]) i = Array.from(e, (e, n) => t(e, n, void 0, a && a[n]));
		else {
			let n = Object.keys(e);
			i = Array(n.length);
			for (let r = 0, o = n.length; r < o; r++) {
				let o = n[r];
				i[r] = t(e[o], o, r, a && a[r]);
			}
		}
	} else i = [];
	return n && (n[r] = i), i;
}
function Tr(e, t) {
	for (let n = 0; n < t.length; n++) {
		let r = t[n];
		if (d(r)) for (let t = 0; t < r.length; t++) e[r[t].name] = r[t].fn;
		else r && (e[r.name] = r.key ? (...e) => {
			let t = r.fn(...e);
			return t && (t.key = r.key), t;
		} : r.fn);
	}
	return e;
}
function Er(e, t, n, r, i, a) {
	if (n ??= {}, Hn.ce || Hn.parent && fr(Hn.parent) && Hn.parent.ce) {
		let e = a != null && n.key == null ? s({}, n, { key: a }) : n, i = Object.keys(e).length > 0;
		return t !== "default" && (e.name = t), L(), z(I, null, [V("slot", e, r && r())], i ? -2 : 64);
	}
	let o = e[t];
	o && o._c && (o._d = !1);
	let c = Di.length;
	L();
	let l;
	try {
		let i = o && Dr(o(n)), s = n.key || a || i && i.key;
		l = z(I, { key: (s && !_(s) ? s : `_${t}`) + (!i && r ? "_fb" : "") }, i || (r ? r() : []), i && e._ === 1 ? 64 : -2);
	} catch (e) {
		for (let e = Di.length; e > c; e--) ki();
		throw e;
	} finally {
		o && o._c && (o._d = !0);
	}
	return !i && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]), l;
}
function Dr(e) {
	return e.some((e) => !Ni(e) || !(e.type === Ti || e.type === I && !Dr(e.children))) ? e : null;
}
var Or = (e) => e ? ea(e) ? ca(e) : Or(e.parent) : null, kr = /* @__PURE__ */ s(/* @__PURE__ */ Object.create(null), {
	$: (e) => e,
	$el: (e) => e.vnode.el,
	$data: (e) => e.data,
	$props: (e) => e.props,
	$attrs: (e) => e.attrs,
	$slots: (e) => e.slots,
	$refs: (e) => e.refs,
	$parent: (e) => Or(e.parent),
	$root: (e) => Or(e.root),
	$host: (e) => e.ce,
	$emit: (e) => e.emit,
	$options: (e) => e.type,
	$forceUpdate: (e) => e.f ||= () => {
		Fn(e.update);
	},
	$nextTick: (e) => e.n ||= Nn.bind(e.proxy),
	$watch: (e) => r
}), Ar = (e, n) => e !== t && !e.__isScriptSetup && u(e, n), jr = {
	get({ _: e }, n) {
		if (n === "__v_skip") return !0;
		let { ctx: r, setupState: i, data: a, props: o, accessCache: s, type: c, appContext: l } = e;
		if (n[0] !== "$") {
			let e = s[n];
			if (e !== void 0) switch (e) {
				case 1: return i[n];
				case 2: return a[n];
				case 4: return r[n];
				case 3: return o[n];
			}
			else if (Ar(i, n)) return s[n] = 1, i[n];
			else if (u(o, n)) return s[n] = 3, o[n];
			else if (r !== t && u(r, n)) return s[n] = 4, r[n];
			else s[n] = 0;
		}
		let d = kr[n], f, p;
		if (d) return n === "$attrs" && at(e.attrs, "get", ""), d(e);
		if ((f = c.__cssModules) && (f = f[n])) return f;
		if (r !== t && u(r, n)) return s[n] = 4, r[n];
		if (p = l.config.globalProperties, u(p, n)) return p[n];
	},
	set({ _: e }, t, n) {
		let { data: r, setupState: i, ctx: a } = e;
		return Ar(i, t) ? (i[t] = n, !0) : u(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (a[t] = n, !0);
	},
	has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: i, props: a, type: o } }, s) {
		let c;
		return !!(n[s] || Ar(t, s) || u(a, s) || u(r, s) || u(kr, s) || u(i.config.globalProperties, s) || (c = o.__cssModules) && c[s]);
	},
	defineProperty(e, t, n) {
		return n.get == null ? u(n, "value") && this.set(e, t, n.value, null) : e._.accessCache[t] = 0, Reflect.defineProperty(e, t, n);
	}
};
function Mr() {
	return {
		app: null,
		config: {
			isNativeTag: i,
			performance: !1,
			globalProperties: {},
			optionMergeStrategies: {},
			errorHandler: void 0,
			warnHandler: void 0,
			compilerOptions: {}
		},
		mixins: [],
		components: {},
		directives: {},
		provides: /* @__PURE__ */ Object.create(null),
		optionsCache: /* @__PURE__ */ new WeakMap(),
		propsCache: /* @__PURE__ */ new WeakMap(),
		emitsCache: /* @__PURE__ */ new WeakMap()
	};
}
var Nr = 0;
function Pr(e, t) {
	return function(n, r = null) {
		h(n) || (n = s({}, n)), r != null && !v(r) && (r = null);
		let i = Mr(), a = /* @__PURE__ */ new WeakSet(), o = [], c = !1, l = i.app = {
			_uid: Nr++,
			_component: n,
			_props: r,
			_container: null,
			_context: i,
			_instance: null,
			version: fa,
			get config() {
				return i.config;
			},
			set config(e) {},
			use(e, ...t) {
				return a.has(e) || (e && h(e.install) ? (a.add(e), e.install(l, ...t)) : h(e) && (a.add(e), e(l, ...t))), l;
			},
			mixin(e) {
				return l;
			},
			component(e, t) {
				return t ? (i.components[e] = t, l) : i.components[e];
			},
			directive(e, t) {
				return t ? (i.directives[e] = t, l) : i.directives[e];
			},
			mount(a, o, s) {
				if (!c) {
					let u = l._ceVNode || V(n, r);
					return u.appContext = i, s === !0 ? s = "svg" : s === !1 && (s = void 0), o && t ? t(u, a) : e(u, a, s), c = !0, l._container = a, a.__vue_app__ = l, ca(u.component);
				}
			},
			onUnmount(e) {
				o.push(e);
			},
			unmount() {
				c && (Cn(o, l._instance, 16), e(null, l._container), delete l._container.__vue_app__);
			},
			provide(e, t) {
				return i.provides[e] = t, l;
			},
			runWithContext(e) {
				let t = Fr;
				Fr = l;
				try {
					return e();
				} finally {
					Fr = t;
				}
			}
		};
		return l;
	};
}
var Fr = null;
function Ir(e, n, r = t) {
	let i = Yi(), a = E(n), o = re(n), s = Lr(e, a), c = cn((s, c) => {
		let l, u = t, d;
		return Zn(() => {
			let t = e[a];
			D(l, t) && (l = t, c());
		}), {
			get() {
				return s(), r.get ? r.get(l) : l;
			},
			set(e) {
				let s = r.set ? r.set(e) : e;
				if (!D(s, l) && !(u !== t && D(e, u))) return;
				let f = i.vnode.props, p = !!(f && (n in f || a in f || o in f) && (`onUpdate:${n}` in f || `onUpdate:${a}` in f || `onUpdate:${o}` in f));
				p || (l = e, c()), i.emit(`update:${n}`, s), D(e, u) && (D(e, s) && !D(s, d) || p && u !== t && !D(s, l)) && c(), u = e, d = s;
			}
		};
	});
	return c[Symbol.iterator] = () => {
		let e = 0;
		return { next() {
			return e < 2 ? {
				value: e++ ? s || t : c,
				done: !1
			} : { done: !0 };
		} };
	}, c;
}
var Lr = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${E(t)}Modifiers`] || e[`${re(t)}Modifiers`];
function Rr(e, n, ...r) {
	if (e.isUnmounted) return;
	let i = e.vnode.props || t, a = r, o = n.startsWith("update:"), s = o && Lr(i, n.slice(7));
	s && (s.trim && (a = r.map((e) => g(e) ? e.trim() : e)), s.number && (a = a.map(O)));
	let c, l = i[c = ae(n)] || i[c = ae(E(n))];
	!l && o && (l = i[c = ae(re(n))]), l && Cn(l, e, 6, a);
	let u = i[c + "Once"];
	if (u) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[c]) return;
		e.emitted[c] = !0, Cn(u, e, 6, a);
	}
}
function zr(e, t, n = !1) {
	let r = t.emitsCache, i = r.get(e);
	if (i !== void 0) return i;
	let a = e.emits, o = {};
	return a ? (d(a) ? a.forEach((e) => o[e] = null) : s(o, a), v(e) && r.set(e, o), o) : (v(e) && r.set(e, null), null);
}
function Br(e, t) {
	return !e || !a(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), u(e, t[0].toLowerCase() + t.slice(1)) || u(e, re(t)) || u(e, t));
}
function Vr(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: s, attrs: c, emit: l, render: u, renderCache: d, props: f, data: p, setupState: m, ctx: h, inheritAttrs: g } = e, _ = Wn(e), v, y;
	try {
		if (n.shapeFlag & 4) {
			let e = i || r, t = e;
			v = Bi(u.call(t, e, d, f, m, p, h)), y = c;
		} else {
			let e = t;
			v = Bi(e.length > 1 ? e(f, {
				attrs: c,
				slots: s,
				emit: l
			}) : e(f, null)), y = t.props ? c : Hr(c);
		}
	} catch (t) {
		Di.length = 0, wn(t, e, 1), v = V(Ti);
	}
	let b = v;
	if (y && g !== !1) {
		let e = Object.keys(y), { shapeFlag: t } = b;
		e.length && t & 7 && (a && e.some(o) && (y = Ur(y, a)), b = zi(b, y, !1, !0));
	}
	return n.dirs && (b = zi(b, null, !1, !0), b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs), n.transition && ar(tr(b.type) && ir(b) || b, n.transition), v = b, Wn(_), v;
}
var Hr = (e) => {
	let t;
	for (let n in e) (n === "class" || n === "style" || a(n)) && ((t ||= {})[n] = e[n]);
	return t;
}, Ur = (e, t) => {
	let n = {};
	for (let r in e) (!o(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
	return n;
};
function Wr(e, t, n) {
	let { props: r, children: i, component: a } = e, { props: o, children: s, patchFlag: c } = t, l = a.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return r ? Gr(r, o, l) : !!o;
		if (c & 8) {
			let e = t.dynamicProps;
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if (Kr(o, r, n) && !Br(l, n)) return !0;
			}
		}
	} else return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? !o || Gr(r, o, l) : !!o;
	return !1;
}
function Gr(e, t, n) {
	let r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		let a = r[i];
		if (Kr(t, e, a) && !Br(n, a)) return !0;
	}
	return !1;
}
function Kr(e, t, n) {
	let r = e[n], i = t[n];
	return n === "style" && v(r) && v(i) ? !Ce(r, i) : r !== i;
}
function qr({ vnode: e, parent: t, suspense: n }, r) {
	for (; t;) {
		let n = t.subTree;
		if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = r, e = n), n === e) (e = t.vnode).el = r, t = t.parent;
		else break;
	}
	n && n.activeBranch === e && (n.vnode.el = r);
}
var Jr = {}, Yr = () => Object.create(Jr), Xr = (e) => Object.getPrototypeOf(e) === Jr;
function Zr(e, t, n, r = !1) {
	let i = {}, a = Yr();
	e.propsDefaults = /* @__PURE__ */ Object.create(null), $r(e, t, i, a);
	for (let t in e.propsOptions[0]) t in i || (i[t] = void 0);
	e.props = n ? r ? i : /* @__PURE__ */ Ht(i) : e.type.props ? i : a, e.attrs = a;
}
function Qr(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ j(i), [c] = e.propsOptions, l = !1;
	if ((r || o > 0) && !(o & 16)) {
		if (o & 8) {
			let n = e.vnode.dynamicProps;
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				if (Br(e.emitsOptions, o)) continue;
				let d = t[o];
				if (c) {
					if (u(a, o)) d !== a[o] && (a[o] = d, l = !0);
					else {
						let t = E(o);
						i[t] = ei(c, s, t, d, e, !1);
					}
				} else d !== a[o] && (a[o] = d, l = !0);
			}
		}
	} else {
		$r(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) (!t || !u(t, a) && ((r = re(a)) === a || !u(t, r))) && (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = ei(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) (!t || !u(t, e)) && (delete a[e], l = !0);
	}
	l && ot(e.attrs, "set", "");
}
function $r(e, n, r, i) {
	let [a, o] = e.propsOptions, s = !1, c;
	if (n) for (let t in n) {
		if (T(t)) continue;
		let l = n[t], d;
		a && u(a, d = E(t)) ? !o || !o.includes(d) ? r[d] = l : (c ||= {})[d] = l : Br(e.emitsOptions, t) || (!(t in i) || l !== i[t]) && (i[t] = l, s = !0);
	}
	if (o) {
		let n = /* @__PURE__ */ j(r), i = c || t;
		for (let t = 0; t < o.length; t++) {
			let s = o[t];
			r[s] = ei(a, n, s, i[s], e, !u(i, s));
		}
	}
	return s;
}
function ei(e, t, n, r, i, a) {
	let o = e[n];
	if (o != null) {
		let e = u(o, "default");
		if (e && r === void 0) {
			let e = o.default;
			if (o.type !== Function && !o.skipFactory && h(e)) {
				let { propsDefaults: a } = i;
				if (n in a) r = a[n];
				else {
					let o = Qi(i);
					r = a[n] = e.call(null, t), o();
				}
			} else r = e;
			i.ce && i.ce._setProp(n, r);
		}
		o[0] && (a && !e ? r = !1 : o[1] && (r === "" || r === re(n)) && (r = !0));
	}
	return r;
}
function ti(e, r, i = !1) {
	let a = r.propsCache, o = a.get(e);
	if (o) return o;
	let c = e.props, l = {}, f = [];
	if (!c) return v(e) && a.set(e, n), n;
	if (d(c)) for (let e = 0; e < c.length; e++) {
		let n = E(c[e]);
		ni(n) && (l[n] = t);
	}
	else if (c) for (let e in c) {
		let t = E(e);
		if (ni(t)) {
			let n = c[e], r = l[t] = d(n) || h(n) ? { type: n } : s({}, n), i = r.type, a = !1, o = !0;
			if (d(i)) for (let e = 0; e < i.length; ++e) {
				let t = i[e], n = h(t) && t.name;
				if (n === "Boolean") {
					a = !0;
					break;
				}
				n === "String" && (o = !1);
			}
			else a = h(i) && i.name === "Boolean";
			r[0] = a, r[1] = o, (a || u(r, "default")) && f.push(t);
		}
	}
	let p = [l, f];
	return v(e) && a.set(e, p), p;
}
function ni(e) {
	return e[0] !== "$" && !T(e);
}
var ri = (e) => e === "_" || e === "_ctx" || e === "$stable", ii = (e) => d(e) ? e.map(Bi) : [Bi(e)], ai = (e, t, n) => {
	if (t._n) return t;
	let r = P((...e) => ii(t(...e)), n);
	return r._c = !1, r;
}, oi = (e, t, n) => {
	let r = e._ctx;
	for (let n in e) {
		if (ri(n)) continue;
		let i = e[n];
		if (h(i)) t[n] = ai(n, i, r);
		else if (i != null) {
			let e = ii(i);
			t[n] = () => e;
		}
	}
}, si = (e, t) => {
	let n = ii(t);
	e.slots.default = () => n;
}, ci = (e, t, n) => {
	for (let r in t) (n || !ri(r)) && (e[r] = t[r]);
}, li = (e, t, n) => {
	let r = e.slots = Yr();
	if (e.vnode.shapeFlag & 32) {
		let e = t._;
		e ? (ci(r, t, n), n && se(r, "_", e, !0)) : oi(t, r);
	} else t && si(e, t);
}, ui = (e, n, r) => {
	let { vnode: i, slots: a } = e, o = !0, s = t;
	if (i.shapeFlag & 32) {
		let e = n._;
		e ? r && e === 1 ? o = !1 : ci(a, n, r) : (o = !n.$stable, oi(n, a)), s = n;
	} else n && (si(e, n), s = { default: 1 });
	if (o) for (let e in a) !ri(e) && s[e] == null && delete a[e];
}, di = Ci;
function fi(e) {
	return pi(e);
}
function pi(e, i) {
	let a = le();
	a.__VUE__ = !0;
	let { insert: o, remove: s, patchProp: c, createElement: l, createText: u, createComment: d, setText: f, setElementText: p, parentNode: m, nextSibling: h, setScopeId: g = r, insertStaticContent: _ } = e, v = (e, t, r, i = null, a = null, o = null, s = void 0, c = null, l = !!t.dynamicChildren) => {
		if (e === t) return;
		e && !Pi(e, t) && (i = ye(e), k(e, a, o, !0), e = null), t.patchFlag === -2 && (l = !1, t.dynamicChildren = null), t.dynamicChildren && e && e.dynamicChildren && e.dynamicChildren.hasOnce && (t.dynamicChildren === n && (t.dynamicChildren = []), t.dynamicChildren.hasOnce = !0);
		let { type: u, ref: d, shapeFlag: f } = t;
		switch (u) {
			case wi:
				y(e, t, r, i);
				break;
			case Ti:
				b(e, t, r, i);
				break;
			case Ei:
				e ?? x(t, r, i, s);
				break;
			case I:
				ae(e, t, r, i, a, o, s, c, l);
				break;
			default: f & 1 ? w(e, t, r, i, a, o, s, c, l) : f & 6 ? D(e, t, r, i, a, o, s, c, l) : (f & 64 || f & 128) && u.process(e, t, r, i, a, o, s, c, l, Se);
		}
		d != null && a ? ur(d, e && e.ref, o, t || e, !t) : d == null && e && e.ref != null && ur(e.ref, null, o, e, !0);
	}, y = (e, t, n, r) => {
		if (e == null) o(t.el = u(t.children), n, r);
		else {
			let n = t.el = e.el;
			t.children !== e.children && f(n, t.children);
		}
	}, b = (e, t, n, r) => {
		e == null ? o(t.el = d(t.children || ""), n, r) : t.el = e.el;
	}, x = (e, t, n, r) => {
		[e.el, e.anchor] = _(e.children, t, n, r, e.el, e.anchor);
	}, S = ({ el: e, anchor: t }, n, r) => {
		let i;
		for (; e && e !== t;) i = h(e), o(e, n, r), e = i;
		o(t, n, r);
	}, C = ({ el: e, anchor: t }) => {
		let n;
		for (; e && e !== t;) n = h(e), s(e), e = n;
		s(t);
	}, w = (e, t, n, r, i, a, o, s, c) => {
		if (t.type === "svg" ? o = "svg" : t.type === "math" && (o = "mathml"), e == null) ee(t, n, r, i, a, o, s, c);
		else {
			let n = e.el && e.el._isVueCE ? e.el : null;
			try {
				n && n._beginPatch(), ne(e, t, i, a, o, s, c);
			} finally {
				n && n._endPatch();
			}
		}
	}, ee = (e, t, n, r, i, a, s, u) => {
		let d, f, { props: m, shapeFlag: h, transition: g, dirs: _ } = e;
		if (d = e.el = l(e.type, a, m && m.is, m), h & 8 ? p(d, e.children) : h & 16 && E(e.children, d, null, r, i, mi(e, a), s, u), _ && Kn(e, null, r, "created"), te(d, e, e.scopeId, s, r), m) {
			for (let e in m) e !== "value" && !T(e) && c(d, e, null, m[e], a, r);
			"value" in m && c(d, "value", null, m.value, a), (f = m.onVnodeBeforeMount) && Wi(f, r, e);
		}
		_ && Kn(e, null, r, "beforeMount");
		let v = gi(i, g);
		v && g.beforeEnter(d), o(d, t, n), ((f = m && m.onVnodeMounted) || v || _) && di(() => {
			try {
				f && Wi(f, r, e), v && g.enter(d), _ && Kn(e, null, r, "mounted");
			} finally {}
		}, i);
	}, te = (e, t, n, r, i) => {
		if (n && g(e, n), r) for (let t = 0; t < r.length; t++) g(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (t === n || Si(n.type) && (n.ssContent === t || n.ssFallback === t)) {
				let t = i.vnode;
				te(e, t, t.scopeId, t.slotScopeIds, i.parent);
			}
		}
	}, E = (e, t, n, r, i, a, o, s, c = 0) => {
		for (let l = c; l < e.length; l++) {
			let c = e[l] = s ? Vi(e[l]) : Bi(e[l]);
			v(null, c, t, n, r, i, a, o, s);
		}
	}, ne = (e, n, r, i, a, o, s) => {
		let l = n.el = e.el, { patchFlag: u, dynamicChildren: d, dirs: f } = n;
		u |= e.patchFlag & 16;
		let m = e.props || t, h = n.props || t, g;
		if (r && hi(r, !1), (g = h.onVnodeBeforeUpdate) && Wi(g, r, n, e), f && Kn(n, e, r, "beforeUpdate"), r && hi(r, !0), d && (!e.dynamicChildren || e.dynamicChildren.length !== d.length) && (u = 0, s = !1, d = null), (m.innerHTML && h.innerHTML == null || m.textContent && h.textContent == null) && p(l, ""), d ? re(e.dynamicChildren, d, l, r, i, mi(n, a), o) : s || de(e, n, l, null, r, i, mi(n, a), o, !1), u > 0) {
			if (u & 16) ie(l, m, h, r, a);
			else if (u & 2 && m.class !== h.class && c(l, "class", null, h.class, a), u & 4 && c(l, "style", m.style, h.style, a), u & 8) {
				let e = n.dynamicProps;
				for (let t = 0; t < e.length; t++) {
					let n = e[t], i = m[n], o = h[n];
					(o !== i || n === "value") && c(l, n, i, o, a, r);
				}
			}
			u & 1 && e.children !== n.children && p(l, n.children);
		} else !s && d == null && ie(l, m, h, r, a);
		((g = h.onVnodeUpdated) || f) && di(() => {
			g && Wi(g, r, n, e), f && Kn(n, e, r, "updated");
		}, i);
	}, re = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s], u = c.el && (c.type === I || !Pi(c, l) || c.shapeFlag & 198) ? m(c.el) : n;
			v(c, l, u, null, r, i, a, o, !0);
		}
	}, ie = (e, n, r, i, a) => {
		if (n !== r) {
			if (n !== t) for (let t in n) !T(t) && !(t in r) && c(e, t, n[t], null, a, i);
			for (let t in r) {
				if (T(t)) continue;
				let o = r[t], s = n[t];
				o !== s && t !== "value" && c(e, t, s, o, a, i);
			}
			"value" in r && c(e, "value", n.value, r.value, a);
		}
	}, ae = (e, t, n, r, i, a, s, c, l) => {
		let d = t.el = e ? e.el : u(""), f = t.anchor = e ? e.anchor : u(""), { patchFlag: p, dynamicChildren: m, slotScopeIds: h } = t;
		h && (c = c ? c.concat(h) : h), e == null ? (o(d, n, r), o(f, n, r), E(t.children || [], n, f, i, a, s, c, l)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (re(e.dynamicChildren, m, n, i, a, s, c), (t.key != null || i && t === i.subTree) && _i(e, t, !0)) : de(e, t, n, f, i, a, s, c, l);
	}, D = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : se(t, n, r, i, a, o, c) : O(e, t, c);
	}, se = (e, t, n, r, i, a, o) => {
		let s = e.component = qi(e, r, i);
		if (pr(e) && (s.ctx.renderer = Se), na(s, !1, o), s.asyncDep) {
			if (i && i.registerDep(s, ce, o), !e.el) {
				let r = s.subTree = V(Ti);
				b(null, r, t, n), e.placeholder = r.el;
			}
		} else ce(s, e, t, n, i, a, o);
	}, O = (e, t, n) => {
		let r = t.component = e.component;
		if (Wr(e, t, n)) {
			if (r.asyncDep && !r.asyncResolved) {
				t.el = e.el, ue(r, t, n);
				return;
			}
			r.next = t, r.update();
		} else t.el = e.el, r.vnode = t;
	}, ce = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = yi(e);
					if (n) {
						t && (t.el = c.el, ue(e, t, o)), n.asyncDep.then(() => {
							di(() => {
								e.isUnmounted || l();
							}, i);
						});
						return;
					}
				}
				let u = t, d;
				hi(e, !1), t ? (t.el = c.el, ue(e, t, o)) : t = c, n && oe(n), (d = t.props && t.props.onVnodeBeforeUpdate) && Wi(d, s, t, c), hi(e, !0);
				let f = Vr(e), p = e.subTree;
				e.subTree = f, v(p, f, m(p.el), ye(p), e, i, a), t.el = f.el, u === null && qr(e, f.el), r && di(r, i), (d = t.props && t.props.onVnodeUpdated) && di(() => Wi(d, s, t, c), i);
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = fr(t);
				if (hi(e, !1), l && oe(l), !m && (o = c && c.onVnodeBeforeMount) && Wi(o, d, t), hi(e, !0), s && we) {
					let t = () => {
						e.subTree = Vr(e), we(s, e.subTree, e, i, null);
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0);
					let o = e.subTree = Vr(e);
					v(null, o, n, r, e, i, a), t.el = o.el;
				}
				if (u && di(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					di(() => Wi(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && fr(d.vnode) && d.vnode.shapeFlag & 256) && e.a && di(e.a, i), e.isMounted = !0, t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new Ne(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => Fn(u), hi(e, !0), l();
	}, ue = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, Qr(e, t.props, r, n), ui(e, t.children, n), Je(), Rn(e), Ye();
	}, de = (e, t, n, r, i, a, o, s, c = !1) => {
		let l = e && e.children, u = e ? e.shapeFlag : 0, d = t.children, { patchFlag: f, shapeFlag: m } = t;
		if (f > 0) {
			if (f & 128) {
				pe(l, d, n, r, i, a, o, s, c);
				return;
			}
			if (f & 256) {
				fe(l, d, n, r, i, a, o, s, c);
				return;
			}
		}
		m & 8 ? (u & 16 && ve(l, i, a), d !== l && p(n, d)) : u & 16 ? m & 16 ? pe(l, d, n, r, i, a, o, s, c) : ve(l, i, a, !0) : (u & 8 && p(n, ""), m & 16 && E(d, n, r, i, a, o, s, c));
	}, fe = (e, t, r, i, a, o, s, c, l) => {
		e ||= n, t ||= n;
		let u = e.length, d = t.length, f = Math.min(u, d), p = 0;
		for (; p < f; p++) {
			let n = t[p] = l ? Vi(t[p]) : Bi(t[p]);
			v(e[p], n, r, null, a, o, s, c, l);
		}
		u > d ? ve(e, a, o, !0, !1, f) : E(t, r, i, a, o, s, c, l, f);
	}, pe = (e, t, r, i, a, o, s, c, l) => {
		let u = 0, d = t.length, f = e.length - 1, p = d - 1;
		for (; u <= f && u <= p;) {
			let n = e[u], i = t[u] = l ? Vi(t[u]) : Bi(t[u]);
			if (Pi(n, i)) v(n, i, r, null, a, o, s, c, l);
			else break;
			u++;
		}
		for (; u <= f && u <= p;) {
			let n = e[f], i = t[p] = l ? Vi(t[p]) : Bi(t[p]);
			if (Pi(n, i)) v(n, i, r, null, a, o, s, c, l);
			else break;
			f--, p--;
		}
		if (u > f) {
			if (u <= p) {
				let e = p + 1, n = e < d ? t[e].el : i;
				for (; u <= p;) v(null, t[u] = l ? Vi(t[u]) : Bi(t[u]), r, n, a, o, s, c, l), u++;
			}
		} else if (u > p) for (; u <= f;) k(e[u], a, o, !0), u++;
		else {
			let m = u, h = u, g = /* @__PURE__ */ new Map();
			for (u = h; u <= p; u++) {
				let e = t[u] = l ? Vi(t[u]) : Bi(t[u]);
				e.key != null && g.set(e.key, u);
			}
			let _, y = 0, b = p - h + 1, x = !1, S = 0, C = Array(b);
			for (u = 0; u < b; u++) C[u] = 0;
			for (u = m; u <= f; u++) {
				let n = e[u];
				if (y >= b) {
					k(n, a, o, !0);
					continue;
				}
				let i;
				if (n.key != null) i = g.get(n.key);
				else for (_ = h; _ <= p; _++) if (C[_ - h] === 0 && Pi(n, t[_])) {
					i = _;
					break;
				}
				i === void 0 ? k(n, a, o, !0) : (C[i - h] = u + 1, i >= S ? S = i : x = !0, v(n, t[i], r, null, a, o, s, c, l), y++);
			}
			let w = x ? vi(C) : n;
			for (_ = w.length - 1, u = b - 1; u >= 0; u--) {
				let e = h + u, n = t[e], f = t[e + 1], p = e + 1 < d ? f.el || xi(f) : i;
				C[u] === 0 ? v(null, n, r, p, a, o, s, c, l) : x && (_ < 0 || u !== w[_] ? me(n, r, p, 2) : _--);
			}
		}
	}, me = (e, t, n, r, i = null) => {
		let { el: a, type: c, transition: l, children: u, shapeFlag: d } = e;
		if (d & 6) {
			me(e.component.subTree, t, n, r);
			return;
		}
		if (d & 128) {
			e.suspense.move(t, n, r);
			return;
		}
		if (d & 64) {
			c.move(e, t, n, Se);
			return;
		}
		if (c === I) {
			o(a, t, n);
			for (let e = 0; e < u.length; e++) me(u[e], t, n, r);
			o(e.anchor, t, n);
			return;
		}
		if (c === Ei) {
			S(e, t, n);
			return;
		}
		if (r !== 2 && d & 1 && l) {
			if (r === 0) l.persisted && !a[nr] ? o(a, t, n) : (l.beforeEnter(a), o(a, t, n), di(() => l.enter(a), i));
			else {
				let { leave: r, delayLeave: i, afterLeave: c } = l, u = () => {
					e.ctx.isUnmounted ? s(a) : o(a, t, n);
				}, d = () => {
					let e = a._isLeaving || !!a[nr];
					a._isLeaving && a[nr](!0), l.persisted && !e ? u() : r(a, () => {
						u(), c && c();
					});
				};
				i ? i(a, u, d) : d();
			}
		} else o(a, t, n);
	}, k = (e, t, n, r = !1, i = !1) => {
		let { type: a, props: o, ref: s, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: d, dirs: f, cacheIndex: p, memo: m } = e;
		if ((d === -2 || l && l.hasOnce) && (i = !1), s != null && (Je(), ur(s, null, n, e, !0), Ye()), p != null && (!e.ctx || e.ctx === t) && (t.renderCache[p] = void 0), u & 256) {
			t.ctx.deactivate(e);
			return;
		}
		let h = u & 1 && f, g = !fr(e), _;
		if (g && (_ = o && o.onVnodeBeforeUnmount) && Wi(_, t, e), u & 6) _e(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			h && Kn(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, Se, r) : l && !l.hasOnce && (a !== I || d > 0 && d & 64) ? ve(l, t, n, !1, !0) : (a === I && d & 384 || !i && u & 16) && ve(c, t, n), r && he(e);
		}
		let v = m != null && p == null;
		(g && (_ = o && o.onVnodeUnmounted) || h || v) && di(() => {
			_ && Wi(_, t, e), h && Kn(e, null, t, "unmounted"), v && (e.el = null);
		}, n);
	}, he = (e) => {
		let { type: t, el: n, anchor: r, transition: i } = e;
		if (t === I) {
			ge(n, r);
			return;
		}
		if (t === Ei) {
			C(e), i && !i.persisted && i.afterLeave && i.afterLeave();
			return;
		}
		let a = () => {
			s(n), i && !i.persisted && i.afterLeave && i.afterLeave();
		};
		if (e.shapeFlag & 1 && i && !i.persisted) {
			let { leave: t, delayLeave: r } = i, o = () => t(n, a);
			r ? r(e.el, a, o) : o();
		} else a();
	}, ge = (e, t) => {
		let n;
		for (; e !== t;) n = h(e), s(e), e = n;
		s(t);
	}, _e = (e, t, n) => {
		let { bum: r, scope: i, job: a, subTree: o, um: s, m: c, a: l } = e;
		bi(c), bi(l), r && oe(r), i.stop(), a ? (a.flags |= 8, k(o, e, t, n)) : e.vnode.el && o && (o.transition = e.vnode.transition, k(o, e, t, n)), s && di(s, t), di(() => {
			e.isUnmounted = !0;
		}, t);
	}, ve = (e, t, n, r = !1, i = !1, a = 0) => {
		for (let o = a; o < e.length; o++) k(e[o], t, n, r, i);
	}, ye = (e) => {
		if (e.shapeFlag & 6) return ye(e.component.subTree);
		if (e.shapeFlag & 128) return e.suspense.next();
		let t = h(e.anchor || e.el), n = t && t[er];
		return n ? h(n) : t;
	}, be = !1, xe = (e, t, n) => {
		let r;
		e == null ? t._vnode && (k(t._vnode, null, null, !0), r = t._vnode.component) : v(t._vnode || null, e, t, null, null, null, n), t._vnode = e, be ||= (be = !0, Rn(r), zn(), !1);
	}, Se = {
		p: v,
		um: k,
		m: me,
		r: he,
		mt: se,
		mc: E,
		pc: de,
		pbc: re,
		n: ye,
		o: e
	}, Ce, we;
	return i && ([Ce, we] = i(Se)), {
		render: xe,
		hydrate: Ce,
		createApp: Pr(xe, Ce)
	};
}
function mi({ type: e, props: t }, n) {
	return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function hi({ effect: e, job: t }, n) {
	n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function gi(e, t) {
	return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function _i(e, t, n = !1) {
	let r = e.children, i = t.children;
	if (d(r) && d(i)) for (let e = 0; e < r.length; e++) {
		let t = r[e], a = i[e];
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = Vi(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && _i(t, a)), a.type === wi && (a.patchFlag === -1 && (a = i[e] = Vi(a)), a.el = t.el), a.type === Ti && !a.el && (a.el = t.el);
	}
}
function vi(e) {
	let t = e.slice(), n = [0], r, i, a, o, s, c = e.length;
	for (r = 0; r < c; r++) {
		let c = e[r];
		if (c !== 0) {
			if (i = n[n.length - 1], e[i] < c) {
				t[r] = i, n.push(r);
				continue;
			}
			for (a = 0, o = n.length - 1; a < o;) s = a + o >> 1, e[n[s]] < c ? a = s + 1 : o = s;
			c < e[n[a]] && (a > 0 && (t[r] = n[a - 1]), n[a] = r);
		}
	}
	for (a = n.length, o = n[a - 1]; a-- > 0;) n[a] = o, o = t[o];
	return n;
}
function yi(e) {
	let t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : yi(t);
}
function bi(e) {
	if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function xi(e) {
	if (e.placeholder) return e.placeholder;
	let t = e.component;
	return t ? xi(t.subTree) : null;
}
var Si = (e) => e.__isSuspense;
function Ci(e, t) {
	t && t.pendingBranch ? d(e) ? t.effects.push(...e) : t.effects.push(e) : Ln(e);
}
var I = /* @__PURE__ */ Symbol.for("v-fgt"), wi = /* @__PURE__ */ Symbol.for("v-txt"), Ti = /* @__PURE__ */ Symbol.for("v-cmt"), Ei = /* @__PURE__ */ Symbol.for("v-stc"), Di = [], Oi = null;
function L(e = !1) {
	Di.push(Oi = e ? null : []);
}
function ki() {
	Di.pop(), Oi = Di[Di.length - 1] || null;
}
var Ai = 1;
function ji(e, t = !1) {
	Ai += e, e < 0 && Oi && t && (Oi.hasOnce = !0);
}
function Mi(e) {
	return e.dynamicChildren = Ai > 0 ? Oi || n : null, ki(), Ai > 0 && Oi && Oi.push(e), e;
}
function R(e, t, n, r, i, a) {
	return Mi(B(e, t, n, r, i, a, !0));
}
function z(e, t, n, r, i) {
	return Mi(V(e, t, n, r, i, !0));
}
function Ni(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function Pi(e, t) {
	return e.type === t.type && e.key === t.key;
}
var Fi = ({ key: e }) => e ?? null, Ii = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : g(e) || /* @__PURE__ */ Qt(e) || h(e) ? {
	i: Hn,
	r: e,
	k: t,
	f: !!n
} : e);
function B(e, t = null, n = null, r = 0, i = null, a = e === I ? 0 : 1, o = !1, s = !1) {
	let c = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && Fi(t),
		ref: t && Ii(t),
		scopeId: Un,
		slotScopeIds: null,
		children: n,
		component: null,
		suspense: null,
		ssContent: null,
		ssFallback: null,
		dirs: null,
		transition: null,
		el: null,
		anchor: null,
		target: null,
		targetStart: null,
		targetAnchor: null,
		staticCount: 0,
		shapeFlag: a,
		patchFlag: r,
		dynamicProps: i,
		dynamicChildren: null,
		appContext: null,
		ctx: Hn
	};
	return s ? (Hi(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= g(n) ? 8 : 16), Ai > 0 && !o && Oi && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && Oi.push(c), c;
}
var V = Li;
function Li(e, t = null, n = null, r = 0, i = null, a = !1) {
	if ((!e || e === xr) && (e = Ti), Ni(e)) {
		let r = zi(e, t, !0);
		return n && Hi(r, n), Ai > 0 && !a && Oi && (r.shapeFlag & 6 ? Oi[Oi.indexOf(e)] = r : Oi.push(r)), r.patchFlag = -2, r;
	}
	if (ua(e) && (e = e.__vccOpts), t) {
		t = Ri(t);
		let { class: e, style: n } = t;
		e && !g(e) && (t.class = k(e)), v(n) && (/* @__PURE__ */ Jt(n) && !d(n) && (n = s({}, n)), t.style = ue(n));
	}
	let o = g(e) ? 1 : Si(e) ? 128 : tr(e) ? 64 : v(e) ? 4 : h(e) ? 2 : 0;
	return B(e, t, n, r, i, o, a, !0);
}
function Ri(e) {
	return e ? /* @__PURE__ */ Jt(e) || Xr(e) ? s({}, e) : e : null;
}
function zi(e, t, n = !1, r = !1) {
	let { props: i, ref: a, patchFlag: o, children: s, transition: c } = e, l = t ? Ui(i || {}, t) : i, u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && Fi(l),
		ref: t && t.ref ? n && a ? d(a) ? a.concat(Ii(t)) : [a, Ii(t)] : Ii(t) : a,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: s,
		target: e.target,
		targetStart: e.targetStart,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== I ? o === -1 ? 16 : o | 16 : o,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: c,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && zi(e.ssContent),
		ssFallback: e.ssFallback && zi(e.ssFallback),
		placeholder: e.placeholder,
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce,
		cacheIndex: e.cacheIndex
	};
	return c && r && ar(u, c.clone(u)), u;
}
function H(e = " ", t = 0) {
	return V(wi, null, e, t);
}
function U(e = "", t = !1) {
	return t ? (L(), z(Ti, null, e)) : V(Ti, null, e);
}
function Bi(e) {
	return e == null || typeof e == "boolean" ? V(Ti) : d(e) ? V(I, null, e.slice()) : Ni(e) ? Vi(e) : V(wi, null, String(e));
}
function Vi(e) {
	return e.el === null && e.patchFlag !== -1 || e.memo ? e : zi(e);
}
function Hi(e, t) {
	let n = 0, { shapeFlag: r } = e;
	if (t == null) t = null;
	else if (d(t)) n = 16;
	else if (typeof t == "object") {
		if (r & 65) {
			let n = t.default;
			n && (n._c && (n._d = !1), Hi(e, n()), n._c && (n._d = !0));
			return;
		}
		{
			n = 32;
			let r = t._;
			!r && !Xr(t) ? t._ctx = Hn : r === 3 && Hn && (Hn.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
		}
	} else if (h(t)) {
		if (r & 65) {
			Hi(e, { default: t });
			return;
		}
		t = {
			default: t,
			_ctx: Hn
		}, n = 32;
	} else t = String(t), r & 64 ? (n = 16, t = [H(t)]) : n = 8;
	e.children = t, e.shapeFlag |= n;
}
function Ui(...e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (let e in r) if (e === "class") t.class !== r.class && (t.class = k([t.class, r.class]));
		else if (e === "style") t.style = ue([t.style, r.style]);
		else if (a(e)) {
			let n = t[e], i = r[e];
			i && n !== i && !(d(n) && n.includes(i)) ? t[e] = n ? [].concat(n, i) : i : i == null && n == null && !o(e) && (t[e] = i);
		} else e !== "" && (t[e] = r[e]);
	}
	return t;
}
function Wi(e, t, n, r = null) {
	Cn(e, t, 7, [n, r]);
}
var Gi = Mr(), Ki = 0;
function qi(e, n, r) {
	let i = e.type, a = (n ? n.appContext : e.appContext) || Gi, o = {
		uid: Ki++,
		vnode: e,
		type: i,
		parent: n,
		appContext: a,
		root: null,
		next: null,
		subTree: null,
		effect: null,
		update: null,
		job: null,
		scope: new ke(!0),
		render: null,
		proxy: null,
		exposed: null,
		exposeProxy: null,
		withProxy: null,
		provides: n ? n.provides : Object.create(a.provides),
		ids: n ? n.ids : [
			"",
			0,
			0
		],
		accessCache: null,
		renderCache: [],
		components: null,
		directives: null,
		propsOptions: ti(i, a),
		emitsOptions: zr(i, a),
		emit: null,
		emitted: null,
		propsDefaults: t,
		inheritAttrs: i.inheritAttrs,
		ctx: t,
		data: t,
		props: t,
		attrs: t,
		slots: t,
		refs: t,
		setupState: t,
		setupContext: null,
		suspense: r,
		suspenseId: r ? r.pendingId : 0,
		asyncDep: null,
		asyncResolved: !1,
		isMounted: !1,
		isUnmounted: !1,
		isDeactivated: !1,
		bc: null,
		c: null,
		bm: null,
		m: null,
		bu: null,
		u: null,
		um: null,
		bum: null,
		da: null,
		a: null,
		rtg: null,
		rtc: null,
		ec: null,
		sp: null
	};
	return o.ctx = { _: o }, o.root = n ? n.root : o, o.emit = Rr.bind(null, o), e.ce && e.ce(o), o;
}
var Ji = null, Yi = () => Ji || Hn, Xi, Zi;
{
	let e = le(), t = (t, n) => {
		let r;
		return (r = e[t]) || (r = e[t] = []), r.push(n), (e) => {
			r.length > 1 ? r.forEach((t) => t(e)) : r[0](e);
		};
	};
	Xi = t("__VUE_INSTANCE_SETTERS__", (e) => Ji = e), Zi = t("__VUE_SSR_SETTERS__", (e) => ta = e);
}
var Qi = (e) => {
	let t = Ji;
	return Xi(e), e.scope.on(), () => {
		e.scope.off(), Xi(t);
	};
}, $i = () => {
	Ji && Ji.scope.off(), Xi(null);
};
function ea(e) {
	return e.vnode.shapeFlag & 4;
}
var ta = !1;
function na(e, t = !1, n = !1) {
	t && Zi(t);
	let { props: r, children: i } = e.vnode, a = ea(e);
	Zr(e, r, a, t), li(e, i, n || t);
	let o = a ? ra(e, t) : void 0;
	return t && Zi(!1), o;
}
function ra(e, t) {
	let n = e.type;
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, jr);
	let { setup: r } = n;
	if (r) {
		Je();
		let n = e.setupContext = r.length > 1 ? sa(e) : null, i = Qi(e), a = Sn(r, e, 0, [e.props, n]), o = y(a);
		if (Ye(), i(), (o || e.sp) && !fr(e) && sr(e), o) {
			if (a.then($i, $i), t) return a.then((n) => {
				Zi(!0);
				try {
					ia(e, n, t);
				} finally {
					Zi(!1);
				}
			}).catch((t) => {
				wn(t, e, 0);
			});
			e.asyncDep = a;
		} else ia(e, a, t);
	} else aa(e, t);
}
function ia(e, t, n) {
	h(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : v(t) && (e.setupState = on(t)), aa(e, n);
}
function aa(e, t, n) {
	let i = e.type;
	e.render ||= i.render || r;
}
var oa = { get(e, t) {
	return at(e, "get", ""), e[t];
} };
function sa(e) {
	return {
		attrs: new Proxy(e.attrs, oa),
		slots: e.slots,
		emit: e.emit,
		expose: (t) => {
			e.exposed = t || {};
		}
	};
}
function ca(e) {
	return e.exposed ? e.exposeProxy ||= new Proxy(on(Yt(e.exposed)), {
		get(t, n) {
			if (n in t) return t[n];
			if (n in kr) return kr[n](e);
		},
		has(e, t) {
			return t in e || t in kr;
		}
	}) : e.proxy;
}
function la(e, t = !0) {
	return h(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function ua(e) {
	return h(e) && "__vccOpts" in e;
}
var W = (e, t) => /* @__PURE__ */ hn(e, t, ta);
function da(e, t, n) {
	try {
		ji(-1);
		let r = arguments.length;
		return r === 2 ? v(t) && !d(t) ? Ni(t) ? V(e, null, [t]) : V(e, t) : V(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && Ni(n) && (n = [n]), V(e, t, n));
	} finally {
		ji(1);
	}
}
var fa = "3.5.43", pa = void 0, ma = typeof window < "u" && window.trustedTypes;
if (ma) try {
	pa = /* @__PURE__ */ ma.createPolicy("vue", { createHTML: (e) => e });
} catch {}
var ha = pa ? (e) => pa.createHTML(e) : (e) => e, ga = "http://www.w3.org/2000/svg", _a = "http://www.w3.org/1998/Math/MathML", va = typeof document < "u" ? document : null, ya = va && /* @__PURE__ */ va.createElement("template"), ba = {
	insert: (e, t, n) => {
		t.insertBefore(e, n || null);
	},
	remove: (e) => {
		let t = e.parentNode;
		t && t.removeChild(e);
	},
	createElement: (e, t, n, r) => {
		let i = t === "svg" ? va.createElementNS(ga, e) : t === "mathml" ? va.createElementNS(_a, e) : n ? va.createElement(e, { is: n }) : va.createElement(e);
		return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
	},
	createText: (e) => va.createTextNode(e),
	createComment: (e) => va.createComment(e),
	setText: (e, t) => {
		e.nodeValue = t;
	},
	setElementText: (e, t) => {
		e.textContent = t;
	},
	parentNode: (e) => e.parentNode,
	nextSibling: (e) => e.nextSibling,
	querySelector: (e) => va.querySelector(e),
	setScopeId(e, t) {
		e.setAttribute(t, "");
	},
	insertStaticContent(e, t, n, r, i, a) {
		let o = n ? n.previousSibling : t.lastChild;
		if (i && (i === a || i.nextSibling)) for (; t.insertBefore(i.cloneNode(!0), n), i !== a && (i = i.nextSibling););
		else {
			ya.innerHTML = ha(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
			let i = ya.content;
			if (r === "svg" || r === "mathml") {
				let e = i.firstChild;
				for (; e.firstChild;) i.appendChild(e.firstChild);
				i.removeChild(e);
			}
			t.insertBefore(i, n);
		}
		return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
	}
}, xa = /* @__PURE__ */ Symbol("_vtc");
function Sa(e, t, n) {
	let r = e[xa];
	r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
var Ca = /* @__PURE__ */ Symbol("_vod"), wa = /* @__PURE__ */ Symbol("_vsh"), Ta = /* @__PURE__ */ Symbol(""), Ea = /(?:^|;)\s*display\s*:/;
function Da(e, t, n) {
	let r = e.style, i = g(n), a = !1;
	if (n && !i) {
		if (t) {
			if (g(t)) for (let e of t.split(";")) {
				let t = e.slice(0, e.indexOf(":")).trim();
				n[t] ?? ka(r, t, "");
			}
			else for (let e in t) n[e] ?? ka(r, e, "");
		}
		for (let i in n) {
			i === "display" && (a = !0);
			let o = n[i];
			o == null ? ka(r, i, "") : Na(e, i, !g(t) && t ? t[i] : void 0, o) || ka(r, i, o);
		}
	} else if (i) {
		if (t !== n) {
			let e = r[Ta];
			e && (n += ";" + e), r.cssText = n, a = Ea.test(n);
		}
	} else t && e.removeAttribute("style");
	Ca in e && (e[Ca] = a ? r.display : "", e[wa] && (r.display = "none"));
}
var Oa = /\s*!important$/;
function ka(e, t, n) {
	if (d(n)) n.forEach((n) => ka(e, t, n));
	else if (n ??= "", t.startsWith("--")) Oa.test(n) ? e.setProperty(t, n.replace(Oa, ""), "important") : e.setProperty(t, n);
	else {
		let r = Ma(e, t);
		Oa.test(n) ? e.setProperty(re(r), n.replace(Oa, ""), "important") : e[r] = n;
	}
}
var Aa = [
	"Webkit",
	"Moz",
	"ms"
], ja = {};
function Ma(e, t) {
	let n = ja[t];
	if (n) return n;
	let r = E(t);
	if (r !== "filter" && r in e) return ja[t] = r;
	r = ie(r);
	for (let n = 0; n < Aa.length; n++) {
		let i = Aa[n] + r;
		if (i in e) return ja[t] = i;
	}
	return t;
}
function Na(e, t, n, r) {
	return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && g(r) && n === r;
}
var Pa = "http://www.w3.org/1999/xlink";
function Fa(e, t, n, r, i, a = _e(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Pa, t.slice(6, t.length)) : e.setAttributeNS(Pa, t, n) : n == null || a && !ve(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : _(n) ? String(n) : n);
}
function Ia(e, t, n, r, i) {
	if (t === "innerHTML" || t === "textContent") {
		n != null && (e[t] = t === "innerHTML" ? ha(n) : n);
		return;
	}
	let a = e.tagName;
	if (t === "value" && a !== "PROGRESS" && !a.includes("-")) {
		let r = a === "OPTION" ? e.getAttribute("value") || "" : e.value, i = n == null ? e.type === "checkbox" ? "on" : "" : String(n);
		(r !== i || !("_value" in e)) && (e.value = i), n ?? e.removeAttribute(t), e._value = n;
		return;
	}
	let o = !1;
	if (n === "" || n == null) {
		let r = typeof e[t];
		r === "boolean" ? n = ve(n) : n == null && r === "string" ? (n = "", o = !0) : r === "number" && (n = 0, o = !0);
	}
	try {
		e[t] = n;
	} catch {}
	o && e.removeAttribute(i || t);
}
function La(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function Ra(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
var za = /* @__PURE__ */ Symbol("_vei");
function Ba(e, t, n, r, i = null) {
	let a = e[za] || (e[za] = {}), o = a[t];
	if (r && o) o.value = r;
	else {
		let [n, s] = Ua(t);
		r ? La(e, n, a[t] = qa(r, i), s) : o && (Ra(e, n, o, s), a[t] = void 0);
	}
}
var Va = /(Once|Passive|Capture)$/, Ha = /^on:?(?:Once|Passive|Capture)$/;
function Ua(e) {
	let t, n;
	for (; (n = e.match(Va)) && !Ha.test(e);) t ||= {}, e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
	return [e[2] === ":" ? e.slice(3) : re(e.slice(2)), t];
}
var Wa = 0, Ga = /* @__PURE__ */ Promise.resolve(), Ka = () => Wa ||= (Ga.then(() => Wa = 0), Date.now());
function qa(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		let r = n.value;
		if (d(r)) {
			let n = e.stopImmediatePropagation;
			e.stopImmediatePropagation = () => {
				n.call(e), e._stopped = !0;
			};
			let i = r.slice(), a = [e];
			for (let n = 0; n < i.length && !e._stopped; n++) {
				let e = i[n];
				e && Cn(e, t, 5, a);
			}
		} else Cn(r, t, 5, [e]);
	};
	return n.value = e, n.attached = Ka(), n;
}
var Ja = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Ya = (e, t, n, r, i, s) => {
	let c = i === "svg";
	t === "class" ? Sa(e, r, c) : t === "style" ? Da(e, n, r) : a(t) ? o(t) || Ba(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), 1) : t[0] === "^" ? (t = t.slice(1), 0) : Xa(e, t, r, c)) ? (Ia(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Fa(e, t, r, c, s, t !== "value")) : e._isVueCE && (Za(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !g(r))) ? Ia(e, E(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Fa(e, t, r, c));
};
function Xa(e, t, n, r) {
	if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && Ja(t) && h(n));
	if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
	if (t === "width" || t === "height") {
		let t = e.tagName;
		if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "SOURCE") return !1;
	}
	return Ja(t) && g(n) ? !1 : t in e;
}
function Za(e, t) {
	let n = e._def.props;
	if (!n) return !1;
	let r = E(t);
	return Array.isArray(n) ? n.some((e) => E(e) === r) : Object.keys(n).some((e) => E(e) === r);
}
var Qa = (e) => {
	let t = e.props["onUpdate:modelValue"] || !1;
	return d(t) ? (e) => oe(t, e) : t;
};
function $a(e) {
	e.target.composing = !0;
}
function eo(e) {
	let t = e.target;
	t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var to = /* @__PURE__ */ Symbol("_assign"), no = /* @__PURE__ */ Symbol("_initialValue");
function ro(e, t, n) {
	return t && (e = e.trim()), n && (e = O(e)), e;
}
var io = {
	created(e, { modifiers: { lazy: t, trim: n, number: r } }, i) {
		e.parentNode && (e.type === "text" ? e[no] = e.defaultValue.replace(/[\r\n]/g, "") : e.type === "textarea" && (e[no] = e.defaultValue.replace(/\r\n?/g, "\n"))), e[to] = Qa(i);
		let a = r || i.props && i.props.type === "number";
		La(e, t ? "change" : "input", (t) => {
			t.target.composing || e[to](ro(e.value, n, a));
		}), (n || a) && La(e, "change", () => {
			e.value = ro(e.value, n, a);
		}), t || (La(e, "compositionstart", $a), La(e, "compositionend", eo), La(e, "change", eo));
	},
	mounted(e, { value: t, modifiers: { trim: n, number: r } }) {
		let i = t ?? "", a = e[no];
		delete e[no], a !== void 0 && (e.type === "text" || e.type === "textarea") && e.value !== a ? e[to](ro(e.value, n, r)) : e.value = i;
	},
	beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: i, number: a } }, o) {
		if (e[to] = Qa(o), e.composing) return;
		let s = (a || e.type === "number") && !/^0\d/.test(e.value) ? O(e.value) : e.value, c = t ?? "";
		if (s === c) return;
		let l = e.getRootNode();
		(l instanceof Document || l instanceof ShadowRoot) && l.activeElement === e && e.type !== "range" && (r && t === n || i && e.value.trim() === c) || (e.value = c);
	}
}, ao = {
	deep: !0,
	created(e, { value: t, modifiers: { number: n } }, r) {
		e._modelValue = t, La(e, "change", () => {
			let t = Array.prototype.filter.call(e.options, (e) => e.selected).map((e) => n ? O(co(e)) : co(e)), r = e.multiple, i = r ? p(e._modelValue) ? new Set(t) : t : t[0], a = e._pendingValue = [r, r ? d(i) ? t.slice() : t : i];
			try {
				e[to](i);
			} finally {
				Nn(() => {
					e._pendingValue === a && (e._pendingValue = void 0);
				});
			}
		}), e[to] = Qa(r);
	},
	mounted(e, { value: t }) {
		so(e, t);
	},
	beforeUpdate(e, { value: t }, n) {
		e._modelValue = t, e[to] = Qa(n);
	},
	updated(e, { value: t }) {
		let n = e._pendingValue;
		e._pendingValue = void 0, (!n || n[0] !== e.multiple || !oo(t, n[1], n[0])) && so(e, t);
	}
};
function oo(e, t, n) {
	if (!n || d(e)) return Ce(e, t);
	if (p(e)) {
		if (e.size !== t.length) return !1;
		for (let n of t) if (!e.has(n)) return !1;
		return !0;
	}
	return !1;
}
function so(e, t) {
	let n = e.multiple, r = d(t);
	if (!n || r || p(t)) {
		for (let i = 0, a = e.options.length; i < a; i++) {
			let a = e.options[i], o = co(a);
			if (n) {
				if (r) {
					let e = typeof o;
					a.selected = e === "string" || e === "number" ? t.some((e) => String(e) === String(o)) : we(t, o) > -1;
				} else a.selected = t.has(o);
			} else if (Ce(co(a), t)) {
				e.selectedIndex !== i && (e.selectedIndex = i);
				return;
			}
		}
		!n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
	}
}
function co(e) {
	return "_value" in e ? e._value : e.value;
}
var lo = [
	"ctrl",
	"shift",
	"alt",
	"meta"
], uo = {
	stop: (e) => e.stopPropagation(),
	prevent: (e) => e.preventDefault(),
	self: (e) => e.target !== e.currentTarget,
	ctrl: (e) => !e.ctrlKey,
	shift: (e) => !e.shiftKey,
	alt: (e) => !e.altKey,
	meta: (e) => !e.metaKey,
	left: (e) => "button" in e && e.button !== 0,
	middle: (e) => "button" in e && e.button !== 1,
	right: (e) => "button" in e && e.button !== 2,
	exact: (e, t) => lo.some((n) => e[`${n}Key`] && !t.includes(n))
}, fo = (e, t) => {
	if (!e) return e;
	let n = e._withMods ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n, ...r) => {
		for (let e = 0; e < t.length; e++) {
			let r = uo[t[e]];
			if (r && r(n, t)) return;
		}
		return e(n, ...r);
	}));
}, po = {
	esc: "escape",
	space: " ",
	up: "arrow-up",
	left: "arrow-left",
	right: "arrow-right",
	down: "arrow-down",
	delete: "backspace"
}, mo = (e, t) => {
	let n = e._withKeys ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n) => {
		if (!("key" in n)) return;
		let r = re(n.key);
		if (t.some((e) => e === r || po[e] === r)) return e(n);
	}));
}, ho = /* @__PURE__ */ s({ patchProp: Ya }, ba), go;
function _o() {
	return go ||= fi(ho);
}
var vo = ((...e) => {
	let t = _o().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let r = bo(e);
		if (!r) return;
		let i = t._component;
		!h(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
		let a = n(r, !1, yo(r));
		return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), a;
	}, t;
});
function yo(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function bo(e) {
	return g(e) ? document.querySelector(e) : e;
}
//#endregion
//#region src/lib/highlights.js
var xo = /* @__PURE__ */ $t([]);
function So(e, t = "") {
	let n = [];
	for (let r of e) {
		if (n.length >= 300) break;
		let e = r.getBoundingClientRect();
		!e.width || !e.height || e.bottom < 0 || e.top > window.innerHeight || n.push({
			top: e.top,
			left: e.left,
			width: e.width,
			height: e.height,
			label: t && !n.length ? t : ""
		});
	}
	return xo.value = n, n.length;
}
function Co() {
	xo.value = [];
}
//#endregion
//#region src/components/Highlights.vue
var wo = {
	__name: "Highlights",
	setup(e) {
		return (e, t) => (L(!0), R(I, null, F(N(xo), (e, t) => (L(), R("div", {
			key: t,
			class: "outline-highlight bg-highlight/10 pointer-events-none fixed outline-2 -outline-offset-1",
			style: ue({
				top: `${e.top}px`,
				left: `${e.left}px`,
				width: `${e.width}px`,
				height: `${e.height}px`
			})
		}, [e.label ? (L(), R("span", {
			key: 0,
			class: k(["bg-highlight absolute left-[-2px] max-w-[min(100vw,40rem)] truncate rounded-sm px-1.5 py-0.5 font-mono text-[11px] leading-4 text-white", e.top < 20 ? "top-0" : "-top-5"])
		}, A(e.label), 3)) : U("", !0)], 4))), 128));
	}
}, To = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": 2,
	"stroke-linecap": "round",
	"stroke-linejoin": "round"
}, Eo = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim();
//#endregion
//#region node_modules/@lucide/vue/dist/esm/shared/src/build/buildLucideIconNode.mjs
function Do(e) {
	return e != null;
}
function Oo(e, t = {}) {
	let n = t.attributeNames ?? {}, r = (e) => n[e] ?? e, i = e.size ?? e.width ?? To.width, a = e.size ?? e.height ?? To.height, o = e.aliases?.filter((e) => typeof e == "string" && e.trim() !== "").map((e) => `lucide-${e}`) ?? [], s = [...e.name ? [`lucide-${e.name}`] : [], ...o], c = t.className?.split(" ").filter(Boolean) ?? [], l = t.includeDefaultClasses === !1 ? Eo(...c) : Eo("lucide", ...s, ...c), u = t.absoluteStrokeWidth ? Number(t.strokeWidth ?? To["stroke-width"]) * Number(e.size ?? e.width ?? To.width) / Number(t.size ?? t.width ?? To.width) : t.strokeWidth ?? To["stroke-width"];
	return [
		"svg",
		{
			...Object.entries(To).reduce((e, [t, n]) => (e[r(t)] = n, e), {}),
			..."color" in t && t.color && { [r("stroke")]: t.color },
			..."size" in t && Do(t.size) && {
				[r("width")]: t.size,
				[r("height")]: t.size
			},
			..."width" in t && Do(t.width) && { [r("width")]: t.width },
			..."height" in t && Do(t.height) && { [r("height")]: t.height },
			[r("stroke-width")]: u,
			...l && { [r("class")]: l },
			[r("viewBox")]: `0 0 ${i} ${a}`,
			...t.hasA11yProp === !1 ? { [r("aria-hidden")]: "true" } : {},
			..."attributes" in t && t.attributes
		},
		e.node.map((e) => {
			let [n, i, a] = e, o = t.nonScalingStroke ? {
				[r("vector-effect")]: "non-scaling-stroke",
				...i
			} : i;
			return a ? [
				n,
				o,
				a
			] : [n, o];
		})
	];
}
//#endregion
//#region node_modules/@lucide/vue/dist/esm/shared/src/utils/hasA11yProp.mjs
var ko = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, Ao = (e) => e === "", jo = (e) => e?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Mo = /* @__PURE__ */ Symbol("lucide-icons");
function No() {
	return Jn(Mo, {});
}
//#endregion
//#region node_modules/@lucide/vue/dist/esm/Icon.mjs
var Po = ({ name: e, iconNode: t, "icon-node": n, icon: r = {
	name: e && jo(e),
	node: t ?? n ?? [],
	size: 24,
	aliases: []
}, absoluteStrokeWidth: i, "absolute-stroke-width": a, nonScalingStroke: o, "non-scaling-stroke": s, strokeWidth: c, "stroke-width": l, size: u, width: d = u, height: f = u, color: p, ...m }, { slots: h }) => {
	let { size: g, color: _, strokeWidth: v = 2, absoluteStrokeWidth: y = !1, nonScalingStroke: b = !1, class: x = "" } = No(), S = Ao(i) || Ao(a) || i === !0 || a === !0 || y === !0, C = Ao(o) || Ao(s) || o === !0 || s === !0 || b === !0;
	delete m.class;
	let w = h.default?.(), [, T, ee = []] = Oo(r, {
		color: p ?? _,
		width: d ?? u ?? g,
		height: f ?? u ?? g,
		strokeWidth: c ?? l ?? v,
		absoluteStrokeWidth: S,
		nonScalingStroke: C,
		className: x,
		hasA11yProp: w != null && w.length > 0 || ko(m),
		attributes: m
	});
	return da("svg", T, [...ee.map(([e, t]) => da(e, t)), ...w ?? []]);
};
//#endregion
//#region node_modules/@lucide/vue/dist/esm/createLucideIcon.mjs
function G(e, t = []) {
	let n = typeof e == "string" ? {
		name: e,
		node: t
	} : e;
	return (e, { slots: t }) => da(Po, {
		...e,
		icon: n
	}, t.default ? { default: t.default } : void 0);
}
var Fo = G({
	name: "activity",
	size: 24,
	node: [["path", {
		d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
		key: "169zse"
	}]]
}), Io = G({
	name: "braces",
	size: 24,
	node: [["path", {
		d: "M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1",
		key: "ezmyqa"
	}], ["path", {
		d: "M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1",
		key: "e1hn23"
	}]],
	aliases: ["curly-braces"]
}), Lo = G({
	name: "bug",
	size: 24,
	node: [
		["path", {
			d: "M12 20v-9",
			key: "1qisl0"
		}],
		["path", {
			d: "M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z",
			key: "uouzyp"
		}],
		["path", {
			d: "M14.12 3.88 16 2",
			key: "qol33r"
		}],
		["path", {
			d: "M21 21a4 4 0 0 0-3.81-4",
			key: "1b0z45"
		}],
		["path", {
			d: "M21 5a4 4 0 0 1-3.55 3.97",
			key: "5cxbf6"
		}],
		["path", {
			d: "M22 13h-4",
			key: "1jl80f"
		}],
		["path", {
			d: "M3 21a4 4 0 0 1 3.81-4",
			key: "1fjd4g"
		}],
		["path", {
			d: "M3 5a4 4 0 0 0 3.55 3.97",
			key: "1d7oge"
		}],
		["path", {
			d: "M6 13H2",
			key: "82j7cp"
		}],
		["path", {
			d: "m8 2 1.88 1.88",
			key: "fmnt4t"
		}],
		["path", {
			d: "M9 7.13V6a3 3 0 1 1 6 0v1.13",
			key: "1vgav8"
		}]
	]
}), Ro = G({
	name: "check",
	size: 24,
	node: [["path", {
		d: "M20 6 9 17l-5-5",
		key: "1gmf2c"
	}]]
}), zo = G({
	name: "chevron-down",
	size: 24,
	node: [["path", {
		d: "m6 9 6 6 6-6",
		key: "qrunsl"
	}]]
}), Bo = G({
	name: "chevron-right",
	size: 24,
	node: [["path", {
		d: "m9 18 6-6-6-6",
		key: "mthhwq"
	}]]
}), Vo = G({
	name: "circle-check",
	size: 24,
	node: [["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}], ["path", {
		d: "m16 9-5.5 5.5L8 12",
		key: "xofnsj"
	}]],
	aliases: ["check-circle-2"]
}), Ho = G({
	name: "circle-x",
	size: 24,
	node: [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "m15 9-6 6",
			key: "1uzhvr"
		}],
		["path", {
			d: "m9 9 6 6",
			key: "z0biqf"
		}]
	],
	aliases: ["x-circle"]
}), Uo = G({
	name: "circle",
	size: 24,
	node: [["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}]]
}), Wo = G({
	name: "clock",
	size: 24,
	node: [["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}], ["path", {
		d: "M12 6v6l4 2",
		key: "mmk7yg"
	}]]
}), Go = G({
	name: "code",
	size: 24,
	node: [["path", {
		d: "m16 18 6-6-6-6",
		key: "eg8j8"
	}], ["path", {
		d: "m8 6-6 6 6 6",
		key: "ppft3o"
	}]]
}), Ko = G({
	name: "copy",
	size: 24,
	node: [["rect", {
		width: "14",
		height: "14",
		x: "8",
		y: "8",
		rx: "2",
		ry: "2",
		key: "17jyea"
	}], ["path", {
		d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
		key: "zix9uf"
	}]]
}), qo = G({
	name: "crosshair",
	size: 24,
	node: [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["line", {
			x1: "22",
			x2: "18",
			y1: "12",
			y2: "12",
			key: "l9bcsi"
		}],
		["line", {
			x1: "6",
			x2: "2",
			y1: "12",
			y2: "12",
			key: "13hhkx"
		}],
		["line", {
			x1: "12",
			x2: "12",
			y1: "6",
			y2: "2",
			key: "10w3f3"
		}],
		["line", {
			x1: "12",
			x2: "12",
			y1: "22",
			y2: "18",
			key: "15g9kq"
		}]
	]
}), Jo = G({
	name: "database",
	size: 24,
	node: [
		["ellipse", {
			cx: "12",
			cy: "5",
			rx: "9",
			ry: "3",
			key: "msslwz"
		}],
		["path", {
			d: "M3 5V19A9 3 0 0 0 21 19V5",
			key: "1wlel7"
		}],
		["path", {
			d: "M3 12A9 3 0 0 0 21 12",
			key: "mv7ke4"
		}]
	]
}), Yo = G({
	name: "ellipsis",
	size: 24,
	node: [
		["circle", {
			cx: "12",
			cy: "12",
			r: "1",
			key: "41hilf"
		}],
		["circle", {
			cx: "19",
			cy: "12",
			r: "1",
			key: "1wjl8i"
		}],
		["circle", {
			cx: "5",
			cy: "12",
			r: "1",
			key: "1pcz8c"
		}]
	],
	aliases: ["more-horizontal"]
}), Xo = G({
	name: "external-link",
	size: 24,
	node: [
		["path", {
			d: "M15 3h6v6",
			key: "1q9fwt"
		}],
		["path", {
			d: "M10 14 21 3",
			key: "gplh6r"
		}],
		["path", {
			d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
			key: "a6xqqp"
		}]
	]
}), Zo = G({
	name: "eye",
	size: 24,
	node: [["path", {
		d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
		key: "1nclc0"
	}], ["circle", {
		cx: "12",
		cy: "12",
		r: "3",
		key: "1v7zrd"
	}]]
}), Qo = G({
	name: "grid-3x3",
	size: 24,
	node: [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M3 9h18",
			key: "1pudct"
		}],
		["path", {
			d: "M3 15h18",
			key: "5xshup"
		}],
		["path", {
			d: "M9 3v18",
			key: "fh3hqa"
		}],
		["path", {
			d: "M15 3v18",
			key: "14nvp0"
		}]
	],
	aliases: ["grid", "grid-3-x-3"]
}), $o = G({
	name: "image",
	size: 24,
	node: [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			ry: "2",
			key: "1m3agn"
		}],
		["circle", {
			cx: "9",
			cy: "9",
			r: "2",
			key: "af1f0g"
		}],
		["path", {
			d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",
			key: "1xmnt7"
		}]
	]
}), es = G({
	name: "images",
	size: 24,
	node: [
		["path", {
			d: "m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16",
			key: "9kzy35"
		}],
		["path", {
			d: "M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2",
			key: "1t0f0t"
		}],
		["circle", {
			cx: "13",
			cy: "7",
			r: "1",
			fill: "currentColor",
			key: "1obus6"
		}],
		["rect", {
			x: "8",
			y: "2",
			width: "14",
			height: "14",
			rx: "2",
			key: "1gvhby"
		}]
	]
}), ts = G({
	name: "info",
	size: 24,
	node: [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "M12 16v-4",
			key: "1dtifu"
		}],
		["path", {
			d: "M12 8h.01",
			key: "e9boi3"
		}]
	]
}), ns = G({
	name: "languages",
	size: 24,
	node: [
		["path", {
			d: "m5 8 6 6",
			key: "1wu5hv"
		}],
		["path", {
			d: "m4 14 6-6 2-3",
			key: "1k1g8d"
		}],
		["path", {
			d: "M2 5h12",
			key: "or177f"
		}],
		["path", {
			d: "M7 2h1",
			key: "1t2jsx"
		}],
		["path", {
			d: "m22 22-5-10-5 10",
			key: "don7ne"
		}],
		["path", {
			d: "M14 18h6",
			key: "1m8k6r"
		}]
	]
}), rs = G({
	name: "layers",
	size: 24,
	node: [
		["path", {
			d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
			key: "zw3jo"
		}],
		["path", {
			d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
			key: "1wduqc"
		}],
		["path", {
			d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
			key: "kqbvx6"
		}]
	],
	aliases: ["layers-3"]
}), is = G({
	name: "list-tree",
	size: 24,
	node: [
		["path", {
			d: "M8 5h13",
			key: "1pao27"
		}],
		["path", {
			d: "M13 12h8",
			key: "h98zly"
		}],
		["path", {
			d: "M13 19h8",
			key: "c3s6r1"
		}],
		["path", {
			d: "M3 10a2 2 0 0 0 2 2h3",
			key: "1npucw"
		}],
		["path", {
			d: "M3 5v12a2 2 0 0 0 2 2h3",
			key: "x1gjn2"
		}]
	]
}), as = G({
	name: "pause",
	size: 24,
	node: [["rect", {
		x: "14",
		y: "3",
		width: "5",
		height: "18",
		rx: "1",
		key: "kaeet6"
	}], ["rect", {
		x: "5",
		y: "3",
		width: "5",
		height: "18",
		rx: "1",
		key: "1wsw3u"
	}]]
}), os = G({
	name: "pencil",
	size: 24,
	node: [["path", {
		d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
		key: "1a8usu"
	}], ["path", {
		d: "m15 5 4 4",
		key: "1mk7zo"
	}]]
}), ss = G({
	name: "play",
	size: 24,
	node: [["path", {
		d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
		key: "10ikf1"
	}]]
}), cs = G({
	name: "plus",
	size: 24,
	node: [["path", {
		d: "M5 12h14",
		key: "1ays0h"
	}], ["path", {
		d: "M12 5v14",
		key: "s699le"
	}]]
}), ls = G({
	name: "refresh-cw",
	size: 24,
	node: [
		["path", {
			d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
			key: "v9h5vc"
		}],
		["path", {
			d: "M21 3v5h-5",
			key: "1q7to0"
		}],
		["path", {
			d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
			key: "3uifl3"
		}],
		["path", {
			d: "M8 16H3v5",
			key: "1cv678"
		}]
	]
}), us = G({
	name: "rotate-ccw",
	size: 24,
	node: [["path", {
		d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
		key: "1357e3"
	}], ["path", {
		d: "M3 3v5h5",
		key: "1xhq8a"
	}]]
}), ds = G({
	name: "search-check",
	size: 24,
	node: [
		["path", {
			d: "m8 11 2 2 4-4",
			key: "1sed1v"
		}],
		["circle", {
			cx: "11",
			cy: "11",
			r: "8",
			key: "4ej97u"
		}],
		["path", {
			d: "m21 21-4.3-4.3",
			key: "1qie3q"
		}]
	]
}), fs = G({
	name: "search",
	size: 24,
	node: [["path", {
		d: "m21 21-4.34-4.34",
		key: "14j7rj"
	}], ["circle", {
		cx: "11",
		cy: "11",
		r: "8",
		key: "4ej97u"
	}]]
}), ps = G({
	name: "swatch-book",
	size: 24,
	node: [
		["path", {
			d: "M11 17a4 4 0 0 1-8 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2Z",
			key: "1ldrpk"
		}],
		["path", {
			d: "M16.7 13H19a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7",
			key: "11i5po"
		}],
		["path", {
			d: "M 7 17h.01",
			key: "1euzgo"
		}],
		["path", {
			d: "m11 8 2.3-2.3a2.4 2.4 0 0 1 3.404.004L18.6 7.6a2.4 2.4 0 0 1 .026 3.434L9.9 19.8",
			key: "o2gii7"
		}]
	]
}), ms = G({
	name: "text-cursor-input",
	size: 24,
	node: [
		["path", {
			d: "M12 20h-1a2 2 0 0 1-2-2 2 2 0 0 1-2 2H6",
			key: "1528k5"
		}],
		["path", {
			d: "M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7",
			key: "13ksps"
		}],
		["path", {
			d: "M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1",
			key: "1n9rhb"
		}],
		["path", {
			d: "M6 4h1a2 2 0 0 1 2 2 2 2 0 0 1 2-2h1",
			key: "1mj8rg"
		}],
		["path", {
			d: "M9 6v12",
			key: "velyjx"
		}]
	]
}), hs = G({
	name: "trash",
	size: 24,
	node: [
		["path", {
			d: "M10 11v6",
			key: "nco0om"
		}],
		["path", {
			d: "M14 11v6",
			key: "outv1u"
		}],
		["path", {
			d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
			key: "miytrc"
		}],
		["path", {
			d: "M3 6h18",
			key: "d0wm0j"
		}],
		["path", {
			d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
			key: "e791ji"
		}]
	],
	aliases: ["trash-2"]
}), gs = G({
	name: "triangle-alert",
	size: 24,
	node: [
		["path", {
			d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
			key: "wmoenq"
		}],
		["path", {
			d: "M12 9v4",
			key: "juzpu7"
		}],
		["path", {
			d: "M12 17h.01",
			key: "p32p05"
		}]
	],
	aliases: ["alert-triangle"]
}), _s = G({
	name: "wrench",
	size: 24,
	node: [["path", {
		d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z",
		key: "1ngwbx"
	}]]
}), vs = G({
	name: "x",
	size: 24,
	node: [["path", {
		d: "M18 6 6 18",
		key: "1bl5f8"
	}], ["path", {
		d: "m6 6 12 12",
		key: "d8bk6v"
	}]]
}), ys = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
var bs = (e) => e !== void 0;
function xs(e) {
	return /* @__PURE__ */ Vt(/* @__PURE__ */ Qt(e) ? new Proxy({}, {
		get(t, n, r) {
			return N(Reflect.get(e.value, n, r));
		},
		set(t, n, r) {
			return /* @__PURE__ */ Qt(e.value[n]) && !/* @__PURE__ */ Qt(r) ? e.value[n].value = r : e.value[n] = r, !0;
		},
		deleteProperty(t, n) {
			return Reflect.deleteProperty(e.value, n);
		},
		has(t, n) {
			return Reflect.has(e.value, n);
		},
		ownKeys() {
			return Object.keys(e.value);
		},
		getOwnPropertyDescriptor() {
			return {
				enumerable: !0,
				configurable: !0
			};
		}
	}) : e);
}
function Ss(e) {
	return xs(W(e));
}
function Cs(e, ...t) {
	let n = t.flat(), r = n[0];
	return Ss(() => Object.fromEntries(typeof r == "function" ? Object.entries(/* @__PURE__ */ ln(e)).filter(([e, t]) => !r(rn(t), e)) : Object.entries(/* @__PURE__ */ ln(e)).filter((e) => !n.includes(e[0]))));
}
ys && window.document, ys && window.navigator, ys && window.location;
function ws(e) {
	return JSON.parse(JSON.stringify(e));
}
/* @__NO_SIDE_EFFECTS__ */
function Ts(e, t, n, r = {}) {
	var i, a;
	let { clone: o = !1, passive: s = !1, eventName: c, deep: l = !1, defaultValue: u, shouldEmit: d } = r, f = Yi(), p = n || f?.emit || (f == null || (i = f.$emit) == null ? void 0 : i.bind(f)) || (f == null || (a = f.proxy) == null || (a = a.$emit) == null ? void 0 : a.bind(f?.proxy)), m = c;
	t ||= "modelValue", m ||= `update:${t.toString()}`;
	let h = (e) => o ? typeof o == "function" ? o(e) : ws(e) : e, g = () => bs(e[t]) ? h(e[t]) : u, _ = (e) => {
		d ? d(e) && p(m, e) : p(m, e);
	};
	if (s) {
		let n = /* @__PURE__ */ M(g()), r = !1;
		return Qn(() => e[t], (e) => {
			r || (r = !0, n.value = h(e), Nn(() => r = !1));
		}), Qn(n, (n) => {
			!r && (n !== e[t] || l) && _(n);
		}, { deep: l }), n;
	}
	return W({
		get() {
			return g();
		},
		set(e) {
			_(e);
		}
	});
}
//#endregion
//#region node_modules/reka-ui/dist/shared/createContext.js
function Es(e, t) {
	let n = typeof e == "string" && !t ? `${e}Context` : t, r = Symbol(n);
	return [(t) => {
		let n = Jn(r, t);
		if (n || n === null) return n;
		throw Error(`Injection \`${r.toString()}\` not found. Component must be used within ${Array.isArray(e) ? `one of the following components: ${e.join(", ")}` : `\`${e}\``}`);
	}, (e) => (qn(r, e), e)];
}
//#endregion
//#region node_modules/@vueuse/shared/dist/index.js
var Ds = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
var Os = (e) => e !== void 0;
Ds && window.document, Ds && window.navigator, Ds && window.location;
function ks(e) {
	let t = rn(e);
	return t?.$el ?? t;
}
function As(e) {
	return JSON.parse(JSON.stringify(e));
}
function js(e, t, n, r = {}) {
	var i, a;
	let { clone: o = !1, passive: s = !1, eventName: c, deep: l = !1, defaultValue: u, shouldEmit: d } = r, f = Yi(), p = n || f?.emit || (f == null || (i = f.$emit) == null ? void 0 : i.bind(f)) || (f == null || (a = f.proxy) == null || (a = a.$emit) == null ? void 0 : a.bind(f?.proxy)), m = c;
	t ||= "modelValue", m ||= `update:${t.toString()}`;
	let h = (e) => o ? typeof o == "function" ? o(e) : As(e) : e, g = () => Os(e[t]) ? h(e[t]) : u, _ = (e) => {
		d ? d(e) && p(m, e) : p(m, e);
	};
	if (s) {
		let n = /* @__PURE__ */ M(g()), r = !1;
		return Qn(() => e[t], (e) => {
			r || (r = !0, n.value = h(e), Nn(() => r = !1));
		}), Qn(n, (n) => {
			!r && (n !== e[t] || l) && _(n);
		}, { deep: l }), n;
	}
	return W({
		get() {
			return g();
		},
		set(e) {
			_(e);
		}
	});
}
//#endregion
//#region node_modules/reka-ui/dist/shared/renderSlotFragments.js
function Ms(e) {
	return e ? e.flatMap((e) => e.type === I ? Ms(e.children) : [e]) : [];
}
//#endregion
//#region node_modules/reka-ui/dist/shared/useEmitAsProps.js
function Ns(e) {
	let t = Yi(), n = t?.type.emits, r = {};
	return n?.length || console.warn(`No emitted event found. Please check component: ${t?.type.__name}`), n?.forEach((t) => {
		r[ae(E(t))] = (...n) => e(t, ...n);
	}), r;
}
//#endregion
//#region node_modules/reka-ui/dist/shared/useFormControl.js
function Ps(e) {
	return W(() => !rn(e) || !!ks(e)?.closest("form"));
}
//#endregion
//#region node_modules/reka-ui/dist/shared/useForwardExpose.js
function Fs() {
	let e = Yi(), t = /* @__PURE__ */ M(), n = W(() => r());
	_r(() => {
		n.value !== r() && nn(t);
	});
	function r() {
		return t.value && "$el" in t.value && ["#text", "#comment"].includes(t.value.$el.nodeName) ? t.value.$el.nextElementSibling : ks(t);
	}
	let i = Object.assign({}, e.exposed), a = {};
	for (let t in e.props) Object.defineProperty(a, t, {
		enumerable: !0,
		configurable: !0,
		get: () => e.props[t]
	});
	if (Object.keys(i).length > 0) for (let e in i) Object.defineProperty(a, e, {
		enumerable: !0,
		configurable: !0,
		get: () => i[e]
	});
	Object.defineProperty(a, "$el", {
		enumerable: !0,
		configurable: !0,
		get: () => e.vnode.el
	}), e.exposed = a;
	function o(n) {
		if (t.value = n, n && (Object.defineProperty(a, "$el", {
			enumerable: !0,
			configurable: !0,
			get: () => n instanceof Element ? n : n.$el
		}), !(n instanceof Element) && !Object.hasOwn(n, "$el"))) {
			let t = n.$.exposed, r = Object.assign({}, a);
			for (let e in t) Object.defineProperty(r, e, {
				enumerable: !0,
				configurable: !0,
				get: () => t[e]
			});
			e.exposed = r;
		}
	}
	return {
		forwardRef: o,
		currentRef: t,
		currentElement: n
	};
}
//#endregion
//#region node_modules/reka-ui/dist/shared/useForwardProps.js
function Is(e) {
	let t = Yi(), n = Object.keys(t?.type.props ?? {}).reduce((e, n) => {
		let r = (t?.type.props[n]).default;
		return r !== void 0 && (e[n] = r), e;
	}, {}), r = /* @__PURE__ */ fn(e);
	return W(() => {
		let e = {}, i = t?.vnode.props ?? {};
		return Object.keys(i).forEach((t) => {
			e[E(t)] = i[t];
		}), Object.keys({
			...n,
			...e
		}).reduce((e, t) => (r.value[t] !== void 0 && (e[t] = r.value[t]), e), {});
	});
}
//#endregion
//#region node_modules/reka-ui/dist/shared/useForwardPropsEmits.js
function Ls(e, t) {
	let n = Is(e), r = t ? Ns(t) : {};
	return W(() => ({
		...n.value,
		...r
	}));
}
//#endregion
//#region node_modules/reka-ui/dist/shared/useForwardScopeId.js
function Rs() {
	let e = Yi()?.vnode?.scopeId;
	return e ? { [e]: "" } : {};
}
//#endregion
//#region node_modules/reka-ui/dist/Primitive/Slot.js
var zs = /*#__PURE__*/ or({
	name: "PrimitiveSlot",
	inheritAttrs: !1,
	setup(e, { attrs: t, slots: n }) {
		return () => {
			if (!n.default) return null;
			let e = Ms(n.default()), r = e.findIndex((e) => e.type !== Ti);
			if (r === -1) return e;
			let i = e[r];
			delete i.props?.ref;
			let a = i.props ? Ui(t, i.props) : t, o = zi({
				...i,
				props: {}
			}, a);
			return e.length === 1 ? o : (e[r] = o, e);
		};
	}
}), Bs = [
	"area",
	"img",
	"input"
], Vs = /*#__PURE__*/ or({
	name: "Primitive",
	inheritAttrs: !1,
	props: {
		asChild: {
			type: Boolean,
			default: !1
		},
		as: {
			type: [String, Object],
			default: "div"
		}
	},
	setup(e, { attrs: t, slots: n }) {
		let r = e.asChild ? "template" : e.as;
		return typeof r == "string" && Bs.includes(r) ? () => da(r, t) : r === "template" ? () => da(zs, t, { default: n.default }) : () => da(e.as, t, { default: n.default });
	}
});
//#endregion
//#region node_modules/reka-ui/dist/Primitive/usePrimitiveElement.js
function Hs() {
	let e = /* @__PURE__ */ M();
	return {
		primitiveElement: e,
		currentElement: W(() => ["#text", "#comment"].includes(e.value?.$el.nodeName) ? e.value?.$el.nextElementSibling : ks(e))
	};
}
//#endregion
//#region node_modules/reka-ui/dist/VisuallyHidden/VisuallyHidden.js
var Us = /* @__PURE__ */ or({
	__name: "VisuallyHidden",
	props: {
		feature: {
			type: String,
			required: !1,
			default: "focusable"
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "span"
		}
	},
	setup(e) {
		return (e, t) => (L(), z(N(Vs), {
			as: e.as,
			"as-child": e.asChild,
			"aria-hidden": e.feature === "focusable" || e.feature === "fully-hidden" ? "true" : void 0,
			"data-hidden": e.feature === "fully-hidden" ? "" : void 0,
			tabindex: e.feature === "fully-hidden" ? "-1" : void 0,
			style: {
				position: "absolute",
				border: 0,
				width: "1px",
				height: "1px",
				padding: 0,
				margin: "-1px",
				overflow: "hidden",
				clip: "rect(0, 0, 0, 0)",
				clipPath: "inset(50%)",
				whiteSpace: "nowrap",
				wordWrap: "normal",
				top: "-1px",
				left: "-1px"
			}
		}, {
			default: P(() => [Er(e.$slots, "default")]),
			_: 3
		}, 8, [
			"as",
			"as-child",
			"aria-hidden",
			"data-hidden",
			"tabindex"
		]));
	}
}), Ws = /* @__PURE__ */ or({
	inheritAttrs: !1,
	__name: "VisuallyHiddenInputBubble",
	props: {
		name: {
			type: String,
			required: !0
		},
		value: {
			type: null,
			required: !0
		},
		checked: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		required: {
			type: Boolean,
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		feature: {
			type: String,
			required: !1,
			default: "fully-hidden"
		}
	},
	setup(e) {
		let t = e, { primitiveElement: n, currentElement: r } = Hs();
		return Qn(W(() => t.checked ?? t.value), (e, t) => {
			if (!r.value) return;
			let n = r.value, i = window.HTMLInputElement.prototype, a = Object.getOwnPropertyDescriptor(i, "value").set;
			if (a && e !== t) {
				let t = new Event("input", { bubbles: !0 }), r = new Event("change", { bubbles: !0 });
				a.call(n, e), n.dispatchEvent(t), n.dispatchEvent(r);
			}
		}), (e, r) => (L(), z(Us, Ui({
			ref_key: "primitiveElement",
			ref: n
		}, {
			...t,
			...e.$attrs
		}, { as: "input" }), null, 16));
	}
}), Gs = /* @__PURE__ */ or({
	inheritAttrs: !1,
	__name: "VisuallyHiddenInput",
	props: {
		name: {
			type: String,
			required: !0
		},
		value: {
			type: null,
			required: !0
		},
		checked: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		required: {
			type: Boolean,
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		feature: {
			type: String,
			required: !1,
			default: "fully-hidden"
		}
	},
	setup(e) {
		let t = e, n = W(() => typeof t.value == "object" && Array.isArray(t.value) && t.value.length === 0 && t.required), r = W(() => typeof t.value == "string" || typeof t.value == "number" || typeof t.value == "boolean" || t.value === null || t.value === void 0 ? [{
			name: t.name,
			value: t.value
		}] : typeof t.value == "object" && Array.isArray(t.value) ? t.value.flatMap((e, n) => typeof e == "object" ? Object.entries(e).map(([e, r]) => ({
			name: `${t.name}[${n}][${e}]`,
			value: r
		})) : {
			name: `${t.name}[${n}]`,
			value: e
		}) : t.value !== null && typeof t.value == "object" && !Array.isArray(t.value) ? Object.entries(t.value).map(([e, n]) => ({
			name: `${t.name}[${e}]`,
			value: n
		})) : []);
		return (e, i) => (L(), R(I, null, [U(" We render single input if it's required "), n.value ? (L(), z(Ws, Ui({ key: e.name }, {
			...t,
			...e.$attrs
		}, {
			name: e.name,
			value: e.value
		}), null, 16, ["name", "value"])) : (L(!0), R(I, { key: 1 }, F(r.value, (n) => (L(), z(Ws, Ui({ key: n.name }, { ref_for: !0 }, {
			...t,
			...e.$attrs
		}, {
			name: n.name,
			value: n.value
		}), null, 16, ["name", "value"]))), 128))], 2112));
	}
}), Ks = /* @__PURE__ */ or({
	__name: "BaseSeparator",
	props: {
		orientation: {
			type: String,
			required: !1,
			default: "horizontal"
		},
		decorative: {
			type: Boolean,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		}
	},
	setup(e) {
		let t = e, n = ["horizontal", "vertical"];
		function r(e) {
			return n.includes(e);
		}
		let i = W(() => r(t.orientation) ? t.orientation : "horizontal"), a = W(() => i.value === "vertical" ? t.orientation : void 0), o = W(() => t.decorative ? { role: "none" } : {
			"aria-orientation": a.value,
			role: "separator"
		});
		return (e, t) => (L(), z(N(Vs), Ui({
			as: e.as,
			"as-child": e.asChild,
			"data-orientation": i.value
		}, o.value), {
			default: P(() => [Er(e.$slots, "default")]),
			_: 3
		}, 16, [
			"as",
			"as-child",
			"data-orientation"
		]));
	}
}), qs = /* @__PURE__ */ or({
	__name: "Separator",
	props: {
		orientation: {
			type: String,
			required: !1,
			default: "horizontal"
		},
		decorative: {
			type: Boolean,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		}
	},
	setup(e) {
		let t = e;
		return (e, n) => (L(), z(Ks, he(Ri(t)), {
			default: P(() => [Er(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), [Js, Ys] = /*#__PURE__*/ Es("SwitchRoot"), Xs = /* @__PURE__ */ or({
	inheritAttrs: !1,
	__name: "SwitchRoot",
	props: {
		defaultValue: {
			type: null,
			required: !1
		},
		modelValue: {
			type: null,
			required: !1,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		id: {
			type: String,
			required: !1
		},
		value: {
			type: String,
			required: !1,
			default: "on"
		},
		trueValue: {
			type: null,
			required: !1,
			default: () => !0
		},
		falseValue: {
			type: null,
			required: !1,
			default: () => !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "button"
		},
		name: {
			type: String,
			required: !1
		},
		required: {
			type: Boolean,
			required: !1
		}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = e, r = t, { disabled: i } = /* @__PURE__ */ ln(n), a = js(n, "modelValue", r, {
			defaultValue: n.defaultValue ?? n.falseValue,
			passive: n.modelValue === void 0
		}), o = W(() => a.value === n.trueValue);
		function s() {
			i.value || (a.value = o.value ? n.falseValue : n.trueValue);
		}
		let { forwardRef: c, currentElement: l } = Fs(), u = Ps(l), d = Rs(), f = W(() => n.id && l.value ? document.querySelector(`[for="${n.id}"]`)?.innerText : void 0);
		return Ys({
			checked: o,
			toggleCheck: s,
			disabled: i
		}), (e, t) => (L(), R(I, null, [V(N(Vs), Ui({
			id: e.id,
			ref: N(c),
			role: "switch",
			type: e.as === "button" ? "button" : void 0,
			value: e.value,
			"aria-label": e.$attrs["aria-label"] || f.value,
			"aria-checked": o.value,
			"aria-required": e.required,
			"data-state": o.value ? "checked" : "unchecked",
			"data-disabled": N(i) ? "" : void 0,
			"as-child": e.asChild,
			as: e.as,
			disabled: N(i)
		}, {
			...N(d),
			...e.$attrs
		}, {
			onClick: s,
			onKeydown: mo(fo(s, ["prevent"]), ["enter"])
		}), {
			default: P(() => [Er(e.$slots, "default", {
				modelValue: N(a),
				checked: o.value
			})]),
			_: 3
		}, 16, [
			"id",
			"type",
			"value",
			"aria-label",
			"aria-checked",
			"aria-required",
			"data-state",
			"data-disabled",
			"as-child",
			"as",
			"disabled",
			"onKeydown"
		]), N(u) && e.name ? (L(), z(N(Gs), Ui({
			key: 0,
			type: "checkbox",
			name: e.name,
			disabled: N(i),
			required: e.required,
			value: e.value,
			checked: o.value
		}, N(d)), null, 16, [
			"name",
			"disabled",
			"required",
			"value",
			"checked"
		])) : U("v-if", !0)], 64));
	}
}), Zs = /* @__PURE__ */ or({
	__name: "SwitchThumb",
	props: {
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "span"
		}
	},
	setup(e) {
		let t = Js();
		return Fs(), (e, n) => (L(), z(N(Vs), {
			"data-state": N(t).checked.value ? "checked" : "unchecked",
			"data-disabled": N(t).disabled.value ? "" : void 0,
			"as-child": e.asChild,
			as: e.as
		}, {
			default: P(() => [Er(e.$slots, "default")]),
			_: 3
		}, 8, [
			"data-state",
			"data-disabled",
			"as-child",
			"as"
		]));
	}
}), [Qs, $s] = /*#__PURE__*/ Es("ToggleGroupRoot"), ec = /* @__PURE__ */ or({
	inheritAttrs: !1,
	__name: "Toggle",
	props: {
		defaultValue: {
			type: Boolean,
			required: !1
		},
		modelValue: {
			type: [Boolean, null],
			required: !1,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: !1,
			default: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "button"
		},
		name: {
			type: String,
			required: !1
		},
		required: {
			type: Boolean,
			required: !1
		}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = e, r = t, { forwardRef: i, currentElement: a } = Fs(), o = Rs(), s = Qs(null), c = js(n, "modelValue", r, {
			defaultValue: n.defaultValue,
			passive: n.modelValue === void 0
		});
		function l() {
			c.value = !c.value;
		}
		let u = W(() => c.value ? "on" : "off"), d = Ps(a);
		return (e, t) => (L(), R(I, null, [V(N(Vs), Ui({
			ref: N(i),
			type: e.as === "button" ? "button" : void 0,
			"as-child": n.asChild,
			as: e.as,
			"aria-pressed": N(c),
			"data-state": u.value,
			"data-disabled": e.disabled ? "" : void 0,
			disabled: e.disabled
		}, {
			...N(o),
			...e.$attrs
		}, { onClick: l }), {
			default: P(() => [Er(e.$slots, "default", {
				modelValue: N(c),
				disabled: e.disabled,
				pressed: N(c),
				state: u.value
			})]),
			_: 3
		}, 16, [
			"type",
			"as-child",
			"as",
			"aria-pressed",
			"data-state",
			"data-disabled",
			"disabled"
		]), N(d) && e.name && !N(s) ? (L(), z(Gs, Ui({
			key: 0,
			type: "checkbox",
			name: e.name,
			value: N(c),
			required: e.required
		}, N(o)), null, 16, [
			"name",
			"value",
			"required"
		])) : U("v-if", !0)], 64));
	}
});
//#endregion
//#region node_modules/clsx/dist/clsx.mjs
function tc(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = tc(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function nc() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = tc(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region node_modules/tailwind-merge/dist/bundle-mjs.mjs
var rc = (e, t) => {
	let n = Array(e.length + t.length);
	for (let t = 0; t < e.length; t++) n[t] = e[t];
	for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
	return n;
}, ic = (e, t) => ({
	classGroupId: e,
	validator: t
}), ac = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
	nextPart: e,
	validators: t,
	classGroupId: n
}), oc = "-", sc = [], cc = "arbitrary..", lc = (e) => {
	let t = fc(e), { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
	return {
		getClassGroupId: (e) => {
			if (e.startsWith("[") && e.endsWith("]")) return dc(e);
			let n = e.split(oc);
			return uc(n, +(n[0] === "" && n.length > 1), t);
		},
		getConflictingClassGroupIds: (e, t) => {
			if (t) {
				let t = r[e], i = n[e];
				return t ? i ? rc(i, t) : t : i || sc;
			}
			return n[e] || sc;
		}
	};
}, uc = (e, t, n) => {
	if (e.length - t === 0) return n.classGroupId;
	let r = e[t], i = n.nextPart.get(r);
	if (i) {
		let n = uc(e, t + 1, i);
		if (n) return n;
	}
	let a = n.validators;
	if (a === null) return;
	let o = t === 0 ? e.join(oc) : e.slice(t).join(oc), s = a.length;
	for (let e = 0; e < s; e++) {
		let t = a[e];
		if (t.validator(o)) return t.classGroupId;
	}
}, dc = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
	let t = e.slice(1, -1), n = t.indexOf(":"), r = t.slice(0, n);
	return r ? cc + r : void 0;
})(), fc = (e) => {
	let { theme: t, classGroups: n } = e;
	return pc(n, t);
}, pc = (e, t) => {
	let n = ac();
	for (let r in e) {
		let i = e[r];
		mc(i, n, r, t);
	}
	return n;
}, mc = (e, t, n, r) => {
	let i = e.length;
	for (let a = 0; a < i; a++) {
		let i = e[a];
		hc(i, t, n, r);
	}
}, hc = (e, t, n, r) => {
	if (typeof e == "string") {
		gc(e, t, n);
		return;
	}
	if (typeof e == "function") {
		_c(e, t, n, r);
		return;
	}
	vc(e, t, n, r);
}, gc = (e, t, n) => {
	let r = e === "" ? t : yc(t, e);
	r.classGroupId = n;
}, _c = (e, t, n, r) => {
	if (bc(e)) {
		mc(e(r), t, n, r);
		return;
	}
	t.validators === null && (t.validators = []), t.validators.push(ic(n, e));
}, vc = (e, t, n, r) => {
	let i = Object.entries(e), a = i.length;
	for (let e = 0; e < a; e++) {
		let [a, o] = i[e];
		mc(o, yc(t, a), n, r);
	}
}, yc = (e, t) => {
	let n = e, r = t.split(oc), i = r.length;
	for (let e = 0; e < i; e++) {
		let t = r[e], i = n.nextPart.get(t);
		i || (i = ac(), n.nextPart.set(t, i)), n = i;
	}
	return n;
}, bc = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, xc = (e) => {
	if (e < 1) return {
		get: () => void 0,
		set: () => {}
	};
	let t = 0, n = Object.create(null), r = Object.create(null), i = (i, a) => {
		n[i] = a, t++, t > e && (t = 0, r = n, n = Object.create(null));
	};
	return {
		get(e) {
			let t = n[e];
			if (t !== void 0) return t;
			if ((t = r[e]) !== void 0) return i(e, t), t;
		},
		set(e, t) {
			e in n ? n[e] = t : i(e, t);
		}
	};
}, Sc = "!", Cc = ":", wc = [], Tc = (e, t, n, r, i) => ({
	modifiers: e,
	hasImportantModifier: t,
	baseClassName: n,
	maybePostfixModifierPosition: r,
	isExternal: i
}), Ec = (e) => {
	let { prefix: t, experimentalParseClassName: n } = e, r = (e) => {
		let t = [], n = 0, r = 0, i = 0, a, o = e.length;
		for (let s = 0; s < o; s++) {
			let o = e[s];
			if (n === 0 && r === 0) {
				if (o === Cc) {
					t.push(e.slice(i, s)), i = s + 1;
					continue;
				}
				if (o === "/") {
					a = s;
					continue;
				}
			}
			o === "[" ? n++ : o === "]" ? n-- : o === "(" ? r++ : o === ")" && r--;
		}
		let s = t.length === 0 ? e : e.slice(i), c = s, l = !1;
		s.endsWith(Sc) ? (c = s.slice(0, -1), l = !0) : s.startsWith(Sc) && (c = s.slice(1), l = !0);
		let u = a && a > i ? a - i : void 0;
		return Tc(t, l, c, u);
	};
	if (t) {
		let e = t + Cc, n = r;
		r = (t) => t.startsWith(e) ? n(t.slice(e.length)) : Tc(wc, !1, t, void 0, !0);
	}
	if (n) {
		let e = r;
		r = (t) => n({
			className: t,
			parseClassName: e
		});
	}
	return r;
}, Dc = (e) => {
	let t = /* @__PURE__ */ new Map();
	return e.orderSensitiveModifiers.forEach((e, n) => {
		t.set(e, 1e6 + n);
	}), (e) => {
		let n = [], r = [];
		for (let i = 0; i < e.length; i++) {
			let a = e[i], o = a[0] === "[", s = t.has(a);
			o || s ? (r.length > 0 && (r.sort(), n.push(...r), r = []), n.push(a)) : r.push(a);
		}
		return r.length > 0 && (r.sort(), n.push(...r)), n;
	};
}, Oc = (e) => ({
	cache: xc(e.cacheSize),
	parseClassName: Ec(e),
	sortModifiers: Dc(e),
	postfixLookupClassGroupIds: kc(e),
	...lc(e)
}), kc = (e) => {
	let t = Object.create(null), n = e.postfixLookupClassGroups;
	if (n) for (let e = 0; e < n.length; e++) t[n[e]] = !0;
	return t;
}, Ac = /\s+/, jc = (e, t) => {
	let { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: i, sortModifiers: a, postfixLookupClassGroupIds: o } = t, s = [], c = e.trim().split(Ac), l = "";
	for (let e = c.length - 1; e >= 0; --e) {
		let t = c[e], { isExternal: u, modifiers: d, hasImportantModifier: f, baseClassName: p, maybePostfixModifierPosition: m } = n(t);
		if (u) {
			l = t + (l.length > 0 ? " " + l : l);
			continue;
		}
		let h = !!m, g;
		if (h) {
			g = r(p.substring(0, m));
			let e = g && o[g] ? r(p) : void 0;
			e && e !== g && (g = e, h = !1);
		} else g = r(p);
		if (!g) {
			if (!h) {
				l = t + (l.length > 0 ? " " + l : l);
				continue;
			}
			if (g = r(p), !g) {
				l = t + (l.length > 0 ? " " + l : l);
				continue;
			}
			h = !1;
		}
		let _ = d.length === 0 ? "" : d.length === 1 ? d[0] : a(d).join(":"), v = f ? _ + Sc : _, y = v + g;
		if (s.indexOf(y) > -1) continue;
		s.push(y);
		let b = i(g, h);
		for (let e = 0; e < b.length; ++e) {
			let t = b[e];
			s.push(v + t);
		}
		l = t + (l.length > 0 ? " " + l : l);
	}
	return l;
}, Mc = (...e) => {
	let t = 0, n, r, i = "";
	for (; t < e.length;) (n = e[t++]) && (r = Nc(n)) && (i && (i += " "), i += r);
	return i;
}, Nc = (e) => {
	if (typeof e == "string") return e;
	let t, n = "";
	for (let r = 0; r < e.length; r++) e[r] && (t = Nc(e[r])) && (n && (n += " "), n += t);
	return n;
}, Pc = (e, ...t) => {
	let n, r, i, a, o = (o) => (n = Oc(t.reduce((e, t) => t(e), e())), r = n.cache.get, i = n.cache.set, a = s, s(o)), s = (e) => {
		let t = r(e);
		if (t) return t;
		let a = jc(e, n);
		return i(e, a), a;
	};
	return a = o, (...e) => a(Mc(...e));
}, Fc = [], Ic = (e) => {
	let t = (t) => t[e] || Fc;
	return t.isThemeGetter = !0, t.themeKey = e, t;
}, Lc = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Rc = /^\((?:(\w[\w-]*):)?(.+)\)$/i, zc = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, Bc = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Vc = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Hc = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix|color|light-dark)\(.+\)$/, Uc = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Wc = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Gc = (e) => zc.test(e), K = (e) => !!e && !Number.isNaN(Number(e)), Kc = (e) => !!e && Number.isInteger(Number(e)), qc = (e) => e.endsWith("%") && K(e.slice(0, -1)), Jc = (e) => Bc.test(e), Yc = () => !0, Xc = (e) => Vc.test(e) && !Hc.test(e), Zc = () => !1, Qc = (e) => Uc.test(e), $c = (e) => Wc.test(e), el = (e) => !q(e) && !J(e), tl = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), nl = (e) => _l(e, xl, Zc), q = (e) => Lc.test(e), rl = (e) => _l(e, Sl, Xc), il = (e) => _l(e, Cl, K), al = (e) => _l(e, Tl, Yc), ol = (e) => _l(e, wl, Zc), sl = (e) => _l(e, yl, Zc), cl = (e) => _l(e, bl, $c), ll = (e) => _l(e, El, Qc), J = (e) => Rc.test(e), ul = (e) => vl(e, Sl), dl = (e) => vl(e, wl), fl = (e) => vl(e, yl), pl = (e) => vl(e, xl), ml = (e) => vl(e, bl), hl = (e) => vl(e, El, !0), gl = (e) => vl(e, Tl, !0), _l = (e, t, n) => {
	let r = Lc.exec(e);
	return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, vl = (e, t, n = !1) => {
	let r = Rc.exec(e);
	return r ? r[1] ? t(r[1]) : n : !1;
}, yl = (e) => e === "position" || e === "percentage", bl = (e) => e === "image" || e === "url", xl = (e) => e === "length" || e === "size" || e === "bg-size", Sl = (e) => e === "length", Cl = (e) => e === "number", wl = (e) => e === "family-name", Tl = (e) => e === "number" || e === "weight", El = (e) => e === "shadow", Dl = /*#__PURE__*/ Pc(() => {
	let e = Ic("color"), t = Ic("font"), n = Ic("text"), r = Ic("font-weight"), i = Ic("tracking"), a = Ic("leading"), o = Ic("breakpoint"), s = Ic("container"), c = Ic("spacing"), l = Ic("radius"), u = Ic("shadow"), d = Ic("inset-shadow"), f = Ic("text-shadow"), p = Ic("drop-shadow"), m = Ic("blur"), h = Ic("perspective"), g = Ic("aspect"), _ = Ic("ease"), v = Ic("animate"), y = () => [
		"auto",
		"avoid",
		"all",
		"avoid-page",
		"page",
		"left",
		"right",
		"column"
	], b = () => [
		"center",
		"top",
		"bottom",
		"left",
		"right",
		"top-left",
		"left-top",
		"top-right",
		"right-top",
		"bottom-right",
		"right-bottom",
		"bottom-left",
		"left-bottom"
	], x = () => [
		...b(),
		J,
		q
	], S = () => [
		"auto",
		"hidden",
		"clip",
		"visible",
		"scroll"
	], C = () => [
		"auto",
		"contain",
		"none"
	], w = () => [
		J,
		q,
		c
	], T = () => [
		Gc,
		"full",
		"auto",
		...w()
	], ee = () => [
		Kc,
		"none",
		"subgrid",
		J,
		q
	], te = () => [
		"auto",
		{ span: [
			"full",
			Kc,
			J,
			q
		] },
		Kc,
		J,
		q
	], E = () => [
		Kc,
		"auto",
		J,
		q
	], ne = () => [
		"auto",
		"min",
		"max",
		"fr",
		J,
		q
	], re = () => [
		"start",
		"end",
		"center",
		"between",
		"around",
		"evenly",
		"stretch",
		"baseline",
		"center-safe",
		"end-safe"
	], ie = () => [
		"start",
		"end",
		"center",
		"stretch",
		"center-safe",
		"end-safe"
	], ae = () => ["auto", ...w()], D = () => [
		Gc,
		"auto",
		"full",
		"dvw",
		"dvh",
		"lvw",
		"lvh",
		"svw",
		"svh",
		"min",
		"max",
		"fit",
		...w()
	], oe = () => [
		s,
		Gc,
		"screen",
		"full",
		"dvw",
		"lvw",
		"svw",
		"min",
		"max",
		"fit",
		...w()
	], se = () => [
		Gc,
		"screen",
		"full",
		"lh",
		"dvh",
		"lvh",
		"svh",
		"min",
		"max",
		"fit",
		...w()
	], O = () => [
		e,
		J,
		q
	], ce = () => [
		...b(),
		fl,
		sl,
		{ position: [J, q] }
	], le = () => ["no-repeat", { repeat: [
		"",
		"x",
		"y",
		"space",
		"round"
	] }], ue = () => [
		"auto",
		"cover",
		"contain",
		pl,
		nl,
		{ size: [J, q] }
	], de = () => [
		qc,
		ul,
		rl
	], fe = () => [
		"",
		"none",
		"full",
		l,
		J,
		q
	], pe = () => [
		"",
		K,
		ul,
		rl
	], me = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	], k = () => [
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity"
	], he = () => [
		K,
		qc,
		fl,
		sl
	], ge = () => [
		"",
		"none",
		m,
		J,
		q
	], _e = () => [
		"none",
		K,
		J,
		q
	], ve = () => [
		"none",
		K,
		J,
		q
	], ye = () => [
		K,
		J,
		q
	], be = () => [
		Gc,
		"full",
		...w()
	];
	return {
		cacheSize: 500,
		theme: {
			animate: [
				"spin",
				"ping",
				"pulse",
				"bounce"
			],
			aspect: ["video"],
			blur: [Jc],
			breakpoint: [Jc],
			color: [Yc],
			container: [Jc],
			"drop-shadow": [Jc],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [el],
			"font-weight": [
				"thin",
				"extralight",
				"light",
				"normal",
				"medium",
				"semibold",
				"bold",
				"extrabold",
				"black"
			],
			"inset-shadow": [Jc],
			leading: [
				"none",
				"tight",
				"snug",
				"normal",
				"relaxed",
				"loose"
			],
			perspective: [
				"dramatic",
				"near",
				"normal",
				"midrange",
				"distant",
				"none"
			],
			radius: [Jc],
			shadow: [Jc],
			spacing: ["px", K],
			text: [Jc],
			"text-shadow": [Jc],
			tracking: [
				"tighter",
				"tight",
				"normal",
				"wide",
				"wider",
				"widest"
			]
		},
		classGroups: {
			aspect: [{ aspect: [
				"auto",
				"square",
				Gc,
				q,
				J,
				g
			] }],
			container: ["container"],
			"container-type": [{ "@container": [
				"",
				"normal",
				"size",
				J,
				q
			] }],
			"container-named": [tl],
			columns: [{ columns: [
				K,
				"auto",
				q,
				J,
				s
			] }],
			"break-after": [{ "break-after": y() }],
			"break-before": [{ "break-before": y() }],
			"break-inside": [{ "break-inside": [
				"auto",
				"avoid",
				"avoid-page",
				"avoid-column"
			] }],
			"box-decoration": [{ "box-decoration": ["slice", "clone"] }],
			box: [{ box: ["border", "content"] }],
			display: [
				"block",
				"inline-block",
				"inline",
				"flex",
				"inline-flex",
				"table",
				"inline-table",
				"table-caption",
				"table-cell",
				"table-column",
				"table-column-group",
				"table-footer-group",
				"table-header-group",
				"table-row-group",
				"table-row",
				"flow-root",
				"grid",
				"inline-grid",
				"contents",
				"list-item",
				"hidden"
			],
			sr: ["sr-only", "not-sr-only"],
			float: [{ float: [
				"right",
				"left",
				"none",
				"start",
				"end"
			] }],
			clear: [{ clear: [
				"left",
				"right",
				"both",
				"none",
				"start",
				"end"
			] }],
			isolation: ["isolate", "isolation-auto"],
			"object-fit": [{ object: [
				"contain",
				"cover",
				"fill",
				"none",
				"scale-down"
			] }],
			"object-position": [{ object: x() }],
			overflow: [{ overflow: S() }],
			"overflow-x": [{ "overflow-x": S() }],
			"overflow-y": [{ "overflow-y": S() }],
			overscroll: [{ overscroll: C() }],
			"overscroll-x": [{ "overscroll-x": C() }],
			"overscroll-y": [{ "overscroll-y": C() }],
			position: [
				"static",
				"fixed",
				"absolute",
				"relative",
				"sticky"
			],
			inset: [{ inset: T() }],
			"inset-x": [{ "inset-x": T() }],
			"inset-y": [{ "inset-y": T() }],
			start: [{
				"inset-s": T(),
				start: T()
			}],
			end: [{
				"inset-e": T(),
				end: T()
			}],
			"inset-bs": [{ "inset-bs": T() }],
			"inset-be": [{ "inset-be": T() }],
			top: [{ top: T() }],
			right: [{ right: T() }],
			bottom: [{ bottom: T() }],
			left: [{ left: T() }],
			visibility: [
				"visible",
				"invisible",
				"collapse"
			],
			z: [{ z: [
				Kc,
				"auto",
				J,
				q
			] }],
			basis: [{ basis: [
				Gc,
				"full",
				"auto",
				s,
				...w()
			] }],
			"flex-direction": [{ flex: [
				"row",
				"row-reverse",
				"col",
				"col-reverse"
			] }],
			"flex-wrap": [{ flex: [
				"nowrap",
				"wrap",
				"wrap-reverse"
			] }],
			flex: [{ flex: [
				K,
				Gc,
				"auto",
				"initial",
				"none",
				q
			] }],
			grow: [{ grow: [
				"",
				K,
				J,
				q
			] }],
			shrink: [{ shrink: [
				"",
				K,
				J,
				q
			] }],
			order: [{ order: [
				Kc,
				"first",
				"last",
				"none",
				J,
				q
			] }],
			"grid-cols": [{ "grid-cols": ee() }],
			"col-start-end": [{ col: te() }],
			"col-start": [{ "col-start": E() }],
			"col-end": [{ "col-end": E() }],
			"grid-rows": [{ "grid-rows": ee() }],
			"row-start-end": [{ row: te() }],
			"row-start": [{ "row-start": E() }],
			"row-end": [{ "row-end": E() }],
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			"auto-cols": [{ "auto-cols": ne() }],
			"auto-rows": [{ "auto-rows": ne() }],
			gap: [{ gap: w() }],
			"gap-x": [{ "gap-x": w() }],
			"gap-y": [{ "gap-y": w() }],
			"justify-content": [{ justify: [...re(), "normal"] }],
			"justify-items": [{ "justify-items": [...ie(), "normal"] }],
			"justify-self": [{ "justify-self": ["auto", ...ie()] }],
			"align-content": [{ content: ["normal", ...re()] }],
			"align-items": [{ items: [...ie(), { baseline: ["", "last"] }] }],
			"align-self": [{ self: [
				"auto",
				...ie(),
				{ baseline: ["", "last"] }
			] }],
			"place-content": [{ "place-content": re() }],
			"place-items": [{ "place-items": [...ie(), "baseline"] }],
			"place-self": [{ "place-self": ["auto", ...ie()] }],
			p: [{ p: w() }],
			px: [{ px: w() }],
			py: [{ py: w() }],
			ps: [{ ps: w() }],
			pe: [{ pe: w() }],
			pbs: [{ pbs: w() }],
			pbe: [{ pbe: w() }],
			pt: [{ pt: w() }],
			pr: [{ pr: w() }],
			pb: [{ pb: w() }],
			pl: [{ pl: w() }],
			m: [{ m: ae() }],
			mx: [{ mx: ae() }],
			my: [{ my: ae() }],
			ms: [{ ms: ae() }],
			me: [{ me: ae() }],
			mbs: [{ mbs: ae() }],
			mbe: [{ mbe: ae() }],
			mt: [{ mt: ae() }],
			mr: [{ mr: ae() }],
			mb: [{ mb: ae() }],
			ml: [{ ml: ae() }],
			"space-x": [{ "space-x": w() }],
			"space-x-reverse": ["space-x-reverse"],
			"space-y": [{ "space-y": w() }],
			"space-y-reverse": ["space-y-reverse"],
			size: [{ size: D() }],
			"inline-size": [{ inline: ["auto", ...oe()] }],
			"min-inline-size": [{ "min-inline": ["auto", ...oe()] }],
			"max-inline-size": [{ "max-inline": ["none", ...oe()] }],
			"block-size": [{ block: ["auto", ...se()] }],
			"min-block-size": [{ "min-block": ["auto", ...se()] }],
			"max-block-size": [{ "max-block": ["none", ...se()] }],
			w: [{ w: [
				s,
				"screen",
				...D()
			] }],
			"min-w": [{ "min-w": [
				s,
				"screen",
				"none",
				...D()
			] }],
			"max-w": [{ "max-w": [
				s,
				"screen",
				"none",
				"prose",
				{ screen: [o] },
				...D()
			] }],
			h: [{ h: [
				"screen",
				"lh",
				...D()
			] }],
			"min-h": [{ "min-h": [
				"screen",
				"lh",
				"none",
				...D()
			] }],
			"max-h": [{ "max-h": [
				"screen",
				"lh",
				"none",
				...D()
			] }],
			"font-size": [{ text: [
				"base",
				n,
				ul,
				rl
			] }],
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			"font-style": ["italic", "not-italic"],
			"font-weight": [{ font: [
				r,
				gl,
				al
			] }],
			"font-stretch": [{ "font-stretch": [
				"ultra-condensed",
				"extra-condensed",
				"condensed",
				"semi-condensed",
				"normal",
				"semi-expanded",
				"expanded",
				"extra-expanded",
				"ultra-expanded",
				qc,
				q
			] }],
			"font-family": [{ font: [
				dl,
				ol,
				t
			] }],
			"font-features": [{ "font-features": [q] }],
			"fvn-normal": ["normal-nums"],
			"fvn-ordinal": ["ordinal"],
			"fvn-slashed-zero": ["slashed-zero"],
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			tracking: [{ tracking: [
				i,
				J,
				q
			] }],
			"line-clamp": [{ "line-clamp": [
				K,
				"none",
				J,
				il
			] }],
			leading: [{ leading: [
				"none",
				a,
				...w()
			] }],
			"list-image": [{ "list-image": [
				"none",
				J,
				q
			] }],
			"list-style-position": [{ list: ["inside", "outside"] }],
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				J,
				q
			] }],
			"text-alignment": [{ text: [
				"left",
				"center",
				"right",
				"justify",
				"start",
				"end"
			] }],
			"placeholder-color": [{ placeholder: O() }],
			"text-color": [{ text: O() }],
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			"text-decoration-style": [{ decoration: [...me(), "wavy"] }],
			"text-decoration-thickness": [{ decoration: [
				K,
				"from-font",
				"auto",
				J,
				rl
			] }],
			"text-decoration-color": [{ decoration: O() }],
			"underline-offset": [{ "underline-offset": [
				K,
				"auto",
				J,
				q
			] }],
			"text-transform": [
				"uppercase",
				"lowercase",
				"capitalize",
				"normal-case"
			],
			"text-overflow": [
				"truncate",
				"text-ellipsis",
				"text-clip"
			],
			"text-wrap": [{ text: [
				"wrap",
				"nowrap",
				"balance",
				"pretty"
			] }],
			indent: [{ indent: w() }],
			"tab-size": [{ tab: [
				Kc,
				J,
				q
			] }],
			"vertical-align": [{ align: [
				"baseline",
				"top",
				"middle",
				"bottom",
				"text-top",
				"text-bottom",
				"sub",
				"super",
				J,
				q
			] }],
			whitespace: [{ whitespace: [
				"normal",
				"nowrap",
				"pre",
				"pre-line",
				"pre-wrap",
				"break-spaces"
			] }],
			break: [{ break: [
				"normal",
				"words",
				"all",
				"keep"
			] }],
			wrap: [{ wrap: [
				"break-word",
				"anywhere",
				"normal"
			] }],
			hyphens: [{ hyphens: [
				"none",
				"manual",
				"auto"
			] }],
			content: [{ content: [
				"none",
				J,
				q
			] }],
			"bg-attachment": [{ bg: [
				"fixed",
				"local",
				"scroll"
			] }],
			"bg-clip": [{ "bg-clip": [
				"border",
				"padding",
				"content",
				"text"
			] }],
			"bg-origin": [{ "bg-origin": [
				"border",
				"padding",
				"content"
			] }],
			"bg-position": [{ bg: ce() }],
			"bg-repeat": [{ bg: le() }],
			"bg-size": [{ bg: ue() }],
			"bg-image": [{ bg: [
				"none",
				{
					linear: [
						{ to: [
							"t",
							"tr",
							"r",
							"br",
							"b",
							"bl",
							"l",
							"tl"
						] },
						Kc,
						J,
						q
					],
					radial: [
						"",
						J,
						q
					],
					conic: [
						"",
						Kc,
						J,
						q
					]
				},
				ml,
				cl
			] }],
			"bg-color": [{ bg: O() }],
			"gradient-from-pos": [{ from: de() }],
			"gradient-via-pos": [{ via: de() }],
			"gradient-to-pos": [{ to: de() }],
			"gradient-from": [{ from: O() }],
			"gradient-via": [{ via: O() }],
			"gradient-to": [{ to: O() }],
			rounded: [{ rounded: fe() }],
			"rounded-s": [{ "rounded-s": fe() }],
			"rounded-e": [{ "rounded-e": fe() }],
			"rounded-t": [{ "rounded-t": fe() }],
			"rounded-r": [{ "rounded-r": fe() }],
			"rounded-b": [{ "rounded-b": fe() }],
			"rounded-l": [{ "rounded-l": fe() }],
			"rounded-ss": [{ "rounded-ss": fe() }],
			"rounded-se": [{ "rounded-se": fe() }],
			"rounded-ee": [{ "rounded-ee": fe() }],
			"rounded-es": [{ "rounded-es": fe() }],
			"rounded-tl": [{ "rounded-tl": fe() }],
			"rounded-tr": [{ "rounded-tr": fe() }],
			"rounded-br": [{ "rounded-br": fe() }],
			"rounded-bl": [{ "rounded-bl": fe() }],
			"border-w": [{ border: pe() }],
			"border-w-x": [{ "border-x": pe() }],
			"border-w-y": [{ "border-y": pe() }],
			"border-w-s": [{ "border-s": pe() }],
			"border-w-e": [{ "border-e": pe() }],
			"border-w-bs": [{ "border-bs": pe() }],
			"border-w-be": [{ "border-be": pe() }],
			"border-w-t": [{ "border-t": pe() }],
			"border-w-r": [{ "border-r": pe() }],
			"border-w-b": [{ "border-b": pe() }],
			"border-w-l": [{ "border-l": pe() }],
			"divide-x": [{ "divide-x": pe() }],
			"divide-x-reverse": ["divide-x-reverse"],
			"divide-y": [{ "divide-y": pe() }],
			"divide-y-reverse": ["divide-y-reverse"],
			"border-style": [{ border: [
				...me(),
				"hidden",
				"none"
			] }],
			"divide-style": [{ divide: [
				...me(),
				"hidden",
				"none"
			] }],
			"border-color": [{ border: O() }],
			"border-color-x": [{ "border-x": O() }],
			"border-color-y": [{ "border-y": O() }],
			"border-color-s": [{ "border-s": O() }],
			"border-color-e": [{ "border-e": O() }],
			"border-color-bs": [{ "border-bs": O() }],
			"border-color-be": [{ "border-be": O() }],
			"border-color-t": [{ "border-t": O() }],
			"border-color-r": [{ "border-r": O() }],
			"border-color-b": [{ "border-b": O() }],
			"border-color-l": [{ "border-l": O() }],
			"divide-color": [{ divide: O() }],
			"outline-style": [{ outline: [
				...me(),
				"none",
				"hidden"
			] }],
			"outline-offset": [{ "outline-offset": [
				K,
				J,
				q
			] }],
			"outline-w": [{ outline: [
				"",
				K,
				ul,
				rl
			] }],
			"outline-color": [{ outline: O() }],
			shadow: [{ shadow: [
				"",
				"inner",
				"none",
				u,
				hl,
				ll
			] }],
			"shadow-color": [{ shadow: O() }],
			"inset-shadow": [{ "inset-shadow": [
				"none",
				d,
				hl,
				ll
			] }],
			"inset-shadow-color": [{ "inset-shadow": O() }],
			"ring-w": [{ ring: pe() }],
			"ring-w-inset": ["ring-inset"],
			"ring-color": [{ ring: O() }],
			"ring-offset-w": [{ "ring-offset": [K, rl] }],
			"ring-offset-color": [{ "ring-offset": O() }],
			"inset-ring-w": [{ "inset-ring": pe() }],
			"inset-ring-color": [{ "inset-ring": O() }],
			"text-shadow": [{ "text-shadow": [
				"none",
				f,
				hl,
				ll
			] }],
			"text-shadow-color": [{ "text-shadow": O() }],
			opacity: [{ opacity: [
				K,
				J,
				q
			] }],
			"mix-blend": [{ "mix-blend": [
				...k(),
				"plus-darker",
				"plus-lighter"
			] }],
			"bg-blend": [{ "bg-blend": k() }],
			"mask-clip": [{ "mask-clip": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }, "mask-no-clip"],
			"mask-composite": [{ mask: [
				"add",
				"subtract",
				"intersect",
				"exclude"
			] }],
			"mask-image-linear-pos": [{ "mask-linear": [K] }],
			"mask-image-linear-from-pos": [{ "mask-linear-from": he() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": he() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": O() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": O() }],
			"mask-image-t-from-pos": [{ "mask-t-from": he() }],
			"mask-image-t-to-pos": [{ "mask-t-to": he() }],
			"mask-image-t-from-color": [{ "mask-t-from": O() }],
			"mask-image-t-to-color": [{ "mask-t-to": O() }],
			"mask-image-r-from-pos": [{ "mask-r-from": he() }],
			"mask-image-r-to-pos": [{ "mask-r-to": he() }],
			"mask-image-r-from-color": [{ "mask-r-from": O() }],
			"mask-image-r-to-color": [{ "mask-r-to": O() }],
			"mask-image-b-from-pos": [{ "mask-b-from": he() }],
			"mask-image-b-to-pos": [{ "mask-b-to": he() }],
			"mask-image-b-from-color": [{ "mask-b-from": O() }],
			"mask-image-b-to-color": [{ "mask-b-to": O() }],
			"mask-image-l-from-pos": [{ "mask-l-from": he() }],
			"mask-image-l-to-pos": [{ "mask-l-to": he() }],
			"mask-image-l-from-color": [{ "mask-l-from": O() }],
			"mask-image-l-to-color": [{ "mask-l-to": O() }],
			"mask-image-x-from-pos": [{ "mask-x-from": he() }],
			"mask-image-x-to-pos": [{ "mask-x-to": he() }],
			"mask-image-x-from-color": [{ "mask-x-from": O() }],
			"mask-image-x-to-color": [{ "mask-x-to": O() }],
			"mask-image-y-from-pos": [{ "mask-y-from": he() }],
			"mask-image-y-to-pos": [{ "mask-y-to": he() }],
			"mask-image-y-from-color": [{ "mask-y-from": O() }],
			"mask-image-y-to-color": [{ "mask-y-to": O() }],
			"mask-image-radial": [{ "mask-radial": [J, q] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": he() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": he() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": O() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": O() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": b() }],
			"mask-image-conic-pos": [{ "mask-conic": [K] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": he() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": he() }],
			"mask-image-conic-from-color": [{ "mask-conic-from": O() }],
			"mask-image-conic-to-color": [{ "mask-conic-to": O() }],
			"mask-mode": [{ mask: [
				"alpha",
				"luminance",
				"match"
			] }],
			"mask-origin": [{ "mask-origin": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }],
			"mask-position": [{ mask: ce() }],
			"mask-repeat": [{ mask: le() }],
			"mask-size": [{ mask: ue() }],
			"mask-type": [{ "mask-type": ["alpha", "luminance"] }],
			"mask-image": [{ mask: [
				"none",
				J,
				q
			] }],
			filter: [{ filter: [
				"",
				"none",
				J,
				q
			] }],
			blur: [{ blur: ge() }],
			brightness: [{ brightness: [
				K,
				J,
				q
			] }],
			contrast: [{ contrast: [
				K,
				J,
				q
			] }],
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				p,
				hl,
				ll
			] }],
			"drop-shadow-color": [{ "drop-shadow": O() }],
			grayscale: [{ grayscale: [
				"",
				K,
				J,
				q
			] }],
			"hue-rotate": [{ "hue-rotate": [
				K,
				J,
				q
			] }],
			invert: [{ invert: [
				"",
				K,
				J,
				q
			] }],
			saturate: [{ saturate: [
				K,
				J,
				q
			] }],
			sepia: [{ sepia: [
				"",
				K,
				J,
				q
			] }],
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				J,
				q
			] }],
			"backdrop-blur": [{ "backdrop-blur": ge() }],
			"backdrop-brightness": [{ "backdrop-brightness": [
				K,
				J,
				q
			] }],
			"backdrop-contrast": [{ "backdrop-contrast": [
				K,
				J,
				q
			] }],
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				K,
				J,
				q
			] }],
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				K,
				J,
				q
			] }],
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				K,
				J,
				q
			] }],
			"backdrop-opacity": [{ "backdrop-opacity": [
				K,
				J,
				q
			] }],
			"backdrop-saturate": [{ "backdrop-saturate": [
				K,
				J,
				q
			] }],
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				K,
				J,
				q
			] }],
			"border-collapse": [{ border: ["collapse", "separate"] }],
			"border-spacing": [{ "border-spacing": w() }],
			"border-spacing-x": [{ "border-spacing-x": w() }],
			"border-spacing-y": [{ "border-spacing-y": w() }],
			"table-layout": [{ table: ["auto", "fixed"] }],
			caption: [{ caption: ["top", "bottom"] }],
			transition: [{ transition: [
				"",
				"all",
				"colors",
				"opacity",
				"shadow",
				"transform",
				"none",
				J,
				q
			] }],
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			duration: [{ duration: [
				K,
				"initial",
				J,
				q
			] }],
			ease: [{ ease: [
				"linear",
				"initial",
				_,
				J,
				q
			] }],
			delay: [{ delay: [
				K,
				J,
				q
			] }],
			animate: [{ animate: [
				"none",
				v,
				J,
				q
			] }],
			backface: [{ backface: ["hidden", "visible"] }],
			perspective: [{ perspective: [
				h,
				J,
				q
			] }],
			"perspective-origin": [{ "perspective-origin": x() }],
			rotate: [{ rotate: _e() }],
			"rotate-x": [{ "rotate-x": _e() }],
			"rotate-y": [{ "rotate-y": _e() }],
			"rotate-z": [{ "rotate-z": _e() }],
			scale: [{ scale: ve() }],
			"scale-x": [{ "scale-x": ve() }],
			"scale-y": [{ "scale-y": ve() }],
			"scale-z": [{ "scale-z": ve() }],
			"scale-3d": ["scale-3d"],
			skew: [{ skew: ye() }],
			"skew-x": [{ "skew-x": ye() }],
			"skew-y": [{ "skew-y": ye() }],
			transform: [{ transform: [
				J,
				q,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			"transform-origin": [{ origin: x() }],
			"transform-style": [{ transform: ["3d", "flat"] }],
			translate: [{ translate: be() }],
			"translate-x": [{ "translate-x": be() }],
			"translate-y": [{ "translate-y": be() }],
			"translate-z": [{ "translate-z": be() }],
			"translate-none": ["translate-none"],
			zoom: [{ zoom: [
				Kc,
				J,
				q
			] }],
			accent: [{ accent: O() }],
			appearance: [{ appearance: ["none", "auto"] }],
			"caret-color": [{ caret: O() }],
			"color-scheme": [{ scheme: [
				"normal",
				"dark",
				"light",
				"light-dark",
				"only-dark",
				"only-light"
			] }],
			cursor: [{ cursor: [
				"auto",
				"default",
				"pointer",
				"wait",
				"text",
				"move",
				"help",
				"not-allowed",
				"none",
				"context-menu",
				"progress",
				"cell",
				"crosshair",
				"vertical-text",
				"alias",
				"copy",
				"no-drop",
				"grab",
				"grabbing",
				"all-scroll",
				"col-resize",
				"row-resize",
				"n-resize",
				"e-resize",
				"s-resize",
				"w-resize",
				"ne-resize",
				"nw-resize",
				"se-resize",
				"sw-resize",
				"ew-resize",
				"ns-resize",
				"nesw-resize",
				"nwse-resize",
				"zoom-in",
				"zoom-out",
				J,
				q
			] }],
			"field-sizing": [{ "field-sizing": ["fixed", "content"] }],
			"pointer-events": [{ "pointer-events": ["auto", "none"] }],
			resize: [{ resize: [
				"none",
				"",
				"y",
				"x"
			] }],
			"scroll-behavior": [{ scroll: ["auto", "smooth"] }],
			"scrollbar-thumb-color": [{ "scrollbar-thumb": O() }],
			"scrollbar-track-color": [{ "scrollbar-track": O() }],
			"scrollbar-gutter": [{ "scrollbar-gutter": [
				"auto",
				"stable",
				"both"
			] }],
			"scrollbar-w": [{ scrollbar: [
				"auto",
				"thin",
				"none"
			] }],
			"scroll-m": [{ "scroll-m": w() }],
			"scroll-mx": [{ "scroll-mx": w() }],
			"scroll-my": [{ "scroll-my": w() }],
			"scroll-ms": [{ "scroll-ms": w() }],
			"scroll-me": [{ "scroll-me": w() }],
			"scroll-mbs": [{ "scroll-mbs": w() }],
			"scroll-mbe": [{ "scroll-mbe": w() }],
			"scroll-mt": [{ "scroll-mt": w() }],
			"scroll-mr": [{ "scroll-mr": w() }],
			"scroll-mb": [{ "scroll-mb": w() }],
			"scroll-ml": [{ "scroll-ml": w() }],
			"scroll-p": [{ "scroll-p": w() }],
			"scroll-px": [{ "scroll-px": w() }],
			"scroll-py": [{ "scroll-py": w() }],
			"scroll-ps": [{ "scroll-ps": w() }],
			"scroll-pe": [{ "scroll-pe": w() }],
			"scroll-pbs": [{ "scroll-pbs": w() }],
			"scroll-pbe": [{ "scroll-pbe": w() }],
			"scroll-pt": [{ "scroll-pt": w() }],
			"scroll-pr": [{ "scroll-pr": w() }],
			"scroll-pb": [{ "scroll-pb": w() }],
			"scroll-pl": [{ "scroll-pl": w() }],
			"snap-align": [{ snap: [
				"start",
				"end",
				"center",
				"align-none"
			] }],
			"snap-stop": [{ snap: ["normal", "always"] }],
			"snap-type": [{ snap: [
				"none",
				"x",
				"y",
				"both"
			] }],
			"snap-strictness": [{ snap: ["mandatory", "proximity"] }],
			touch: [{ touch: [
				"auto",
				"none",
				"manipulation"
			] }],
			"touch-x": [{ "touch-pan": [
				"x",
				"left",
				"right"
			] }],
			"touch-y": [{ "touch-pan": [
				"y",
				"up",
				"down"
			] }],
			"touch-pz": ["touch-pinch-zoom"],
			select: [{ select: [
				"none",
				"text",
				"all",
				"auto"
			] }],
			"will-change": [{ "will-change": [
				"auto",
				"scroll",
				"contents",
				"transform",
				J,
				q
			] }],
			fill: [{ fill: ["none", ...O()] }],
			"stroke-w": [{ stroke: [
				K,
				ul,
				rl,
				il
			] }],
			stroke: [{ stroke: ["none", ...O()] }],
			"forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }]
		},
		conflictingClassGroups: {
			"container-named": ["container-type"],
			overflow: ["overflow-x", "overflow-y"],
			overscroll: ["overscroll-x", "overscroll-y"],
			inset: [
				"inset-x",
				"inset-y",
				"inset-bs",
				"inset-be",
				"start",
				"end",
				"top",
				"right",
				"bottom",
				"left"
			],
			"inset-x": [
				"start",
				"end",
				"right",
				"left"
			],
			"inset-y": [
				"inset-bs",
				"inset-be",
				"top",
				"bottom"
			],
			flex: [
				"basis",
				"grow",
				"shrink"
			],
			gap: ["gap-x", "gap-y"],
			p: [
				"px",
				"py",
				"ps",
				"pe",
				"pbs",
				"pbe",
				"pt",
				"pr",
				"pb",
				"pl"
			],
			px: [
				"ps",
				"pe",
				"pr",
				"pl"
			],
			py: [
				"pbs",
				"pbe",
				"pt",
				"pb"
			],
			m: [
				"mx",
				"my",
				"ms",
				"me",
				"mbs",
				"mbe",
				"mt",
				"mr",
				"mb",
				"ml"
			],
			mx: [
				"ms",
				"me",
				"mr",
				"ml"
			],
			my: [
				"mbs",
				"mbe",
				"mt",
				"mb"
			],
			size: ["w", "h"],
			"font-size": ["leading"],
			"fvn-normal": [
				"fvn-ordinal",
				"fvn-slashed-zero",
				"fvn-figure",
				"fvn-spacing",
				"fvn-fraction"
			],
			"fvn-ordinal": ["fvn-normal"],
			"fvn-slashed-zero": ["fvn-normal"],
			"fvn-figure": ["fvn-normal"],
			"fvn-spacing": ["fvn-normal"],
			"fvn-fraction": ["fvn-normal"],
			"line-clamp": ["display", "overflow"],
			rounded: [
				"rounded-s",
				"rounded-e",
				"rounded-t",
				"rounded-r",
				"rounded-b",
				"rounded-l",
				"rounded-ss",
				"rounded-se",
				"rounded-ee",
				"rounded-es",
				"rounded-tl",
				"rounded-tr",
				"rounded-br",
				"rounded-bl"
			],
			"rounded-s": ["rounded-ss", "rounded-es"],
			"rounded-e": ["rounded-se", "rounded-ee"],
			"rounded-t": ["rounded-tl", "rounded-tr"],
			"rounded-r": ["rounded-tr", "rounded-br"],
			"rounded-b": ["rounded-br", "rounded-bl"],
			"rounded-l": ["rounded-tl", "rounded-bl"],
			"border-spacing": ["border-spacing-x", "border-spacing-y"],
			"border-w": [
				"border-w-x",
				"border-w-y",
				"border-w-s",
				"border-w-e",
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-r",
				"border-w-b",
				"border-w-l"
			],
			"border-w-x": [
				"border-w-s",
				"border-w-e",
				"border-w-r",
				"border-w-l"
			],
			"border-w-y": [
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-b"
			],
			"border-color": [
				"border-color-x",
				"border-color-y",
				"border-color-s",
				"border-color-e",
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-r",
				"border-color-b",
				"border-color-l"
			],
			"border-color-x": [
				"border-color-s",
				"border-color-e",
				"border-color-r",
				"border-color-l"
			],
			"border-color-y": [
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-b"
			],
			translate: [
				"translate-x",
				"translate-y",
				"translate-none"
			],
			"translate-none": [
				"translate",
				"translate-x",
				"translate-y",
				"translate-z"
			],
			"scroll-m": [
				"scroll-mx",
				"scroll-my",
				"scroll-ms",
				"scroll-me",
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mr",
				"scroll-mb",
				"scroll-ml"
			],
			"scroll-mx": [
				"scroll-ms",
				"scroll-me",
				"scroll-mr",
				"scroll-ml"
			],
			"scroll-my": [
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mb"
			],
			"scroll-p": [
				"scroll-px",
				"scroll-py",
				"scroll-ps",
				"scroll-pe",
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pr",
				"scroll-pb",
				"scroll-pl"
			],
			"scroll-px": [
				"scroll-ps",
				"scroll-pe",
				"scroll-pr",
				"scroll-pl"
			],
			"scroll-py": [
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pb"
			],
			touch: [
				"touch-x",
				"touch-y",
				"touch-pz"
			],
			"touch-x": ["touch"],
			"touch-y": ["touch"],
			"touch-pz": ["touch"]
		},
		conflictingClassGroupModifiers: { "font-size": ["leading"] },
		postfixLookupClassGroups: ["container-type"],
		orderSensitiveModifiers: [
			"*",
			"**",
			"after",
			"backdrop",
			"before",
			"details-content",
			"file",
			"first-letter",
			"first-line",
			"marker",
			"placeholder",
			"selection"
		]
	};
});
//#endregion
//#region src/lib/utils.js
function Ol(...e) {
	return Dl(nc(e));
}
//#endregion
//#region src/components/ui/separator/Separator.vue
var kl = {
	__name: "Separator",
	props: {
		orientation: {
			type: String,
			required: !1,
			default: "horizontal"
		},
		decorative: {
			type: Boolean,
			required: !1,
			default: !0
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		},
		class: {
			type: [
				Boolean,
				null,
				String,
				Object,
				Array
			],
			required: !1,
			skipCheck: !0
		}
	},
	setup(e) {
		let t = e, n = Cs(t, "class");
		return (e, r) => (L(), z(N(qs), Ui({ "data-slot": "separator" }, N(n), { class: N(Ol)("bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px", t.class) }), null, 16, ["class"]));
	}
}, Al = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, jl = nc, Ml = (e, t) => (n) => {
	if (t?.variants == null) return jl(e, n?.class, n?.className);
	let { variants: r, defaultVariants: i } = t, a = Object.keys(r).map((e) => {
		let t = n?.[e], a = i?.[e];
		if (t === null) return null;
		let o = Al(t) || Al(a);
		return r[e][o];
	}), o = n && Object.entries(n).reduce((e, t) => {
		let [n, r] = t;
		return r === void 0 || (e[n] = r), e;
	}, {});
	return jl(e, a, t?.compoundVariants?.reduce((e, t) => {
		let { class: n, className: r, ...a } = t;
		return Object.entries(a).every((e) => {
			let [t, n] = e;
			return Array.isArray(n) ? n.includes({
				...i,
				...o
			}[t]) : {
				...i,
				...o
			}[t] === n;
		}) ? [
			...e,
			n,
			r
		] : e;
	}, []), n?.class, n?.className);
}, Nl = {
	__name: "Toggle",
	props: {
		defaultValue: {
			type: Boolean,
			required: !1
		},
		modelValue: {
			type: [Boolean, null],
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1,
			default: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		},
		name: {
			type: String,
			required: !1
		},
		required: {
			type: Boolean,
			required: !1
		},
		class: {
			type: [
				Boolean,
				null,
				String,
				Object,
				Array
			],
			required: !1,
			skipCheck: !0
		},
		variant: {
			type: null,
			required: !1,
			default: "default"
		},
		size: {
			type: null,
			required: !1,
			default: "default"
		}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = Ls(Cs(n, "class", "size", "variant"), r);
		return (t, r) => (L(), z(N(ec), Ui({ "data-slot": "toggle" }, N(i), { class: N(Ol)(N(Pl)({
			variant: e.variant,
			size: e.size
		}), n.class) }), {
			default: P((e) => [Er(t.$slots, "default", he(Ri(e)))]),
			_: 3
		}, 16, ["class"]));
	}
}, Pl = Ml("inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3 outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap", {
	variants: {
		variant: {
			default: "bg-transparent",
			outline: "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground"
		},
		size: {
			default: "h-9 px-2 min-w-9",
			sm: "h-8 px-1.5 min-w-8",
			lg: "h-10 px-2.5 min-w-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
//#endregion
//#region src/lib/shortcuts.js
function Fl(e) {
	let t = e.toLowerCase().split("+").map((e) => e.trim());
	return {
		key: t.pop() || "+",
		ctrl: t.includes("ctrl"),
		shift: t.includes("shift"),
		alt: t.includes("alt"),
		meta: t.includes("meta") || t.includes("cmd")
	};
}
function Il(e, t) {
	return e.key.toLowerCase() === t.key && e.ctrlKey === t.ctrl && e.shiftKey === t.shift && e.altKey === t.alt && e.metaKey === t.meta;
}
var Ll = (e) => e.split("+").map((e) => e.length === 1 ? e.toUpperCase() : e[0].toUpperCase() + e.slice(1)).join("+");
//#endregion
//#region src/lib/storage.js
function Rl(e, t) {
	try {
		let n = sessionStorage.getItem(e);
		return n === null ? t : JSON.parse(n);
	} catch {
		return t;
	}
}
function zl(e, t) {
	try {
		t == null ? sessionStorage.removeItem(e) : sessionStorage.setItem(e, JSON.stringify(t));
	} catch {}
}
function Bl(e, t) {
	try {
		let n = localStorage.getItem(e);
		return n === null ? t : JSON.parse(n);
	} catch {
		return t;
	}
}
function Vl(e, t) {
	try {
		localStorage.setItem(e, JSON.stringify(t));
	} catch {}
}
//#endregion
//#region src/lib/state.js
var Hl = "dev-tools-toolbar", Ul = "dev-grid-visible", Y = /* @__PURE__ */ Vt({
	toolbar: Bl(Hl, !1) === !0,
	grid: Bl(Ul, !1) === !0 || Bl(Ul, !1) === 1,
	tokens: !1,
	outline: !1,
	form: !1,
	events: !1,
	seo: !1,
	images: !1,
	cache: !1,
	eventsUnseen: 0,
	tokensChanged: 0
});
Qn(() => Y.toolbar, (e) => Vl(Hl, e)), Qn(() => Y.grid, (e) => Vl(Ul, e));
//#endregion
//#region src/components/Toolbar.vue
var Wl = {
	key: 0,
	"data-panel": "",
	role: "toolbar",
	"aria-label": "Dev tools",
	class: "fixed bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border p-1 shadow-lg"
}, Gl = ["title"], Kl = ["title"], ql = ["title"], Jl = {
	key: 1,
	class: "bg-foreground text-background rounded-full px-1.5 text-[10px] leading-4 font-semibold"
}, Yl = ["title"], Xl = ["title", "aria-label"], Zl = {
	__name: "Toolbar",
	setup(e) {
		let t = Jn("config"), n = (e) => Ll(t.shortcuts[e]), r = [
			{
				name: "grid",
				label: "Grid",
				icon: Qo
			},
			{
				name: "tokens",
				label: "Tokens",
				icon: ps
			},
			{
				name: "outline",
				label: "Outline",
				icon: is
			},
			{
				name: "form",
				label: "Form",
				icon: ms
			},
			{
				name: "events",
				label: "Events",
				icon: Fo
			},
			{
				name: "seo",
				label: "SEO",
				icon: ds
			},
			{
				name: "images",
				label: "Images",
				icon: es
			},
			{
				name: "cache",
				label: "Cache",
				icon: Jo
			}
		].filter((e) => t.tools.includes(e.name)), i = {
			braces: Io,
			bug: Lo,
			code: Go,
			database: Jo,
			eye: Zo,
			image: $o,
			languages: ns,
			layers: rs
		}, a = t.actions, o = /* @__PURE__ */ M([]);
		function s() {
			o.value = a.map((e) => {
				try {
					return e.pressed?.() ?? !1;
				} catch {
					return !1;
				}
			});
		}
		function c(e) {
			e.run(), s();
		}
		let l = () => requestAnimationFrame(s), u = null;
		return Qn(() => Y.toolbar, (e) => {
			clearInterval(u), e && a.length && (s(), u = setInterval(s, 1e3));
		}, { immediate: !0 }), gr(() => window.addEventListener("keydown", l)), vr(() => {
			clearInterval(u), window.removeEventListener("keydown", l);
		}), (e, s) => N(Y).toolbar ? (L(), R("div", Wl, [
			B("span", {
				class: "text-muted-foreground flex items-center px-2",
				title: `Dev tools (${n("toolbar")})`
			}, [V(N(_s), { class: "size-4" })], 8, Gl),
			(L(!0), R(I, null, F(N(r), (e) => (L(), z(N(Nl), {
				key: e.name,
				modelValue: N(Y)[e.name],
				"onUpdate:modelValue": (t) => N(Y)[e.name] = t,
				size: "sm",
				class: "relative rounded-full",
				title: `${e.label} (${n(e.name)})`
			}, {
				default: P(() => [
					(L(), z(Sr(e.icon))),
					H(" " + A(e.label) + " ", 1),
					e.name === "tokens" && N(Y).tokensChanged ? (L(), R("span", {
						key: 0,
						class: "bg-changed text-foreground rounded-full px-1.5 text-[10px] leading-4 font-semibold",
						title: `${N(Y).tokensChanged} changed`
					}, A(N(Y).tokensChanged), 9, Kl)) : U("", !0),
					e.name === "events" && N(Y).eventsUnseen && !N(Y).events ? (L(), R("span", {
						key: 1,
						class: "bg-highlight absolute top-1 right-1 size-2 rounded-full",
						title: `${N(Y).eventsUnseen} new`
					}, null, 8, ql)) : U("", !0)
				]),
				_: 2
			}, 1032, [
				"modelValue",
				"onUpdate:modelValue",
				"title"
			]))), 128)),
			N(a).length ? (L(), R(I, { key: 0 }, [V(N(kl), {
				orientation: "vertical",
				class: "mx-1 !h-5"
			}), (L(!0), R(I, null, F(N(a), (e, t) => (L(), z(N(Nl), {
				key: e.name ?? e.label,
				"model-value": !!o.value[t],
				size: "sm",
				class: "rounded-full",
				title: e.shortcut ? `${e.label} (${N(Ll)(e.shortcut)})` : e.label,
				"onUpdate:modelValue": (t) => c(e)
			}, {
				default: P(() => [
					i[e.icon] ? (L(), z(Sr(i[e.icon]), { key: 0 })) : U("", !0),
					H(" " + A(e.label) + " ", 1),
					typeof o.value[t] == "string" ? (L(), R("span", Jl, A(o.value[t]), 1)) : U("", !0)
				]),
				_: 2
			}, 1032, [
				"model-value",
				"title",
				"onUpdate:modelValue"
			]))), 128))], 64)) : U("", !0),
			V(N(kl), {
				orientation: "vertical",
				class: "mx-1 !h-5"
			}),
			B("button", {
				type: "button",
				class: "text-muted-foreground hover:bg-muted hover:text-foreground flex size-8 items-center justify-center rounded-full",
				title: `Hide (${n("toolbar")})`,
				"aria-label": "Hide the dev tools",
				onClick: s[0] ||= (e) => N(Y).toolbar = !1
			}, [V(N(vs), { class: "size-4" })], 8, Yl)
		])) : N(t).tools.includes("tokens") && N(Y).tokensChanged && !N(Y).tokens && !N(Y).form ? (L(), R("button", {
			key: 1,
			"data-panel": "",
			type: "button",
			class: "bg-changed text-foreground fixed top-3 right-3 flex size-6 items-center justify-center rounded-full text-xs font-bold shadow-md",
			title: `${N(Y).tokensChanged} token${N(Y).tokensChanged === 1 ? "" : "s"} changed (${n("tokens")})`,
			"aria-label": `${N(Y).tokensChanged} tokens changed: open the tokens panel`,
			onClick: s[1] ||= (e) => N(Y).tokens = !0
		}, "!", 8, Xl)) : U("", !0);
	}
}, Ql = {
	key: 0,
	class: "bg-border -mx-1 my-1 h-px",
	role: "separator"
}, $l = ["disabled", "onClick"], eu = {
	key: 0,
	class: "flex size-4 flex-none items-center justify-center"
}, tu = {
	__name: "PopMenu",
	props: {
		items: {
			type: Array,
			required: !0
		},
		align: {
			type: String,
			default: "end"
		}
	},
	setup(e) {
		let t = /* @__PURE__ */ M(null), n = /* @__PURE__ */ M(!1), r = () => {
			n.value = !n.value;
		};
		function i(e) {
			e.composedPath().includes(t.value) || (n.value = !1);
		}
		Qn(n, (e) => {
			e ? window.addEventListener("pointerdown", i, !0) : window.removeEventListener("pointerdown", i, !0);
		}), vr(() => window.removeEventListener("pointerdown", i, !0));
		function a(e) {
			n.value = !1, e.action();
		}
		return (i, o) => (L(), R("div", {
			ref_key: "menu",
			ref: t,
			class: "relative",
			onKeydown: o[0] ||= mo(fo((e) => n.value = !1, ["stop"]), ["escape"])
		}, [Er(i.$slots, "trigger", {
			toggle: r,
			open: n.value
		}), n.value ? (L(), R("div", {
			key: 0,
			role: "menu",
			class: k(["bg-popover text-popover-foreground absolute top-full z-30 mt-1 min-w-44 rounded-md border p-1 shadow-md", e.align === "end" ? "right-0" : "left-0"])
		}, [(L(!0), R(I, null, F(e.items, (e, t) => (L(), R(I, { key: t }, [e.separator ? (L(), R("div", Ql)) : (L(), R("button", {
			key: 1,
			type: "button",
			role: "menuitem",
			class: k(["hover:bg-accent focus-visible:bg-accent flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm outline-none disabled:pointer-events-none disabled:opacity-50", e.destructive && "text-destructive"]),
			disabled: e.disabled,
			onClick: (t) => a(e)
		}, [e.checked === void 0 ? U("", !0) : (L(), R("span", eu, [e.checked ? (L(), z(N(Ro), {
			key: 0,
			class: "size-3.5"
		})) : U("", !0)])), H(" " + A(e.label), 1)], 10, $l))], 64))), 128))], 2)) : U("", !0)], 544));
	}
}, X = {
	__name: "Button",
	props: {
		variant: {
			type: null,
			required: !1
		},
		size: {
			type: null,
			required: !1
		},
		class: {
			type: [
				Boolean,
				null,
				String,
				Object,
				Array
			],
			required: !1,
			skipCheck: !0
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "button"
		}
	},
	setup(e) {
		let t = e;
		return (n, r) => (L(), z(N(Vs), {
			"data-slot": "button",
			"data-variant": e.variant,
			"data-size": e.size,
			as: e.as,
			"as-child": e.asChild,
			class: k(N(Ol)(N(nu)({
				variant: e.variant,
				size: e.size
			}), t.class))
		}, {
			default: P(() => [Er(n.$slots, "default")]),
			_: 3
		}, 8, [
			"data-variant",
			"data-size",
			"as",
			"as-child",
			"class"
		]));
	}
}, nu = Ml("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
			outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2 has-[>svg]:px-3",
			xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
			sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
			lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
			icon: "size-9",
			"icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
			"icon-sm": "size-8",
			"icon-lg": "size-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
}), ru = ["aria-label"], iu = { class: "flex items-center gap-2" }, au = { class: "text-base font-semibold" }, ou = { class: "text-muted-foreground text-xs" }, su = { class: "ml-auto flex items-center gap-1" }, cu = { class: "relative min-h-0 flex-1" }, lu = { class: "absolute inset-0 overflow-y-auto overscroll-contain" }, uu = {
	key: 0,
	class: "border-t px-4 py-2.5"
}, du = 280, fu = 40, pu = {
	__name: "SidePanel",
	props: {
		title: {
			type: String,
			required: !0
		},
		side: {
			type: String,
			default: "right"
		},
		widthKey: {
			type: String,
			required: !0
		},
		inset: {
			type: String,
			default: "px-4"
		}
	},
	emits: ["close"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = /* @__PURE__ */ M(null), a = /* @__PURE__ */ M(Number(Rl(n.widthKey, 0)) || null), o = /* @__PURE__ */ M(!1);
		function s(e) {
			if (e.button !== 0) return;
			e.preventDefault();
			let t = e.currentTarget, r = (e) => {
				let t = n.side === "right" ? window.innerWidth - e.clientX : e.clientX;
				a.value = Math.round(Math.min(Math.max(t, du), window.innerWidth - fu));
			}, i = () => {
				t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i), t.removeEventListener("pointercancel", i), o.value = !1, zl(n.widthKey, a.value);
			};
			t.setPointerCapture(e.pointerId), o.value = !0, t.addEventListener("pointermove", r), t.addEventListener("pointerup", i), t.addEventListener("pointercancel", i);
		}
		function c() {
			a.value = null, zl(n.widthKey, null);
		}
		return gr(() => i.value?.focus({ preventScroll: !0 })), (t, n) => (L(), R("section", {
			ref_key: "panel",
			ref: i,
			"data-panel": "",
			role: "dialog",
			"aria-modal": "false",
			"aria-label": e.title,
			tabindex: "-1",
			class: k(["fixed inset-y-0 flex max-w-screen flex-col shadow-2xl outline-none", e.side === "right" ? "right-0 border-l" : "left-0 border-r"]),
			style: ue({ width: a.value ? `${a.value}px` : "min(28rem, 100vw)" }),
			onKeydown: n[1] ||= mo((e) => r("close"), ["escape"])
		}, [
			B("div", {
				class: k(["hover:bg-highlight/30 absolute inset-y-0 z-20 w-1.5 cursor-ew-resize touch-none", [e.side === "right" ? "-left-[3px]" : "-right-[3px]", o.value && "bg-highlight/30"]]),
				title: "Drag to resize, double click to reset",
				"aria-hidden": "true",
				onPointerdown: s,
				onDblclick: c
			}, null, 34),
			B("header", { class: k(["grid gap-2.5 border-b py-4", e.inset]) }, [B("div", iu, [
				B("h2", au, A(e.title), 1),
				B("span", ou, [Er(t.$slots, "count")]),
				B("div", su, [Er(t.$slots, "actions"), V(N(X), {
					variant: "ghost",
					size: "icon-sm",
					"aria-label": "Close",
					title: "Close (Escape)",
					onClick: n[0] ||= (e) => r("close")
				}, {
					default: P(() => [V(N(vs))]),
					_: 1
				})])
			]), Er(t.$slots, "header")], 2),
			B("div", cu, [B("div", lu, [Er(t.$slots, "default")]), Er(t.$slots, "overlay")]),
			t.$slots.footer ? (L(), R("footer", uu, [Er(t.$slots, "footer")])) : U("", !0)
		], 46, ru));
	}
};
//#endregion
//#region src/lib/copy.js
async function mu(e, t) {
	try {
		return await navigator.clipboard.writeText(e), !0;
	} catch {}
	let n = document.createElement("textarea");
	n.value = e, n.setAttribute("readonly", ""), Object.assign(n.style, {
		position: "fixed",
		top: "0",
		left: "0",
		opacity: "0"
	}), t.append(n), n.select();
	let r = !1;
	try {
		r = document.execCommand("copy");
	} catch {}
	return n.remove(), r;
}
//#endregion
//#region src/lib/requests.js
var hu = /* @__PURE__ */ new Set(), gu = (e) => String(e).split(/[?#]/)[0], _u = gu(import.meta.url), vu = (e) => {
	try {
		return new URL(e, location.href).href;
	} catch {
		return String(e);
	}
};
function yu(e, t) {
	return hu.add(vu(e)), fetch(e, t);
}
var bu = (e) => gu(e) === _u || hu.has(vu(e)), xu = [
	{
		kind: "global",
		title: "Global",
		note: "the site's, not the page's: rendered in the layout (header, footer) or declared global. Purging one empties the whole cache"
	},
	{
		kind: "type",
		title: "Lists",
		note: "the page lists posts of the type: purged when one is published, changed or removed"
	},
	{
		kind: "post",
		title: "Posts",
		note: "more than the link used (fields, image, date): purged when anything but its content changes"
	},
	{
		kind: "content",
		title: "Content",
		note: "the content or excerpt rendered (its own page, excerpts in lists): purged by every save, and alone by one that changed only the content"
	},
	{
		kind: "link",
		title: "Links",
		note: "only the url or title used (menus, breadcrumbs, CTAs): purged when either changes"
	},
	{
		kind: "children",
		title: "Children",
		note: "the page lists the children of these posts: purged when one is added, removed, moved or changed"
	},
	{
		kind: "term",
		title: "Terms",
		note: "purged when the term changes"
	},
	{
		kind: "taxonomy",
		title: "Term lists",
		note: "the page lists terms of the taxonomy: purged when one is added, changed or removed, or gains or loses its posts"
	},
	{
		kind: "pattern",
		title: "Patterns",
		note: "synced patterns placed on the page: purged when the pattern is saved"
	},
	{
		kind: "text",
		title: "Texts",
		note: "translated texts printed from this file: purged when one of its translations is saved"
	},
	{
		kind: "other",
		title: "Other",
		note: "added by hand"
	}
];
async function Su() {
	let e = new URL(location.href);
	e.hash = "";
	try {
		let t = await yu(e.href, {
			cache: "no-store",
			credentials: "same-origin"
		}), n = new DOMParser().parseFromString(await t.text(), "text/html").querySelector("script#wg-cache-tags[type=\"application/json\"]");
		return n ? {
			url: e.href,
			...JSON.parse(n.textContent)
		} : {
			url: e.href,
			error: "The page says no cache tags. The server adds them as <script type=\"application/json\" id=\"wg-cache-tags\">, while its debug is on."
		};
	} catch (t) {
		return {
			url: e.href,
			error: t.message || "The page could not be fetched"
		};
	}
}
function Cu(e, t = xu) {
	let n = xu.find(({ kind: e }) => e === "other"), r = t.some(({ kind: e }) => e === "other") ? t : [...t, n], i = new Set(r.map(({ kind: e }) => e));
	return r.map((t) => {
		let n = e.filter((e) => (e.global ? "global" : i.has(e.kind) ? e.kind : "other") === t.kind), r = [...Map.groupBy(n, (e) => e.group ?? "")];
		return {
			...t,
			count: n.length,
			groups: r
		};
	}).filter((e) => e.count);
}
//#endregion
//#region src/tools/cache/CachePanel.vue
var wu = { class: "flex min-w-0 items-center gap-2 text-xs" }, Tu = {
	key: 0,
	class: "text-muted-foreground flex-none"
}, Eu = {
	key: 1,
	class: "text-muted-foreground flex-none"
}, Du = ["title"], Ou = {
	key: 0,
	class: "text-muted-foreground px-4 py-10 text-center text-sm"
}, ku = {
	key: 1,
	class: "text-muted-foreground px-4 py-10 text-center text-sm"
}, Au = {
	key: 2,
	class: "text-muted-foreground px-4 py-10 text-center text-sm"
}, ju = { class: "px-4 pt-3 text-xs font-semibold" }, Mu = { class: "text-muted-foreground font-normal tabular-nums" }, Nu = { class: "text-muted-foreground px-4 pb-1 text-[11px]" }, Pu = {
	key: 0,
	class: "text-muted-foreground px-4 pt-2 pb-0.5 text-[11px] font-medium"
}, Fu = ["title"], Iu = ["title"], Lu = ["href", "title"], Ru = ["href"], zu = { class: "text-xs" }, Bu = {
	__name: "CachePanel",
	emits: ["close"],
	setup(e, { emit: t }) {
		let n = t, r = Jn("root"), i = /* @__PURE__ */ $t(null), a = /* @__PURE__ */ M(!1), o = /* @__PURE__ */ M(""), s = 0;
		async function c() {
			let e = ++s;
			a.value = !0;
			let t = await Su();
			e === s && (i.value = t, a.value = !1);
		}
		gr(c);
		let l = W(() => i.value?.tags ?? []), u = W(() => Cu(l.value, i.value?.kinds)), d = W(() => i.value ? new URL(i.value.url).pathname : "");
		async function f(e, t) {
			o.value = await mu(e, r) ? `${t} copied` : "Copy failed", setTimeout(() => {
				o.value = "";
			}, 1500);
		}
		let p = W(() => [{
			label: "Copy tags",
			action: () => f(l.value.map(({ tag: e }) => e).join("\n"), `${l.value.length} tags`),
			disabled: !l.value.length
		}, {
			label: "Copy as JSON",
			action: () => f(JSON.stringify(i.value, null, 2), "JSON"),
			disabled: !l.value.length
		}]);
		return (e, t) => (L(), z(pu, {
			title: "Cache tags",
			side: "right",
			"width-key": "dev-cache-width",
			onClose: t[0] ||= (e) => n("close")
		}, Tr({
			count: P(() => [H(A(a.value && !i.value ? "…" : l.value.length), 1)]),
			actions: P(() => [V(N(X), {
				variant: "ghost",
				size: "icon-sm",
				"aria-label": "Refresh",
				title: "Read the page's tags again",
				disabled: a.value,
				onClick: c
			}, {
				default: P(() => [V(N(ls), { class: k(a.value && "animate-spin") }, null, 8, ["class"])]),
				_: 1
			}, 8, ["disabled"]), V(tu, { items: p.value }, {
				trigger: P(({ toggle: e, open: t }) => [V(N(X), {
					variant: "ghost",
					size: "icon-sm",
					"aria-label": "More",
					title: "More",
					"aria-expanded": t,
					onClick: e
				}, {
					default: P(() => [V(N(Yo))]),
					_: 1
				}, 8, ["aria-expanded", "onClick"])]),
				_: 1
			}, 8, ["items"])]),
			default: P(() => [i.value ? i.value.error ? (L(), R("p", ku, A(i.value.error), 1)) : l.value.length ? U("", !0) : (L(), R("p", Au, "No tags: nothing would purge this page.")) : (L(), R("p", Ou, "Reading the page…")), (L(!0), R(I, null, F(u.value, (e) => (L(), R("section", {
				key: e.kind,
				class: "border-b pb-2 last:border-b-0"
			}, [
				B("h3", ju, [H(A(e.title) + " ", 1), B("span", Mu, A(e.count), 1)]),
				B("p", Nu, A(e.note), 1),
				(L(!0), R(I, null, F(e.groups, ([e, t]) => (L(), R(I, { key: e }, [e ? (L(), R("h4", Pu, A(e), 1)) : U("", !0), B("ul", null, [(L(!0), R(I, null, F(t, (e) => (L(), R("li", {
					key: e.tag,
					class: "hover:bg-muted/50 flex items-center gap-3 px-4 py-1 text-xs"
				}, [
					B("span", {
						class: "text-muted-foreground w-48 flex-none truncate font-mono text-[11px]",
						title: e.tag
					}, A(e.tag), 9, Fu),
					B("span", {
						class: "min-w-0 flex-1 truncate",
						title: e.label
					}, A(e.label), 9, Iu),
					e.view ? (L(), R("a", {
						key: 0,
						href: e.view,
						target: "_blank",
						class: "text-muted-foreground hover:text-foreground flex-none",
						title: `View ${e.view}`,
						"aria-label": "View"
					}, [V(N(Xo), { class: "size-3.5" })], 8, Lu)) : U("", !0),
					e.edit ? (L(), R("a", {
						key: 1,
						href: e.edit,
						target: "_blank",
						class: "text-muted-foreground hover:text-foreground flex-none",
						title: "Edit",
						"aria-label": "Edit"
					}, [V(N(os), { class: "size-3.5" })], 8, Ru)) : U("", !0)
				]))), 128))])], 64))), 128))
			]))), 128))]),
			_: 2
		}, [i.value && !i.value.error ? {
			name: "header",
			fn: P(() => [B("p", wu, [
				B("span", { class: k(["flex-none rounded px-1.5 text-[10px] leading-4 font-semibold", i.value.cached ? "bg-emerald-500/15 text-emerald-700" : "bg-amber-500/20 text-amber-800"]) }, A(i.value.cached ? "Cacheable" : "Not cached"), 3),
				i.value.cached ? i.value.note ? (L(), R("span", Eu, A(i.value.note), 1)) : U("", !0) : (L(), R("span", Tu, A(i.value.skipped), 1)),
				B("span", {
					class: "text-muted-foreground min-w-0 truncate font-mono text-[11px]",
					title: i.value.url
				}, A(d.value), 9, Du)
			])]),
			key: "0"
		} : void 0, o.value ? {
			name: "footer",
			fn: P(() => [B("p", zu, A(o.value), 1)]),
			key: "1"
		} : void 0]), 1024));
	}
}, Vu = "we-go-dev-tools", Hu = "";
function Uu(e) {
	Hu = e || "";
}
function Wu(e) {
	if (e.localName === "we-go-dev-tools") return !0;
	try {
		return !!Hu && !!e.closest(Hu);
	} catch {
		return !1;
	}
}
function Gu(e, t) {
	let n = document.elementFromPoint(e, t);
	return n && !Wu(n) ? n : null;
}
var Ku = (e) => e.tagName.toLowerCase() + (e.id ? `#${e.id}` : "") + [...e.classList].slice(0, 3).map((e) => `.${e}`).join(""), qu = 500, Ju = "dev-events-log", Yu = "dev-events-preserve", Xu = "dev-events-hide-gtm", Zu = [
	"wpcf7beforesubmit",
	"wpcf7submit",
	"wpcf7invalid",
	"wpcf7unaccepted",
	"wpcf7spam",
	"wpcf7aborted",
	"wpcf7mailsent",
	"wpcf7mailfailed",
	"wpcf7statuschanged"
], Z = /* @__PURE__ */ Vt({
	entries: [],
	recording: !0,
	preserve: Bl(Yu, !1) === !0,
	hideGtm: Bl(Xu, !0) !== !1
}), Qu = 0;
function $u(e, t = 0, n = /* @__PURE__ */ new WeakSet()) {
	return e === null || [
		"string",
		"number",
		"boolean"
	].includes(typeof e) ? e : e === void 0 ? "(undefined)" : typeof e == "function" ? `ƒ ${e.name || "anonymous"}` : typeof e == "object" ? e instanceof Element ? `<${Ku(e)}>` : e === window ? "(window)" : e instanceof Document ? "(document)" : e instanceof Date ? e.toISOString() : typeof File < "u" && e instanceof File ? `${e.name} (${e.size} B)` : n.has(e) ? "(circular)" : t >= 6 ? "…" : (n.add(e), e instanceof FormData ? Object.fromEntries([...e].map(([e, r]) => [e, $u(r, t + 1, n)])) : Array.isArray(e) || Object.prototype.toString.call(e) === "[object Arguments]" ? [...e].slice(0, 100).map((e) => $u(e, t + 1, n)) : Object.fromEntries(Object.entries(e).slice(0, 100).map(([e, r]) => [e, $u(r, t + 1, n)]))) : String(e);
}
function ed(e) {
	(Z.recording || e.source === "page") && (Z.entries.push({
		id: ++Qu,
		time: Date.now(),
		...e
	}), Z.entries.length > qu && Z.entries.splice(0, Z.entries.length - qu), !Y.events && e.source !== "page" && Y.eventsUnseen++);
}
function td() {
	Z.entries = [];
}
function nd(e, t = !1) {
	if (Object.prototype.toString.call(e) === "[object Arguments]") {
		let [n, r, i] = e;
		return {
			source: "dataLayer",
			kind: "gtag",
			name: n === "event" ? r : `${n}${r !== void 0 && typeof r != "object" ? ` ${r}` : ""}`,
			call: `gtag('${n}'${r !== void 0 && typeof r != "object" ? `, '${r}'` : ""})`,
			params: $u(typeof r == "object" ? r : i ?? {}),
			early: t
		};
	}
	if (e && typeof e == "object") {
		let { event: n, ...r } = e;
		return {
			source: "dataLayer",
			kind: "push",
			name: n ?? "(variables)",
			params: $u(r),
			early: t
		};
	}
	return {
		source: "dataLayer",
		kind: "push",
		name: String(e),
		params: {},
		early: t
	};
}
var rd = /\/g\/collect(\?|$)/;
function id(e, t = !1) {
	let n;
	try {
		n = new URL(e);
	} catch {
		return null;
	}
	if (!rd.test(n.pathname + n.search)) return null;
	let r = n.searchParams, i = {}, a = {};
	for (let [e, t] of r) e.startsWith("ep.") ? i[e.slice(3)] = t : e.startsWith("epn.") ? i[e.slice(4)] = Number(t) : e.startsWith("up.") ? a[e.slice(3)] = t : e.startsWith("upn.") && (a[e.slice(4)] = Number(t));
	return {
		source: "ga4",
		kind: "hit",
		name: r.get("en") ?? "(hit)",
		params: {
			...i,
			...Object.keys(a).length && { user_properties: a },
			measurement_id: r.get("tid") ?? "",
			page_location: r.get("dl") ?? "",
			...r.get("dt") && { page_title: r.get("dt") }
		},
		url: e,
		early: t
	};
}
var ad = !1;
function od() {
	if (ad) return;
	if (ad = !0, Z.preserve) {
		let e = Rl(Ju, []);
		e.length && (Z.entries = e.map((e) => ({
			...e,
			previous: !0
		})), Qu = Math.max(0, ...e.map((e) => e.id)), ed({
			source: "page",
			name: "reload",
			url: location.pathname + location.search
		}));
	}
	Z.entries.length || ed({
		source: "page",
		name: "load",
		url: location.pathname + location.search
	});
	let e = null, t = 0, n = () => {
		if (window.dataLayer === e && Array.isArray(e)) for (; t < e.length; t++) ed(nd(e[t], !1));
	}, r = () => {
		window.dataLayer = window.dataLayer || [], window.dataLayer !== e && (e = window.dataLayer, e.forEach((e) => ed(nd(e, !0))), t = e.length);
		let r = e.push;
		if (r.wgDevTools) return;
		let i = function(...e) {
			let t = r.apply(this, e);
			return n(), t;
		};
		i.wgDevTools = !0, e.push = i;
	};
	if (r(), Zu.forEach((e) => document.addEventListener(e, (t) => {
		let n = t.target instanceof Element ? t.target : null;
		ed({
			source: "cf7",
			kind: "event",
			name: e,
			target: n ? `<${Ku(n)}>` : "",
			params: $u(t.detail ?? {})
		});
	}, !0)), "PerformanceObserver" in window) {
		let e = !1, t = new PerformanceObserver((t) => {
			t.getEntries().forEach((t) => {
				let n = id(t.name, !e);
				n && ed(n);
			});
		});
		try {
			t.observe({
				type: "resource",
				buffered: !0
			});
		} catch {}
		setTimeout(() => {
			e = !0;
		});
	}
	let i = location.pathname + location.search, a = () => {
		let e = location.pathname + location.search;
		e !== i && (i = e, ed({
			source: "page",
			name: "navigation",
			url: e
		}));
	};
	window.addEventListener("popstate", a), setInterval(() => {
		r(), n(), a();
	}, 500);
}
Qn(() => Z.preserve, (e) => {
	Vl(Yu, e), e || zl(Ju, null);
}), Qn(() => Z.hideGtm, (e) => Vl(Xu, e));
var sd = null;
Qn(() => Z.entries.at(-1)?.id, () => {
	Z.preserve && !sd && (sd = setTimeout(() => {
		sd = null, zl(Ju, Z.entries);
	}, 1e3));
});
//#endregion
//#region src/tools/events/PayloadTree.vue
var cd = {
	key: 0,
	class: "text-muted-foreground"
}, ld = {
	key: 0,
	class: "flex items-center gap-1"
}, ud = ["aria-expanded", "onClick"], dd = { class: "text-foreground" }, fd = { class: "text-muted-foreground" }, pd = {
	key: 1,
	class: "flex min-w-0 gap-2 pl-4"
}, md = { class: "text-foreground flex-none" }, hd = {
	__name: "PayloadTree",
	props: {
		value: {
			type: null,
			required: !0
		},
		depth: {
			type: Number,
			default: 0
		}
	},
	setup(e) {
		let t = e, n = (e) => typeof e == "object" && !!e, r = (e) => Array.isArray(e) ? e.map((e, t) => [t, e]) : Object.entries(e), i = (e) => Array.isArray(e) ? `[${e.length}]` : `{${Object.keys(e).length}}`, a = /* @__PURE__ */ M(Object.fromEntries(r(t.value).map(([e]) => [e, t.depth < 1])));
		return (e, o) => {
			let s = br("PayloadTree", !0);
			return L(), R("ul", { class: k(["font-mono text-[11px] leading-5", t.depth && "border-border ml-1.5 border-l pl-2"]) }, [r(t.value).length ? U("", !0) : (L(), R("li", cd, "(empty)")), (L(!0), R(I, null, F(r(t.value), ([e, o]) => (L(), R("li", { key: e }, [n(o) && r(o).length ? (L(), R("div", ld, [B("button", {
				type: "button",
				class: "hover:bg-muted -ml-1 flex min-w-0 items-center gap-1 rounded-sm px-1 text-left",
				"aria-expanded": a.value[e],
				onClick: (t) => a.value[e] = !a.value[e]
			}, [
				V(N(Bo), { class: k(["text-muted-foreground size-3 flex-none transition-transform", a.value[e] && "rotate-90"]) }, null, 8, ["class"]),
				B("span", dd, A(e), 1),
				B("span", fd, A(i(o)), 1)
			], 8, ud)])) : (L(), R("div", pd, [B("span", md, A(e), 1), B("span", { class: k(["min-w-0 break-words", typeof o == "string" ? "text-green-700" : typeof o == "number" || typeof o == "boolean" ? "text-blue-600" : "text-muted-foreground"]) }, A(typeof o == "string" ? `"${o}"` : n(o) ? Array.isArray(o) ? "[]" : "{}" : String(o)), 3)])), n(o) && r(o).length && a.value[e] ? (L(), z(s, {
				key: 2,
				value: o,
				depth: t.depth + 1
			}, null, 8, ["value", "depth"])) : U("", !0)]))), 128))], 2);
		};
	}
}, gd = ["aria-expanded"], _d = { class: "text-muted-foreground font-mono text-[10px] tabular-nums" }, vd = { class: "flex min-w-0 items-baseline gap-2" }, yd = { class: "flex-none font-mono text-xs font-semibold" }, bd = {
	key: 0,
	class: "text-muted-foreground flex-none text-[10px]"
}, xd = {
	key: 1,
	class: "text-muted-foreground flex-none text-[10px]",
	title: "Before the dev tools loaded"
}, Sd = { class: "text-muted-foreground min-w-0 truncate font-mono text-[11px]" }, Cd = {
	key: 0,
	class: "bg-muted/30 relative px-4 py-2"
}, wd = {
	key: 0,
	class: "text-muted-foreground mb-1 font-mono text-[11px]"
}, Td = ["title"], Ed = {
	__name: "EventRow",
	props: { entry: {
		type: Object,
		required: !0
	} },
	setup(e) {
		let t = e, n = Jn("root"), r = /* @__PURE__ */ M(!1), i = /* @__PURE__ */ M(!1), a = {
			dataLayer: {
				label: "dataLayer",
				class: "bg-blue-500/15 text-blue-700"
			},
			ga4: {
				label: "GA4",
				class: "bg-emerald-500/15 text-emerald-700"
			},
			cf7: {
				label: "CF7",
				class: "bg-amber-500/20 text-amber-800"
			}
		}, o = (e, t = 2) => String(e).padStart(t, "0"), s = W(() => {
			let e = new Date(t.entry.time);
			return `${o(e.getHours())}:${o(e.getMinutes())}:${o(e.getSeconds())}.${o(e.getMilliseconds(), 3)}`;
		}), c = W(() => Object.entries(t.entry.params ?? {}).filter(([, e]) => typeof e != "object" || !e).slice(0, 4).map(([e, t]) => `${e}: ${t}`).join(" · ")), l = W(() => t.entry.target ? {
			target: t.entry.target,
			detail: t.entry.params
		} : t.entry.params);
		async function u() {
			i.value = await mu(JSON.stringify({
				event: t.entry.name,
				...t.entry.call && { call: t.entry.call },
				...l.value
			}, null, 2), n), setTimeout(() => {
				i.value = !1;
			}, 1200);
		}
		return (e, n) => (L(), R("div", { class: k(["border-b last:border-b-0", t.entry.previous && "opacity-60"]) }, [B("button", {
			type: "button",
			class: k(["hover:bg-muted/60 grid w-full grid-cols-[auto_auto_minmax(0,1fr)] items-baseline gap-x-2 px-4 py-1.5 text-left", r.value && "bg-muted/60"]),
			"aria-expanded": r.value,
			onClick: n[0] ||= (e) => r.value = !r.value
		}, [
			B("span", _d, A(s.value), 1),
			B("span", { class: k(["rounded px-1.5 text-[10px] leading-4 font-semibold", a[t.entry.source].class]) }, A(a[t.entry.source].label), 3),
			B("span", vd, [
				B("span", yd, A(t.entry.name), 1),
				t.entry.kind === "gtag" ? (L(), R("span", bd, "gtag")) : U("", !0),
				t.entry.early ? (L(), R("span", xd, "early")) : U("", !0),
				B("span", Sd, A(t.entry.target || c.value), 1)
			])
		], 10, gd), r.value ? (L(), R("div", Cd, [
			t.entry.call ? (L(), R("p", wd, A(t.entry.call), 1)) : U("", !0),
			t.entry.url ? (L(), R("p", {
				key: 1,
				class: "text-muted-foreground mb-1 truncate pr-6 font-mono text-[10px]",
				title: t.entry.url
			}, A(t.entry.url), 9, Td)) : U("", !0),
			V(hd, { value: l.value }, null, 8, ["value"]),
			V(N(X), {
				size: "icon-xs",
				variant: "ghost",
				class: "absolute top-1.5 right-2",
				title: i.value ? "Copied" : "Copy as JSON",
				"aria-label": "Copy as JSON",
				onClick: u
			}, {
				default: P(() => [V(N(Ko))]),
				_: 1
			}, 8, ["title"])
		])) : U("", !0)], 2));
	}
}, Dd = { class: "border-input focus-within:border-ring focus-within:ring-ring/50 flex h-8 items-center gap-1.5 rounded-md border pl-2 shadow-xs focus-within:ring-3" }, Od = {
	class: "bg-muted flex gap-0.5 rounded-md p-0.5",
	role: "tablist",
	"aria-label": "Source"
}, kd = ["aria-selected", "onClick"], Ad = { class: "text-muted-foreground text-[10px] tabular-nums" }, jd = {
	key: 0,
	class: "text-muted-foreground px-4 py-10 text-center text-sm"
}, Md = { class: "font-medium" }, Nd = ["title"], Pd = { class: "ml-auto flex-none font-mono tabular-nums" }, Fd = { class: "text-xs" }, Id = {
	__name: "EventsPanel",
	emits: ["close"],
	setup(e, { emit: t }) {
		let n = t, r = Jn("root"), i = [
			{
				value: "all",
				label: "All"
			},
			{
				value: "dataLayer",
				label: "dataLayer"
			},
			{
				value: "ga4",
				label: "GA4"
			},
			{
				value: "cf7",
				label: "CF7"
			}
		], a = /* @__PURE__ */ M("all"), o = /* @__PURE__ */ M(""), s = /* @__PURE__ */ M(""), c = /* @__PURE__ */ M(null), l = W(() => {
			let e = o.value.trim().toLowerCase(), t = (t) => (a.value === "all" || t.source === a.value) && !(Z.hideGtm && t.name.startsWith("gtm.")) && (!e || t.name.toLowerCase().includes(e) || JSON.stringify(t.params ?? {}).toLowerCase().includes(e)), n = [], r = null;
			return Z.entries.forEach((e) => {
				if (e.source === "page") {
					r = e;
					return;
				}
				t(e) && (r &&= (n.push(r), null), n.push(e));
			}), n;
		}), u = (e) => Z.entries.filter((t) => t.source !== "page" && (e === "all" || t.source === e)).length, d = () => c.value?.parentElement, f = !0;
		function p() {
			let e = d();
			f = e.scrollHeight - e.scrollTop - e.clientHeight < 24;
		}
		let m = () => Nn(() => {
			let e = d();
			e && (e.scrollTop = e.scrollHeight);
		});
		Qn(() => l.value.length, () => {
			f && m();
		}), gr(() => {
			Y.eventsUnseen = 0, d()?.addEventListener("scroll", p, { passive: !0 }), m();
		});
		async function h() {
			let e = l.value.filter((e) => e.source !== "page").map(({ time: e, source: t, name: n, call: r, target: i, url: a, params: o }) => ({
				time: new Date(e).toISOString(),
				source: t,
				name: n,
				call: r,
				target: i,
				url: a,
				params: o
			}));
			s.value = await mu(JSON.stringify(e, null, 2), r) ? `${e.length} events copied as JSON` : "Copy failed", setTimeout(() => {
				s.value = "";
			}, 1500);
		}
		let g = W(() => [
			{
				label: "Preserve log on reload",
				checked: Z.preserve,
				action: () => {
					Z.preserve = !Z.preserve;
				}
			},
			{
				label: "Hide gtm.* events",
				checked: Z.hideGtm,
				action: () => {
					Z.hideGtm = !Z.hideGtm;
				}
			},
			{ separator: !0 },
			{
				label: "Copy shown as JSON",
				action: h,
				disabled: !l.value.length
			}
		]), _ = (e) => String(e).padStart(2, "0"), v = (e) => {
			let t = new Date(e);
			return `${_(t.getHours())}:${_(t.getMinutes())}:${_(t.getSeconds())}`;
		};
		return (e, t) => (L(), z(pu, {
			title: "Events",
			side: "right",
			"width-key": "dev-events-width",
			onClose: t[2] ||= (e) => n("close")
		}, Tr({
			count: P(() => [H(A(u("all")), 1)]),
			actions: P(() => [
				V(N(X), {
					variant: "ghost",
					size: "icon-sm",
					"aria-pressed": N(Z).recording,
					"aria-label": N(Z).recording ? "Pause recording" : "Record",
					title: N(Z).recording ? "Recording: click to pause" : "Paused: click to record",
					onClick: t[0] ||= (e) => N(Z).recording = !N(Z).recording
				}, {
					default: P(() => [N(Z).recording ? (L(), z(N(Uo), {
						key: 0,
						class: "fill-red-500 text-red-500"
					})) : (L(), z(N(as), { key: 1 }))]),
					_: 1
				}, 8, [
					"aria-pressed",
					"aria-label",
					"title"
				]),
				V(N(X), {
					variant: "ghost",
					size: "icon-sm",
					"aria-label": "Clear",
					title: "Clear the log",
					disabled: !u("all"),
					onClick: N(td)
				}, {
					default: P(() => [V(N(hs))]),
					_: 1
				}, 8, ["disabled", "onClick"]),
				V(tu, { items: g.value }, {
					trigger: P(({ toggle: e, open: t }) => [V(N(X), {
						variant: "ghost",
						size: "icon-sm",
						"aria-label": "More",
						title: "More",
						"aria-expanded": t,
						onClick: e
					}, {
						default: P(() => [V(N(Yo))]),
						_: 1
					}, 8, ["aria-expanded", "onClick"])]),
					_: 1
				}, 8, ["items"])
			]),
			header: P(() => [B("div", Dd, [V(N(fs), { class: "text-muted-foreground size-3.5 flex-none" }), Gn(B("input", {
				"onUpdate:modelValue": t[1] ||= (e) => o.value = e,
				type: "search",
				placeholder: "Filter by name or value",
				"aria-label": "Filter events",
				class: "placeholder:text-muted-foreground h-full min-w-0 flex-1 bg-transparent text-sm outline-none"
			}, null, 512), [[io, o.value]])]), B("div", Od, [(L(), R(I, null, F(i, (e) => B("button", {
				key: e.value,
				type: "button",
				role: "tab",
				"aria-selected": a.value === e.value,
				class: k(["flex flex-1 items-center justify-center gap-1.5 rounded-sm px-2.5 py-1 text-xs", a.value === e.value ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"]),
				onClick: (t) => a.value = e.value
			}, [H(A(e.label) + " ", 1), B("span", Ad, A(u(e.value)), 1)], 10, kd)), 64))])]),
			default: P(() => [B("div", {
				ref_key: "list",
				ref: c
			}, [l.value.length ? U("", !0) : (L(), R("p", jd, A(N(Z).recording ? "Nothing yet: events show here as they happen." : "Paused: nothing is recorded."), 1)), (L(!0), R(I, null, F(l.value, (e) => (L(), R(I, { key: e.id }, [e.source === "page" ? (L(), R("div", {
				key: 0,
				class: k(["bg-muted/50 text-muted-foreground sticky top-0 z-[5] flex items-center gap-2 border-b px-4 py-1 text-[11px] backdrop-blur", e.previous && "opacity-60"])
			}, [
				B("span", Md, A(e.name === "reload" ? "Reloaded" : e.name === "load" ? "Loaded" : "Navigated to"), 1),
				B("span", {
					class: "text-foreground min-w-0 truncate font-mono",
					title: e.url
				}, A(e.url), 9, Nd),
				B("span", Pd, A(v(e.time)), 1)
			], 2)) : (L(), z(Ed, {
				key: 1,
				entry: e
			}, null, 8, ["entry"]))], 64))), 128))], 512)]),
			_: 2
		}, [s.value ? {
			name: "footer",
			fn: P(() => [B("p", Fd, A(s.value), 1)]),
			key: "0"
		} : void 0]), 1024));
	}
}, Ld = /*@__PURE__*/ Object.assign({ inheritAttrs: !1 }, {
	__name: "NativeSelect",
	props: {
		modelValue: {
			type: null,
			required: !1
		},
		class: {
			type: [
				Boolean,
				null,
				String,
				Object,
				Array
			],
			required: !1,
			skipCheck: !0
		},
		wrapperClass: {
			type: [
				Boolean,
				null,
				String,
				Object,
				Array
			],
			required: !1,
			skipCheck: !0
		},
		iconClass: {
			type: [
				Boolean,
				null,
				String,
				Object,
				Array
			],
			required: !1,
			skipCheck: !0
		}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = e, r = /* @__PURE__ */ Ts(n, "modelValue", t, {
			passive: !0,
			defaultValue: ""
		}), i = Cs(n, "class", "wrapperClass", "iconClass");
		return (e, t) => (L(), R("div", {
			class: k(N(Ol)("group/native-select relative w-fit has-[select:disabled]:opacity-50", n.wrapperClass)),
			"data-slot": "native-select-wrapper"
		}, [Gn(B("select", Ui({
			...e.$attrs,
			...N(i)
		}, {
			"onUpdate:modelValue": t[0] ||= (e) => /* @__PURE__ */ Qt(r) ? r.value = e : null,
			"data-slot": "native-select",
			class: N(Ol)("border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 dark:hover:bg-input/50 h-9 w-full min-w-0 appearance-none rounded-md border bg-transparent px-3 py-2 pr-9 text-sm shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3", "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", n.class)
		}), [Er(e.$slots, "default")], 16), [[ao, N(r)]]), V(N(zo), {
			class: k(N(Ol)("text-muted-foreground pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 opacity-50 select-none", n.iconClass)),
			"aria-hidden": "true",
			"data-slot": "native-select-icon"
		}, null, 8, ["class"])], 2));
	}
}), Rd = {
	__name: "NativeSelectOption",
	props: { class: {
		type: [
			Boolean,
			null,
			String,
			Object,
			Array
		],
		required: !1,
		skipCheck: !0
	} },
	setup(e) {
		let t = e;
		return (e, n) => (L(), R("option", {
			"data-slot": "native-select-option",
			class: k(N(Ol)("bg-popover text-popover-foreground", t.class))
		}, [Er(e.$slots, "default")], 2));
	}
}, zd = [
	"input",
	"change",
	"reset"
], Bd = (e) => e instanceof File ? `${e.name || "(no file)"} — ${e.size} B, ${e.type || "?"}` : String(e);
function Vd(e, t) {
	let n = {};
	try {
		n = t?.(e) ?? {};
	} catch {}
	return {
		entries: [...n.data instanceof FormData ? n.data : new FormData(e)].map(([e, t]) => [e, Bd(t)]),
		hidden: [...n.hidden ?? []],
		errors: { ...n.errors ?? {} },
		label: n.label ?? Hd(e),
		endpoint: n.endpoint ?? `${(e.getAttribute("method") || "get").toUpperCase()} ${e.action}`
	};
}
function Hd(e, t = null) {
	return e.id ? `#${e.id}` : e.getAttribute("name") ? e.getAttribute("name") : t === null ? "form" : `form ${t + 1}`;
}
function Ud(e) {
	let t = {};
	return e.filter(([e]) => !e.startsWith("_")).forEach(([e, n]) => {
		let r = e.replace(/\[\]$/, "");
		t[r] = r in t ? [].concat(t[r], n) : e.endsWith("[]") ? [n] : n;
	}), JSON.stringify(t, null, 2);
}
//#endregion
//#region src/tools/form/FormPanel.vue
var Wd = {
	key: 0,
	class: "bg-muted flex gap-0.5 overflow-x-auto rounded-md p-0.5",
	role: "tablist",
	"aria-label": "Form"
}, Gd = [
	"aria-selected",
	"title",
	"onClick"
], Kd = {
	key: 2,
	class: "flex min-w-0 items-center gap-2"
}, qd = {
	key: 0,
	class: "bg-muted flex-none rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold"
}, Jd = ["title"], Yd = {
	key: 0,
	class: "text-muted-foreground px-4 py-6 text-center text-sm"
}, Xd = {
	key: 1,
	class: "grid gap-5 p-4"
}, Zd = { class: "text-muted-foreground mb-2 text-xs font-bold tracking-wide uppercase" }, Qd = { class: "ml-1 font-normal normal-case" }, $d = {
	key: 0,
	class: "text-muted-foreground text-xs"
}, ef = { class: "font-mono text-[11px] font-medium break-all" }, tf = { key: 0 }, nf = { class: "text-muted-foreground mb-2 text-xs font-bold tracking-wide uppercase" }, rf = { class: "ml-1 font-normal normal-case" }, af = { class: "font-mono text-[11px] font-medium break-all" }, of = { class: "text-destructive text-[11px]" }, sf = { key: 1 }, cf = { class: "text-muted-foreground mb-2 text-xs font-bold tracking-wide uppercase" }, lf = { class: "ml-1 font-normal normal-case" }, uf = { key: 2 }, df = { class: "text-muted-foreground mb-2 text-xs font-bold tracking-wide uppercase" }, ff = { class: "ml-1 font-normal normal-case" }, pf = { class: "font-mono text-[11px] break-all" }, mf = { class: "font-mono text-[11px] break-words whitespace-pre-wrap" }, hf = { class: "text-xs" }, gf = 3, _f = {
	__name: "FormPanel",
	emits: ["close"],
	setup(e, { emit: t }) {
		let n = t, { forms: r } = Jn("config"), i = Jn("root"), a = /* @__PURE__ */ $t([]), o = /* @__PURE__ */ M(0), s = /* @__PURE__ */ M(null), c = /* @__PURE__ */ M(""), l = W(() => a.value[o.value] ?? null);
		function u() {
			a.value = Yt([...document.querySelectorAll(r.selector)].filter((e) => !Wu(e)));
			let e = a.value.findIndex((e) => e.contains(document.activeElement));
			o.value = Math.max(0, e);
		}
		let d = "";
		function f() {
			if (l.value && !l.value.isConnected && u(), !l.value) {
				s.value = null, d = "";
				return;
			}
			let e = Vd(l.value, r.read), t = JSON.stringify(e);
			t !== d && (s.value = e, d = t);
		}
		let p = () => setTimeout(f);
		Qn(l, (e, t) => {
			zd.forEach((e) => t?.removeEventListener(e, p)), zd.forEach((t) => e?.addEventListener(t, p)), f();
		});
		let m = null;
		gr(() => {
			u(), f(), m = setInterval(f, 500);
		}), vr(() => {
			clearInterval(m), zd.forEach((e) => l.value?.removeEventListener(e, p));
		});
		let h = W(() => s.value?.entries.filter(([e]) => !e.startsWith("_")) ?? []), g = W(() => s.value?.entries.filter(([e]) => e.startsWith("_")) ?? []), _ = W(() => Object.entries(s.value?.errors ?? {})), v = W(() => s.value?.hidden ?? []);
		async function y() {
			c.value = await mu(Ud(s.value.entries), i) ? "Values copied as JSON" : "Copy failed", setTimeout(() => {
				c.value = "";
			}, 1500);
		}
		let b = W(() => {
			let [e, ...t] = (s.value?.endpoint ?? "").split(" ");
			return /^[A-Z]+$/.test(e) ? {
				method: e,
				url: t.join(" ")
			} : {
				method: "",
				url: s.value?.endpoint ?? ""
			};
		});
		return (e, t) => (L(), z(pu, {
			title: "Form",
			side: "right",
			"width-key": "dev-form-width",
			onClose: t[1] ||= (e) => n("close")
		}, Tr({
			count: P(() => [s.value ? (L(), R(I, { key: 0 }, [H(A(s.value.label) + " · " + A(h.value.length) + " value" + A(h.value.length === 1 ? "" : "s"), 1)], 64)) : U("", !0)]),
			actions: P(() => [V(N(X), {
				variant: "ghost",
				size: "icon-sm",
				"aria-label": "Copy the values as JSON",
				title: "Copy the values as JSON",
				disabled: !s.value,
				onClick: y
			}, {
				default: P(() => [V(N(Ko))]),
				_: 1
			}, 8, ["disabled"])]),
			header: P(() => [a.value.length > 1 && a.value.length <= gf ? (L(), R("div", Wd, [(L(!0), R(I, null, F(a.value, (e, t) => (L(), R("button", {
				key: t,
				type: "button",
				role: "tab",
				"aria-selected": Number(o.value) === t,
				class: k(["min-w-0 flex-1 truncate rounded-sm px-2.5 py-1 font-mono text-xs", Number(o.value) === t ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"]),
				title: N(Hd)(e, t),
				onClick: (e) => o.value = t
			}, A(N(Hd)(e, t)), 11, Gd))), 128))])) : a.value.length > gf ? (L(), z(N(Ld), {
				key: 1,
				modelValue: o.value,
				"onUpdate:modelValue": t[0] ||= (e) => o.value = e,
				"wrapper-class": "w-full",
				"icon-class": "right-2 size-3.5",
				class: "h-8 py-0 pr-7 pl-2 font-mono text-xs",
				"aria-label": "Form"
			}, {
				default: P(() => [(L(!0), R(I, null, F(a.value, (e, t) => (L(), z(N(Rd), {
					key: t,
					value: t
				}, {
					default: P(() => [H(A(N(Hd)(e, t)), 1)]),
					_: 2
				}, 1032, ["value"]))), 128))]),
				_: 1
			}, 8, ["modelValue"])) : U("", !0), s.value ? (L(), R("div", Kd, [b.value.method ? (L(), R("span", qd, A(b.value.method), 1)) : U("", !0), B("span", {
				class: "text-muted-foreground min-w-0 truncate font-mono text-[11px]",
				title: b.value.url
			}, A(b.value.url), 9, Jd)])) : U("", !0)]),
			default: P(() => [a.value.length ? s.value ? (L(), R("div", Xd, [
				B("section", null, [
					B("h3", Zd, [t[2] ||= H("Sent ", -1), B("small", Qd, A(h.value.length), 1)]),
					h.value.length ? U("", !0) : (L(), R("p", $d, "Nothing")),
					(L(!0), R(I, null, F(h.value, ([e, t], n) => (L(), R("div", {
						key: `${e}-${n}`,
						class: "hover:bg-muted -mx-2 grid grid-cols-[minmax(6rem,35%)_1fr] gap-3 rounded px-2 py-1"
					}, [B("span", ef, A(e), 1), B("span", { class: k(["font-mono text-[11px] break-words whitespace-pre-wrap", t === "" && "text-muted-foreground"]) }, A(t === "" ? "empty" : t), 3)]))), 128))
				]),
				_.value.length ? (L(), R("section", tf, [B("h3", nf, [t[3] ||= H("Errors shown ", -1), B("small", rf, A(_.value.length), 1)]), (L(!0), R(I, null, F(_.value, ([e, t]) => (L(), R("div", {
					key: e,
					class: "bg-destructive/10 -mx-2 grid grid-cols-[minmax(6rem,35%)_1fr] gap-3 rounded px-2 py-1"
				}, [B("span", af, A(e), 1), B("span", of, A(t), 1)]))), 128))])) : U("", !0),
				v.value.length ? (L(), R("section", sf, [B("h3", cf, [t[4] ||= H("Hidden by a condition, not sent ", -1), B("small", lf, A(v.value.length), 1)]), (L(!0), R(I, null, F(v.value, (e) => (L(), R("div", {
					key: e,
					class: "-mx-2 px-2 py-1 font-mono text-[11px] font-medium"
				}, A(e), 1))), 128))])) : U("", !0),
				g.value.length ? (L(), R("section", uf, [B("h3", df, [t[5] ||= H("Underscored, sent ", -1), B("small", ff, A(g.value.length), 1)]), (L(!0), R(I, null, F(g.value, ([e, t], n) => (L(), R("div", {
					key: `${e}-${n}`,
					class: "text-muted-foreground -mx-2 grid grid-cols-[minmax(6rem,35%)_1fr] gap-3 rounded px-2 py-1"
				}, [B("span", pf, A(e), 1), B("span", mf, A(t), 1)]))), 128))])) : U("", !0)
			])) : U("", !0) : (L(), R("p", Yd, "No form on this page."))]),
			_: 2
		}, [c.value ? {
			name: "footer",
			fn: P(() => [B("p", hf, A(c.value), 1)]),
			key: "0"
		} : void 0]), 1024));
	}
}, vf = {
	class: "pointer-events-none fixed inset-0",
	"aria-hidden": "true"
}, yf = {
	__name: "GridOverlay",
	setup(e) {
		let { grid: t } = Jn("config"), n = /* @__PURE__ */ M(null), r = /* @__PURE__ */ M(0);
		function i() {
			r.value = Math.max(0, Math.round(Number(getComputedStyle(n.value).getPropertyValue("--columns")))) || 0;
		}
		return gr(() => {
			i(), window.addEventListener("resize", i, { passive: !0 });
		}), vr(() => window.removeEventListener("resize", i)), (e, i) => (L(), R("div", vf, [B("div", {
			ref_key: "overlay",
			ref: n,
			class: "mx-auto grid h-full w-full",
			style: ue({
				"--columns": N(t).columns,
				maxWidth: N(t).maxWidth,
				gap: N(t).gap,
				paddingInline: N(t).margin,
				gridTemplateColumns: `repeat(${r.value || 1}, minmax(0, 1fr))`
			})
		}, [(L(!0), R(I, null, F(r.value, (e) => (L(), R("div", {
			key: e,
			class: "bg-red-500/10"
		}))), 128))], 4)]));
	}
};
//#endregion
//#region src/lib/bytes.js
function bf(e) {
	return e == null ? "—" : e < 1024 ? `${e} B` : e < 1048576 ? `${Math.round(e / 1024)} KB` : `${(e / 1024 / 1024).toFixed(1)} MB`;
}
var xf = {
	avif: "avif",
	webp: "webp",
	jpg: "jpg",
	jpeg: "jpg",
	png: "png",
	gif: "gif",
	svg: "svg"
};
function Sf(e) {
	if (!e) return null;
	let t = e.match(/^data:image\/([\w+.-]+)/);
	if (t) return xf[t[1].replace("svg+xml", "svg")] ?? t[1];
	try {
		let t = new URL(e, location.href).pathname.match(/\.(\w+)$/)?.[1].toLowerCase();
		return xf[t] ?? t ?? null;
	} catch {
		return null;
	}
}
var Cf = (e) => {
	if (!e) return "";
	if (e.startsWith("data:")) return "data URI";
	try {
		return decodeURIComponent(new URL(e, location.href).pathname.split("/").pop());
	} catch {
		return e;
	}
}, wf = (e) => e.getAttribute("srcset") || e.dataset.srcset || "";
function Tf(e) {
	let t = e.parentElement?.localName === "picture" ? e.parentElement : null, n = [...t ? t.querySelectorAll("source") : [], e], r = [], i = n.flatMap((t) => wf(t).split(/,\s+(?=\S)/).map((e) => e.trim()).filter(Boolean).map((n) => {
		let [r, i = ""] = n.split(/\s+/), a = r;
		try {
			a = new URL(r, location.href).href;
		} catch {}
		return {
			url: a,
			descriptor: i,
			type: t.getAttribute("type")?.replace("image/", "") ?? null,
			media: t.getAttribute("media"),
			chosen: a === e.currentSrc
		};
	}));
	return i.forEach((e) => r.includes(e.type) || r.push(e.type)), i.sort((e, t) => r.indexOf(e.type) - r.indexOf(t.type) || (parseFloat(e.descriptor) || 1) - (parseFloat(t.descriptor) || 1));
}
function Ef(e, t) {
	let n = (e || "").split(/,(?![^(]*\))/).map((e) => e.trim()).filter(Boolean);
	for (let e of n) {
		let [, t, n] = e.match(/^(\(.*\))\s+(.+)$/) ?? [
			null,
			null,
			e
		];
		if (t && !window.matchMedia(t).matches) continue;
		if (n === "auto") break;
		let r = document.createElement("div");
		r.style.cssText = `position:absolute;visibility:hidden;pointer-events:none;width:${n}`, document.body.append(r);
		let i = r.getBoundingClientRect().width;
		if (r.remove(), i) return i;
	}
	return t.getBoundingClientRect().width || window.innerWidth;
}
function Df(e) {
	let t = e.parentElement?.localName === "picture" ? e.parentElement : null, n = [...t ? t.querySelectorAll("source") : []].find((e) => wf(e) && (!e.media || window.matchMedia(e.media).matches)) ?? e, r = wf(n).split(/,\s+(?=\S)/).map((e) => e.trim()).filter(Boolean).map((e) => {
		let [t, n = "1x"] = e.split(/\s+/);
		return {
			url: t,
			width: n.endsWith("w") ? parseFloat(n) : null,
			density: n.endsWith("x") ? parseFloat(n) : null
		};
	});
	if (!r.length) return null;
	let i = window.devicePixelRatio || 1, a = r.filter((e) => e.width).sort((e, t) => e.width - t.width);
	if (a.length) {
		let t = Ef(n.getAttribute("sizes") || e.getAttribute("sizes"), e) * i;
		return new URL((a.find((e) => e.width >= t) ?? a.at(-1)).url, location.href).href;
	}
	let o = r.filter((e) => e.density).sort((e, t) => e.density - t.density);
	return new URL((o.find((e) => e.density >= i) ?? o.at(-1) ?? r[0]).url, location.href).href;
}
var Of = (e) => !e.currentSrc && !e.getAttribute("src") && !!(e.dataset.src || e.dataset.srcset || e.parentElement?.querySelector("source[data-srcset]"));
function kf(e) {
	if (!e || e.startsWith("data:")) return null;
	let t = new URL(e, location.href).href, n = performance.getEntriesByName(t).at(-1);
	return n && (n.encodedBodySize || n.transferSize) || Af.get(t) || null;
}
var Af = /* @__PURE__ */ new Map();
async function jf(e) {
	let t = (e) => new URL(e.src, location.href).href, n = e.filter((e) => e.bytes === null && e.src && !e.placeholder), r = [...new Set(n.map(t))].filter((e) => !Af.has(e));
	await Promise.all(r.map(async (e) => {
		Af.set(e, null);
		try {
			let t = await yu(e, {
				method: "HEAD",
				cache: "force-cache",
				credentials: "same-origin"
			}), n = Number(t.headers.get("content-length"));
			Af.set(e, n > 0 ? n : null);
		} catch {}
	}));
	let i = !1;
	return n.forEach((e) => {
		let n = Af.get(t(e));
		n && (e.pending ? e.expectedBytes = n : (e.bytes = n, e.bytesFrom = "server", e.wasted = Mf(n, e.ratio)), i = !0);
	}), i;
}
var Mf = (e, t) => e && t > 1.5 ? Math.round(e * (1 - 1 / (t * t))) : 0;
function Nf(e = null) {
	let t = window.devicePixelRatio || 1;
	return [...document.querySelectorAll("img")].filter((e) => !Wu(e)).map((n, r) => {
		let i = n.getBoundingClientRect(), a = i.width > 0 && i.height > 0, o = Of(n), s = n.currentSrc || n.src || (o ? Df(n) || n.dataset.src : "") || "", c = n.complete && n.naturalWidth > 0, l = Sf(s), u = s.startsWith("data:"), d = {
			width: Math.round(i.width * t),
			height: Math.round(i.height * t)
		}, f = c && a && l !== "svg" ? n.naturalWidth / d.width : null, p = o ? null : kf(s), m = a && i.top + window.scrollY < window.innerHeight, h = n.getAttribute("loading") === "lazy" ? "lazy" : o || n.hasAttribute("data-src") || n.hasAttribute("data-srcset") ? "lazy (script)" : null, g = [];
		n.complete && !c && !o && s && !u && g.push({
			key: "broken",
			label: "broken",
			level: "error"
		}), f !== null && f > 1.5 && n.naturalWidth - d.width > 200 && g.push({
			key: "oversized",
			label: `oversized ×${f.toFixed(1)}`,
			level: "warning"
		}), f !== null && f < .9 && g.push({
			key: "blurry",
			label: `blurry ×${f.toFixed(2)}`,
			level: "warning"
		}), h && m && g.push({
			key: "lazy-fold",
			label: "lazy above the fold",
			level: "warning"
		}), n.hasAttribute("alt") || g.push({
			key: "alt",
			label: "no alt",
			level: "warning"
		});
		let _ = Mf(p, f);
		return {
			index: r,
			element: n,
			src: s,
			file: Cf(s),
			format: l,
			placeholder: u,
			loaded: c,
			pending: o,
			shown: a,
			natural: {
				width: n.naturalWidth,
				height: n.naturalHeight
			},
			rendered: {
				width: Math.round(i.width),
				height: Math.round(i.height)
			},
			needed: d,
			density: t,
			ratio: f,
			bytes: p,
			wasted: _,
			lazy: h,
			aboveFold: m,
			lcp: n === e,
			attributes: {
				src: n.getAttribute("src"),
				sizes: n.getAttribute("sizes"),
				loading: n.getAttribute("loading"),
				decoding: n.getAttribute("decoding"),
				fetchpriority: n.getAttribute("fetchpriority"),
				alt: n.getAttribute("alt")
			},
			candidates: Tf(n),
			issues: g
		};
	});
}
var Pf = null;
function Ff() {
	try {
		performance.setResourceTimingBufferSize(5e3);
	} catch {}
	if ("PerformanceObserver" in window) try {
		new PerformanceObserver((e) => {
			let t = e.getEntries().at(-1);
			t?.element && (Pf = t.element);
		}).observe({
			type: "largest-contentful-paint",
			buffered: !0
		});
	} catch {}
}
var If = () => Pf, Lf = { class: "flex items-center gap-2" }, Rf = {
	class: "bg-muted flex gap-0.5 rounded-md p-0.5",
	role: "tablist",
	"aria-label": "Show"
}, zf = ["aria-selected", "onClick"], Bf = { class: "text-muted-foreground text-[10px] tabular-nums" }, Vf = ["value"], Hf = ["value"], Uf = {
	key: 0,
	class: "text-xs text-amber-800"
}, Wf = {
	key: 0,
	class: "text-muted-foreground px-4 py-10 text-center text-sm"
}, Gf = ["onMouseenter"], Kf = ["title", "onClick"], qf = ["src"], Jf = ["aria-expanded", "onClick"], Yf = { class: "flex min-w-0 items-center gap-1.5" }, Xf = ["title"], Zf = {
	key: 1,
	class: "bg-highlight flex-none rounded px-1 text-[10px] leading-4 font-semibold text-white",
	title: "The page's Largest Contentful Paint"
}, Qf = { class: "text-muted-foreground font-mono text-[11px] tabular-nums" }, $f = ["title"], ep = ["title"], tp = {
	key: 0,
	class: "flex flex-wrap gap-1"
}, np = {
	key: 0,
	class: "bg-muted text-muted-foreground rounded px-1.5 text-[10px] leading-4",
	title: "Still the inline placeholder: the image has not loaded"
}, rp = {
	key: 0,
	class: "bg-muted/30 grid gap-2 px-4 py-2 text-xs"
}, ip = {
	key: 0,
	class: "text-muted-foreground"
}, ap = { key: 1 }, op = { class: "text-muted-foreground mb-0.5" }, sp = { class: "tabular-nums" }, cp = ["title"], lp = { class: "grid grid-cols-[6rem_minmax(0,1fr)] gap-x-3 gap-y-0.5" }, up = { class: "text-muted-foreground" }, dp = ["title"], fp = ["title"], pp = { class: "text-xs" }, mp = "dev-images-filter", hp = "dev-images-order", gp = "dev-images-hidden", _p = {
	__name: "ImagesPanel",
	emits: ["close"],
	setup(e, { emit: t }) {
		let n = t, r = Jn("root"), i = /* @__PURE__ */ $t([]), a = /* @__PURE__ */ M(Rl(mp, "all")), o = /* @__PURE__ */ M(Rl(hp, "page")), s = /* @__PURE__ */ M(Rl(gp, !0) === !0), c = /* @__PURE__ */ M(/* @__PURE__ */ new Set()), l = /* @__PURE__ */ M("");
		async function u() {
			let e = Yt(Nf(If()));
			i.value = e, await jf(e) && i.value === e && (i.value = Yt([...e]));
		}
		gr(u), vr(Co);
		let d = W(() => s.value ? i.value : i.value.filter((e) => e.shown)), f = W(() => d.value.filter((e) => e.issues.some((e) => e.level !== "info"))), p = W(() => new Map(i.value.filter((e) => e.bytes).map((e) => [e.src, e]))), m = W(() => [...p.value.values()].reduce((e, t) => e + t.bytes, 0)), h = W(() => {
			let e = /* @__PURE__ */ new Map();
			return i.value.forEach((t) => e.set(t.src, Math.max(e.get(t.src) ?? 0, t.wasted))), [...e.values()].reduce((e, t) => e + t, 0);
		}), g = W(() => {
			let e = a.value === "issues" ? f.value : d.value;
			return o.value === "weight" ? [...e].sort((e, t) => (t.bytes ?? -1) - (e.bytes ?? -1)) : o.value === "waste" ? [...e].sort((e, t) => t.wasted - e.wasted || (t.ratio ?? 0) - (e.ratio ?? 0)) : e;
		});
		function _(e) {
			a.value = e, zl(mp, e);
		}
		function v(e) {
			o.value = e, zl(hp, e);
		}
		function y() {
			s.value = !s.value, zl(gp, s.value);
		}
		function b(e) {
			let t = new Set(c.value);
			t.has(e.index) ? t.delete(e.index) : t.add(e.index), c.value = t;
		}
		let x = (e) => `${e.natural.width}×${e.natural.height} in ${e.rendered.width}×${e.rendered.height}`, S = null;
		function C(e) {
			S = e.element, So([e.element], x(e));
		}
		function w() {
			S = null, Co();
		}
		function T(e) {
			e.element.scrollIntoView({
				behavior: "smooth",
				block: "center"
			});
			let t = () => {
				S === e.element && So([e.element], x(e));
			};
			window.addEventListener("scrollend", t, { once: !0 }), setTimeout(t, 700);
		}
		let ee = {
			avif: "bg-emerald-500/15 text-emerald-700",
			webp: "bg-emerald-500/15 text-emerald-700",
			svg: "bg-blue-500/15 text-blue-700",
			jpg: "bg-amber-500/20 text-amber-800",
			png: "bg-amber-500/20 text-amber-800"
		}, te = {
			error: "bg-destructive/15 text-destructive",
			warning: "bg-amber-500/20 text-amber-800",
			info: "bg-muted text-muted-foreground"
		};
		async function E() {
			let e = g.value.map(({ element: e, ...t }) => t);
			l.value = await mu(JSON.stringify(e, null, 2), r) ? `${e.length} images copied as JSON` : "Copy failed", setTimeout(() => {
				l.value = "";
			}, 1500);
		}
		let ne = W(() => [{
			label: "Copy shown as JSON",
			action: E,
			disabled: !g.value.length
		}]), re = W(() => [{
			value: "all",
			label: "All",
			count: d.value.length
		}, {
			value: "issues",
			label: "Issues",
			count: f.value.length
		}]), ie = [
			{
				value: "page",
				label: "Page order"
			},
			{
				value: "weight",
				label: "Heaviest"
			},
			{
				value: "waste",
				label: "Most oversized"
			}
		];
		return (e, t) => (L(), z(pu, {
			title: "Images",
			side: "right",
			"width-key": "dev-images-width",
			onClose: t[1] ||= (e) => n("close")
		}, Tr({
			count: P(() => [H(A(i.value.length) + " · " + A(N(bf)(m.value)) + " in " + A(p.value.size) + " file" + A(p.value.size === 1 ? "" : "s"), 1)]),
			actions: P(() => [V(N(X), {
				variant: "ghost",
				size: "icon-sm",
				"aria-label": "Refresh",
				title: "Read the images again: lazy ones arrive as the page scrolls",
				onClick: u
			}, {
				default: P(() => [V(N(ls))]),
				_: 1
			}), V(tu, { items: ne.value }, {
				trigger: P(({ toggle: e, open: t }) => [V(N(X), {
					variant: "ghost",
					size: "icon-sm",
					"aria-label": "More",
					title: "More",
					"aria-expanded": t,
					onClick: e
				}, {
					default: P(() => [V(N(Yo))]),
					_: 1
				}, 8, ["aria-expanded", "onClick"])]),
				_: 1
			}, 8, ["items"])]),
			header: P(() => [B("div", Lf, [
				B("div", Rf, [(L(!0), R(I, null, F(re.value, (e) => (L(), R("button", {
					key: e.value,
					type: "button",
					role: "tab",
					"aria-selected": a.value === e.value,
					class: k(["flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-xs", a.value === e.value ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"]),
					onClick: (t) => _(e.value)
				}, [H(A(e.label) + " ", 1), B("span", Bf, A(e.count), 1)], 10, zf))), 128))]),
				V(N(Nl), {
					size: "sm",
					variant: "outline",
					class: "ml-auto h-7 px-2 text-xs",
					"model-value": s.value,
					title: "The images with no box on the page, dimmed",
					"onUpdate:modelValue": y
				}, {
					default: P(() => [...t[2] ||= [H("Hidden", -1)]]),
					_: 1
				}, 8, ["model-value"]),
				B("select", {
					value: o.value,
					class: "text-muted-foreground hover:text-foreground h-7 rounded-md bg-transparent px-1 text-xs outline-none",
					"aria-label": "Order",
					onChange: t[0] ||= (e) => v(e.target.value)
				}, [(L(), R(I, null, F(ie, (e) => B("option", {
					key: e.value,
					value: e.value
				}, A(e.label), 9, Hf)), 64))], 40, Vf)
			]), h.value ? (L(), R("p", Uf, " About " + A(N(bf)(h.value)) + " could be saved with images sized for their boxes. ", 1)) : U("", !0)]),
			default: P(() => [g.value.length ? U("", !0) : (L(), R("p", Wf, A(a.value === "issues" ? "No issues." : i.value.length ? "No images shown on the page." : "No images on this page."), 1)), B("ul", { onMouseleave: w }, [(L(!0), R(I, null, F(g.value, (e) => (L(), R("li", {
				key: e.index,
				class: k(["border-b last:border-b-0", !e.shown && "opacity-50"])
			}, [B("div", {
				class: "hover:bg-muted/50 flex gap-3 px-4 py-2",
				onMouseenter: (t) => C(e)
			}, [B("button", {
				type: "button",
				class: k(["flex size-12 flex-none items-center justify-center overflow-hidden rounded-md border", e.loaded || e.placeholder ? "bg-[repeating-conic-gradient(#e5e5e5_0_25%,#fff_0_50%)] bg-[length:8px_8px]" : "bg-muted"]),
				title: (e.shown ? "Scroll to it" : "Not shown: no box on the page") + (e.loaded || e.placeholder ? "" : " · not loaded yet"),
				onClick: (t) => T(e)
			}, [e.loaded || e.placeholder ? (L(), R("img", {
				key: 0,
				src: e.src,
				alt: "",
				class: "size-full object-cover"
			}, null, 8, qf)) : (L(), z(N(Wo), {
				key: 1,
				class: "text-muted-foreground size-4"
			}))], 10, Kf), B("button", {
				type: "button",
				class: "grid min-w-0 flex-1 gap-1 text-left",
				"aria-expanded": c.value.has(e.index),
				onClick: (t) => b(e)
			}, [
				B("span", Yf, [
					e.format ? (L(), R("span", {
						key: 0,
						class: k(["flex-none rounded px-1 text-[10px] leading-4 font-semibold uppercase", ee[e.format] ?? "bg-muted text-muted-foreground"])
					}, A(e.format), 3)) : U("", !0),
					B("span", {
						class: "min-w-0 truncate font-mono text-xs font-medium",
						title: e.src
					}, A(e.file || "(no source)"), 9, Xf),
					e.lcp ? (L(), R("span", Zf, "LCP")) : U("", !0),
					V(N(Bo), { class: k(["text-muted-foreground ml-auto size-3.5 flex-none transition-transform", c.value.has(e.index) && "rotate-90"]) }, null, 8, ["class"])
				]),
				B("span", Qf, [
					e.loaded ? (L(), R(I, { key: 0 }, [H(A(e.natural.width) + "×" + A(e.natural.height), 1)], 64)) : e.pending ? (L(), R(I, { key: 1 }, [H("waiting")], 64)) : (L(), R(I, { key: 2 }, [H("not loaded")], 64)),
					H(" → " + A(e.rendered.width) + "×" + A(e.rendered.height), 1),
					e.density === 1 ? U("", !0) : (L(), R(I, { key: 3 }, [H(" @" + A(e.density) + "x", 1)], 64)),
					t[3] ||= H(" · ", -1),
					e.pending && e.expectedBytes ? (L(), R("span", {
						key: 4,
						class: "opacity-70",
						title: `Not loaded yet: the size of ${e.file}, the candidate the browser will take for its box`
					}, A(N(bf)(e.expectedBytes)) + " when loaded", 9, $f)) : (L(), R("span", {
						key: 5,
						title: e.bytesFrom === "server" ? "From the server's Content-Length: the browser kept no timing for it" : void 0
					}, A(N(bf)(e.bytes)), 9, ep)),
					H(" · " + A(e.lazy ?? "eager"), 1)
				]),
				e.issues.length || e.placeholder ? (L(), R("span", tp, [e.placeholder ? (L(), R("span", np, "placeholder")) : U("", !0), (L(!0), R(I, null, F(e.issues, (e) => (L(), R("span", {
					key: e.key,
					class: k(["rounded px-1.5 text-[10px] leading-4 font-medium", te[e.level]])
				}, A(e.label), 3))), 128))])) : U("", !0)
			], 8, Jf)], 40, Gf), c.value.has(e.index) ? (L(), R("div", rp, [
				e.ratio === null ? U("", !0) : (L(), R("p", ip, [
					H(" Its box needs " + A(e.needed.width) + "×" + A(e.needed.height) + " px at " + A(e.density) + "x: the image has ", 1),
					B("span", { class: k(e.ratio > N(1.5) || e.ratio < N(.9) ? "text-amber-800" : "text-emerald-700") }, "×" + A(e.ratio.toFixed(2)), 3),
					t[4] ||= H(" of that", -1),
					e.wasted ? (L(), R(I, { key: 0 }, [H(", about " + A(N(bf)(e.wasted)) + " more than it needs", 1)], 64)) : U("", !0),
					t[5] ||= H(". ", -1)
				])),
				e.candidates.length ? (L(), R("div", ap, [B("p", op, [t[6] ||= H("srcset ", -1), B("span", sp, A(e.candidates.length), 1)]), (L(!0), R(I, null, F(e.candidates, (e) => (L(), R("p", {
					key: e.url,
					class: k(["truncate font-mono text-[11px]", e.chosen ? "text-foreground font-semibold" : "text-muted-foreground"]),
					title: e.media ? `${e.url} (${e.media})` : e.url
				}, [
					H(A(e.chosen ? "→ " : ""), 1),
					e.type ? (L(), R(I, { key: 0 }, [H(A(e.type) + " · ", 1)], 64)) : U("", !0),
					H(A(e.descriptor || "1x") + " · " + A(e.url.split("/").pop()), 1)
				], 10, cp))), 128))])) : U("", !0),
				B("div", lp, [
					(L(!0), R(I, null, F(e.attributes, (e, t) => (L(), R(I, { key: t }, [B("span", up, A(t), 1), B("span", {
						class: k(["truncate font-mono text-[11px]", e === null && "text-muted-foreground"]),
						title: e ?? ""
					}, A(e === null ? "—" : e === "" ? "\"\"" : e), 11, dp)], 64))), 128)),
					t[7] ||= B("span", { class: "text-muted-foreground" }, "current", -1),
					B("span", {
						class: "truncate font-mono text-[11px]",
						title: e.src
					}, A(e.src), 9, fp)
				])
			])) : U("", !0)], 2))), 128))], 32)]),
			_: 2
		}, [l.value ? {
			name: "footer",
			fn: P(() => [B("p", pp, A(l.value), 1)]),
			key: "0"
		} : void 0]), 1024));
	}
}, vp = /* @__PURE__ */ new WeakSet(), yp = (e) => new Set(e.trim().split(/\s+/)), bp = yp("\n  body\n  header nav main footer aside section article search address hgroup\n  h1 h2 h3 h4 h5 h6\n  p blockquote figure figcaption hr pre ul ol li dl dt dd details summary dialog menu\n  a em strong small s cite q dfn abbr time code kbd samp var sub sup mark del ins br\n  img picture video audio iframe svg canvas object\n  table caption thead tbody tfoot tr th td\n  form fieldset legend label input button select option optgroup textarea output progress meter\n"), xp = yp("script style template noscript link meta source track"), Sp = yp("svg canvas iframe object video audio select textarea"), Cp = {
	"*": ["aria-label"],
	a: ["href"],
	img: ["alt"]
}, wp = (e, t) => [...Cp["*"], ...Cp[t] || []].filter((t) => e.hasAttribute(t)).map((t) => [t, e.getAttribute(t)]), Tp = (e) => `<${e.tag}${e.attributes.map(([e, t]) => ` ${e}="${t.replaceAll("\"", "&quot;")}"`).join("")}>`, Ep = (e) => e.replace(/\s+/g, " "), Dp = (e) => e.ownerDocument === document && !e.getClientRects().length;
function Op(e, t, n = !0) {
	let r = [], i = (e) => {
		let t = r[r.length - 1];
		e.text !== void 0 && t?.text !== void 0 ? t.text = Ep(`${t.text} ${e.text}`) : r.push(e);
	};
	for (let r of e.childNodes) {
		if (r.nodeType === Node.TEXT_NODE) {
			i({ text: Ep(r.textContent) });
			continue;
		}
		if (r.nodeType !== Node.ELEMENT_NODE) continue;
		let e = r.localName;
		if (xp.has(e) || Wu(r) || r.hasAttribute("aria-hidden") && r.getAttribute("aria-hidden") !== "false") continue;
		let a = !n && Dp(r);
		if (!(a && getComputedStyle(r).display !== "contents")) {
			if (!a && (bp.has(e) || t && e === "div")) {
				let a = Sp.has(e) ? [] : Op(r, t, n);
				i({
					tag: e,
					element: r,
					attributes: wp(r, e),
					children: a
				});
			} else Op(r, t, n).forEach(i);
		}
	}
	return r.map((e) => e.text === void 0 ? e : { text: e.text.trim() }).filter((e) => e.text !== "");
}
var kp = (e) => e.map((e) => e.text === void 0 ? kp(e.children) : e.text).filter(Boolean).join(" "), Ap = (e) => e.reduce((e, t) => e + (t.tag ? 1 + Ap(t.children) : 0), 0);
function jp(e, t = 0) {
	let n = "  ".repeat(t);
	if (e.text !== void 0) return n + e.text;
	if (!e.children.length) return n + Tp(e);
	let [r] = e.children;
	return e.children.length === 1 && r.text !== void 0 ? `${n}${Tp(e)}${r.text}</${e.tag}>` : [
		n + Tp(e),
		...e.children.map((e) => jp(e, t + 1)),
		`${n}</${e.tag}>`
	].join("\n");
}
//#endregion
//#region src/tools/outline/OutlineNode.vue
var Mp = { key: 1 }, Np = ["title"], Pp = ["aria-expanded", "aria-label"], Fp = {
	key: 1,
	class: "w-4 flex-none"
}, Ip = { class: "text-muted-foreground" }, Lp = { class: "text-green-700" }, Rp = {
	key: 0,
	class: "text-muted-foreground min-w-0 truncate font-sans"
}, zp = {
	key: 1,
	class: "text-muted-foreground min-w-0 truncate font-sans"
}, Bp = {
	key: 2,
	class: "text-muted-foreground/70 flex-none text-[10px] tabular-nums"
}, Vp = {
	key: 0,
	class: "border-border ml-2 border-l pl-1.5"
}, Hp = {
	__name: "OutlineNode",
	props: {
		item: {
			type: Object,
			required: !0
		},
		showText: {
			type: Boolean,
			default: !0
		},
		laidOut: {
			type: Boolean,
			default: !0
		},
		foldSignal: {
			type: Object,
			required: !0
		}
	},
	setup(e) {
		let t = e, n = t.item, r = n.text !== void 0, i = !r && n.children.length === 1 && n.children[0].text !== void 0, a = !r && n.children.length > 0 && !i, o = /* @__PURE__ */ M(a && !vp.has(n.element));
		Qn(() => t.foldSignal, ({ shut: e }) => {
			o.value = !e;
		}), Qn(o, (e) => {
			a && (e ? vp.delete(n.element) : vp.add(n.element));
		});
		let s = W(() => t.laidOut && !r && Dp(n.element)), c = !r && n.tag === "svg" && !n.element.hasAttribute("aria-label");
		function l() {
			t.laidOut && n.element.ownerDocument === document ? So([n.element]) : Co();
		}
		return (e, u) => {
			let d = br("OutlineNode", !0);
			return r ? (L(), R("li", {
				key: 0,
				class: k(["text-muted-foreground truncate rounded-sm pr-1 pl-5 font-sans", !t.showText && "hidden"])
			}, A(N(n).text), 3)) : (L(), R("li", Mp, [B("div", {
				class: k(["flex min-w-0 items-center gap-1 rounded-sm pr-1", [
					t.laidOut ? "hover:bg-highlight/10" : "hover:bg-muted/60",
					N(a) && "cursor-pointer",
					N(c) && "bg-changed/25"
				]]),
				title: N(c) ? "svg with neither aria-label nor aria-hidden" : void 0,
				onMouseenter: l,
				onClick: u[1] ||= (e) => N(a) && (o.value = !o.value)
			}, [
				N(a) ? (L(), R("button", {
					key: 0,
					type: "button",
					class: "text-muted-foreground hover:text-foreground flex size-4 flex-none items-center justify-center",
					"aria-expanded": o.value,
					"aria-label": o.value ? "Fold" : "Unfold",
					onClick: u[0] ||= fo((e) => o.value = !o.value, ["stop"])
				}, [V(N(Bo), { class: k(["size-3 transition-transform", o.value && "rotate-90"]) }, null, 8, ["class"])], 8, Pp)) : (L(), R("span", Fp)),
				B("span", { class: k(["flex min-w-0 flex-1 items-baseline gap-2", s.value && "opacity-45"]) }, [B("span", { class: k(["min-w-0 flex-[0_1_auto] truncate", N(c) ? "text-amber-700" : "text-blue-600"]) }, [
					H("<" + A(N(n).tag), 1),
					(L(!0), R(I, null, F(N(n).attributes, ([e, t]) => (L(), R(I, { key: e }, [
						u[2] ||= H(A(" "), -1),
						B("span", Ip, A(e), 1),
						u[3] ||= H("=", -1),
						B("span", Lp, "\"" + A(t) + "\"", 1)
					], 64))), 128)),
					u[4] ||= H(">", -1)
				], 2), N(i) && t.showText ? (L(), R("span", Rp, A(N(n).children[0].text), 1)) : N(n).tag === "button" && N(a) && t.showText ? (L(), R("span", zp, A(N(kp)(N(n).children)), 1)) : U("", !0)], 2),
				N(a) ? (L(), R("span", Bp, A(N(Ap)(N(n).children) || ""), 1)) : U("", !0)
			], 42, Np), N(a) && o.value ? (L(), R("ul", Vp, [(L(!0), R(I, null, F(N(n).children, (e, n) => (L(), z(d, {
				key: n,
				item: e,
				"show-text": t.showText,
				"laid-out": t.laidOut,
				"fold-signal": t.foldSignal
			}, null, 8, [
				"item",
				"show-text",
				"laid-out",
				"fold-signal"
			]))), 128))])) : U("", !0)]));
		};
	}
}, Up = { class: "flex items-center gap-1.5" }, Wp = {
	class: "bg-muted flex gap-0.5 rounded-md p-0.5",
	role: "tablist",
	"aria-label": "Source"
}, Gp = [
	"aria-selected",
	"title",
	"onClick"
], Kp = { class: "ml-auto flex gap-1" }, qp = { key: 0 }, Jp = { class: "text-xs" }, Yp = "dev-outline-source", Xp = "dev-outline-text", Zp = "dev-outline-divs", Qp = "dev-outline-hidden", $p = {
	__name: "OutlinePanel",
	emits: ["close"],
	setup(e, { emit: t }) {
		let n = t, r = Jn("root"), i = (e, t) => {
			let n = Rl(e, t);
			return n === !0 || n === 1;
		}, a = /* @__PURE__ */ M(Rl(Yp, "rendered") === "initial" ? "initial" : "rendered"), o = /* @__PURE__ */ M(i(Xp, !0)), s = /* @__PURE__ */ M(i(Zp, !1)), c = /* @__PURE__ */ M(i(Qp, !0)), l = /* @__PURE__ */ $t(null), u = /* @__PURE__ */ M(0), d = /* @__PURE__ */ M(""), f = /* @__PURE__ */ M(""), p = /* @__PURE__ */ M({
			shut: !1,
			at: 0
		}), m = 0, h = /* @__PURE__ */ M(0);
		async function g() {
			let e = ++m, t = document.body;
			if (a.value === "initial") {
				d.value = "Loading…";
				try {
					let e = await yu(window.location.href, {
						cache: "no-store",
						credentials: "same-origin"
					});
					t = new DOMParser().parseFromString(await e.text(), "text/html").body;
				} catch {
					e === m && (d.value = "Could not load the initial HTML");
					return;
				}
				if (e !== m) return;
			}
			let n = Op(t, s.value, c.value);
			l.value = Yt({
				tag: "body",
				element: t,
				attributes: [],
				children: n
			}), h.value++, u.value = 1 + Ap(n), d.value = "";
		}
		function _(e) {
			e !== a.value && (a.value = e, zl(Yp, e), Co(), g());
		}
		function v() {
			o.value = !o.value, zl(Xp, o.value);
		}
		function y() {
			s.value = !s.value, zl(Zp, s.value), g();
		}
		function b() {
			c.value = !c.value, zl(Qp, c.value), g();
		}
		function x(e) {
			p.value = {
				shut: e,
				at: Date.now()
			};
		}
		async function S() {
			f.value = await mu(jp(l.value) + "\n", r) ? "Outline copied as HTML" : "Copy failed", setTimeout(() => {
				f.value = "";
			}, 1500);
		}
		let C = W(() => [
			{
				label: "Expand all",
				action: () => x(!1),
				disabled: !l.value
			},
			{
				label: "Collapse all",
				action: () => x(!0),
				disabled: !l.value
			},
			{ separator: !0 },
			{
				label: "Copy as HTML",
				action: S,
				disabled: !l.value
			}
		]), w = [{
			value: "rendered",
			label: "Rendered",
			title: "The page as it is now, after scripts"
		}, {
			value: "initial",
			label: "Initial",
			title: "The HTML the server sends, before any script runs"
		}];
		return gr(g), vr(Co), (e, t) => (L(), z(pu, {
			title: "Outline",
			side: "left",
			"width-key": "dev-outline-width",
			onClose: t[1] ||= (e) => n("close")
		}, Tr({
			count: P(() => [H(A(d.value || u.value), 1)]),
			actions: P(() => [V(N(X), {
				variant: "ghost",
				size: "icon-sm",
				"aria-label": "Refresh",
				title: "Read the page again",
				onClick: g
			}, {
				default: P(() => [V(N(ls))]),
				_: 1
			}), V(tu, { items: C.value }, {
				trigger: P(({ toggle: e, open: t }) => [V(N(X), {
					variant: "ghost",
					size: "icon-sm",
					"aria-label": "More",
					title: "More",
					"aria-expanded": t,
					onClick: e
				}, {
					default: P(() => [V(N(Yo))]),
					_: 1
				}, 8, ["aria-expanded", "onClick"])]),
				_: 1
			}, 8, ["items"])]),
			header: P(() => [B("div", Up, [B("div", Wp, [(L(), R(I, null, F(w, (e) => B("button", {
				key: e.value,
				type: "button",
				role: "tab",
				"aria-selected": a.value === e.value,
				class: k(["rounded-sm px-2.5 py-1 text-xs", a.value === e.value ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"]),
				title: e.title,
				onClick: (t) => _(e.value)
			}, A(e.label), 11, Gp)), 64))]), B("div", Kp, [
				V(N(Nl), {
					size: "sm",
					variant: "outline",
					class: "h-7 px-2 text-xs",
					"model-value": o.value,
					title: "The text inside the tags",
					"onUpdate:modelValue": v
				}, {
					default: P(() => [...t[2] ||= [H("Text", -1)]]),
					_: 1
				}, 8, ["model-value"]),
				V(N(Nl), {
					size: "sm",
					variant: "outline",
					class: "h-7 px-2 text-xs",
					"model-value": s.value,
					title: "The divs too, to see the page's structure",
					"onUpdate:modelValue": y
				}, {
					default: P(() => [...t[3] ||= [H("Divs", -1)]]),
					_: 1
				}, 8, ["model-value"]),
				V(N(Nl), {
					size: "sm",
					variant: "outline",
					class: "h-7 px-2 text-xs",
					"model-value": c.value,
					disabled: a.value !== "rendered",
					title: "The elements that render no box, dimmed",
					"onUpdate:modelValue": b
				}, {
					default: P(() => [...t[4] ||= [H("Hidden", -1)]]),
					_: 1
				}, 8, ["model-value", "disabled"])
			])])]),
			default: P(() => [B("div", {
				class: "py-2 pr-3 pl-1 font-mono text-[11px] leading-5",
				onMouseleave: t[0] ||= (...e) => N(Co) && N(Co)(...e)
			}, [l.value ? (L(), R("ul", qp, [(L(), z(Hp, {
				key: h.value,
				item: l.value,
				"show-text": o.value,
				"laid-out": a.value === "rendered",
				"fold-signal": p.value
			}, null, 8, [
				"item",
				"show-text",
				"laid-out",
				"fold-signal"
			]))])) : U("", !0)], 32)]),
			_: 2
		}, [f.value ? {
			name: "footer",
			fn: P(() => [B("p", Jp, A(f.value), 1)]),
			key: "0"
		} : void 0]), 1024));
	}
}, em = /^(https?:\/\/)?(www\.)?schema\.org\/|^schema:/i, tm = (e) => typeof e == "object" && !!e && !Array.isArray(e), nm = (e) => tm(e) ? [].concat(e["@type"] ?? []).map((e) => String(e).replace(em, "")) : [], rm = (e, t) => {
	if (!e) return null;
	try {
		return new URL(e, t).href;
	} catch {
		return null;
	}
};
function im(e) {
	let t = /* @__PURE__ */ new Map(), n = (e) => {
		if (Array.isArray(e)) return e.forEach(n);
		tm(e) && (e["@id"] && Object.keys(e).some((e) => e !== "@id") && t.set(e["@id"], {
			...t.get(e["@id"]),
			...e
		}), Object.values(e).forEach(n));
	};
	e.forEach(n);
	let r = (e) => tm(e) && e["@id"] && t.has(e["@id"]) ? t.get(e["@id"]) : e, i = [], a = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set(), s = (e, t) => {
		if (Array.isArray(e)) return e.forEach((e) => s(e, t));
		if (!tm(e)) return;
		let n = r(e), c = nm(n).length > 0;
		c && t && a.add(n), !o.has(n) && (o.add(n), c && i.push(n), Object.entries(n).forEach(([e, r]) => {
			e === "@graph" ? s(r, t) : e.startsWith("@") || s(r, c ? n : t);
		}));
	};
	return e.forEach((e) => s(e, null)), {
		nodes: i,
		nested: a,
		resolve: r
	};
}
var am = [
	"Article",
	"NewsArticle",
	"BlogPosting",
	"Report",
	"ScholarlyArticle",
	"TechArticle",
	"AnalysisNewsArticle",
	"OpinionNewsArticle",
	"ReportageNewsArticle",
	"ReviewNewsArticle",
	"BackgroundNewsArticle",
	"AskPublicNewsArticle",
	"LiveBlogPosting"
], om = [
	"Event",
	"BusinessEvent",
	"ChildrensEvent",
	"ComedyEvent",
	"CourseInstance",
	"DanceEvent",
	"DeliveryEvent",
	"EducationEvent",
	"ExhibitionEvent",
	"Festival",
	"FoodEvent",
	"Hackathon",
	"LiteraryEvent",
	"MusicEvent",
	"PublicationEvent",
	"SaleEvent",
	"ScreeningEvent",
	"SocialEvent",
	"SportsEvent",
	"TheaterEvent",
	"VisualArtsEvent"
], sm = /* @__PURE__ */ "LocalBusiness.AccountingService.Attorney.AutomotiveBusiness.BarOrPub.Bakery.BeautySalon.CafeOrCoffeeShop.ChildCare.Dentist.DryCleaningOrLaundry.EmergencyService.EmploymentAgency.EntertainmentBusiness.FinancialService.FoodEstablishment.GovernmentOffice.HealthAndBeautyBusiness.HomeAndConstructionBusiness.Hotel.LegalService.Library.LodgingBusiness.MedicalBusiness.Notary.Physician.ProfessionalService.RealEstateAgent.Restaurant.SelfStorage.ShoppingCenter.SportsActivityLocation.Store.TouristInformationCenter.TravelAgency".split("."), cm = [
	"Organization",
	"Airline",
	"Consortium",
	"Corporation",
	"EducationalOrganization",
	"FundingScheme",
	"GovernmentOrganization",
	"LibrarySystem",
	"MedicalOrganization",
	"NGO",
	"NewsMediaOrganization",
	"OnlineBusiness",
	"OnlineStore",
	"PerformingGroup",
	"PoliticalParty",
	"ResearchOrganization",
	"SportsOrganization",
	"WorkersUnion"
], lm = [
	"SoftwareApplication",
	"MobileApplication",
	"WebApplication",
	"VideoGame"
], um = [
	"Book",
	"Course",
	"CreativeWorkSeason",
	"CreativeWorkSeries",
	"Episode",
	"Game",
	"MediaObject",
	"Movie",
	"MusicPlaylist",
	"MusicRecording",
	"Product",
	"Recipe",
	...om,
	...lm
], dm = [...cm, ...sm], fm = [
	{
		name: "Breadcrumb",
		types: ["BreadcrumbList"],
		shows: "result",
		required: ["itemListElement"],
		check: bm
	},
	{
		name: "Site name",
		types: ["WebSite"],
		shows: "result",
		required: ["name"],
		recommended: ["url", "alternateName"],
		check: xm
	},
	{
		name: "Discussion forum",
		types: ["DiscussionForumPosting", "SocialMediaPosting"],
		shows: "elsewhere",
		where: "Discussions and forums",
		required: [
			"author",
			"datePublished",
			"text|image|video"
		],
		recommended: [
			"headline",
			"url",
			"interactionStatistic"
		]
	},
	{
		name: "Article",
		types: am,
		shows: "result",
		recommended: [
			"headline",
			"image",
			"datePublished",
			"dateModified",
			"author.name"
		]
	},
	{
		name: "Event",
		types: om,
		shows: "result",
		required: [
			"name",
			"startDate",
			"location"
		],
		recommended: [
			"description",
			"endDate",
			"eventStatus",
			"image",
			"offers",
			"organizer",
			"performer"
		],
		check: Sm
	},
	{
		name: "Product",
		types: [
			"Product",
			"ProductGroup",
			"IndividualProduct",
			"ProductModel"
		],
		shows: "result",
		required: ["name", "offers|review|aggregateRating"],
		recommended: [
			"image",
			"description",
			"brand.name",
			"sku|gtin|gtin8|gtin12|gtin13|gtin14|mpn",
			"offers.availability"
		],
		check: Cm
	},
	{
		name: "Recipe",
		types: ["Recipe"],
		shows: "result",
		required: ["name", "image"],
		recommended: [
			"aggregateRating",
			"author",
			"datePublished",
			"description",
			"totalTime|cookTime",
			"prepTime",
			"recipeIngredient",
			"recipeInstructions",
			"recipeYield",
			"nutrition.calories"
		]
	},
	{
		name: "Software app",
		types: lm,
		shows: "result",
		required: [
			"name",
			"offers.price",
			"aggregateRating|review"
		],
		recommended: ["applicationCategory", "operatingSystem"]
	},
	{
		name: "Video",
		types: ["VideoObject"],
		shows: "result",
		required: [
			"name",
			"thumbnailUrl",
			"uploadDate"
		],
		recommended: [
			"description",
			"duration",
			"contentUrl|embedUrl"
		]
	},
	{
		name: "Q&A",
		types: ["QAPage"],
		shows: "result",
		required: [
			"mainEntity.name",
			"mainEntity.answerCount",
			"mainEntity.acceptedAnswer|mainEntity.suggestedAnswer"
		],
		recommended: [
			"mainEntity.text",
			"mainEntity.author",
			"mainEntity.datePublished"
		]
	},
	{
		name: "Review snippet",
		types: ["Review"],
		standalone: !0,
		shows: "result",
		required: [
			"itemReviewed",
			"author",
			"reviewRating.ratingValue"
		],
		check: Em
	},
	{
		name: "Review snippet",
		types: ["AggregateRating"],
		standalone: !0,
		shows: "result",
		required: [
			"itemReviewed",
			"ratingValue",
			"ratingCount|reviewCount"
		],
		check: Em
	},
	{
		name: "FAQ",
		types: ["FAQPage"],
		shows: "restricted",
		note: "Shown only for well-known government and health sites (since 2023)",
		required: ["mainEntity"],
		check: wm
	},
	{
		name: "Job posting",
		types: ["JobPosting"],
		shows: "elsewhere",
		where: "Google for Jobs",
		required: [
			"title",
			"description",
			"datePosted",
			"hiringOrganization",
			"jobLocation|applicantLocationRequirements"
		],
		recommended: [
			"validThrough",
			"employmentType",
			"baseSalary",
			"identifier"
		],
		check: Tm("validThrough", "Expired: past its validThrough")
	},
	{
		name: "Movie",
		types: ["Movie"],
		shows: "elsewhere",
		where: "Movie carousels",
		required: ["name", "image"],
		recommended: [
			"aggregateRating",
			"dateCreated",
			"director",
			"review"
		]
	},
	{
		name: "Course",
		types: ["Course"],
		shows: "elsewhere",
		where: "Course lists (Course info is retired)",
		required: ["name", "description"],
		recommended: ["provider.name"]
	},
	{
		name: "Profile page",
		types: ["ProfilePage"],
		shows: "elsewhere",
		where: "Perspectives and forum results",
		required: ["mainEntity.name"],
		recommended: [
			"mainEntity.image",
			"mainEntity.sameAs",
			"dateCreated",
			"dateModified"
		]
	},
	{
		name: "Dataset",
		types: ["Dataset"],
		shows: "elsewhere",
		where: "Dataset Search",
		required: ["name", "description"],
		recommended: [
			"url",
			"license",
			"creator",
			"identifier"
		]
	},
	{
		name: "Image metadata",
		types: ["ImageObject"],
		standalone: !0,
		shows: "elsewhere",
		where: "Google Images: the Licensable badge",
		required: ["contentUrl", "license|creator|creditText|copyrightNotice"],
		recommended: ["acquireLicensePage"]
	},
	{
		name: "Local business",
		types: sm,
		shows: "elsewhere",
		where: "the knowledge panel and Maps, after the Business Profile",
		required: ["name", "address"],
		recommended: [
			"url",
			"telephone",
			"geo",
			"openingHoursSpecification",
			"image",
			"priceRange"
		],
		check: Dm
	},
	{
		name: "Organization",
		types: cm,
		shows: "elsewhere",
		where: "the knowledge panel: name, logo, contacts",
		recommended: [
			"name",
			"url",
			"logo",
			"sameAs",
			"description"
		],
		check: Dm
	},
	{
		name: "How-to",
		types: ["HowTo"],
		shows: "retired",
		note: "No longer shown (since 2023)"
	},
	{
		name: "Claim review",
		types: ["ClaimReview"],
		shows: "retired",
		note: "Phased out (2025)"
	},
	{
		name: "Special announcement",
		types: ["SpecialAnnouncement"],
		shows: "retired",
		note: "Phased out (2025)"
	},
	{
		name: "Estimated salary",
		types: ["Occupation", "OccupationAggregationByEmployer"],
		shows: "retired",
		note: "Phased out (2025)"
	},
	{
		name: "Vehicle listing",
		types: ["Car", "Vehicle"],
		shows: "retired",
		note: "Phased out (2025)"
	},
	{
		name: "Book actions",
		types: ["Book"],
		shows: "retired",
		note: "Phased out (2025); its ratings can still show"
	}
];
function pm(e, t, n) {
	return n.split(".").reduce((t, n) => t.flatMap((t) => {
		let r = e.resolve(t)?.[n];
		return r == null || r === "" ? [] : [].concat(r).map(e.resolve);
	}), [t]);
}
var mm = (e, t, n) => n.split("|").some((n) => pm(e, t, n).length > 0);
function Q(e, t, n) {
	for (let r of n.split("|")) {
		let [n] = pm(e, t, r);
		if (n !== void 0) return n;
	}
}
var hm = (e) => tm(e) ? e["@value"] ?? e.name ?? e.url ?? e.contentUrl ?? e["@id"] ?? null : e ?? null, gm = (e) => tm(e) ? e.url ?? e.contentUrl ?? e["@id"] ?? null : e ?? null, _m = (e) => e ? String(hm(e)).split("/").pop() : null, vm = (e, t, n = []) => n.filter((n) => !mm(e, t, n)).map((e) => e.split("|").join(" or ")), ym = (e, t) => nm(e).some((e) => t.includes(e));
function bm(e, t) {
	let n = pm(e, t, "itemListElement"), r = [];
	return n.forEach((t, i) => {
		mm(e, t, "name|item.name") || r.push(`item ${i + 1}: name`), mm(e, t, "position") || r.push(`item ${i + 1}: position`), i < n.length - 1 && !mm(e, t, "item") && r.push(`item ${i + 1}: item`);
	}), { missing: r };
}
function xm(e, t) {
	return { notes: ["Google reads the site name from the home page", ...pm(e, t, "potentialAction").some((e) => ym(e, ["SearchAction"])) ? ["SearchAction: the sitelinks search box is no longer shown (since 2024)"] : []] };
}
function Sm(e, t) {
	let n = pm(e, t, "location"), r = n.some((t) => ym(t, ["VirtualLocation"]) ? mm(e, t, "url") : mm(e, t, "address"));
	return {
		missing: n.length && !r ? ["location.address (or a VirtualLocation url)"] : [],
		...Tm("endDate|startDate", "Ended: past events are dropped")(e, t)
	};
}
function Cm(e, t) {
	let n = [];
	return pm(e, t, "offers").forEach((t, r) => {
		let i = `offers ${r + 1}`;
		mm(e, t, "price|lowPrice|priceSpecification.price") || n.push(`${i}: price`), mm(e, t, "priceCurrency|priceSpecification.priceCurrency") || n.push(`${i}: priceCurrency`);
	}), { missing: n };
}
function wm(e, t) {
	let n = [];
	return pm(e, t, "mainEntity").forEach((t, r) => {
		mm(e, t, "name") || n.push(`question ${r + 1}: name`), mm(e, t, "acceptedAnswer.text") || n.push(`question ${r + 1}: acceptedAnswer.text`);
	}), { missing: n };
}
function Tm(e, t) {
	return (n, r) => {
		let i = new Date(hm(Q(n, r, e)));
		return { notes: !isNaN(i) && i < /* @__PURE__ */ new Date() ? [t] : [] };
	};
}
function Em(e, t) {
	let n = Q(e, t, "itemReviewed");
	return { notes: n && ym(n, dm) ? ["Self-serving: a business rating itself shows no stars"] : [] };
}
function Dm(e, t) {
	return { notes: mm(e, t, "aggregateRating|review") ? ["Self-serving: its own ratings show no stars"] : [] };
}
function Om(e, t) {
	let n = [];
	return pm(e, t, "aggregateRating").forEach((t) => {
		mm(e, t, "ratingValue") || n.push("aggregateRating.ratingValue"), mm(e, t, "ratingCount|reviewCount") || n.push("aggregateRating.ratingCount or reviewCount");
	}), pm(e, t, "review").forEach((t, r) => {
		mm(e, t, "author") || n.push(`review ${r + 1}: author`), mm(e, t, "reviewRating.ratingValue") || n.push(`review ${r + 1}: reviewRating.ratingValue`);
	}), { missing: [...new Set(n)] };
}
function km(e, t, n = {
	day: "numeric",
	month: "short",
	year: "numeric"
}) {
	let r = new Date(hm(e));
	if (isNaN(r)) return null;
	try {
		return new Intl.DateTimeFormat(t || void 0, n).format(r);
	} catch {
		return r.toDateString();
	}
}
function Am(e, t, n) {
	let r = Number(hm(e));
	if (!Number.isFinite(r)) return null;
	if (r === 0) return "Free";
	try {
		return new Intl.NumberFormat(n || void 0, {
			style: "currency",
			currency: hm(t)
		}).format(r);
	} catch {
		return `${r}${t ? ` ${hm(t)}` : ""}`;
	}
}
function jm(e) {
	let t = String(hm(e) ?? "").match(/^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/);
	if (!t) return null;
	let [, n = 0, r = 0, i = 0, a = 0] = t.map(Number);
	return ((n * 24 + r) * 60 + i) * 60 + Math.round(a);
}
function Mm(e) {
	let t = jm(e);
	if (!t) return null;
	let n = Math.round(t / 60);
	return n >= 60 ? `${Math.floor(n / 60)} h${n % 60 ? ` ${n % 60} min` : ""}` : `${n} min`;
}
function Nm(e) {
	let t = jm(e);
	if (!t) return null;
	let n = (e) => String(e).padStart(2, "0"), r = Math.floor(t / 3600), i = Math.floor(t / 60) % 60;
	return r ? `${r}:${n(i)}:${n(t % 60)}` : `${i}:${n(t % 60)}`;
}
var Pm = {
	InStock: "In stock",
	OutOfStock: "Out of stock",
	SoldOut: "Sold out",
	PreOrder: "Pre-order",
	PreSale: "Presale",
	BackOrder: "Backorder",
	LimitedAvailability: "Limited availability",
	OnlineOnly: "Online only",
	InStoreOnly: "In store only",
	MadeToOrder: "Made to order",
	Discontinued: "Discontinued"
};
function Fm(e, t) {
	let n = ym(t, ["AggregateRating"]) ? t : Q(e, t, "aggregateRating");
	if (n && mm(e, n, "ratingValue") && mm(e, n, "ratingCount|reviewCount")) {
		let t = mm(e, n, "reviewCount");
		return {
			value: Number(hm(Q(e, n, "ratingValue"))),
			best: Number(hm(Q(e, n, "bestRating"))) || 5,
			count: Number(hm(Q(e, n, t ? "reviewCount" : "ratingCount"))),
			noun: t ? "reviews" : "votes"
		};
	}
	let r = ym(t, ["Review"]) ? t : Q(e, t, "review"), i = r && Q(e, r, "reviewRating");
	return i && mm(e, i, "ratingValue") ? {
		value: Number(hm(Q(e, i, "ratingValue"))),
		best: Number(hm(Q(e, i, "bestRating"))) || 5,
		count: null,
		by: hm(Q(e, r, "author.name|author"))
	} : null;
}
function Im(e, { doc: t, url: n, canonical: r, lang: i, og: a }) {
	let o = im(e), s = r ?? n, c = [], l = o.nodes.flatMap((e) => {
		let t = fm.find((t) => ym(e, t.types) && (!t.standalone || !o.nested.has(e)));
		if (!t) return [];
		let n = t.check?.(o, e) ?? {}, r = Om(o, e), i = [
			...vm(o, e, t.required),
			...n.missing ?? [],
			...r.missing
		], a = i.length && t.shows !== "retired" ? "invalid" : t.shows;
		return a === "invalid" && c.push(`${t.name}: missing ${i.join(", ")}`), [{
			name: t.name,
			status: a,
			where: t.where ?? null,
			note: t.note ?? null,
			type: nm(e).join(", "),
			label: hm(Q(o, e, "name|headline")) ?? null,
			missing: i,
			recommended: a === "retired" ? [] : vm(o, e, t.recommended),
			notes: n.notes ?? [],
			node: e
		}];
	}), u = l.filter((e) => e.status === "result"), d = (e) => u.find((t) => t.name === e)?.node, f = o.nodes.find((e) => ym(e, ["WebSite"])), p = (() => {
		try {
			return new URL(s).host;
		} catch {
			return "";
		}
	})(), m = hm(f && Q(o, f, "name")) ?? a["og:site_name"] ?? p, h = Lm(t, n);
	h.href ? h.sized || c.push("Favicon: Google wants an SVG or a square multiple of 48px") : c.push("No favicon link: Google falls back to /favicon.ico, else a globe");
	let g = d("Breadcrumb"), _ = rm("/", s), v = g ? pm(o, g, "itemListElement").sort((e, t) => Number(hm(e.position)) - Number(hm(t.position))).filter((e) => rm(gm(Q(o, e, "item")), s) !== _).map((e) => hm(Q(o, e, "name|item.name"))).filter(Boolean) : null, y = [
		"Product",
		"Recipe",
		"Software app",
		"Video",
		"Article"
	].map(d).find(Boolean), b = y && l.find((e) => e.node === y).name, x = [], S = null, C = null, w = null;
	if (b === "Product") {
		let e = Q(o, y, "offers");
		if (e) {
			let t = Q(o, e, "priceCurrency|priceSpecification.priceCurrency"), n = Q(o, e, "lowPrice"), r = Q(o, e, "highPrice");
			x.push(n !== void 0 && r !== void 0 ? `${Am(n, t, i)} to ${Am(r, t, i)}` : Am(Q(o, e, "price|lowPrice|priceSpecification.price"), t, i)), x.push(Pm[_m(Q(o, e, "availability"))]);
		}
	}
	if (b === "Recipe") {
		x.push(Mm(Q(o, y, "totalTime|cookTime")));
		let e = hm(Q(o, y, "nutrition.calories"));
		e && x.push(/cal/i.test(e) ? e : `${e} cal`);
	}
	if (b === "Software app") {
		let e = Q(o, y, "offers");
		x.push(e && Am(Q(o, e, "price"), Q(o, e, "priceCurrency"), i)), x.push(hm(Q(o, y, "operatingSystem"))), x.push(_m(Q(o, y, "applicationCategory"))?.replace(/Application$/, ""));
	}
	b === "Video" && (w = {
		thumbnail: rm(gm(Q(o, y, "thumbnailUrl")), s),
		duration: Nm(Q(o, y, "duration"))
	}, S = km(Q(o, y, "uploadDate"), i)), b === "Article" && (S = km(Q(o, y, "datePublished"), i)), y && b !== "Video" && (C = rm(gm(Q(o, y, "image|thumbnailUrl")), s));
	let T = [
		y,
		...o.nodes.filter((e) => ym(e, um)),
		...u.filter((e) => e.name === "Review snippet" && !e.notes.length).map((e) => e.node)
	].filter((e) => e && !ym(e, dm)).map((e) => Fm(o, e)).find(Boolean) ?? null, ee = u.filter((e) => e.name === "Event").map(({ node: e }) => {
		let t = Q(o, e, "location");
		return {
			start: hm(Q(o, e, "startDate")),
			date: km(Q(o, e, "startDate"), i, {
				weekday: "short",
				day: "numeric",
				month: "short"
			}),
			name: hm(Q(o, e, "name")),
			place: t && (hm(Q(o, t, "name")) ?? hm(Q(o, t, "address.addressLocality|address")))
		};
	}).sort((e, t) => String(e.start).localeCompare(String(t.start))), te = d("Q&A"), E = te ? (() => {
		let e = Q(o, te, "mainEntity"), t = Q(o, e, "acceptedAnswer|suggestedAnswer");
		return {
			question: hm(Q(o, e, "name")),
			answers: Number(hm(Q(o, e, "answerCount"))) || null,
			answer: hm(Q(o, t, "text")),
			accepted: mm(o, e, "acceptedAnswer")
		};
	})() : null;
	return {
		snippet: {
			siteName: m,
			favicon: h.href,
			host: p,
			crumbs: v?.length ? v : null,
			date: S,
			image: C,
			video: w,
			rating: T,
			details: x.filter(Boolean)
		},
		events: ee.length ? {
			list: ee.slice(0, 3),
			more: Math.max(0, ee.length - 3)
		} : null,
		qa: E,
		features: l.map(({ node: e, ...t }) => t),
		issues: c
	};
}
function Lm(e, t) {
	let n = [...e.querySelectorAll("link[rel~=\"icon\" i]")].map((e) => {
		let n = (e.getAttribute("sizes") ?? "").split(/\s+/).map((e) => Number(e.split(/x/i)[0]) || 0), r = e.getAttribute("type") === "image/svg+xml" || /\.svg(\?|$)/i.test(e.getAttribute("href") ?? "");
		return {
			href: rm(e.getAttribute("href"), t),
			svg: r,
			size: Math.max(0, ...n)
		};
	}).filter((e) => e.href);
	return {
		href: (n.find((e) => e.svg) ?? [...n].sort((e, t) => t.size - e.size)[0])?.href ?? null,
		sized: n.some((e) => e.svg || e.size && e.size % 48 == 0)
	};
}
//#endregion
//#region src/tools/seo/seo.js
var Rm = {
	reports: /* @__PURE__ */ new Map(),
	robotsTxt: null,
	sitemaps: null
}, zm = [30, 60], Bm = [70, 160], Vm = /^(x-default|[a-z]{2,3}(-[A-Za-z]{4})?(-([A-Z]{2}|\d{3}))?)$/, Hm = (e) => e?.textContent.replace(/\s+/g, " ").trim() ?? "", Um = "h1, h2, h3, h4, h5, h6", Wm = "link[rel=\"alternate\" i][hreflang]", Gm = (e, t, n) => e.querySelector(`meta[${t}="${n}" i]`)?.getAttribute("content")?.trim() ?? null, Km = (e, t) => {
	try {
		let n = new URL(e, t);
		return n.hash = "", n.href;
	} catch {
		return e;
	}
};
function qm(e = []) {
	let t = new URL(location.href);
	return e.forEach((e) => t.searchParams.delete(e)), t.hash = "", t.href;
}
async function Jm(e, t = []) {
	let n = qm(t);
	if (e === "rendered") return {
		doc: document,
		url: n,
		status: null,
		headers: null,
		redirected: !1,
		live: !0
	};
	try {
		let e = await yu(n, {
			cache: "no-store",
			credentials: "same-origin"
		});
		return {
			doc: new DOMParser().parseFromString(await e.text(), "text/html"),
			url: e.url || n,
			requested: n,
			status: e.status,
			headers: e.headers,
			redirected: e.redirected,
			live: !1
		};
	} catch (e) {
		return { error: e.message || "The page could not be fetched" };
	}
}
async function Ym() {
	try {
		let e = await yu("/robots.txt", { cache: "no-store" });
		return e.ok ? {
			found: !0,
			status: e.status,
			...eh(await e.text())
		} : {
			found: !1,
			status: e.status,
			groups: [],
			sitemaps: []
		};
	} catch {
		return {
			found: !1,
			status: null,
			groups: [],
			sitemaps: []
		};
	}
}
var Xm = ["/sitemap_index.xml", "/wp-sitemap.xml"], Zm = "http://www.w3.org/1999/xhtml", Qm = 200;
async function $m(e = []) {
	let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = !1, i = async (e, a) => {
		let o = Km(e, location.href);
		if (!(n.has(o) || n.size >= Qm || a > 2)) {
			n.add(o);
			try {
				let e = await yu(o, {
					cache: "no-store",
					credentials: "same-origin"
				});
				if (!e.ok) return;
				let n = new DOMParser().parseFromString(await e.text(), "application/xml");
				if (n.querySelector("parsererror")) return;
				r = !0, [...n.getElementsByTagNameNS("*", "url")].forEach((e) => {
					let n = Hm(e.getElementsByTagNameNS("*", "loc")[0]), r = [...e.getElementsByTagNameNS(Zm, "link")].filter((e) => /\balternate\b/i.test(e.getAttribute("rel") ?? "") && e.hasAttribute("hreflang")).map((e) => ({
						lang: e.getAttribute("hreflang"),
						href: Km(e.getAttribute("href"), o)
					}));
					n && t.set(Km(n, o), {
						alternates: r,
						sitemap: o
					});
				});
				let s = [...n.getElementsByTagNameNS("*", "sitemap")].map((e) => Hm(e.getElementsByTagNameNS("*", "loc")[0])).filter(Boolean);
				await Promise.all(s.map((e) => i(e, a + 1)));
			} catch {}
		}
	};
	return await Promise.all((e.length ? e : Xm).map((e) => i(e, 0))), r ? t : null;
}
function eh(e) {
	let t = [], n = [], r = null, i = !1;
	return e.split(/\r?\n/).forEach((e) => {
		let [, a, o] = e.replace(/#.*/, "").match(/^\s*([\w-]+)\s*:\s*(.*?)\s*$/) ?? [];
		if (!a) return;
		let s = a.toLowerCase();
		if (s === "sitemap") {
			n.push(o);
			return;
		}
		if (s === "user-agent") {
			i || (r = {
				agents: [],
				rules: []
			}, t.push(r)), r.agents.push(o.toLowerCase()), i = !0;
			return;
		}
		i = !1, r && (s === "allow" || s === "disallow") && r.rules.push({
			allow: s === "allow",
			path: o
		});
	}), {
		groups: t,
		sitemaps: n
	};
}
function th({ groups: e }, t, n = "googlebot") {
	let r = e.find((e) => e.agents.includes(n)) ?? e.find((e) => e.agents.includes("*"));
	if (!r) return null;
	let i = r.rules.filter((e) => e.path !== "" && nh(e.path, t)).sort((e, t) => t.path.length - e.path.length || Number(t.allow) - Number(e.allow));
	return i[0] && !i[0].allow ? i[0] : null;
}
function nh(e, t) {
	let n = e.replace(/[.+?^{}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/\\\$$|\$$/, "$");
	return RegExp(`^${n}`).test(t);
}
function rh({ doc: e, url: t, requested: n, status: r, headers: i, redirected: a, live: o }, s, c = null) {
	let l = [], u = (e, t) => l.push({
		level: e,
		message: t
	}), d = (e) => Km(e, t), f = Gm(e, "name", "robots"), p = Gm(e, "name", "googlebot"), m = i?.get("x-robots-tag") ?? null, h = [
		f,
		p,
		m
	].filter(Boolean).join(",").toLowerCase(), g = /\b(noindex|none)\b/.test(h), _ = /\b(nofollow|none)\b/.test(h), v = (() => {
		try {
			let e = new URL(t);
			return e.pathname + e.search;
		} catch {
			return "/";
		}
	})(), y = s?.found ? th(s, v) : null;
	r !== null && r !== 200 && u(r >= 400 ? "error" : "warning", `The page answers ${r}`), a && u("warning", `Redirected from ${n}`), g && u("error", "Not indexable: noindex"), _ && u("warning", "Its links are not followed: nofollow"), y && u("error", `Blocked by robots.txt: Disallow ${y.path}`);
	let b = [...e.querySelectorAll("link[rel=\"canonical\" i]")].map((e) => e.getAttribute("href")), x = b[0] ? d(b[0]) : null, S = b.length ? b.length > 1 ? "multiple" : x === Km(t) ? "self" : "other" : "missing";
	S === "missing" && u("warning", "No canonical"), S === "multiple" && u("error", `${b.length} canonicals`), S === "other" && u("warning", "Canonical points to another URL");
	let C = e.querySelectorAll("head title"), w = Hm(C[0]), T = Gm(e, "name", "description");
	w ? w.length > zm[1] ? u("warning", `Title is long: ${w.length} characters`) : w.length < zm[0] && u("warning", `Title is short: ${w.length} characters`) : u("error", "No title"), C.length > 1 && u("warning", `${C.length} titles`), T ? T.length > Bm[1] ? u("warning", `Description is long: ${T.length} characters`) : T.length < Bm[0] && u("warning", `Description is short: ${T.length} characters`) : u("warning", "No meta description");
	let ee = [...e.querySelectorAll(Wm)].map((e) => ({
		lang: e.getAttribute("hreflang"),
		href: e.getAttribute("href")
	})), te = c?.get(x ?? Km(t)) ?? c?.get(Km(t)), E = ee.length ? "head" : te?.alternates.length ? "sitemap" : null, ne = (E === "sitemap" ? te.alternates : ee).map((e) => {
		let n = d(e.href);
		return {
			lang: e.lang,
			href: n,
			self: n === Km(t) || n === x,
			valid: Vm.test(e.lang)
		};
	});
	if (ne.length) {
		ne.some((e) => e.self) || u("warning", "Hreflang does not list this page itself"), ne.some((e) => e.lang === "x-default") || u("warning", "Hreflang has no x-default"), ne.filter((e) => !e.valid).forEach((e) => u("warning", `Hreflang code not valid: ${e.lang}`));
		let e = ne.map((e) => e.lang.toLowerCase());
		[...new Set(e.filter((t, n) => e.indexOf(t) !== n))].forEach((e) => u("warning", `Hreflang ${e} listed twice`));
	}
	let re = [...e.querySelectorAll(Um)].filter((e) => !o || !Wu(e)).map((e) => ({
		level: Number(e.localName[1]),
		text: Hm(e),
		element: o ? e : null
	})), ie = re.filter((e) => e.level === 1);
	ie.length || u("error", "No H1"), ie.length > 1 && u("warning", `${ie.length} H1s`), re.forEach((e, t) => {
		let n = re[t - 1];
		e.skipped = !!n && e.level > n.level + 1;
	}), re.some((e) => e.skipped) && u("warning", "Heading levels are skipped");
	let ae = Object.fromEntries([...e.querySelectorAll("meta[property^=\"og:\"]")].map((e) => [e.getAttribute("property"), e.getAttribute("content")])), D = Object.fromEntries([...e.querySelectorAll("meta[name^=\"twitter:\"]")].map((e) => [e.getAttribute("name"), e.getAttribute("content")]));
	ae["og:title"] || u("info", "No og:title"), ae["og:image"] || u("warning", "No og:image: shared links show no picture");
	let oe = [...e.querySelectorAll("script[type=\"application/ld+json\"]")].map((e) => {
		try {
			let t = JSON.parse(e.textContent), n = [t, ...Array.isArray(t["@graph"]) ? t["@graph"] : []].flat();
			return {
				data: t,
				types: [...new Set(n.flatMap((e) => [].concat(e?.["@type"] ?? [])))]
			};
		} catch (t) {
			return u("error", "A JSON-LD block does not parse"), {
				error: t.message,
				source: e.textContent.trim().slice(0, 500)
			};
		}
	}), se = e.documentElement.getAttribute("lang"), O = Im(oe.filter((e) => !e.error).map((e) => e.data), {
		doc: e,
		url: t,
		canonical: x,
		lang: se,
		og: ae
	});
	O.issues.forEach((e) => u("warning", e));
	let ce = new URL(t).origin, le = [...e.querySelectorAll("body a[href]")].filter((e) => !o || !Wu(e)), ue = [], de = [], fe = [];
	le.forEach((e) => {
		let t = e.getAttribute("href");
		if (/^(#|mailto:|tel:|javascript:)/i.test(t)) return;
		let n = (e.getAttribute("rel") ?? "").toLowerCase();
		(d(t).startsWith(ce) ? ue : de).push(e), /\b(nofollow|ugc|sponsored)\b/.test(n) && fe.push({
			href: d(t),
			rel: n,
			text: Hm(e),
			element: o ? e : null
		});
	});
	let pe = [...e.querySelectorAll("body img")].filter((e) => !o || !Wu(e)), me = pe.filter((e) => !e.hasAttribute("alt"));
	return me.length && u("warning", `${me.length} image${me.length === 1 ? "" : "s"} without alt`), se || u("warning", "No lang on <html>"), {
		url: t,
		status: r,
		redirected: a,
		requested: n,
		live: o,
		indexing: {
			robotsMeta: f,
			googlebotMeta: p,
			robotsHeader: m,
			noindex: g,
			nofollow: _,
			robotsTxt: s ? {
				found: s.found,
				blockedBy: y,
				sitemaps: s.sitemaps
			} : null
		},
		canonical: {
			href: x,
			all: b.map(d),
			state: S
		},
		title: {
			value: w,
			length: w.length
		},
		description: {
			value: T,
			length: T?.length ?? 0
		},
		hreflang: ne,
		hreflangSource: {
			from: E,
			sitemap: E === "sitemap" ? te.sitemap : null,
			sitemapsRead: c !== null
		},
		headings: re,
		og: ae,
		twitter: D,
		jsonLd: oe,
		rich: O,
		links: {
			internal: ue.length,
			external: de.length,
			nofollow: fe
		},
		images: {
			total: pe.length,
			noAlt: o ? me : me.map(() => null),
			emptyAlt: pe.filter((e) => e.getAttribute("alt") === "").length
		},
		lang: se,
		viewport: Gm(e, "name", "viewport"),
		charset: e.characterSet || e.querySelector("meta[charset]")?.getAttribute("charset") || null,
		prev: e.querySelector("link[rel=\"prev\" i]")?.getAttribute("href") ?? null,
		next: e.querySelector("link[rel=\"next\" i]")?.getAttribute("href") ?? null,
		issues: l.sort((e, t) => [
			"error",
			"warning",
			"info"
		].indexOf(e.level) - [
			"error",
			"warning",
			"info"
		].indexOf(t.level))
	};
}
var ih = [
	{
		kind: "fonts",
		test: (e, t) => /^(woff2?|ttf|otf|eot)$/.test(t)
	},
	{
		kind: "styles",
		test: (e, t) => /^(css|scss|sass|less)$/.test(t) || e.initiatorType === "link" && !t
	},
	{
		kind: "scripts",
		test: (e, t) => e.initiatorType === "script" || /^(m?js|ts|vue)$/.test(t)
	},
	{
		kind: "images",
		test: (e, t) => ["img", "image"].includes(e.initiatorType) || /^(avif|webp|jpe?g|png|gif|svg|ico)$/.test(t)
	},
	{
		kind: "media",
		test: (e, t) => ["video", "audio"].includes(e.initiatorType) || /^(mp4|webm|m3u8|ts|mp3|ogg)$/.test(t)
	},
	{
		kind: "data",
		test: (e) => [
			"fetch",
			"xmlhttprequest",
			"beacon"
		].includes(e.initiatorType)
	}
], ah = {
	document: "HTML",
	scripts: "Scripts",
	styles: "Styles",
	fonts: "Fonts",
	images: "Images",
	media: "Media",
	data: "Data",
	other: "Other"
}, oh = (e) => {
	let t = "";
	try {
		t = new URL(e.name).pathname.match(/\.(\w+)$/)?.[1].toLowerCase() ?? "";
	} catch {}
	return ih.find(({ test: n }) => n(e, t))?.kind ?? "other";
}, sh = (e) => ({
	transferred: e?.transferSize ?? 0,
	encoded: e?.encodedBodySize ?? 0,
	decoded: e?.decodedBodySize ?? 0
});
function ch(e = null) {
	let t = performance.getEntriesByType("navigation")[0], n = e ? performance.getEntriesByName(e).filter((e) => e.initiatorType === "fetch").at(-1) : null, r = performance.getEntriesByType("resource").filter((e) => !bu(e.name)), i = {}, a = 0, o = [];
	r.forEach((e) => {
		let t = oh(e), n = sh(e);
		i[t] ??= {
			kind: t,
			count: 0,
			transferred: 0,
			encoded: 0,
			files: []
		}, i[t].count++, i[t].transferred += n.transferred, i[t].encoded += n.encoded, i[t].files.push({
			url: e.name,
			...n,
			status: e.responseStatus ?? null
		}), !n.encoded && !n.transferred && e.responseStatus !== 304 && a++, e.responseStatus >= 400 && o.push({
			url: e.name,
			status: e.responseStatus,
			bytes: n.encoded
		});
	});
	let s = Object.values(i).sort((e, t) => t.encoded - e.encoded);
	return s.forEach((e) => e.files.sort((e, t) => t.encoded - e.encoded)), {
		html: n ? sh(n) : null,
		load: t ? sh(t) : null,
		kinds: s,
		total: {
			count: r.length,
			transferred: s.reduce((e, t) => e + t.transferred, 0),
			encoded: s.reduce((e, t) => e + t.encoded, 0)
		},
		unsized: a,
		failed: o,
		devServer: r.some((e) => e.name.includes("/@vite/client"))
	};
}
async function lh({ hreflang: e, hreflangSource: t, url: n, canonical: r }, i = null) {
	let a = [Km(n), r.href].filter(Boolean), o = (e) => e.some((e) => a.includes(e));
	return Promise.all(e.map(async (e) => {
		if (e.self) return {
			...e,
			status: "self",
			back: !0
		};
		try {
			if (new URL(e.href).origin !== location.origin) return {
				...e,
				status: "other site",
				back: null
			};
			let n = await yu(e.href, {
				cache: "no-store",
				credentials: "same-origin"
			}), r = t.from === "sitemap" ? o((i?.get(e.href)?.alternates ?? []).map((e) => e.href)) : o([...new DOMParser().parseFromString(await n.text(), "text/html").querySelectorAll(Wm)].map((e) => Km(e.getAttribute("href"), n.url)));
			return {
				...e,
				status: n.status,
				back: r
			};
		} catch {
			return {
				...e,
				status: "failed",
				back: null
			};
		}
	}));
}
//#endregion
//#region src/tools/seo/SearchResult.vue
var uh = { class: "rounded-lg border p-3 font-[arial,sans-serif]" }, dh = { class: "flex items-center gap-2.5" }, fh = { class: "flex size-7 flex-none items-center justify-center overflow-hidden rounded-full border border-[#dadce0] bg-[#f1f3f4]" }, ph = ["src"], mh = { class: "min-w-0 leading-tight" }, hh = { class: "block truncate text-sm text-[#202124]" }, gh = { class: "block truncate text-xs text-[#4d5156]" }, _h = { class: "mt-1.5 flex gap-3" }, vh = { class: "min-w-0 flex-1" }, yh = { class: "line-clamp-2 text-lg leading-snug text-[#1a0dab]" }, bh = { class: "mt-0.5 line-clamp-2 text-[13px] leading-snug text-[#4d5156]" }, xh = {
	key: 0,
	class: "text-[#70757a]"
}, Sh = {
	key: 0,
	class: "mt-1 flex flex-wrap items-center gap-x-1.5 text-[13px] text-[#70757a]"
}, Ch = {
	key: 0,
	class: "relative inline-block leading-none tracking-[-1px] text-[#dadce0]",
	"aria-hidden": "true"
}, wh = { key: 1 }, Th = { key: 0 }, Eh = {
	key: 0,
	class: "relative flex-none self-start"
}, Dh = ["src"], Oh = {
	key: 0,
	class: "absolute inset-0 flex items-center justify-center"
}, kh = { class: "flex size-7 items-center justify-center rounded-full bg-black/60 text-white" }, Ah = {
	key: 1,
	class: "absolute right-1 bottom-1 rounded bg-black/70 px-1 text-[10px] text-white tabular-nums"
}, jh = {
	key: 0,
	class: "mt-2 grid gap-1 border-t border-[#ebebeb] pt-2 text-[13px]"
}, Mh = { class: "text-[#4d5156]" }, Nh = { class: "min-w-0 truncate" }, Ph = { class: "text-[#1a0dab]" }, Fh = {
	key: 0,
	class: "text-[#70757a]"
}, Ih = {
	key: 0,
	class: "text-xs text-[#70757a]"
}, Lh = {
	key: 1,
	class: "mt-2 border-t border-[#ebebeb] pt-2 text-[13px]"
}, Rh = { class: "text-[#202124]" }, zh = {
	key: 0,
	class: "text-xs text-[#70757a]"
}, Bh = {
	key: 1,
	class: "mt-1 line-clamp-2 text-[#4d5156]"
}, Vh = { class: "font-medium text-[#202124]" }, Hh = {
	__name: "SearchResult",
	props: { report: {
		type: Object,
		required: !0
	} },
	setup(e) {
		let t = e, n = W(() => t.report.rich.snippet), r = W(() => {
			let e = new URL(t.report.canonical.href ?? t.report.url), r = n.value.crumbs ?? e.pathname.split("/").filter(Boolean);
			return [`${e.protocol}//${e.host}`, ...r].join(" › ");
		}), i = W(() => {
			let { rating: e } = n.value;
			return e ? `${Math.max(0, Math.min(100, e.value / e.best * 100))}%` : null;
		}), a = W(() => {
			let { rating: e } = n.value;
			if (!e) return "";
			let t = Number.isInteger(e.value) ? e.value : e.value.toFixed(1);
			return e.count === null ? `Rating: ${t}/${e.best}${e.by ? ` · Review by ${e.by}` : ""}` : `Rating: ${t} · ${e.count.toLocaleString()} ${e.noun}`;
		}), o = W(() => n.value.video?.thumbnail ?? n.value.image);
		return (t, s) => (L(), R("div", uh, [
			B("div", dh, [B("span", fh, [n.value.favicon ? (L(), R("img", {
				key: 0,
				src: n.value.favicon,
				alt: "",
				class: "size-[18px] object-contain"
			}, null, 8, ph)) : U("", !0)]), B("span", mh, [B("span", hh, A(n.value.siteName), 1), B("span", gh, A(r.value), 1)])]),
			B("div", _h, [B("div", vh, [
				B("p", yh, A(e.report.title.value || "(no title)"), 1),
				B("p", bh, [n.value.date ? (L(), R("span", xh, A(n.value.date) + " — ", 1)) : U("", !0), H(A(e.report.description.value || "(no description: Google picks text from the page)"), 1)]),
				n.value.rating || n.value.details.length ? (L(), R("p", Sh, [
					i.value ? (L(), R("span", Ch, [s[0] ||= H("★★★★★", -1), B("span", {
						class: "absolute inset-0 overflow-hidden text-[#fbbc04]",
						style: ue({ width: i.value })
					}, "★★★★★", 4)])) : U("", !0),
					n.value.rating ? (L(), R("span", wh, A(a.value), 1)) : U("", !0),
					(L(!0), R(I, null, F(n.value.details, (e, t) => (L(), R(I, { key: e }, [n.value.rating || t ? (L(), R("span", Th, "·")) : U("", !0), B("span", null, A(e), 1)], 64))), 128))
				])) : U("", !0)
			]), o.value ? (L(), R("span", Eh, [
				B("img", {
					src: o.value,
					alt: "",
					class: "size-[86px] rounded-lg border object-cover"
				}, null, 8, Dh),
				n.value.video ? (L(), R("span", Oh, [B("span", kh, [V(N(ss), { class: "size-3.5 fill-current" })])])) : U("", !0),
				n.value.video?.duration ? (L(), R("span", Ah, A(n.value.video.duration), 1)) : U("", !0)
			])) : U("", !0)]),
			e.report.rich.events ? (L(), R("div", jh, [(L(!0), R(I, null, F(e.report.rich.events.list, (e, t) => (L(), R("div", {
				key: t,
				class: "grid grid-cols-[6.5rem_minmax(0,1fr)] gap-2"
			}, [B("span", Mh, A(e.date), 1), B("span", Nh, [B("span", Ph, A(e.name), 1), e.place ? (L(), R("span", Fh, " · " + A(e.place), 1)) : U("", !0)])]))), 128)), e.report.rich.events.more ? (L(), R("p", Ih, "and " + A(e.report.rich.events.more) + " more", 1)) : U("", !0)])) : U("", !0),
			e.report.rich.qa ? (L(), R("div", Lh, [
				B("p", Rh, A(e.report.rich.qa.question), 1),
				e.report.rich.qa.answers ? (L(), R("p", zh, A(e.report.rich.qa.answers) + " answer" + A(e.report.rich.qa.answers === 1 ? "" : "s"), 1)) : U("", !0),
				e.report.rich.qa.answer ? (L(), R("p", Bh, [B("span", Vh, A(e.report.rich.qa.accepted ? "Best answer" : "Top answer"), 1), H(" · " + A(e.report.rich.qa.answer), 1)])) : U("", !0)
			])) : U("", !0)
		]));
	}
}, Uh = { class: "grid grid-cols-[7.5rem_minmax(0,1fr)] items-baseline gap-3 px-4 py-1.5" }, Wh = { class: "text-muted-foreground text-xs" }, Gh = { class: "flex min-w-0 items-baseline gap-1.5 text-xs" }, Kh = { class: "min-w-0 flex-1 break-words" }, qh = {
	__name: "SeoRow",
	props: {
		label: {
			type: String,
			required: !0
		},
		state: {
			type: String,
			default: null
		}
	},
	setup(e) {
		return (t, n) => (L(), R("div", Uh, [B("span", Wh, A(e.label), 1), B("div", Gh, [e.state === "ok" ? (L(), z(N(Vo), {
			key: 0,
			class: "size-3.5 flex-none translate-y-0.5 text-emerald-600"
		})) : e.state === "warning" ? (L(), z(N(gs), {
			key: 1,
			class: "size-3.5 flex-none translate-y-0.5 text-amber-600"
		})) : e.state === "error" ? (L(), z(N(Ho), {
			key: 2,
			class: "text-destructive size-3.5 flex-none translate-y-0.5"
		})) : U("", !0), B("div", Kh, [Er(t.$slots, "default")])])]));
	}
}, Jh = {
	key: 0,
	class: "text-destructive"
}, Yh = { key: 1 }, Xh = {
	key: 2,
	class: "text-amber-700"
}, Zh = {
	key: 3,
	class: "text-emerald-700"
}, Qh = { class: "flex items-center gap-2" }, $h = {
	class: "bg-muted flex gap-0.5 rounded-md p-0.5",
	role: "tablist",
	"aria-label": "Source"
}, eg = [
	"aria-selected",
	"title",
	"onClick"
], tg = ["title"], ng = {
	key: 0,
	class: "text-destructive px-4 py-6 text-center text-sm"
}, rg = {
	key: 0,
	class: "border-b py-2"
}, ig = { class: "grid gap-1 px-4" }, ag = { class: "border-b px-4 py-3" }, og = { class: "border-b py-1" }, sg = { class: "bg-background/95 sticky top-0 z-[5] px-4 py-1.5 text-xs font-semibold backdrop-blur" }, cg = { class: "text-muted-foreground font-normal" }, lg = {
	key: 0,
	class: "text-muted-foreground px-4 py-1.5 text-xs"
}, ug = { class: "font-medium" }, dg = ["title"], fg = {
	key: 2,
	class: "text-destructive text-[11px]"
}, pg = { class: "font-mono" }, mg = {
	key: 3,
	class: "text-[11px] text-amber-700"
}, hg = { class: "font-mono" }, gg = { class: "border-b py-1" }, _g = { class: "font-mono" }, vg = { class: "font-medium" }, yg = {
	key: 0,
	class: "text-muted-foreground font-mono text-[11px]"
}, bg = {
	key: 1,
	class: "text-muted-foreground font-mono text-[11px]"
}, xg = {
	key: 2,
	class: "text-muted-foreground font-mono text-[11px]"
}, Sg = {
	key: 3,
	class: "text-muted-foreground text-[11px]"
}, Cg = { class: "font-mono" }, wg = { class: "font-medium" }, Tg = { class: "border-b py-1" }, Eg = { class: "mt-1 flex items-center gap-2" }, Dg = { class: "bg-muted relative h-1 w-24 overflow-hidden rounded-full" }, Og = { class: "text-muted-foreground text-[11px] tabular-nums" }, kg = { class: "mt-1 flex items-center gap-2" }, Ag = { class: "bg-muted relative h-1 w-24 overflow-hidden rounded-full" }, jg = { class: "text-muted-foreground text-[11px] tabular-nums" }, Mg = { class: "border-b py-1" }, Ng = { class: "bg-background/95 sticky top-0 z-[5] flex items-center gap-2 px-4 py-1.5 backdrop-blur" }, Pg = { class: "text-xs font-semibold" }, Fg = { class: "text-muted-foreground font-normal" }, Ig = ["title"], Lg = {
	key: 0,
	class: "text-muted-foreground px-4 py-1.5 text-xs"
}, Rg = ["title"], zg = { class: "flex-none text-[11px]" }, Bg = {
	key: 0,
	class: "text-muted-foreground"
}, Vg = { class: "border-b py-1" }, Hg = { class: "bg-background/95 sticky top-0 z-[5] px-4 py-1.5 text-xs font-semibold backdrop-blur" }, Ug = { class: "text-muted-foreground font-normal" }, Wg = {
	key: 0,
	class: "text-muted-foreground px-4 py-1.5 text-xs"
}, Gg = [
	"title",
	"onMouseenter",
	"onFocus",
	"onClick"
], Kg = { class: "truncate" }, qg = { class: "border-b py-1" }, Jg = {
	key: 0,
	class: "px-4 py-1.5"
}, Yg = ["src"], Xg = { class: "font-mono text-[11px] break-all" }, Zg = { class: "font-mono text-[11px] break-all" }, Qg = {
	key: 1,
	class: "text-muted-foreground px-4 py-1.5 text-xs"
}, $g = { class: "border-b py-1" }, e_ = { class: "bg-background/95 sticky top-0 z-[5] px-4 py-1.5 text-xs font-semibold backdrop-blur" }, t_ = { class: "text-muted-foreground font-normal" }, n_ = {
	key: 0,
	class: "text-muted-foreground px-4 py-1.5 text-xs"
}, r_ = { class: "flex cursor-pointer list-none flex-wrap items-center gap-1 text-xs" }, i_ = {
	key: 0,
	class: "text-destructive"
}, a_ = { class: "bg-muted/30 mt-1 rounded-md p-2" }, o_ = {
	key: 0,
	class: "font-mono text-[11px] whitespace-pre-wrap"
}, s_ = { class: "border-b py-1" }, c_ = { class: "font-medium" }, l_ = { class: "font-medium" }, u_ = { class: "font-medium" }, d_ = { class: "grid gap-1 px-4 pt-1 pb-2" }, f_ = ["onMouseenter"], p_ = { class: "hover:bg-muted/60 -mx-1 grid cursor-default grid-cols-[4.5rem_minmax(0,1fr)_4rem_2.5rem] items-center gap-2 rounded-sm px-1 py-0.5 text-xs" }, m_ = { class: "text-muted-foreground" }, h_ = { class: "bg-muted h-1.5 overflow-hidden rounded-full" }, g_ = { class: "text-right tabular-nums" }, __ = { class: "text-muted-foreground text-right text-[11px] tabular-nums" }, v_ = {
	key: 0,
	class: "bg-popover absolute inset-x-0 top-full z-20 mt-0.5 max-h-72 overflow-y-auto rounded-md border p-1.5 shadow-lg"
}, y_ = ["title"], b_ = { class: "text-right text-[11px] tabular-nums" }, x_ = {
	key: 0,
	class: "text-destructive mr-1.5 font-mono"
}, S_ = ["title"], C_ = {
	key: 0,
	class: "text-muted-foreground px-1.5 pt-0.5 text-[11px]"
}, w_ = {
	key: 0,
	class: "text-muted-foreground px-4 pb-1 text-[11px]"
}, T_ = {
	key: 1,
	class: "text-destructive px-4 pb-1 text-[11px]"
}, E_ = ["title"], D_ = {
	key: 2,
	class: "px-4 pb-2 text-[11px] text-amber-800"
}, O_ = { class: "py-1" }, k_ = { class: "font-mono" }, A_ = { class: "font-mono text-[11px]" }, j_ = {
	key: 0,
	class: "mt-1"
}, M_ = { class: "cursor-pointer text-amber-700" }, N_ = ["title", "onMouseenter"], P_ = ["title"], F_ = {
	key: 0,
	class: "font-mono text-[11px]"
}, I_ = {
	key: 1,
	class: "font-mono text-[11px]"
}, L_ = { class: "text-xs" }, R_ = "dev-seo-source", z_ = 25, B_ = {
	__name: "SeoPanel",
	emits: ["close"],
	setup(e, { emit: t }) {
		let n = t, r = Jn("root"), { seo: i } = Jn("config"), a = [{
			value: "server",
			label: "Server",
			title: "The HTML the server sends: what a crawler gets, with the status and headers"
		}, {
			value: "rendered",
			label: "Rendered",
			title: "The page as it is now in the browser, after scripts"
		}], o = /* @__PURE__ */ M(Rl(R_, "server") === "rendered" ? "rendered" : "server"), s = /* @__PURE__ */ $t(null), c = /* @__PURE__ */ M(""), l = /* @__PURE__ */ M(!1), u = /* @__PURE__ */ M(null), d = /* @__PURE__ */ M(!1), f = /* @__PURE__ */ M(""), p = 0, m = /* @__PURE__ */ M(null), h = () => `${o.value} ${qm(i.ignoreParams)}`;
		function g() {
			let e = Rm.reports.get(h());
			if (!e) return _();
			s.value = e.report, u.value = e.alternates, m.value = e.at, c.value = "";
		}
		async function _() {
			let e = ++p, t = h();
			ee = null, l.value = !0, c.value = "", u.value = null, Rm.robotsTxt = await Ym();
			let n = await Jm(o.value, i.ignoreParams);
			if (e === p && !(!n.error && !n.doc.querySelector("link[rel=\"alternate\" i][hreflang]") && (Rm.sitemaps = await $m(Rm.robotsTxt.sitemaps), e !== p))) {
				if (l.value = !1, n.error) {
					c.value = n.error, s.value = null;
					return;
				}
				s.value = {
					...rh(n, Rm.robotsTxt, Rm.sitemaps),
					weight: ch(n.requested ?? null)
				}, m.value = Date.now(), Rm.reports.set(t, {
					report: s.value,
					alternates: null,
					at: m.value
				});
			}
		}
		function v(e) {
			e !== o.value && (o.value = e, zl(R_, e), Co(), g());
		}
		async function y() {
			d.value = !0, u.value = await lh(s.value, Rm.sitemaps), d.value = !1;
			let e = Rm.reports.get(h());
			e?.report === s.value && (e.alternates = u.value);
		}
		gr(g);
		let b = (e) => String(e).padStart(2, "0"), x = W(() => {
			if (!m.value) return "Read the page again";
			let e = new Date(m.value);
			return `Read at ${b(e.getHours())}:${b(e.getMinutes())}:${b(e.getSeconds())}: click to read again`;
		});
		vr(Co);
		let S = W(() => ({
			error: s.value?.issues.filter((e) => e.level === "error").length ?? 0,
			warning: s.value?.issues.filter((e) => e.level === "warning").length ?? 0
		})), C = {
			result: {
				label: "In the result",
				state: "ok"
			},
			elsewhere: {
				label: "Elsewhere",
				state: "ok"
			},
			restricted: {
				label: "Not shown",
				state: "warning"
			},
			retired: {
				label: "Retired",
				state: "warning"
			},
			invalid: {
				label: "Not eligible",
				state: "error"
			}
		}, w = (e, [t, n]) => e ? e < t || e > n ? "warning" : "ok" : "error", T = (e, [, t]) => `${Math.min(100, e / (t * 1.25) * 100)}%`, ee = null;
		function te(e, t) {
			if (e.element) return e.element;
			ee ??= [...document.querySelectorAll(Um)].filter((e) => !Wu(e)).map((e) => ({
				element: e,
				level: Number(e.localName[1]),
				text: Hm(e)
			}));
			let n = (t) => t?.level === e.level && t.text === e.text;
			return (n(ee[t]) ? ee[t] : ee.find(n))?.element ?? null;
		}
		let E = null;
		function ne(e, t) {
			E = te(e, t), E ? So([E], `H${e.level}`) : Co();
		}
		function re() {
			E = null, Co();
		}
		function ie(e, t) {
			let n = te(e, t);
			if (!n) return;
			n.scrollIntoView({
				behavior: "smooth",
				block: "center"
			});
			let r = () => {
				E === n && So([n], `H${e.level}`);
			};
			window.addEventListener("scrollend", r, { once: !0 }), setTimeout(r, 700);
		}
		let ae = (e) => {
			let t = e.filter(Boolean);
			t.length && So(t);
		};
		async function D() {
			let { headings: e, links: t, images: n, ...i } = s.value, a = {
				...i,
				headings: e.map(({ level: e, text: t }) => ({
					level: e,
					text: t
				})),
				links: {
					...t,
					nofollow: t.nofollow.map(({ href: e, rel: t, text: n }) => ({
						href: e,
						rel: t,
						text: n
					}))
				},
				images: {
					total: n.total,
					noAlt: n.noAlt.length,
					emptyAlt: n.emptyAlt
				}
			};
			f.value = await mu(JSON.stringify(a, null, 2), r) ? "Report copied as JSON" : "Copy failed", setTimeout(() => {
				f.value = "";
			}, 1500);
		}
		let oe = W(() => [
			{
				label: "Open robots.txt",
				action: () => window.open("/robots.txt", "_blank")
			},
			...(s.value?.indexing.robotsTxt?.sitemaps ?? []).slice(0, 3).map((e) => ({
				label: `Open ${new URL(e, location.href).pathname}`,
				action: () => window.open(e, "_blank")
			})),
			{ separator: !0 },
			{
				label: "Open in the Rich Results Test",
				action: () => window.open(`https://search.google.com/test/rich-results?url=${encodeURIComponent(s.value.url)}`, "_blank"),
				disabled: !s.value
			},
			{
				label: "Open in the Schema Markup Validator",
				action: () => window.open(`https://validator.schema.org/#url=${encodeURIComponent(s.value.url)}`, "_blank"),
				disabled: !s.value
			},
			{ separator: !0 },
			{
				label: "Copy report as JSON",
				action: D,
				disabled: !s.value
			}
		]), se = (e) => window.open(e, "_blank"), O = (e) => e.replace(window.location.origin, ""), ce = /* @__PURE__ */ M(null), le = W(() => Math.max(1, ...(s.value?.weight.kinds ?? []).map((e) => e.encoded))), de = (e) => e === 200 ? "bg-emerald-500/15 text-emerald-700" : e >= 400 ? "bg-destructive/15 text-destructive" : "bg-amber-500/20 text-amber-800";
		return (e, t) => (L(), z(pu, {
			title: "SEO",
			side: "right",
			"width-key": "dev-seo-width",
			onClose: t[5] ||= (e) => n("close")
		}, Tr({
			count: P(() => [l.value ? (L(), R(I, { key: 0 }, [H("Reading…")], 64)) : s.value ? (L(), R(I, { key: 1 }, [
				S.value.error ? (L(), R("span", Jh, A(S.value.error) + " error" + A(S.value.error === 1 ? "" : "s"), 1)) : U("", !0),
				S.value.error && S.value.warning ? (L(), R("span", Yh, " · ")) : U("", !0),
				S.value.warning ? (L(), R("span", Xh, A(S.value.warning) + " warning" + A(S.value.warning === 1 ? "" : "s"), 1)) : U("", !0),
				!S.value.error && !S.value.warning ? (L(), R("span", Zh, "no issues")) : U("", !0)
			], 64)) : U("", !0)]),
			actions: P(() => [V(N(X), {
				variant: "ghost",
				size: "icon-sm",
				"aria-label": "Refresh",
				title: x.value,
				onClick: _
			}, {
				default: P(() => [V(N(ls), { class: k(l.value && "animate-spin") }, null, 8, ["class"])]),
				_: 1
			}, 8, ["title"]), V(tu, { items: oe.value }, {
				trigger: P(({ toggle: e, open: t }) => [V(N(X), {
					variant: "ghost",
					size: "icon-sm",
					"aria-label": "More",
					title: "More",
					"aria-expanded": t,
					onClick: e
				}, {
					default: P(() => [V(N(Yo))]),
					_: 1
				}, 8, ["aria-expanded", "onClick"])]),
				_: 1
			}, 8, ["items"])]),
			header: P(() => [B("div", Qh, [B("div", $h, [(L(), R(I, null, F(a, (e) => B("button", {
				key: e.value,
				type: "button",
				role: "tab",
				"aria-selected": o.value === e.value,
				class: k(["rounded-sm px-2.5 py-1 text-xs", o.value === e.value ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"]),
				title: e.title,
				onClick: (t) => v(e.value)
			}, A(e.label), 11, eg)), 64))]), s.value?.status ? (L(), R("span", {
				key: 0,
				class: k(["ml-auto rounded px-1.5 py-0.5 font-mono text-[11px] font-semibold", de(s.value.status)]),
				title: `HTTP ${s.value.status}`
			}, A(s.value.status), 11, tg)) : U("", !0)])]),
			default: P(() => [c.value ? (L(), R("p", ng, A(c.value), 1)) : U("", !0), s.value ? (L(), R(I, { key: 1 }, [
				s.value.issues.length ? (L(), R("section", rg, [B("ul", ig, [(L(!0), R(I, null, F(s.value.issues, (e, t) => (L(), R("li", {
					key: t,
					class: "flex items-baseline gap-2 text-xs"
				}, [e.level === "error" ? (L(), z(N(Ho), {
					key: 0,
					class: "text-destructive size-3.5 flex-none translate-y-0.5"
				})) : e.level === "warning" ? (L(), z(N(gs), {
					key: 1,
					class: "size-3.5 flex-none translate-y-0.5 text-amber-600"
				})) : (L(), z(N(ts), {
					key: 2,
					class: "text-muted-foreground size-3.5 flex-none translate-y-0.5"
				})), B("span", null, A(e.message), 1)]))), 128))])])) : U("", !0),
				B("section", ag, [V(Hh, { report: s.value }, null, 8, ["report"]), t[6] ||= B("p", { class: "text-muted-foreground mt-1.5 text-[11px]" }, "From the JSON-LD as Google documents it; Google picks what it shows.", -1)]),
				B("section", og, [
					B("h3", sg, [t[7] ||= H("Rich results ", -1), B("span", cg, A(s.value.rich.features.length), 1)]),
					s.value.rich.features.length ? U("", !0) : (L(), R("p", lg, "None: " + A(s.value.jsonLd.length ? "no type in the JSON-LD makes one" : "no JSON-LD"), 1)),
					(L(!0), R(I, null, F(s.value.rich.features, (e, n) => (L(), z(qh, {
						key: n,
						label: e.name,
						state: e.status === "result" || e.status === "elsewhere" ? e.recommended.length || e.notes.length ? "warning" : "ok" : C[e.status].state
					}, {
						default: P(() => [
							B("span", ug, A(C[e.status].label), 1),
							e.status === "elsewhere" ? (L(), R(I, { key: 0 }, [H(": " + A(e.where), 1)], 64)) : U("", !0),
							e.note ? (L(), R(I, { key: 1 }, [H(" · " + A(e.note), 1)], 64)) : U("", !0),
							B("p", {
								class: "text-muted-foreground truncate font-mono text-[11px]",
								title: e.label ?? ""
							}, [H(A(e.type), 1), e.label ? (L(), R(I, { key: 0 }, [H(" · " + A(e.label), 1)], 64)) : U("", !0)], 8, dg),
							e.missing.length ? (L(), R("p", fg, [t[8] ||= H("Missing: ", -1), B("span", pg, A(e.missing.join(", ")), 1)])) : U("", !0),
							e.recommended.length ? (L(), R("p", mg, [t[9] ||= H("Recommended: ", -1), B("span", hg, A(e.recommended.join(", ")), 1)])) : U("", !0),
							(L(!0), R(I, null, F(e.notes, (e) => (L(), R("p", {
								key: e,
								class: "text-muted-foreground text-[11px]"
							}, A(e), 1))), 128))
						]),
						_: 2
					}, 1032, ["label", "state"]))), 128))
				]),
				B("section", gg, [
					t[12] ||= B("h3", { class: "bg-background/95 sticky top-0 z-[5] px-4 py-1.5 text-xs font-semibold backdrop-blur" }, "Indexing", -1),
					s.value.status === null ? U("", !0) : (L(), z(qh, {
						key: 0,
						label: "Status",
						state: s.value.status === 200 ? "ok" : s.value.status >= 400 ? "error" : "warning"
					}, {
						default: P(() => [H(A(s.value.status), 1), s.value.redirected ? (L(), R(I, { key: 0 }, [t[10] ||= H(" · redirected from ", -1), B("span", _g, A(s.value.requested), 1)], 64)) : U("", !0)]),
						_: 1
					}, 8, ["state"])),
					V(qh, {
						label: "Robots",
						state: s.value.indexing.noindex ? "error" : s.value.indexing.nofollow ? "warning" : "ok"
					}, {
						default: P(() => [
							B("span", vg, A(s.value.indexing.noindex ? "noindex" : "index") + ", " + A(s.value.indexing.nofollow ? "nofollow" : "follow"), 1),
							s.value.indexing.robotsMeta ? (L(), R("p", yg, "meta robots: " + A(s.value.indexing.robotsMeta), 1)) : U("", !0),
							s.value.indexing.googlebotMeta ? (L(), R("p", bg, "meta googlebot: " + A(s.value.indexing.googlebotMeta), 1)) : U("", !0),
							s.value.indexing.robotsHeader ? (L(), R("p", xg, "X-Robots-Tag: " + A(s.value.indexing.robotsHeader), 1)) : U("", !0),
							!s.value.indexing.robotsMeta && !s.value.indexing.googlebotMeta && !s.value.indexing.robotsHeader ? (L(), R("p", Sg, "no robots meta" + A(s.value.live ? "" : " or header") + ": the default", 1)) : U("", !0)
						]),
						_: 1
					}, 8, ["state"]),
					s.value.indexing.robotsTxt ? (L(), z(qh, {
						key: 1,
						label: "robots.txt",
						state: s.value.indexing.robotsTxt.blockedBy ? "error" : "ok"
					}, {
						default: P(() => [s.value.indexing.robotsTxt.found ? s.value.indexing.robotsTxt.blockedBy ? (L(), R(I, { key: 1 }, [t[11] ||= H("blocked: ", -1), B("span", Cg, "Disallow: " + A(s.value.indexing.robotsTxt.blockedBy.path), 1)], 64)) : (L(), R(I, { key: 2 }, [H("allowed")], 64)) : (L(), R(I, { key: 0 }, [H("none found")], 64))]),
						_: 1
					}, 8, ["state"])) : U("", !0),
					V(qh, {
						label: "Canonical",
						state: {
							self: "ok",
							other: "warning",
							missing: "warning",
							multiple: "error"
						}[s.value.canonical.state]
					}, {
						default: P(() => [B("span", wg, A({
							self: "this page",
							other: "another URL",
							missing: "none",
							multiple: `${s.value.canonical.all.length} canonicals`
						}[s.value.canonical.state]), 1), (L(!0), R(I, null, F(s.value.canonical.all, (e) => (L(), R("p", {
							key: e,
							class: "text-muted-foreground font-mono text-[11px] break-all"
						}, A(e), 1))), 128))]),
						_: 1
					}, 8, ["state"])
				]),
				B("section", Tg, [
					t[13] ||= B("h3", { class: "bg-background/95 sticky top-0 z-[5] px-4 py-1.5 text-xs font-semibold backdrop-blur" }, "Title and description", -1),
					V(qh, {
						label: "Title",
						state: w(s.value.title.length, N(zm))
					}, {
						default: P(() => [H(A(s.value.title.value || "none") + " ", 1), B("span", Eg, [B("span", Dg, [B("span", {
							class: k(["absolute inset-y-0 left-0 rounded-full", w(s.value.title.length, N(zm)) === "ok" ? "bg-emerald-500" : "bg-amber-500"]),
							style: ue({ width: T(s.value.title.length, N(zm)) })
						}, null, 6)]), B("span", Og, A(s.value.title.length) + " / " + A(N(zm)[0]) + "–" + A(N(zm)[1]), 1)])]),
						_: 1
					}, 8, ["state"]),
					V(qh, {
						label: "Description",
						state: s.value.description.value ? w(s.value.description.length, N(Bm)) : "warning"
					}, {
						default: P(() => [H(A(s.value.description.value || "none") + " ", 1), B("span", kg, [B("span", Ag, [B("span", {
							class: k(["absolute inset-y-0 left-0 rounded-full", w(s.value.description.length, N(Bm)) === "ok" ? "bg-emerald-500" : "bg-amber-500"]),
							style: ue({ width: T(s.value.description.length, N(Bm)) })
						}, null, 6)]), B("span", jg, A(s.value.description.length) + " / " + A(N(Bm)[0]) + "–" + A(N(Bm)[1]), 1)])]),
						_: 1
					}, 8, ["state"])
				]),
				B("section", Mg, [
					B("div", Ng, [
						B("h3", Pg, [t[14] ||= H("Hreflang ", -1), B("span", Fg, A(s.value.hreflang.length), 1)]),
						s.value.hreflangSource.from === "sitemap" ? (L(), R("button", {
							key: 0,
							type: "button",
							class: "text-muted-foreground hover:text-foreground text-[11px] underline decoration-dotted",
							title: `Not in the head: listed in ${s.value.hreflangSource.sitemap}. Click to open it`,
							onClick: t[0] ||= (e) => se(s.value.hreflangSource.sitemap)
						}, "from the sitemap", 8, Ig)) : U("", !0),
						s.value.hreflang.length ? (L(), z(N(X), {
							key: 1,
							size: "xs",
							variant: "outline",
							class: "ml-auto",
							disabled: d.value,
							title: "Fetch each alternate: its status, and whether it lists this page back",
							onClick: y
						}, {
							default: P(() => [H(A(d.value ? "Checking…" : "Check alternates"), 1)]),
							_: 1
						}, 8, ["disabled"])) : U("", !0)
					]),
					s.value.hreflang.length ? U("", !0) : (L(), R("p", Lg, "None, " + A(s.value.hreflangSource.sitemapsRead ? "in the head or the sitemaps" : "in the head (no sitemap found)"), 1)),
					(L(!0), R(I, null, F(u.value ?? s.value.hreflang, (e, t) => (L(), R("div", {
						key: e.lang + e.href,
						class: "grid grid-cols-[4.5rem_minmax(0,1fr)_auto] items-baseline gap-2 px-4 py-1 text-xs"
					}, [
						B("span", { class: k(["font-mono font-medium", !e.valid && "text-amber-700"]) }, A(e.lang), 3),
						B("span", {
							class: "text-muted-foreground truncate font-mono text-[11px]",
							title: e.href
						}, A(e.href), 9, Rg),
						B("span", zg, [e.self ? (L(), R("span", Bg, "this page")) : u.value && u.value[t] ? (L(), R(I, { key: 1 }, [B("span", { class: k(e.status === 200 ? "text-emerald-700" : "text-amber-700") }, A(e.status), 3), e.back === null ? U("", !0) : (L(), R("span", {
							key: 0,
							class: k(e.back ? "text-emerald-700" : "text-destructive")
						}, " · " + A(e.back ? "links back" : "no link back"), 3))], 64)) : U("", !0)])
					]))), 128))
				]),
				B("section", Vg, [
					B("h3", Hg, [t[15] ||= H("Headings ", -1), B("span", Ug, A(s.value.headings.length), 1)]),
					s.value.headings.length ? U("", !0) : (L(), R("p", Wg, "None")),
					B("ul", {
						class: "px-2 pb-1",
						onMouseleave: re
					}, [(L(!0), R(I, null, F(s.value.headings, (e, t) => (L(), R("li", { key: t }, [B("button", {
						type: "button",
						class: "hover:bg-highlight/10 flex w-full items-baseline gap-2 rounded-sm px-2 py-0.5 text-left text-xs",
						style: ue({ paddingLeft: `${.5 + (e.level - 1) * .75}rem` }),
						title: `Scroll to this H${e.level}`,
						onMouseenter: (n) => ne(e, t),
						onFocus: (n) => ne(e, t),
						onClick: (n) => ie(e, t)
					}, [B("span", { class: k(["flex-none font-mono text-[10px] font-semibold", e.skipped ? "text-amber-700" : e.level === 1 ? "text-blue-600" : "text-muted-foreground"]) }, "H" + A(e.level), 3), B("span", Kg, A(e.text || "(empty)"), 1)], 44, Gg)]))), 128))], 32)
				]),
				B("section", qg, [
					t[16] ||= B("h3", { class: "bg-background/95 sticky top-0 z-[5] px-4 py-1.5 text-xs font-semibold backdrop-blur" }, "Social", -1),
					s.value.og["og:image"] ? (L(), R("div", Jg, [B("img", {
						src: s.value.og["og:image"],
						alt: "",
						class: "aspect-[1.91/1] w-full rounded-md border object-cover"
					}, null, 8, Yg)])) : U("", !0),
					(L(!0), R(I, null, F(s.value.og, (e, t) => (L(), z(qh, {
						key: t,
						label: t
					}, {
						default: P(() => [B("span", Xg, A(e), 1)]),
						_: 2
					}, 1032, ["label"]))), 128)),
					(L(!0), R(I, null, F(s.value.twitter, (e, t) => (L(), z(qh, {
						key: t,
						label: t
					}, {
						default: P(() => [B("span", Zg, A(e), 1)]),
						_: 2
					}, 1032, ["label"]))), 128)),
					!Object.keys(s.value.og).length && !Object.keys(s.value.twitter).length ? (L(), R("p", Qg, "No Open Graph or Twitter tags")) : U("", !0)
				]),
				B("section", $g, [
					B("h3", e_, [t[17] ||= H("Structured data ", -1), B("span", t_, A(s.value.jsonLd.length), 1)]),
					s.value.jsonLd.length ? U("", !0) : (L(), R("p", n_, "No JSON-LD")),
					(L(!0), R(I, null, F(s.value.jsonLd, (e, t) => (L(), R("details", {
						key: t,
						class: "px-4 py-1"
					}, [B("summary", r_, [e.error ? (L(), R("span", i_, "Does not parse: " + A(e.error), 1)) : U("", !0), (L(!0), R(I, null, F(e.types, (e) => (L(), R("span", {
						key: e,
						class: "bg-muted rounded px-1.5 py-0.5 font-mono text-[11px]"
					}, A(e), 1))), 128))]), B("div", a_, [e.error ? (L(), R("pre", o_, A(e.source), 1)) : (L(), z(hd, {
						key: 1,
						value: e.data
					}, null, 8, ["value"]))])]))), 128))
				]),
				B("section", s_, [
					t[21] ||= B("h3", { class: "bg-background/95 sticky top-0 z-[5] px-4 py-1.5 text-xs font-semibold backdrop-blur" }, "Page weight", -1),
					V(qh, { label: "HTML" }, {
						default: P(() => [s.value.weight.html ? (L(), R(I, { key: 0 }, [
							B("span", c_, A(N(bf)(s.value.weight.html.transferred || s.value.weight.html.encoded)), 1),
							H(" transferred · " + A(N(bf)(s.value.weight.html.decoded)) + " uncompressed ", 1),
							t[18] ||= B("p", { class: "text-muted-foreground text-[11px]" }, "as a crawler gets it, without the dev tools", -1)
						], 64)) : s.value.weight.load ? (L(), R(I, { key: 1 }, [
							B("span", l_, A(N(bf)(s.value.weight.load.encoded)), 1),
							H(" · " + A(N(bf)(s.value.weight.load.decoded)) + " uncompressed ", 1),
							t[19] ||= B("p", { class: "text-muted-foreground text-[11px]" }, "this load, the dev tools in it: Server for a clean copy", -1)
						], 64)) : (L(), R(I, { key: 2 }, [H("unknown")], 64))]),
						_: 1
					}),
					V(qh, { label: "Assets" }, {
						default: P(() => [
							B("span", u_, A(N(bf)(s.value.weight.total.encoded)), 1),
							H(" in " + A(s.value.weight.total.count) + " files · " + A(N(bf)(s.value.weight.total.transferred)) + " over the network ", 1),
							t[20] ||= B("p", { class: "text-muted-foreground text-[11px]" }, "so far: lazy files come as the page scrolls; files from the cache transfer nothing", -1)
						]),
						_: 1
					}),
					B("ul", d_, [(L(!0), R(I, null, F(s.value.weight.kinds, (e) => (L(), R("li", {
						key: e.kind,
						class: "relative",
						onMouseenter: (t) => ce.value = e.kind,
						onMouseleave: t[1] ||= (e) => ce.value = null
					}, [B("div", p_, [
						B("span", m_, A(N(ah)[e.kind]), 1),
						B("span", h_, [B("span", {
							class: "bg-highlight/70 block h-full rounded-full",
							style: ue({ width: `${e.encoded / le.value * 100}%` })
						}, null, 4)]),
						B("span", g_, A(N(bf)(e.encoded)), 1),
						B("span", __, A(e.count), 1)
					]), ce.value === e.kind ? (L(), R("div", v_, [(L(!0), R(I, null, F(e.files.slice(0, z_), (e) => (L(), R("div", {
						key: e.url,
						class: "grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3 rounded-sm px-1.5 py-0.5"
					}, [B("span", {
						class: "truncate font-mono text-[11px]",
						title: e.url
					}, A(O(e.url)), 9, y_), B("span", b_, [e.status >= 400 ? (L(), R("span", x_, A(e.status), 1)) : U("", !0), B("span", {
						class: k(!e.encoded && "text-muted-foreground"),
						title: e.encoded ? `${N(bf)(e.transferred)} over the network` : "No size: another origin without Timing-Allow-Origin"
					}, A(e.encoded ? N(bf)(e.encoded) : "—"), 11, S_)])]))), 128)), e.files.length > z_ ? (L(), R("p", C_, "and " + A(e.files.length - z_) + " more", 1)) : U("", !0)])) : U("", !0)], 40, f_))), 128))]),
					s.value.weight.unsized ? (L(), R("p", w_, A(s.value.weight.unsized) + " file" + A(s.value.weight.unsized === 1 ? "" : "s") + " from other origins without a size (no Timing-Allow-Origin), not counted. ", 1)) : U("", !0),
					s.value.weight.failed.length ? (L(), R("p", T_, [H(A(s.value.weight.failed.length) + " answered with an error, downloaded all the same: ", 1), (L(!0), R(I, null, F(s.value.weight.failed, (e, t) => (L(), R("span", {
						key: e.url,
						class: "font-mono",
						title: e.url
					}, [H(A(t ? ", " : "") + A(O(e.url)) + " " + A(e.status), 1), e.bytes ? (L(), R(I, { key: 0 }, [H(" (" + A(N(bf)(e.bytes)) + ")", 1)], 64)) : U("", !0)], 8, E_))), 128))])) : U("", !0),
					s.value.weight.devServer ? (L(), R("p", D_, " Served by the Vite dev server: scripts and styles are unbundled and unminified, nothing like production. ")) : U("", !0)
				]),
				B("section", O_, [
					t[22] ||= B("h3", { class: "bg-background/95 sticky top-0 z-[5] px-4 py-1.5 text-xs font-semibold backdrop-blur" }, "Page", -1),
					V(qh, {
						label: "Language",
						state: s.value.lang ? "ok" : "warning"
					}, {
						default: P(() => [B("span", k_, A(s.value.lang || "none"), 1)]),
						_: 1
					}, 8, ["state"]),
					V(qh, {
						label: "Viewport",
						state: s.value.viewport ? "ok" : "warning"
					}, {
						default: P(() => [B("span", A_, A(s.value.viewport || "none"), 1)]),
						_: 1
					}, 8, ["state"]),
					V(qh, { label: "Links" }, {
						default: P(() => [H(A(s.value.links.internal) + " internal · " + A(s.value.links.external) + " external ", 1), s.value.links.nofollow.length ? (L(), R("details", j_, [B("summary", M_, A(s.value.links.nofollow.length) + " nofollow / ugc / sponsored", 1), B("ul", {
							class: "mt-1 grid gap-0.5",
							onMouseleave: t[2] ||= (...e) => N(Co) && N(Co)(...e)
						}, [(L(!0), R(I, null, F(s.value.links.nofollow, (e, t) => (L(), R("li", {
							key: t,
							class: k(["truncate rounded-sm font-mono text-[11px]", e.element && "hover:bg-highlight/10"]),
							title: e.href,
							onMouseenter: (t) => e.element ? ae([e.element]) : N(Co)()
						}, A(e.rel) + " · " + A(e.text || e.href), 43, N_))), 128))], 32)])) : U("", !0)]),
						_: 1
					}),
					V(qh, {
						label: "Images",
						state: s.value.images.noAlt.length ? "warning" : "ok"
					}, {
						default: P(() => [
							H(A(s.value.images.total) + " · ", 1),
							B("span", {
								class: k([s.value.images.noAlt.length && "text-amber-700", s.value.live && s.value.images.noAlt.length && "cursor-help underline decoration-dotted"]),
								title: s.value.live ? "Hover to outline them" : "Switch to Rendered to outline them",
								onMouseenter: t[3] ||= (e) => s.value.live && ae(s.value.images.noAlt),
								onMouseleave: t[4] ||= (...e) => N(Co) && N(Co)(...e)
							}, A(s.value.images.noAlt.length) + " without alt", 43, P_),
							H(" · " + A(s.value.images.emptyAlt) + " decorative (alt=\"\") ", 1)
						]),
						_: 1
					}, 8, ["state"]),
					s.value.prev || s.value.next ? (L(), z(qh, {
						key: 0,
						label: "Pagination"
					}, {
						default: P(() => [s.value.prev ? (L(), R("p", F_, "prev: " + A(s.value.prev), 1)) : U("", !0), s.value.next ? (L(), R("p", I_, "next: " + A(s.value.next), 1)) : U("", !0)]),
						_: 1
					})) : U("", !0)
				])
			], 64)) : U("", !0)]),
			_: 2
		}, [f.value ? {
			name: "footer",
			fn: P(() => [B("p", L_, A(f.value), 1)]),
			key: "0"
		} : void 0]), 1024));
	}
}, V_ = {
	__name: "Input",
	props: {
		defaultValue: {
			type: [String, Number],
			required: !1
		},
		modelValue: {
			type: [String, Number],
			required: !1
		},
		class: {
			type: [
				Boolean,
				null,
				String,
				Object,
				Array
			],
			required: !1,
			skipCheck: !0
		}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = e, r = /* @__PURE__ */ Ts(n, "modelValue", t, {
			passive: !0,
			defaultValue: n.defaultValue
		});
		return (e, t) => Gn((L(), R("input", {
			"onUpdate:modelValue": t[0] ||= (e) => /* @__PURE__ */ Qt(r) ? r.value = e : null,
			"data-slot": "input",
			class: k(N(Ol)("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3", "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", n.class))
		}, null, 2)), [[io, N(r)]]);
	}
}, H_ = {
	__name: "Switch",
	props: {
		defaultValue: {
			type: null,
			required: !1
		},
		modelValue: {
			type: null,
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		id: {
			type: String,
			required: !1
		},
		value: {
			type: String,
			required: !1
		},
		trueValue: {
			type: null,
			required: !1
		},
		falseValue: {
			type: null,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		},
		name: {
			type: String,
			required: !1
		},
		required: {
			type: Boolean,
			required: !1
		},
		class: {
			type: [
				Boolean,
				null,
				String,
				Object,
				Array
			],
			required: !1,
			skipCheck: !0
		}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = Ls(Cs(n, "class"), r);
		return (e, t) => (L(), z(N(Xs), Ui({ "data-slot": "switch" }, N(i), { class: N(Ol)("peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50", n.class) }), {
			default: P((t) => [V(N(Zs), {
				"data-slot": "switch-thumb",
				class: k(N(Ol)("bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"))
			}, {
				default: P(() => [Er(e.$slots, "thumb", he(Ri(t)))]),
				_: 2
			}, 1032, ["class"])]),
			_: 3
		}, 16, ["class"]));
	}
}, U_ = {
	__name: "Textarea",
	props: {
		class: {
			type: [
				Boolean,
				null,
				String,
				Object,
				Array
			],
			required: !1,
			skipCheck: !0
		},
		defaultValue: {
			type: [String, Number],
			required: !1
		},
		modelValue: {
			type: [String, Number],
			required: !1
		}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = e, r = /* @__PURE__ */ Ts(n, "modelValue", t, {
			passive: !0,
			defaultValue: n.defaultValue
		});
		return (e, t) => Gn((L(), R("textarea", {
			"onUpdate:modelValue": t[0] ||= (e) => /* @__PURE__ */ Qt(r) ? r.value = e : null,
			"data-slot": "textarea",
			class: k(N(Ol)("border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", n.class))
		}, null, 2)), [[io, N(r)]]);
	}
}, W_ = "dev-tokens", G_ = "dev-tokens-css", K_ = "dev-tokens-folded", q_ = "dev-tokens-editors", J_ = "dev-tokens-width", Y_ = "dev-tokens-overrides", X_ = (e, t) => {
	try {
		return JSON.parse(sessionStorage.getItem(e)) ?? t;
	} catch {
		return t;
	}
}, Z_ = (e, t) => {
	try {
		sessionStorage.setItem(e, JSON.stringify(t));
	} catch {}
}, Q_ = ":root", $_ = (e, t) => `${e}@${t}`;
function ev() {
	let e = X_(W_, {});
	return Object.fromEntries(Object.entries(e).map(([e, t]) => {
		let n = e.includes("@") ? e : $_(e, Q_);
		if (typeof t == "string") return [n, { 0: t }];
		let r = {};
		return Object.entries(t).forEach(([e, t]) => {
			(e === "" || /^\d+$/.test(e)) && (r[e === "" ? 0 : e] = t);
		}), [n, r];
	}));
}
function tv(e) {
	if (e === "") return 0;
	let t = e.match(/^\(min-width:\s*([\d.]+)(px|r?em)\)$/);
	return t ? Math.round(Number(t[1]) * (t[2] === "px" ? 1 : 16)) : null;
}
var nv = (e) => e.replace(/\s+/g, " ").trim().replace(/[\s;]+$/, "");
function rv(e) {
	let t = /* @__PURE__ */ new Map();
	return e.forEach(({ selector: e, name: n, values: r }) => {
		Object.entries(r).forEach(([r, i]) => {
			t.has(Number(r)) || t.set(Number(r), /* @__PURE__ */ new Map([[Q_, []]]));
			let a = t.get(Number(r));
			a.has(e) || a.set(e, []), a.get(e).push(`${n}: ${nv(i)};`);
		});
	}), [...t].sort(([e], [t]) => e - t).map(([e, t]) => {
		let n = [...t].filter(([, e]) => e.length).map(([e, t]) => `${e} {\n  ${t.join("\n  ")}\n}`).join("\n\n");
		return e === 0 ? n : `@media (min-width: ${e}px) {\n${n.replace(/^/gm, "  ")}\n}`;
	}).join("\n\n");
}
function iv(e) {
	let t = document.getElementById(Y_);
	t || (t = document.createElement("style"), t.id = Y_), (t.parentNode !== document.documentElement || t.compareDocumentPosition(document.body) & Node.DOCUMENT_POSITION_FOLLOWING) && document.documentElement.append(t), t.textContent = e;
}
var av = (e) => /^(:root|html)(?![\w-])[^\s>+~]*$/.test(e.trim());
function ov(e) {
	let t = new CSSStyleSheet(), n = [];
	t.replaceSync(e);
	let r = (e, t) => {
		for (let i of e) {
			if (i instanceof CSSMediaRule) {
				let e = tv(i.conditionText);
				e !== null && r(i.cssRules, Math.max(t, e));
				continue;
			}
			if (!i.selectorText || !i.style) continue;
			let e = i.selectorText.split(",").some(av) ? Q_ : i.selectorText;
			for (let r of i.style) {
				let a = i.style.getPropertyValue(r).trim();
				r.startsWith("--") && a && n.push({
					selector: e,
					name: r,
					width: t,
					value: a
				});
			}
		}
	};
	return r(t.cssRules, 0), n;
}
function sv() {
	let e = /* @__PURE__ */ new Map(), t = (n, r) => {
		for (let i of n) {
			let n = r;
			if (i instanceof CSSMediaRule) {
				let e = tv(i.conditionText);
				n = e === null || r === null ? null : Math.max(r, e);
			}
			let a = i.selectorText;
			if (n !== null && a && i.style && !a.includes("&")) {
				let t = a.split(",").some(av) ? Q_ : a;
				for (let r of i.style) {
					if (!r.startsWith("--") || r.startsWith("--wp")) continue;
					let a = $_(r, t);
					e.has(a) || e.set(a, {
						id: a,
						name: r,
						selector: t,
						declared: {}
					}), e.get(a).declared[n] = i.style.getPropertyValue(r).trim();
				}
			}
			i.cssRules && t(i.cssRules, n);
		}
	};
	for (let e of document.styleSheets) if (e.ownerNode?.id !== "dev-tokens-overrides") try {
		t(e.cssRules, 0);
	} catch {}
	return [...e.values()].sort((e, t) => e.selector === ":root" == (t.selector === ":root") ? e.selector.localeCompare(t.selector) || e.name.localeCompare(t.name) : e.selector === ":root" ? -1 : 1);
}
function cv(e, t) {
	let n = document.documentElement;
	if (t !== ":root") try {
		n = document.querySelector(t.split(",")[0].replace(Ev, "").trim());
	} catch {
		n = null;
	}
	return n ? getComputedStyle(n).getPropertyValue(e).trim() : "";
}
function lv(e, t) {
	let n = Object.keys(e).map(Number).filter((e) => e <= t).sort((e, t) => e - t).at(-1);
	return n === void 0 ? {
		value: "",
		from: null
	} : {
		value: e[n],
		from: n
	};
}
var uv = {
	linear: [
		0,
		0,
		1,
		1
	],
	ease: [
		.25,
		.1,
		.25,
		1
	],
	"ease-in": [
		.42,
		0,
		1,
		1
	],
	"ease-out": [
		0,
		0,
		.58,
		1
	],
	"ease-in-out": [
		.42,
		0,
		.58,
		1
	]
}, dv = (e) => {
	if (uv[e]) return [...uv[e]];
	let t = e.match(/^cubic-bezier\(([^)]+)\)$/)?.[1].split(",").map(Number);
	return t?.length === 4 && t.every((e) => !Number.isNaN(e)) ? t : [
		0,
		0,
		1,
		1
	];
}, fv = (e) => {
	let t = e.match(/^linear\((.+)\)$/)?.[1].split(",").map((e) => {
		let [t, ...n] = e.trim().split(/\s+/);
		return {
			y: Number(t),
			xs: n.map((e) => parseFloat(e) / 100)
		};
	});
	if (!t?.length || t.some((e) => Number.isNaN(e.y))) return null;
	let n = t.flatMap(({ y: e, xs: t }) => (t.length ? t : [null]).map((t) => [t, e]));
	return n[0][0] ??= 0, n.at(-1)[0] ??= 1, n.forEach((e, t) => {
		e[0] !== null && t && (e[0] = Math.max(e[0], n.slice(0, t).findLast((e) => e[0] !== null)[0]));
	}), n.forEach((e, t) => {
		if (e[0] !== null) return;
		let r = t - 1, i = n.findIndex((e, n) => n > t && e[0] !== null);
		for (let e = t; e < i; e++) n[e][0] = n[r][0] + (n[i][0] - n[r][0]) * (e - r) / (i - r);
	}), n;
}, pv = /^(-?\d*\.?\d+)(ms|s|px|rem|em|%|vw|vh|dvh|svh)?$/, mv = {
	ms: 10,
	s: .05,
	px: 1,
	rem: .125,
	em: .125,
	"%": 1,
	vw: 1,
	vh: 1
}, hv = [{
	units: [
		"px",
		"rem",
		"em",
		"%",
		"vw",
		"vh"
	],
	base: {
		px: 1,
		rem: 16,
		em: 16
	}
}, {
	units: ["ms", "s"],
	base: {
		ms: 1,
		s: 1e3
	}
}], gv = (e) => hv.find((t) => t.units.includes(e)), _v = (e) => e.match(pv)?.[2] ?? null;
function vv(e, t, n) {
	let { base: r } = gv(t) || {};
	return !r?.[t] || !r?.[n] ? e : Math.round(e * r[t] / r[n] * 1e4) / 1e4;
}
function yv(e) {
	let t = e.match(pv);
	return /^cubic-bezier\(|^(linear|ease|ease-in|ease-out|ease-in-out)$/.test(e) || fv(e) ? {
		type: "easing",
		unit: null
	} : t ? {
		type: "number",
		unit: t[2] || "",
		step: mv[t[2] || ""] ?? .05
	} : e && CSS.supports("color", e) ? {
		type: "color",
		unit: null
	} : {
		type: "text",
		unit: null
	};
}
var bv = [
	{
		value: "",
		label: "Auto"
	},
	{
		value: "color",
		label: "Colour"
	},
	{
		value: "easing",
		label: "Bezier"
	},
	{
		value: "length",
		label: "Length",
		unit: "px"
	},
	{
		value: "duration",
		label: "Duration",
		unit: "ms"
	},
	{
		value: "number",
		label: "Number",
		unit: ""
	},
	{
		value: "text",
		label: "Text"
	}
];
function xv(e, t) {
	let n = bv.find((e) => e.value === t);
	if (!n?.value) return yv(e);
	if (n.unit === void 0) return {
		type: n.value,
		unit: null
	};
	let r = _v(e), i = n.unit && gv(n.unit).units.includes(r) ? r : n.unit;
	return {
		type: "number",
		unit: i,
		step: mv[i] ?? .05
	};
}
var Sv = null;
function Cv(e) {
	Sv ??= document.createElement("canvas").getContext("2d"), Sv.fillStyle = "#000000", Sv.fillStyle = e;
	let t = Sv.fillStyle;
	if (t.startsWith("#")) return t;
	let [n, r, i] = t.match(/[\d.]+/g) || [];
	return n === void 0 ? "#000000" : "#" + [
		n,
		r,
		i
	].map((e) => Math.round(e).toString(16).padStart(2, "0")).join("");
}
var wv = /var\(\s*(--[\w-]+)/g, Tv = /(?:^|;)\s*([\w-]+)\s*:\s*([^;]*)/g, Ev = /::?(before|after|placeholder|selection|marker|backdrop|file-selector-button|-webkit-[\w-]+|-moz-[\w-]+)(\([^)]*\))?|:(hover|focus-visible|focus-within|focus|active|visited|target)(?![\w-])/g;
function Dv() {
	let e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map(), n = (e, t, n) => {
		e.has(t) || e.set(t, []), e.get(t).push(n);
	}, r = (i) => {
		for (let a of i) if (!(a instanceof CSSMediaRule && !window.matchMedia(a.conditionText).matches)) {
			if (a.selectorText && a.style && !a.selectorText.includes("&")) {
				let r = a.selectorText.split(",").every(av);
				for (let [, i, o] of a.style.cssText.matchAll(Tv)) for (let [, s] of o.matchAll(wv)) i.startsWith("--") ? n(t, s, i) : r || n(e, s, {
					selector: a.selectorText,
					property: i
				});
			}
			a.cssRules && r(a.cssRules);
		}
	};
	for (let e of document.styleSheets) if (e.ownerNode?.id !== "dev-tokens-overrides") try {
		r(e.cssRules);
	} catch {}
	return {
		uses: e,
		dependants: t
	};
}
function Ov(e, { uses: t, dependants: n }, r = null) {
	let i = /* @__PURE__ */ new Set([e]);
	for (let e of i) n.get(e)?.forEach((e) => i.add(e));
	let a = /* @__PURE__ */ new Map();
	return i.forEach((e) => t.get(e)?.forEach(({ selector: e, property: t }) => {
		e.split(",").forEach((e) => {
			let n = e.replace(Ev, "").trim();
			if (n) try {
				(r ? [...r.matches(n) ? [r] : [], ...r.querySelectorAll(n)] : document.querySelectorAll(n)).forEach((e) => {
					Wu(e) || (a.has(e) || a.set(e, /* @__PURE__ */ new Set()), a.get(e).add(t));
				});
			} catch {}
		});
	})), a;
}
var kv = [
	null,
	"::before",
	"::after"
], Av = (e, t) => kv.map((n) => {
	let r = getComputedStyle(e, n);
	return [...t].map((e) => r.getPropertyValue(e)).join("|");
}).join("||");
function jv(e, t, n) {
	let r = document.createElement("style"), i = document.createElement("style");
	r.textContent = "*, *::before, *::after { transition-property: none !important; }", i.textContent = `${t} { ${e}: initial !important; }`, document.head.append(r);
	let a = new Map([...n].map(([e, t]) => [e, Av(e, t)]));
	document.head.append(i);
	let o = [...n].filter(([e, t]) => Av(e, t) !== a.get(e)).map(([e]) => e);
	return i.remove(), getComputedStyle(document.body).color, r.remove(), o;
}
//#endregion
//#region src/tools/tokens/store.js
var Mv = null, Nv = null, Pv = {
	uses: /* @__PURE__ */ new Map(),
	dependants: /* @__PURE__ */ new Map()
}, $ = /* @__PURE__ */ Vt({
	tokens: [],
	tabs: [{
		label: "Base",
		width: 0
	}],
	tab: 0,
	query: "",
	onlyChanged: !1,
	picking: !1,
	picked: null,
	folded: Rl(K_, []),
	viewport: 0
});
Y.tokensChanged = Object.values(ev()).filter((e) => Object.keys(e).length).length, window.addEventListener("resize", () => {
	$.viewport++;
}, { passive: !0 });
function Fv(e) {
	let t = ev(), n = X_(q_, {});
	Pv = Dv(), $.tokens = sv().map(({ id: e, name: r, selector: i, declared: a }) => {
		let o = lv(a, Infinity).value, s = n[e] ?? "";
		return {
			id: e,
			name: r,
			selector: i,
			...xv(o.includes("var(") ? cv(r, i) : o, s),
			editor: s,
			declared: a,
			overrides: t[e] || {},
			using: null,
			editing: !1
		};
	});
	let r = new Set($.tokens.map((e) => e.id));
	Object.entries(t).filter(([e, t]) => !r.has(e) && Object.keys(t).length).forEach(([e, t]) => {
		let r = e.indexOf("@");
		$.tokens.push(dy(e.slice(0, r), e.slice(r + 1), t, n[e]));
	});
	let i = /* @__PURE__ */ new Map([[0, "Base"]]);
	Object.entries(e).forEach(([e, t]) => {
		Number(t) && i.set(Number(t), e);
	}), $.tokens.forEach((e) => Object.keys(e.declared).map(Number).forEach((e) => {
		i.has(e) || i.set(e, `${e}px`);
	})), $.tabs = [...i].sort(([e], [t]) => e - t).map(([e, t]) => ({
		width: e,
		label: t
	})), $.tab = 0, Mv?.isConnected ? by(Mv) : Sy();
}
var Iv = W(() => ($.viewport, $.tabs.filter((e) => window.matchMedia(`(min-width: ${e.width}px)`).matches).at(-1)?.width ?? 0)), Lv = (e) => $.tabs.find((t) => t.width === e)?.label ?? `${e}px`, Rv = (e) => Object.keys(e.overrides).length > 0, zv = (e) => $.tab in e.overrides, Bv = W(() => $.tokens.filter(Rv).length), Vv = (e) => $.tokens.filter((t) => e in t.overrides).length, Hv = (e, t) => Object.values({
	...e.declared,
	...e.overrides
}).some((e) => e != null && String(e).toLowerCase().includes(t)), Uv = W(() => {
	let e = $.query.trim().toLowerCase(), t = /* @__PURE__ */ new Map();
	return $.tokens.filter((e) => !$.onlyChanged || Rv(e)).filter((e) => !$.picked || $.picked.ids.includes(e.id)).filter((t) => !e || t.name.includes(e) || t.selector.toLowerCase().includes(e) || Hv(t, e)).forEach((e) => {
		let n = e.selector === ":root" ? e.name.replace(/^--/, "").split("-")[0] || "other" : e.selector.match(/\.[\w-]+/)?.[0] || e.selector;
		t.has(n) || t.set(n, []), t.get(n).push(e);
	}), [...t].map(([e, t]) => ({
		name: e,
		tokens: t
	}));
}), Wv = (e) => $.folded.includes(e.name);
function Gv(e) {
	$.folded = e, zl(K_, e);
}
function Kv(e) {
	Gv(Wv(e) ? $.folded.filter((t) => t !== e.name) : [...$.folded, e.name]);
}
function qv(e) {
	let t = Uv.value.map((e) => e.name);
	Gv(e ? [.../* @__PURE__ */ new Set([...$.folded, ...t])] : $.folded.filter((e) => !t.includes(e)));
}
var Jv = W(() => Uv.value.every(Wv)), Yv = W(() => !Uv.value.some(Wv)), Xv = (e) => lv({
	...e.declared,
	...e.overrides
}, $.tab);
function Zv(e) {
	let { from: t } = Xv(e);
	return t === null ? "not set" : t === $.tab ? zv(e) ? "changed here" : "set here" : `from ${Lv(t)}`;
}
var Qv = (e) => _v(Xv(e).value) ?? e.unit, $v = (e) => gv(Qv(e))?.units ?? [];
function ey(e, t, n = 1) {
	let r = Xv(e).value.match(pv);
	if (!r) return !1;
	let i = r[2] || "", a = (mv[i] ?? e.step ?? 1) * n;
	return cy(e, `${Math.round((Number(r[1]) + t * a) * 1e4) / 1e4}${i}`), !0;
}
function ty(e, t) {
	let n = parseFloat(Xv(e).value);
	cy(e, (Number.isNaN(n) ? 0 : vv(n, Qv(e), t)) + t);
}
function ny(e, t) {
	let n = Xv(e).value;
	Object.assign(e, xv(n.includes("var(") ? cv(e.name, e.selector) : n, t), { editor: t }), ry();
}
var ry = () => Z_(q_, Object.fromEntries($.tokens.filter((e) => e.editor).map((e) => [e.id, e.editor]))), iy = /var\(\s*(--[\w-]+)\s*\)?/g, ay = W(() => new Set($.tokens.map((e) => e.name))), oy = (e) => ay.value.has(e) || getComputedStyle(document.documentElement).getPropertyValue(e) !== "";
function sy(e) {
	let t = [], n = 0;
	for (let r of e.matchAll(iy)) oy(r[1]) || (t.push({ text: e.slice(n, r.index) }, {
		text: r[0],
		missing: r[1]
	}), n = r.index + r[0].length);
	return t.length ? (t.push({ text: e.slice(n) }), t) : null;
}
function cy(e, t, n = $.tab, r = !0) {
	let i = { ...e.overrides }, a = {
		...e.declared,
		...i
	};
	t = nv(t), delete i[n], delete a[n];
	let o = e.declared[n] ?? lv(a, n).value;
	t !== "" && t !== o && (i[n] = t), e.overrides = i, r && hy();
}
function ly(e) {
	let t = { ...e.overrides };
	delete t[$.tab], e.overrides = t, e.added && !Rv(e) && ($.tokens = $.tokens.filter((t) => t !== e)), hy();
}
function uy() {
	$.tokens = $.tokens.filter((e) => !e.added), $.tokens.forEach((e) => {
		e.overrides = {};
	}), hy();
}
function dy(e, t, n, r = "") {
	let i = lv(n, Infinity).value;
	return {
		id: $_(e, t),
		name: e,
		selector: t,
		...xv(i.includes("var(") ? "" : i, r),
		editor: r,
		declared: {},
		overrides: n,
		added: !0,
		using: null,
		editing: !1
	};
}
function fy({ name: e, selector: t, value: n, editor: r }) {
	if (e = e.trim(), t = t.trim() || ":root", n = n.trim(), !/^--[a-zA-Z_][\w-]*$/.test(e)) return { error: "A name like --my-variable" };
	if (!n) return { error: "A value too" };
	if (!CSS.supports(`selector(${t})`)) return { error: "Not a valid selector" };
	if ($.tokens.some((n) => n.id === $_(e, t))) return $.query = e, { error: `${e} is already there on ${t}` };
	let i = dy(e, t, { [$.tab]: n }, r);
	$.tokens.push(i), hy(), $.query = "", $.picked && $.picked.ids.push(i.id);
	let a = Uv.value.find((e) => e.tokens.some((e) => e.id === i.id));
	return a && Wv(a) && Kv(a), { token: i };
}
function py(e, t) {
	let n = $.tokens.filter((t) => t.name === e), r = n.find((e) => e.selector === t) ?? n.find((e) => e.selector === ":root") ?? n[0];
	if (!r) return null;
	Uv.value.some((e) => e.tokens.includes(r)) || ($.query = "", $.onlyChanged = !1, $.picked = null);
	let i = Uv.value.find((e) => e.tokens.includes(r));
	return i && Wv(i) && Kv(i), r;
}
function my(e, t) {
	let n = [];
	try {
		n = ov(e);
	} catch {}
	if (!n.length) return {
		error: !0,
		note: "No variables found in that."
	};
	t && ($.tokens = $.tokens.filter((e) => !e.added), $.tokens.forEach((e) => {
		e.overrides = {};
	}));
	let r = 0;
	n.forEach(({ selector: e, name: t, width: n, value: i }) => {
		let a = $.tokens.find((n) => n.id === $_(t, e));
		if (a) return cy(a, i, n, !1);
		$.tokens.push(dy(t, e, { [n]: i })), r++;
	});
	let i = new Set($.tabs.map((e) => e.width));
	return n.forEach(({ width: e }) => {
		i.has(e) || (i.add(e), $.tabs.push({
			width: e,
			label: `${e}px`
		}));
	}), $.tabs.sort((e, t) => e.width - t.width), hy(), {
		error: !1,
		note: `${n.length} values read${r ? `, ${r} new variables` : ""}: ${Bv.value} tokens changed now.`
	};
}
function hy() {
	let e = $.tokens.filter(Rv), t = rv(e.map(({ selector: e, name: t, declared: n, overrides: r }) => ({
		selector: e,
		name: t,
		values: {
			...n,
			...r
		}
	})));
	Z_(W_, Object.fromEntries(e.map((e) => [e.id, e.overrides]))), Z_(G_, t), ry(), iv(t), Y.tokensChanged = e.length;
}
var gy = (e) => mu(rv($.tokens.filter(Rv).map(({ selector: e, name: t, overrides: n }) => ({
	selector: e,
	name: t,
	values: n
}))) + "\n", e), _y = (e) => mu(rv($.tokens.map(({ selector: e, name: t, declared: n, overrides: r }) => ({
	selector: e,
	name: t,
	values: {
		...n,
		...r
	}
}))) + "\n", e);
function vy() {
	if ($.picking) return yy();
	$.picking = !0;
	let e = (e) => {
		let t = Gu(e.clientX, e.clientY);
		t ? So([t], Ku(t)) : Co();
	}, t = (e) => {
		Gu(e.clientX, e.clientY) && (e.preventDefault(), e.stopImmediatePropagation());
	}, n = [
		["pointermove", e],
		["pointerdown", t],
		["mousedown", t],
		["pointerup", t],
		["mouseup", t],
		["click", (e) => {
			let n = Gu(e.clientX, e.clientY);
			n && (t(e), yy(), by(n));
		}],
		["keydown", (e) => {
			e.key === "Escape" && (e.preventDefault(), e.stopImmediatePropagation(), yy());
		}]
	];
	n.forEach(([e, t]) => window.addEventListener(e, t, !0)), Nv = () => n.forEach(([e, t]) => window.removeEventListener(e, t, !0));
}
function yy() {
	$.picking && ($.picking = !1, Nv?.(), Nv = null, Co());
}
function by(e) {
	Mv = e;
	let t = $.tokens.filter((t) => {
		let n = Ov(t.name, Pv, e);
		return n.size && jv(t.name, t.selector, n).length;
	}).map((e) => e.id);
	$.picked = {
		label: Ku(e),
		ids: t
	};
}
function xy() {
	let e = Mv?.parentElement;
	e && by(e);
}
function Sy() {
	Mv = null, $.picked = null, Co();
}
function Cy() {
	Mv?.isConnected && So([Mv], $.picked.label);
}
function wy(e) {
	let t = jv(e.name, e.selector, Ov(e.name, Pv));
	e.using = {
		page: t.length,
		screen: So(t)
	};
}
//#endregion
//#region src/tools/tokens/SelectorField.vue
var Ty = { class: "relative min-w-0" }, Ey = ["aria-expanded"], Dy = {
	key: 0,
	role: "listbox",
	class: "bg-popover absolute inset-x-0 top-full z-20 mt-1 max-h-56 overflow-y-auto rounded-md border p-1 shadow-md"
}, Oy = [
	"data-index",
	"aria-selected",
	"onMousedown",
	"onMouseenter"
], ky = { class: "min-w-0 truncate font-mono text-xs" }, Ay = { class: "text-muted-foreground ml-auto flex-none font-mono text-[10px]" }, jy = {
	__name: "SelectorField",
	props: {
		modelValue: {
			type: String,
			default: ""
		},
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let t = Ir(e, "modelValue"), n = /* @__PURE__ */ M(null), r = /* @__PURE__ */ M(!1), i = /* @__PURE__ */ M([]), a = /* @__PURE__ */ M(0), o = [];
		function s() {
			let e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
			$.tokens.forEach((t) => e.set(t.selector, (e.get(t.selector) ?? 0) + 1)), document.querySelectorAll("[class]").forEach((e) => {
				Wu(e) || e.classList.forEach((e) => {
					let n = `.${CSS.escape(e)}`;
					t.set(n, (t.get(n) ?? 0) + 1);
				});
			});
			let n = (e, t) => `${e} ${t}${e === 1 ? "" : "s"}`;
			o = [
				{
					selector: Q_,
					note: n(e.get(":root") ?? 0, "token")
				},
				...[...e].filter(([e]) => e !== Q_).sort(([e], [t]) => e.localeCompare(t)).map(([e, t]) => ({
					selector: e,
					note: n(t, "token")
				})),
				...[...t].filter(([t]) => !e.has(t)).sort(([e], [t]) => e.localeCompare(t)).map(([e, t]) => ({
					selector: e,
					note: n(t, "element")
				}))
			];
		}
		function c(e) {
			let n = e ? "" : t.value.trim().toLowerCase(), s = o.filter((e) => e.selector.toLowerCase().includes(n));
			i.value = n ? s.sort((e, t) => t.selector.toLowerCase().startsWith(n) - e.selector.toLowerCase().startsWith(n)) : s, a.value = 0, r.value = i.value.length > 0;
		}
		function l(e) {
			if (e.code === "Space" && e.ctrlKey || !r.value && e.key === "ArrowDown") return e.preventDefault(), c(!0);
			r.value && (e.key === "ArrowDown" || e.key === "ArrowUp" ? (e.preventDefault(), a.value = (a.value + (e.key === "ArrowDown" ? 1 : -1) + i.value.length) % i.value.length, n.value.parentElement.querySelector(`[data-index="${a.value}"]`)?.scrollIntoView({ block: "nearest" })) : e.key === "Enter" || e.key === "Tab" ? (e.preventDefault(), u(i.value[a.value].selector)) : e.key === "Escape" && (e.stopPropagation(), d()));
		}
		function u(e) {
			t.value = e, d();
		}
		function d() {
			r.value = !1;
		}
		return (e, o) => (L(), R("div", Ty, [Gn(B("input", {
			ref_key: "input",
			ref: n,
			"onUpdate:modelValue": o[0] ||= (e) => t.value = e,
			class: "border-input focus-visible:border-ring focus-visible:ring-ring/50 placeholder:text-muted-foreground h-8 w-full min-w-0 rounded-md border bg-transparent px-3 font-mono text-xs shadow-xs outline-none focus-visible:ring-3",
			placeholder: ":root",
			"aria-label": "Selector it is set on",
			role: "combobox",
			autocomplete: "off",
			"aria-autocomplete": "list",
			"aria-expanded": r.value,
			spellcheck: "false",
			onFocus: s,
			onInput: o[1] ||= (e) => c(!1),
			onClick: d,
			onKeydown: l,
			onBlur: d
		}, null, 40, Ey), [[io, t.value]]), r.value ? (L(), R("ul", Dy, [(L(!0), R(I, null, F(i.value, (e, t) => (L(), R("li", {
			key: e.selector,
			role: "option",
			"data-index": t,
			"aria-selected": t === a.value,
			class: k(["flex cursor-pointer items-baseline gap-2 rounded-sm px-2 py-1", t === a.value && "bg-accent"]),
			onMousedown: fo((t) => u(e.selector), ["prevent"]),
			onMouseenter: (e) => a.value = t
		}, [B("span", ky, A(e.selector), 1), B("small", Ay, A(e.note), 1)], 42, Oy))), 128))])) : U("", !0)]));
	}
}, My = ["aria-expanded", "aria-label"], Ny = {
	viewBox: "-10 -35 120 170",
	class: "h-5 w-4 overflow-visible",
	"aria-hidden": "true"
}, Py = ["d"], Fy = {
	key: 0,
	class: "bg-popover absolute top-full left-0 z-20 mt-1 flex w-56 flex-col gap-2 rounded-md border p-3 shadow-lg"
}, Iy = ["d"], Ly = { key: 0 }, Ry = ["x2", "y2"], zy = ["x2", "y2"], By = ["cx", "cy"], Vy = ["cx", "cy"], Hy = {
	class: "bg-muted relative block h-2 overflow-hidden rounded-full",
	"aria-hidden": "true"
}, Uy = {
	__name: "EasingEditor",
	props: { token: {
		type: Object,
		required: !0
	} },
	setup(e) {
		let t = e, n = /* @__PURE__ */ M(null), r = /* @__PURE__ */ M(null), i = /* @__PURE__ */ M(!1), a = /* @__PURE__ */ M(dv(Xv(t.token).value)), o = /* @__PURE__ */ M(null), s = W(() => Xv(t.token).value), c = W(() => !!fv(s.value));
		Qn(s, (e) => {
			o.value === null && (a.value = dv(e));
		});
		let l = (e) => a.value[e] * 100, u = (e) => 100 - a.value[e] * 100;
		function d(e) {
			let t = fv(e);
			if (t) return "M" + t.map(([e, t]) => `${e * 100},${100 - t * 100}`).join(" L");
			let [n, r, i, a] = dv(e);
			return `M0,100 C${n * 100},${100 - r * 100} ${i * 100},${100 - a * 100} 100,0`;
		}
		let f = W(() => c.value ? d(s.value) : `M0,100 C${l(0)},${u(1)} ${l(2)},${u(3)} 100,0`);
		function p(e, t) {
			o.value = e, t.target.setPointerCapture(t.pointerId);
		}
		function m(e) {
			if (o.value === null) return;
			let n = r.value.getBoundingClientRect(), i = (e.clientX - n.left) / n.width * 120 - 10, s = (e.clientY - n.top) / n.height * 170 - 35, c = (e) => Math.round(e * 100) / 100, l = [...a.value];
			l[o.value] = c(Math.min(1, Math.max(0, i / 100))), l[o.value + 1] = c(Math.min(1.35, Math.max(-.35, (100 - s) / 100))), a.value = l, cy(t.token, `cubic-bezier(${l.join(", ")})`);
		}
		function h() {
			o.value = null;
		}
		function g(e) {
			e.composedPath().includes(n.value) || (i.value = !1);
		}
		return Qn(i, (e) => {
			e ? window.addEventListener("pointerdown", g, !0) : window.removeEventListener("pointerdown", g, !0);
		}), vr(() => window.removeEventListener("pointerdown", g, !0)), (e, a) => (L(), R("div", {
			ref_key: "editor",
			ref: n,
			class: "relative flex-none",
			onKeydown: a[3] ||= mo(fo((e) => i.value = !1, ["stop"]), ["escape"])
		}, [B("button", {
			type: "button",
			class: "hover:bg-muted flex size-6 items-center justify-center rounded-sm",
			"aria-expanded": i.value,
			"aria-label": `Edit ${t.token.name}`,
			onClick: a[0] ||= (e) => i.value = !i.value
		}, [(L(), R("svg", Ny, [B("path", {
			d: d(s.value),
			class: "fill-none stroke-current",
			"stroke-width": "8"
		}, null, 8, Py)]))], 8, My), i.value ? (L(), R("div", Fy, [(L(), R("svg", {
			ref_key: "svg",
			ref: r,
			viewBox: "-10 -35 120 170",
			class: "w-full touch-none overflow-visible",
			onPointermove: m,
			onPointerup: h,
			onPointercancel: h
		}, [
			a[4] ||= B("rect", {
				x: "0",
				y: "0",
				width: "100",
				height: "100",
				class: "fill-muted stroke-border",
				"stroke-width": "1"
			}, null, -1),
			B("path", {
				d: f.value,
				class: "stroke-foreground fill-none",
				"stroke-width": "2.5"
			}, null, 8, Iy),
			c.value ? U("", !0) : (L(), R("g", Ly, [
				B("line", {
					x1: 0,
					y1: 100,
					x2: l(0),
					y2: u(1),
					class: "stroke-highlight",
					"stroke-width": "1.5"
				}, null, 8, Ry),
				B("line", {
					x1: 100,
					y1: 0,
					x2: l(2),
					y2: u(3),
					class: "stroke-highlight",
					"stroke-width": "1.5"
				}, null, 8, zy),
				B("circle", {
					r: "5",
					cx: l(0),
					cy: u(1),
					class: "fill-highlight cursor-grab",
					onPointerdown: a[1] ||= (e) => p(0, e)
				}, null, 40, By),
				B("circle", {
					r: "5",
					cx: l(2),
					cy: u(3),
					class: "fill-highlight cursor-grab",
					onPointerdown: a[2] ||= (e) => p(2, e)
				}, null, 40, Vy)
			]))
		], 544)), B("span", Hy, [B("span", {
			class: "easing-preview bg-foreground absolute top-0 left-0 size-2 rounded-full",
			style: ue({ animationTimingFunction: s.value })
		}, null, 4)])])) : U("", !0)], 544));
	}
}, Wy = { class: "relative min-w-0" }, Gy = { class: "border-input focus-within:border-ring focus-within:ring-ring/50 bg-background flex h-8 items-center rounded-md border shadow-xs focus-within:ring-3" }, Ky = ["title"], qy = ["value", "aria-label"], Jy = { class: "relative h-full min-w-0 flex-1" }, Yy = [
	"id",
	"title",
	"value",
	"aria-expanded"
], Xy = {
	key: 0,
	role: "listbox",
	class: "bg-popover absolute inset-x-0 top-full z-20 mt-1 max-h-56 overflow-y-auto rounded-md border p-1 shadow-md"
}, Zy = [
	"aria-selected",
	"onMousedown",
	"onMouseenter"
], Qy = { class: "font-mono text-xs" }, $y = { class: "text-muted-foreground ml-auto truncate font-mono text-[10px]" }, eb = {
	__name: "ValueField",
	props: { token: {
		type: Object,
		required: !0
	} },
	setup(e) {
		let t = e, n = /* @__PURE__ */ M(null), r = /* @__PURE__ */ M(null), i = /* @__PURE__ */ M(!1), a = /* @__PURE__ */ M([]), o = /* @__PURE__ */ M(0), s = null, c = W(() => Xv(t.token).value), l = W(() => t.token.unit === null ? [] : $v(t.token)), u = /* @__PURE__ */ M(c.value);
		Qn(c, (e) => {
			u.value = e;
		});
		let d = W(() => sy(u.value)), f = W(() => d.value && `Not defined: ${d.value.filter((e) => e.missing).map((e) => e.missing).join(", ")}`);
		function p() {
			r.value && (r.value.scrollLeft = n.value.scrollLeft);
		}
		Qn(d, p, { flush: "post" });
		function m() {
			u.value = n.value.value, i.value && h(!1);
		}
		function h(e) {
			let r = n.value, c = r.value.slice(0, r.selectionStart), l = c.match(/(var\(\s*)?(--[\w-]*)$/) ?? (e ? [
				"",
				"",
				""
			] : null);
			if (!l) return y();
			let u = l[2].toLowerCase(), d = /* @__PURE__ */ new Map();
			$.tokens.forEach((e) => {
				if (e.name === t.token.name || d.has(e.name)) return;
				let n = e.name.toLowerCase();
				n.includes(u) && d.set(e.name, {
					name: e.name,
					value: Xv(e).value,
					starts: n.startsWith(u)
				});
			}), a.value = [...d.values()].sort((e, t) => t.starts - e.starts || e.name.localeCompare(t.name)).slice(0, 8), s = [c.length - l[0].length, c.length], o.value = 0, i.value = a.value.length > 0;
		}
		function g(e) {
			if (e.code === "Space" && e.ctrlKey) return e.preventDefault(), h(!0);
			if (i.value) {
				e.key === "ArrowDown" || e.key === "ArrowUp" ? (e.preventDefault(), o.value = (o.value + (e.key === "ArrowDown" ? 1 : -1) + a.value.length) % a.value.length) : e.key === "Enter" || e.key === "Tab" ? (e.preventDefault(), _(a.value[o.value].name)) : e.key === "Escape" && (e.stopPropagation(), y());
				return;
			}
			if (e.key === "ArrowUp" || e.key === "ArrowDown") {
				let n = e.shiftKey ? 10 : e.altKey ? .1 : 1;
				ey(t.token, e.key === "ArrowUp" ? 1 : -1, n) && e.preventDefault();
			} else e.key === "Enter" && cy(t.token, n.value.value);
		}
		function _(e) {
			let r = n.value, [i, a] = s, o = r.value.slice(a), c = `var(${e}${o.trimStart().startsWith(")") ? "" : ")"}`;
			u.value = r.value.slice(0, i) + c + o, y(), cy(t.token, u.value);
		}
		function v(e) {
			if (y(), !e.metaKey && !e.ctrlKey) return;
			let r = n.value, i = r.selectionStart, a = [...r.value.matchAll(/--[\w-]+/g)].find((e) => e.index <= i && i <= e.index + e[0].length)?.[0], o = a && py(a, t.token.selector);
			o && o !== t.token && Nn(() => {
				let e = r.getRootNode().getElementById(`dev-token${o.id}`);
				e?.scrollIntoView({ block: "center" }), e?.focus();
			});
		}
		function y() {
			i.value = !1;
		}
		return (e, s) => (L(), R("div", Wy, [B("div", Gy, [
			t.token.type === "easing" ? (L(), z(Uy, {
				key: 0,
				token: t.token,
				class: "ml-1"
			}, null, 8, ["token"])) : U("", !0),
			t.token.type === "color" ? (L(), R("label", {
				key: 1,
				class: "relative ml-1.5 size-5 flex-none cursor-pointer overflow-hidden rounded-sm border shadow-xs",
				style: ue({ background: c.value }),
				title: `Pick ${t.token.name}`
			}, [B("input", {
				type: "color",
				class: "absolute inset-0 size-full cursor-pointer opacity-0",
				value: N(Cv)(c.value),
				"aria-label": `${t.token.name} colour`,
				onInput: s[0] ||= (e) => N(cy)(t.token, e.target.value)
			}, null, 40, qy)], 12, Ky)) : U("", !0),
			B("div", Jy, [d.value ? (L(), R("div", {
				key: 0,
				ref_key: "mirror",
				ref: r,
				class: "pointer-events-none absolute inset-0 flex items-center overflow-hidden px-2 font-mono text-xs whitespace-pre",
				"aria-hidden": "true"
			}, [(L(!0), R(I, null, F(d.value, (e, t) => (L(), R("span", {
				key: t,
				class: k(e.missing && "text-muted-foreground decoration-destructive line-through")
			}, A(e.text), 3))), 128))], 512)) : U("", !0), B("input", {
				id: `dev-token${t.token.id}`,
				ref_key: "input",
				ref: n,
				class: k(["placeholder:text-muted-foreground h-full w-full bg-transparent px-2 font-mono text-xs outline-none", d.value && "caret-foreground text-transparent"]),
				title: f.value || void 0,
				value: u.value,
				role: "combobox",
				autocomplete: "off",
				"aria-autocomplete": "list",
				"aria-expanded": i.value,
				spellcheck: "false",
				placeholder: "not set",
				onInput: m,
				onClick: v,
				onKeydown: g,
				onBlur: y,
				onScroll: p,
				onChange: s[1] ||= (e) => N(cy)(t.token, e.target.value)
			}, null, 42, Yy)]),
			l.value.length ? (L(), z(N(Ld), {
				key: 2,
				"wrapper-class": "h-full flex-none",
				"icon-class": "right-1.5 size-3",
				class: "text-muted-foreground h-full rounded-none border-0 border-l bg-transparent py-0 pr-6 pl-2 text-[11px] shadow-none focus-visible:ring-0",
				"model-value": N(Qv)(t.token),
				"aria-label": `${t.token.name} unit`,
				"onUpdate:modelValue": s[2] ||= (e) => N(ty)(t.token, e)
			}, {
				default: P(() => [(L(!0), R(I, null, F(l.value, (e) => (L(), z(N(Rd), {
					key: e,
					value: e
				}, {
					default: P(() => [H(A(e), 1)]),
					_: 2
				}, 1032, ["value"]))), 128))]),
				_: 1
			}, 8, ["model-value", "aria-label"])) : U("", !0)
		]), i.value ? (L(), R("ul", Xy, [(L(!0), R(I, null, F(a.value, (e, t) => (L(), R("li", {
			key: e.name,
			role: "option",
			"aria-selected": t === o.value,
			class: k(["flex cursor-pointer items-baseline gap-2 rounded-sm px-2 py-1", t === o.value && "bg-accent"]),
			onMousedown: fo((t) => _(e.name), ["prevent"]),
			onMouseenter: (e) => o.value = t
		}, [B("span", Qy, A(e.name), 1), B("small", $y, A(e.value), 1)], 42, Zy))), 128))])) : U("", !0)]));
	}
}, tb = {
	key: 0,
	class: "bg-changed absolute inset-y-1 left-1 w-1 rounded-full",
	"aria-hidden": "true"
}, nb = { class: "grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_1.5rem] items-center gap-2" }, rb = ["for", "title"], ib = ["title", "aria-label"], ab = { class: "text-muted-foreground flex min-w-0 gap-1.5 text-[11px] leading-4" }, ob = { class: "flex-none" }, sb = {
	key: 0,
	class: "text-highlight flex-none"
}, cb = ["title"], lb = {
	key: 2,
	class: "ml-auto flex-none"
}, ub = ["value", "aria-label"], db = ["value"], fb = {
	__name: "TokenRow",
	props: { token: {
		type: Object,
		required: !0
	} },
	setup(e) {
		let t = e, n = W(() => zv(t.token)), r = W(() => Xv(t.token).from !== $.tab), i = /* @__PURE__ */ M(!1);
		function a() {
			i.value = !0, wy(t.token);
		}
		function o() {
			i.value = !1, Co();
		}
		return (e, s) => (L(), R("div", {
			class: "group hover:bg-muted/50 relative grid gap-1 py-1.5 pr-2 pl-4",
			onMouseenter: a,
			onMouseleave: o
		}, [
			n.value ? (L(), R("span", tb)) : U("", !0),
			B("div", nb, [
				B("label", {
					class: k(["truncate font-mono text-xs", r.value ? "text-muted-foreground" : "text-foreground font-medium"]),
					for: `dev-token${t.token.id}`,
					title: t.token.name
				}, A(t.token.name.replace(/^--/, "")), 11, rb),
				V(eb, { token: t.token }, null, 8, ["token"]),
				n.value ? (L(), R("button", {
					key: 0,
					type: "button",
					class: "text-muted-foreground hover:bg-muted hover:text-foreground flex size-6 items-center justify-center rounded-sm",
					title: `Reset to ${t.token.declared[N($).tab] ?? "the stylesheet's value"}`,
					"aria-label": `Reset ${t.token.name}`,
					onClick: s[0] ||= (e) => N(ly)(t.token)
				}, [V(N(us), { class: "size-3.5" })], 8, ib)) : U("", !0)
			]),
			B("p", ab, [
				B("span", ob, A(N(Zv)(t.token)), 1),
				t.token.added ? (L(), R("span", sb, "· new")) : U("", !0),
				t.token.selector === N(":root") ? U("", !0) : (L(), R("span", {
					key: 1,
					class: "truncate font-mono",
					title: t.token.selector
				}, "· " + A(t.token.selector), 9, cb)),
				i.value && t.token.using ? (L(), R("span", lb, A(t.token.using.page) + " on page", 1)) : U("", !0),
				B("select", {
					class: k(["hover:text-foreground focus-visible:text-foreground flex-none cursor-pointer bg-transparent outline-none group-hover:opacity-100 focus-visible:opacity-100", [!(i.value && t.token.using) && "ml-auto", !t.token.editor && "opacity-0"]]),
					value: t.token.editor,
					"aria-label": `${t.token.name} editor`,
					title: "The editor it gets",
					onChange: s[1] ||= (e) => N(ny)(t.token, e.target.value)
				}, [(L(!0), R(I, null, F(N(bv), (e) => (L(), R("option", {
					key: e.value,
					value: e.value
				}, A(e.label), 9, db))), 128))], 42, ub)
			])
		], 32));
	}
}, pb = { class: "relative min-w-0" }, mb = ["title", "aria-expanded"], hb = {
	key: 1,
	role: "listbox",
	class: "bg-popover absolute inset-x-0 top-full z-20 mt-1 max-h-56 overflow-y-auto rounded-md border p-1 shadow-md"
}, gb = [
	"aria-selected",
	"onMousedown",
	"onMouseenter"
], _b = { class: "font-mono text-xs" }, vb = { class: "text-muted-foreground ml-auto truncate font-mono text-[10px]" }, yb = {
	__name: "VarField",
	props: {
		modelValue: {
			type: String,
			default: ""
		},
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let t = Ir(e, "modelValue"), n = /* @__PURE__ */ M(null), r = /* @__PURE__ */ M(null), i = /* @__PURE__ */ M(!1), a = /* @__PURE__ */ M([]), o = /* @__PURE__ */ M(0), s = null, c = W(() => sy(t.value)), l = W(() => c.value && `Not defined: ${c.value.filter((e) => e.missing).map((e) => e.missing).join(", ")}`);
		function u() {
			r.value && (r.value.scrollLeft = n.value.scrollLeft);
		}
		Qn(c, u, { flush: "post" });
		function d(e) {
			let t = n.value, r = t.value.slice(0, t.selectionStart), c = r.match(/(var\(\s*)?(--[\w-]*)$/) ?? (e ? [
				"",
				"",
				""
			] : null);
			if (!c) return m();
			let l = c[2].toLowerCase(), u = /* @__PURE__ */ new Map();
			$.tokens.forEach((e) => {
				if (u.has(e.name)) return;
				let t = e.name.toLowerCase();
				t.includes(l) && u.set(e.name, {
					name: e.name,
					value: Xv(e).value,
					starts: t.startsWith(l)
				});
			}), a.value = [...u.values()].sort((e, t) => t.starts - e.starts || e.name.localeCompare(t.name)).slice(0, 8), s = [r.length - c[0].length, r.length], o.value = 0, i.value = a.value.length > 0;
		}
		function f(e) {
			if (e.code === "Space" && e.ctrlKey) return e.preventDefault(), d(!0);
			i.value && (e.key === "ArrowDown" || e.key === "ArrowUp" ? (e.preventDefault(), o.value = (o.value + (e.key === "ArrowDown" ? 1 : -1) + a.value.length) % a.value.length) : e.key === "Enter" || e.key === "Tab" ? (e.preventDefault(), p(a.value[o.value].name)) : e.key === "Escape" && (e.stopPropagation(), m()));
		}
		function p(e) {
			let r = n.value, [i, a] = s, o = r.value.slice(a), c = `var(${e}${o.trimStart().startsWith(")") ? "" : ")"}`, l = i + c.length;
			t.value = r.value.slice(0, i) + c + o, m(), requestAnimationFrame(() => r.setSelectionRange(l, l));
		}
		function m() {
			i.value = !1;
		}
		return (e, s) => (L(), R("div", pb, [
			c.value ? (L(), R("div", {
				key: 0,
				ref_key: "mirror",
				ref: r,
				class: "pointer-events-none absolute inset-x-0 top-0 flex h-8 items-center overflow-hidden rounded-md border border-transparent px-3 font-mono text-xs whitespace-pre",
				"aria-hidden": "true"
			}, [(L(!0), R(I, null, F(c.value, (e, t) => (L(), R("span", {
				key: t,
				class: k(e.missing && "text-muted-foreground decoration-destructive line-through")
			}, A(e.text), 3))), 128))], 512)) : U("", !0),
			Gn(B("input", {
				ref_key: "input",
				ref: n,
				"onUpdate:modelValue": s[0] ||= (e) => t.value = e,
				class: k(["border-input focus-visible:border-ring focus-visible:ring-ring/50 placeholder:text-muted-foreground h-8 w-full min-w-0 rounded-md border bg-transparent px-3 font-mono text-xs shadow-xs outline-none focus-visible:ring-3", c.value && "caret-foreground text-transparent"]),
				title: l.value || void 0,
				placeholder: "value",
				"aria-label": "Value",
				role: "combobox",
				autocomplete: "off",
				"aria-autocomplete": "list",
				"aria-expanded": i.value,
				spellcheck: "false",
				onInput: s[1] ||= (e) => d(!1),
				onClick: m,
				onKeydown: f,
				onScroll: u,
				onBlur: m
			}, null, 42, mb), [[io, t.value]]),
			i.value ? (L(), R("ul", hb, [(L(!0), R(I, null, F(a.value, (e, t) => (L(), R("li", {
				key: e.name,
				role: "option",
				"aria-selected": t === o.value,
				class: k(["flex cursor-pointer items-baseline gap-2 rounded-sm px-2 py-1", t === o.value && "bg-accent"]),
				onMousedown: fo((t) => p(e.name), ["prevent"]),
				onMouseenter: (e) => o.value = t
			}, [B("span", _b, A(e.name), 1), B("small", vb, A(e.value), 1)], 42, gb))), 128))])) : U("", !0)
		]));
	}
}, bb = { class: "flex items-center gap-1.5" }, xb = { class: "border-input focus-within:border-ring focus-within:ring-ring/50 flex h-8 min-w-0 flex-1 items-center gap-1.5 rounded-md border pl-2 shadow-xs focus-within:ring-3" }, Sb = ["aria-pressed"], Cb = ["title"], wb = { class: "text-muted-foreground flex-none text-[11px]" }, Tb = {
	class: "bg-muted flex gap-0.5 overflow-x-auto rounded-md p-0.5",
	role: "tablist",
	"aria-label": "Breakpoint"
}, Eb = [
	"aria-selected",
	"title",
	"onClick"
], Db = {
	key: 0,
	class: "bg-highlight size-1.5 rounded-full",
	"aria-label": "the window now"
}, Ob = {
	key: 1,
	class: "bg-changed rounded-full px-1 text-[10px] leading-3.5 font-semibold text-black"
}, kb = { class: "-mx-1.5 -mb-1 flex gap-0.5" }, Ab = { class: "text-xs font-medium" }, jb = { class: "text-muted-foreground font-normal" }, Mb = { class: "grid grid-cols-2 gap-1.5" }, Nb = { class: "grid grid-cols-[minmax(0,1fr)_auto] gap-1.5" }, Pb = { class: "flex items-center gap-2" }, Fb = {
	key: 0,
	class: "text-destructive text-xs"
}, Ib = {
	key: 1,
	class: "text-muted-foreground px-4 py-10 text-center text-sm"
}, Lb = { class: "bg-background/95 sticky top-0 z-[5] border-b backdrop-blur" }, Rb = ["aria-expanded", "onClick"], zb = { class: "truncate font-mono text-xs font-semibold" }, Bb = { class: "text-muted-foreground text-[11px]" }, Vb = ["title"], Hb = {
	key: 0,
	class: "py-1"
}, Ub = { class: "flex items-center gap-2" }, Wb = { class: "flex items-center gap-2 text-xs" }, Gb = { class: "flex items-center gap-2" }, Kb = {
	__name: "TokensPanel",
	emits: ["close"],
	setup(e, { emit: t }) {
		let n = t, r = Jn("config"), i = Jn("root"), a = /* @__PURE__ */ M(!1), o = /* @__PURE__ */ M({
			name: "--",
			selector: Q_,
			value: "",
			editor: ""
		}), s = /* @__PURE__ */ M(""), c = /* @__PURE__ */ M(!1), l = /* @__PURE__ */ M(""), u = /* @__PURE__ */ M(!1), d = /* @__PURE__ */ M(""), f = /* @__PURE__ */ M(!1), p = /* @__PURE__ */ M("");
		gr(() => Fv(r.breakpoints)), vr(() => {
			yy(), Co();
		});
		async function m(e) {
			let t = await (e === "all" ? _y(i) : gy(i));
			p.value = t ? e === "all" ? "All tokens copied" : "Changes copied" : "Copy failed", setTimeout(() => {
				p.value = "";
			}, 1500);
		}
		function h() {
			c.value = !1, a.value = !0, s.value = "", Nn(() => i.querySelector("[data-add-name]")?.focus());
		}
		function g() {
			let { error: e, token: t } = fy(o.value);
			if (e) {
				s.value = e;
				return;
			}
			o.value = {
				name: "--",
				selector: o.value.selector,
				value: "",
				editor: ""
			}, s.value = "", a.value = !1, Nn(() => {
				let e = i.getElementById(`dev-token${t.id}`);
				e?.scrollIntoView({ block: "center" }), e?.focus();
			});
		}
		function _() {
			a.value = !1, c.value = !0, d.value = "", f.value = !1;
		}
		function v() {
			let { error: e, note: t } = my(l.value, u.value);
			f.value = e, d.value = t, e || (l.value = "");
		}
		let y = W(() => [{
			label: "Import CSS…",
			action: _
		}, {
			label: "Copy all tokens",
			action: () => m("all")
		}]), b = W(() => $.onlyChanged && !Bv.value ? "Nothing changed yet." : $.picked && !$.picked.ids.length ? "No tokens used there." : "No tokens match.");
		return (e, t) => (L(), z(pu, {
			title: "Tokens",
			side: "right",
			"width-key": N(J_),
			inset: "px-2",
			onClose: t[19] ||= (e) => n("close")
		}, Tr({
			count: P(() => [H(A(N($).tokens.length), 1)]),
			actions: P(() => [V(tu, { items: y.value }, {
				trigger: P(({ toggle: e, open: t }) => [V(N(X), {
					variant: "ghost",
					size: "icon-sm",
					"aria-label": "More",
					title: "More",
					"aria-expanded": t,
					onClick: e
				}, {
					default: P(() => [V(N(Yo))]),
					_: 1
				}, 8, ["aria-expanded", "onClick"])]),
				_: 1
			}, 8, ["items"])]),
			header: P(() => [
				B("div", bb, [B("div", xb, [
					V(N(fs), { class: "text-muted-foreground size-3.5 flex-none" }),
					Gn(B("input", {
						"onUpdate:modelValue": t[0] ||= (e) => N($).query = e,
						type: "search",
						placeholder: "Filter by name, selector or value",
						"aria-label": "Filter tokens",
						class: "placeholder:text-muted-foreground h-full min-w-0 flex-1 bg-transparent text-sm outline-none"
					}, null, 512), [[io, N($).query]]),
					B("button", {
						type: "button",
						class: k(["hover:bg-muted mr-0.5 flex size-7 flex-none items-center justify-center rounded-sm", N($).picking ? "bg-highlight/15 text-highlight" : "text-muted-foreground"]),
						"aria-pressed": N($).picking,
						title: "Pick an element on the page: only the tokens it uses (Escape to cancel)",
						"aria-label": "Pick an element on the page",
						onClick: t[1] ||= (...e) => N(vy) && N(vy)(...e)
					}, [V(N(qo), { class: "size-4" })], 10, Sb)
				]), V(N(Nl), {
					modelValue: N($).onlyChanged,
					"onUpdate:modelValue": t[2] ||= (e) => N($).onlyChanged = e,
					size: "sm",
					variant: "outline",
					class: "h-8",
					disabled: !N(Bv) && !N($).onlyChanged
				}, {
					default: P(() => [...t[20] ||= [H("Changed", -1)]]),
					_: 1
				}, 8, ["modelValue", "disabled"])]),
				N($).picked ? (L(), R("div", {
					key: 0,
					class: "bg-highlight/10 flex items-center gap-1 rounded-md py-0.5 pr-0.5 pl-2",
					onMouseenter: t[4] ||= (...e) => N(Cy) && N(Cy)(...e),
					onMouseleave: t[5] ||= (...e) => N(Co) && N(Co)(...e)
				}, [
					V(N(qo), { class: "text-highlight size-3.5 flex-none" }),
					B("code", {
						class: "min-w-0 flex-1 truncate font-mono text-xs",
						title: N($).picked.label
					}, A(N($).picked.label), 9, Cb),
					B("span", wb, A(N($).picked.ids.length) + " tokens", 1),
					V(N(X), {
						size: "xs",
						variant: "ghost",
						title: "Its parent element: more tokens",
						onClick: t[3] ||= (e) => {
							N(xy)(), N(Cy)();
						}
					}, {
						default: P(() => [...t[21] ||= [H("Parent", -1)]]),
						_: 1
					}),
					V(N(X), {
						size: "icon-xs",
						variant: "ghost",
						"aria-label": "Clear the pick",
						title: "Show all tokens again",
						onClick: N(Sy)
					}, {
						default: P(() => [V(N(vs))]),
						_: 1
					}, 8, ["onClick"])
				], 32)) : U("", !0),
				B("div", Tb, [(L(!0), R(I, null, F(N($).tabs, (e) => (L(), R("button", {
					key: e.width,
					type: "button",
					role: "tab",
					"aria-selected": N($).tab === e.width,
					class: k(["relative flex flex-none items-center gap-1 rounded-sm px-2 py-1 text-xs whitespace-nowrap", N($).tab === e.width ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"]),
					title: (e.width ? `From ${e.width}px up` : "All widths, until a breakpoint sets its own") + (N(Iv) === e.width ? " · the window now" : ""),
					onClick: (t) => N($).tab = e.width
				}, [
					N(Iv) === e.width ? (L(), R("span", Db)) : U("", !0),
					H(" " + A(e.label) + " ", 1),
					N(Vv)(e.width) ? (L(), R("span", Ob, A(N(Vv)(e.width)), 1)) : U("", !0)
				], 10, Eb))), 128))]),
				B("div", kb, [
					V(N(X), {
						size: "xs",
						variant: "ghost",
						class: "text-muted-foreground mr-auto",
						onClick: h
					}, {
						default: P(() => [V(N(cs)), t[22] ||= H(" Add variable ", -1)]),
						_: 1
					}),
					V(N(X), {
						size: "xs",
						variant: "ghost",
						class: "text-muted-foreground",
						disabled: N(Yv) || !N(Uv).length,
						onClick: t[6] ||= (e) => N(qv)(!1)
					}, {
						default: P(() => [...t[23] ||= [H("Expand all", -1)]]),
						_: 1
					}, 8, ["disabled"]),
					V(N(X), {
						size: "xs",
						variant: "ghost",
						class: "text-muted-foreground",
						disabled: N(Jv) || !N(Uv).length,
						onClick: t[7] ||= (e) => N(qv)(!0)
					}, {
						default: P(() => [...t[24] ||= [H("Collapse all", -1)]]),
						_: 1
					}, 8, ["disabled"])
				])
			]),
			overlay: P(() => [c.value ? (L(), R("form", {
				key: 0,
				class: "bg-background absolute inset-0 z-10 flex flex-col gap-3 p-4",
				onSubmit: fo(v, ["prevent"]),
				onKeydown: t[17] ||= mo(fo((e) => c.value = !1, ["stop"]), ["escape"])
			}, [
				t[31] ||= B("div", null, [B("p", { class: "font-medium" }, "Import CSS"), B("p", { class: "text-muted-foreground text-xs" }, "What Copy changes or Copy all gave: each variable is set at its breakpoint.")], -1),
				V(N(U_), {
					modelValue: l.value,
					"onUpdate:modelValue": t[14] ||= (e) => l.value = e,
					class: "min-h-0 flex-1 resize-none font-mono text-xs",
					placeholder: ":root {\n  --parallax-shift: 0.2;\n}",
					"aria-label": "CSS to import",
					spellcheck: "false",
					autofocus: ""
				}, null, 8, ["modelValue"]),
				d.value ? (L(), R("p", {
					key: 0,
					class: k(["text-xs", f.value ? "text-destructive" : "text-muted-foreground"])
				}, A(d.value), 3)) : U("", !0),
				B("div", Ub, [
					B("label", Wb, [V(N(H_), {
						modelValue: u.value,
						"onUpdate:modelValue": t[15] ||= (e) => u.value = e
					}, null, 8, ["modelValue"]), t[28] ||= H(" Replace the current changes ", -1)]),
					V(N(X), {
						size: "sm",
						variant: "ghost",
						type: "button",
						class: "ml-auto",
						onClick: t[16] ||= (e) => c.value = !1
					}, {
						default: P(() => [...t[29] ||= [H("Close", -1)]]),
						_: 1
					}),
					V(N(X), {
						size: "sm",
						type: "submit",
						disabled: !l.value.trim()
					}, {
						default: P(() => [...t[30] ||= [H("Import", -1)]]),
						_: 1
					}, 8, ["disabled"])
				])
			], 32)) : U("", !0)]),
			default: P(() => [
				a.value ? (L(), R("form", {
					key: 0,
					class: "bg-muted/40 grid gap-2 border-b px-4 py-3",
					onSubmit: fo(g, ["prevent"]),
					onKeydown: t[13] ||= mo(fo((e) => a.value = !1, ["stop"]), ["escape"])
				}, [
					B("p", Ab, [t[25] ||= H("New variable ", -1), B("span", jb, "on " + A(N(Lv)(N($).tab)), 1)]),
					B("div", Mb, [V(N(V_), {
						modelValue: o.value.name,
						"onUpdate:modelValue": t[8] ||= (e) => o.value.name = e,
						"data-add-name": "",
						class: "h-8 font-mono text-xs",
						placeholder: "--name",
						"aria-label": "Name",
						spellcheck: "false",
						autocomplete: "off"
					}, null, 8, ["modelValue"]), V(jy, {
						modelValue: o.value.selector,
						"onUpdate:modelValue": t[9] ||= (e) => o.value.selector = e
					}, null, 8, ["modelValue"])]),
					B("div", Nb, [V(yb, {
						modelValue: o.value.value,
						"onUpdate:modelValue": t[10] ||= (e) => o.value.value = e
					}, null, 8, ["modelValue"]), V(N(Ld), {
						modelValue: o.value.editor,
						"onUpdate:modelValue": t[11] ||= (e) => o.value.editor = e,
						class: "h-8 py-0 pr-7 pl-2 text-xs",
						"icon-class": "right-2 size-3.5",
						"aria-label": "Editor",
						title: "The editor it gets"
					}, {
						default: P(() => [(L(!0), R(I, null, F(N(bv), (e) => (L(), z(N(Rd), {
							key: e.value,
							value: e.value
						}, {
							default: P(() => [H(A(e.label), 1)]),
							_: 2
						}, 1032, ["value"]))), 128))]),
						_: 1
					}, 8, ["modelValue"])]),
					B("div", Pb, [
						s.value ? (L(), R("p", Fb, A(s.value), 1)) : U("", !0),
						V(N(X), {
							size: "sm",
							variant: "ghost",
							type: "button",
							class: "ml-auto",
							onClick: t[12] ||= (e) => a.value = !1
						}, {
							default: P(() => [...t[26] ||= [H("Cancel", -1)]]),
							_: 1
						}),
						V(N(X), {
							size: "sm",
							type: "submit"
						}, {
							default: P(() => [...t[27] ||= [H("Add", -1)]]),
							_: 1
						})
					])
				], 32)) : U("", !0),
				N(Uv).length ? U("", !0) : (L(), R("p", Ib, A(b.value), 1)),
				(L(!0), R(I, null, F(N(Uv), (e) => (L(), R("section", { key: e.name }, [B("h3", Lb, [B("button", {
					type: "button",
					class: "hover:bg-muted/60 flex w-full items-center gap-1.5 px-2 py-1.5 text-left",
					"aria-expanded": !N(Wv)(e),
					onClick: (t) => N(Kv)(e)
				}, [
					V(N(Bo), { class: k(["text-muted-foreground size-3.5 flex-none transition-transform", !N(Wv)(e) && "rotate-90"]) }, null, 8, ["class"]),
					B("span", zb, A(e.name), 1),
					B("span", Bb, A(e.tokens.length), 1),
					e.tokens.some(N(Rv)) ? (L(), R("span", {
						key: 0,
						class: "bg-changed ml-auto size-1.5 flex-none rounded-full",
						title: `${e.tokens.filter(N(Rv)).length} changed`
					}, null, 8, Vb)) : U("", !0)
				], 8, Rb)]), N(Wv)(e) ? U("", !0) : (L(), R("div", Hb, [(L(!0), R(I, null, F(e.tokens, (e) => (L(), z(fb, {
					key: e.id,
					token: e
				}, null, 8, ["token"]))), 128))]))]))), 128))
			]),
			_: 2
		}, [N(Bv) || p.value ? {
			name: "footer",
			fn: P(() => [B("div", Gb, [
				B("span", { class: k(["text-xs", p.value ? "text-foreground" : "text-muted-foreground"]) }, [p.value ? (L(), R(I, { key: 0 }, [H(A(p.value), 1)], 64)) : (L(), R(I, { key: 1 }, [t[32] ||= B("span", { class: "bg-changed mr-1.5 inline-block size-2 rounded-full" }, null, -1), H(A(N(Bv)) + " changed", 1)], 64))], 2),
				V(N(X), {
					size: "sm",
					variant: "ghost",
					class: "ml-auto",
					disabled: !N(Bv),
					onClick: N(uy)
				}, {
					default: P(() => [...t[33] ||= [H("Reset all", -1)]]),
					_: 1
				}, 8, ["disabled", "onClick"]),
				V(N(X), {
					size: "sm",
					disabled: !N(Bv),
					onClick: t[18] ||= (e) => m("changes")
				}, {
					default: P(() => [...t[34] ||= [H("Copy changes", -1)]]),
					_: 1
				}, 8, ["disabled"])
			])]),
			key: "0"
		} : void 0]), 1032, ["width-key"]));
	}
}, qb = {
	__name: "App",
	props: {
		config: {
			type: Object,
			required: !0
		},
		root: {
			type: Object,
			required: !0
		}
	},
	setup(e) {
		let t = e;
		qn("config", t.config), qn("root", t.root);
		let n = (e) => t.config.tools.includes(e), r = Object.entries(t.config.shortcuts).filter(([e]) => e === "toolbar" || n(e)).map(([e, t]) => [e, Fl(t)]);
		function i(e) {
			let t = r.find(([, t]) => Il(e, t));
			t && (e.preventDefault(), Y[t[0]] = !Y[t[0]]);
		}
		return gr(() => window.addEventListener("keydown", i)), vr(() => window.removeEventListener("keydown", i)), (e, t) => (L(), R(I, null, [
			n("grid") && N(Y).grid ? (L(), z(yf, { key: 0 })) : U("", !0),
			V(wo),
			n("tokens") && N(Y).tokens ? (L(), z(Kb, {
				key: 1,
				onClose: t[0] ||= (e) => N(Y).tokens = !1
			})) : U("", !0),
			n("outline") && N(Y).outline ? (L(), z($p, {
				key: 2,
				onClose: t[1] ||= (e) => N(Y).outline = !1
			})) : U("", !0),
			n("form") && N(Y).form ? (L(), z(_f, {
				key: 3,
				onClose: t[2] ||= (e) => N(Y).form = !1
			})) : U("", !0),
			n("events") && N(Y).events ? (L(), z(Id, {
				key: 4,
				onClose: t[3] ||= (e) => N(Y).events = !1
			})) : U("", !0),
			n("seo") && N(Y).seo ? (L(), z(B_, {
				key: 5,
				onClose: t[4] ||= (e) => N(Y).seo = !1
			})) : U("", !0),
			n("images") && N(Y).images ? (L(), z(_p, {
				key: 6,
				onClose: t[5] ||= (e) => N(Y).images = !1
			})) : U("", !0),
			n("cache") && N(Y).cache ? (L(), z(Bu, {
				key: 7,
				onClose: t[6] ||= (e) => N(Y).cache = !1
			})) : U("", !0),
			V(Zl)
		], 64));
	}
}, Jb = "/*! tailwindcss v4.3.3 | MIT License | https://tailwindcss.com */\n@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-scale-x:1;--tw-scale-y:1;--tw-scale-z:1;--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-pan-x:initial;--tw-pan-y:initial;--tw-pinch-zoom:initial;--tw-space-y-reverse:0;--tw-space-x-reverse:0;--tw-divide-x-reverse:0;--tw-border-style:solid;--tw-divide-y-reverse:0;--tw-leading:initial;--tw-font-weight:initial;--tw-tracking:initial;--tw-ordinal:initial;--tw-slashed-zero:initial;--tw-numeric-figure:initial;--tw-numeric-spacing:initial;--tw-numeric-fraction:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-outline-style:solid;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial;--tw-ease:initial;--tw-animation-delay:0s;--tw-animation-direction:normal;--tw-animation-duration:initial;--tw-animation-fill-mode:none;--tw-animation-iteration-count:1;--tw-enter-blur:0;--tw-enter-opacity:1;--tw-enter-rotate:0;--tw-enter-scale:1;--tw-enter-translate-x:0;--tw-enter-translate-y:0;--tw-exit-blur:0;--tw-exit-opacity:1;--tw-exit-rotate:0;--tw-exit-scale:1;--tw-exit-translate-x:0;--tw-exit-translate-y:0}}}@layer theme{:root,:host{--font-sans:-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", \"Noto Sans\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;--color-red-500:oklch(63.7% .237 25.331);--color-amber-500:oklch(76.9% .188 70.08);--color-amber-600:oklch(66.6% .179 58.318);--color-amber-700:oklch(55.5% .163 48.998);--color-amber-800:oklch(47.3% .137 46.201);--color-green-700:oklch(52.7% .154 150.069);--color-emerald-500:oklch(69.6% .17 162.48);--color-emerald-600:oklch(59.6% .145 163.225);--color-emerald-700:oklch(50.8% .118 165.612);--color-blue-500:oklch(62.3% .214 259.815);--color-blue-600:oklch(54.6% .245 262.881);--color-blue-700:oklch(48.8% .243 264.376);--color-black:#000;--color-white:#fff;--spacing:.25rem;--text-xs:.75rem;--text-xs--line-height:calc(1 / .75);--text-sm:.875rem;--text-sm--line-height:calc(1.25 / .875);--text-base:1rem;--text-base--line-height:calc(1.5 / 1);--text-lg:1.125rem;--text-lg--line-height:calc(1.75 / 1.125);--font-weight-normal:400;--font-weight-medium:500;--font-weight-semibold:600;--font-weight-bold:700;--tracking-wide:.025em;--leading-tight:1.25;--leading-snug:1.375;--leading-normal:1.5;--ease-in:cubic-bezier(.4, 0, 1, 1);--ease-out:cubic-bezier(0, 0, .2, 1);--ease-in-out:cubic-bezier(.4, 0, .2, 1);--animate-spin:spin 1s linear infinite;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", \"Noto Sans\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(:not(iframe)){outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}*{border-color:var(--border);outline-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){*{outline-color:color-mix(in oklab, var(--ring) 50%, transparent)}}[data-panel]{pointer-events:auto;background-color:var(--background);font-family:var(--font-sans);font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height));color:var(--foreground);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}}@layer components;@layer utilities{.\\@container{container-type:inline-size}.pointer-events-none{pointer-events:none}.collapse{visibility:collapse}.invisible{visibility:hidden}.visible{visibility:visible}.sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.not-sr-only{clip-path:none;white-space:normal;width:auto;height:auto;margin:0;padding:0;position:static;overflow:visible}.absolute{position:absolute}.fixed{position:fixed}.relative{position:relative}.static{position:static}.sticky{position:sticky}.inset-0{inset:0}.inset-x-0{inset-inline:0}.inset-y-0{inset-block:0}.inset-y-1{inset-block:var(--spacing)}.-top-5{top:calc(var(--spacing) * -5)}.top-0{top:0}.top-1{top:var(--spacing)}.top-1\\.5{top:calc(var(--spacing) * 1.5)}.top-1\\/2{top:50%}.top-3{top:calc(var(--spacing) * 3)}.top-full{top:100%}.-right-\\[3px\\]{right:-3px}.right-0{right:0}.right-1{right:var(--spacing)}.right-1\\.5{right:calc(var(--spacing) * 1.5)}.right-2{right:calc(var(--spacing) * 2)}.right-3{right:calc(var(--spacing) * 3)}.right-3\\.5{right:calc(var(--spacing) * 3.5)}.bottom-1{bottom:var(--spacing)}.bottom-4{bottom:calc(var(--spacing) * 4)}.-left-\\[3px\\]{left:-3px}.left-0{left:0}.left-1{left:var(--spacing)}.left-1\\/2{left:50%}.left-\\[-2px\\]{left:-2px}.isolate{isolation:isolate}.isolation-auto{isolation:auto}.z-10{z-index:10}.z-20{z-index:20}.z-30{z-index:30}.z-\\[5\\]{z-index:5}.container{width:100%}@media (width>=40rem){.container{max-width:40rem}}@media (width>=48rem){.container{max-width:48rem}}@media (width>=64rem){.container{max-width:64rem}}@media (width>=80rem){.container{max-width:80rem}}@media (width>=96rem){.container{max-width:96rem}}.-mx-1{margin-inline:calc(var(--spacing) * -1)}.-mx-1\\.5{margin-inline:calc(var(--spacing) * -1.5)}.-mx-2{margin-inline:calc(var(--spacing) * -2)}.mx-1{margin-inline:var(--spacing)}.mx-auto{margin-inline:auto}.my-1{margin-block:var(--spacing)}.mt-0{margin-top:0}.mt-0\\.5{margin-top:calc(var(--spacing) * .5)}.mt-1{margin-top:var(--spacing)}.mt-1\\.5{margin-top:calc(var(--spacing) * 1.5)}.mt-2{margin-top:calc(var(--spacing) * 2)}.mr-0{margin-right:0}.mr-0\\.5{margin-right:calc(var(--spacing) * .5)}.mr-1{margin-right:var(--spacing)}.mr-1\\.5{margin-right:calc(var(--spacing) * 1.5)}.mr-auto{margin-right:auto}.-mb-1{margin-bottom:calc(var(--spacing) * -1)}.mb-0{margin-bottom:0}.mb-0\\.5{margin-bottom:calc(var(--spacing) * .5)}.mb-1{margin-bottom:var(--spacing)}.mb-2{margin-bottom:calc(var(--spacing) * 2)}.-ml-1{margin-left:calc(var(--spacing) * -1)}.ml-1{margin-left:var(--spacing)}.ml-1\\.5{margin-left:calc(var(--spacing) * 1.5)}.ml-2{margin-left:calc(var(--spacing) * 2)}.ml-auto{margin-left:auto}.line-clamp-1{-webkit-line-clamp:1;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.line-clamp-2{-webkit-line-clamp:2;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.block{display:block}.contents{display:contents}.flex{display:flex}.flow-root{display:flow-root}.grid{display:grid}.hidden{display:none}.inline{display:inline}.inline-block{display:inline-block}.inline-flex{display:inline-flex}.inline-grid{display:inline-grid}.inline-table{display:inline-table}.list-item{display:list-item}.table{display:table}.table-caption{display:table-caption}.table-cell{display:table-cell}.table-column{display:table-column}.table-column-group{display:table-column-group}.table-footer-group{display:table-footer-group}.table-header-group{display:table-header-group}.table-row{display:table-row}.table-row-group{display:table-row-group}.field-sizing-content{field-sizing:content}.aspect-\\[1\\.91\\/1\\]{aspect-ratio:1.91}.size-1{width:var(--spacing);height:var(--spacing)}.size-1\\.5{width:calc(var(--spacing) * 1.5);height:calc(var(--spacing) * 1.5)}.size-2{width:calc(var(--spacing) * 2);height:calc(var(--spacing) * 2)}.size-3{width:calc(var(--spacing) * 3);height:calc(var(--spacing) * 3)}.size-3\\.5{width:calc(var(--spacing) * 3.5);height:calc(var(--spacing) * 3.5)}.size-4{width:calc(var(--spacing) * 4);height:calc(var(--spacing) * 4)}.size-5{width:calc(var(--spacing) * 5);height:calc(var(--spacing) * 5)}.size-6{width:calc(var(--spacing) * 6);height:calc(var(--spacing) * 6)}.size-7{width:calc(var(--spacing) * 7);height:calc(var(--spacing) * 7)}.size-8{width:calc(var(--spacing) * 8);height:calc(var(--spacing) * 8)}.size-9{width:calc(var(--spacing) * 9);height:calc(var(--spacing) * 9)}.size-10{width:calc(var(--spacing) * 10);height:calc(var(--spacing) * 10)}.size-12{width:calc(var(--spacing) * 12);height:calc(var(--spacing) * 12)}.size-\\[18px\\]{width:18px;height:18px}.size-\\[86px\\]{width:86px;height:86px}.size-full{width:100%;height:100%}.\\!h-5{height:calc(var(--spacing) * 5)!important}.h-1{height:var(--spacing)}.h-1\\.5{height:calc(var(--spacing) * 1.5)}.h-2{height:calc(var(--spacing) * 2)}.h-5{height:calc(var(--spacing) * 5)}.h-6{height:calc(var(--spacing) * 6)}.h-7{height:calc(var(--spacing) * 7)}.h-8{height:calc(var(--spacing) * 8)}.h-9{height:calc(var(--spacing) * 9)}.h-10{height:calc(var(--spacing) * 10)}.h-\\[1\\.15rem\\]{height:1.15rem}.h-\\[calc\\(100\\%-1px\\)\\]{height:calc(100% - 1px)}.h-auto{height:auto}.h-full{height:100%}.h-px{height:1px}.max-h-56{max-height:calc(var(--spacing) * 56)}.max-h-72{max-height:calc(var(--spacing) * 72)}.min-h-0{min-height:0}.min-h-16{min-height:calc(var(--spacing) * 16)}.w-1{width:var(--spacing)}.w-1\\.5{width:calc(var(--spacing) * 1.5)}.w-3{width:calc(var(--spacing) * 3)}.w-4{width:calc(var(--spacing) * 4)}.w-5{width:calc(var(--spacing) * 5)}.w-8{width:calc(var(--spacing) * 8)}.w-9{width:calc(var(--spacing) * 9)}.w-20{width:calc(var(--spacing) * 20)}.w-24{width:calc(var(--spacing) * 24)}.w-48{width:calc(var(--spacing) * 48)}.w-56{width:calc(var(--spacing) * 56)}.w-fit{width:fit-content}.w-full{width:100%}.max-w-\\[min\\(100vw\\,40rem\\)\\]{max-width:min(100vw,40rem)}.max-w-full{max-width:100%}.max-w-screen{max-width:100vw}.min-w-0{min-width:0}.min-w-5{min-width:calc(var(--spacing) * 5)}.min-w-8{min-width:calc(var(--spacing) * 8)}.min-w-9{min-width:calc(var(--spacing) * 9)}.min-w-10{min-width:calc(var(--spacing) * 10)}.min-w-44{min-width:calc(var(--spacing) * 44)}.flex-1{flex:1}.flex-\\[0_1_auto\\]{flex:0 auto}.flex-none{flex:none}.shrink{flex-shrink:1}.shrink-0{flex-shrink:0}.grow{flex-grow:1}.border-collapse{border-collapse:collapse}.-translate-x-1{--tw-translate-x:calc(var(--spacing) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-x-1\\/2{--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-1{--tw-translate-y:calc(var(--spacing) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-1\\/2{--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-y-0{--tw-translate-y:0px;translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-y-0\\.5{--tw-translate-y:calc(var(--spacing) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-none{translate:none}.scale-3d{scale:var(--tw-scale-x) var(--tw-scale-y) var(--tw-scale-z)}.rotate-90{rotate:90deg}.transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.animate-spin{animation:var(--animate-spin)}.cursor-default{cursor:default}.cursor-ew-resize{cursor:ew-resize}.cursor-grab{cursor:grab}.cursor-help{cursor:help}.cursor-pointer{cursor:pointer}.touch-pinch-zoom{--tw-pinch-zoom:pinch-zoom;touch-action:var(--tw-pan-x,) var(--tw-pan-y,) var(--tw-pinch-zoom,)}.touch-none{touch-action:none}.resize{resize:both}.resize-none{resize:none}.list-none{list-style-type:none}.appearance-none{appearance:none}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-\\[4\\.5rem_minmax\\(0\\,1fr\\)_4rem_2\\.5rem\\]{grid-template-columns:4.5rem minmax(0,1fr) 4rem 2.5rem}.grid-cols-\\[4\\.5rem_minmax\\(0\\,1fr\\)_auto\\]{grid-template-columns:4.5rem minmax(0,1fr) auto}.grid-cols-\\[6\\.5rem_minmax\\(0\\,1fr\\)\\]{grid-template-columns:6.5rem minmax(0,1fr)}.grid-cols-\\[6rem_minmax\\(0\\,1fr\\)\\]{grid-template-columns:6rem minmax(0,1fr)}.grid-cols-\\[7\\.5rem_minmax\\(0\\,1fr\\)\\]{grid-template-columns:7.5rem minmax(0,1fr)}.grid-cols-\\[auto_auto_minmax\\(0\\,1fr\\)\\]{grid-template-columns:auto auto minmax(0,1fr)}.grid-cols-\\[minmax\\(0\\,1fr\\)_auto\\]{grid-template-columns:minmax(0,1fr) auto}.grid-cols-\\[minmax\\(0\\,1fr\\)_minmax\\(0\\,1\\.3fr\\)_1\\.5rem\\]{grid-template-columns:minmax(0,1fr) minmax(0,1.3fr) 1.5rem}.grid-cols-\\[minmax\\(6rem\\,35\\%\\)_1fr\\]{grid-template-columns:minmax(6rem,35%) 1fr}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-baseline{align-items:baseline}.items-center{align-items:center}.justify-center{justify-content:center}.justify-end{justify-content:flex-end}.justify-start{justify-content:flex-start}.gap-0{gap:0}.gap-0\\.5{gap:calc(var(--spacing) * .5)}.gap-1{gap:var(--spacing)}.gap-1\\.5{gap:calc(var(--spacing) * 1.5)}.gap-2{gap:calc(var(--spacing) * 2)}.gap-2\\.5{gap:calc(var(--spacing) * 2.5)}.gap-3{gap:calc(var(--spacing) * 3)}.gap-5{gap:calc(var(--spacing) * 5)}:where(.space-y-reverse>:not(:last-child)){--tw-space-y-reverse:1}.gap-x-1{column-gap:var(--spacing)}.gap-x-1\\.5{column-gap:calc(var(--spacing) * 1.5)}.gap-x-2{column-gap:calc(var(--spacing) * 2)}.gap-x-3{column-gap:calc(var(--spacing) * 3)}:where(.space-x-reverse>:not(:last-child)){--tw-space-x-reverse:1}.gap-y-0{row-gap:0}.gap-y-0\\.5{row-gap:calc(var(--spacing) * .5)}:where(.divide-x>:not(:last-child)){--tw-divide-x-reverse:0;border-inline-style:var(--tw-border-style);border-inline-start-width:calc(1px * var(--tw-divide-x-reverse));border-inline-end-width:calc(1px * calc(1 - var(--tw-divide-x-reverse)))}:where(.divide-y>:not(:last-child)){--tw-divide-y-reverse:0;border-bottom-style:var(--tw-border-style);border-top-style:var(--tw-border-style);border-top-width:calc(1px * var(--tw-divide-y-reverse));border-bottom-width:calc(1px * calc(1 - var(--tw-divide-y-reverse)))}:where(.divide-y-reverse>:not(:last-child)){--tw-divide-y-reverse:1}.self-start{align-self:flex-start}.truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.overflow-hidden{overflow:hidden}.overflow-visible{overflow:visible}.overflow-x-auto{overflow-x:auto}.overflow-y-auto{overflow-y:auto}.overscroll-contain{overscroll-behavior:contain}.rounded{border-radius:.25rem}.rounded-full{border-radius:2147483647px}.rounded-lg{border-radius:var(--radius)}.rounded-md{border-radius:calc(var(--radius) - 2px)}.rounded-none{border-radius:0}.rounded-sm{border-radius:calc(var(--radius) - 4px)}.rounded-s{border-start-start-radius:.25rem;border-end-start-radius:.25rem}.rounded-ss{border-start-start-radius:.25rem}.rounded-e{border-start-end-radius:.25rem;border-end-end-radius:.25rem}.rounded-se{border-start-end-radius:.25rem}.rounded-ee{border-end-end-radius:.25rem}.rounded-es{border-end-start-radius:.25rem}.rounded-t{border-top-left-radius:.25rem;border-top-right-radius:.25rem}.rounded-l{border-top-left-radius:.25rem;border-bottom-left-radius:.25rem}.rounded-tl{border-top-left-radius:.25rem}.rounded-r{border-top-right-radius:.25rem;border-bottom-right-radius:.25rem}.rounded-tr{border-top-right-radius:.25rem}.rounded-b{border-bottom-right-radius:.25rem;border-bottom-left-radius:.25rem}.rounded-br{border-bottom-right-radius:.25rem}.rounded-bl{border-bottom-left-radius:.25rem}.border{border-style:var(--tw-border-style);border-width:1px}.border-0{border-style:var(--tw-border-style);border-width:0}.border-x{border-inline-style:var(--tw-border-style);border-inline-width:1px}.border-y{border-block-style:var(--tw-border-style);border-block-width:1px}.border-s{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.border-e{border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.border-bs{border-block-start-style:var(--tw-border-style);border-block-start-width:1px}.border-be{border-block-end-style:var(--tw-border-style);border-block-end-width:1px}.border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.border-r{border-right-style:var(--tw-border-style);border-right-width:1px}.border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.border-l{border-left-style:var(--tw-border-style);border-left-width:1px}.border-l-2{border-left-style:var(--tw-border-style);border-left-width:2px}.border-\\[\\#dadce0\\]{border-color:#dadce0}.border-\\[\\#ebebeb\\]{border-color:#ebebeb}.border-border{border-color:var(--border)}.border-changed{border-color:var(--changed)}.border-input{border-color:var(--input)}.border-transparent{border-color:#0000}.bg-\\[\\#f1f3f4\\]{background-color:#f1f3f4}.bg-accent{background-color:var(--accent)}.bg-amber-500{background-color:var(--color-amber-500)}.bg-amber-500\\/20{background-color:#f99c0033}@supports (color:color-mix(in lab, red, red)){.bg-amber-500\\/20{background-color:color-mix(in oklab, var(--color-amber-500) 20%, transparent)}}.bg-background,.bg-background\\/95{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){.bg-background\\/95{background-color:color-mix(in oklab, var(--background) 95%, transparent)}}.bg-black{background-color:var(--color-black)}.bg-black\\/60{background-color:#0009}@supports (color:color-mix(in lab, red, red)){.bg-black\\/60{background-color:color-mix(in oklab, var(--color-black) 60%, transparent)}}.bg-black\\/70{background-color:#000000b3}@supports (color:color-mix(in lab, red, red)){.bg-black\\/70{background-color:color-mix(in oklab, var(--color-black) 70%, transparent)}}.bg-blue-500{background-color:var(--color-blue-500)}.bg-blue-500\\/15{background-color:#3080ff26}@supports (color:color-mix(in lab, red, red)){.bg-blue-500\\/15{background-color:color-mix(in oklab, var(--color-blue-500) 15%, transparent)}}.bg-border{background-color:var(--border)}.bg-changed,.bg-changed\\/25{background-color:var(--changed)}@supports (color:color-mix(in lab, red, red)){.bg-changed\\/25{background-color:color-mix(in oklab, var(--changed) 25%, transparent)}}.bg-destructive,.bg-destructive\\/10{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.bg-destructive\\/10{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.bg-destructive\\/15{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.bg-destructive\\/15{background-color:color-mix(in oklab, var(--destructive) 15%, transparent)}}.bg-emerald-500{background-color:var(--color-emerald-500)}.bg-emerald-500\\/15{background-color:#00bb7f26}@supports (color:color-mix(in lab, red, red)){.bg-emerald-500\\/15{background-color:color-mix(in oklab, var(--color-emerald-500) 15%, transparent)}}.bg-foreground{background-color:var(--foreground)}.bg-highlight,.bg-highlight\\/10{background-color:var(--highlight)}@supports (color:color-mix(in lab, red, red)){.bg-highlight\\/10{background-color:color-mix(in oklab, var(--highlight) 10%, transparent)}}.bg-highlight\\/15{background-color:var(--highlight)}@supports (color:color-mix(in lab, red, red)){.bg-highlight\\/15{background-color:color-mix(in oklab, var(--highlight) 15%, transparent)}}.bg-highlight\\/30{background-color:var(--highlight)}@supports (color:color-mix(in lab, red, red)){.bg-highlight\\/30{background-color:color-mix(in oklab, var(--highlight) 30%, transparent)}}.bg-highlight\\/70{background-color:var(--highlight)}@supports (color:color-mix(in lab, red, red)){.bg-highlight\\/70{background-color:color-mix(in oklab, var(--highlight) 70%, transparent)}}.bg-muted,.bg-muted\\/30{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.bg-muted\\/30{background-color:color-mix(in oklab, var(--muted) 30%, transparent)}}.bg-muted\\/40{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.bg-muted\\/40{background-color:color-mix(in oklab, var(--muted) 40%, transparent)}}.bg-muted\\/50{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.bg-muted\\/50{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.bg-muted\\/60{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.bg-muted\\/60{background-color:color-mix(in oklab, var(--muted) 60%, transparent)}}.bg-popover{background-color:var(--popover)}.bg-primary{background-color:var(--primary)}.bg-red-500{background-color:var(--color-red-500)}.bg-red-500\\/10{background-color:#fb2c361a}@supports (color:color-mix(in lab, red, red)){.bg-red-500\\/10{background-color:color-mix(in oklab, var(--color-red-500) 10%, transparent)}}.bg-secondary{background-color:var(--secondary)}.bg-transparent{background-color:#0000}.bg-\\[repeating-conic-gradient\\(\\#e5e5e5_0_25\\%\\,\\#fff_0_50\\%\\)\\]{background-image:repeating-conic-gradient(#e5e5e5 0 25%,#fff 0 50%)}.bg-\\[length\\:8px_8px\\]{background-size:8px 8px}.bg-repeat{background-repeat:repeat}.mask-no-clip{-webkit-mask-clip:no-clip;mask-clip:no-clip}.mask-repeat{-webkit-mask-repeat:repeat;mask-repeat:repeat}.fill-current{fill:currentColor}.fill-highlight{fill:var(--highlight)}.fill-muted{fill:var(--muted)}.fill-none{fill:none}.fill-red-500{fill:var(--color-red-500)}.stroke-border{stroke:var(--border)}.stroke-current{stroke:currentColor}.stroke-foreground{stroke:var(--foreground)}.stroke-highlight{stroke:var(--highlight)}.object-contain{object-fit:contain}.object-cover{object-fit:cover}.p-0{padding:0}.p-0\\.5{padding:calc(var(--spacing) * .5)}.p-0\\.75{padding:calc(var(--spacing) * .75)}.p-1{padding:var(--spacing)}.p-1\\.5{padding:calc(var(--spacing) * 1.5)}.p-2{padding:calc(var(--spacing) * 2)}.p-3{padding:calc(var(--spacing) * 3)}.p-4{padding:calc(var(--spacing) * 4)}.px-1{padding-inline:var(--spacing)}.px-1\\.5{padding-inline:calc(var(--spacing) * 1.5)}.px-2{padding-inline:calc(var(--spacing) * 2)}.px-2\\.5{padding-inline:calc(var(--spacing) * 2.5)}.px-3{padding-inline:calc(var(--spacing) * 3)}.px-4{padding-inline:calc(var(--spacing) * 4)}.px-6{padding-inline:calc(var(--spacing) * 6)}.py-0{padding-block:0}.py-0\\.5{padding-block:calc(var(--spacing) * .5)}.py-1{padding-block:var(--spacing)}.py-1\\.5{padding-block:calc(var(--spacing) * 1.5)}.py-2{padding-block:calc(var(--spacing) * 2)}.py-2\\.5{padding-block:calc(var(--spacing) * 2.5)}.py-3{padding-block:calc(var(--spacing) * 3)}.py-4{padding-block:calc(var(--spacing) * 4)}.py-6{padding-block:calc(var(--spacing) * 6)}.py-10{padding-block:calc(var(--spacing) * 10)}.pt-0{padding-top:0}.pt-0\\.5{padding-top:calc(var(--spacing) * .5)}.pt-1{padding-top:var(--spacing)}.pt-2{padding-top:calc(var(--spacing) * 2)}.pt-3{padding-top:calc(var(--spacing) * 3)}.pr-0{padding-right:0}.pr-0\\.5{padding-right:calc(var(--spacing) * .5)}.pr-1{padding-right:var(--spacing)}.pr-2{padding-right:calc(var(--spacing) * 2)}.pr-3{padding-right:calc(var(--spacing) * 3)}.pr-4{padding-right:calc(var(--spacing) * 4)}.pr-6{padding-right:calc(var(--spacing) * 6)}.pr-7{padding-right:calc(var(--spacing) * 7)}.pr-9{padding-right:calc(var(--spacing) * 9)}.pb-0{padding-bottom:0}.pb-0\\.5{padding-bottom:calc(var(--spacing) * .5)}.pb-1{padding-bottom:var(--spacing)}.pb-2{padding-bottom:calc(var(--spacing) * 2)}.pl-1{padding-left:var(--spacing)}.pl-1\\.5{padding-left:calc(var(--spacing) * 1.5)}.pl-2{padding-left:calc(var(--spacing) * 2)}.pl-3{padding-left:calc(var(--spacing) * 3)}.pl-4{padding-left:calc(var(--spacing) * 4)}.pl-5{padding-left:calc(var(--spacing) * 5)}.text-center{text-align:center}.text-left{text-align:left}.text-right{text-align:right}.font-\\[arial\\,sans-serif\\]{font-family:arial,sans-serif}.font-mono{font-family:var(--font-mono)}.font-sans{font-family:var(--font-sans)}.text-base{font-size:var(--text-base);line-height:var(--tw-leading,var(--text-base--line-height))}.text-lg{font-size:var(--text-lg);line-height:var(--tw-leading,var(--text-lg--line-height))}.text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.text-xs{font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height))}.text-\\[10px\\]{font-size:10px}.text-\\[11px\\]{font-size:11px}.text-\\[13px\\]{font-size:13px}.leading-3{--tw-leading:calc(var(--spacing) * 3);line-height:calc(var(--spacing) * 3)}.leading-3\\.5{--tw-leading:calc(var(--spacing) * 3.5);line-height:calc(var(--spacing) * 3.5)}.leading-4{--tw-leading:calc(var(--spacing) * 4);line-height:calc(var(--spacing) * 4)}.leading-5{--tw-leading:calc(var(--spacing) * 5);line-height:calc(var(--spacing) * 5)}.leading-none{--tw-leading:1;line-height:1}.leading-normal{--tw-leading:var(--leading-normal);line-height:var(--leading-normal)}.leading-snug{--tw-leading:var(--leading-snug);line-height:var(--leading-snug)}.leading-tight{--tw-leading:var(--leading-tight);line-height:var(--leading-tight)}.font-bold{--tw-font-weight:var(--font-weight-bold);font-weight:var(--font-weight-bold)}.font-medium{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.font-normal{--tw-font-weight:var(--font-weight-normal);font-weight:var(--font-weight-normal)}.font-semibold{--tw-font-weight:var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.tracking-\\[-1px\\]{--tw-tracking:-1px;letter-spacing:-1px}.tracking-wide{--tw-tracking:var(--tracking-wide);letter-spacing:var(--tracking-wide)}.text-wrap{text-wrap:wrap}.break-words{overflow-wrap:break-word}.break-all{word-break:break-all}.text-clip{text-overflow:clip}.text-ellipsis{text-overflow:ellipsis}.whitespace-nowrap{white-space:nowrap}.whitespace-pre{white-space:pre}.whitespace-pre-wrap{white-space:pre-wrap}.text-\\[\\#1a0dab\\]{color:#1a0dab}.text-\\[\\#4d5156\\]{color:#4d5156}.text-\\[\\#70757a\\]{color:#70757a}.text-\\[\\#202124\\]{color:#202124}.text-\\[\\#dadce0\\]{color:#dadce0}.text-\\[\\#fbbc04\\]{color:#fbbc04}.text-amber-600{color:var(--color-amber-600)}.text-amber-700{color:var(--color-amber-700)}.text-amber-800{color:var(--color-amber-800)}.text-background{color:var(--background)}.text-black{color:var(--color-black)}.text-blue-600{color:var(--color-blue-600)}.text-blue-700{color:var(--color-blue-700)}.text-destructive{color:var(--destructive)}.text-emerald-600{color:var(--color-emerald-600)}.text-emerald-700{color:var(--color-emerald-700)}.text-foreground{color:var(--foreground)}.text-green-700{color:var(--color-green-700)}.text-highlight{color:var(--highlight)}.text-muted-foreground,.text-muted-foreground\\/70{color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.text-muted-foreground\\/70{color:color-mix(in oklab, var(--muted-foreground) 70%, transparent)}}.text-popover-foreground{color:var(--popover-foreground)}.text-primary{color:var(--primary)}.text-primary-foreground{color:var(--primary-foreground)}.text-red-500{color:var(--color-red-500)}.text-secondary-foreground{color:var(--secondary-foreground)}.text-transparent{color:#0000}.text-white{color:var(--color-white)}.capitalize{text-transform:capitalize}.lowercase{text-transform:lowercase}.normal-case{text-transform:none}.uppercase{text-transform:uppercase}.italic{font-style:italic}.not-italic{font-style:normal}.diagonal-fractions{--tw-numeric-fraction:diagonal-fractions;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.lining-nums{--tw-numeric-figure:lining-nums;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.oldstyle-nums{--tw-numeric-figure:oldstyle-nums;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.ordinal{--tw-ordinal:ordinal;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.proportional-nums{--tw-numeric-spacing:proportional-nums;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.slashed-zero{--tw-slashed-zero:slashed-zero;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.stacked-fractions{--tw-numeric-fraction:stacked-fractions;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.tabular-nums{--tw-numeric-spacing:tabular-nums;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.normal-nums{font-variant-numeric:normal}.line-through{text-decoration-line:line-through}.no-underline{text-decoration-line:none}.overline{text-decoration-line:overline}.underline{text-decoration-line:underline}.decoration-destructive{-webkit-text-decoration-color:var(--destructive);-webkit-text-decoration-color:var(--destructive);-webkit-text-decoration-color:var(--destructive);text-decoration-color:var(--destructive)}.decoration-dotted{text-decoration-style:dotted}.underline-offset-4{text-underline-offset:4px}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.subpixel-antialiased{-webkit-font-smoothing:auto;-moz-osx-font-smoothing:auto}.caret-foreground{caret-color:var(--foreground)}.opacity-0{opacity:0}.opacity-45{opacity:.45}.opacity-50{opacity:.5}.opacity-60{opacity:.6}.opacity-70{opacity:.7}.shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-2xl{--tw-shadow:0 25px 50px -12px var(--tw-shadow-color,#00000040);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-lg{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-md{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-none{--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-xs{--tw-shadow:0 1px 2px 0 var(--tw-shadow-color,#0000000d);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.ring{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.ring-0{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.ring-1{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.inset-ring{--tw-inset-ring-shadow:inset 0 0 0 1px var(--tw-inset-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.ring-changed{--tw-ring-color:var(--changed)}.outline{outline-style:var(--tw-outline-style);outline-width:1px}.outline-2{outline-style:var(--tw-outline-style);outline-width:2px}.-outline-offset-1{outline-offset:calc(1px * -1)}.outline-highlight{outline-color:var(--highlight)}.blur{--tw-blur:blur(8px);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.drop-shadow{--tw-drop-shadow-size:drop-shadow(0 1px 2px var(--tw-drop-shadow-color,#0000001a)) drop-shadow(0 1px 1px var(--tw-drop-shadow-color,#0000000f));--tw-drop-shadow:drop-shadow(0 1px 2px #0000001a) drop-shadow(0 1px 1px #0000000f);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.grayscale{--tw-grayscale:grayscale(100%);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.invert{--tw-invert:invert(100%);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.sepia{--tw-sepia:sepia(100%);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.filter{filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.backdrop-blur{--tw-backdrop-blur:blur(8px);-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.backdrop-grayscale{--tw-backdrop-grayscale:grayscale(100%);-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.backdrop-invert{--tw-backdrop-invert:invert(100%);-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.backdrop-sepia{--tw-backdrop-sepia:sepia(100%);-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.backdrop-filter{-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-\\[color\\,box-shadow\\]{transition-property:color,box-shadow;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-transform{transition-property:transform,translate,scale,rotate;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.ease-in{--tw-ease:var(--ease-in);transition-timing-function:var(--ease-in)}.ease-in-out{--tw-ease:var(--ease-in-out);transition-timing-function:var(--ease-in-out)}.ease-out{--tw-ease:var(--ease-out);transition-timing-function:var(--ease-out)}.outline-none{--tw-outline-style:none;outline-style:none}.select-none{-webkit-user-select:none;user-select:none}:where(.divide-x-reverse>:not(:last-child)){--tw-divide-x-reverse:1}.ring-inset{--tw-ring-inset:inset}.zoom-in{--tw-enter-scale:0}.zoom-out{--tw-exit-scale:0}@media (hover:hover){.group-hover\\:opacity-100:is(:where(.group):hover *){opacity:1}}.selection\\:bg-primary ::selection{background-color:var(--primary)}.selection\\:bg-primary::selection{background-color:var(--primary)}.selection\\:text-primary-foreground ::selection{color:var(--primary-foreground)}.selection\\:text-primary-foreground::selection{color:var(--primary-foreground)}.file\\:inline-flex::file-selector-button{display:inline-flex}.file\\:h-7::file-selector-button{height:calc(var(--spacing) * 7)}.file\\:border-0::file-selector-button{border-style:var(--tw-border-style);border-width:0}.file\\:bg-transparent::file-selector-button{background-color:#0000}.file\\:text-sm::file-selector-button{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.file\\:font-medium::file-selector-button{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.file\\:text-foreground::file-selector-button{color:var(--foreground)}.placeholder\\:text-muted-foreground::placeholder{color:var(--muted-foreground)}.last\\:border-b-0:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.focus-within\\:border-ring:focus-within{border-color:var(--ring)}.focus-within\\:ring-3:focus-within{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.focus-within\\:ring-ring\\/50:focus-within{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.focus-within\\:ring-ring\\/50:focus-within{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}@media (hover:hover){.hover\\:bg-accent:hover{background-color:var(--accent)}.hover\\:bg-destructive\\/90:hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.hover\\:bg-destructive\\/90:hover{background-color:color-mix(in oklab, var(--destructive) 90%, transparent)}}.hover\\:bg-highlight\\/10:hover{background-color:var(--highlight)}@supports (color:color-mix(in lab, red, red)){.hover\\:bg-highlight\\/10:hover{background-color:color-mix(in oklab, var(--highlight) 10%, transparent)}}.hover\\:bg-highlight\\/30:hover{background-color:var(--highlight)}@supports (color:color-mix(in lab, red, red)){.hover\\:bg-highlight\\/30:hover{background-color:color-mix(in oklab, var(--highlight) 30%, transparent)}}.hover\\:bg-muted:hover,.hover\\:bg-muted\\/50:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.hover\\:bg-muted\\/50:hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.hover\\:bg-muted\\/60:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.hover\\:bg-muted\\/60:hover{background-color:color-mix(in oklab, var(--muted) 60%, transparent)}}.hover\\:bg-primary\\/90:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.hover\\:bg-primary\\/90:hover{background-color:color-mix(in oklab, var(--primary) 90%, transparent)}}.hover\\:bg-secondary\\/80:hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.hover\\:bg-secondary\\/80:hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.hover\\:text-accent-foreground:hover{color:var(--accent-foreground)}.hover\\:text-foreground:hover{color:var(--foreground)}.hover\\:text-muted-foreground:hover{color:var(--muted-foreground)}.hover\\:underline:hover{text-decoration-line:underline}}.focus-visible\\:border-ring:focus-visible{border-color:var(--ring)}.focus-visible\\:bg-accent:focus-visible{background-color:var(--accent)}.focus-visible\\:text-foreground:focus-visible{color:var(--foreground)}.focus-visible\\:opacity-100:focus-visible{opacity:1}.focus-visible\\:ring-0:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.focus-visible\\:ring-3:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.focus-visible\\:outline-1:focus-visible{outline-style:var(--tw-outline-style);outline-width:1px}.focus-visible\\:outline-ring:focus-visible{outline-color:var(--ring)}.disabled\\:pointer-events-none:disabled{pointer-events:none}.disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.disabled\\:opacity-50:disabled{opacity:.5}.has-\\[select\\:disabled\\]\\:opacity-50:has(:is(select:disabled)){opacity:.5}.has-\\[\\>svg\\]\\:px-1\\.5:has(>svg){padding-inline:calc(var(--spacing) * 1.5)}.has-\\[\\>svg\\]\\:px-2\\.5:has(>svg){padding-inline:calc(var(--spacing) * 2.5)}.has-\\[\\>svg\\]\\:px-3:has(>svg){padding-inline:calc(var(--spacing) * 3)}.has-\\[\\>svg\\]\\:px-4:has(>svg){padding-inline:calc(var(--spacing) * 4)}.aria-invalid\\:border-destructive[aria-invalid=true]{border-color:var(--destructive)}.aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.data-\\[orientation\\=horizontal\\]\\:h-px[data-orientation=horizontal]{height:1px}.data-\\[orientation\\=horizontal\\]\\:w-full[data-orientation=horizontal]{width:100%}.data-\\[orientation\\=vertical\\]\\:h-full[data-orientation=vertical]{height:100%}.data-\\[orientation\\=vertical\\]\\:w-px[data-orientation=vertical]{width:1px}.data-\\[state\\=active\\]\\:bg-background[data-state=active]{background-color:var(--background)}.data-\\[state\\=active\\]\\:shadow-sm[data-state=active]{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.data-\\[state\\=checked\\]\\:translate-x-\\[calc\\(100\\%-2px\\)\\][data-state=checked]{--tw-translate-x:calc(100% - 2px);translate:var(--tw-translate-x) var(--tw-translate-y)}.data-\\[state\\=checked\\]\\:bg-primary[data-state=checked]{background-color:var(--primary)}.data-\\[state\\=on\\]\\:bg-accent[data-state=on]{background-color:var(--accent)}.data-\\[state\\=on\\]\\:text-accent-foreground[data-state=on]{color:var(--accent-foreground)}.data-\\[state\\=unchecked\\]\\:translate-x-0[data-state=unchecked]{--tw-translate-x:0px;translate:var(--tw-translate-x) var(--tw-translate-y)}.data-\\[state\\=unchecked\\]\\:bg-input[data-state=unchecked]{background-color:var(--input)}@media (width>=48rem){.md\\:text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}}.dark\\:border-input:is(.dark *){border-color:var(--input)}.dark\\:bg-destructive\\/60:is(.dark *){background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.dark\\:bg-destructive\\/60:is(.dark *){background-color:color-mix(in oklab, var(--destructive) 60%, transparent)}}.dark\\:bg-input\\/30:is(.dark *){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.dark\\:bg-input\\/30:is(.dark *){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.dark\\:text-muted-foreground:is(.dark *){color:var(--muted-foreground)}@media (hover:hover){.dark\\:hover\\:bg-accent\\/50:is(.dark *):hover{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.dark\\:hover\\:bg-accent\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--accent) 50%, transparent)}}.dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}}.dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.dark\\:data-\\[state\\=active\\]\\:border-input:is(.dark *)[data-state=active]{border-color:var(--input)}.dark\\:data-\\[state\\=active\\]\\:bg-input\\/30:is(.dark *)[data-state=active]{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.dark\\:data-\\[state\\=active\\]\\:bg-input\\/30:is(.dark *)[data-state=active]{background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.dark\\:data-\\[state\\=active\\]\\:text-foreground:is(.dark *)[data-state=active]{color:var(--foreground)}.dark\\:data-\\[state\\=checked\\]\\:bg-primary-foreground:is(.dark *)[data-state=checked]{background-color:var(--primary-foreground)}.dark\\:data-\\[state\\=unchecked\\]\\:bg-foreground:is(.dark *)[data-state=unchecked]{background-color:var(--foreground)}.dark\\:data-\\[state\\=unchecked\\]\\:bg-input\\/80:is(.dark *)[data-state=unchecked]{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.dark\\:data-\\[state\\=unchecked\\]\\:bg-input\\/80:is(.dark *)[data-state=unchecked]{background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.\\[\\&_svg\\]\\:pointer-events-none svg{pointer-events:none}.\\[\\&_svg\\]\\:shrink-0 svg{flex-shrink:0}.\\[\\&_svg\\:not\\(\\[class\\*\\=\\'size-\\'\\]\\)\\]\\:size-3 svg:not([class*=size-]){width:calc(var(--spacing) * 3);height:calc(var(--spacing) * 3)}.\\[\\&_svg\\:not\\(\\[class\\*\\=\\'size-\\'\\]\\)\\]\\:size-4 svg:not([class*=size-]){width:calc(var(--spacing) * 4);height:calc(var(--spacing) * 4)}.\\[\\&\\>svg\\]\\:pointer-events-none>svg{pointer-events:none}.\\[\\&\\>svg\\]\\:size-3>svg{width:calc(var(--spacing) * 3);height:calc(var(--spacing) * 3)}[data-slot=tooltip-content] .\\[\\[data-slot\\=tooltip-content\\]_\\&\\]\\:bg-background\\/20{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){[data-slot=tooltip-content] .\\[\\[data-slot\\=tooltip-content\\]_\\&\\]\\:bg-background\\/20{background-color:color-mix(in oklab, var(--background) 20%, transparent)}}[data-slot=tooltip-content] .\\[\\[data-slot\\=tooltip-content\\]_\\&\\]\\:text-background{color:var(--background)}[data-slot=tooltip-content] .dark\\:\\[\\[data-slot\\=tooltip-content\\]_\\&\\]\\:bg-background\\/10:is(.dark *){background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){[data-slot=tooltip-content] .dark\\:\\[\\[data-slot\\=tooltip-content\\]_\\&\\]\\:bg-background\\/10:is(.dark *){background-color:color-mix(in oklab, var(--background) 10%, transparent)}}@media (hover:hover){a.\\[a\\&\\]\\:hover\\:bg-accent:hover{background-color:var(--accent)}a.\\[a\\&\\]\\:hover\\:bg-destructive\\/90:hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){a.\\[a\\&\\]\\:hover\\:bg-destructive\\/90:hover{background-color:color-mix(in oklab, var(--destructive) 90%, transparent)}}a.\\[a\\&\\]\\:hover\\:bg-primary\\/90:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){a.\\[a\\&\\]\\:hover\\:bg-primary\\/90:hover{background-color:color-mix(in oklab, var(--primary) 90%, transparent)}}a.\\[a\\&\\]\\:hover\\:bg-secondary\\/90:hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){a.\\[a\\&\\]\\:hover\\:bg-secondary\\/90:hover{background-color:color-mix(in oklab, var(--secondary) 90%, transparent)}}a.\\[a\\&\\]\\:hover\\:text-accent-foreground:hover{color:var(--accent-foreground)}}}@property --tw-animation-delay{syntax:\"*\";inherits:false;initial-value:0s}@property --tw-animation-direction{syntax:\"*\";inherits:false;initial-value:normal}@property --tw-animation-duration{syntax:\"*\";inherits:false}@property --tw-animation-fill-mode{syntax:\"*\";inherits:false;initial-value:none}@property --tw-animation-iteration-count{syntax:\"*\";inherits:false;initial-value:1}@property --tw-enter-blur{syntax:\"*\";inherits:false;initial-value:0}@property --tw-enter-opacity{syntax:\"*\";inherits:false;initial-value:1}@property --tw-enter-rotate{syntax:\"*\";inherits:false;initial-value:0}@property --tw-enter-scale{syntax:\"*\";inherits:false;initial-value:1}@property --tw-enter-translate-x{syntax:\"*\";inherits:false;initial-value:0}@property --tw-enter-translate-y{syntax:\"*\";inherits:false;initial-value:0}@property --tw-exit-blur{syntax:\"*\";inherits:false;initial-value:0}@property --tw-exit-opacity{syntax:\"*\";inherits:false;initial-value:1}@property --tw-exit-rotate{syntax:\"*\";inherits:false;initial-value:0}@property --tw-exit-scale{syntax:\"*\";inherits:false;initial-value:1}@property --tw-exit-translate-x{syntax:\"*\";inherits:false;initial-value:0}@property --tw-exit-translate-y{syntax:\"*\";inherits:false;initial-value:0}:host{all:initial;z-index:2147483000;pointer-events:none;--lightningcss-light:initial;--lightningcss-dark: ;color-scheme:light;--radius:.625rem;--background:oklch(100% 0 0);--foreground:oklch(14.5% 0 0);--card:oklch(100% 0 0);--card-foreground:oklch(14.5% 0 0);--popover:oklch(100% 0 0);--popover-foreground:oklch(14.5% 0 0);--primary:oklch(20.5% 0 0);--primary-foreground:oklch(98.5% 0 0);--secondary:oklch(97% 0 0);--secondary-foreground:oklch(20.5% 0 0);--muted:oklch(97% 0 0);--muted-foreground:oklch(55.6% 0 0);--accent:oklch(97% 0 0);--accent-foreground:oklch(20.5% 0 0);--destructive:oklch(57.7% .245 27.325);--border:oklch(92.2% 0 0);--input:oklch(92.2% 0 0);--ring:oklch(70.8% 0 0);--changed:oklch(85.2% .199 91.936);--highlight:oklch(62.3% .214 259.815);position:fixed;inset:0}.easing-preview{animation:1.6s infinite alternate easing-preview}@keyframes easing-preview{to{left:calc(100% - .5rem)}}@property --tw-translate-x{syntax:\"*\";inherits:false;initial-value:0}@property --tw-translate-y{syntax:\"*\";inherits:false;initial-value:0}@property --tw-translate-z{syntax:\"*\";inherits:false;initial-value:0}@property --tw-scale-x{syntax:\"*\";inherits:false;initial-value:1}@property --tw-scale-y{syntax:\"*\";inherits:false;initial-value:1}@property --tw-scale-z{syntax:\"*\";inherits:false;initial-value:1}@property --tw-rotate-x{syntax:\"*\";inherits:false}@property --tw-rotate-y{syntax:\"*\";inherits:false}@property --tw-rotate-z{syntax:\"*\";inherits:false}@property --tw-skew-x{syntax:\"*\";inherits:false}@property --tw-skew-y{syntax:\"*\";inherits:false}@property --tw-pan-x{syntax:\"*\";inherits:false}@property --tw-pan-y{syntax:\"*\";inherits:false}@property --tw-pinch-zoom{syntax:\"*\";inherits:false}@property --tw-space-y-reverse{syntax:\"*\";inherits:false;initial-value:0}@property --tw-space-x-reverse{syntax:\"*\";inherits:false;initial-value:0}@property --tw-divide-x-reverse{syntax:\"*\";inherits:false;initial-value:0}@property --tw-border-style{syntax:\"*\";inherits:false;initial-value:solid}@property --tw-divide-y-reverse{syntax:\"*\";inherits:false;initial-value:0}@property --tw-leading{syntax:\"*\";inherits:false}@property --tw-font-weight{syntax:\"*\";inherits:false}@property --tw-tracking{syntax:\"*\";inherits:false}@property --tw-ordinal{syntax:\"*\";inherits:false}@property --tw-slashed-zero{syntax:\"*\";inherits:false}@property --tw-numeric-figure{syntax:\"*\";inherits:false}@property --tw-numeric-spacing{syntax:\"*\";inherits:false}@property --tw-numeric-fraction{syntax:\"*\";inherits:false}@property --tw-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:\"*\";inherits:false}@property --tw-shadow-alpha{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:\"*\";inherits:false}@property --tw-inset-shadow-alpha{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:\"*\";inherits:false}@property --tw-ring-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:\"*\";inherits:false}@property --tw-inset-ring-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:\"*\";inherits:false}@property --tw-ring-offset-width{syntax:\"<length>\";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:\"*\";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-outline-style{syntax:\"*\";inherits:false;initial-value:solid}@property --tw-blur{syntax:\"*\";inherits:false}@property --tw-brightness{syntax:\"*\";inherits:false}@property --tw-contrast{syntax:\"*\";inherits:false}@property --tw-grayscale{syntax:\"*\";inherits:false}@property --tw-hue-rotate{syntax:\"*\";inherits:false}@property --tw-invert{syntax:\"*\";inherits:false}@property --tw-opacity{syntax:\"*\";inherits:false}@property --tw-saturate{syntax:\"*\";inherits:false}@property --tw-sepia{syntax:\"*\";inherits:false}@property --tw-drop-shadow{syntax:\"*\";inherits:false}@property --tw-drop-shadow-color{syntax:\"*\";inherits:false}@property --tw-drop-shadow-alpha{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:\"*\";inherits:false}@property --tw-backdrop-blur{syntax:\"*\";inherits:false}@property --tw-backdrop-brightness{syntax:\"*\";inherits:false}@property --tw-backdrop-contrast{syntax:\"*\";inherits:false}@property --tw-backdrop-grayscale{syntax:\"*\";inherits:false}@property --tw-backdrop-hue-rotate{syntax:\"*\";inherits:false}@property --tw-backdrop-invert{syntax:\"*\";inherits:false}@property --tw-backdrop-opacity{syntax:\"*\";inherits:false}@property --tw-backdrop-saturate{syntax:\"*\";inherits:false}@property --tw-backdrop-sepia{syntax:\"*\";inherits:false}@property --tw-ease{syntax:\"*\";inherits:false}@keyframes spin{to{transform:rotate(360deg)}}", Yb = [
	"grid",
	"tokens",
	"outline",
	"form",
	"events",
	"seo",
	"images",
	"cache"
], Xb = {
	tools: Yb,
	grid: {
		columns: "12",
		gap: "24px",
		margin: "24px",
		maxWidth: "none"
	},
	breakpoints: {},
	ignore: "",
	forms: {
		selector: "form",
		read: null
	},
	seo: { ignoreParams: [] },
	actions: [],
	shortcuts: {
		toolbar: "ctrl+.",
		grid: "ctrl+g",
		tokens: "ctrl+d",
		outline: "ctrl+o",
		form: "ctrl+y",
		events: "ctrl+e",
		seo: "ctrl+k",
		images: "ctrl+b",
		cache: "ctrl+m"
	}
};
function Zb() {
	let e = Jb.match(/@property\s+--tw-[\w-]+\s*\{[^}]*\}/g);
	if (!e || document.getElementById("we-go-dev-tools-properties")) return;
	let t = document.createElement("style");
	t.id = `${Vu}-properties`, t.textContent = e.join("\n"), document.head.append(t);
}
var Qb = null;
function $b(e = {}) {
	if (Qb) return Qb;
	let t = {
		tools: e.tools ? Yb.filter((t) => e.tools.includes(t)) : Xb.tools,
		grid: {
			...Xb.grid,
			...e.grid
		},
		breakpoints: e.breakpoints || Xb.breakpoints,
		ignore: e.ignore || Xb.ignore,
		forms: {
			...Xb.forms,
			...e.forms
		},
		actions: e.actions || Xb.actions,
		seo: {
			...Xb.seo,
			...e.seo
		},
		shortcuts: {
			...Xb.shortcuts,
			...e.shortcuts
		}
	};
	Uu(t.ignore), t.tools.includes("tokens") && iv(X_(G_, "")), Zb(), t.tools.includes("events") && od(), t.tools.includes("images") && Ff();
	let n = document.createElement(Vu), r = n.attachShadow({ mode: "open" }), i = document.createElement("style"), a = document.createElement("div");
	n.setAttribute("data-lenis-prevent", ""), i.textContent = Jb, r.append(i, a), document.documentElement.append(n);
	let o = vo(qb, {
		config: t,
		root: r
	});
	return o.mount(a), Qb = { destroy() {
		o.unmount(), n.remove(), Qb = null;
	} }, Qb;
}
//#endregion
export { Yb as TOOLS, $b as init };
