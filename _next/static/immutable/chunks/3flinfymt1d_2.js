(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  57222,
  (e) => {
    "use strict";
    var t = e.i(43476),
      a = e.i(71645),
      i = e.i(8687),
      n = e.i(33957);
    e.s([
      "default",
      0,
      function () {
        let [e, r] = (0, a.useState)(!1);
        return (
          (0, a.useEffect)(() => {
            if (!i.M) {
              window.location.href = "/";
              return;
            }
            let e = new URLSearchParams(window.location.search),
              t = e.get("next")?.startsWith("/") ? e.get("next") : "/",
              a = e.get("code");
            (async () => {
              let e = (0, i.t)(),
                { data: s } = await e.auth.getSession();
              if (
                (!s.session &&
                  a &&
                  (await e.auth.exchangeCodeForSession(a).catch(() => null),
                  (s = (await e.auth.getSession()).data)),
                !s.session)
              )
                return void r(!0);
              let o = await (0, n.Z)(!0);
              window.location.replace("needs_onboarding" === o.state ? "/welcome" : t);
            })();
          }, []),
          e
            ? (0, t.jsxs)("div", {
                className: "card narrow",
                children: [
                  (0, t.jsx)("h1", { children: "That link didn’t work" }),
                  (0, t.jsxs)("p", {
                    className: "muted",
                    children: [
                      "Sign-in links work once and expire after a while. Open the newest one in the same browser, or ",
                      (0, t.jsx)("a", { href: "/signin", children: "ask for a new link" }),
                      ".",
                    ],
                  }),
                ],
              })
            : (0, t.jsx)("p", { className: "muted", children: "Opening the library…" })
        );
      },
    ]);
  },
  33957,
  88624,
  (e) => {
    "use strict";
    var t = e.i(8687);
    let a = "hh.profile",
      i = "hh.tabProfile",
      n = "hh.history",
      r = "hh.usualSeat";
    function s() {
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
      let e = o(sessionStorage, i);
      if (e) return e;
      let t = o(localStorage, a),
        n = { ...s(), ...(t ?? {}) };
      return ((n.id = s().id), sessionStorage.setItem(i, JSON.stringify(n)), n);
    }
    function c(e) {
      (sessionStorage.setItem(i, JSON.stringify(e)), localStorage.setItem(a, JSON.stringify(e)));
    }
    function u() {
      return (o(localStorage, n) ?? []).sort((e, t) => t.at - e.at);
    }
    function d(e) {
      let t = u();
      (t.unshift(e), localStorage.setItem(n, JSON.stringify(t.slice(0, 500))));
    }
    function m(e) {
      return o(localStorage, r)?.[e] ?? null;
    }
    function f(e, t) {
      let a = o(localStorage, r) ?? {};
      ((a[e] = t), localStorage.setItem(r, JSON.stringify(a)));
    }
    e.s(
      [
        "l",
        0,
        ["🦉", "📖", "🌿", "☕", "🐢", "🌙", "🪴", "🦊", "🐼", "✏️"],
        "H",
        0,
        d,
        "k",
        0,
        u,
        "d",
        0,
        l,
        "M",
        0,
        c,
        "h",
        0,
        f,
        "E",
        0,
        function (e) {
          let t = (e) => new Date(e).toDateString(),
            a = new Set(e.map((e) => t(e.at))),
            i = new Date();
          (i.setDate(1), i.setHours(0, 0, 0, 0));
          let n = new Set(e.filter((e) => e.at >= i.getTime()).map((e) => t(e.at))).size,
            r = 0,
            s = new Date();
          for (
            s.setHours(12, 0, 0, 0), a.has(s.toDateString()) || s.setDate(s.getDate() - 1);
            a.has(s.toDateString());
          )
            (r++, s.setDate(s.getDate() - 1));
          let o = e.reduce((e, t) => e + t.minutes, 0);
          return { thisMonth: n, run: r, totalDays: a.size, totalMinutes: o };
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
    async function h(e = !1) {
      if (p && !e) return p;
      if (!t.M) return (p = { state: "ready", profile: l(), email: "", isModerator: !1 });
      let a = (0, t.t)(),
        { data: i } = await a.auth.getSession(),
        n = i.session?.user;
      if (!n) return (p = { state: "signed_out" });
      let { data: r } = await a
        .from("profiles")
        .select(
          "id,nickname,avatar,color,hide_from_requests,focus_min,break_min,chime,rooms_suspended",
        )
        .eq("id", n.id)
        .maybeSingle();
      if (!r) return (p = { state: "needs_onboarding", email: n.email ?? "" });
      let { data: s } = await a.from("profiles").select("look").eq("id", n.id).maybeSingle(),
        { error: o } = await a.rpc("mod_queue", { p_status: "none" });
      return (p = {
        state: "ready",
        profile: {
          ...{
            id: r.id,
            name: r.nickname,
            avatar: r.avatar,
            color: r.color,
            hideFromRequests: r.hide_from_requests,
            focusMin: r.focus_min,
            breakMin: r.break_min,
            chime: r.chime,
            roomsPaused: r.rooms_suspended,
          },
          look: s?.look ?? "",
        },
        email: n.email ?? "",
        isModerator: !o,
      });
    }
    async function _(e) {
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
    async function g(e, a) {
      let i = { ...e, look: a };
      if ((p?.state === "ready" && (p = { ...p, profile: i }), !t.M)) return (c(i), !0);
      let { error: n } = await (0, t.t)().from("profiles").update({ look: a }).eq("id", e.id);
      return !n;
    }
    async function w() {
      ((p = null), t.M && (await (0, t.t)().auth.signOut()));
    }
    async function S() {
      if (!t.M) return u();
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
    async function y(e, a, i) {
      if (!t.M) return { ok: !0, sittingId: `local-${Date.now()}` };
      let { data: n, error: r } = await (0, t.t)().rpc("sit_down", {
        p_hall: e,
        p_seat: a,
        p_topic: i,
      });
      return r ? { ok: !1, reason: (0, t.y)(r) } : { ok: !0, sittingId: n };
    }
    async function M(e, a) {
      if (!t.M) return !0;
      let { data: i, error: n } = await (0, t.t)().rpc("heartbeat_sitting", {
        p_id: e,
        p_focused_minutes: Math.round(a),
      });
      return !n && !0 === i;
    }
    async function b(e, a, i, n) {
      if (!t.M) return (d({ ...n, at: Date.now(), minutes: a, note: i }), a);
      let { data: r } = await (0, t.t)().rpc("stand_up", {
        p_id: e,
        p_focused_minutes: Math.round(a),
        p_recap: i,
      });
      return "number" == typeof r ? r : a;
    }
    async function k(e) {
      if (!t.M) return m(e);
      let { data: a } = await (0, t.t)()
        .from("usual_seats")
        .select("seat")
        .eq("hall_id", e)
        .maybeSingle();
      return a?.seat ?? null;
    }
    async function I(e, a, i) {
      t.M
        ? await (0, t.t)().from("usual_seats").upsert({ user_id: i, hall_id: e, seat: a })
        : f(e, a);
    }
    async function O() {
      if (!t.M) return null;
      let { data: e } = await (0, t.t)().rpc("hall_counts");
      return Object.fromEntries((e ?? []).map((e) => [e.hall_id, e.seated]));
    }
    async function D(e, a, i, n, r) {
      if (!t.M || e.isDemo) {
        let t = "hh.reports",
          r = JSON.parse(localStorage.getItem(t) ?? "[]");
        return (
          r.push({ id: e.id, name: e.name, reason: a, note: i, hallId: n, at: Date.now() }),
          localStorage.setItem(t, JSON.stringify(r)),
          !0
        );
      }
      let { error: s } = await (0, t.t)().rpc("file_report", {
        p_reported: e.id,
        p_reason: a,
        p_note: i.slice(0, 500),
        p_hall: n,
        p_room: r,
        p_topic: e.topic,
      });
      return !s;
    }
    async function J() {
      if (!t.M) return [];
      let { data: e } = await (0, t.t)()
        .from("account_notices")
        .select("id,body")
        .is("read_at", null)
        .order("created_at");
      return e ?? [];
    }
    async function N(e) {
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
        N,
        "l",
        0,
        D,
        "e",
        0,
        O,
        "F",
        0,
        M,
        "Z",
        0,
        h,
        "k",
        0,
        S,
        "i",
        0,
        J,
        "X",
        0,
        function (e, a, i) {
          t.M &&
            i &&
            fetch("https://vhsyzhstzlwcwzmbckzr.supabase.co/rest/v1/rpc/stand_up", {
              method: "POST",
              keepalive: !0,
              headers: {
                "content-type": "application/json",
                apikey:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoc3l6aHN0emx3Y3d6bWJja3pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQzOTY2OTMsImV4cCI6MjEwOTk3MjY5M30.jNHZsR3gWcotcY1jC-14Pmkhnp5EPMFNmg2-tTvrUkc",
                authorization: `Bearer ${i}`,
              },
              body: JSON.stringify({ p_id: e, p_focused_minutes: Math.round(a), p_recap: "" }),
            }).catch(() => {});
        },
        "T",
        0,
        g,
        "M",
        0,
        _,
        "h",
        0,
        I,
        "_",
        0,
        w,
        "N",
        0,
        y,
        "r",
        0,
        b,
        "G",
        0,
        k,
      ],
      33957,
    );
  },
]);
