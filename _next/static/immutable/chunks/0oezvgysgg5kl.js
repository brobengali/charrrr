(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  62561,
  (e) => {
    "use strict";
    var t = e.i(43476),
      s = e.i(71645),
      a = e.i(49341);
    let n = { focus: "focusing", break: "on a short break", idle: "settling in" };
    function l({ seat: e, occupant: s, isMine: i, isUsual: r, onClick: o }) {
      return s
        ? (0, t.jsxs)("button", {
            type: "button",
            className: `desk ${i ? "mine" : ""}`,
            onClick: o,
            "aria-label": `Desk ${e}, ${s.name} studying ${s.topic}`,
            children: [
              (0, t.jsx)("span", { className: "num", children: e }),
              (0, t.jsxs)("span", {
                className: "who",
                children: [
                  (0, t.jsx)("span", {
                    className: "ava",
                    style: { background: s.color },
                    children: s.avatar,
                  }),
                  i ? "You" : s.name,
                ],
              }),
              (0, t.jsxs)("span", {
                className: "state",
                children: [(0, t.jsx)("span", { className: `lamp ${s.phase}` }), n[s.phase]],
              }),
              (0, t.jsx)("span", { className: "topic", title: s.topic, children: s.topic || "…" }),
              "number" == typeof s.weekMinutes &&
                s.weekMinutes > 0 &&
                (0, t.jsxs)("span", {
                  className: "small muted",
                  children: [(0, a.L)(s.weekMinutes), " this week"],
                }),
            ],
          })
        : (0, t.jsxs)("button", {
            type: "button",
            className: `desk vacant ${r ? "usual" : ""}`,
            onClick: o,
            "aria-label": `Desk ${e}, vacant`,
            children: [
              (0, t.jsx)("span", { className: "num", children: e }),
              (0, t.jsx)("span", {
                className: "hint",
                children: r ? "Your usual desk" : "Vacant · take this seat",
              }),
            ],
          });
    }
    var i = e.i(33957),
      r = e.i(79951);
    function o(e) {
      let [a, n] = (0, s.useState)(""),
        [l, i] = (0, s.useState)(`${e.defaultFocus}/${e.defaultBreak}`),
        [r, o] = (0, s.useState)(!0),
        [c, u] = l.split("/").map(Number);
      return (0, t.jsx)("div", {
        className: "veil",
        role: "dialog",
        "aria-modal": "true",
        children: (0, t.jsxs)("form", {
          className: "dialog",
          onSubmit: (t) => {
            (t.preventDefault(), a.trim() && e.onSit(a.trim(), c, u, r));
          },
          children: [
            (0, t.jsxs)("h2", { children: ["Desk ", e.seat] }),
            (0, t.jsx)("p", {
              className: "muted small",
              children:
                "Write what you are working on. It shows on your desk for everyone in the hall.",
            }),
            (0, t.jsx)("label", { htmlFor: "topic", children: "Today’s topic" }),
            (0, t.jsx)("input", {
              id: "topic",
              type: "text",
              autoFocus: !0,
              maxLength: 60,
              placeholder: "e.g. Molecular biology: PCR",
              value: a,
              onChange: (e) => n(e.target.value),
            }),
            (0, t.jsx)("label", { htmlFor: "plan", children: "Rhythm" }),
            (0, t.jsxs)("select", {
              id: "plan",
              value: l,
              onChange: (e) => i(e.target.value),
              children: [
                (0, t.jsx)("option", { value: "25/5", children: "25 min focus · 5 min break" }),
                (0, t.jsx)("option", { value: "50/10", children: "50 min focus · 10 min break" }),
                (0, t.jsx)("option", {
                  value: "15/3",
                  children: "15 min focus · 3 min break (warm-up)",
                }),
              ],
            }),
            (0, t.jsxs)("span", {
              className: "toggle",
              style: { marginTop: 10 },
              children: [
                (0, t.jsx)("input", {
                  type: "checkbox",
                  checked: r,
                  onChange: (e) => o(e.target.checked),
                }),
                "Make this my usual desk in this hall",
              ],
            }),
            (0, t.jsxs)("div", {
              className: "actions",
              children: [
                (0, t.jsx)("button", {
                  type: "button",
                  className: "ghost",
                  onClick: e.onCancel,
                  children: "Not yet",
                }),
                (0, t.jsx)("button", {
                  type: "submit",
                  className: "sage",
                  disabled: !a.trim(),
                  children: "Sit down & start",
                }),
              ],
            }),
          ],
        }),
      });
    }
    function c(e) {
      let [n, l] = (0, s.useState)(""),
        i = e.member;
      return (0, t.jsx)("div", {
        className: "veil",
        role: "dialog",
        "aria-modal": "true",
        onClick: e.onClose,
        children: (0, t.jsxs)("div", {
          className: "dialog",
          onClick: (e) => e.stopPropagation(),
          children: [
            (0, t.jsxs)("div", {
              className: "row",
              children: [
                (0, t.jsx)("span", {
                  style: {
                    fontSize: "2rem",
                    background: i.color,
                    borderRadius: "50%",
                    width: 52,
                    height: 52,
                    display: "grid",
                    placeItems: "center",
                  },
                  children: i.avatar,
                }),
                (0, t.jsxs)("div", {
                  children: [
                    (0, t.jsx)("h2", { style: { margin: 0 }, children: i.name }),
                    (0, t.jsxs)("div", {
                      className: "muted small",
                      children: ["Studying: ", i.topic],
                    }),
                    "number" == typeof i.weekMinutes &&
                      i.weekMinutes > 0 &&
                      (0, t.jsxs)("div", {
                        className: "muted small",
                        children: [(0, a.L)(i.weekMinutes), " this week"],
                      }),
                  ],
                }),
              ],
            }),
            e.canRequest
              ? (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsx)("label", {
                      htmlFor: "note",
                      children: "Ask to study together in a small room (optional note)",
                    }),
                    (0, t.jsx)("input", {
                      id: "note",
                      type: "text",
                      maxLength: 80,
                      placeholder: "e.g. Also doing enzyme kinetics, want to sync breaks?",
                      value: n,
                      onChange: (e) => l(e.target.value),
                    }),
                  ],
                })
              : (0, t.jsx)("p", {
                  className: "muted small",
                  style: { marginTop: 12 },
                  children: e.reason,
                }),
            (0, t.jsxs)("div", {
              className: "actions",
              children: [
                (0, t.jsx)("button", {
                  type: "button",
                  className: "ghost small",
                  onClick: e.onReport,
                  children: "Report",
                }),
                (0, t.jsx)("button", {
                  type: "button",
                  className: "ghost small",
                  onClick: e.onBlock,
                  children: "Block",
                }),
                (0, t.jsx)("button", {
                  type: "button",
                  className: "ghost",
                  onClick: e.onClose,
                  children: "Close",
                }),
                e.canRequest &&
                  (0, t.jsx)("button", {
                    type: "button",
                    className: "sage",
                    onClick: () => e.onRequest(n),
                    children: "Send request",
                  }),
              ],
            }),
          ],
        }),
      });
    }
    function u(e) {
      let [a, n] = (0, s.useState)("");
      return (0, t.jsx)("div", {
        className: "veil",
        role: "dialog",
        "aria-modal": "true",
        children: (0, t.jsxs)("form", {
          className: "dialog",
          onSubmit: (t) => {
            (t.preventDefault(), e.onSave(a.trim()));
          },
          children: [
            (0, t.jsx)("h2", { children: "Standing up" }),
            (0, t.jsxs)("p", {
              children: [
                e.minutes,
                " min of focus on ",
                (0, t.jsx)("b", { children: e.topic }),
                ".",
                e.minutes > 0 ? " That counts." : " Showing up counts too.",
              ],
            }),
            (0, t.jsx)("label", {
              htmlFor: "recap",
              children: "One line for future you: what got done? (optional)",
            }),
            (0, t.jsx)("input", {
              id: "recap",
              type: "text",
              autoFocus: !0,
              maxLength: 100,
              placeholder: "e.g. Finished 12 Michaelis-Menten problems",
              value: a,
              onChange: (e) => n(e.target.value),
            }),
            (0, t.jsxs)("div", {
              className: "actions",
              children: [
                (0, t.jsx)("button", {
                  type: "button",
                  className: "ghost",
                  onClick: e.onBack,
                  children: "Keep studying",
                }),
                (0, t.jsx)("button", {
                  type: "submit",
                  className: "sage",
                  children: "Save & stand up",
                }),
              ],
            }),
          ],
        }),
      });
    }
    function d(e) {
      return e.compact
        ? (0, t.jsxs)("div", {
            className: "break-mini",
            role: "status",
            children: [
              (0, t.jsxs)("b", { children: ["Short break · ", e.clock] }),
              (0, t.jsx)("div", {
                className: "small muted",
                children: "Stand, stretch, sip water, look out the window. Your desk stays yours.",
              }),
              (0, t.jsxs)("div", {
                className: "row",
                style: { gap: 6, marginTop: 6 },
                children: [
                  (0, t.jsx)("button", {
                    type: "button",
                    className: "ghost small",
                    onClick: e.onHide,
                    children: "Hide",
                  }),
                  (0, t.jsx)("button", {
                    type: "button",
                    className: "sage small",
                    onClick: e.onSkip,
                    children: "Back to focus",
                  }),
                ],
              }),
            ],
          })
        : (0, t.jsx)("div", {
            className: "veil",
            role: "dialog",
            "aria-modal": "true",
            children: (0, t.jsxs)("div", {
              className: "dialog break-card",
              children: [
                (0, t.jsx)("h2", { children: "Short break" }),
                (0, t.jsx)("div", { className: "big", children: e.clock }),
                (0, t.jsx)("p", {
                  className: "muted",
                  children:
                    "Stand, stretch, sip some water, look at something far away. Your desk stays yours.",
                }),
                (0, t.jsxs)("div", {
                  className: "actions",
                  style: { justifyContent: "center" },
                  children: [
                    (0, t.jsx)("button", {
                      type: "button",
                      className: "ghost",
                      onClick: e.onHide,
                      children: "Hide this",
                    }),
                    (0, t.jsx)("button", {
                      type: "button",
                      className: "sage",
                      onClick: e.onSkip,
                      children: "Back to focus",
                    }),
                  ],
                }),
              ],
            }),
          });
    }
    function h(e) {
      let [a, n] = (0, s.useState)(""),
        [l, r] = (0, s.useState)("");
      return (0, t.jsx)("div", {
        className: "veil",
        role: "dialog",
        "aria-modal": "true",
        children: (0, t.jsxs)("form", {
          className: "dialog",
          onSubmit: (t) => {
            (t.preventDefault(), a && e.onSend(a, l.trim()));
          },
          children: [
            (0, t.jsxs)("h2", { children: ["Report ", e.member.name] }),
            (0, t.jsxs)("p", {
              className: "muted small",
              children: [
                "Only the Hush Hall moderators see this. ",
                e.member.name,
                " won’t be told who reported them. Harassment and safety reports are looked at within 24 hours.",
              ],
            }),
            (0, t.jsx)("label", { htmlFor: "reason", children: "What happened?" }),
            (0, t.jsxs)("select", {
              id: "reason",
              value: a,
              onChange: (e) => n(e.target.value),
              children: [
                (0, t.jsx)("option", { value: "", disabled: !0, children: "Choose a reason" }),
                i.L.map((e) => (0, t.jsx)("option", { value: e.id, children: e.label }, e.id)),
              ],
            }),
            (0, t.jsx)("label", {
              htmlFor: "rnote",
              children: "Anything that helps us understand (optional)",
            }),
            (0, t.jsx)("textarea", {
              id: "rnote",
              maxLength: 500,
              rows: 3,
              value: l,
              onChange: (e) => r(e.target.value),
              placeholder: "What they wrote or did, roughly when",
            }),
            (0, t.jsx)("p", {
              className: "small muted",
              children:
                "You can also block them from their desk card so you no longer see each other.",
            }),
            (0, t.jsxs)("div", {
              className: "actions",
              children: [
                (0, t.jsx)("button", {
                  type: "button",
                  className: "ghost",
                  onClick: e.onCancel,
                  children: "Cancel",
                }),
                (0, t.jsx)("button", {
                  type: "submit",
                  className: "sage",
                  disabled: !a,
                  children: "Send report",
                }),
              ],
            }),
          ],
        }),
      });
    }
    function m(e) {
      let [a, n] = (0, s.useState)(e.defaultTopic);
      return (0, t.jsx)("div", {
        className: "veil",
        role: "dialog",
        "aria-modal": "true",
        children: (0, t.jsxs)("form", {
          className: "dialog",
          onSubmit: (t) => {
            (t.preventDefault(), a.trim() && e.onSit(a.trim()));
          },
          children: [
            (0, t.jsx)("h2", { children: "Sit on the floor" }),
            (0, t.jsx)("p", {
              className: "muted small",
              children:
                "You’ll kneel on a reading cushion right where you stand. Your topic shows above you for everyone in the hall. Walk again any time to get up, or tap a free desk.",
            }),
            (0, t.jsx)("label", { htmlFor: "floor-topic", children: "Today’s topic" }),
            (0, t.jsx)("input", {
              id: "floor-topic",
              type: "text",
              autoFocus: !0,
              maxLength: 60,
              placeholder: "e.g. Organic chemistry: SN1 vs SN2",
              value: a,
              onChange: (e) => n(e.target.value),
            }),
            (0, t.jsxs)("div", {
              className: "actions",
              children: [
                (0, t.jsx)("button", {
                  type: "button",
                  className: "ghost",
                  onClick: e.onCancel,
                  children: "Not now",
                }),
                (0, t.jsx)("button", {
                  type: "submit",
                  className: "sage",
                  disabled: !a.trim(),
                  children: "Sit here",
                }),
              ],
            }),
          ],
        }),
      });
    }
    function p(e) {
      let [a, n] = (0, s.useState)(e.look),
        l = (e) => n((t) => ({ ...t, ...e }));
      return (0, t.jsx)("div", {
        className: "veil",
        role: "dialog",
        "aria-modal": "true",
        children: (0, t.jsxs)("form", {
          className: "dialog",
          onSubmit: (t) => {
            (t.preventDefault(), e.onSave(a));
          },
          children: [
            (0, t.jsx)("h2", { children: "Wardrobe" }),
            (0, t.jsx)("p", {
              className: "muted small",
              children:
                "Small changes to your character’s own clothes. Everyone in the hall sees them.",
            }),
            (0, t.jsx)("label", { htmlFor: "look-top", children: "Outfit colour" }),
            (0, t.jsx)("select", {
              id: "look-top",
              value: a.top,
              onChange: (e) => l({ top: e.target.value }),
              children: Object.keys(r.S).map((e) =>
                (0, t.jsx)("option", { value: e, children: r.S[e] }, e),
              ),
            }),
            e.hasNeck &&
              (0, t.jsxs)("label", {
                className: "toggle",
                style: { marginTop: 10 },
                children: [
                  (0, t.jsx)("input", {
                    type: "checkbox",
                    checked: "on" === a.neck,
                    onChange: (e) => l({ neck: e.target.checked ? "on" : "off" }),
                  }),
                  "Neck ribbon / tie",
                ],
              }),
            (0, t.jsxs)("label", {
              className: "toggle",
              style: { marginTop: 10 },
              children: [
                (0, t.jsx)("input", {
                  type: "checkbox",
                  checked: "off" === a.shoes,
                  onChange: (e) => l({ shoes: e.target.checked ? "off" : "on" }),
                }),
                "Shoes and socks off",
              ],
            }),
            (0, t.jsxs)("div", {
              className: "actions",
              children: [
                (0, t.jsx)("button", {
                  type: "button",
                  className: "ghost",
                  onClick: e.onCancel,
                  children: "Cancel",
                }),
                (0, t.jsx)("button", { type: "submit", className: "sage", children: "Save" }),
              ],
            }),
          ],
        }),
      });
    }
    var f = e.i(8687);
    let k = [
        { id: "chatgpt", label: "ChatGPT" },
        { id: "google", label: "Google" },
        { id: "youtube", label: "YouTube" },
        { id: "book", label: "Book" },
        { id: "other", label: "Other" },
      ],
      b = "hh.deskNotes";
    function g(e) {
      return k.some((t) => t.id === e) ? e : null;
    }
    function y(e, t) {
      let s = e.trim().slice(0, 80);
      return s || (t.split(/\r?\n/).find((e) => e.trim()) ?? "").trim().slice(0, 80) || "Untitled";
    }
    function w() {
      if ("u" < typeof localStorage) return [];
      try {
        let e = JSON.parse(localStorage.getItem(b) ?? "[]");
        return (Array.isArray(e) ? e : [])
          .map((e) => ({ ...e, shareToken: e.shareToken ?? null }))
          .sort((e, t) => t.createdAt - e.createdAt);
      } catch {
        return [];
      }
    }
    function x(e) {
      localStorage.setItem(b, JSON.stringify(e.slice(0, 500)));
    }
    let j = (e) => ({
      id: e.id,
      title: e.title ?? "",
      source: g(e.source ?? ""),
      url: e.url,
      note: e.note ?? "",
      shareToken: e.share_token ?? null,
      createdAt: Date.parse(e.created_at),
      updatedAt: Date.parse(e.updated_at),
    });
    async function v() {
      if (!f.M) return w();
      let { data: e, error: t } = await (0, f.t)()
        .from("desk_notes")
        .select("id,title,source,url,note,share_token,created_at,updated_at")
        .order("created_at", { ascending: !1 })
        .limit(500);
      if (t || !e) {
        let e = await (0, f.t)()
          .from("desk_notes")
          .select("id,title,source,url,note,created_at,updated_at")
          .order("created_at", { ascending: !1 })
          .limit(500);
        return e.error || !e.data ? [] : e.data.map(j);
      }
      return e.map(j);
    }
    async function S(e, t) {
      let s = g(e.source),
        a = e.url.trim(),
        n = e.note.slice(0, 1e4),
        l = y(e.title, n);
      if (
        !(function (e) {
          let t = e.trim();
          if (!t) return !0;
          if (t.length > 500) return !1;
          try {
            let e = new URL(t);
            return "http:" === e.protocol || "https:" === e.protocol;
          } catch {
            return !1;
          }
        })(a)
      )
        return { ok: !1, reason: "Links must start with http:// or https://." };
      let i = a ? a.slice(0, 500) : null;
      if (!f.M) {
        let e = w();
        if (t)
          return (
            x(
              e.map((e) =>
                e.id === t
                  ? { ...e, title: l, source: s, url: i, note: n, updatedAt: Date.now() }
                  : e,
              ),
            ),
            { ok: !0, id: t }
          );
        let a = {
          id: `local-${Date.now()}`,
          title: l,
          source: s,
          url: i,
          note: n,
          shareToken: null,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        return (x([a, ...e]), { ok: !0, id: a.id });
      }
      let r = { title: l, source: s, url: i, note: n, updated_at: new Date().toISOString() };
      if (t) {
        let { error: e } = await (0, f.t)().from("desk_notes").update(r).eq("id", t);
        return e ? { ok: !1, reason: "Couldn’t save that note. Try again?" } : { ok: !0, id: t };
      }
      let { data: o } = await (0, f.t)().auth.getUser();
      if (!o.user) return { ok: !1, reason: "Sign in to save notes on your desk." };
      let { data: c, error: u } = await (0, f.t)()
        .from("desk_notes")
        .insert({ ...r, user_id: o.user.id })
        .select("id")
        .maybeSingle();
      return u || !c
        ? { ok: !1, reason: "Couldn’t save that note. Try again?" }
        : { ok: !0, id: c.id };
    }
    async function N(e) {
      if (!f.M) return (x(w().filter((t) => t.id !== e)), !0);
      let { error: t } = await (0, f.t)().from("desk_notes").delete().eq("id", e);
      return !t;
    }
    function C(e) {
      let t = window.location.origin;
      return `${t}/n/${encodeURIComponent(e)}`;
    }
    async function _(e) {
      if (!f.M)
        return { ok: !1, reason: "Sharing is available on the live app once you’re signed in." };
      let t = (function () {
          let e = new Uint8Array(24);
          crypto.getRandomValues(e);
          let t = "";
          for (let s of e) t += String.fromCharCode(s);
          return btoa(t).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
        })(),
        { error: s } = await (0, f.t)()
          .from("desk_notes")
          .update({ share_token: t, updated_at: new Date().toISOString() })
          .eq("id", e);
      return s ? { ok: !1, reason: "Couldn’t share that note. Try again?" } : { ok: !0, token: t };
    }
    async function M(e) {
      if (!f.M) return !0;
      let { error: t } = await (0, f.t)()
        .from("desk_notes")
        .update({ share_token: null, updated_at: new Date().toISOString() })
        .eq("id", e);
      return !t;
    }
    let T = () => ({ title: "", source: "", url: "", note: "" });
    function R(e) {
      let [a, n] = (0, s.useState)([]),
        [l, i] = (0, s.useState)("write"),
        [r, o] = (0, s.useState)(T),
        [c, u] = (0, s.useState)(null),
        [d, h] = (0, s.useState)(null),
        [m, p] = (0, s.useState)(!1),
        [b, g] = (0, s.useState)(""),
        [w, x] = (0, s.useState)(""),
        [j, R] = (0, s.useState)(!1),
        [E, $] = (0, s.useState)(!1),
        q = (0, s.useRef)(r),
        D = (0, s.useRef)(c),
        A = (0, s.useRef)(null),
        I = (0, s.useRef)(Promise.resolve());
      ((q.current = r), (D.current = c));
      let W = async () => {
        n(await v());
      };
      ((0, s.useEffect)(() => {
        W();
      }, []),
        (0, s.useEffect)(() => {
          A.current?.focus();
        }, [l, c]));
      let P = () => (
        (I.current = I.current.then(async () => {
          let e = q.current,
            t = D.current;
          if (!(e.title.trim() || e.note.trim() || e.source.trim() || e.url.trim()) && !t) return;
          x("Saving…");
          let s = await S(e, t ?? void 0);
          s.ok ? ((D.current = s.id), u(s.id), x("Saved"), await W()) : x(s.reason);
        })),
        I.current
      );
      (0, s.useEffect)(() => {
        if ("write" !== l) return;
        let e = window.setTimeout(() => {
          P();
        }, 700);
        return () => window.clearTimeout(e);
      }, [r, l]);
      let L = () => {
          (P(), u(null), (D.current = null), o(T()), h(null), p(!1), x(""), $(!1), i("write"));
        },
        O = async () => {
          (await P(), i("list"), $(!1), await W());
        },
        F = async () => {
          (await P(), e.onClose());
        },
        B = async () => {
          await P();
          let e = D.current;
          if (!e) return void x("Write a little first, then you can share.");
          if ((R(!0), d)) await U(C(d));
          else {
            let t = await _(e);
            if (!t.ok) {
              (R(!1), x(t.reason));
              return;
            }
            (h(t.token), await U(C(t.token)));
          }
          (R(!1), await W());
        },
        U = async (e) => {
          try {
            if ("function" == typeof navigator.share) {
              (await navigator.share({ title: "Desk note", url: e }), x("Link ready to share."));
              return;
            }
          } catch {}
          try {
            (await navigator.clipboard.writeText(e), x("Link copied."));
          } catch {
            x(e);
          }
        },
        H = async () => {
          let e = D.current;
          if (!e) return;
          R(!0);
          let t = await M(e);
          (R(!1), t)
            ? (h(null), x("That link no longer works."), await W())
            : x("Couldn’t stop sharing. Try again?");
        },
        Y = async () => {
          let e = D.current;
          if (!e) return void L();
          R(!0);
          let t = await N(e);
          (R(!1), t)
            ? ($(!1), L(), await W(), i("list"))
            : x("Couldn’t remove that note. Try again?");
        },
        z = b ? a.filter((e) => e.source === b) : a;
      return (0, t.jsx)("div", {
        className: "veil",
        role: "dialog",
        "aria-modal": "true",
        onClick: () => {
          F();
        },
        children: (0, t.jsx)("div", {
          className: "dialog notes",
          onClick: (e) => e.stopPropagation(),
          children:
            "write" === l
              ? (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsx)("h2", { children: c ? "Note" : "New note" }),
                    (0, t.jsx)("p", {
                      className: "muted small",
                      children: "Private to you, unless you share a link. It saves as you write.",
                    }),
                    (0, t.jsx)("textarea", {
                      ref: A,
                      id: "note-body",
                      className: "note-write",
                      maxLength: 1e4,
                      rows: 10,
                      placeholder: "Start writing…",
                      value: r.note,
                      onChange: (e) => o({ ...r, note: e.target.value }),
                    }),
                    (0, t.jsx)("button", {
                      type: "button",
                      className: "ghost small",
                      onClick: () => p((e) => !e),
                      style: { marginTop: 8 },
                      children: m ? "Hide details" : "Details (title, source, link)",
                    }),
                    m &&
                      (0, t.jsxs)("div", {
                        style: { marginTop: 8 },
                        children: [
                          (0, t.jsx)("label", {
                            htmlFor: "note-title",
                            children: "Title (optional — otherwise the first line is used)",
                          }),
                          (0, t.jsx)("input", {
                            id: "note-title",
                            type: "text",
                            maxLength: 80,
                            placeholder: "Leave blank to use the first line",
                            value: r.title,
                            onChange: (e) => o({ ...r, title: e.target.value }),
                          }),
                          (0, t.jsx)("label", {
                            htmlFor: "note-source",
                            children: "Source (optional)",
                          }),
                          (0, t.jsxs)("select", {
                            id: "note-source",
                            value: r.source,
                            onChange: (e) => o({ ...r, source: e.target.value }),
                            children: [
                              (0, t.jsx)("option", { value: "", children: "No source" }),
                              k.map((e) =>
                                (0, t.jsx)("option", { value: e.id, children: e.label }, e.id),
                              ),
                            ],
                          }),
                          (0, t.jsx)("label", { htmlFor: "note-url", children: "Link (optional)" }),
                          (0, t.jsx)("input", {
                            id: "note-url",
                            type: "text",
                            maxLength: 500,
                            placeholder: "https://",
                            value: r.url,
                            onChange: (e) => o({ ...r, url: e.target.value }),
                          }),
                        ],
                      }),
                    w && (0, t.jsx)("p", { className: "small muted", role: "status", children: w }),
                    (0, t.jsxs)("div", {
                      className: "row",
                      style: { gap: 6, marginTop: 10, flexWrap: "wrap" },
                      children: [
                        f.M &&
                          (d
                            ? (0, t.jsxs)(t.Fragment, {
                                children: [
                                  (0, t.jsx)("button", {
                                    type: "button",
                                    className: "ghost small",
                                    onClick: () => {
                                      B();
                                    },
                                    disabled: j,
                                    children: "Copy link",
                                  }),
                                  (0, t.jsx)("button", {
                                    type: "button",
                                    className: "ghost small",
                                    onClick: () => {
                                      H();
                                    },
                                    disabled: j,
                                    children: "Stop sharing",
                                  }),
                                ],
                              })
                            : (0, t.jsx)("button", {
                                type: "button",
                                className: "ghost small",
                                onClick: () => {
                                  B();
                                },
                                disabled: j,
                                children: "Share",
                              })),
                        c &&
                          (E
                            ? (0, t.jsxs)(t.Fragment, {
                                children: [
                                  (0, t.jsx)("button", {
                                    type: "button",
                                    className: "ghost small",
                                    onClick: () => {
                                      Y();
                                    },
                                    disabled: j,
                                    children: "Remove for good",
                                  }),
                                  (0, t.jsx)("button", {
                                    type: "button",
                                    className: "ghost small",
                                    onClick: () => $(!1),
                                    children: "Keep",
                                  }),
                                ],
                              })
                            : (0, t.jsx)("button", {
                                type: "button",
                                className: "ghost small",
                                onClick: () => $(!0),
                                children: "Remove",
                              })),
                      ],
                    }),
                    (0, t.jsxs)("div", {
                      className: "actions",
                      children: [
                        (0, t.jsxs)("button", {
                          type: "button",
                          className: "ghost",
                          onClick: () => {
                            O();
                          },
                          children: ["Your notes", a.length ? ` (${a.length})` : ""],
                        }),
                        (0, t.jsx)("button", {
                          type: "button",
                          className: "sage",
                          onClick: () => {
                            F();
                          },
                          children: "Done",
                        }),
                      ],
                    }),
                  ],
                })
              : (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsx)("h2", { children: "Desk notes" }),
                    (0, t.jsx)("p", {
                      className: "muted small",
                      children:
                        "Private to you. Other people at the desk still only see your nickname, avatar and topic.",
                    }),
                    (0, t.jsxs)("div", {
                      className: "row",
                      style: { gap: 8, marginTop: 8, flexWrap: "wrap" },
                      children: [
                        (0, t.jsx)("label", {
                          htmlFor: "note-filter",
                          className: "small muted",
                          style: { margin: 0 },
                          children: "Show",
                        }),
                        (0, t.jsxs)("select", {
                          id: "note-filter",
                          value: b,
                          onChange: (e) => g(e.target.value),
                          children: [
                            (0, t.jsx)("option", { value: "", children: "All sources" }),
                            k.map((e) =>
                              (0, t.jsx)("option", { value: e.id, children: e.label }, e.id),
                            ),
                          ],
                        }),
                        (0, t.jsx)("button", {
                          type: "button",
                          className: "sage small",
                          onClick: L,
                          style: { marginLeft: "auto" },
                          children: "New note",
                        }),
                      ],
                    }),
                    0 === z.length
                      ? (0, t.jsx)("p", {
                          className: "muted small",
                          style: { marginTop: 12 },
                          children:
                            0 === a.length
                              ? "No notes yet. Open a new note and just start writing."
                              : "No notes from that source.",
                        })
                      : (0, t.jsx)("ul", {
                          className: "note-list",
                          children: z.map((e) => {
                            let s;
                            return (0, t.jsx)(
                              "li",
                              {
                                className: "note-item",
                                children: (0, t.jsxs)("button", {
                                  type: "button",
                                  className: "note-open",
                                  onClick: () => {
                                    (P(),
                                      u(e.id),
                                      (D.current = e.id),
                                      o({
                                        title: e.title,
                                        source: e.source ?? "",
                                        url: e.url ?? "",
                                        note: e.note,
                                      }),
                                      h(e.shareToken),
                                      p(!1),
                                      x(""),
                                      $(!1),
                                      i("write"));
                                  },
                                  children: [
                                    (0, t.jsx)("div", {
                                      className: "note-item-title",
                                      children: y(e.title, e.note),
                                    }),
                                    (0, t.jsxs)("div", {
                                      className: "small muted",
                                      children: [
                                        e.source
                                          ? ((s = e.source), k.find((e) => e.id === s)?.label ?? "")
                                          : "No source",
                                        e.shareToken ? " · Shared" : "",
                                        e.url ? " · has a link" : "",
                                      ],
                                    }),
                                    e.note &&
                                      (0, t.jsx)("div", {
                                        className: "small",
                                        style: { marginTop: 4, whiteSpace: "pre-wrap" },
                                        children:
                                          e.note.length > 160 ? `${e.note.slice(0, 160)}…` : e.note,
                                      }),
                                  ],
                                }),
                              },
                              e.id,
                            );
                          }),
                        }),
                    (0, t.jsx)("div", {
                      className: "actions",
                      children: (0, t.jsx)("button", {
                        type: "button",
                        className: "ghost",
                        onClick: () => {
                          F();
                        },
                        children: "Close",
                      }),
                    }),
                  ],
                }),
        }),
      });
    }
    async function E() {
      if (!f.M)
        return "u" < typeof localStorage || "0" !== localStorage.getItem("hh.showWeeklyHours");
      let { data: e, error: t } = await (0, f.t)()
        .from("profiles")
        .select("show_weekly_hours")
        .maybeSingle();
      return !!t || !e || !1 !== e.show_weekly_hours;
    }
    async function $(e) {
      if (!f.M) return (localStorage.setItem("hh.showWeeklyHours", e ? "1" : "0"), !0);
      let { error: t } = await (0, f.t)().from("profiles").update({ show_weekly_hours: e });
      return !t;
    }
    function q(e) {
      let [n, l] = (0, s.useState)(0),
        [r, o] = (0, s.useState)(0),
        [c, u] = (0, s.useState)([]),
        [d, h] = (0, s.useState)(!0),
        [m, p] = (0, s.useState)(""),
        [f, k] = (0, s.useState)(!1);
      (0, s.useEffect)(() => {
        Promise.all([(0, i.k)(), E()]).then(([t, s]) => {
          let n = (0, a.w)(t, e.liveMinutes ?? 0);
          (l(n.today), o(n.week), u(n.days), h(s), k(!0));
        });
      }, [e.liveMinutes]);
      let b = async (e) => {
          (h(e),
            p(
              (await $(e))
                ? e
                  ? "Others can see this week’s hours on your desk."
                  : "This week’s hours are hidden from others."
                : "Couldn’t save that just now. Try again?",
            ));
        },
        g = Math.max(1, ...c.map((e) => e.minutes));
      return (0, t.jsx)("div", {
        className: "veil",
        role: "dialog",
        "aria-modal": "true",
        onClick: e.onClose,
        children: (0, t.jsxs)("div", {
          className: "dialog",
          onClick: (e) => e.stopPropagation(),
          children: [
            (0, t.jsx)("h2", { children: "Study hours" }),
            f
              ? (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsxs)("p", {
                      children: ["Today: ", (0, t.jsx)("b", { children: (0, a.L)(n) })],
                    }),
                    (0, t.jsxs)("p", {
                      children: [
                        "This week (Mon–Sun): ",
                        (0, t.jsx)("b", { children: (0, a.L)(r) }),
                      ],
                    }),
                    (0, t.jsx)("p", {
                      className: "muted small",
                      children:
                        "Hours you’ve logged at a desk. Nothing here resets, and a quiet day is just a quiet day.",
                    }),
                    (0, t.jsx)("div", {
                      className: "hour-bars",
                      "aria-label": "Last seven days",
                      children: c.map((e) =>
                        (0, t.jsxs)(
                          "div",
                          {
                            className: "hour-bar-col",
                            children: [
                              (0, t.jsx)("div", {
                                className: "hour-bar",
                                style: {
                                  height: `${Math.max(e.minutes > 0 ? 8 : 2, Math.round((e.minutes / g) * 80))}px`,
                                },
                                title: `${e.label}: ${(0, a.L)(e.minutes)}`,
                              }),
                              (0, t.jsx)("div", { className: "small muted", children: e.label }),
                            ],
                          },
                          e.label + e.minutes,
                        ),
                      ),
                    }),
                    (0, t.jsxs)("span", {
                      className: "toggle",
                      style: { marginTop: 12 },
                      children: [
                        (0, t.jsx)("input", {
                          type: "checkbox",
                          checked: d,
                          onChange: (e) => {
                            b(e.target.checked);
                          },
                        }),
                        "Show this week’s hours on my desk",
                      ],
                    }),
                    m && (0, t.jsx)("p", { className: "small muted", children: m }),
                  ],
                })
              : (0, t.jsx)("p", { className: "muted small", children: "Adding up your hours…" }),
            (0, t.jsx)("div", {
              className: "actions",
              children: (0, t.jsx)("button", {
                type: "button",
                className: "ghost",
                onClick: e.onClose,
                children: "Close",
              }),
            }),
          ],
        }),
      });
    }
    let D = a.X,
      A = "hh.timetable";
    function I(e) {
      let t = Math.floor(Math.max(0, e) / 60),
        s = Math.max(0, e) % 60;
      return `${String(t).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    }
    function W(e) {
      let t = /^(\d{1,2}):(\d{2})$/.exec(e.trim());
      if (!t) return null;
      let s = Number(t[1]),
        a = Number(t[2]);
      return s < 0 || s > 23 || a < 0 || a > 59 ? null : 60 * s + a;
    }
    function P() {
      if ("u" < typeof localStorage) return [];
      try {
        let e = JSON.parse(localStorage.getItem(A) ?? "[]");
        return Array.isArray(e) ? O(e) : [];
      } catch {
        return [];
      }
    }
    function L(e) {
      localStorage.setItem(A, JSON.stringify(e.slice(0, 80)));
    }
    function O(e) {
      return [...e].sort((e, t) => e.day - t.day || e.startMin - t.startMin);
    }
    let F = (e) => ({
      id: e.id,
      day: e.day,
      startMin: e.start_min,
      endMin: e.end_min,
      subject: e.subject,
    });
    async function B() {
      if (!f.M) return P();
      let { data: e, error: t } = await (0, f.t)()
        .from("timetable_slots")
        .select("id,day,start_min,end_min,subject")
        .order("day")
        .order("start_min")
        .limit(80);
      return t || !e ? [] : O(e.map(F));
    }
    async function U(e, t, s, a) {
      let n = a.trim().slice(0, 80);
      if (e < 0 || e > 6) return { ok: !1, reason: "Pick a day of the week." };
      if (t < 0 || t > 1439 || s < 1 || s > 1440 || s <= t)
        return { ok: !1, reason: "The end time needs to be after the start time." };
      if (!n) return { ok: !1, reason: "Add a short subject." };
      if (!f.M) {
        let a = { id: `local-${Date.now()}`, day: e, startMin: t, endMin: s, subject: n };
        return (L(O([...P(), a])), { ok: !0, id: a.id });
      }
      let { data: l } = await (0, f.t)().auth.getUser();
      if (!l.user) return { ok: !1, reason: "Sign in to save a timetable." };
      let { data: i, error: r } = await (0, f.t)()
        .from("timetable_slots")
        .insert({ user_id: l.user.id, day: e, start_min: t, end_min: s, subject: n })
        .select("id")
        .maybeSingle();
      return r || !i
        ? { ok: !1, reason: "Couldn’t save that slot. Try again?" }
        : { ok: !0, id: i.id };
    }
    async function H(e) {
      if (!f.M) return (L(P().filter((t) => t.id !== e)), !0);
      let { error: t } = await (0, f.t)().from("timetable_slots").delete().eq("id", e);
      return !t;
    }
    function Y(e) {
      let [a, n] = (0, s.useState)([]),
        [l, i] = (0, s.useState)(0),
        [r, o] = (0, s.useState)("09:00"),
        [c, u] = (0, s.useState)("11:00"),
        [d, h] = (0, s.useState)(""),
        [m, p] = (0, s.useState)(""),
        [f, k] = (0, s.useState)(!1),
        [b, g] = (0, s.useState)(!1),
        y = async () => {
          (n(await B()), g(!0));
        };
      (0, s.useEffect)(() => {
        y();
      }, []);
      let w = async () => {
          let e = W(r),
            t = W(c);
          if (null == e || null == t) return void p("Use a start and end time.");
          k(!0);
          let s = await U(l, e, t, d);
          (k(!1), s.ok) ? (h(""), p(""), await y()) : p(s.reason);
        },
        x = async (e) => {
          k(!0);
          let t = await H(e);
          (k(!1), t) ? await y() : p("Couldn’t remove that slot. Try again?");
        };
      return (0, t.jsx)("div", {
        className: "veil",
        role: "dialog",
        "aria-modal": "true",
        onClick: e.onClose,
        children: (0, t.jsxs)("div", {
          className: "dialog notes",
          onClick: (e) => e.stopPropagation(),
          children: [
            (0, t.jsx)("h2", { children: "Timetable" }),
            (0, t.jsx)("p", {
              className: "muted small",
              children: "Private to you. A simple weekly plan for your desk.",
            }),
            (0, t.jsxs)("div", {
              className: "grid2",
              style: { gap: 8 },
              children: [
                (0, t.jsxs)("div", {
                  children: [
                    (0, t.jsx)("label", { htmlFor: "tt-day", children: "Day" }),
                    (0, t.jsx)("select", {
                      id: "tt-day",
                      value: l,
                      onChange: (e) => i(Number(e.target.value)),
                      children: D.map((e, s) => (0, t.jsx)("option", { value: s, children: e }, e)),
                    }),
                  ],
                }),
                (0, t.jsxs)("div", {
                  children: [
                    (0, t.jsx)("label", { htmlFor: "tt-subject", children: "Subject" }),
                    (0, t.jsx)("input", {
                      id: "tt-subject",
                      type: "text",
                      maxLength: 80,
                      placeholder: "e.g. Molecular biology",
                      value: d,
                      onChange: (e) => h(e.target.value),
                    }),
                  ],
                }),
                (0, t.jsxs)("div", {
                  children: [
                    (0, t.jsx)("label", { htmlFor: "tt-start", children: "Start" }),
                    (0, t.jsx)("input", {
                      id: "tt-start",
                      type: "time",
                      value: r,
                      onChange: (e) => o(e.target.value),
                    }),
                  ],
                }),
                (0, t.jsxs)("div", {
                  children: [
                    (0, t.jsx)("label", { htmlFor: "tt-end", children: "End" }),
                    (0, t.jsx)("input", {
                      id: "tt-end",
                      type: "time",
                      value: c,
                      onChange: (e) => u(e.target.value),
                    }),
                  ],
                }),
              ],
            }),
            m && (0, t.jsx)("p", { className: "small muted", role: "alert", children: m }),
            (0, t.jsx)("div", {
              className: "actions",
              style: { marginTop: 8 },
              children: (0, t.jsx)("button", {
                type: "button",
                className: "sage small",
                onClick: () => {
                  w();
                },
                disabled: f || !d.trim(),
                children: "Add to plan",
              }),
            }),
            b
              ? 0 === a.length
                ? (0, t.jsx)("p", {
                    className: "muted small",
                    style: { marginTop: 12 },
                    children: "No slots yet. Add a day, a time and a subject.",
                  })
                : (0, t.jsx)("ul", {
                    className: "note-list",
                    children: D.map((e, s) => {
                      let n = a.filter((e) => e.day === s);
                      return 0 === n.length
                        ? null
                        : (0, t.jsxs)(
                            "li",
                            {
                              className: "note-item",
                              children: [
                                (0, t.jsx)("div", { className: "note-item-title", children: e }),
                                n.map((e) =>
                                  (0, t.jsxs)(
                                    "div",
                                    {
                                      className: "row",
                                      style: {
                                        gap: 8,
                                        marginTop: 6,
                                        justifyContent: "space-between",
                                      },
                                      children: [
                                        (0, t.jsxs)("span", {
                                          className: "small",
                                          children: [
                                            I(e.startMin),
                                            "–",
                                            I(e.endMin),
                                            " · ",
                                            e.subject,
                                          ],
                                        }),
                                        (0, t.jsx)("button", {
                                          type: "button",
                                          className: "ghost small",
                                          onClick: () => {
                                            x(e.id);
                                          },
                                          disabled: f,
                                          children: "Remove",
                                        }),
                                      ],
                                    },
                                    e.id,
                                  ),
                                ),
                              ],
                            },
                            e,
                          );
                    }),
                  })
              : (0, t.jsx)("p", { className: "muted small", children: "Opening your plan…" }),
            (0, t.jsx)("div", {
              className: "actions",
              children: (0, t.jsx)("button", {
                type: "button",
                className: "ghost",
                onClick: e.onClose,
                children: "Close",
              }),
            }),
          ],
        }),
      });
    }
    let z = "hh.spotifyUrl",
      G = new Set(["playlist", "album", "track", "episode", "show"]);
    function K() {
      return "u" < typeof localStorage ? "" : (localStorage.getItem(z) ?? "");
    }
    function Z(e) {
      if ("u" < typeof localStorage) return;
      let t = e.trim();
      t ? localStorage.setItem(z, t) : localStorage.removeItem(z);
    }
    function V(e) {
      let t = e.trim();
      if (!t) return null;
      let s = /^spotify:(playlist|album|track|episode|show):([A-Za-z0-9]+)$/.exec(t);
      if (s) return `https://open.spotify.com/embed/${s[1]}/${s[2]}`;
      try {
        let e = new URL(t);
        if ("http:" !== e.protocol && "https:" !== e.protocol) return null;
        let s = e.hostname.replace(/^www\./, "");
        if ("open.spotify.com" !== s && "play.spotify.com" !== s) return null;
        let a = e.pathname.split("/").filter(Boolean),
          n = a[0]?.startsWith("intl-"),
          l = n ? a[1] : a[0],
          i = (n ? a[2] : a[1])?.split("?")[0] ?? "";
        if (!l || !G.has(l) || !/^[A-Za-z0-9]+$/.test(i)) return null;
        return `https://open.spotify.com/embed/${l}/${i}`;
      } catch {
        return null;
      }
    }
    function X() {
      let [e, a] = (0, s.useState)(!1),
        [n, l] = (0, s.useState)(K),
        [i, r] = (0, s.useState)(K),
        o = (0, s.useMemo)(() => V(n), [n]);
      return (0, t.jsxs)("div", {
        className: "spotify-desk",
        children: [
          (0, t.jsx)("button", {
            type: "button",
            className: "ghost small",
            onClick: () => a((e) => !e),
            "aria-expanded": e,
            children: e ? "Hide music" : n ? "Music" : "Add music",
          }),
          e &&
            (0, t.jsxs)("div", {
              className: "spotify-body",
              children: [
                (0, t.jsx)("label", {
                  htmlFor: "spotify-url",
                  className: "small muted",
                  children: "Spotify playlist, album or track link",
                }),
                (0, t.jsxs)("div", {
                  className: "row",
                  style: { gap: 6, flexWrap: "wrap" },
                  children: [
                    (0, t.jsx)("input", {
                      id: "spotify-url",
                      type: "url",
                      placeholder: "https://open.spotify.com/playlist/…",
                      value: i,
                      onChange: (e) => r(e.target.value),
                      style: { flex: 1, minWidth: 160 },
                    }),
                    (0, t.jsx)("button", {
                      type: "button",
                      className: "sage small",
                      onClick: () => {
                        let e = i.trim();
                        (l(e), Z(e), e && a(!0));
                      },
                      children: "Use link",
                    }),
                    n &&
                      (0, t.jsx)("button", {
                        type: "button",
                        className: "ghost small",
                        onClick: () => {
                          (r(""), l(""), Z(""));
                        },
                        children: "Clear",
                      }),
                  ],
                }),
                i &&
                  !V(i) &&
                  (0, t.jsx)("p", {
                    className: "small muted",
                    children: "Use a link from open.spotify.com (playlist, album or track).",
                  }),
                o &&
                  (0, t.jsx)("iframe", {
                    title: "Spotify player",
                    src: o,
                    width: "100%",
                    height: "80",
                    allow:
                      "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",
                    loading: "lazy",
                    style: { border: 0, borderRadius: 8, marginTop: 8, display: "block" },
                  }),
              ],
            }),
        ],
      });
    }
    var J = e.i(39455),
      Q = e.i(67218);
    class ee {
      channel = null;
      hallId = "";
      me = null;
      others = new Map();
      blocked = new Set();
      memberCbs = new Set();
      requestCbs = new Set();
      responseCbs = new Set();
      timer = null;
      sent = [];
      lastWalk = null;
      join(e, t) {
        (this.leave(),
          (this.hallId = e),
          (this.me = { ...t, lastSeen: Date.now() }),
          (this.channel = new BroadcastChannel(`hush-hall:${e}`)),
          (this.channel.onmessage = (e) => this.handle(e.data)),
          this.post({ kind: "hello", member: this.me }),
          (this.timer = setInterval(() => this.tick(), 3e3)));
      }
      update(e) {
        ((this.me = { ...e, lastSeen: Date.now() }), this.post({ kind: "state", member: this.me }));
      }
      walk(e) {
        ((this.lastWalk = e), this.me && this.post({ kind: "walk", id: this.me.id, w: e }));
      }
      leave() {
        ((this.lastWalk = null),
          this.me && this.channel && this.post({ kind: "leave", id: this.me.id }),
          this.timer && clearInterval(this.timer),
          (this.timer = null),
          this.channel?.close(),
          (this.channel = null),
          this.others.forEach((e, t) => (0, Q.Z)(t, null)),
          this.others.clear(),
          this.emitMembers());
      }
      onMembers(e) {
        return (this.memberCbs.add(e), e(this.list()), () => this.memberCbs.delete(e));
      }
      async sendRequest(e, t) {
        if (!this.me) return { ok: !1, reason: "error" };
        let s = this.others.get(e);
        if (!s || s.hideFromRequests || this.blocked.has(e))
          return { ok: !1, reason: "unavailable" };
        let a = Date.now();
        if (
          ((this.sent = this.sent.filter((e) => a - e.at < 6e5)),
          this.sent.length >= 3 || this.sent.some((t) => t.toId === e && a - t.at < 6e5))
        )
          return { ok: !1, reason: "rate_limited" };
        this.sent.push({ toId: e, at: a });
        let n = {
          id: Math.random().toString(36).slice(2, 10),
          hallId: this.hallId,
          from: { id: this.me.id, name: this.me.name, avatar: this.me.avatar, seat: this.me.seat },
          toId: e,
          note: t.slice(0, 80),
          sentAt: Date.now(),
        };
        return (this.post({ kind: "request", req: n }), { ok: !0, req: n });
      }
      async respond(e, t) {
        if (!this.me) return null;
        let s = {
          requestId: e.id,
          fromId: this.me.id,
          toId: e.from.id,
          accepted: t,
          roomName: t ? `${e.from.name} & ${this.me.name}` : void 0,
        };
        return (this.post({ kind: "response", res: s }), s);
      }
      onRequest(e) {
        return (this.requestCbs.add(e), () => this.requestCbs.delete(e));
      }
      onResponse(e) {
        return (this.responseCbs.add(e), () => this.responseCbs.delete(e));
      }
      async block(e) {
        (this.blocked.add(e), (0, Q.Z)(e, null), this.emitMembers());
      }
      handle(e) {
        if (this.me) {
          if ("hello" === e.kind || "state" === e.kind) {
            if (e.member.id === this.me.id) return;
            (this.others.set(e.member.id, { ...e.member, lastSeen: Date.now() }),
              "hello" === e.kind &&
                (this.post({ kind: "state", member: this.me }),
                this.lastWalk && this.post({ kind: "walk", id: this.me.id, w: this.lastWalk })),
              e.member.walking || (0, Q.Z)(e.member.id, null),
              this.emitMembers());
          } else if ("walk" === e.kind) {
            if (e.id === this.me.id || this.blocked.has(e.id)) return;
            (0, Q.Z)(e.id, (0, Q.T)(e.w));
          } else if ("leave" === e.kind)
            ((0, Q.Z)(e.id, null), this.others.delete(e.id), this.emitMembers());
          else if ("request" === e.kind) {
            if (
              e.req.toId !== this.me.id ||
              this.me.hideFromRequests ||
              this.blocked.has(e.req.from.id)
            )
              return;
            this.requestCbs.forEach((t) => t(e.req));
          } else if ("response" === e.kind) {
            if (e.res.toId !== this.me.id) return;
            this.responseCbs.forEach((t) => t(e.res));
          }
        }
      }
      tick() {
        if (!this.me) return;
        (this.update(this.me),
          this.lastWalk && this.post({ kind: "walk", id: this.me.id, w: this.lastWalk }));
        let e = Date.now(),
          t = !1;
        (this.others.forEach((s, a) => {
          e - s.lastSeen > 1e4 && (this.others.delete(a), (0, Q.Z)(a, null), (t = !0));
        }),
          t && this.emitMembers());
      }
      list() {
        return [...this.others.values()].filter((e) => !this.blocked.has(e.id));
      }
      emitMembers() {
        let e = this.list();
        this.memberCbs.forEach((t) => t(e));
      }
      post(e) {
        try {
          this.channel?.postMessage(e);
        } catch {}
      }
    }
    class et {
      hall = "";
      me = null;
      chan = null;
      inbox = null;
      members = [];
      profiles = new Map();
      blocked = new Set();
      memberCbs = new Set();
      requestCbs = new Set();
      responseCbs = new Set();
      timer = null;
      pending = null;
      seenRequests = new Set();
      myWalk = null;
      live = !1;
      lastRead = 0;
      presWalk = new Map();
      dbWalk = new Map();
      legacyWalk = !1;
      shown = new Map();
      walkSig = "";
      lastWalkPoll = 0;
      walkBusy = !1;
      walkOffUntil = 0;
      wNext = null;
      wBusy = !1;
      stored = !1;
      lastSave = 0;
      lastSig = "";
      join(e, t) {
        (this.leave(), (this.hall = e), (this.me = t));
        let s = (0, f.t)();
        (s
          .from("blocks")
          .select("blocked_id")
          .then(({ data: e }) => {
            ((e ?? []).forEach((e) => this.blocked.add(e.blocked_id)), this.schedule());
          }),
          (this.chan = s.channel(`hall:${e}`, {
            config: { private: !0, presence: { key: t.id } },
          })),
          this.chan.on("presence", { event: "sync" }, () => this.synced()));
        let a = this.chan;
        (s.auth
          .getSession()
          .then(({ data: e }) => (e.session ? s.realtime.setAuth(e.session.access_token) : void 0))
          .catch(() => void 0)
          .then(() => {
            this.chan === a &&
              a.subscribe((e, t) => {
                if (((this.live = "SUBSCRIBED" === e), !this.live && this.presWalk.size)) {
                  let e = [...this.presWalk.keys()];
                  (this.presWalk.clear(), e.forEach((e) => this.publish(e)));
                }
                if ("SUBSCRIBED" === e) {
                  (this.track(), this.schedule());
                  return;
                }
                ("CHANNEL_ERROR" === e || "TIMED_OUT" === e) &&
                  (console.warn(
                    "Hush Hall: live hall channel not connected (desks still update from the database)",
                    e,
                    t?.message ?? "",
                  ),
                  s.realtime.setAuth().catch(() => {}));
              });
          }),
          (this.inbox = s
            .channel(`inbox:${t.id}`)
            .on(
              "postgres_changes",
              {
                event: "INSERT",
                schema: "public",
                table: "join_requests",
                filter: `to_id=eq.${t.id}`,
              },
              (e) => this.gotRequest(e.new),
            )
            .on(
              "postgres_changes",
              {
                event: "UPDATE",
                schema: "public",
                table: "join_requests",
                filter: `from_id=eq.${t.id}`,
              },
              (e) => this.gotAnswer(e.new),
            )
            .subscribe()),
          s
            .from("join_requests")
            .select("id,from_id,to_id,hall_id,note,status,room_id,created_at")
            .eq("to_id", t.id)
            .eq("status", "pending")
            .gte("created_at", new Date(Date.now() - 18e5).toISOString())
            .then(({ data: e }) => (e ?? []).forEach((e) => this.gotRequest(e))),
          (this.timer = setInterval(() => this.tick(), 250)));
      }
      update(e) {
        e.seat && this.stored && this.save(null);
        let t =
          !this.me ||
          this.me.phase !== e.phase ||
          this.me.phaseEndsAt !== e.phaseEndsAt ||
          this.me.seat !== e.seat ||
          !!this.me.walking != !!e.walking;
        ((this.me = e), t && (this.track(), this.schedule()));
      }
      walk(e) {
        ((this.myWalk = e), this.track(), this.save(e));
      }
      leave() {
        (this.stored &&
          ((this.stored = !1),
          (0, f.t)()
            .rpc("walk_clear")
            .then(
              () => {},
              () => {},
            )),
          (this.myWalk = null),
          (this.lastSig = ""),
          (this.live = !1),
          (this.walkSig = ""),
          (this.wNext = null),
          this.members.forEach((e) => (0, Q.Z)(e.id, null)),
          this.shown.forEach((e, t) => (0, Q.Z)(t, null)),
          this.presWalk.clear(),
          this.dbWalk.clear(),
          this.shown.clear());
        let e = this.chan || this.inbox ? (0, f.t)() : null;
        (this.chan && (this.chan.untrack().catch(() => {}), e.removeChannel(this.chan)),
          this.inbox && e.removeChannel(this.inbox),
          (this.chan = null),
          (this.inbox = null),
          this.timer && clearInterval(this.timer),
          this.pending && clearTimeout(this.pending),
          (this.timer = null),
          (this.pending = null),
          (this.members = []),
          this.emit());
      }
      onMembers(e) {
        return (this.memberCbs.add(e), e(this.members), () => this.memberCbs.delete(e));
      }
      async sendRequest(e, t) {
        if (!this.me) return { ok: !1, reason: "error" };
        let { data: s, error: a } = await (0, f.t)().rpc("send_join_request", {
          p_to: e,
          p_hall: this.hall,
          p_note: t.slice(0, 80),
        });
        if (a) {
          let e = (0, f.y)(a);
          return {
            ok: !1,
            reason:
              "rate_limited" === e ? "rate_limited" : "unavailable" === e ? "unavailable" : "error",
          };
        }
        return {
          ok: !0,
          req: {
            id: s,
            hallId: this.hall,
            from: {
              id: this.me.id,
              name: this.me.name,
              avatar: this.me.avatar,
              seat: this.me.seat,
            },
            toId: e,
            note: t,
            sentAt: Date.now(),
          },
        };
      }
      async respond(e, t) {
        let { data: s, error: a } = await (0, f.t)().rpc("respond_join_request", {
          p_id: e.id,
          p_accept: t,
        });
        return a
          ? null
          : {
              requestId: e.id,
              fromId: this.me?.id ?? "",
              toId: e.from.id,
              accepted: t,
              roomId: s ?? void 0,
            };
      }
      onRequest(e) {
        return (this.requestCbs.add(e), () => this.requestCbs.delete(e));
      }
      onResponse(e) {
        return (this.responseCbs.add(e), () => this.responseCbs.delete(e));
      }
      async block(e) {
        (this.blocked.add(e),
          this.presWalk.delete(e),
          this.dbWalk.delete(e),
          this.publish(e),
          (this.members = this.members.filter((t) => t.id !== e)),
          this.emit(),
          await (0, f.t)().rpc("block_user", { p_user: e }));
      }
      track() {
        if (!this.chan || !this.me) return;
        let e =
            this.me.seat || !this.myWalk
              ? null
              : { x: this.myWalk.x, z: this.myWalk.z, ry: this.myWalk.ry, pose: this.myWalk.pose },
          t = {
            phase: this.me.phase,
            phaseEndsAt: this.me.phaseEndsAt,
            seated: !!this.me.seat,
            walk: e,
          };
        this.chan.track(t).catch(() => {});
      }
      synced() {
        if (!this.chan || !this.me) return;
        let e = this.chan.presenceState(),
          t = [];
        for (let s of Object.keys(e).sort()) {
          if (s === this.me.id) continue;
          let a = e[s][e[s].length - 1],
            n = this.blocked.has(s) ? null : (0, Q.T)(a?.walk);
          (n ? this.presWalk.set(s, n) : this.presWalk.delete(s),
            this.publish(s),
            t.push(
              `${s}:${a?.phase}:${a?.phaseEndsAt}:${+!!a?.seated}:${n ? ("floor" === n.pose ? 2 : 1) : 0}`,
            ));
        }
        let s = t.join("|");
        s !== this.lastSig && ((this.lastSig = s), this.schedule());
      }
      schedule() {
        this.pending ||
          (this.pending = setTimeout(() => {
            ((this.pending = null), this.refresh().catch(() => {}));
          }, 300));
      }
      async refresh() {
        if (!this.chan || !this.me) return;
        let e = (0, f.t)(),
          t = this.chan.presenceState(),
          s = Object.keys(t).filter((e) => e !== this.me.id && !this.blocked.has(e));
        this.lastRead = Date.now();
        let { data: a } = await e.rpc("hall_desks", { p_hall: this.hall }),
          n = new Map((a ?? []).map((e) => [e.user_id, e])),
          l = [
            ...new Set([
              ...s,
              ...[...n.keys(), ...this.dbWalk.keys()].filter(
                (e) => e !== this.me.id && !this.blocked.has(e),
              ),
            ]),
          ],
          i = Date.now(),
          r = l.filter((e) => {
            let t = this.profiles.get(e);
            return !t || i - t.at > 2e4;
          });
        if (r.length) {
          let { data: t } = await e.rpc("public_profiles", { ids: r });
          (t ?? []).forEach((e) => this.profiles.set(e.id, { p: e, at: i }));
        }
        let o = new Map();
        if (l.length) {
          let { data: t, error: s } = await e.rpc("public_weekly_hours", { ids: l });
          s ||
            (t ?? []).forEach((e) => {
              e.minutes > 0 && o.set(e.user_id, e.minutes);
            });
        }
        ((this.members = l.flatMap((e) => {
          let s = this.profiles.get(e)?.p;
          if (!s) return [];
          let a = t[e] ?? [],
            l = a[a.length - 1],
            r = n.get(e),
            c = !r && (this.presWalk.get(e) ?? this.dbWalk.get(e)?.w)?.pose === "floor";
          return [
            {
              id: e,
              name: s.nickname,
              avatar: s.avatar,
              color: s.color,
              seat: r?.seat ?? null,
              topic: s.show_topic ? (r?.topic ?? (c ? (this.dbWalk.get(e)?.topic ?? "") : "")) : "",
              floor: c,
              look: s.look ?? "",
              phase: r ? (l?.phase ?? "idle") : "idle",
              phaseEndsAt: r ? (l?.phaseEndsAt ?? null) : null,
              hideFromRequests: !s.takes_requests,
              lastSeen: i,
              walking: !r && (this.presWalk.has(e) || this.dbWalk.has(e)),
              weekMinutes: o.get(e),
            },
          ];
        })),
          this.emit());
      }
      tick() {
        let e = Date.now();
        e - this.lastRead >= (this.live ? 2e4 : 6e3) && this.schedule();
        let t = this.dbWalk.size > 0 || !!this.myWalk,
          s = "u" > typeof document && document.hidden;
        (e - this.lastWalkPoll >= (s ? 5e3 : t ? 1e3 : 3e3) && this.pollWalkers(),
          this.myWalk &&
            this.me &&
            !this.me.seat &&
            e - this.lastSave >= 5e3 &&
            this.save(this.myWalk));
      }
      save(e) {
        !this.me ||
          !this.hall ||
          (e && this.me.seat && (e = null),
          (e || this.stored || this.wBusy) &&
            ((this.wNext = { s: e }),
            (this.lastSave = Date.now()),
            this.wBusy || this.flushSaves()));
      }
      async flushSaves() {
        this.wBusy = !0;
        try {
          for (; this.wNext;) {
            let { s: e } = this.wNext;
            if (((this.wNext = null), e && Date.now() < this.walkOffUntil)) continue;
            let t = (0, f.t)(),
              s = () =>
                t.rpc("walk_update", {
                  p_hall: this.hall,
                  p_x: e.x,
                  p_z: e.z,
                  p_ry: e.ry,
                  p_pose: e.pose,
                  p_topic: "floor" === e.pose ? (e.topic ?? "") : null,
                }),
              a = () =>
                t.rpc("walk_update", {
                  p_hall: this.hall,
                  p_x: e.x,
                  p_z: e.z,
                  p_ry: e.ry,
                  p_pose: "walking" === e.pose ? "walking" : "idle",
                }),
              { error: n } = e ? await (this.legacyWalk ? a() : s()) : await t.rpc("walk_clear");
            if (
              (e &&
                n &&
                es(n) &&
                !this.legacyWalk &&
                ((this.legacyWalk = !0), ({ error: n } = await a())),
              n)
            ) {
              es(n) && (this.walkOffUntil = Date.now() + 6e4);
              continue;
            }
            this.stored = !!e;
          }
        } finally {
          this.wBusy = !1;
        }
      }
      async pollWalkers() {
        if (!this.me || this.walkBusy || Date.now() < this.walkOffUntil) return;
        ((this.walkBusy = !0), (this.lastWalkPoll = Date.now()));
        let e = this.hall;
        try {
          let { data: t, error: s } = await (0, f.t)().rpc("hall_walkers", { p_hall: e });
          if (e !== this.hall || !this.me) return;
          if (s) {
            es(s) && (this.walkOffUntil = Date.now() + 6e4);
            return;
          }
          let a = new Set();
          for (let e of t ?? []) {
            if (e.user_id === this.me.id || this.blocked.has(e.user_id)) continue;
            let t = (0, Q.T)({ x: e.x, z: e.z, ry: e.ry, pose: e.pose });
            t &&
              (a.add(e.user_id),
              this.dbWalk.set(e.user_id, {
                w: t,
                stamp: Number(e.stamp),
                age: Math.max(0, e.age_ms),
                topic: "string" == typeof e.topic ? e.topic : "",
              }),
              this.publish(e.user_id));
          }
          for (let e of [...this.dbWalk.keys()])
            a.has(e) || (this.dbWalk.delete(e), this.publish(e));
          let n = [...a]
            .sort()
            .map((e) => {
              let t = this.dbWalk.get(e);
              return "floor" === t.w.pose ? `${e}:floor:${t.topic}` : e;
            })
            .join(",");
          n !== this.walkSig && ((this.walkSig = n), this.schedule());
        } catch {
        } finally {
          this.walkBusy = !1;
        }
      }
      publish(e) {
        let t = this.blocked.has(e) ? void 0 : this.presWalk.get(e),
          s = this.blocked.has(e) ? void 0 : this.dbWalk.get(e),
          a = t ? `p:${t.x}:${t.z}:${t.ry}:${t.pose}` : s ? `d:${s.stamp}` : "";
        (this.shown.get(e) ?? "") !== a &&
          (a ? this.shown.set(e, a) : this.shown.delete(e),
          (0, Q.Z)(e, t ?? s?.w ?? null, t ? 0 : (s?.age ?? 0)));
      }
      emit() {
        this.memberCbs.forEach((e) => e(this.members));
      }
      async gotRequest(e) {
        if ("pending" !== e.status || this.seenRequests.has(e.id) || this.blocked.has(e.from_id))
          return;
        this.seenRequests.add(e.id);
        let t = this.profiles.get(e.from_id)?.p;
        if (!t) {
          let { data: s } = await (0, f.t)().rpc("public_profiles", { ids: [e.from_id] });
          (t = s?.[0]) && this.profiles.set(t.id, { p: t, at: Date.now() });
        }
        if (!t) return;
        let s = this.members.find((t) => t.id === e.from_id)?.seat ?? null,
          a = {
            id: e.id,
            hallId: e.hall_id,
            from: { id: e.from_id, name: t.nickname, avatar: t.avatar, seat: s },
            toId: e.to_id,
            note: e.note,
            sentAt: Date.parse(e.created_at),
          };
        this.requestCbs.forEach((e) => e(a));
      }
      gotAnswer(e) {
        if ("accepted" !== e.status && "declined" !== e.status) return;
        let t = {
          requestId: e.id,
          fromId: e.to_id,
          toId: e.from_id,
          accepted: "accepted" === e.status,
          roomId: e.room_id ?? void 0,
        };
        this.responseCbs.forEach((e) => e(t));
      }
    }
    function es(e) {
      return (
        "PGRST202" === e.code ||
        "42883" === e.code ||
        /could not find the function/i.test(e.message ?? "")
      );
    }
    let ea = null;
    var en = e.i(51125),
      el = e.i(61064);
    async function ei(e) {
      if (!f.M) return null;
      let t = (0, f.t)(),
        { data: s } = await t
          .from("room_members")
          .select("room_id")
          .eq("user_id", e)
          .is("left_at", null)
          .limit(1)
          .maybeSingle(),
        a = s?.room_id;
      if (!a) return null;
      let [{ data: n }, { data: l }] = await Promise.all([
        t.from("rooms").select("id,name,owner_id").eq("id", a).maybeSingle(),
        t.from("room_members").select("user_id").eq("room_id", a).is("left_at", null),
      ]);
      if (!n) return null;
      let i = (l ?? []).map((e) => e.user_id),
        { data: r } = await t.rpc("public_profiles", { ids: i }),
        o = (r ?? []).map((t) => ({
          id: t.id,
          name: t.nickname,
          avatar: t.avatar,
          isOwner: t.id === n.owner_id,
          isMe: t.id === e,
        }));
      return { id: n.id, name: n.name, ownerId: n.owner_id, members: o };
    }
    async function er(e) {
      f.M && (await (0, f.t)().rpc("leave_room", { p_room: e }));
    }
    async function eo(e, t) {
      return (await (0, f.G)("/api/rooms/remove", { roomId: e, userId: t })).ok;
    }
    function ec({ roomId: a, names: n }) {
      let [l, i] = (0, s.useState)("off"),
        [r, o] = (0, s.useState)(!1),
        [c, u] = (0, s.useState)(!1),
        [d, h] = (0, s.useState)([]),
        [m, p] = (0, s.useState)([]),
        k = (0, s.useRef)(null),
        b = (0, s.useRef)([]),
        g = async () => {
          i("connecting");
          let t = await (0, f.G)("/api/livekit/token", { roomId: a });
          if (!t.ok || !t.data.token || !t.data.url)
            return void i("voice_not_configured" === t.data.reason ? "unavailable" : "error");
          let { Room: s, RoomEvent: n } = await e.A(46505),
            l = new s({ adaptiveStream: !0, dynacast: !0 }),
            r = () => p([...l.remoteParticipants.values()].map((e) => e.identity));
          (l.on(n.TrackSubscribed, (e) => {
            if ("audio" === e.kind) {
              let t = e.attach();
              ((t.style.display = "none"), document.body.appendChild(t), b.current.push(t));
            }
          }),
            l.on(n.TrackUnsubscribed, (e) => {
              e.detach().forEach((e) => {
                (e.remove(), (b.current = b.current.filter((t) => t !== e)));
              });
            }),
            l.on(n.ParticipantConnected, r).on(n.ParticipantDisconnected, r),
            l.on(n.ActiveSpeakersChanged, (e) => h(e.map((e) => e.identity))),
            l.on(n.Disconnected, () => {
              (w(), i("off"));
            }));
          try {
            (await l.connect(t.data.url, t.data.token, { autoSubscribe: !0 }),
              await l.startAudio(),
              (k.current = l),
              r(),
              i("live"));
          } catch {
            i("error");
          }
        },
        y = async (e) => {
          let t = k.current;
          if (t)
            try {
              (await t.localParticipant.setMicrophoneEnabled(e), o(e));
            } catch {
              o(!1);
            }
        },
        w = () => {
          (b.current.forEach((e) => e.remove()), (b.current = []), o(!1), u(!1), h([]), p([]));
        },
        x = async () => {
          (await k.current?.disconnect(), (k.current = null), w(), i("off"));
        };
      return ((0, s.useEffect)(() => {
        if ("live" !== l || c) return;
        let e = (e) =>
            e.target instanceof HTMLInputElement ||
            e.target instanceof HTMLTextAreaElement ||
            e.target instanceof HTMLSelectElement,
          t = (t) => {
            "Space" !== t.code || t.repeat || e(t) || (t.preventDefault(), y(!0));
          },
          s = (t) => {
            "Space" !== t.code || e(t) || (t.preventDefault(), y(!1));
          };
        return (
          window.addEventListener("keydown", t),
          window.addEventListener("keyup", s),
          () => {
            (window.removeEventListener("keydown", t), window.removeEventListener("keyup", s));
          }
        );
      }, [l, c]),
      (0, s.useEffect)(
        () => () => {
          (k.current?.disconnect(), (k.current = null), b.current.forEach((e) => e.remove()));
        },
        [a],
      ),
      "unavailable" === l)
        ? (0, t.jsx)("p", {
            className: "small muted",
            children:
              "Voice isn’t switched on for Hush Hall yet. The room still works: you can see each other here and study together at your desks.",
          })
        : "off" === l || "error" === l
          ? (0, t.jsxs)("div", {
              className: "row",
              style: { gap: 8, marginTop: 6 },
              children: [
                (0, t.jsx)("button", {
                  className: "sage small",
                  onClick: () => i("consent"),
                  children: "Join voice",
                }),
                "error" === l &&
                  (0, t.jsx)("span", {
                    className: "small muted",
                    children: "Couldn’t connect to voice. Try again in a moment.",
                  }),
              ],
            })
          : "consent" === l
            ? (0, t.jsxs)("div", {
                className: "voice-consent",
                children: [
                  (0, t.jsxs)("p", {
                    children: [
                      (0, t.jsx)("b", { children: "Before you join voice:" }),
                      " your voice is heard live by the people in this room. It is never recorded.",
                    ],
                  }),
                  (0, t.jsx)("p", {
                    className: "small muted",
                    children:
                      "You join muted. Hold the Talk button (or the space bar) to speak. Your browser will ask for the microphone the first time you talk.",
                  }),
                  (0, t.jsxs)("div", {
                    className: "row",
                    style: { gap: 8 },
                    children: [
                      (0, t.jsx)("button", {
                        className: "ghost small",
                        onClick: () => i("off"),
                        children: "Not now",
                      }),
                      (0, t.jsx)("button", {
                        className: "sage small",
                        onClick: g,
                        children: "I understand, join muted",
                      }),
                    ],
                  }),
                ],
              })
            : "connecting" === l
              ? (0, t.jsx)("p", { className: "small muted", children: "Connecting to voice…" })
              : (0, t.jsxs)("div", {
                  className: "voice-live",
                  children: [
                    (0, t.jsxs)("div", {
                      className: "small",
                      children: [
                        "On voice: ",
                        0 === m.length
                          ? (0, t.jsx)("span", { className: "muted", children: "just you so far" })
                          : m.map((e) =>
                              (0, t.jsxs)(
                                "span",
                                {
                                  className: d.includes(e) ? "speaking" : "",
                                  children: [n[e] ?? "Someone", " "],
                                },
                                e,
                              ),
                            ),
                      ],
                    }),
                    (0, t.jsxs)("div", {
                      className: "row",
                      style: { gap: 8, marginTop: 6 },
                      children: [
                        c
                          ? (0, t.jsx)("button", {
                              className: "ghost small",
                              onClick: () => {
                                (u(!1), y(!1));
                              },
                              children: "Mute (back to push-to-talk)",
                            })
                          : (0, t.jsx)("button", {
                              className: `small ${r ? "sage" : "ghost"}`,
                              onPointerDown: () => y(!0),
                              onPointerUp: () => y(!1),
                              onPointerLeave: () => r && y(!1),
                              "aria-pressed": r,
                              children: r ? "Talking…" : "Hold to talk",
                            }),
                        !c &&
                          (0, t.jsx)("button", {
                            className: "ghost small",
                            onClick: () => {
                              window.confirm(
                                "Open mic: everyone in this room hears you until you mute. Never recorded. Turn it on?",
                              ) && (u(!0), y(!0));
                            },
                            children: "Open mic",
                          }),
                        (0, t.jsx)("button", {
                          className: "ghost small",
                          onClick: x,
                          children: "Leave voice",
                        }),
                      ],
                    }),
                  ],
                });
    }
    function eu(e) {
      let { room: a, myId: n, onChange: l, say: i } = e,
        r = a.ownerId === n;
      (0, s.useEffect)(
        () =>
          (function (e, t) {
            if (!f.M) return () => {};
            let s = (0, f.t)(),
              a = s
                .channel(`room-members:${e}`)
                .on(
                  "postgres_changes",
                  {
                    event: "*",
                    schema: "public",
                    table: "room_members",
                    filter: `room_id=eq.${e}`,
                  },
                  () => t(),
                )
                .subscribe();
            return () => {
              s.removeChannel(a);
            };
          })(a.id, async () => {
            let e = await ei(n);
            ((e && e.id === a.id) || i("You’re no longer in that study room."), l(e));
          }),
        [a.id, n, l, i],
      );
      let o = async () => {
          (await er(a.id), l(null), i("You left the study room. Your desk is still yours."));
        },
        c = async (e) => {
          window.confirm(`Remove ${e.name} from this room? They won’t be able to rejoin it.`) &&
            i(
              (await eo(a.id, e.id))
                ? `${e.name} was removed from the room.`
                : "Couldn’t remove them just now.",
            );
        };
      return (0, t.jsxs)("div", {
        className: "room-banner",
        children: [
          (0, t.jsxs)("div", {
            className: "row",
            style: { justifyContent: "space-between" },
            children: [
              (0, t.jsxs)("div", {
                children: [
                  (0, t.jsx)("b", { children: "Study room:" }),
                  " ",
                  a.name,
                  " ",
                  (0, t.jsxs)("span", {
                    className: "muted small",
                    children: ["· ", a.members.length, " of 4"],
                  }),
                ],
              }),
              (0, t.jsx)("button", {
                className: "ghost small",
                onClick: o,
                children: "Leave room",
              }),
            ],
          }),
          (0, t.jsx)("ul", {
            className: "room-members",
            children: a.members.map((s) =>
              (0, t.jsxs)(
                "li",
                {
                  children: [
                    (0, t.jsxs)("span", {
                      children: [
                        s.avatar,
                        " ",
                        s.name,
                        s.isOwner ? " · started this room" : "",
                        s.isMe ? " (you)" : "",
                      ],
                    }),
                    !s.isMe &&
                      (0, t.jsxs)("span", {
                        className: "row",
                        style: { gap: 4 },
                        children: [
                          r &&
                            (0, t.jsx)("button", {
                              className: "ghost small",
                              onClick: () => c(s),
                              children: "Remove",
                            }),
                          (0, t.jsx)("button", {
                            className: "ghost small",
                            onClick: () => e.onReport(s),
                            children: "Report",
                          }),
                        ],
                      }),
                  ],
                },
                s.id,
              ),
            ),
          }),
          (0, t.jsx)(ec, {
            roomId: a.id,
            names: Object.fromEntries(a.members.map((e) => [e.id, `${e.avatar} ${e.name}`])),
          }),
        ],
      });
    }
    function ed() {
      try {
        let e = new (window.AudioContext || window.webkitAudioContext)();
        [523.25, 659.25].forEach((t, s) => {
          let a = e.createOscillator(),
            n = e.createGain();
          ((a.type = "sine"),
            (a.frequency.value = t),
            n.gain.setValueAtTime(1e-4, e.currentTime + 0.35 * s),
            n.gain.exponentialRampToValueAtTime(0.08, e.currentTime + 0.35 * s + 0.05),
            n.gain.exponentialRampToValueAtTime(1e-4, e.currentTime + 0.35 * s + 1.2),
            a.connect(n).connect(e.destination),
            a.start(e.currentTime + 0.35 * s),
            a.stop(e.currentTime + 0.35 * s + 1.3));
        });
      } catch {}
    }
    let eh = null,
      em = null;
    function ep() {
      if (!eh || !em) return;
      let e = eh;
      (em.gain.exponentialRampToValueAtTime(1e-4, e.currentTime + 1.5),
        setTimeout(() => e.close(), 1600),
        (eh = null),
        (em = null));
    }
    let ef = (0, e.i(70703).default)(() => e.A(81408), {
      loadableGenerated: { modules: [93025] },
      ssr: !1,
      loading: () =>
        (0, t.jsx)("div", { className: "hall3d loading", children: "Lighting the lamps…" }),
    });
    function ek(e) {
      let t = Math.max(0, Math.ceil(e / 1e3));
      return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
    }
    function eb({ stick: e }) {
      let [a, n] = (0, s.useState)({ x: 0, y: 0 }),
        l = (0, s.useRef)(null),
        i = (t) => {
          if (!l.current) return;
          let s = t.clientX - l.current.x,
            a = t.clientY - l.current.y,
            i = Math.hypot(s, a);
          (i > 40 && ((s *= 40 / i), (a *= 40 / i)),
            n({ x: s, y: a }),
            (e.x = s / 40),
            (e.y = -a / 40));
        },
        r = () => {
          ((l.current = null), n({ x: 0, y: 0 }), (e.x = 0), (e.y = 0));
        };
      return (
        (0, s.useEffect)(() => r, []),
        (0, t.jsx)("div", {
          className: "move-pad",
          "aria-label": "Move",
          onPointerDown: (e) => {
            (e.stopPropagation(), e.target.setPointerCapture?.(e.pointerId));
            let t = e.currentTarget.getBoundingClientRect();
            ((l.current = { x: t.left + t.width / 2, y: t.top + t.height / 2 }), i(e));
          },
          onPointerMove: (e) => {
            (e.stopPropagation(), i(e));
          },
          onPointerUp: r,
          onPointerCancel: r,
          children: (0, t.jsx)("div", {
            className: "knob",
            style: { transform: `translate(${a.x}px, ${a.y}px)` },
          }),
        })
      );
    }
    e.s(
      [
        "default",
        0,
        function ({ hallId: e }) {
          let a = (0, J.l)(e),
            n = (0, s.useMemo)(() => (ea || (ea = f.M ? new et() : new ee()), ea), []),
            k = (0, s.useMemo)(() => (f.M ? [] : (0, J.u)(e)), [e]),
            [b, g] = (0, s.useState)(null),
            [y, w] = (0, s.useState)(null),
            [x, j] = (0, s.useState)(""),
            [v, S] = (0, s.useState)("idle"),
            [N, C] = (0, s.useState)(0),
            [_, M] = (0, s.useState)(null),
            [T, E] = (0, s.useState)(0),
            [$, D] = (0, s.useState)({ f: 25, b: 5 }),
            [A, I] = (0, s.useState)(1),
            [W, P] = (0, s.useState)(() => Date.now()),
            [L, O] = (0, s.useState)([]),
            [F, B] = (0, s.useState)(new Set()),
            [U, H] = (0, s.useState)(null),
            [z, G] = (0, s.useState)(null),
            [K, Z] = (0, s.useState)(null),
            [V, Q] = (0, s.useState)(!1),
            [es, er] = (0, s.useState)(!1),
            [eo, ec] = (0, s.useState)([]),
            [eg, ey] = (0, s.useState)([]),
            [ew, ex] = (0, s.useState)(null),
            [ej, ev] = (0, s.useState)(null),
            [eS, eN] = (0, s.useState)(null),
            [eC, e_] = (0, s.useState)(null),
            [eM, eT] = (0, s.useState)(!1),
            [eR, eE] = (0, s.useState)("2d"),
            [e$, eq] = (0, s.useState)(!1),
            [eD, eA] = (0, s.useState)(!1),
            [eI, eW] = (0, s.useState)(null),
            [eP, eL] = (0, s.useState)(null),
            [eO, eF] = (0, s.useState)(null),
            [eB, eU] = (0, s.useState)(!1),
            [eH, eY] = (0, s.useState)(!0),
            ez = (0, s.useRef)(null),
            eG = (0, s.useRef)({ x: 0, y: 0 }).current,
            eK = (0, s.useRef)(null),
            [eZ, eV] = (0, s.useState)(null),
            [eX, eJ] = (0, s.useState)(!1),
            [eQ, e0] = (0, s.useState)(""),
            [e1, e2] = (0, s.useState)(!1),
            [e5, e3] = (0, s.useState)(!1),
            [e4, e6] = (0, s.useState)(!1),
            [e8, e9] = (0, s.useState)(!1),
            [e7, te] = (0, s.useState)(!1),
            tt = (0, s.useRef)(v);
          tt.current = v;
          let ts = (0, s.useCallback)((e) => {
            (e_(e), window.setTimeout(() => e_((t) => (t === e ? null : t)), 3500));
          }, []);
          ((0, s.useEffect)(() => {
            let t = !0;
            (0, i.Z)().then(async (s) => {
              if (!t) return;
              if (false) {
                window.location.href = `/signin?next=${encodeURIComponent(`/hall/${e}`)}`;
                return;
              }
              if ("needs_onboarding" === s.state) {
                window.location.href = "/welcome";
                return;
              }
              let a = s.profile;
              (a.name.trim() || (a.name = "Guest"),
                g(a),
                D({ f: a.focusMin, b: a.breakMin }),
                H(await (0, i.G)(e)));
              let n = await ei(a.id);
              t && n && ex(n);
            });
            let s = new URLSearchParams(window.location.search),
              a = Number(s.get("speed"));
            a > 0 && !f.M && I(a);
            let n = (function () {
              try {
                let e = document.createElement("canvas");
                return !!(e.getContext("webgl2") || e.getContext("webgl"));
              } catch {
                return !1;
              }
            })();
            eT(n);
            let l = s.get("view") ?? localStorage.getItem("hh.view");
            (eE(n && "2d" !== l ? "3d" : "2d"), eW(s.get("hover")));
            let r = window.matchMedia("(prefers-reduced-motion: reduce)");
            eq(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
            let o = () => eq(r.matches);
            return (
              r.addEventListener("change", o),
              () => {
                ((t = !1), r.removeEventListener("change", o));
              }
            );
          }, [e]),
            (0, s.useEffect)(
              () => (
                eD
                  ? !(function () {
                      if (eh) return;
                      let e = 2 * (eh = new AudioContext()).sampleRate,
                        t = eh.createBuffer(1, e, eh.sampleRate),
                        s = t.getChannelData(0),
                        a = 0;
                      for (let t = 0; t < e; t++)
                        ((a = (a + 0.02 * (2 * Math.random() - 1)) / 1.02), (s[t] = 3.5 * a));
                      let n = eh.createBufferSource();
                      ((n.buffer = t), (n.loop = !0));
                      let l = eh.createBiquadFilter();
                      ((l.type = "lowpass"),
                        (l.frequency.value = 1200),
                        (em = eh.createGain()).gain.setValueAtTime(1e-4, eh.currentTime),
                        em.gain.exponentialRampToValueAtTime(0.12, eh.currentTime + 3),
                        n.connect(l).connect(em).connect(eh.destination),
                        n.start());
                    })()
                  : ep(),
                () => ep()
              ),
              [eD],
            ));
          let ta = (0, s.useMemo)(
              () =>
                b
                  ? {
                      id: b.id,
                      name: b.name,
                      avatar: b.avatar,
                      color: b.color,
                      seat: y,
                      topic: y ? x : eP && eZ ? eZ : x,
                      phase: v,
                      phaseEndsAt: _,
                      hideFromRequests: b.hideFromRequests,
                      walking: !!eP && !y,
                      floor: !!eP && !y && null !== eZ,
                      look: b.look ?? "",
                      lastSeen: Date.now(),
                    }
                  : null,
              [b, y, x, v, _, eP, eZ],
            ),
            tn = (0, s.useRef)(!1);
          ((0, s.useEffect)(() => {
            if (!ta || tn.current) return;
            ((tn.current = !0), n.join(e, ta));
            let t = n.onMembers(O),
              s = n.onRequest((e) => {
                "focus" === tt.current ? ey((t) => [...t, e]) : ec((t) => [...t, e]);
              }),
              a = n.onResponse(async (e) => {
                e.accepted
                  ? (ex((f.M ? await ei(ta.id) : null) ?? { name: e.roomName ?? "Study room" }),
                    ts("Request accepted. You’re in a small study room now."))
                  : ts("They’d rather study solo right now. No worries.");
              }),
              l = () => n.leave();
            return (
              window.addEventListener("pagehide", l),
              () => {
                (t(),
                  s(),
                  a(),
                  window.removeEventListener("pagehide", l),
                  n.leave(),
                  (tn.current = !1));
              }
            );
          }, [null === ta, e]),
            (0, s.useEffect)(() => {
              ta && tn.current && n.update(ta);
            }, [ta, n]));
          let tl = (0, s.useCallback)(
            (e) => {
              let t = performance.now(),
                s = eK.current,
                a = !s || s.w.pose !== e.pose,
                l =
                  !!s &&
                  (Math.hypot(e.x - s.w.x, e.z - s.w.z) > 0.05 || Math.abs(e.ry - s.w.ry) > 0.12),
                i = !!s && t - s.at > ("walking" === e.pose ? 400 : 1500);
              (a || (i && l)) && (n.walk(e), (eK.current = { w: { ...e }, at: t }));
            },
            [n],
          );
          ((0, s.useEffect)(() => {
            (!eP || y) && (n.walk(null), (eK.current = null), eV(null), e2(!1));
          }, [eP, y, n]),
            (0, s.useEffect)(() => {
              if (!eP || y) return;
              let e = (e) => {
                let t = e.target;
                "KeyG" !== e.code ||
                  e.ctrlKey ||
                  e.metaKey ||
                  e.altKey ||
                  (t &&
                    (t instanceof HTMLInputElement ||
                      t instanceof HTMLTextAreaElement ||
                      t instanceof HTMLSelectElement ||
                      t.isContentEditable)) ||
                  document.querySelector(".veil") ||
                  (null !== eZ ? eV(null) : eJ(!0));
              };
              return (
                window.addEventListener("keydown", e),
                () => window.removeEventListener("keydown", e)
              );
            }, [eP, y, eZ]),
            (0, s.useEffect)(() => {
              if (!eP) return;
              (eY(!0),
                ez.current
                  ?.querySelector(".hall3d-wrap")
                  ?.scrollIntoView({ block: "nearest", behavior: "smooth" }));
              let e = window.setTimeout(() => eY(!1), 9e3);
              return () => clearTimeout(e);
            }, [eP]));
          let ti = (0, s.useCallback)(() => {
            document.fullscreenElement
              ? document.exitFullscreen().catch(() => {})
              : ez.current
                  ?.requestFullscreen?.()
                  .catch(() => ts("Full screen isn’t available in this browser."));
          }, [ts]);
          (0, s.useEffect)(() => {
            let e = () => eU(document.fullscreenElement === ez.current),
              t = (e) => {
                let t = e.target;
                "KeyF" !== e.code ||
                  e.ctrlKey ||
                  e.metaKey ||
                  e.altKey ||
                  e.repeat ||
                  (t &&
                    (t instanceof HTMLInputElement ||
                      t instanceof HTMLTextAreaElement ||
                      t instanceof HTMLSelectElement ||
                      t.isContentEditable)) ||
                  (!document.querySelector(".veil") &&
                    document.querySelector(".hall3d-wrap") &&
                    (e.preventDefault(), ti()));
              };
            return (
              document.addEventListener("fullscreenchange", e),
              window.addEventListener("keydown", t),
              () => {
                (document.removeEventListener("fullscreenchange", e),
                  window.removeEventListener("keydown", t));
              }
            );
          }, [ti]);
          let tr = (0, s.useRef)(0);
          ((0, s.useEffect)(() => {
            if (!ej || !f.M) return;
            let e = setInterval(async () => {
                (await (0, i.F)(ej, tr.current)) ||
                  (w(null),
                  ev(null),
                  S("idle"),
                  M(null),
                  ts("Your desk was released while you were away. Pick a desk to sit again."));
              }, 6e4),
              t = async () => (0, i.X)(ej, tr.current, await (0, f.B)());
            return (
              window.addEventListener("pagehide", t),
              () => {
                (clearInterval(e), window.removeEventListener("pagehide", t));
              }
            );
          }, [ej, ts]),
            (0, s.useEffect)(() => {
              if (!y) return;
              let e = setInterval(() => P(Date.now()), 1e3);
              return () => clearInterval(e);
            }, [y]));
          let to = (0, s.useCallback)(
              (e, t) => {
                let s = Date.now();
                (S(e), C(s), M(t > 0 ? s + (6e4 * t) / A : null), er(!1));
              },
              [A],
            ),
            tc = (0, s.useCallback)(() => {
              if ("focus" !== v) return 0;
              let e = Math.max(0, Math.min(Date.now(), _ ?? Date.now()) - N) * A;
              return (E((t) => t + e), e);
            }, [v, _, N, A]);
          ((tr.current =
            (T + ("focus" === v ? Math.max(0, Math.min(W, _ ?? W) - N) * A : 0)) / 6e4),
            (0, s.useEffect)(() => {
              _ &&
                !(W < _) &&
                ("focus" === v
                  ? (tc(), b?.chime && ed(), to("break", $.b))
                  : "break" === v && (b?.chime && ed(), S("idle"), M(null)));
            }, [W, _, v, $.b, b?.chime, tc, to]),
            (0, s.useEffect)(() => {
              "focus" !== v && eg.length && (ec((e) => [...e, ...eg]), ey([]));
            }, [v, eg]));
          let tu = (0, s.useMemo)(() => {
              let e = new Map();
              return (
                [...k, ...L].forEach((t) => {
                  !t.seat || F.has(t.id) || e.has(t.seat) || e.set(t.seat, t);
                }),
                ta?.seat && e.set(ta.seat, ta),
                e
              );
            }, [k, L, F, ta]),
            td = (0, s.useMemo)(
              () => L.filter((e) => e.walking && !e.seat && !F.has(e.id)),
              [L, F],
            );
          ((0, s.useEffect)(() => {
            "3d" === eR && eM && (0, el.X)([...tu.values(), ...td, ...(eP && ta ? [ta] : [])]);
          }, [eR, eM, tu, td, eP, ta]),
            (0, s.useEffect)(() => {
              !y ||
                !b ||
                f.M ||
                (L.find((e) => e.seat === y && e.id < b.id) &&
                  (w(null), S("idle"), M(null), ts(`Desk ${y} was just taken. Pick another one?`)));
            }, [L, y, b, ts]));
          let th = (e) => {
              if (!b) return;
              let t = { ...b, ...e };
              (g(t),
                (0, i.M)(t).then((e) => {
                  e || ts("That change wasn’t saved. Try a different nickname?");
                }));
            },
            tm = (e) => {
              let t = tu.get(e);
              if (t) t.id !== b?.id && Z(t);
              else {
                if (y) return void ts("You already have a desk. Stand up first to move.");
                G(e);
              }
            },
            tp = (0, s.useCallback)(() => eV(null), []),
            tf = async (e) => {
              if ((e3(!1), !b)) return;
              let t = (0, r.D)(e);
              (g({ ...b, look: t }),
                (await (0, i.T)(b, t)) ||
                  ts("Your wardrobe shows for now, but couldn’t be saved yet."));
            },
            tk = async (t, s, a, n) => {
              if (!z || !b) return;
              let l = await (0, i.N)(e, z, t);
              if (!l.ok) {
                (G(null),
                  ts(
                    "desk_taken" === l.reason
                      ? `Desk ${z} was just taken. Pick another one?`
                      : "topic_not_allowed" === l.reason
                        ? "That topic can’t be shown on a desk. Try wording it differently?"
                        : "Couldn’t sit down just now. Check your connection and try again.",
                  ));
                return;
              }
              (ev(l.sittingId),
                w(z),
                j(t),
                D({ f: s, b: a }),
                E(0),
                th({ focusMin: s, breakMin: a }),
                n && ((0, i.h)(e, z, b.id), H(z)),
                G(null),
                eL(null),
                to("focus", s));
            },
            tb = async (t) => {
              if (!y) return;
              let s = "walk" === eO && "3d" === eR && eM,
                a = Math.round((T + tc()) / 6e4),
                n = await (0, i.r)(ej ?? "", a, t, { hallId: e, seat: y, topic: x });
              (Q(!1),
                w(null),
                ev(null),
                j(""),
                S("idle"),
                M(null),
                E(0),
                ew?.id || ex(null),
                eF(null),
                s && eL({ ...(0, en.A)(y), n: Date.now(), pitch: 0.55 }),
                ts(n > 0 ? `Saved: ${n} min on ${x}.` : "Saved. See you at your desk soon."));
            },
            tg = async (e, t) => {
              ec((t) => t.filter((t) => t.id !== e.id));
              let s = await n.respond(e, t);
              t &&
                (s
                  ? ex(
                      (f.M && b ? await ei(b.id) : null) ?? { name: `${e.from.name} & ${b?.name}` },
                    )
                  : ts("That request can’t be accepted any more."));
            },
            ty = async (t, s, a) => {
              (eN(null),
                ts(
                  (await (0, i.l)(t, s, a, e, ew?.id ?? null))
                    ? f.M && !t.isDemo
                      ? "Thanks. A moderator will look at this. They won’t be told who reported them."
                      : "Thanks. Report noted (demo: kept on this device only)."
                    : "That report didn’t go through. Please try again.",
                ));
            };
          if (!b || !ta) return (0, t.jsx)("p", { className: "muted", children: "Walking in…" });
          let tw = _ ? _ - W : 0,
            tx = _ ? _ - N : 1,
            tj = _ ? Math.min(100, Math.max(0, ((W - N) / tx) * 100)) : 0,
            tv = tu.size,
            tS = !!eP && !y,
            tN = "u" > typeof document && !!document.fullscreenEnabled,
            tC = `Tap a free desk to sit, or someone’s desk to see their topic.${f.M ? "" : " Demo: open another tab to see live presence."}`,
            t_ = `Tap a vacant desk to sit. Tap someone’s desk to see their topic or ask to study together.${f.M ? "" : " Demo mode: open another tab to see live presence. (A few desks are local demo students.)"}`;
          return (0, t.jsxs)("div", {
            className: `hall-root ${eB ? "is-fs" : ""}`,
            ref: ez,
            children: [
              (0, t.jsxs)("div", {
                className: "hall-head",
                children: [
                  (0, t.jsxs)("div", {
                    children: [
                      (0, t.jsx)("h1", { children: a.name }),
                      (0, t.jsxs)("div", {
                        className: "rule",
                        children: [a.rule, " · ", tv, " of ", J.X.length * J.m, " desks taken"],
                      }),
                    ],
                  }),
                  (0, t.jsxs)("div", {
                    className: "row",
                    children: [
                      (0, t.jsxs)("span", {
                        className: "toggle",
                        children: [
                          (0, t.jsx)("input", {
                            type: "checkbox",
                            checked: b.hideFromRequests,
                            onChange: (e) => th({ hideFromRequests: e.target.checked }),
                          }),
                          "Hide me from requests",
                        ],
                      }),
                      (0, t.jsxs)("span", {
                        className: "toggle",
                        children: [
                          (0, t.jsx)("input", {
                            type: "checkbox",
                            checked: b.chime,
                            onChange: (e) => th({ chime: e.target.checked }),
                          }),
                          "Soft chime",
                        ],
                      }),
                      (0, t.jsxs)("span", {
                        className: "toggle",
                        children: [
                          (0, t.jsx)("input", {
                            type: "checkbox",
                            checked: eD,
                            onChange: (e) => eA(e.target.checked),
                          }),
                          "Soft rain",
                        ],
                      }),
                      eM &&
                        (0, t.jsx)("button", {
                          className: "ghost small",
                          onClick: () => {
                            var e;
                            (eE((e = "3d" === eR ? "2d" : "3d")),
                              localStorage.setItem("hh.view", e));
                          },
                          children: "3d" === eR ? "Simple view" : "3D hall",
                        }),
                      (0, t.jsx)("select", {
                        "aria-label": "Move to another hall",
                        value: e,
                        disabled: !!y,
                        title: y ? "Stand up to hop halls" : "Move to another hall",
                        onChange: (e) => {
                          window.location.href = `/hall/${e.target.value}`;
                        },
                        style: { width: "auto" },
                        children: J.F.map((e) =>
                          (0, t.jsx)("option", { value: e.id, children: e.name }, e.id),
                        ),
                      }),
                      (0, t.jsx)("a", { href: "/", className: "small", children: "Lobby" }),
                    ],
                  }),
                ],
              }),
              ew &&
                (ew.id
                  ? (0, t.jsx)(eu, {
                      room: ew,
                      myId: b.id,
                      onChange: ex,
                      say: ts,
                      onReport: (e) =>
                        eN({
                          id: e.id,
                          name: e.name,
                          avatar: e.avatar,
                          color: "#e9d8a6",
                          seat: null,
                          topic: "",
                          phase: "idle",
                          phaseEndsAt: null,
                          hideFromRequests: !0,
                          lastSeen: Date.now(),
                        }),
                    })
                  : (0, t.jsxs)("div", {
                      className: "room-banner",
                      children: [
                        (0, t.jsx)("b", { children: "Study room:" }),
                        " ",
                        ew.name,
                        ". Demo mode: you stay at your desks and there is no voice (the real app opens a small voice room, muted by default, push-to-talk, never recorded).",
                        " ",
                        (0, t.jsx)("button", {
                          className: "ghost small",
                          onClick: () => ex(null),
                          children: "Leave room",
                        }),
                      ],
                    })),
              "3d" === eR && eM
                ? (0, t.jsxs)("div", {
                    className: "hall3d-wrap",
                    children: [
                      (0, t.jsx)(ef, {
                        seatMap: tu,
                        myId: b.id,
                        mySeat: y,
                        reduced: e$,
                        rain: eD,
                        onPick: tm,
                        hoverSeat: eI,
                        me: ta,
                        walk: y ? null : eP,
                        walkers: td,
                        onMove: tl,
                        stick: eG,
                        floor: eZ,
                        onGetUp: tp,
                        quick: e1,
                      }),
                      (0, t.jsxs)("div", {
                        className: "frame-ctl",
                        children: [
                          !y &&
                            (tS
                              ? (0, t.jsx)("button", {
                                  className: "ghost small",
                                  onClick: () => eL(null),
                                  children: "Stop walking",
                                })
                              : (0, t.jsx)("button", {
                                  className: "ghost small",
                                  onClick: () => eL({ ...en.z, n: Date.now() }),
                                  children: "Walk around",
                                })),
                          tS &&
                            (null !== eZ
                              ? (0, t.jsx)("button", {
                                  className: "ghost small",
                                  onClick: tp,
                                  title: "Get up (G)",
                                  children: "Get up",
                                })
                              : (0, t.jsx)("button", {
                                  className: "ghost small",
                                  onClick: () => eJ(!0),
                                  title: "Sit on the floor here to study (G)",
                                  children: "Sit on the floor",
                                })),
                          tS &&
                            null === eZ &&
                            (0, t.jsx)("button", {
                              className: `ghost small touch-only ${e1 ? "on" : ""}`,
                              "aria-pressed": e1,
                              onClick: () => e2((e) => !e),
                              children: e1 ? "Usual pace" : "Quicker",
                            }),
                          (0, t.jsx)("button", {
                            className: "ghost small",
                            onClick: () => e3(!0),
                            children: "Wardrobe",
                          }),
                          tN &&
                            (0, t.jsx)("button", {
                              className: "ghost small",
                              onClick: ti,
                              title: "Full screen (F). Esc to leave.",
                              children: eB ? "Exit full screen" : "Full screen",
                            }),
                        ],
                      }),
                      tS
                        ? (0, t.jsx)("div", {
                            className: `hint3d ${eH ? "" : "faded"}`,
                            children:
                              null !== eZ
                                ? (0, t.jsxs)(t.Fragment, {
                                    children: [
                                      "Sitting on the floor · ",
                                      (0, t.jsx)("span", {
                                        className: "kb-only",
                                        children: "G or any walking key to get up · ",
                                      }),
                                      (0, t.jsx)("span", {
                                        className: "touch-only",
                                        children: "use the pad to get up · ",
                                      }),
                                      "tap a free desk to move there",
                                    ],
                                  })
                                : (0, t.jsxs)(t.Fragment, {
                                    children: [
                                      (0, t.jsx)("span", {
                                        className: "kb-only",
                                        children:
                                          "WASD or arrows to walk · Shift for a quicker pace · drag to look · Q/E to turn · G to sit on the floor · ",
                                      }),
                                      (0, t.jsx)("span", {
                                        className: "touch-only",
                                        children: "Use the pad to walk · drag to look · ",
                                      }),
                                      "tap a free desk to sit",
                                    ],
                                  }),
                          })
                        : !y && (0, t.jsx)("div", { className: "hint3d", children: tC }),
                      tS && (0, t.jsx)(eb, { stick: eG }),
                      y &&
                        (0, t.jsxs)("div", {
                          className: "hud3d",
                          children: [
                            (0, t.jsxs)("div", {
                              className: "small muted",
                              children: [
                                "focus" === v
                                  ? "Deep focus"
                                  : "break" === v
                                    ? "Short break"
                                    : "Ready when you are",
                                " · Desk ",
                                y,
                              ],
                            }),
                            (0, t.jsx)("div", {
                              className: "hud-clock",
                              children: _ ? ek(_ - W) : "--:--",
                            }),
                            (0, t.jsx)("div", { className: "small hud-topic", children: x }),
                            (0, t.jsxs)("div", {
                              className: "row",
                              style: { gap: 6, marginTop: 8, flexWrap: "wrap" },
                              children: [
                                eg.length > 0 &&
                                  (0, t.jsx)("span", {
                                    className: "small muted",
                                    children: "A note waits for your break",
                                  }),
                                "focus" === v &&
                                  (0, t.jsx)("button", {
                                    className: "ghost small",
                                    onClick: () => {
                                      (tc(), to("break", $.b));
                                    },
                                    children: "Break",
                                  }),
                                "focus" !== v &&
                                  (0, t.jsx)("button", {
                                    className: "sage small",
                                    onClick: () => to("focus", $.f),
                                    children: "idle" === v ? "Next round" : "Back to focus",
                                  }),
                                (0, t.jsx)("button", {
                                  className: "ghost small",
                                  onClick: () => e6(!0),
                                  children: "Notes",
                                }),
                                (0, t.jsx)("button", {
                                  className: "ghost small",
                                  onClick: () => e9(!0),
                                  children: "Hours",
                                }),
                                (0, t.jsx)("button", {
                                  className: "ghost small",
                                  onClick: () => te(!0),
                                  children: "Timetable",
                                }),
                                (0, t.jsx)("button", {
                                  className: "ghost small",
                                  onClick: () => {
                                    (eF(null), Q(!0));
                                  },
                                  children: "Stand up",
                                }),
                                (0, t.jsx)("button", {
                                  className: "ghost small",
                                  onClick: () => {
                                    (eF("walk"), Q(!0));
                                  },
                                  children: "Walk around",
                                }),
                              ],
                            }),
                            (0, t.jsx)(X, {}),
                          ],
                        }),
                    ],
                  })
                : (0, t.jsx)("div", {
                    className: "floor",
                    children: J.X.map((e) =>
                      (0, t.jsxs)(
                        "div",
                        {
                          className: "desk-row",
                          children: [
                            (0, t.jsx)("div", { className: "row-label", children: e }),
                            Array.from({ length: J.m }, (t, s) => `${e}${s + 1}`).flatMap(
                              (s, a) => {
                                let n = (0, t.jsx)(
                                  l,
                                  {
                                    seat: s,
                                    occupant: tu.get(s) ?? null,
                                    isMine: s === y,
                                    isUsual: s === U && !y,
                                    onClick: () => tm(s),
                                  },
                                  s,
                                );
                                return 2 === a
                                  ? [n, (0, t.jsx)("div", { className: "aisle" }, `${e}-aisle`)]
                                  : [n];
                              },
                            ),
                          ],
                        },
                        e,
                      ),
                    ),
                  }),
              !y &&
                !("3d" === eR && eM) &&
                (0, t.jsx)("p", {
                  className: "muted small",
                  style: { marginTop: 10 },
                  children: t_,
                }),
              y &&
                !("3d" === eR && eM) &&
                (0, t.jsx)("div", {
                  className: "focusbar",
                  children: (0, t.jsxs)("div", {
                    className: "inner",
                    children: [
                      (0, t.jsxs)("div", {
                        children: [
                          (0, t.jsxs)("div", {
                            className: "small",
                            style: { opacity: 0.8 },
                            children: [
                              "Desk ",
                              y,
                              " · ",
                              "focus" === v
                                ? "Focusing"
                                : "break" === v
                                  ? "Break"
                                  : "Ready when you are",
                            ],
                          }),
                          (0, t.jsx)("div", { className: "topic-line", children: x }),
                          (0, t.jsx)("div", {
                            className: `progress ${"break" === v ? "break" : ""}`,
                            children: (0, t.jsx)("div", { style: { width: `${tj}%` } }),
                          }),
                        ],
                      }),
                      (0, t.jsx)("div", {
                        className: "clock",
                        "aria-live": "off",
                        children: _ ? ek(tw) : "--:--",
                      }),
                      (0, t.jsxs)("div", {
                        className: "row",
                        children: [
                          eg.length > 0 &&
                            (0, t.jsx)("span", {
                              className: "small",
                              style: { opacity: 0.8 },
                              children: "A note is waiting for your break",
                            }),
                          "focus" === v &&
                            (0, t.jsx)("button", {
                              className: "ghost",
                              onClick: () => {
                                (tc(), to("break", $.b));
                              },
                              children: "Take a break",
                            }),
                          "focus" !== v &&
                            (0, t.jsx)("button", {
                              className: "sage",
                              onClick: () => to("focus", $.f),
                              children: "idle" === v ? "Start next round" : "Back to focus",
                            }),
                          (0, t.jsx)("button", {
                            className: "ghost",
                            onClick: () => e6(!0),
                            children: "Notes",
                          }),
                          (0, t.jsx)("button", {
                            className: "ghost",
                            onClick: () => e9(!0),
                            children: "Hours",
                          }),
                          (0, t.jsx)("button", {
                            className: "ghost",
                            onClick: () => te(!0),
                            children: "Timetable",
                          }),
                          (0, t.jsx)("button", {
                            className: "ghost",
                            onClick: () => Q(!0),
                            children: "Stand up",
                          }),
                        ],
                      }),
                      (0, t.jsx)(X, {}),
                    ],
                  }),
                }),
              eo.length > 0 &&
                (0, t.jsx)("div", {
                  className: "notes",
                  children: eo.map((e) =>
                    (0, t.jsxs)(
                      "div",
                      {
                        className: "note",
                        children: [
                          (0, t.jsxs)("div", {
                            children: [
                              (0, t.jsxs)("b", { children: [e.from.avatar, " ", e.from.name] }),
                              " ",
                              (0, t.jsxs)("span", {
                                className: "muted small",
                                children: ["(desk ", e.from.seat ?? "aisle", ")"],
                              }),
                              " asks to study together.",
                            ],
                          }),
                          e.note &&
                            (0, t.jsxs)("div", {
                              className: "small",
                              style: { margin: "4px 0" },
                              children: ["“", e.note, "”"],
                            }),
                          (0, t.jsxs)("div", {
                            className: "row",
                            style: { marginTop: 8 },
                            children: [
                              (0, t.jsx)("button", {
                                className: "sage",
                                onClick: () => tg(e, !0),
                                children: "Accept",
                              }),
                              (0, t.jsx)("button", {
                                className: "ghost",
                                onClick: () => tg(e, !1),
                                children: "Not now",
                              }),
                            ],
                          }),
                        ],
                      },
                      e.id,
                    ),
                  ),
                }),
              eX &&
                (0, t.jsx)(m, {
                  defaultTopic: eQ || x,
                  onCancel: () => eJ(!1),
                  onSit: (e) => {
                    (eJ(!1), e0(e), eV(e));
                  },
                }),
              e5 &&
                (0, t.jsx)(p, {
                  look: (0, r.E)(b.look),
                  hasNeck: r.R.has((0, el.f)(b.id, b.color, b.name).file),
                  onCancel: () => e3(!1),
                  onSave: tf,
                }),
              e4 && (0, t.jsx)(R, { onClose: () => e6(!1) }),
              e8 &&
                (0, t.jsx)(q, {
                  liveMinutes: Math.round(
                    (T + ("focus" === v ? Math.max(0, Math.min(W, _ ?? W) - N) * A : 0)) / 6e4,
                  ),
                  onClose: () => e9(!1),
                }),
              e7 && (0, t.jsx)(Y, { onClose: () => te(!1) }),
              z &&
                (0, t.jsx)(o, {
                  seat: z,
                  defaultFocus: $.f,
                  defaultBreak: $.b,
                  onCancel: () => G(null),
                  onSit: tk,
                }),
              K &&
                (0, t.jsx)(c, {
                  member: K,
                  canRequest: !K.hideFromRequests && "focus" !== v && !ew && !b.roomsPaused,
                  reason: b.roomsPaused
                    ? "Study rooms are paused on your account for now."
                    : K.hideFromRequests
                      ? `${K.name} isn’t taking study-room requests right now.`
                      : ew
                        ? "You’re already in a study room."
                        : "You’re mid-focus. Requests can wait until your break.",
                  onRequest: (e) =>
                    ((e, t) => {
                      if ((Z(null), e.isDemo)) {
                        (ts(`Request sent to ${e.name}.`),
                          window.setTimeout(() => {
                            (ex({ name: `${e.name} & ${b?.name}` }),
                              ts(`${e.name} accepted. You’re in a small study room now.`));
                          }, 2500));
                        return;
                      }
                      n.sendRequest(e.id, t).then((t) => {
                        ts(
                          t.ok
                            ? `Request sent to ${e.name}. They’ll see it when they’re not mid-focus.`
                            : "rate_limited" === t.reason
                              ? "You’ve sent a few requests recently. Try again in a little while."
                              : `Not sent. ${e.name} isn’t taking requests right now.`,
                        );
                      });
                    })(K, e),
                  onBlock: () => {
                    (n.block(K.id).then(async () => {
                      ew?.id && b && ex(await ei(b.id));
                    }),
                      B((e) => new Set(e).add(K.id)),
                      ec((e) => e.filter((e) => e.from.id !== K.id)),
                      Z(null),
                      ts(`${K.name} is blocked. You won’t see their desk or requests.`));
                  },
                  onReport: () => {
                    (eN(K), Z(null));
                  },
                  onClose: () => Z(null),
                }),
              V &&
                (0, t.jsx)(u, {
                  topic: x,
                  minutes: Math.round(
                    (T + ("focus" === v ? Math.max(0, Math.min(W, _ ?? W) - N) * A : 0)) / 6e4,
                  ),
                  onSave: tb,
                  onBack: () => {
                    (Q(!1), eF(null));
                  },
                }),
              y &&
                "break" === v &&
                !es &&
                (0, t.jsx)(d, {
                  clock: ek(tw),
                  compact: "3d" === eR && eM,
                  onSkip: () => to("focus", $.f),
                  onHide: () => er(!0),
                }),
              eS &&
                (0, t.jsx)(h, {
                  member: eS,
                  onCancel: () => eN(null),
                  onSend: (e, t) => ty(eS, e, t),
                }),
              eC && (0, t.jsx)("div", { className: "toast", role: "status", children: eC }),
            ],
          });
        },
      ],
      62561,
    );
  },
  90317,
  (e, t, s) => {
    "use strict";
    Object.defineProperty(s, "__esModule", { value: !0 });
    var a = {
      bindSnapshot: function () {
        return u;
      },
      createAsyncLocalStorage: function () {
        return o;
      },
      createSnapshot: function () {
        return d;
      },
      getOrCreateGlobalAsyncLocalStorage: function () {
        return c;
      },
    };
    for (var n in a) Object.defineProperty(s, n, { enumerable: !0, get: a[n] });
    let l = Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available");
    class i {
      disable() {
        throw l;
      }
      getStore() {}
      run() {
        throw l;
      }
      exit() {
        throw l;
      }
      enterWith() {
        throw l;
      }
      static bind(e) {
        return e;
      }
    }
    let r = "u" > typeof globalThis && globalThis.AsyncLocalStorage;
    function o() {
      return r ? new r() : new i();
    }
    function c(e) {
      let t = Symbol.for(`@next/${e}@16.4.6`),
        s = globalThis;
      return (s[t] ??= o());
    }
    function u(e) {
      return r ? r.bind(e) : i.bind(e);
    }
    function d() {
      return r
        ? r.snapshot()
        : function (e, ...t) {
            return e(...t);
          };
    }
  },
  42344,
  (e, t, s) => {
    "use strict";
    (Object.defineProperty(s, "__esModule", { value: !0 }),
      Object.defineProperty(s, "workAsyncStorageInstance", {
        enumerable: !0,
        get: function () {
          return a;
        },
      }));
    let a = (0, e.r(90317).getOrCreateGlobalAsyncLocalStorage)("work-async-storage");
  },
  63599,
  (e, t, s) => {
    "use strict";
    (Object.defineProperty(s, "__esModule", { value: !0 }),
      Object.defineProperty(s, "workAsyncStorage", {
        enumerable: !0,
        get: function () {
          return a.workAsyncStorageInstance;
        },
      }));
    let a = e.r(42344);
  },
  70703,
  (e, t, s) => {
    "use strict";
    (Object.defineProperty(s, "__esModule", { value: !0 }),
      Object.defineProperty(s, "default", {
        enumerable: !0,
        get: function () {
          return n;
        },
      }));
    let a = e.r(55682)._(e.r(69093));
    function n(e, t) {
      let s = {};
      "function" == typeof e && (s.loader = e);
      let n = { ...s, ...t };
      return (0, a.default)({ ...n, modules: n.loadableGenerated?.modules });
    }
    ("function" == typeof s.default || ("object" == typeof s.default && null !== s.default)) &&
      void 0 === s.default.__esModule &&
      (Object.defineProperty(s.default, "__esModule", { value: !0 }),
      Object.assign(s.default, s),
      (t.exports = s.default));
  },
  9885,
  (e, t, s) => {
    "use strict";
    function a(e) {
      return e
        .split("/")
        .map((e) => encodeURIComponent(e))
        .join("/");
    }
    (Object.defineProperty(s, "__esModule", { value: !0 }),
      Object.defineProperty(s, "encodeURIPath", {
        enumerable: !0,
        get: function () {
          return a;
        },
      }));
  },
  67585,
  (e, t, s) => {
    "use strict";
    (e.i(47167),
      Object.defineProperty(s, "__esModule", { value: !0 }),
      Object.defineProperty(s, "BailoutToCSRForNextDynamic", {
        enumerable: !0,
        get: function () {
          return i;
        },
      }));
    let a = e.r(71645),
      n = e.r(74080);
    e.r(32061);
    let l = e.r(49354).createReactBrowserBailoutReason.bind(null, "next/dynamic");
    function i({ children: e }) {
      return ((0, a.use)((0, n.browser)(l)), e);
    }
  },
  69093,
  (e, t, s) => {
    "use strict";
    (Object.defineProperty(s, "__esModule", { value: !0 }),
      Object.defineProperty(s, "default", {
        enumerable: !0,
        get: function () {
          return c;
        },
      }));
    let a = e.r(43476),
      n = e.r(71645),
      l = e.r(67585),
      i = e.r(52157);
    function r(e) {
      return { default: e && "default" in e ? e.default : e };
    }
    let o = { loader: () => Promise.resolve(r(() => null)), loading: null, ssr: !0 },
      c = function (e) {
        let t = { ...o, ...e },
          s = (0, n.lazy)(() => t.loader().then(r)),
          c = t.loading;
        function u(e) {
          let r = c ? (0, a.jsx)(c, { isLoading: !0, pastDelay: !0, error: null }) : null,
            o = !t.ssr || !!t.loading,
            u = o ? n.Suspense : n.Fragment,
            d = t.ssr
              ? (0, a.jsxs)(a.Fragment, {
                  children: [
                    "u" < typeof window
                      ? (0, a.jsx)(i.PreloadChunks, { moduleIds: t.modules })
                      : null,
                    (0, a.jsx)(s, { ...e }),
                  ],
                })
              : (0, a.jsx)(l.BailoutToCSRForNextDynamic, { children: (0, a.jsx)(s, { ...e }) });
          return (0, a.jsx)(u, { ...(o ? { fallback: r } : {}), children: d });
        }
        return ((u.displayName = "LoadableComponent"), u);
      };
  },
  52157,
  (e, t, s) => {
    "use strict";
    (Object.defineProperty(s, "__esModule", { value: !0 }),
      Object.defineProperty(s, "PreloadChunks", {
        enumerable: !0,
        get: function () {
          return o;
        },
      }));
    let a = e.r(43476),
      n = e.r(74080),
      l = e.r(63599),
      i = e.r(9885),
      r = e.r(43369);
    function o({ moduleIds: e }) {
      if ("u" > typeof window) return null;
      let t = l.workAsyncStorage.getStore();
      if (void 0 === t) return null;
      let s = [];
      if (t.reactLoadableManifest && e) {
        let a = t.reactLoadableManifest;
        for (let t of e) {
          if (!a[t]) continue;
          let e = a[t].files;
          s.push(...e);
        }
      }
      if (0 === s.length) return null;
      let c = (0, r.getAssetTokenQuery)();
      return (0, a.jsx)(a.Fragment, {
        children: s.map((e) => {
          let s = `${t.assetPrefix}/_next/${(0, i.encodeURIPath)(e)}${c}`;
          return e.endsWith(".css")
            ? (0, a.jsx)(
                "link",
                { precedence: "dynamic", href: s, rel: "stylesheet", as: "style", nonce: t.nonce },
                e,
              )
            : ((0, n.preload)(s, { as: "script", fetchPriority: "low", nonce: t.nonce }), null);
        }),
      });
    }
  },
  49354,
  (e, t, s) => {
    "use strict";
    Object.defineProperty(s, "__esModule", { value: !0 });
    var a = {
      createReactBrowserBailoutReason: function () {
        return i;
      },
      getReactBrowserBailoutReason: function () {
        return r;
      },
      isNextBrowserBailoutError: function () {
        return o;
      },
    };
    for (var n in a) Object.defineProperty(s, n, { enumerable: !0, get: a[n] });
    let l = Symbol.for("next.browser-bailout-reason");
    function i(e) {
      return { $$typeof: l, reason: e };
    }
    function r(e) {
      let t = e?.cause;
      return t?.$$typeof === l ? t.reason : void 0;
    }
    function o(e) {
      return void 0 !== r(e);
    }
  },
]);
