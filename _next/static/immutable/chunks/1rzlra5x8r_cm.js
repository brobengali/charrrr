(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  61073,
  (e) => {
    "use strict";
    var t = e.i(43476),
      a = e.i(71645),
      n = e.i(33957),
      r = e.i(8687),
      i = e.i(88624);
    let s = ["#e9d8a6", "#d4a373", "#ccd5ae", "#b7c4cf", "#e6ccb2", "#c9ada7"];
    e.s(
      [
        "default",
        0,
        function () {
          let [e, o] = (0, a.useState)(""),
            [l, c] = (0, a.useState)(""),
            [u, d] = (0, a.useState)(""),
            [m, h] = (0, a.useState)(i.l[0]),
            [p, f] = (0, a.useState)(s[0]),
            [g, _] = (0, a.useState)(!1),
            [y, b] = (0, a.useState)(""),
            [S, w] = (0, a.useState)(!1),
            [k, M] = (0, a.useState)(!1);
          (0, a.useEffect)(() => {
            (0, n.Z)(!0).then((e) => {
              false
                ? (window.location.href = "/signin")
                : "ready" === e.state
                  ? (window.location.href = "/")
                  : o(e.email);
            });
          }, []);
          let v = async (e) => {
            if (
              (e.preventDefault(),
              null ===
                (function (e, t = new Date()) {
                  let a = /^(\d{4})-(\d{2})-(\d{2})$/.exec(e);
                  if (!a) return null;
                  let [n, r, i] = [Number(a[1]), Number(a[2]), Number(a[3])],
                    s = new Date(Date.UTC(n, r - 1, i));
                  if (s.getUTCFullYear() !== n || s.getUTCMonth() !== r - 1 || s.getUTCDate() !== i)
                    return null;
                  let o = t.getFullYear() - n;
                  return (
                    (t.getMonth() + 1 < r || (t.getMonth() + 1 === r && t.getDate() < i)) && o--,
                    o >= 0 && o < 130 ? o : null
                  );
                })(l))
            )
              return void b("Please enter your date of birth.");
            (w(!0), b(""));
            let t = await (0, r.G)("/api/onboarding", {
              birthDate: l,
              nickname: u,
              avatar: m,
              color: p,
              acceptTerms: g,
            });
            (w(!1), "under18" === t.data.reason)
              ? M(!0)
              : t.ok
                ? (await (0, n.Z)(!0), (window.location.href = "/"))
                : b(
                    "nickname_not_allowed" === t.data.reason
                      ? "That nickname can’t be used. Try another?"
                      : "terms" === t.data.reason
                        ? "Please read and accept the house rules to continue."
                        : "Something went wrong. Please try again.",
                  );
          };
          return k
            ? (0, t.jsxs)("div", {
                className: "card narrow",
                children: [
                  (0, t.jsx)("h1", { children: "Hush Hall is for 18+ for now" }),
                  (0, t.jsx)("p", {
                    className: "muted",
                    children:
                      "We can’t create an account for people under 18 yet, so nothing was saved and the sign-in was removed. Thank you for understanding.",
                  }),
                ],
              })
            : (0, t.jsxs)("form", {
                className: "card narrow",
                onSubmit: v,
                children: [
                  (0, t.jsx)("h1", { children: "Your library card" }),
                  e &&
                    (0, t.jsxs)("p", { className: "small muted", children: ["Signed in as ", e] }),
                  (0, t.jsx)("label", { htmlFor: "dob", children: "Date of birth" }),
                  (0, t.jsx)("input", {
                    id: "dob",
                    type: "date",
                    required: !0,
                    value: l,
                    onChange: (e) => c(e.target.value),
                    max: new Date().toISOString().slice(0, 10),
                  }),
                  (0, t.jsxs)("p", {
                    className: "small muted",
                    children: [
                      "Hush Hall is for people aged ",
                      18,
                      "+. We use your date of birth only for this check and don’t store it.",
                    ],
                  }),
                  (0, t.jsx)("label", {
                    htmlFor: "nick",
                    children: "Nickname (shown on your desk)",
                  }),
                  (0, t.jsx)("input", {
                    id: "nick",
                    type: "text",
                    required: !0,
                    maxLength: 24,
                    value: u,
                    onChange: (e) => d(e.target.value),
                    placeholder: "e.g. Owl",
                  }),
                  (0, t.jsx)("p", {
                    className: "small muted",
                    children:
                      "Your desk shows only your nickname, avatar and current topic. Please don’t use your real full name.",
                  }),
                  (0, t.jsx)("label", { children: "Avatar" }),
                  (0, t.jsx)("div", {
                    className: "avatars",
                    children: i.l.map((e) =>
                      (0, t.jsx)(
                        "button",
                        {
                          type: "button",
                          className: `avatar-pick ${m === e ? "on" : ""}`,
                          onClick: () => h(e),
                          "aria-label": `avatar ${e}`,
                          children: e,
                        },
                        e,
                      ),
                    ),
                  }),
                  (0, t.jsx)("label", { children: "Desk lamp" }),
                  (0, t.jsx)("div", {
                    className: "avatars",
                    children: s.map((e) =>
                      (0, t.jsx)(
                        "button",
                        {
                          type: "button",
                          className: `avatar-pick ${p === e ? "on" : ""}`,
                          style: { background: e },
                          onClick: () => f(e),
                          "aria-label": `lamp colour ${e}`,
                        },
                        e,
                      ),
                    ),
                  }),
                  (0, t.jsxs)("span", {
                    className: "toggle",
                    style: { marginTop: 14 },
                    children: [
                      (0, t.jsx)("input", {
                        type: "checkbox",
                        checked: g,
                        onChange: (e) => _(e.target.checked),
                      }),
                      "I’ve read and agree to the ",
                      (0, t.jsx)("a", {
                        href: "/rules",
                        target: "_blank",
                        children: "house rules, terms",
                      }),
                      " and ",
                      (0, t.jsx)("a", {
                        href: "/privacy",
                        target: "_blank",
                        children: "privacy policy",
                      }),
                      ".",
                    ],
                  }),
                  y && (0, t.jsx)("p", { className: "small muted", children: y }),
                  (0, t.jsx)("div", {
                    className: "actions",
                    children: (0, t.jsx)("button", {
                      type: "submit",
                      className: "sage",
                      disabled: S || !g || !u.trim() || !l,
                      children: S ? "One moment…" : "Walk in",
                    }),
                  }),
                ],
              });
        },
      ],
      61073,
    );
  },
  33957,
  88624,
  (e) => {
    "use strict";
    var t = e.i(8687);
    let a = "hh.profile",
      n = "hh.tabProfile",
      r = "hh.history",
      i = "hh.usualSeat";
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
      let e = o(sessionStorage, n);
      if (e) return e;
      let t = o(localStorage, a),
        r = { ...s(), ...(t ?? {}) };
      return ((r.id = s().id), sessionStorage.setItem(n, JSON.stringify(r)), r);
    }
    function c(e) {
      (sessionStorage.setItem(n, JSON.stringify(e)), localStorage.setItem(a, JSON.stringify(e)));
    }
    function u() {
      return (o(localStorage, r) ?? []).sort((e, t) => t.at - e.at);
    }
    function d(e) {
      let t = u();
      (t.unshift(e), localStorage.setItem(r, JSON.stringify(t.slice(0, 500))));
    }
    function m(e) {
      return o(localStorage, i)?.[e] ?? null;
    }
    function h(e, t) {
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
        h,
        "E",
        0,
        function (e) {
          let t = (e) => new Date(e).toDateString(),
            a = new Set(e.map((e) => t(e.at))),
            n = new Date();
          (n.setDate(1), n.setHours(0, 0, 0, 0));
          let r = new Set(e.filter((e) => e.at >= n.getTime()).map((e) => t(e.at))).size,
            i = 0,
            s = new Date();
          for (
            s.setHours(12, 0, 0, 0), a.has(s.toDateString()) || s.setDate(s.getDate() - 1);
            a.has(s.toDateString());
          )
            (i++, s.setDate(s.getDate() - 1));
          let o = e.reduce((e, t) => e + t.minutes, 0);
          return { thisMonth: r, run: i, totalDays: a.size, totalMinutes: o };
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
        r = n.session?.user;
      if (!r) return (p = { state: "signed_out" });
      let { data: i } = await a
        .from("profiles")
        .select(
          "id,nickname,avatar,color,hide_from_requests,focus_min,break_min,chime,rooms_suspended",
        )
        .eq("id", r.id)
        .maybeSingle();
      if (!i) return (p = { state: "needs_onboarding", email: r.email ?? "" });
      let { data: s } = await a.from("profiles").select("look").eq("id", r.id).maybeSingle(),
        { error: o } = await a.rpc("mod_queue", { p_status: "none" });
      return (p = {
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
          look: s?.look ?? "",
        },
        email: r.email ?? "",
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
    async function _(e, a) {
      let n = { ...e, look: a };
      if ((p?.state === "ready" && (p = { ...p, profile: n }), !t.M)) return (c(n), !0);
      let { error: r } = await (0, t.t)().from("profiles").update({ look: a }).eq("id", e.id);
      return !r;
    }
    async function y() {
      ((p = null), t.M && (await (0, t.t)().auth.signOut()));
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
      let { data: r, error: i } = await (0, t.t)().rpc("sit_down", {
        p_hall: e,
        p_seat: a,
        p_topic: n,
      });
      return i ? { ok: !1, reason: (0, t.y)(i) } : { ok: !0, sittingId: r };
    }
    async function w(e, a) {
      if (!t.M) return !0;
      let { data: n, error: r } = await (0, t.t)().rpc("heartbeat_sitting", {
        p_id: e,
        p_focused_minutes: Math.round(a),
      });
      return !r && !0 === n;
    }
    async function k(e, a, n, r) {
      if (!t.M) return (d({ ...r, at: Date.now(), minutes: a, note: n }), a);
      let { data: i } = await (0, t.t)().rpc("stand_up", {
        p_id: e,
        p_focused_minutes: Math.round(a),
        p_recap: n,
      });
      return "number" == typeof i ? i : a;
    }
    async function M(e) {
      if (!t.M) return m(e);
      let { data: a } = await (0, t.t)()
        .from("usual_seats")
        .select("seat")
        .eq("hall_id", e)
        .maybeSingle();
      return a?.seat ?? null;
    }
    async function v(e, a, n) {
      t.M
        ? await (0, t.t)().from("usual_seats").upsert({ user_id: n, hall_id: e, seat: a })
        : h(e, a);
    }
    async function j() {
      if (!t.M) return null;
      let { data: e } = await (0, t.t)().rpc("hall_counts");
      return Object.fromEntries((e ?? []).map((e) => [e.hall_id, e.seated]));
    }
    async function x(e, a, n, r, i) {
      if (!t.M || e.isDemo) {
        let t = "hh.reports",
          i = JSON.parse(localStorage.getItem(t) ?? "[]");
        return (
          i.push({ id: e.id, name: e.name, reason: a, note: n, hallId: r, at: Date.now() }),
          localStorage.setItem(t, JSON.stringify(i)),
          !0
        );
      }
      let { error: s } = await (0, t.t)().rpc("file_report", {
        p_reported: e.id,
        p_reason: a,
        p_note: n.slice(0, 500),
        p_hall: r,
        p_room: i,
        p_topic: e.topic,
      });
      return !s;
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
        x,
        "e",
        0,
        j,
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
        _,
        "M",
        0,
        g,
        "h",
        0,
        v,
        "_",
        0,
        y,
        "N",
        0,
        S,
        "r",
        0,
        k,
        "G",
        0,
        M,
      ],
      33957,
    );
  },
]);
