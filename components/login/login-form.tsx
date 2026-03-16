"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2, School, UserCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthContext } from "@/components/providers/auth-provider";

export function LoginForm() {
  const [lrn, setLrn] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error, clearError } = useAuthContext();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    const success = await login({ lrn, password });
    if (success) {
      router.push("/dashboard");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-3 rounded-lg bg-burntpeach/10 border border-burntpeach/20 text-burntpeach text-sm"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-2">
        <Label htmlFor="lrn" className="text-jetblack text-sm font-medium">
          Learner Reference Number (LRN)
        </Label>
        <div className="relative">
          <School className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-jetblack/40" />
          <Input
            id="lrn"
            type="text"
            placeholder="Enter your 12-digit LRN"
            value={lrn}
            onChange={(e) => setLrn(e.target.value)}
            className="pl-10 h-11 bg-white border-jetblack/20 text-jetblack placeholder:text-jetblack/40 focus:border-burntpeach focus:ring-burntpeach/20 transition-all"
            maxLength={12}
            required
            disabled={isLoading}
          />
        </div>
        <p className="text-xs text-jetblack/40">
          Your unique 12-digit learner ID provided by the school
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label
            htmlFor="password"
            className="text-jetblack text-sm font-medium"
          >
            Password
          </Label>
          <button
            type="button"
            className="text-xs text-burntpeach hover:text-burntpeach/80 transition-colors"
          >
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-jetblack/40" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 pr-10 h-11 bg-white border-jetblack/20 text-jetblack placeholder:text-jetblack/40 focus:border-burntpeach focus:ring-burntpeach/20 transition-all"
            required
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-jetblack/40 hover:text-jetblack/60 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        <p className="text-xs text-jetblack/40">
          Default password: Last 6 digits of your LRN
        </p>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-11 bg-burntpeach hover:bg-burntpeach/90 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-burntpeach/20"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </Button>

      <div className="text-center pt-2">
        <p className="text-jetblack/50 text-sm">
          Don't have an account?{" "}
          <span className="text-burntpeach font-medium">
            Contact the registrar's office
          </span>
        </p>
      </div>
    </motion.form>
  );
}
