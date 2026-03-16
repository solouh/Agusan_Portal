// components/student-detail.tsx
'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ParentInfo } from "./parent-info"
import { Student } from "@/types/student"
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  User, 
  Flag,
  Facebook,
  GraduationCap,
  Home
} from "lucide-react"
import Link from "next/link"

interface StudentDetailProps {
  student: Student
}

export function StudentDetail({ student }: StudentDetailProps) {
  const [activeTab, setActiveTab] = useState('personal')

  const fullName = `${student.first_name} ${student.middle_name ? student.middle_name + ' ' : ''}${student.last_name}${student.extension_name ? ' ' + student.extension_name : ''}`

  return (
    <div className="min-h-screen bg-cream pb-12">
      {/* Header */}
      <div className="bg-jetblack text-cream py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <Button 
            variant="ghost" 
            className="text-cream/80 hover:text-cream hover:bg-cream/10 mb-4"
            asChild
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Students
            </Link>
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-cream">{fullName}</h1>
              <p className="text-cream/60 mt-1">LRN: {student.lrn}</p>
            </div>
            <Badge 
              className={student.status === 'active' 
                ? 'bg-burntpeach text-cream border-0 text-sm px-4 py-1' 
                : 'bg-dustgray text-jetblack text-sm px-4 py-1'
              }
            >
              {student.status.toUpperCase()}
            </Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 -mt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-platinum border border-dustgray/30 p-1">
            <TabsTrigger 
              value="personal"
              className="data-[state=active]:bg-cream data-[state=active]:text-jetblack text-jetblack/70"
            >
              <User className="h-4 w-4 mr-2" />
              Personal Info
            </TabsTrigger>
            <TabsTrigger 
              value="parents"
              className="data-[state=active]:bg-cream data-[state=active]:text-jetblack text-jetblack/70"
            >
              <Home className="h-4 w-4 mr-2" />
              Parents
            </TabsTrigger>
            <TabsTrigger 
              value="education"
              className="data-[state=active]:bg-cream data-[state=active]:text-jetblack text-jetblack/70"
            >
              <GraduationCap className="h-4 w-4 mr-2" />
              Education
            </TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Basic Info */}
              <Card className="lg:col-span-2 border-dustgray/30 bg-platinum">
                <CardHeader>
                  <CardTitle className="text-jetblack flex items-center gap-2">
                    <User className="h-5 w-5 text-desertsand" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoField label="First Name" value={student.first_name} />
                    <InfoField label="Last Name" value={student.last_name} />
                    <InfoField label="Middle Name" value={student.middle_name || 'N/A'} />
                    <InfoField label="Extension Name" value={student.extension_name || 'N/A'} />
                    <InfoField label="Gender" value={student.gender} />
                    <InfoField 
                      label="Birth Date" 
                      value={new Date(student.birth_date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })} 
                    />
                    <InfoField label="Civil Status" value={student.civil_status} />
                    <InfoField label="Citizenship" value={student.citizenship} />
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="border-dustgray/30 bg-platinum">
                <CardHeader>
                  <CardTitle className="text-jetblack flex items-center gap-2">
                    <Phone className="h-5 w-5 text-desertsand" />
                    Contact Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {student.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-desertsand" />
                      <div>
                        <p className="text-xs text-jetblack/50">Email</p>
                        <a 
                          href={`mailto:${student.email}`} 
                          className="text-sm text-jetblack hover:text-burntpeach transition-colors"
                        >
                          {student.email}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {student.phone_number && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-desertsand" />
                      <div>
                        <p className="text-xs text-jetblack/50">Phone</p>
                        <p className="text-sm text-jetblack">{student.phone_number}</p>
                      </div>
                    </div>
                  )}
                  
                  {student.alternative_phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-desertsand" />
                      <div>
                        <p className="text-xs text-jetblack/50">Alternative Phone</p>
                        <p className="text-sm text-jetblack">{student.alternative_phone}</p>
                      </div>
                    </div>
                  )}
                  
                  {student.facebook_link && (
                    <div className="flex items-center gap-3">
                      <Facebook className="h-4 w-4 text-desertsand" />
                      <div>
                        <p className="text-xs text-jetblack/50">Facebook</p>
                        <a 
                          href={student.facebook_link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-jetblack hover:text-burntpeach transition-colors truncate max-w-[200px] block"
                        >
                          View Profile
                        </a>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Address Section */}
            {student.student_address && (
              <Card className="border-dustgray/30 bg-platinum">
                <CardHeader>
                  <CardTitle className="text-jetblack flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-desertsand" />
                    Address Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InfoField 
                      label="House No." 
                      value={student.student_address.house_no || 'N/A'} 
                    />
                    <InfoField 
                      label="Street" 
                      value={student.student_address.street || 'N/A'} 
                    />
                    <InfoField 
                      label="Barangay" 
                      value={student.student_address.barangay || 'N/A'} 
                    />
                    <InfoField 
                      label="City" 
                      value={student.student_address.city || 'N/A'} 
                    />
                    <InfoField 
                      label="Province" 
                      value={student.student_address.province || 'N/A'} 
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Parents Tab */}
          <TabsContent value="parents">
            <ParentInfo parents={student.parents || []} />
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education">
            <div className="space-y-4">
              {student.education_backgrounds?.map((edu) => (
                <Card key={edu.id} className="border-dustgray/30 bg-platinum">
                  <CardHeader>
                    <CardTitle className="text-jetblack flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-desertsand" />
                      {edu.last_school_name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <InfoField label="School Type" value={edu.school_type} />
                      <InfoField label="Year Graduated" value={edu.year_graduated.toString()} />
                      <InfoField 
                        label="Address" 
                        value={edu.school_address || 'N/A'} 
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {(!student.education_backgrounds || student.education_backgrounds.length === 0) && (
                <Card className="border-dashed border-2 border-dustgray/50 bg-platinum/50">
                  <CardContent className="py-8 text-center">
                    <GraduationCap className="h-12 w-12 text-dustgray mx-auto mb-3" />
                    <p className="text-jetblack/50">No education background records found</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-jetblack/50 uppercase tracking-wide">{label}</p>
      <p className="text-sm font-medium text-jetblack capitalize">{value}</p>
    </div>
  )
}