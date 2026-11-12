(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  86084,
  (e) => {
    "use strict";
    var t = e.i(43476),
      a = e.i(71645),
      n = e.i(33957),
      i = e.i(8687),
      s = e.i(88624),
      r = e.i(39455);
    e.s([
      "default",
      0,
      function () {
        let [e, o] = (0, a.useState)(null),
          [l, c] = (0, a.useState)([]),
          [d, u] = (0, a.useState)(""),
          [m, h] = (0, a.useState)(""),
          [p, f] = (0, a.useState)(!1),
          [g, y] = (0, a.useState)(!1),
          [_, S] = (0, a.useState)("");
        (0, a.useEffect)(() => {
          (0, n.Z)().then(async (e) => {
            if (false) {
              window.location.href = "/signin?next=/me";
              return;
            }
            if ("needs_onboarding" === e.state) {
              window.location.href = "/welcome";
              return;
            }
            (o(e.profile), c(await (0, n.k)()));
          });
        }, []);
        let w = async (t) => {
            if (!e) return;
            let a = { ...e, ...t };
            (o(a), h((await (0, n.M)(a)) ? "Saved." : "Not saved, please try again."));
          },
          b = async () => {
            if ("DELETE" === d && !g) {
              if ((y(!0), S(""), !(await (0, i.G)("/api/account/delete", { confirm: d })).ok)) {
                (y(!1),
                  S(
                    "Couldn’t delete just now. Nothing was removed. Please try again, or email us from the privacy policy page.",
                  ));
                return;
              }
              (await (0, n._)(), (window.location.href = "/?deleted=1"));
            }
          };
        if (!e) return (0, t.jsx)("p", { className: "muted", children: "Opening your log…" });
        let k = (0, s.A)(l),
          j = (0, s.E)(l);
        return (0, t.jsxs)("div", {
          children: [
            (0, t.jsx)("h1", { children: "My study log" }),
            (0, t.jsxs)("div", {
              className: "grid2",
              children: [
                (0, t.jsxs)("section", {
                  className: "card",
                  children: [
                    (0, t.jsx)("h2", { children: "So far" }),
                    (0, t.jsxs)("p", {
                      children: [
                        "This week: ",
                        Math.floor(k.minutes / 60),
                        " h ",
                        k.minutes % 60,
                        " min across ",
                        k.days,
                        " ",
                        1 === k.days ? "day" : "days",
                        ".",
                      ],
                    }),
                    (0, t.jsxs)("p", {
                      className: "muted small",
                      children: [
                        "All time: ",
                        Math.floor(j.totalMinutes / 60),
                        " h ",
                        j.totalMinutes % 60,
                        " min over ",
                        j.totalDays,
                        " ",
                        1 === j.totalDays ? "day" : "days",
                        " of showing up.",
                        j.run >= 2 ? ` ${j.run} days in a row right now.` : "",
                      ],
                    }),
                    (0, t.jsx)("p", {
                      className: "small muted",
                      children:
                        "Missed days don’t count against anything here. Every sitting adds; nothing resets.",
                    }),
                  ],
                }),
                (0, t.jsxs)("section", {
                  className: "card",
                  children: [
                    (0, t.jsx)("h2", { children: "Settings" }),
                    (0, t.jsx)("label", { htmlFor: "rhythm", children: "Usual rhythm" }),
                    (0, t.jsxs)("select", {
                      id: "rhythm",
                      value: `${e.focusMin}/${e.breakMin}`,
                      onChange: (e) => {
                        let [t, a] = e.target.value.split("/").map(Number);
                        w({ focusMin: t, breakMin: a });
                      },
                      children: [
                        (0, t.jsx)("option", {
                          value: "25/5",
                          children: "25 min focus · 5 min break",
                        }),
                        (0, t.jsx)("option", {
                          value: "50/10",
                          children: "50 min focus · 10 min break",
                        }),
                        (0, t.jsx)("option", {
                          value: "15/3",
                          children: "15 min focus · 3 min break",
                        }),
                      ],
                    }),
                    (0, t.jsxs)("span", {
                      className: "toggle",
                      style: { marginTop: 10 },
                      children: [
                        (0, t.jsx)("input", {
                          type: "checkbox",
                          checked: e.chime,
                          onChange: (e) => w({ chime: e.target.checked }),
                        }),
                        " Soft chime when a phase ends",
                      ],
                    }),
                    (0, t.jsxs)("span", {
                      className: "toggle",
                      children: [
                        (0, t.jsx)("input", {
                          type: "checkbox",
                          checked: e.hideFromRequests,
                          onChange: (e) => w({ hideFromRequests: e.target.checked }),
                        }),
                        " Hide me from study-room requests",
                      ],
                    }),
                    m && (0, t.jsx)("p", { className: "small muted", children: m }),
                    i.M &&
                      (0, t.jsx)("div", {
                        className: "actions",
                        children: (0, t.jsx)("button", {
                          className: "ghost small",
                          onClick: async () => {
                            (await (0, n._)(), (window.location.href = "/"));
                          },
                          children: "Sign out",
                        }),
                      }),
                  ],
                }),
              ],
            }),
            (0, t.jsxs)("section", {
              className: "card",
              style: { marginTop: 16 },
              children: [
                (0, t.jsx)("h2", { children: "Sittings" }),
                0 === l.length
                  ? (0, t.jsx)("p", {
                      className: "muted",
                      children: "No sittings yet. Any desk, any time.",
                    })
                  : (0, t.jsx)("ul", {
                      className: "history small",
                      children: l.map((e) =>
                        (0, t.jsxs)(
                          "li",
                          {
                            children: [
                              new Date(e.at).toLocaleString(),
                              " · ",
                              (0, r.l)(e.hallId)?.name ?? e.hallId,
                              " desk ",
                              e.seat,
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
            i.M &&
              (0, t.jsxs)("section", {
                className: "card",
                id: "delete-account",
                style: { marginTop: 16 },
                children: [
                  (0, t.jsx)("h2", { children: "Delete account" }),
                  (0, t.jsxs)("p", {
                    className: "small muted",
                    children: [
                      "This permanently deletes your Hush Hall account: your login and email address, profile and settings, sittings and recaps, desk notes and any share links, timetable, usual desks, walking position, blocks, requests, study-room memberships, notices, and reports you filed or that were filed about you. It can’t be undone. ",
                      (0, t.jsx)("a", { href: "/privacy#delete", children: "Privacy policy" }),
                    ],
                  }),
                  p
                    ? (0, t.jsxs)(t.Fragment, {
                        children: [
                          (0, t.jsx)("label", {
                            htmlFor: "confirm",
                            children: "Type DELETE to confirm",
                          }),
                          (0, t.jsx)("input", {
                            id: "confirm",
                            type: "text",
                            autoComplete: "off",
                            value: d,
                            onChange: (e) => u(e.target.value),
                          }),
                          (0, t.jsxs)("div", {
                            className: "actions",
                            children: [
                              (0, t.jsx)("button", {
                                className: "ghost",
                                disabled: "DELETE" !== d || g,
                                onClick: b,
                                children: g ? "Deleting…" : "Permanently delete my account",
                              }),
                              (0, t.jsx)("button", {
                                className: "ghost small",
                                disabled: g,
                                onClick: () => {
                                  (f(!1), u(""), S(""));
                                },
                                children: "Keep my account",
                              }),
                            ],
                          }),
                          _ && (0, t.jsx)("p", { className: "small muted", children: _ }),
                        ],
                      })
                    : (0, t.jsx)("div", {
                        className: "actions",
                        children: (0, t.jsx)("button", {
                          className: "ghost",
                          onClick: () => f(!0),
                          children: "Delete my account…",
                        }),
                      }),
                ],
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
      n = "hh.tabProfile",
      i = "hh.history",
      s = "hh.usualSeat";
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
    function o(e, t) {
      try {
        let a = e.getItem(t);
        return a ? JSON.parse(a) : null;
      } catch {
        return null;
      }
    }
    function l() {
      let e = o(sessionStorage, n);
      if (e) return e;
      let t = o(localStorage, a),
        i = { ...r(), ...(t ?? {}) };
      return ((i.id = r().id), sessionStorage.setItem(n, JSON.stringify(i)), i);
    }
    function c(e) {
      (sessionStorage.setItem(n, JSON.stringify(e)), localStorage.setItem(a, JSON.stringify(e)));
    }
    function d() {
      return (o(localStorage, i) ?? []).sort((e, t) => t.at - e.at);
    }
    function u(e) {
      let t = d();
      (t.unshift(e), localStorage.setItem(i, JSON.stringify(t.slice(0, 500))));
    }
    function m(e) {
      return o(localStorage, s)?.[e] ?? null;
    }
    function h(e, t) {
      let a = o(localStorage, s) ?? {};
      ((a[e] = t), localStorage.setItem(s, JSON.stringify(a)));
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
        l,
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
            n = new Date();
          (n.setDate(1), n.setHours(0, 0, 0, 0));
          let i = new Set(e.filter((e) => e.at >= n.getTime()).map((e) => t(e.at))).size,
            s = 0,
            r = new Date();
          for (
            r.setHours(12, 0, 0, 0), a.has(r.toDateString()) || r.setDate(r.getDate() - 1);
            a.has(r.toDateString());
          )
            (s++, r.setDate(r.getDate() - 1));
          let o = e.reduce((e, t) => e + t.minutes, 0);
          return { thisMonth: i, run: s, totalDays: a.size, totalMinutes: o };
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
      return (p = { state: "ready", profile: l(), email: "", isModerator: !1 });
      let a = (0, t.t)(),
        { data: n } = await a.auth.getSession(),
        i = n.session?.user;
      if (!i) return (p = { state: "signed_out" });
      let { data: s } = await a
        .from("profiles")
        .select(
          "id,nickname,avatar,color,hide_from_requests,focus_min,break_min,chime,rooms_suspended",
        )
        .eq("id", i.id)
        .maybeSingle();
      if (!s) return (p = { state: "needs_onboarding", email: i.email ?? "" });
      let { data: r } = await a.from("profiles").select("look").eq("id", i.id).maybeSingle(),
        { error: o } = await a.rpc("mod_queue", { p_status: "none" });
      return (p = {
        state: "ready",
        profile: {
          ...{
            id: s.id,
            name: s.nickname,
            avatar: s.avatar,
            color: s.color,
            hideFromRequests: s.hide_from_requests,
            focusMin: s.focus_min,
            breakMin: s.break_min,
            chime: s.chime,
            roomsPaused: s.rooms_suspended,
          },
          look: r?.look ?? "",
        },
        email: i.email ?? "",
        isModerator: !o,
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
      let n = { ...e, look: a };
      if ((p?.state === "ready" && (p = { ...p, profile: n }), !t.M)) return (c(n), !0);
      let { error: i } = await (0, t.t)().from("profiles").update({ look: a }).eq("id", e.id);
      return !i;
    }
    async function _() {
      ((p = null), t.M && (await (0, t.t)().auth.signOut()));
    }
    async function S() {
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
    async function w(e, a, n) {
      if (!t.M) return { ok: !0, sittingId: `local-${Date.now()}` };
      let { data: i, error: s } = await (0, t.t)().rpc("sit_down", {
        p_hall: e,
        p_seat: a,
        p_topic: n,
      });
      return s ? { ok: !1, reason: (0, t.y)(s) } : { ok: !0, sittingId: i };
    }
    async function b(e, a) {
      if (!t.M) return !0;
      let { data: n, error: i } = await (0, t.t)().rpc("heartbeat_sitting", {
        p_id: e,
        p_focused_minutes: Math.round(a),
      });
      return !i && !0 === n;
    }
    async function k(e, a, n, i) {
      if (!t.M) return (u({ ...i, at: Date.now(), minutes: a, note: n }), a);
      let { data: s } = await (0, t.t)().rpc("stand_up", {
        p_id: e,
        p_focused_minutes: Math.round(a),
        p_recap: n,
      });
      return "number" == typeof s ? s : a;
    }
    async function j(e) {
      if (!t.M) return m(e);
      let { data: a } = await (0, t.t)()
        .from("usual_seats")
        .select("seat")
        .eq("hall_id", e)
        .maybeSingle();
      return a?.seat ?? null;
    }
    async function x(e, a, n) {
      t.M
        ? await (0, t.t)().from("usual_seats").upsert({ user_id: n, hall_id: e, seat: a })
        : h(e, a);
    }
    async function M() {
      if (!t.M) return null;
      let { data: e } = await (0, t.t)().rpc("hall_counts");
      return Object.fromEntries((e ?? []).map((e) => [e.hall_id, e.seated]));
    }
    async function v(e, a, n, i, s) {
      if (!t.M || e.isDemo) {
        let t = "hh.reports",
          s = JSON.parse(localStorage.getItem(t) ?? "[]");
        return (
          s.push({ id: e.id, name: e.name, reason: a, note: n, hallId: i, at: Date.now() }),
          localStorage.setItem(t, JSON.stringify(s)),
          !0
        );
      }
      let { error: r } = await (0, t.t)().rpc("file_report", {
        p_reported: e.id,
        p_reason: a,
        p_note: n.slice(0, 500),
        p_hall: i,
        p_room: s,
        p_topic: e.topic,
      });
      return !r;
    }
    async function N() {
      if (!t.M) return [];
      let { data: e } = await (0, t.t)()
        .from("account_notices")
        .select("id,body")
        .is("read_at", null)
        .order("created_at");
      return e ?? [];
    }
    async function D(e) {
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
        D,
        "l",
        0,
        v,
        "e",
        0,
        M,
        "F",
        0,
        b,
        "Z",
        0,
        f,
        "k",
        0,
        S,
        "i",
        0,
        N,
        "X",
        0,
        function (e, a, n) {
          t.M &&
            n &&
            fetch("https://vhsyzhstzlwcwzmbckzr.supabase.co/rest/v1/rpc/stand_up", {
              method: "POST",
              keepalive: !0,
              headers: {
                "content-type": "application/json",
                apikey:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoc3l6aHN0emx3Y3d6bWJja3pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQzOTY2OTMsImV4cCI6MjEwOTk3MjY5M30.jNHZsR3gWcotcY1jC-14Pmkhnp5EPMFNmg2-tTvrUkc",
                authorization: `Bearer ${n}`,
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
        x,
        "_",
        0,
        _,
        "N",
        0,
        w,
        "r",
        0,
        k,
        "G",
        0,
        j,
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
      n = a.flatMap((e) => Array.from({ length: 6 }, (t, a) => `${e}${a + 1}`)),
      i = [
        { name: "Aarav", avatar: "🦉", topic: "Organic chem: SN1 vs SN2" },
        { name: "Meera", avatar: "🌿", topic: "GATE BT: enzyme kinetics" },
        { name: "Kabir", avatar: "🐢", topic: "DSA: graphs" },
        { name: "Isha", avatar: "📚", topic: "Thesis lit review" },
        { name: "Rohan", avatar: "☕", topic: "Linear algebra ch. 4" },
        { name: "Tara", avatar: "🌙", topic: "UPSC: polity notes" },
        { name: "Zoya", avatar: "🪴", topic: "Bioprocess eng. problem set" },
      ],
      s = ["#e9d8a6", "#d4a373", "#ccd5ae", "#b7c4cf", "#e6ccb2", "#c9ada7"];
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
          o = [];
        for (let l = 0; l < a; l++) {
          let a = i[(t + 3 * l) % i.length],
            c = (t + 7 * l) % n.length;
          for (; r.has(n[c]);) c = (c + 1) % n.length;
          (r.add(n[c]),
            o.push({
              id: `demo-${e}-${l}`,
              name: a.name,
              avatar: a.avatar,
              color: s[(t + l) % s.length],
              seat: n[c],
              topic: a.topic,
              phase: l % 4 == 3 ? "break" : "focus",
              phaseEndsAt: null,
              hideFromRequests: 1 === l,
              isDemo: !0,
              lastSeen: Date.now(),
            }));
        }
        return o;
      },
      "l",
      0,
      (e) => t.find((t) => t.id === e),
    ]);
  },
]);
