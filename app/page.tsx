import type { ReactNode } from "react";
import { FlynetDiscoveryClient, FlynetError } from "@flynetdev/core";
import { RestaurantList, type Restaurant } from "@flynetdev/react";
import { MemberPanel } from "./member-panel";

// The whole starter in one screen:
//   1. Read restaurants from Flynet Discovery (server-side, with your API key).
//   2. Optionally light up the member components if you supply a member token.
//
// Discovery runs HERE, on the server. The API key is read from the environment
// and never reaches the browser — that is the one security rule that matters.
export default async function Home() {
  const apiKey = process.env.API_KEY;
  const accessToken = process.env.ACCESS_TOKEN;

  return (
    <main className="mx-auto max-w-2xl space-y-10 p-10">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-[#755bff]">
          Flynet Starter
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Build on Blackbird
        </h1>
        <p className="mt-2 text-[#ababab]">
          Real restaurant data from the Flynet API, rendered with the SDK.
        </p>
      </header>

      {await renderRestaurants(apiKey)}

      {accessToken ? <MemberPanel accessToken={accessToken} /> : <MemberNotice />}

      {/* 👉 Your code goes here.
          Add a component, a page, or your own logic. The full component catalog
          and hooks live in @flynetdev/react. */}
    </main>
  );
}

async function renderRestaurants(apiKey: string | undefined): Promise<ReactNode> {
  if (!apiKey) return <SetupNotice />;
  try {
    const discovery = new FlynetDiscoveryClient({ apiKey });
    const { restaurants } = await discovery.restaurants.listRestaurants({
      pageSize: 8,
    });
    return (
      <Section title="Restaurants">
        <RestaurantList restaurants={restaurants as Restaurant[]} />
      </Section>
    );
  } catch (error) {
    const message =
      error instanceof FlynetError
        ? `${error.kind}: ${error.message}`
        : "Unexpected error.";
    return (
      <Notice tone="error" title="Couldn't load restaurants">
        {message} Check that <Code>API_KEY</Code> in <Code>.env.local</Code> is a
        valid Flynet key.
      </Notice>
    );
  }
}

function SetupNotice() {
  return (
    <Notice title="Add your API key to start">
      Copy <Code>.env.example</Code> to <Code>.env.local</Code> and set{" "}
      <Code>API_KEY</Code> to your Flynet Discovery key, then reload. You&apos;ll
      see real Blackbird restaurants here.
    </Notice>
  );
}

function MemberNotice() {
  return (
    <Notice title="Member components (optional)">
      Set <Code>ACCESS_TOKEN</Code> (a member OAuth token with the{" "}
      <Code>read:profile</Code> and <Code>read:wallets</Code> scopes) in{" "}
      <Code>.env.local</Code> to show the member&apos;s wallet and passport. See
      the README for how to get one.
    </Notice>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xs uppercase tracking-[0.16em] text-[#ababab]">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Notice({
  title,
  tone = "info",
  children,
}: {
  title: string;
  tone?: "info" | "error";
  children: ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 text-sm leading-relaxed ${
        tone === "error"
          ? "border-[#ff5449]/40 text-[#ff5449]"
          : "border-white/10 text-[#ababab]"
      }`}
    >
      <p className="font-medium text-[#fcfcfc]">{title}</p>
      <p className="mt-1">{children}</p>
    </div>
  );
}

function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-white/10 px-1 py-0.5 text-[#fcfcfc]">
      {children}
    </code>
  );
}
