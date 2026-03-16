// components/LoginSection.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Eye, 
  EyeOff, 
  GraduationCap, 
  Lock, 
  User, 
  ArrowRight,
  School,
  AlertCircle
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginSection() {
  const [lrn, setLrn] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Step 1: Find student by LRN to get the associated user_id
      const { data: student, error: studentError } = await supabase
        .from("students")
        .select("user_id, LRN, first_name, last_name")
        .eq("lrn", lrn)
        .single();

      if (studentError || !student) {
        throw new Error("Invalid LRN. Please check and try again.");
      }

      // Step 2: Get user email from users table using the user_id
      const { data: user, error: userError } = await supabase
        .from("users")
        .select("email")
        .eq("id", student.user_id)
        .single();

      if (userError || !user) {
        throw new Error("User account not found. Please contact administration.");
      }

      // Step 3: Sign in with Supabase Auth using email + password
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: password,
      });

      if (authError) {
        throw new Error("Invalid password. Please try again.");
      }

      // Success - redirect to dashboard
      window.location.href = "/dashboard";
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen w-full bg-gray-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        
        {/* Left Side - Branding */}
        <div className="relative hidden lg:flex flex-col justify-between bg-jetblack p-12 text-white">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-burntpeach via-jetblack to-jetblack" />
          </div>

          {/* Top Content */}
          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-3">
              <div className="rounded-full bg-burntpeach/20 p-3">
                <School className="h-10 w-10 text-burntpeach" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Agusan NHS</h1>
                <p className="text-sm text-gray-400">Student Portal</p>
              </div>
            </Link>
          </div>

          {/* Center Content */}
          <div className="relative z-10 my-auto">
            <Badge className="mb-6 bg-burntpeach text-jetblack hover:bg-burntpeach/90">
              SY 2026-2027
            </Badge>
            <h2 className="mb-6 text-5xl font-bold leading-tight">
              Welcome Back, <span className="text-burntpeach">Scholar!</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-md leading-relaxed">
              Access your grades, schedule, enrollment status, and school resources 
              all in one place. Your journey to excellence continues here.
            </p>

            {/* Feature List */}
            <div className="mt-8 space-y-4">
              {[
                "View grades and academic records",
                "Track enrollment status",
                "Access learning materials",
                "Connect with teachers"
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-burntpeach" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Content */}
          <div className="relative z-10">
            <p className="text-sm text-gray-400">
              © 2026 Agusan National High School. All rights reserved.
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex items-center justify-center p-6 lg:p-12 bg-white">
          <div className="w-full max-w-md space-y-8">
            
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="inline-flex items-center justify-center rounded-full bg-burntpeach/10 p-4 mb-4">
                <School className="h-12 w-12 text-burntpeach" />
              </div>
              <h1 className="text-2xl font-bold text-jetblack">Agusan NHS</h1>
              
            </div>

            {/* Login Card */}
            <Card className="border-0 shadow-none lg:shadow-lg lg:border">
              <CardHeader className="space-y-1 pb-6">
                <CardTitle className="text-2xl font-bold text-jetblack text-center lg:text-left">
                  Student Login
                </CardTitle>
                <CardDescription className="text-center lg:text-left">
                  Enter your LRN and password to access your account
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {error && (
                  <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                  {/* LRN Input */}
                  <div className="space-y-2">
                    <Label htmlFor="lrn" className="text-jetblack font-medium">
                      Learner Reference Number (LRN)
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="lrn"
                        type="text"
                        placeholder="Enter your 12-digit LRN"
                        value={lrn}
                        onChange={(e) => setLrn(e.target.value)}
                        className="pl-10 h-12 border-gray-200 focus:border-burntpeach focus:ring-burntpeach"
                        maxLength={12}
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your LRN is found on your report card or school ID
                    </p>
                  </div>

                  {/* Password Input */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-jetblack font-medium">
                        Password
                      </Label>
                      <Link 
                        href="/auth/forgot-password" 
                        className="text-xs text-burntpeach hover:underline font-medium"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 h-12 border-gray-200 focus:border-burntpeach focus:ring-burntpeach"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label 
                      htmlFor="remember" 
                      className="text-sm font-normal text-gray-600 cursor-pointer"
                    >
                      Remember me on this device
                    </Label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full h-12 bg-burntpeach hover:bg-burntpeach/90 text-jetblack font-bold text-base transition hover:scale-[1.02]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-jetblack border-t-transparent" />
                        Signing in...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Sign In
                        <ArrowRight className="h-5 w-5" />
                      </span>
                    )}
                  </Button>
                </form>

                <Separator />

                {/* Alternative Login */}
                

                {/* Help Section */}
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-sm text-gray-600 mb-2">
                    Don't have an account?
                  </p>
                  <Link 
                    href="/Enrollment" 
                    className="text-sm font-bold text-burntpeach hover:underline inline-flex items-center gap-1"
                  >
                    Enroll Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <p className="text-center text-xs text-muted-foreground">
              Need help? Contact{" "}
              <a href="mailto:support@agusannhs.edu" className="text-burntpeach hover:underline">
                IT Support
              </a>{" "}
              or call (088) 123-4567
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}