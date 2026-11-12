(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  31713,
  (e) => {
    "use strict";
    var t = e.i(43476),
      a = e.i(71645),
      s = e.i(39455),
      i = e.i(88624),
      n = e.i(33957),
      r = e.i(8687);
    e.s([
      "default",
      0,
      function () {
        let [e, l] = (0, a.useState)({ state: "ready" }),
          [o, c] = (0, a.useState)((0, n.d)()),
          [d, u] = (0, a.useState)([]),
          [m, h] = (0, a.useState)(null),
          [p, f] = (0, a.useState)([]),
          [g, y] = (0, a.useState)(""),
          [_, w] = (0, a.useState)(!1);
        ((0, a.useEffect)(() => {
          w("1" === new URLSearchParams(window.location.search).get("deleted"));
        }, []),
          (0, a.useEffect)(() => {
            (0, n.Z)().then(async (e) => {
              if ("needs_onboarding" === e.state) {
                window.location.href = "/welcome";
                return;
              }
              if ((l(e), "ready" !== e.state)) return;
              c(e.profile);
              let [t, a, s] = await Promise.all([(0, n.k)(), (0, n.e)(), (0, n.i)()]);
              (u(t), h(a), f(s));
            });
          }, []));
        let S = (0, a.useState)({ t: null })[0],
          v = (e) => {
            if (!o) return;
            let t = { ...o, ...e };
            (c(t), r.M)
              ? (S.t && clearTimeout(S.t),
                y("saving"),
                (S.t = setTimeout(async () => y((await (0, n.M)(t)) ? "saved" : "not_saved"), 500)))
              : (0, n.M)(t);
          };
        if (!e) return (0, t.jsx)("p", { className: "muted", children: "Opening the doors…" });
        /* signed_out screen removed */ if (!o)
          return (0, t.jsx)("p", { className: "muted", children: "Opening the doors…" });
        let x = (0, i.A)(d),
          b = (0, i.E)(d),
          j = o.name.trim().length > 0;
        return (0, t.jsxs)("div", {
          children: [
            (0, t.jsxs)("section", {
              className: "hero",
              children: [
                (0, t.jsx)("h1", { children: "Welcome back to the library." }),
                (0, t.jsx)("p", {
                  className: "muted",
                  children:
                    "Pick a hall, take a desk, write what you are working on. Everyone here is studying quietly.",
                }),
              ],
            }),
            p.map((e) =>
              (0, t.jsxs)(
                "div",
                {
                  className: "card notice",
                  children: [
                    (0, t.jsxs)("p", {
                      className: "small",
                      children: [
                        e.body,
                        " ",
                        (0, t.jsx)("a", { href: "/rules", children: "House rules" }),
                      ],
                    }),
                    (0, t.jsx)("button", {
                      className: "ghost small",
                      onClick: () => {
                        ((0, n.O)(e.id), f((t) => t.filter((t) => t.id !== e.id)));
                      },
                      children: "OK",
                    }),
                  ],
                },
                e.id,
              ),
            ),
            (0, t.jsxs)("div", {
              className: "grid2",
              children: [
                (0, t.jsxs)("section", {
                  className: "card",
                  children: [
                    (0, t.jsx)("h2", { children: "Your library card" }),
                    (0, t.jsx)("label", {
                      htmlFor: "name",
                      children:
                        "Nickname (shown on your desk with your avatar and topic, nothing else)",
                    }),
                    (0, t.jsx)("input", {
                      id: "name",
                      type: "text",
                      maxLength: 24,
                      placeholder: "e.g. Owl",
                      value: o.name,
                      onChange: (e) => v({ name: e.target.value }),
                    }),
                    "not_saved" === g &&
                      (0, t.jsx)("p", {
                        className: "small muted",
                        children: "That nickname wasn’t saved. Try a different one?",
                      }),
                    (0, t.jsx)("label", { children: "Avatar" }),
                    (0, t.jsx)("div", {
                      className: "avatars",
                      children: i.l.map((e) =>
                        (0, t.jsx)(
                          "button",
                          {
                            type: "button",
                            className: `avatar-pick ${o.avatar === e ? "on" : ""}`,
                            onClick: () => v({ avatar: e }),
                            "aria-label": `avatar ${e}`,
                            children: e,
                          },
                          e,
                        ),
                      ),
                    }),
                    (0, t.jsx)("label", { children: "Privacy" }),
                    (0, t.jsxs)("span", {
                      className: "toggle",
                      children: [
                        (0, t.jsx)("input", {
                          type: "checkbox",
                          checked: o.hideFromRequests,
                          onChange: (e) => v({ hideFromRequests: e.target.checked }),
                        }),
                        "Hide me from study-room requests",
                      ],
                    }),
                    r.M &&
                      (0, t.jsxs)("p", {
                        className: "small muted",
                        style: { marginTop: 10 },
                        children: [
                          (0, t.jsx)("a", { href: "/me", children: "My study log & account" }),
                          " · ",
                          (0, t.jsx)("a", { href: "/privacy", children: "Privacy" }),
                          "ready" === e.state &&
                            e.isModerator &&
                            (0, t.jsxs)(t.Fragment, {
                              children: [
                                " · ",
                                (0, t.jsx)("a", { href: "/mod", children: "Report queue" }),
                              ],
                            }),
                        ],
                      }),
                  ],
                }),
                (0, t.jsxs)("section", {
                  className: "card",
                  children: [
                    (0, t.jsx)("h2", { children: "This week" }),
                    0 === x.sittings
                      ? (0, t.jsx)("p", {
                          className: "muted",
                          children:
                            "Nothing logged yet this week. Any desk, any time, is a good start.",
                        })
                      : (0, t.jsxs)("p", {
                          children: [
                            Math.floor(x.minutes / 60),
                            " h ",
                            x.minutes % 60,
                            " min of focus across ",
                            x.days,
                            " ",
                            1 === x.days ? "day" : "days",
                            ". Nice, steady work.",
                          ],
                        }),
                    b.thisMonth > 0 &&
                      (0, t.jsxs)("p", {
                        className: "small muted",
                        children: [
                          "You showed up on ",
                          b.thisMonth,
                          " ",
                          1 === b.thisMonth ? "day" : "days",
                          " this month",
                          b.run >= 2 ? `, including ${b.run} days in a row` : "",
                          ".",
                        ],
                      }),
                    d.length > 0 &&
                      (0, t.jsx)("ul", {
                        className: "history small muted",
                        children: d
                          .slice(0, 4)
                          .map((e) =>
                            (0, t.jsxs)(
                              "li",
                              {
                                children: [
                                  new Date(e.at).toLocaleDateString(),
                                  " · ",
                                  e.topic,
                                  " · ",
                                  e.minutes,
                                  " min",
                                  e.note ? ` \xb7 “${e.note}”` : "",
                                ],
                              },
                              e.id ?? e.at,
                            ),
                          ),
                      }),
                  ],
                }),
              ],
            }),
            (0, t.jsx)("h2", { style: { marginTop: 28 }, children: "Public halls" }),
            !j &&
              (0, t.jsx)("p", {
                className: "muted small",
                children: "Write a name on your library card to walk in.",
              }),
            (0, t.jsx)("div", {
              className: "grid2",
              children: s.F.map((e) => {
                let a = m ? (m[e.id] ?? 0) : (0, s.u)(e.id).length;
                return (0, t.jsxs)(
                  "a",
                  {
                    href: j ? `/hall/${e.id}` : void 0,
                    className: "card door",
                    "aria-disabled": !j,
                    style: j ? void 0 : { opacity: 0.6, pointerEvents: "none" },
                    children: [
                      (0, t.jsx)("h3", { children: e.name }),
                      (0, t.jsx)("div", { className: "muted small", children: e.mood }),
                      (0, t.jsx)("div", { className: "rule small", children: e.rule }),
                      (0, t.jsx)("div", {
                        className: "small",
                        style: { marginTop: 6 },
                        children: m
                          ? 0 === a
                            ? "Quiet right now. Be the first lamp on."
                            : `${a} studying now`
                          : `${a}+ studying now (demo)`,
                      }),
                    ],
                  },
                  e.id,
                );
              }),
            }),
            !r.M &&
              (0, t.jsx)("p", {
                className: "small muted",
                style: { marginTop: 16 },
                children:
                  "Demo mode: no server is configured, so everything stays in this browser.",
              }),
          ],
        });
      },
    ]);
  },
  33957,
  88624,
  (e) => {
    "use strict";
    var t = e.i(8687);
    let a = "hh.profile",
      s = "hh.tabProfile",
      i = "hh.history",
      n = "hh.usualSeat";
    function r() {
      return {
        id: `me-${Math.random().toString(36).slice(2, 10)}`,
        name: "Reader",
        avatar: "📖",
        color: "#e9d8a6",
        hideFromRequests: !1,
        focusMin: 25,
        breakMin: 5,
        chime: !1,
      };
    }
    function l(e, t) {
      try {
        let a = e.getItem(t);
        return a ? JSON.parse(a) : null;
      } catch {
        return null;
      }
    }
    function o() {
      let e = l(sessionStorage, s);
      if (e) return e;
      let t = l(localStorage, a),
        i = { ...r(), ...(t ?? {}) };
      return ((i.id = r().id), sessionStorage.setItem(s, JSON.stringify(i)), i);
    }
    function c(e) {
      (sessionStorage.setItem(s, JSON.stringify(e)), localStorage.setItem(a, JSON.stringify(e)));
    }
    function d() {
      return (l(localStorage, i) ?? []).sort((e, t) => t.at - e.at);
    }
    function u(e) {
      let t = d();
      (t.unshift(e), localStorage.setItem(i, JSON.stringify(t.slice(0, 500))));
    }
    function m(e) {
      return l(localStorage, n)?.[e] ?? null;
    }
    function h(e, t) {
      let a = l(localStorage, n) ?? {};
      ((a[e] = t), localStorage.setItem(n, JSON.stringify(a)));
    }
    e.s(
      [
        "l",
        0,
        ["🦉", "📖", "🌿", "☕", "🐢", "🌙", "🪴", "🦊", "🐼", "✏️"],
        "H",
        0,
        u,
        "k",
        0,
        d,
        "d",
        0,
        o,
        "M",
        0,
        c,
        "h",
        0,
        h,
        "E",
        0,
        function (e) {
          let t = (e) => new Date(e).toDateString(),
            a = new Set(e.map((e) => t(e.at))),
            s = new Date();
          (s.setDate(1), s.setHours(0, 0, 0, 0));
          let i = new Set(e.filter((e) => e.at >= s.getTime()).map((e) => t(e.at))).size,
            n = 0,
            r = new Date();
          for (
            r.setHours(12, 0, 0, 0), a.has(r.toDateString()) || r.setDate(r.getDate() - 1);
            a.has(r.toDateString());
          )
            (n++, r.setDate(r.getDate() - 1));
          let l = e.reduce((e, t) => e + t.minutes, 0);
          return { thisMonth: i, run: n, totalDays: a.size, totalMinutes: l };
        },
        "F",
        0,
        m,
        "A",
        0,
        function (e) {
          let t = Date.now() - 6048e5,
            a = e.filter((e) => e.at >= t);
          return {
            minutes: a.reduce((e, t) => e + t.minutes, 0),
            days: new Set(a.map((e) => new Date(e.at).toDateString())).size,
            sittings: a.length,
          };
        },
      ],
      88624,
    );
    let p = null;
    async function f(e = !1) {
      return (p = { state: "ready", profile: o(), email: "", isModerator: !1 });
      let a = (0, t.t)(),
        { data: s } = await a.auth.getSession(),
        i = s.session?.user;
      if (!i) return (p = { state: "signed_out" });
      let { data: n } = await a
        .from("profiles")
        .select(
          "id,nickname,avatar,color,hide_from_requests,focus_min,break_min,chime,rooms_suspended",
        )
        .eq("id", i.id)
        .maybeSingle();
      if (!n) return (p = { state: "needs_onboarding", email: i.email ?? "" });
      let { data: r } = await a.from("profiles").select("look").eq("id", i.id).maybeSingle(),
        { error: l } = await a.rpc("mod_queue", { p_status: "none" });
      return (p = {
        state: "ready",
        profile: {
          ...{
            id: n.id,
            name: n.nickname,
            avatar: n.avatar,
            color: n.color,
            hideFromRequests: n.hide_from_requests,
            focusMin: n.focus_min,
            breakMin: n.break_min,
            chime: n.chime,
            roomsPaused: n.rooms_suspended,
          },
          look: r?.look ?? "",
        },
        email: i.email ?? "",
        isModerator: !l,
      });
    }
    async function g(e) {
      if ((p?.state === "ready" && (p = { ...p, profile: e }), !t.M)) return (c(e), !0);
      let { error: a } = await (0, t.t)()
        .from("profiles")
        .update({
          nickname: e.name.trim().slice(0, 24),
          avatar: e.avatar,
          color: e.color,
          hide_from_requests: e.hideFromRequests,
          focus_min: e.focusMin,
          break_min: e.breakMin,
          chime: e.chime,
        })
        .eq("id", e.id);
      return !a;
    }
    async function y(e, a) {
      let s = { ...e, look: a };
      if ((p?.state === "ready" && (p = { ...p, profile: s }), !t.M)) return (c(s), !0);
      let { error: i } = await (0, t.t)().from("profiles").update({ look: a }).eq("id", e.id);
      return !i;
    }
    async function _() {
      ((p = null), t.M && (await (0, t.t)().auth.signOut()));
    }
    async function w() {
      if (!t.M) return d();
      let { data: e } = await (0, t.t)()
        .from("sittings")
        .select("id,hall_id,seat,topic,started_at,last_seen_at,ended_at,focused_minutes,recap")
        .order("started_at", { ascending: !1 })
        .limit(500);
      return (e ?? []).map((e) => ({
        id: e.id,
        at: Date.parse(e.ended_at ?? e.last_seen_at),
        hallId: e.hall_id,
        seat: e.seat,
        topic: e.topic,
        minutes: e.focused_minutes,
        note: e.recap ?? "",
      }));
    }
    async function S(e, a, s) {
      if (!t.M) return { ok: !0, sittingId: `local-${Date.now()}` };
      let { data: i, error: n } = await (0, t.t)().rpc("sit_down", {
        p_hall: e,
        p_seat: a,
        p_topic: s,
      });
      return n ? { ok: !1, reason: (0, t.y)(n) } : { ok: !0, sittingId: i };
    }
    async function v(e, a) {
      if (!t.M) return !0;
      let { data: s, error: i } = await (0, t.t)().rpc("heartbeat_sitting", {
        p_id: e,
        p_focused_minutes: Math.round(a),
      });
      return !i && !0 === s;
    }
    async function x(e, a, s, i) {
      if (!t.M) return (u({ ...i, at: Date.now(), minutes: a, note: s }), a);
      let { data: n } = await (0, t.t)().rpc("stand_up", {
        p_id: e,
        p_focused_minutes: Math.round(a),
        p_recap: s,
      });
      return "number" == typeof n ? n : a;
    }
    async function b(e) {
      if (!t.M) return m(e);
      let { data: a } = await (0, t.t)()
        .from("usual_seats")
        .select("seat")
        .eq("hall_id", e)
        .maybeSingle();
      return a?.seat ?? null;
    }
    async function j(e, a, s) {
      t.M
        ? await (0, t.t)().from("usual_seats").upsert({ user_id: s, hall_id: e, seat: a })
        : h(e, a);
    }
    async function k() {
      if (!t.M) return null;
      let { data: e } = await (0, t.t)().rpc("hall_counts");
      return Object.fromEntries((e ?? []).map((e) => [e.hall_id, e.seated]));
    }
    async function N(e, a, s, i, n) {
      if (!t.M || e.isDemo) {
        let t = "hh.reports",
          n = JSON.parse(localStorage.getItem(t) ?? "[]");
        return (
          n.push({ id: e.id, name: e.name, reason: a, note: s, hallId: i, at: Date.now() }),
          localStorage.setItem(t, JSON.stringify(n)),
          !0
        );
      }
      let { error: r } = await (0, t.t)().rpc("file_report", {
        p_reported: e.id,
        p_reason: a,
        p_note: s.slice(0, 500),
        p_hall: i,
        p_room: n,
        p_topic: e.topic,
      });
      return !r;
    }
    async function M() {
      if (!t.M) return [];
      let { data: e } = await (0, t.t)()
        .from("account_notices")
        .select("id,body")
        .is("read_at", null)
        .order("created_at");
      return e ?? [];
    }
    async function O(e) {
      t.M &&
        (await (0, t.t)()
          .from("account_notices")
          .update({ read_at: new Date().toISOString() })
          .eq("id", e));
    }
    e.s(
      [
        "L",
        0,
        [
          { id: "harassment", label: "Harassment or bullying" },
          { id: "sexual", label: "Sexual content" },
          { id: "hate", label: "Hate or slurs" },
          { id: "under18", label: "This person seems under 18" },
          { id: "spam", label: "Spam or advertising" },
          { id: "other", label: "Something else" },
        ],
        "O",
        0,
        O,
        "l",
        0,
        N,
        "e",
        0,
        k,
        "F",
        0,
        v,
        "Z",
        0,
        f,
        "k",
        0,
        w,
        "i",
        0,
        M,
        "X",
        0,
        function (e, a, s) {
          t.M &&
            s &&
            fetch("https://vhsyzhstzlwcwzmbckzr.supabase.co/rest/v1/rpc/stand_up", {
              method: "POST",
              keepalive: !0,
              headers: {
                "content-type": "application/json",
                apikey:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoc3l6aHN0emx3Y3d6bWJja3pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQzOTY2OTMsImV4cCI6MjEwOTk3MjY5M30.jNHZsR3gWcotcY1jC-14Pmkhnp5EPMFNmg2-tTvrUkc",
                authorization: `Bearer ${s}`,
              },
              body: JSON.stringify({ p_id: e, p_focused_minutes: Math.round(a), p_recap: "" }),
            }).catch(() => {});
        },
        "T",
        0,
        y,
        "M",
        0,
        g,
        "h",
        0,
        j,
        "_",
        0,
        _,
        "N",
        0,
        S,
        "r",
        0,
        x,
        "G",
        0,
        b,
      ],
      33957,
    );
  },
  39455,
  (e) => {
    "use strict";
    let t = [
        {
          id: "main-reading",
          name: "Main Reading Hall",
          mood: "Big, quiet, long tables",
          rule: "Silent. Nods only.",
        },
        {
          id: "science-wing",
          name: "Science Wing",
          mood: "Labs, papers, problem sets",
          rule: "Silent. Diagrams welcome.",
        },
        {
          id: "exam-season",
          name: "Exam Season Hall",
          mood: "Deadlines and steady pages",
          rule: "Silent. One topic per desk.",
        },
        {
          id: "night-owls",
          name: "Night Owls",
          mood: "Late-night lamps",
          rule: "Silent. Be kind to tired eyes.",
        },
      ],
      a = ["A", "B", "C", "D"],
      s = a.flatMap((e) => Array.from({ length: 6 }, (t, a) => `${e}${a + 1}`)),
      i = [
        { name: "Aarav", avatar: "🦉", topic: "Organic chem: SN1 vs SN2" },
        { name: "Meera", avatar: "🌿", topic: "GATE BT: enzyme kinetics" },
        { name: "Kabir", avatar: "🐢", topic: "DSA: graphs" },
        { name: "Isha", avatar: "📚", topic: "Thesis lit review" },
        { name: "Rohan", avatar: "☕", topic: "Linear algebra ch. 4" },
        { name: "Tara", avatar: "🌙", topic: "UPSC: polity notes" },
        { name: "Zoya", avatar: "🪴", topic: "Bioprocess eng. problem set" },
      ],
      n = ["#e9d8a6", "#d4a373", "#ccd5ae", "#b7c4cf", "#e6ccb2", "#c9ada7"];
    e.s([
      "m",
      0,
      6,
      "F",
      0,
      t,
      "X",
      0,
      a,
      "u",
      0,
      function (e) {
        let t = (function (e) {
            let t = 0;
            for (let a of e) t = (31 * t + a.charCodeAt(0)) >>> 0;
            return t;
          })(e),
          a = 4 + (t % 3),
          r = new Set(),
          l = [];
        for (let o = 0; o < a; o++) {
          let a = i[(t + 3 * o) % i.length],
            c = (t + 7 * o) % s.length;
          for (; r.has(s[c]);) c = (c + 1) % s.length;
          (r.add(s[c]),
            l.push({
              id: `demo-${e}-${o}`,
              name: a.name,
              avatar: a.avatar,
              color: n[(t + o) % n.length],
              seat: s[c],
              topic: a.topic,
              phase: o % 4 == 3 ? "break" : "focus",
              phaseEndsAt: null,
              hideFromRequests: 1 === o,
              isDemo: !0,
              lastSeen: Date.now(),
            }));
        }
        return l;
      },
      "l",
      0,
      (e) => t.find((t) => t.id === e),
    ]);
  },
]);
