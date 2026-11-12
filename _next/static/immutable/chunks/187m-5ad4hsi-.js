(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  81408,
  (e) => {
    e.v((t) =>
      Promise.all(["static/immutable/chunks/1ujoa_htfxyb9.js"].map((t) => e.l(t))).then(() =>
        t(93025),
      ),
    );
  },
  69795,
  (e) => {
    "use strict";
    var t = e.i(39455);
    let a = [-4.45, -3.55, 1.55, 2.45],
      i = [1, -1, 1, -1],
      n = t.X.flatMap((e, n) =>
        Array.from({ length: t.m }, (r, o) => ({
          seat: `${e}${o + 1}`,
          x: (o - (t.m - 1) / 2) * 2.5 + (o >= t.m / 2 ? 0.7 : -0.7),
          deskZ: a[n],
          chairZ: a[n] - 0.78 * i[n],
          facing: i[n],
        })),
      ),
      r = new Map(n.map((e) => [e.seat, e]));
    e.s([
      "P",
      0,
      n,
      "E",
      0,
      r,
      "C",
      0,
      { minX: -10.5, maxX: 10.5, minZ: -7.6, maxZ: 7.2, height: 6 },
    ]);
  },
  79951,
  (e) => {
    "use strict";
    let t = { top: "orig", neck: "on", shoes: "on" },
      a = new Set(["sendagaya_shibu.vrm", "sendagaya_shino.vrm", "sakurada_fumiriya.vrm"]);
    e.s([
      "X",
      0,
      {
        "sendagaya_shibu.vrm": "/looks/sendagaya_shibu.body-bare.png",
        "sendagaya_shino.vrm": "/looks/sendagaya_shino.body-bare.png",
        "vivi.vrm": "/looks/vivi.body-bare.png",
        "victoria_rubin.vrm": "/looks/victoria_rubin.body-bare.png",
        "vita.vrm": "/looks/vita.body-bare.png",
        "sakurada_fumiriya.vrm": "/looks/sakurada_fumiriya.body-bare.png",
        "hairsample_male.vrm": "/looks/hairsample_male.body-bare.png",
      },
      "R",
      0,
      a,
      "S",
      0,
      { orig: "Original", blue: "Soft blue", sage: "Sage" },
      "y",
      0,
      { orig: null, blue: "#a3b0d6", sage: "#aec4ad" },
      "D",
      0,
      function (e) {
        let t = [];
        return (
          "orig" !== e.top && t.push(`top=${e.top}`),
          "on" !== e.neck && t.push(`neck=${e.neck}`),
          "on" !== e.shoes && t.push(`shoes=${e.shoes}`),
          t.join(";")
        );
      },
      "E",
      0,
      function (e) {
        let a = { ...t };
        for (let t of (e ?? "").split(";")) {
          let [e, i] = t.split("=");
          ("top" === e && ("orig" === i || "blue" === i || "sage" === i) && (a.top = i),
            "neck" === e && ("on" === i || "off" === i) && (a.neck = i),
            "shoes" === e && ("on" === i || "off" === i) && (a.shoes = i));
        }
        return a;
      },
    ]);
  },
  61064,
  (e) => {
    "use strict";
    let t = [
        { file: "sendagaya_shibu.vrm", name: "Sendagaya Shibu" },
        { file: "vivi.vrm", name: "Vivi" },
        { file: "sakurada_fumiriya.vrm", name: "Sakurada Fumiriya" },
        { file: "victoria_rubin.vrm", name: "Victoria Rubin" },
        { file: "hairsample_male.vrm", name: "HairSample_Male" },
        { file: "vita.vrm", name: "Vita" },
        { file: "sendagaya_shino.vrm", name: "Sendagaya Shino" },
      ],
      a = (e) => [...e].reduce((e, t) => (33 * e + t.charCodeAt(0)) >>> 0, 5381),
      i = { Aarav: 2, Meera: 1, Kabir: 4, Isha: 6, Rohan: 2, Tara: 0, Zoya: 3 };
    function n(e, n, r) {
      let o = a(e + n);
      return t[r && r in i ? i[r] : o % t.length];
    }
    function r(e, t) {
      let a = [...new Set([...e].map((e) => e.id))].sort();
      return (
        t && a.includes(t) && a.sort((e, a) => (e === t ? -1 : +(a === t))),
        new Set(a.slice(0, 12))
      );
    }
    let o = new Map();
    function s(e) {
      if (!o.has(e)) {
        let t = fetch(`/models/${e}`, { priority: "low" }).then((t) => {
          if (!t.ok) throw Error(`${e}: HTTP ${t.status}`);
          return t.arrayBuffer();
        });
        (t.catch(() => o.delete(e)), o.set(e, t));
      }
      return o.get(e);
    }
    e.s([
      "w",
      0,
      s,
      "R",
      0,
      a,
      "f",
      0,
      n,
      "X",
      0,
      function (e) {
        let t = [...e],
          a = r(t);
        for (let e of t) a.has(e.id) && s(n(e.id, e.color, e.name).file).catch(() => {});
      },
      "s",
      0,
      r,
    ]);
  },
  51125,
  (e) => {
    "use strict";
    var t = e.i(69795);
    let a = [
        ...t.P.map((e) => ({
          x0: e.x - 0.85,
          x1: e.x + 0.85,
          z0: e.deskZ - 0.43,
          z1: e.deskZ + 0.43,
        })),
        ...t.P.map((e) => {
          let t = e.chairZ + 0.27 * e.facing,
            a = e.chairZ - 0.52 * e.facing;
          return { x0: e.x - 0.3, x1: e.x + 0.4, z0: Math.min(t, a), z1: Math.max(t, a) };
        }),
        ...[t.C.minX + 0.7, -6.6, 6.6, t.C.maxX - 0.8].map((e) => ({
          x0: e - 0.4,
          x1: e + 0.4,
          z0: t.C.minZ + 0.4,
          z1: t.C.minZ + 1.25,
        })),
      ],
      i = {
        minX: t.C.minX + 0.85,
        maxX: t.C.maxX - 0.5,
        minZ: t.C.minZ + 0.85,
        maxZ: t.C.maxZ - 0.85,
      };
    function n(e, t = 0.23, r) {
      for (let n = 0; n < 2; n++) {
        if (r)
          for (let a of r) {
            let i = e.x - a.x,
              n = e.z - a.z,
              r = Math.hypot(i, n),
              o = t + a.r;
            r >= o ||
              (r > 1e-6 ? ((e.x = a.x + (i / r) * o), (e.z = a.z + (n / r) * o)) : (e.x = a.x + o));
          }
        for (let i of a) {
          let a = Math.min(Math.max(e.x, i.x0), i.x1),
            n = Math.min(Math.max(e.z, i.z0), i.z1),
            r = e.x - a,
            o = e.z - n,
            s = r * r + o * o;
          if (s >= t * t) continue;
          if (s > 1e-10) {
            let i = Math.sqrt(s);
            ((e.x = a + (r / i) * t), (e.z = n + (o / i) * t));
            continue;
          }
          let l = [e.x - i.x0, i.x1 - e.x, e.z - i.z0, i.z1 - e.z],
            u = l.indexOf(Math.min(...l));
          0 === u
            ? (e.x = i.x0 - t)
            : 1 === u
              ? (e.x = i.x1 + t)
              : 2 === u
                ? (e.z = i.z0 - t)
                : (e.z = i.z1 + t);
        }
        ((e.x = Math.min(Math.max(e.x, i.minX), i.maxX)),
          (e.z = Math.min(Math.max(e.z, i.minZ), i.maxZ)));
      }
      return e;
    }
    let r = t.P.filter((e) => e.seat.startsWith("A") || e.seat.startsWith("C"))
        .flatMap((e) => {
          let a = t.P.filter((t) => t.deskZ === e.deskZ)
              .map((e) => e.x)
              .sort((e, t) => e - t),
            i = a.indexOf(e.x);
          if (i === a.length - 1) return [];
          let n = e.facing > 0 ? e.deskZ + 0.86 : e.deskZ - 0.86;
          return [
            {
              x: (a[i] + a[i + 1]) / 2,
              half: (a[i + 1] - a[i] - 1.7) / 2,
              z0: Math.min(e.deskZ, n) - 0.43,
              z1: Math.max(e.deskZ, n) + 0.43,
            },
          ];
        })
        .filter((e) => e.half < 0.6),
      o = { x: 0, z: 5.4, ry: Math.PI };
    e.s([
      "r",
      0,
      3.2,
      "Q",
      0,
      4.5,
      "z",
      0,
      o,
      "s",
      0,
      0.42,
      "g",
      0,
      1.45,
      "x",
      0,
      6,
      "F",
      0,
      1,
      "W",
      0,
      function (e, t, a, i) {
        let n = Math.hypot(a, i);
        if (n < 0.15 || Math.abs(i) < 1.2 * Math.abs(a)) return a;
        for (let o of r) {
          if (t < o.z0 - 0.7 || t > o.z1 + 0.7) continue;
          let r = o.x - e;
          if (!(Math.abs(r) > o.half + 0.35))
            return a + (Math.abs(i) / n) * Math.max(-0.5, Math.min(0.5, 3 * r));
        }
        return a;
      },
      "l",
      0,
      function (e, t) {
        let a = (t - e) % (2 * Math.PI);
        return (a > Math.PI && (a -= 2 * Math.PI), a < -Math.PI && (a += 2 * Math.PI), a);
      },
      "X",
      0,
      n,
      "J",
      0,
      (e, t) => 1 - Math.exp(-e * t),
      "A",
      0,
      function (e) {
        let a = t.E.get(e);
        if (!a) return { ...o };
        let i = n({ x: a.x, z: a.chairZ - 0.85 * a.facing });
        return { x: i.x, z: i.z, ry: a.facing > 0 ? Math.PI : 0 };
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
    function o() {
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
    function s(e, t) {
      try {
        let a = e.getItem(t);
        return a ? JSON.parse(a) : null;
      } catch {
        return null;
      }
    }
    function l() {
      let e = s(sessionStorage, i);
      if (e) return e;
      let t = s(localStorage, a),
        n = { ...o(), ...(t ?? {}) };
      return ((n.id = o().id), sessionStorage.setItem(i, JSON.stringify(n)), n);
    }
    function u(e) {
      (sessionStorage.setItem(i, JSON.stringify(e)), localStorage.setItem(a, JSON.stringify(e)));
    }
    function c() {
      return (s(localStorage, n) ?? []).sort((e, t) => t.at - e.at);
    }
    function m(e) {
      let t = c();
      (t.unshift(e), localStorage.setItem(n, JSON.stringify(t.slice(0, 500))));
    }
    function d(e) {
      return s(localStorage, r)?.[e] ?? null;
    }
    function f(e, t) {
      let a = s(localStorage, r) ?? {};
      ((a[e] = t), localStorage.setItem(r, JSON.stringify(a)));
    }
    e.s(
      [
        "l",
        0,
        ["🦉", "📖", "🌿", "☕", "🐢", "🌙", "🪴", "🦊", "🐼", "✏️"],
        "H",
        0,
        m,
        "k",
        0,
        c,
        "d",
        0,
        l,
        "M",
        0,
        u,
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
            o = new Date();
          for (
            o.setHours(12, 0, 0, 0), a.has(o.toDateString()) || o.setDate(o.getDate() - 1);
            a.has(o.toDateString());
          )
            (r++, o.setDate(o.getDate() - 1));
          let s = e.reduce((e, t) => e + t.minutes, 0);
          return { thisMonth: n, run: r, totalDays: a.size, totalMinutes: s };
        },
        "F",
        0,
        d,
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
    async function p(e = !1) {
      if (h && !e) return h;
      if (!t.M) return (h = { state: "ready", profile: l(), email: "", isModerator: !1 });
      let a = (0, t.t)(),
        { data: i } = await a.auth.getSession(),
        n = i.session?.user;
      if (!n) return (h = { state: "signed_out" });
      let { data: r } = await a
        .from("profiles")
        .select(
          "id,nickname,avatar,color,hide_from_requests,focus_min,break_min,chime,rooms_suspended",
        )
        .eq("id", n.id)
        .maybeSingle();
      if (!r) return (h = { state: "needs_onboarding", email: n.email ?? "" });
      let { data: o } = await a.from("profiles").select("look").eq("id", n.id).maybeSingle(),
        { error: s } = await a.rpc("mod_queue", { p_status: "none" });
      return (h = {
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
          look: o?.look ?? "",
        },
        email: n.email ?? "",
        isModerator: !s,
      });
    }
    async function g(e) {
      if ((h?.state === "ready" && (h = { ...h, profile: e }), !t.M)) return (u(e), !0);
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
      let i = { ...e, look: a };
      if ((h?.state === "ready" && (h = { ...h, profile: i }), !t.M)) return (u(i), !0);
      let { error: n } = await (0, t.t)().from("profiles").update({ look: a }).eq("id", e.id);
      return !n;
    }
    async function _() {
      ((h = null), t.M && (await (0, t.t)().auth.signOut()));
    }
    async function M() {
      if (!t.M) return c();
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
    async function b(e, a, i) {
      if (!t.M) return { ok: !0, sittingId: `local-${Date.now()}` };
      let { data: n, error: r } = await (0, t.t)().rpc("sit_down", {
        p_hall: e,
        p_seat: a,
        p_topic: i,
      });
      return r ? { ok: !1, reason: (0, t.y)(r) } : { ok: !0, sittingId: n };
    }
    async function x(e, a) {
      if (!t.M) return !0;
      let { data: i, error: n } = await (0, t.t)().rpc("heartbeat_sitting", {
        p_id: e,
        p_focused_minutes: Math.round(a),
      });
      return !n && !0 === i;
    }
    async function S(e, a, i, n) {
      if (!t.M) return (m({ ...n, at: Date.now(), minutes: a, note: i }), a);
      let { data: r } = await (0, t.t)().rpc("stand_up", {
        p_id: e,
        p_focused_minutes: Math.round(a),
        p_recap: i,
      });
      return "number" == typeof r ? r : a;
    }
    async function v(e) {
      if (!t.M) return d(e);
      let { data: a } = await (0, t.t)()
        .from("usual_seats")
        .select("seat")
        .eq("hall_id", e)
        .maybeSingle();
      return a?.seat ?? null;
    }
    async function k(e, a, i) {
      t.M
        ? await (0, t.t)().from("usual_seats").upsert({ user_id: i, hall_id: e, seat: a })
        : f(e, a);
    }
    async function w() {
      if (!t.M) return null;
      let { data: e } = await (0, t.t)().rpc("hall_counts");
      return Object.fromEntries((e ?? []).map((e) => [e.hall_id, e.seated]));
    }
    async function z(e, a, i, n, r) {
      if (!t.M || e.isDemo) {
        let t = "hh.reports",
          r = JSON.parse(localStorage.getItem(t) ?? "[]");
        return (
          r.push({ id: e.id, name: e.name, reason: a, note: i, hallId: n, at: Date.now() }),
          localStorage.setItem(t, JSON.stringify(r)),
          !0
        );
      }
      let { error: o } = await (0, t.t)().rpc("file_report", {
        p_reported: e.id,
        p_reason: a,
        p_note: i.slice(0, 500),
        p_hall: n,
        p_room: r,
        p_topic: e.topic,
      });
      return !o;
    }
    async function I() {
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
        z,
        "e",
        0,
        w,
        "F",
        0,
        x,
        "Z",
        0,
        p,
        "k",
        0,
        M,
        "i",
        0,
        I,
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
        y,
        "M",
        0,
        g,
        "h",
        0,
        k,
        "_",
        0,
        _,
        "N",
        0,
        b,
        "r",
        0,
        S,
        "G",
        0,
        v,
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
      i = a.flatMap((e) => Array.from({ length: 6 }, (t, a) => `${e}${a + 1}`)),
      n = [
        { name: "Aarav", avatar: "🦉", topic: "Organic chem: SN1 vs SN2" },
        { name: "Meera", avatar: "🌿", topic: "GATE BT: enzyme kinetics" },
        { name: "Kabir", avatar: "🐢", topic: "DSA: graphs" },
        { name: "Isha", avatar: "📚", topic: "Thesis lit review" },
        { name: "Rohan", avatar: "☕", topic: "Linear algebra ch. 4" },
        { name: "Tara", avatar: "🌙", topic: "UPSC: polity notes" },
        { name: "Zoya", avatar: "🪴", topic: "Bioprocess eng. problem set" },
      ],
      r = ["#e9d8a6", "#d4a373", "#ccd5ae", "#b7c4cf", "#e6ccb2", "#c9ada7"];
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
          o = new Set(),
          s = [];
        for (let l = 0; l < a; l++) {
          let a = n[(t + 3 * l) % n.length],
            u = (t + 7 * l) % i.length;
          for (; o.has(i[u]);) u = (u + 1) % i.length;
          (o.add(i[u]),
            s.push({
              id: `demo-${e}-${l}`,
              name: a.name,
              avatar: a.avatar,
              color: r[(t + l) % r.length],
              seat: i[u],
              topic: a.topic,
              phase: l % 4 == 3 ? "break" : "focus",
              phaseEndsAt: null,
              hideFromRequests: 1 === l,
              isDemo: !0,
              lastSeen: Date.now(),
            }));
        }
        return s;
      },
      "l",
      0,
      (e) => t.find((t) => t.id === e),
    ]);
  },
  67218,
  (e) => {
    "use strict";
    let t = new Map();
    e.s([
      "T",
      0,
      function (e) {
        if (!e || "object" != typeof e) return null;
        let t = (e) => ("number" == typeof e && Number.isFinite(e) ? e : null),
          a = t(e.x),
          i = t(e.z),
          n = t(e.ry);
        if (null === a || null === i || null === n) return null;
        let r = (e, t, a) => Math.min(a, Math.max(t, e)),
          o = "walking" === e.pose || "floor" === e.pose ? e.pose : "idle",
          s = { x: r(a, -11, 11), z: r(i, -8, 8), ry: r(n, -100, 100), pose: o };
        return ("floor" === o && "string" == typeof e.topic && (s.topic = e.topic.slice(0, 80)), s);
      },
      "Z",
      0,
      function (e, a, i = 0) {
        a ? t.set(e, { ...a, at: performance.now() - Math.min(Math.max(i, 0), 3e3) }) : t.delete(e);
      },
      "W",
      0,
      t,
    ]);
  },
  49341,
  (e) => {
    "use strict";
    function t(e) {
      let t = new Date(e + 198e5);
      return {
        y: t.getUTCFullYear(),
        mo: t.getUTCMonth(),
        day: t.getUTCDate(),
        dow: t.getUTCDay(),
      };
    }
    function a(e) {
      let a = t(e);
      return Date.UTC(a.y, a.mo, a.day) - 198e5;
    }
    let i = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    e.s([
      "X",
      0,
      i,
      "L",
      0,
      function (e) {
        let t = Math.max(0, Math.round(e));
        if (t <= 0) return "0 h";
        if (t < 60) return `${t} min`;
        let a = Math.round(t / 6) / 10;
        return Number.isInteger(a) ? `${a} h` : `${a.toFixed(1)} h`;
      },
      "w",
      0,
      function (e, n = 0, r = Date.now()) {
        let o,
          s = a(r),
          l = ((o = a(r)), o - ((t(r).dow + 6) % 7) * 864e5),
          u = e.filter((e) => e.at >= s).reduce((e, t) => e + t.minutes, 0) + n,
          c = e.filter((e) => e.at >= l).reduce((e, t) => e + t.minutes, 0) + n,
          m = [];
        for (let a = 6; a >= 0; a--) {
          let r = s - 24 * a * 36e5,
            o = r + 864e5,
            l = i[(t(r).dow + 6) % 7],
            u = e.filter((e) => e.at >= r && e.at < o).reduce((e, t) => e + t.minutes, 0);
          (0 === a && (u += n), m.push({ start: r, label: l, minutes: u }));
        }
        return { today: u, week: c, days: m };
      },
    ]);
  },
  46505,
  (e) => {
    e.v((t) =>
      Promise.all(["static/immutable/chunks/3pvwue29uus0h.js"].map((t) => e.l(t))).then(() =>
        t(31779),
      ),
    );
  },
]);
