(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  30692,
  (e) => {
    "use strict";
    var a = e.i(43476),
      s = e.i(71645),
      i = e.i(8687);
    e.s([
      "default",
      0,
      function () {
        let [e, n] = (0, s.useState)(""),
          [l, r] = (0, s.useState)("form"),
          t = async (a) => {
            (a.preventDefault(), r("sending"));
            let s = new URLSearchParams(window.location.search).get("next") ?? "/",
              { error: n } = await (0, i.t)().auth.signInWithOtp({
                email: e.trim(),
                options: {
                  emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(s.startsWith("/") ? s : "/")}`,
                  shouldCreateUser: !0,
                },
              });
            r(n ? "error" : "sent");
          };
        return i.M
          ? (0, a.jsxs)("div", {
              className: "card narrow",
              children: [
                (0, a.jsx)("h1", { children: "Sign in" }),
                "sent" === l
                  ? (0, a.jsx)("p", {
                      children:
                        "Check your inbox for a sign-in link from Hush Hall. You can close this tab; the link opens the library.",
                    })
                  : (0, a.jsxs)("form", {
                      onSubmit: t,
                      children: [
                        (0, a.jsx)("p", {
                          className: "muted small",
                          children:
                            "New or returning, it’s the same: we email you a one-time link. No password to remember.",
                        }),
                        (0, a.jsx)("label", { htmlFor: "email", children: "Email" }),
                        (0, a.jsx)("input", {
                          id: "email",
                          type: "email",
                          required: !0,
                          autoComplete: "email",
                          value: e,
                          onChange: (e) => n(e.target.value),
                          placeholder: "you@example.com",
                        }),
                        "error" === l &&
                          (0, a.jsx)("p", {
                            className: "small muted",
                            children:
                              "That didn’t send. Check the address and try again in a minute.",
                          }),
                        (0, a.jsx)("div", {
                          className: "actions",
                          children: (0, a.jsx)("button", {
                            type: "submit",
                            className: "sage",
                            disabled: "sending" === l || !e.includes("@"),
                            children: "sending" === l ? "Sending…" : "Email me a link",
                          }),
                        }),
                        (0, a.jsxs)("p", {
                          className: "small muted",
                          children: [
                            "Hush Hall is for people aged 18 and over. ",
                            (0, a.jsx)("a", { href: "/rules", children: "House rules" }),
                            " · ",
                            (0, a.jsx)("a", { href: "/privacy", children: "Privacy policy" }),
                          ],
                        }),
                      ],
                    }),
              ],
            })
          : (0, a.jsxs)("div", {
              className: "card",
              children: [
                (0, a.jsx)("h1", { children: "Sign in" }),
                (0, a.jsxs)("p", {
                  className: "muted",
                  children: [
                    "This copy of Hush Hall runs in demo mode (no server configured), so there are no accounts. ",
                    (0, a.jsx)("a", { href: "/", children: "Back to the lobby" }),
                  ],
                }),
              ],
            });
      },
    ]);
  },
]);
