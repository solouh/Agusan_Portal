import { Suspense } from "react";

import { Skeleton } from "./ui/skeleton";
import { AuthButton } from "./layout/auth-button";

function AuthButtonSkeleton() {
  return (
    <div className="flex w-full flex-row items-center gap-4 p-2">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-48" />
      </div>
    </div>
  );
}

export function AuthButtonWrapper() {
  return (
    <Suspense fallback={<AuthButtonSkeleton />}>
      <AuthButton />
    </Suspense>
  );
}