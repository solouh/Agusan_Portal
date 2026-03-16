"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="flex flex-col w-96 gap-6 items-center justify-center "
      {...props}
    >
      {success ? (
        <Card className="w-full max-w-sm border-desertsand/30 bg-platinum shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-jetblack">Check Your Email</CardTitle>
            <CardDescription className="text-jetblack/70">
              Password reset instructions sent
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-jetblack/60">
              If you registered using your email and password, you will receive
              a password reset email.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full  max-w-sm border-desertsand/30  shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-jetblack">Reset Your Password</CardTitle>
            <CardDescription className="text-jetblack/70">
              Type in your email and we&apos;ll send you a link to reset your
              password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForgotPassword}>
              <div className="flex flex-col gap-16">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-jetblack">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-dustgray focus:border-burntpeach focus:ring-burntpeach bg-cream text-jetblack placeholder:text-jetblack/40"
                  />
                </div>
                {error && (
                  <p className="text-sm text-burntpeach font-medium">
                    {error}
                  </p>
                )}
                <Button 
                  type="submit" 
                  className="w-full bg-burntpeach hover:bg-burntpeach/90 text-cream font-semibold transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send reset email"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm text-jetblack/70">
                Already have an account?{" "}
                <Link
                  href="/"
                  className="underline underline-offset-4 text-burntpeach hover:text-burntpeach/80 font-medium transition-colors"
                >
                  Login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}