displayValueElement: I,
                    formatValueDisplay: s
                });
            }).filter(R);
            if (!d.length) return;
            d.length > 1 && d.sort((E, c) => E.getValue() - c.getValue());
            let [p, m] = d;
            return p.addSibling(m), m && m.addSibling(p), d;
        },
        St = ({
            fillElement: e,
            minRange: t,
            maxRange: r,
            trackWidth: s
        }, n) => {
            if (!e) return;
            let o = new k(e, {
                    minRange: t,
                    maxRange: r,
                    trackWidth: s,
                    handles: n
                }),
                [i, a] = n;
            i.addFill(o), a == null || a.addFill(o);
        };

    var Vt = async () => {
        await J(Q);
        let t = [...document.querySelectorAll(N("element", "wrapper", {
                operator: "prefixed"
            }))].map(fe).filter(R),
            r = t.map(({
                handles: s
            }) => s);
        return Z(L, r, () => {
            for (let {
                    destroy: s
                }
                of t) s();
        });
    }, fe = e => {
        let t = ft(e);
        if (!t) return;
        let r = It(t);
        if (!r) return;
        St(t, r);
        let {
            maxRange: s,
            minRange: n,
            steps: o,
            defaultStep: i,
            precision: a,
            totalRange: u,
            trackElement: l,
            updateOnRelease: d
        } = t, {
            trackWidth: p,
            trackLeft: E,
            trackRight: c
        } = t, b, f = !1, g = m => {
            let A = n + (m - E) * u / p;
            return U(A, i, a, n);
        }, I = m => {
            if (!b) return;
            m instanceof MouseEvent && m.preventDefault();
            let A = W(m),
                [y, S] = b.getConstraints(),
                v;
            E > A ? v = y : c < A ? v = S : v = g(A);
            let Kt = b.setValue(v, !d);
            f || (f = Kt);
        }, D = m => {
            m.cancelable && m.preventDefault(), document.removeEventListener("mousemove", I), document.removeEventListener("touchmove", I), document.removeEventListener("mouseup", D), document.removeEventListener("touchend", D), d && f && (b == null || b.updateInputElement()), f = !1, b == null || b.element.blur(), b = void 0;
        }, q = m => {
            m.cancelable && m.preventDefault();
            let A = W(m);
            document.addEventListener("mousemove", I), document.addEventListener("touchmove", I, {
                passive: !0
            }), document.addEventListener("mouseup", D), document.addEventListener("touchend", D);
            let y;
            E > A ? y = n : c < A ? y = s : y = g(A);
            let S = Et(y, r);
            if (!S) return;
            S.element.focus(), b = S;
            let v = S.setValue(y, !d);
            f || (f = v);
        }, Lt = () => {
            p = l.clientWidth, {
                left: E,
                right: c
            } = l.getBoundingClientRect();
            for (let m of r) m && m.updateTrackWidth(p);
        }, Vt = [(() => {
            let m = O(e);
            if (!m) return h;
            let A = new MutationObserver(() => {
                K(m) && Lt();
            });
            return A.observe(m, {
                attributes: !0,
                attributeFilter: ["style", "class"]
            }), () => A.disconnect();
        })(), x(l, "mousedown", q), x(l, "touchstart", q, {
            passive: !0
        }), x(window, "resize", (0, vt.default)(Lt, 50))];
        return {
            handles: r,
            destroy: () => {
                for (let m of Vt) m();
            }
        };
    };

    nt({
        init: Vt,
        version: st,
        attributeKey: L
    });
})();
