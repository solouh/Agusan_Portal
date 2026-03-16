// components/student-profile.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Student } from '@/types/student'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Flag,
  Facebook,
  GraduationCap,
  Home,
  IdCard,
  BookOpen,
  Building2,
  Users,
  MapPinned,
  Briefcase
} from 'lucide-react'
import Link from 'next/link'

interface StudentProfileProps {
  student: Student
}

export function StudentProfile({ student }: StudentProfileProps) {
  const fullName = `${student.first_name} ${student.middle_name ? student.middle_name + ' ' : ''}${student.last_name}${student.extension_name ? ' ' + student.extension_name : ''}`

  return (
    <div className="min-h-screen w-full from-slate-50 to-slate-100 pb-12">
      {/* Hero Header */}
      <div className="bg-white border-slate-200">
        <div className="w-full px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                {student.first_name[0]}{student.last_name[0]}
              </div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white" />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-slate-900">{fullName}</h1>
                <Badge
                  className={student.status === 'active'
                    ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-100'
                    : 'bg-slate-100 text-slate-600 border-slate-200'
                  }
                >
                  {student.status}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                <span className="flex items-center gap-1.5">
                  <IdCard className="h-4 w-4 text-slate-400" />
                  LRN: {student.LRN}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  {new Date(student.birth_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Flag className="h-4 w-4 text-slate-400" />
                  {student.citizenship}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Single Card */}
      <div className="w-full px-6 -mt-6">
        <Card className="shadow-xl border-0 bg-white overflow-hidden">
          {/* Academic Information */}
          <div className="p-6 md:p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Academic Information</h2>
            </div>

            {student?.enrollments?.map((enrollment, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InfoBox label="Grade" value={enrollment.grade_level} />
                <InfoBox label="Strand" value={enrollment.strand} />
                <InfoBox label="School Year" value={enrollment.school_year} />
              </div>
            ))}
          </div>

          {/* Personal Information */}
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-slate-100 rounded-lg">
                <User className="h-5 w-5 text-slate-600" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Personal Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <DetailField label="First Name" value={student.first_name} highlight />
              <DetailField label="Last Name" value={student.last_name} highlight />
              <DetailField label="Middle Name" value={student.middle_name} />
              <DetailField label="Extension Name" value={student.extension_name} />

              <DetailField
                label="Date of Birth"
                value={new Date(student.birth_date).toLocaleDateString()}
              />
              <DetailField label="Place of Birth" value={student.birth_place} />
              <DetailField label="Gender" value={student.gender} />
              <DetailField label="Civil Status" value={student.civil_status} />

              <DetailField label="Citizenship" value={student.citizenship} />
              <DetailField label="Religion" value={student.religion} />
              <Link href={student.facebook_link || '#'} target="_blank" rel="noopener noreferrer">
                <DetailField label="facebooklink" value={"Link"} />
              </Link>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div className="p-6 md:p-8 bg-slate-50/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 rounded-lg">
                <Phone className="h-5 w-5 text-green-600" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Contact Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {student.email && (
                <ContactCard
                  icon={<Mail className="h-5 w-5" />}
                  label="Email"
                  value={student.email}
                  href={`mailto:${student.email}`}
                  color="green"
                />
              )}

              {student.phone_number && (
                <ContactCard
                  icon={<Phone className="h-5 w-5" />}
                  label="Phone"
                  value={student.phone_number}
                  color="green"
                />
              )}

              {student.facebook_name && (
                <ContactCard
                  icon={<Facebook className="h-5 w-5" />}
                  label="Facebook"
                  value={student.facebook_name}
                  href={student.facebook_link}
                  isExternal
                  color="blue"
                />
              )}
            </div>
          </div>

          {student.student_address && student.student_address.length > 0 && (
            <>
              <Separator />
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <MapPinned className="h-5 w-5 text-orange-600" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">Address</h2>
                </div>

                <div className="space-y-4">
                  {student.student_address.map((addr) => (
                    <div key={addr.id} className="flex items-start gap-4 p-5 bg-orange-50/50 rounded-xl border border-orange-100">
                      <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                        <MapPin className="h-6 w-6 text-orange-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <h3 className="font-semibold text-slate-900 text-lg">
                            {addr.city}, {addr.province}
                          </h3>
                          <Badge variant="outline" className="w-fit border-orange-200 text-orange-700 bg-white">
                            Barangay {addr.barangay}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-500 mt-1">
                          {addr.house_no} {addr.street}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Parents */}
          {student.parents && student.parents.length > 0 && (
            <>
              <Separator />
              <div className="p-6 md:p-8 bg-slate-50/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">Family Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {student.parents.map((parent, index) => (
                    <div key={parent.id || index} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                          <User className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900 text-lg">
                            {parent.first_name} {parent.last_name}
                          </p>
                          <Badge
                            variant="secondary"
                            className="mt-1 text-xs capitalize bg-purple-50 text-purple-700 border-purple-200"
                          >
                            {parent.type}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        {parent.phone && (
                          <p className="flex items-center gap-2 text-slate-600">
                            <Phone className="h-4 w-4 text-slate-400" />
                            {parent.phone}
                          </p>
                        )}

                        {parent.education_level && (
                          <p className="flex items-center gap-2 text-slate-600">
                            <GraduationCap className="h-4 w-4 text-slate-400" />
                            <span className="text-slate-500">Education:</span>
                            <span className="capitalize">{parent.education_level}</span>
                          </p>
                        )}

                        {parent.employment_status && (
                          <p className="flex items-center gap-2 text-slate-600">
                            <Briefcase className="h-4 w-4 text-slate-400" />
                            <span className="text-slate-500">Employment:</span>
                            <span className="capitalize">{parent.employment_status}</span>
                            {parent.job_category && (
                              <span className="text-slate-400">({parent.job_category})</span>
                            )}
                          </p>
                        )}

                        {parent.living_status && (
                          <p className="flex items-center gap-2 text-slate-600">
                            <Home className="h-4 w-4 text-slate-400" />
                            <span className="text-slate-500">Living Status:</span>
                            <span className="capitalize">{parent.living_status}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Education Background */}
          {student.education_backgrounds && student.education_backgrounds.length > 0 && (
            <>
              <Separator />
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <GraduationCap className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">Education Background</h2>
                </div>

                <div className="space-y-4">
                  {student.education_backgrounds.map((edu) => (
                    <div key={edu.id} className="flex items-start gap-4 p-5 bg-indigo-50/50 rounded-xl border border-indigo-100">
                      <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                        <BookOpen className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <h3 className="font-semibold text-slate-900 text-lg">{edu.last_school_name}</h3>
                          <Badge variant="outline" className="w-fit border-indigo-200 text-indigo-700 bg-white">
                            {edu.year_graduated}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-500 capitalize mt-1">{edu.school_type}</p>
                        {edu.school_address && (
                          <p className="text-sm text-slate-600 mt-2 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {edu.school_address}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}

// Helper Components
function DetailField({ label, value, highlight }: { label: string; value?: string | null; highlight?: boolean }) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">{label}</p>
      <p className={`text-sm font-medium capitalize ${highlight ? 'text-slate-900 text-base' : 'text-slate-700'}`}>
        {value || <span className="text-slate-400 italic">Not provided</span>}
      </p>
    </div>
  )
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/60 rounded-lg p-3">
      <p className="text-xs text-blue-600 uppercase tracking-wider font-medium mb-1">{label}</p>
      <p className="text-sm font-semibold text-slate-900">{value}</p>
    </div>
  )
}

function ContactCard({ icon, label, value, href, isExternal, color }: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string | null
  isExternal?: boolean
  color: 'green' | 'blue'
}) {
  const colorClasses = {
    green: 'bg-green-50 border-green-200 hover:border-green-300 text-green-700',
    blue: 'bg-blue-50 border-blue-200 hover:border-blue-300 text-blue-700'
  }

  const content = (
    <div className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 ${colorClasses[color]}`}>
      <div className="p-2 bg-white rounded-lg shadow-sm">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs uppercase tracking-wider font-medium opacity-70">{label}</p>
        <p className="text-sm font-semibold truncate">{value}</p>
      </div>
    </div>
  )

  if (href) {
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="block hover:scale-[1.02] transition-transform"
      >
        {content}
      </a>
    )
  }

  return content
}