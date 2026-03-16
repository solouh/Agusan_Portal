'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/components/providers/auth-provider';
import { Loader2, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import SideNavigator from '@/components/dashboard/side-navigator';


export default function DashboardPage() {
  const { student, isAuthenticated, isLoading: authLoading, logout } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [authLoading, isAuthenticated, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-8 h-8 text-burntpeach" />
        </motion.div>
      </div>
    );
  }

  if (!student) return null;

  return (
    <div className="min-h-screen bg-cream">
      {/* Top Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white border-b border-jetblack/10 h-16 flex items-center justify-between px-6 sticky top-0 z-50"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-burntpeach rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AN</span>
          </div>
          <span className="font-semibold text-jetblack">Agusan NHS</span>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-jetblack/60 text-sm hidden sm:block">
            {student.first_name} {student.last_name}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="text-jetblack/60 hover:text-jetblack hover:bg-cream"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </motion.header>

      {/* Side Navigator */}
      <SideNavigator studentId={student.id} />
    </div>
  );
}