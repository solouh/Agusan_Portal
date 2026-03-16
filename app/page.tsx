"use client";

import { motion } from "framer-motion";
import { LoginForm } from "@/components/login/login-form";
import { Button } from "@/components/ui/button";
import { Chrome, Shield, School } from "lucide-react";
import { useAuthContext } from "@/components/providers/auth-provider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SchoolLogo } from "@/components/login/school-logo";

export default function LoginPage() {
  const { isAuthenticated } = useAuthContext();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-[480px] flex flex-col justify-between p-8 lg:p-12 border-r border-jetblack/10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SchoolLogo />

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-jetblack mb-2">
              Welcome back
            </h1>
            <p className="text-jetblack/60">Sign in to your student account</p>
          </div>

          {/* Alternative Login Methods */}
          <div className="space-y-3 mb-8">
            <Button
              variant="outline"
              className="w-full h-11 bg-burntpeach border-jetblack/20 text-jetblack hover:bg-jetblack/5 hover:text-jetblack hover:border-jetblack/30 transition-all relative group"
            >
              <Chrome className="w-4 h-4 mr-2" />
              Continue with Google
            </Button>

            <Button
              variant="outline"
              className="w-full h-11 bg-burntpeach border-jetblack/20 text-jetblack hover:bg-jetblack/5 hover:text-jetblack hover:border-jetblack/30 transition-all"
            >
              <Shield className="w-4 h-4 mr-2" />
              Continue with Department Account
            </Button>
          </div>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-jetblack/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-cream px-2 text-jetblack/40">or</span>
            </div>
          </div>

          {/* LRN Login Form */}
          <LoginForm />
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 pt-8 border-t border-jetblack/10"
        >
          <p className="text-xs text-jetblack/40 text-center leading-relaxed">
            By continuing, you agree to Agusan National High School's{" "}
            <a
              href="#"
              className="text-jetblack/60 hover:text-jetblack underline"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-jetblack/60 hover:text-jetblack underline"
            >
              Privacy Policy
            </a>
          </p>
        </motion.div>
      </div>

      {/* Right Side - Hero */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-jetblack">
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgb(255 255 255) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-burntpeach/20 via-jetblack to-jetblack" />

        <div className="relative z-10 flex flex-col justify-center px-16 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="mb-6">
              <span className="text-6xl text-burntpeach/30 font-serif">"</span>
            </div>

            <blockquote className="text-2xl font-medium text-cream leading-relaxed mb-8">
              Education is the passport to the future, for tomorrow belongs to
              those who prepare for it today. At Agusan National High School, we
              nurture excellence, build character, and shape the leaders of
              tomorrow.
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-burntpeach/20 flex items-center justify-center">
                <School className="w-6 h-6 text-burntpeach" />
              </div>
              <div>
                <p className="text-cream font-medium">
                  Agusan National High School
                </p>
                <p className="text-cream/50 text-sm">Department of Education</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-16 grid grid-cols-3 gap-8"
          >
            <div>
              <p className="text-3xl font-bold text-cream">5,000+</p>
              <p className="text-cream/50 text-sm mt-1">Active Students</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-cream">200+</p>
              <p className="text-cream/50 text-sm mt-1">Expert Faculty</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-cream">60+</p>
              <p className="text-cream/50 text-sm mt-1">Years of Excellence</p>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-burntpeach/20 rounded-full blur-3xl" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-burntpeach/10 rounded-full blur-2xl" />
      </div>
    </div>
  );
}
