# Flynet Starter

A minimal Next.js app built on the [Flynet SDK](https://www.npmjs.com/package/@flynetdev/core).
Clone it, add an API key, and you have real Blackbird restaurant data rendering
through the SDK. Use it as the starting point for your own integration.

## Prerequisites

- Node 20 or newer
- npm
- A Flynet **Discovery API key** (request one through the Flynet developer portal)

## Quickstart

```bash
git clone <your-fork-url> flynet-starter
cd flynet-starter
npm install
cp .env.example .env.local      # then set API_KEY in .env.local
npm run dev
```

Open http://localhost:3000.

**You'll know it worked when** the page shows a list of real Blackbird
restaurants. Before you add a key, it shows a short setup notice instead of
crashing — that's expected.

## What's here

```
app/
  layout.tsx        imports the component theme (@flynetdev/react/styles.css)
  page.tsx          the whole flow: server-side Discovery + the member section
  member-panel.tsx  the member components (wallet, passport), client-side
.env.example        every variable explained
```

`page.tsx` reads your API key on the **server** and calls Discovery there, so the
key never reaches the browser. That is the one rule to keep: the Discovery API
key is server-only.

## Where your code goes

`app/page.tsx` has a marked spot:

```tsx
{/* 👉 Your code goes here. */}
```

Drop in another component, a new route, or your own logic. The full component
catalog and hooks (`WalletBadge`, `CheckInFeed`, `RestaurantCard`,
`NearbyLocations`, `useWallet`, …) are in
[`@flynetdev/react`](https://www.npmjs.com/package/@flynetdev/react).

## The member section (optional)

The wallet and passport need a member token. Set `ACCESS_TOKEN` in `.env.local`
to a member OAuth token (scopes `read:profile` + `read:wallets`) and the member
panel lights up. Without it, that section shows a notice.

In a real app the token comes from the OAuth sign-in flow, not an env var. The
full flow (authorize, PKCE, token exchange) is in the SDK's integration guide.

## Next steps

- **OAuth / member sign-in** — the integration guide in the `@flynetdev/core`
  package (`docs/integration-guide.md`).
- **All the components and hooks** — [`@flynetdev/react`](https://www.npmjs.com/package/@flynetdev/react).
- **Field-level API reference** — the Flynet developer portal.
