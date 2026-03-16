"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  School,
  BookOpen,
  Calendar,
  ChevronRight,
  Loader2,
  MapPin,
  Phone,
  Mail,
  GraduationCap,
  Clock,
  Award,
  Menu,
  X,
  FileText,
  Facebook,
  Smartphone,
  Home,
  Briefcase,
  Heart,
  UserCircle,
  CalendarDays,
  CreditCard,
  CheckCircle2,
  XCircle,
  AlertCircle,
  History,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useStudentProfile,
  useStudentGrades,
  useStudentSchedule,
  useSchoolInfo,
} from "@/hooks/dashbaord";

const navItems = [
  { id: "profile", label: "Profile", icon: User, color: "bg-burntpeach" },
  { id: "school", label: "School Info", icon: School, color: "bg-emerald-500" },
  { id: "grades", label: "Grades", icon: BookOpen, color: "bg-violet-500" },
  { id: "schedule", label: "Schedule", icon: Calendar, color: "bg-amber-500" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function SideNavigator({ studentId }: { studentId: string }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: profile, isLoading: profileLoading } =
    useStudentProfile(studentId);
  const { data: grades, isLoading: gradesLoading } =
    useStudentGrades(studentId);
  const { data: schedule, isLoading: scheduleLoading } =
    useStudentSchedule(studentId);
  const { data: schoolInfo, isLoading: schoolLoading } = useSchoolInfo();

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileContent data={profile} isLoading={profileLoading} />;
      case "school":
        return <SchoolContent data={schoolInfo} isLoading={schoolLoading} />;
      case "grades":
        return <GradesContent data={grades} isLoading={gradesLoading} />;
      case "schedule":
        return <ScheduleContent data={schedule} isLoading={scheduleLoading} />;
      default:
        return null;
    }
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-cream flex-col lg:flex-row">
      {/* Mobile Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="lg:hidden bg-jetblack p-4 flex items-center justify-between"
      >
        <div>
          <h2 className="text-cream font-bold text-lg">Student Portal</h2>
          <p className="text-cream/50 text-xs">
            Navigate your academic journey
          </p>
        </div>
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-cream">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[280px] bg-jetblack border-jetblack p-0"
          >
            <MobileSidebar
              activeTab={activeTab}
              onTabChange={handleTabChange}
              onClose={() => setMobileMenuOpen(false)}
            />
          </SheetContent>
        </Sheet>
      </motion.div>

      {/* Desktop Sidebar */}
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="hidden lg:flex w-64 bg-jetblack border-r border-jetblack/10 flex-col shrink-0"
      >
        <div className="p-6">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-cream font-bold text-lg mb-1"
          >
            Student Portal
          </motion.h2>
          <p className="text-cream/50 text-xs">
            Navigate your academic journey
          </p>
        </div>

        <div className="flex-1 px-3 space-y-1">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * idx }}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-burntpeach text-jetblack"
                    : "text-cream/70 hover:bg-jetblack/50 hover:text-cream"
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${isActive ? "bg-jetblack/20" : "bg-cream/10"}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-medium text-sm flex-1 text-left">
                  {item.label}
                </span>
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${isActive ? "rotate-90" : "group-hover:translate-x-1"}`}
                />
              </motion.button>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-4 border-t border-cream/10"
        >
          <div className="bg-cream/5 rounded-xl p-4">
            <p className="text-cream/60 text-xs mb-1">Current Semester</p>
            <p className="text-cream font-semibold text-sm">
              1st Semester 2026
            </p>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-jetblack/10 z-50">
        <div className="flex justify-around p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                  isActive ? "text-burntpeach" : "text-jetblack/50"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-0 w-8 h-0.5 bg-burntpeach rounded-full"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden lg:h-auto h-[calc(100vh-8rem)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="h-full overflow-y-auto p-4 lg:p-8 pb-24 lg:pb-8"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

// Mobile Sidebar Component
function MobileSidebar({
  activeTab,
  onTabChange,
  onClose,
}: {
  activeTab: string;
  onTabChange: (id: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-cream/10 flex items-center justify-between">
        <div>
          <h2 className="text-cream font-bold text-lg">Menu</h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-cream"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* 
Agusan NHS */}
      <div className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl transition-all ${
                isActive
                  ? "bg-burntpeach text-jetblack"
                  : "text-cream/70 hover:bg-jetblack/50"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
              {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
// navi
// Profile Content Component - Enhanced with more details
function ProfileContent({
  data,
  isLoading,
}: {
  data: any;
  isLoading: boolean;
}) {
  if (isLoading) return <LoadingState />;
  if (!data) return <EmptyState message="No profile data found" />;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto"
    >
      <motion.div variants={itemVariants} className="mb-6">
        <h2 className="text-2xl font-bold text-jetblack">Student Profile</h2>
        <p className="text-jetblack/60">
          Complete academic and personal information
        </p>
      </motion.div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-4 mb-6">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal" className="space-y-6">
          {/* Main Profile Card */}
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-20 h-20 bg-burntpeach/20 rounded-2xl flex items-center justify-center shrink-0"
                  >
                    <User className="w-10 h-10 text-burntpeach" />
                  </motion.div>
                  <div className="text-center sm:text-left flex-1">
                    <CardTitle className="text-xl text-jetblack">
                      {data.first_name} {data.middle_name} {data.last_name}{" "}
                      {data.extension_name}
                    </CardTitle>
                    <p className="text-jetblack/60 text-sm">LRN: {data.lrn}</p>
                    <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
                      <Badge className="bg-burntpeach/10 text-burntpeach border-0">
                        {data.status || "Active"}
                      </Badge>
                      <Badge className="bg-emerald-100 text-emerald-700 border-0">
                        {data.grade_level || "N/A"}
                      </Badge>
                      {data.strand && (
                        <Badge className="bg-violet-100 text-violet-700 border-0">
                          {data.strand}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Info Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <InfoItem
                    icon={CalendarDays}
                    label="Birth Date"
                    value={
                      data.birth_date
                        ? new Date(data.birth_date).toLocaleDateString()
                        : "N/A"
                    }
                  />
                  <InfoItem
                    icon={UserCircle}
                    label="Gender"
                    value={
                      data.gender
                        ? data.gender.charAt(0).toUpperCase() +
                          data.gender.slice(1)
                        : "N/A"
                    }
                  />
                  <InfoItem
                    icon={Heart}
                    label="Civil Status"
                    value={
                      data.civil_status
                        ? data.civil_status.charAt(0).toUpperCase() +
                          data.civil_status.slice(1)
                        : "Single"
                    }
                  />
                  <InfoItem
                    icon={Award}
                    label="Citizenship"
                    value={data.citizenship || "Filipino"}
                  />
                </div>

                <Separator />

                {/* Account Info */}
                <div>
                  <h4 className="text-sm font-semibold text-jetblack mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Account Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between p-3 bg-cream/30 rounded-lg">
                      <span className="text-jetblack/60">Account Type</span>
                      <span className="font-medium text-jetblack capitalize">
                        {data.user_info?.role?.name || "Student"}
                      </span>
                    </div>
                    <div className="flex justify-between p-3 bg-cream/30 rounded-lg">
                      <span className="text-jetblack/60">Member Since</span>
                      <span className="font-medium text-jetblack">
                        {data.created_at
                          ? new Date(data.created_at).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Address Card */}
          {data.address && (
            <motion.div variants={itemVariants}>
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-jetblack flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-burntpeach" />
                    Address Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-jetblack/40 uppercase tracking-wider">
                          Street Address
                        </p>
                        <p className="text-jetblack font-medium">
                          {data.address.house_no} {data.address.street}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-jetblack/40 uppercase tracking-wider">
                          Barangay
                        </p>
                        <p className="text-jetblack font-medium">
                          {data.address.barangay}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-jetblack/40 uppercase tracking-wider">
                          City/Municipality
                        </p>
                        <p className="text-jetblack font-medium">
                          {data.address.city}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-jetblack/40 uppercase tracking-wider">
                          Province
                        </p>
                        <p className="text-jetblack font-medium">
                          {data.address.province}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Parents Info */}
          {data.parents && data.parents.length > 0 && (
            <motion.div variants={itemVariants}>
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-jetblack flex items-center gap-2">
                    <Home className="w-5 h-5 text-burntpeach" />
                    Parent/Guardian Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  {data.parents.map((parent: any, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-4 bg-cream/30 rounded-xl"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-burntpeach/20 rounded-full flex items-center justify-center shrink-0">
                            <User className="w-5 h-5 text-burntpeach" />
                          </div>
                          <div>
                            <p className="font-semibold text-jetblack">
                              {parent.first_name} {parent.last_name}
                            </p>
                            <p className="text-sm text-jetblack/60 capitalize">
                              {parent.type} • {parent.living_status}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm md:text-right">
                          <div>
                            <p className="text-jetblack/60">Contact</p>
                            <p className="font-medium text-jetblack">
                              {parent.phone || "N/A"}
                            </p>
                          </div>
                          <div>
                            <p className="text-jetblack/60">Employment</p>
                            <p className="font-medium text-jetblack">
                              {parent.employment_status || "N/A"}
                            </p>
                          </div>
                          <div>
                            <p className="text-jetblack/60">Education</p>
                            <p className="font-medium text-jetblack">
                              {parent.education_level || "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </TabsContent>

        {/* Contact Information Tab */}
        <TabsContent value="contact" className="space-y-6">
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-lg text-jetblack flex items-center gap-2">
                  <Phone className="w-5 h-5 text-burntpeach" />
                  Contact Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ContactItem
                    icon={Mail}
                    label="Primary Email"
                    value={data.email || data.user_info?.email || "N/A"}
                    verified={!!data.email}
                  />
                  <ContactItem
                    icon={Phone}
                    label="Primary Phone"
                    value={data.phone_number || "N/A"}
                    verified={!!data.phone_number}
                  />
                  <ContactItem
                    icon={Smartphone}
                    label="Alternative Phone"
                    value={data.alternative_phone || "N/A"}
                  />
                  <ContactItem
                    icon={Facebook}
                    label="Facebook Profile"
                    value={data.facebook_link || "Not provided"}
                    isLink={!!data.facebook_link}
                  />
                </div>

                {data.user_info?.contact_number && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="text-sm font-semibold text-jetblack mb-3">
                        Account Contact
                      </h4>
                      <div className="p-3 bg-cream/30 rounded-lg flex items-center justify-between">
                        <span className="text-jetblack/60">
                          Registered Contact Number
                        </span>
                        <span className="font-medium text-jetblack">
                          {data.user_info.contact_number}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Enrollment Information Tab */}
        <TabsContent value="enrollment" className="space-y-6">
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-lg text-jetblack flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-burntpeach" />
                  Current Enrollment Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Status Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatusCard
                    label="Enrollment Status"
                    value={data.enrollment_status || "Not Enrolled"}
                    icon={CheckCircle2}
                    color={
                      data.enrollment_status === "active" ? "emerald" : "amber"
                    }
                  />
                  <StatusCard
                    label="Billing Status"
                    value={data.billing_status || "N/A"}
                    icon={CreditCard}
                    color={data.billing_status === "paid" ? "emerald" : "amber"}
                  />
                  <StatusCard
                    label="Student Type"
                    value={data.is_transferee ? "Transferee" : "Regular"}
                    icon={UserCircle}
                    color="blue"
                  />
                  <StatusCard
                    label="School Year"
                    value={data.school_year || "2025-2026"}
                    icon={Calendar}
                    color="violet"
                  />
                </div>

                <Separator />

                {/* Enrollment Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-jetblack">
                      Academic Information
                    </h4>
                    <div className="space-y-2">
                      <DetailRow
                        label="Grade Level"
                        value={data.grade_level || "N/A"}
                      />
                      <DetailRow label="Strand" value={data.strand || "N/A"} />
                      <DetailRow
                        label="School Year"
                        value={data.school_year || "N/A"}
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-jetblack">
                      Enrollment Dates
                    </h4>
                    <div className="space-y-2">
                      <DetailRow
                        label="Enrollment Date"
                        value={
                          data.enrollment_date
                            ? new Date(
                                data.enrollment_date,
                              ).toLocaleDateString()
                            : "N/A"
                        }
                      />
                      <DetailRow
                        label="Member Since"
                        value={
                          data.created_at
                            ? new Date(data.created_at).toLocaleDateString()
                            : "N/A"
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Education Background Tab */}
        <TabsContent value="education" className="space-y-6">
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-lg text-jetblack flex items-center gap-2">
                  <History className="w-5 h-5 text-burntpeach" />
                  Educational Background
                </CardTitle>
              </CardHeader>
              <CardContent>
                {data.educationBackground &&
                data.educationBackground.length > 0 ? (
                  <div className="space-y-4">
                    {data.educationBackground.map((edu: any, idx: number) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-4 bg-cream/30 rounded-xl border-l-4 border-burntpeach"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-jetblack text-lg">
                              {edu.last_school_name}
                            </h4>
                            <p className="text-sm text-jetblack/60">
                              {edu.school_address || "No address provided"}
                            </p>
                          </div>
                          <div className="flex gap-4 text-sm">
                            <Badge
                              variant="outline"
                              className="border-burntpeach text-burntpeach"
                            >
                              {edu.school_type}
                            </Badge>
                            <div className="flex items-center gap-1 text-jetblack/60">
                              <Calendar className="w-4 h-4" />
                              <span>
                                Year Graduated:{" "}
                                <strong className="text-jetblack">
                                  {edu.year_graduated}
                                </strong>
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <EmptyState message="No education background records found" />
                )}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

// Helper Components
function ContactItem({
  icon: Icon,
  label,
  value,
  verified,
  isLink,
}: {
  icon: any;
  label: string;
  value: string;
  verified?: boolean;
  isLink?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 p-4 bg-cream/30 rounded-xl">
      <Icon className="w-5 h-5 text-burntpeach shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-jetblack/50 uppercase tracking-wider">
          {label}
        </p>
        {isLink && value !== "Not provided" ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-burntpeach hover:underline truncate block"
          >
            {value}
          </a>
        ) : (
          <p className="text-sm font-medium text-jetblack truncate">{value}</p>
        )}
      </div>
      {verified && (
        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
      )}
    </div>
  );
}

function StatusCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  icon: any;
  color: string;
}) {
  const colorClasses =
    {
      emerald: "bg-emerald-100 text-emerald-700 border-emerald-200",
      amber: "bg-amber-100 text-amber-700 border-amber-200",
      blue: "bg-blue-100 text-blue-700 border-blue-200",
      violet: "bg-violet-100 text-violet-700 border-violet-200",
    }[color] || "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <div className={`p-4 rounded-xl border ${colorClasses}`}>
      <Icon className="w-5 h-5 mb-2 opacity-80" />
      <p className="text-xs opacity-80 uppercase tracking-wider">{label}</p>
      <p className="font-semibold text-sm capitalize">{value}</p>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-jetblack/5 last:border-0">
      <span className="text-sm text-jetblack/60">{label}</span>
      <span className="text-sm font-medium text-jetblack">{value}</span>
    </div>
  );
}

// School Info Content - Responsive
function SchoolContent({ data, isLoading }: { data: any; isLoading: boolean }) {
  if (isLoading) return <LoadingState />;
  if (!data) return <EmptyState message="No school information available" />;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto"
    >
      <motion.div variants={itemVariants} className="mb-4 lg:mb-6">
        <h2 className="text-xl lg:text-2xl font-bold text-jetblack">
          School Information
        </h2>
        <p className="text-jetblack/60 text-sm lg:text-base">
          Academic policies and school details
        </p>
      </motion.div>

      <div className="grid gap-4 lg:gap-6">
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-lg bg-white overflow-hidden">
            <div className="h-24 lg:h-32 bg-gradient-to-r from-burntpeach/20 to-emerald-500/20" />
            <CardContent className="-mt-10 lg:-mt-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-20 h-20 lg:w-24 lg:h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-4"
              >
                <School className="w-10 h-10 lg:w-12 lg:h-12 text-burntpeach" />
              </motion.div>
              <h3 className="text-lg lg:text-xl font-bold text-jetblack">
                {data.name}
              </h3>
              <p className="text-jetblack/60 text-sm lg:text-base">
                {data.address}
              </p>

              <div className="grid grid-cols-3 gap-3 lg:gap-4 mt-4 lg:mt-6">
                <StatBox
                  label="Students"
                  value={data.student_count || "5,000+"}
                />
                <StatBox
                  label="Teachers"
                  value={data.teacher_count || "200+"}
                />
                <StatBox
                  label="Years"
                  value={data.years_established || "60+"}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-lg bg-white h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-base lg:text-lg text-jetblack flex items-center gap-2">
                  <Calendar className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-500" />
                  Academic Calendar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 lg:space-y-3">
                {data.calendar?.map((event: any, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-cream/30 rounded-lg gap-1"
                  >
                    <span className="text-jetblack font-medium text-sm">
                      {event.name}
                    </span>
                    <span className="text-jetblack/60 text-xs">
                      {event.date}
                    </span>
                  </motion.div>
                )) || (
                  <p className="text-jetblack/50 text-sm">No upcoming events</p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-lg bg-white h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-base lg:text-lg text-jetblack flex items-center gap-2">
                  <FileText className="w-4 h-4 lg:w-5 lg:h-5 text-violet-500" />
                  Policies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {data.policies?.map((policy: string, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-start gap-2 text-sm text-jetblack/80"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-burntpeach mt-2 shrink-0" />
                    <span className="text-xs lg:text-sm">{policy}</span>
                  </motion.div>
                )) || (
                  <p className="text-jetblack/50 text-sm">
                    Policies available at registrar office
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// Grades Content - Responsive
function GradesContent({ data, isLoading }: { data: any; isLoading: boolean }) {
  if (isLoading) return <LoadingState />;
  if (!data || data.length === 0)
    return <EmptyState message="No grades available yet" />;

  const gwa =
    data.reduce(
      (acc: number, grade: any) => acc + (grade.final_grade || 0),
      0,
    ) / data.length;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto"
    >
      <motion.div
        variants={itemVariants}
        className="mb-4 lg:mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
      >
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-jetblack">
            Academic Grades
          </h2>
          <p className="text-jetblack/60 text-sm lg:text-base">
            Your academic performance overview
          </p>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-burntpeach/10 px-4 py-2 rounded-xl self-start"
        >
          <p className="text-xs text-jetblack/60">General Average</p>
          <p className="text-xl lg:text-2xl font-bold text-burntpeach">
            {gwa.toFixed(2)}
          </p>
        </motion.div>
      </motion.div>

      <div className="grid gap-3 lg:gap-4">
        {data.map((grade: any, idx: number) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ scale: 1.01, x: 4 }}
            className="group"
          >
            <Card className="border-0 shadow-md bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-4 lg:p-5">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 lg:gap-4">
                    <div
                      className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center ${
                        grade.final_grade >= 75
                          ? "bg-emerald-100"
                          : "bg-red-100"
                      }`}
                    >
                      <BookOpen
                        className={`w-5 h-5 lg:w-6 lg:h-6 ${
                          grade.final_grade >= 75
                            ? "text-emerald-600"
                            : "text-red-600"
                        }`}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-jetblack text-sm lg:text-base">
                        {grade.subject_name}
                      </h4>
                      <p className="text-xs lg:text-sm text-jetblack/60">
                        {grade.semester} • {grade.school_year}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between lg:justify-end gap-4 lg:gap-6">
                    <div className="hidden md:flex gap-3 text-xs text-jetblack/50">
                      <span>WW: {grade.written_works}</span>
                      <span>PT: {grade.performance_tasks}</span>
                      <span>QA: {grade.quarterly_assessment}</span>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-xl lg:text-2xl font-bold ${
                          grade.final_grade >= 75
                            ? "text-emerald-600"
                            : "text-red-600"
                        }`}
                      >
                        {grade.final_grade}
                      </p>
                      <Badge
                        className={`text-xs ${
                          grade.remarks === "Passed"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {grade.remarks}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3 lg:mt-4">
                  <div className="h-2 bg-cream rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min((grade.final_grade / 100) * 100, 100)}%`,
                      }}
                      transition={{ duration: 0.8, delay: idx * 0.1 }}
                      className={`h-full rounded-full ${
                        grade.final_grade >= 75
                          ? "bg-emerald-500"
                          : "bg-red-500"
                      }`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Schedule Content - Responsive
function ScheduleContent({
  data,
  isLoading,
}: {
  data: any;
  isLoading: boolean;
}) {
  if (isLoading) return <LoadingState />;
  if (!data || data.length === 0)
    return <EmptyState message="No schedule assigned yet" />;

  const days = ["M", "T", "W", "TH", "F", "S"];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto"
    >
      <motion.div variants={itemVariants} className="mb-4 lg:mb-6">
        <h2 className="text-xl lg:text-2xl font-bold text-jetblack">
          Class Schedule
        </h2>
        <p className="text-jetblack/60 text-sm lg:text-base">
          Your weekly class timetable
        </p>
      </motion.div>

      {/* Day Tabs - Scrollable on mobile */}
      <motion.div
        variants={itemVariants}
        className="flex gap-2 mb-4 lg:mb-6 overflow-x-auto pb-2 scrollbar-hide"
      >
        {days.map((day, idx) => {
          const hasClasses = data.some((s: any) => s.day === day);
          return (
            <motion.button
              key={day}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex-1 min-w-[50px] py-2 lg:py-3 rounded-xl text-xs lg:text-sm font-medium transition-colors whitespace-nowrap ${
                hasClasses
                  ? "bg-burntpeach text-jetblack"
                  : "bg-white text-jetblack/40"
              }`}
            >
              {day}
            </motion.button>
          );
        })}
      </motion.div>

      <div className="space-y-2 lg:space-y-3">
        {data.map((schedule: any, idx: number) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ scale: 1.02, x: 4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="border-0 shadow-md bg-white">
              <CardContent className="p-3 lg:p-4">
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="flex flex-col items-center min-w-[50px] lg:min-w-[60px]">
                    <span className="text-xs text-jetblack/50">
                      {schedule.start_time}
                    </span>
                    <div className="w-0.5 h-6 lg:h-8 bg-cream my-1" />
                    <span className="text-xs text-jetblack/50">
                      {schedule.end_time}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-jetblack text-sm lg:text-base truncate">
                      {schedule.subject_name}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 lg:gap-4 mt-1 text-xs lg:text-sm text-jetblack/60">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span className="truncate">
                          {schedule.teacher_name}
                        </span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        Room {schedule.room}
                      </span>
                    </div>
                  </div>

                  <Badge className="bg-cream text-jetblack border-0 text-xs shrink-0">
                    {schedule.day}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Helper Components - Responsive
function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex items-center gap-2 lg:gap-3 p-2 lg:p-3 bg-cream/30 rounded-lg"
    >
      <Icon className="w-4 h-4 text-burntpeach shrink-0" />
      <div className="min-w-0">
        <p className="text-xs text-jetblack/50">{label}</p>
        <p className="text-xs lg:text-sm font-medium text-jetblack truncate">
          {value}
        </p>
      </div>
    </motion.div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center p-2 lg:p-3 bg-cream/30 rounded-xl">
      <p className="text-base lg:text-lg font-bold text-jetblack">{value}</p>
      <p className="text-xs text-jetblack/60">{label}</p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center h-64 lg:h-96">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className="w-8 h-8 text-burntpeach" />
      </motion.div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center h-64 lg:h-96 text-center px-4"
    >
      <div className="w-12 h-12 lg:w-16 lg:h-16 bg-cream rounded-2xl flex items-center justify-center mb-4">
        <FileText className="w-6 h-6 lg:w-8 lg:h-8 text-jetblack/30" />
      </div>
      <p className="text-jetblack/60 text-sm lg:text-base">{message}</p>
    </motion.div>
  );
}
