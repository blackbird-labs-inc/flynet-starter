"use client";

import { useMemo } from "react";
import { FlynetMemberClient } from "@flynetdev/core";
import { FlynetProvider, UserPassport, WalletBadge } from "@flynetdev/react";

// Member components run in the browser and read from the FlynetProvider. The
// member client holds the OAuth token and fetches client-side, so this is a
// Client Component. The token is passed down from the server (page.tsx).
//
// In a real app the token comes from the member's authenticated session (the
// OAuth flow), not an env var — see the README's "Next steps".
export function MemberPanel({ accessToken }: { accessToken: string }) {
  const member = useMemo(
    () => new FlynetMemberClient({ accessToken }),
    [accessToken],
  );

  return (
    <FlynetProvider member={member}>
      <section className="space-y-3">
        <h2 className="text-xs uppercase tracking-[0.16em] text-[#ababab]">
          Your Blackbird account
        </h2>
        <WalletBadge display="fly-and-usd" />
        <UserPassport />
      </section>
    </FlynetProvider>
  );
}
