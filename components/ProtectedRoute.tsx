
"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "../lib/auth-client";

export default function ProtectedRoute({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  useEffect(() => {
    if (!isPending && !user) {
      const callbackURL = encodeURIComponent(pathname);

      router.replace(`/login?callbackURL=${callbackURL}`);
    }
  }, [isPending, user, pathname, router]);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-semibold text-indigo-600">
          Checking authentication...
        </p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
