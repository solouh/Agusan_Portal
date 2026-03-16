// components/parent-info.tsx
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Parent } from "@/types/student"
import { 
  User, 
  Phone, 
  GraduationCap, 
  Home, 
  Briefcase, 
  Heart,
  UserCircle
} from "lucide-react"

interface ParentInfoProps {
  parents: Parent[]
}

export function ParentInfo({ parents }: ParentInfoProps) {
  const father = parents.find(p => p.type === 'father')
  const mother = parents.find(p => p.type === 'mother')
  const guardians = parents.filter(p => p.type === 'guardian')

  return (
    <div className="space-y-6">
      {/* Parents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ParentSection parent={father} type="father" icon={<User className="h-5 w-5" />} />
        <ParentSection parent={mother} type="mother" icon={<User className="h-5 w-5" />} />
      </div>

      {/* Guardians */}
      {guardians.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <UserCircle className="h-5 w-5 text-slate-600" />
            Guardian Information
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {guardians.map((guardian) => (
              <ParentSection 
                key={guardian.id} 
                parent={guardian} 
                type="guardian" 
                icon={<UserCircle className="h-5 w-5" />} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function ParentSection({ parent, type, icon }: { parent?: Parent; type: string; icon: React.ReactNode }) {
  const isEmpty = !parent
  
  return (
    <Card className="border-slate-200 overflow-hidden">
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600">
            {icon}
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 capitalize">{type}'s Information</h4>
            {parent && (
              <p className="text-sm text-slate-600">{parent.first_name} {parent.last_name}</p>
            )}
          </div>
        </div>
        <Badge variant="outline" className="capitalize border-slate-300 text-slate-600">
          {type}
        </Badge>
      </div>
      
      <CardContent className="p-6">
        {isEmpty ? (
          <p className="text-sm text-slate-400 italic text-center py-4">No information provided</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <InfoItem icon={<User className="h-4 w-4" />} label="Full Name" value={`${parent.first_name} ${parent.last_name}`} />
            <InfoItem icon={<Phone className="h-4 w-4" />} label="Contact" value={parent.phone} />
            <InfoItem icon={<GraduationCap className="h-4 w-4" />} label="Education" value={parent.education_level} />
            <InfoItem icon={<Briefcase className="h-4 w-4" />} label="Employment" value={parent.employment_status} />
            <InfoItem icon={<Home className="h-4 w-4" />} label="Living Status" value={parent.living_status} />
            <InfoItem icon={<Heart className="h-4 w-4" />} label="Job Category" value={parent.job_category} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string | null }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1.5 text-slate-500">
        {icon}
        <span className="text-xs uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-sm font-medium text-slate-900">{value || 'N/A'}</p>
    </div>
  )
}