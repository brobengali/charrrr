(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  81744,
  (e) => {
    "use strict";
    var t = e.i(43476),
      a = e.i(71645),
      n = e.i(8687),
      s = e.i(33957);
    let i = [
      { id: "none", label: "No action" },
      { id: "warn", label: "Warn (private notice)" },
      { id: "remove_topic", label: "Remove topic" },
      { id: "suspend_rooms", label: "Suspend rooms + requests" },
      { id: "ban", label: "Close account (ban)" },
      { id: "restore", label: "Lift all holds" },
    ];
    function r({ r: e, label: n, onDecide: s }) {
      let [o, l] = (0, a.useState)(e.action ?? "none"),
        [c, u] = (0, a.useState)(e.mod_note ?? ""),
        d =
          e.due_at &&
          Date.parse(e.due_at) < Date.now() &&
          ("open" === e.status || "reviewing" === e.status);
      return (0, t.jsxs)("section", {
        className: "card",
        style: { marginBottom: 12 },
        children: [
          (0, t.jsxs)("div", {
            className: "row",
            style: { justifyContent: "space-between" },
            children: [
              (0, t.jsxs)("b", { children: [n, e.urgent ? " · urgent" : ""] }),
              (0, t.jsxs)("span", {
                className: "small muted",
                children: [
                  new Date(e.created_at).toLocaleString(),
                  " · ",
                  e.status,
                  e.due_at
                    ? ` \xb7 act by ${new Date(e.due_at).toLocaleString()}${d ? " (past due)" : ""}`
                    : "",
                ],
              }),
            ],
          }),
          (0, t.jsxs)("p", {
            className: "small",
            children: [
              "Reported: ",
              (0, t.jsx)("b", { children: e.reported_nickname }),
              e.reported_topic ? ` \xb7 topic “${e.reported_topic}”` : "",
              " · ",
              e.reports_on_account,
              " report",
              1 === e.reports_on_account ? "" : "s",
              " on this account",
              e.account_flags ? ` \xb7 now: ${e.account_flags}` : "",
            ],
          }),
          (0, t.jsxs)("p", {
            className: "small muted",
            children: [
              "From: ",
              e.reporter_nickname ?? "(deleted account)",
              " · ",
              e.hall_id ? `hall ${e.hall_id}` : e.room_id ? "study room" : "—",
            ],
          }),
          e.note && (0, t.jsxs)("p", { className: "small", children: ["“", e.note, "”"] }),
          (0, t.jsxs)("div", {
            className: "row",
            style: { gap: 8, flexWrap: "wrap" },
            children: [
              (0, t.jsx)("select", {
                value: o,
                onChange: (e) => l(e.target.value),
                style: { width: "auto" },
                children: i.map((e) =>
                  (0, t.jsx)("option", { value: e.id, children: e.label }, e.id),
                ),
              }),
              (0, t.jsx)("input", {
                type: "text",
                maxLength: 500,
                placeholder: "Private note (optional)",
                value: c,
                onChange: (e) => u(e.target.value),
                style: { flex: 1, minWidth: 180 },
              }),
              (0, t.jsx)("button", {
                className: "ghost small",
                onClick: () => s(e, "reviewing", e.action ?? "none", c),
                children: "Mark in review",
              }),
              (0, t.jsx)("button", {
                className: "ghost small",
                onClick: () => s(e, "dismissed", "none", c),
                children: "Dismiss",
              }),
              (0, t.jsx)("button", {
                className: "sage small",
                onClick: () => s(e, "actioned", o, c),
                children: "Save action",
              }),
            ],
          }),
        ],
      });
    }
    e.s([
      "default",
      0,
      function () {
        let [e, i] = (0, a.useState)(null),
          [o, l] = (0, a.useState)("open"),
          [c, u] = (0, a.useState)(!1),
          [d, m] = (0, a.useState)(""),
          p = (0, a.useCallback)(async () => {
            let { data: e, error: t } = await (0, n.t)().rpc("mod_queue", { p_status: o });
            t ? u(!0) : i(e);
          }, [o]);
        (0, a.useEffect)(() => {
          n.M && p();
        }, [p]);
        let h = async (e, t, a, s) => {
          (m(
            (await (0, n.G)("/api/mod/act", { id: e.id, status: t, action: a, note: s })).ok
              ? "Saved."
              : "Couldn’t save that decision.",
          ),
            p());
        };
        return n.M
          ? c
            ? (0, t.jsx)("p", {
                className: "muted",
                children: "This page is only for Hush Hall moderators.",
              })
            : e
              ? (0, t.jsxs)("div", {
                  children: [
                    (0, t.jsxs)("div", {
                      className: "hall-head",
                      children: [
                        (0, t.jsx)("h1", { children: "Report queue" }),
                        (0, t.jsxs)("select", {
                          value: o,
                          onChange: (e) => l(e.target.value),
                          style: { width: "auto" },
                          children: [
                            (0, t.jsx)("option", { value: "open", children: "Open and in review" }),
                            (0, t.jsx)("option", { value: "actioned", children: "Actioned" }),
                            (0, t.jsx)("option", { value: "dismissed", children: "Dismissed" }),
                            (0, t.jsx)("option", { value: "all", children: "All" }),
                          ],
                        }),
                      ],
                    }),
                    (0, t.jsx)("p", {
                      className: "small muted",
                      children:
                        "Check once a day. Urgent reports (harassment and safety) show an “act by” time 24 hours after they were filed.",
                    }),
                    d && (0, t.jsx)("p", { className: "small muted", children: d }),
                    0 === e.length &&
                      (0, t.jsx)("p", { className: "muted", children: "Nothing here. Quiet day." }),
                    e.map((e) => {
                      let a;
                      return (0, t.jsx)(
                        r,
                        {
                          r: e,
                          label: ((a = e.reason), s.L.find((e) => e.id === a)?.label ?? a),
                          onDecide: h,
                        },
                        e.id,
                      );
                    }),
                  ],
                })
              : (0, t.jsx)("p", { className: "muted", children: "Loading the queue…" })
          : (0, t.jsx)("p", {
              className: "muted",
              children: "The report queue needs the real backend (demo mode has no server).",
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
      s = "hh.history",
      i = "hh.usualSeat";
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
        s = { ...r(), ...(t ?? {}) };
      return ((s.id = r().id), sessionStorage.setItem(n, JSON.stringify(s)), s);
    }
    function c(e) {
      (sessionStorage.setItem(n, JSON.stringify(e)), localStorage.setItem(a, JSON.stringify(e)));
    }
    function u() {
      return (o(localStorage, s) ?? []).sort((e, t) => t.at - e.at);
    }
    function d(e) {
      let t = u();
      (t.unshift(e), localStorage.setItem(s, JSON.stringify(t.slice(0, 500))));
    }
    function m(e) {
      return o(localStorage, i)?.[e] ?? null;
    }
    function p(e, t) {
      let a = o(localStorage, i) ?? {};
      ((a[e] = t), localStorage.setItem(i, JSON.stringify(a)));
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
        p,
        "E",
        0,
        function (e) {
          let t = (e) => new Date(e).toDateString(),
            a = new Set(e.map((e) => t(e.at))),
            n = new Date();
          (n.setDate(1), n.setHours(0, 0, 0, 0));
          let s = new Set(e.filter((e) => e.at >= n.getTime()).map((e) => t(e.at))).size,
            i = 0,
            r = new Date();
          for (
            r.setHours(12, 0, 0, 0), a.has(r.toDateString()) || r.setDate(r.getDate() - 1);
            a.has(r.toDateString());
          )
            (i++, r.setDate(r.getDate() - 1));
          let o = e.reduce((e, t) => e + t.minutes, 0);
          return { thisMonth: s, run: i, totalDays: a.size, totalMinutes: o };
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
    let h = null;
    async function f(e = !1) {
      if (h && !e) return h;
      if (!t.M) return (h = { state: "ready", profile: l(), email: "", isModerator: !1 });
      let a = (0, t.t)(),
        { data: n } = await a.auth.getSession(),
        s = n.session?.user;
      if (!s) return (h = { state: "signed_out" });
      let { data: i } = await a
        .from("profiles")
        .select(
          "id,nickname,avatar,color,hide_from_requests,focus_min,break_min,chime,rooms_suspended",
        )
        .eq("id", s.id)
        .maybeSingle();
      if (!i) return (h = { state: "needs_onboarding", email: s.email ?? "" });
      let { data: r } = await a.from("profiles").select("look").eq("id", s.id).maybeSingle(),
        { error: o } = await a.rpc("mod_queue", { p_status: "none" });
      return (h = {
        state: "ready",
        profile: {
          ...{
            id: i.id,
            name: i.nickname,
            avatar: i.avatar,
            color: i.color,
            hideFromRequests: i.hide_from_requests,
            focusMin: i.focus_min,
            breakMin: i.break_min,
            chime: i.chime,
            roomsPaused: i.rooms_suspended,
          },
          look: r?.look ?? "",
        },
        email: s.email ?? "",
        isModerator: !o,
      });
    }
    async function _(e) {
      if ((h?.state === "ready" && (h = { ...h, profile: e }), !t.M)) return (c(e), !0);
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
      let n = { ...e, look: a };
      if ((h?.state === "ready" && (h = { ...h, profile: n }), !t.M)) return (c(n), !0);
      let { error: s } = await (0, t.t)().from("profiles").update({ look: a }).eq("id", e.id);
      return !s;
    }
    async function y() {
      ((h = null), t.M && (await (0, t.t)().auth.signOut()));
    }
    async function b() {
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
    async function S(e, a, n) {
      if (!t.M) return { ok: !0, sittingId: `local-${Date.now()}` };
      let { data: s, error: i } = await (0, t.t)().rpc("sit_down", {
        p_hall: e,
        p_seat: a,
        p_topic: n,
      });
      return i ? { ok: !1, reason: (0, t.y)(i) } : { ok: !0, sittingId: s };
    }
    async function w(e, a) {
      if (!t.M) return !0;
      let { data: n, error: s } = await (0, t.t)().rpc("heartbeat_sitting", {
        p_id: e,
        p_focused_minutes: Math.round(a),
      });
      return !s && !0 === n;
    }
    async function v(e, a, n, s) {
      if (!t.M) return (d({ ...s, at: Date.now(), minutes: a, note: n }), a);
      let { data: i } = await (0, t.t)().rpc("stand_up", {
        p_id: e,
        p_focused_minutes: Math.round(a),
        p_recap: n,
      });
      return "number" == typeof i ? i : a;
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
        : p(e, a);
    }
    async function M() {
      if (!t.M) return null;
      let { data: e } = await (0, t.t)().rpc("hall_counts");
      return Object.fromEntries((e ?? []).map((e) => [e.hall_id, e.seated]));
    }
    async function k(e, a, n, s, i) {
      if (!t.M || e.isDemo) {
        let t = "hh.reports",
          i = JSON.parse(localStorage.getItem(t) ?? "[]");
        return (
          i.push({ id: e.id, name: e.name, reason: a, note: n, hallId: s, at: Date.now() }),
          localStorage.setItem(t, JSON.stringify(i)),
          !0
        );
      }
      let { error: r } = await (0, t.t)().rpc("file_report", {
        p_reported: e.id,
        p_reason: a,
        p_note: n.slice(0, 500),
        p_hall: s,
        p_room: i,
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
        k,
        "e",
        0,
        M,
        "F",
        0,
        w,
        "Z",
        0,
        f,
        "k",
        0,
        b,
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
        g,
        "M",
        0,
        _,
        "h",
        0,
        x,
        "_",
        0,
        y,
        "N",
        0,
        S,
        "r",
        0,
        v,
        "G",
        0,
        j,
      ],
      33957,
    );
  },
]);
