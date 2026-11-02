
import { Suspense, type ReactNode } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p>Checking authentication...</p>
        </div>
      }
    >
      <ProtectedRoute>{children}</ProtectedRoute>
    </Suspense>
  );
}
