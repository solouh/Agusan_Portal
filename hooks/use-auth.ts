"use client";

import { useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Student, AuthState, LoginCredentials } from "@/types";

const supabase = createClient();

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    student: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
  });

  // Login with LRN - looks up email from users table
  const login = useCallback(
    async (credentials: LoginCredentials): Promise<boolean> => {
      setState({
        student: null,
        isLoading: true,
        error: null,
        isAuthenticated: false,
      });

      try {
        // STEP 1: Find student by LRN and get their email from users table
        const { data: studentData, error: studentError } = await supabase
          .from("students")
          .select(
            `
          *,
          users:user_id (email)
        `,
          )
          .eq("lrn", credentials.lrn)
          .maybeSingle();

        if (studentError) {
          console.error("Student lookup error:", studentError);
          setState({
            student: null,
            isLoading: false,
            error: "Database error",
            isAuthenticated: false,
          });
          return false;
        }

        if (!studentData) {
          setState({
            student: null,
            isLoading: false,
            error: "Invalid LRN",
            isAuthenticated: false,
          });
          return false;
        }

        // STEP 2: Get email from users table
        const email = studentData.users?.email;

        if (!email) {
          setState({
            student: null,
            isLoading: false,
            error: "No email associated with this account",
            isAuthenticated: false,
          });
          return false;
        }

        // STEP 3: Sign in with Supabase Auth using the real email
        const { data: authData, error: authError } =
          await supabase.auth.signInWithPassword({
            email,
            password: credentials.password,
          });

        if (authError) {
          setState({
            student: null,
            isLoading: false,
            error:
              authError.message === "Invalid login credentials"
                ? "Invalid LRN or password"
                : authError.message,
            isAuthenticated: false,
          });
          return false;
        }

        if (!authData.user) {
          setState({
            student: null,
            isLoading: false,
            error: "Authentication failed",
            isAuthenticated: false,
          });
          return false;
        }

        // STEP 4: Verify auth_id matches (link them if not already linked)
        if (studentData.auth_id && studentData.auth_id !== authData.user.id) {
          setState({
            student: null,
            isLoading: false,
            error: "Account mismatch error",
            isAuthenticated: false,
          });
          await supabase.auth.signOut();
          return false;
        }

        // Link auth_id if not set
        if (!studentData.auth_id) {
          const { error: updateError } = await supabase
            .from("students")
            .update({ auth_id: authData.user.id })
            .eq("id", studentData.id);

          if (updateError) {
            console.error("Failed to link auth_id:", updateError);
          }
        }

        // STEP 5: Success - format student data
        const student: Student = {
          ...studentData,
          email: studentData.users?.email || studentData.email,
        };

        setState({
          student,
          isLoading: false,
          error: null,
          isAuthenticated: true,
        });

        return true;
      } catch (err) {
        console.error("Login error:", err);
        const message = err instanceof Error ? err.message : "Login failed";
        setState({
          student: null,
          isLoading: false,
          error: message,
          isAuthenticated: false,
        });
        return false;
      }
    },
    [],
  );

  // Logout
  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setState({
      student: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,
    });
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    login,
    logout,
    clearError,
  };
}
