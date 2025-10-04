import { useState } from 'react'
import { Icon } from "@iconify/react/dist/iconify.js"
import { Button } from "@/components/ui/button"
import AddDepartureSession from './AddDepartureSession'
import DepartureSessionsList from './DepartureSessionsList'
import DepartureReportExport from './DepartureReportExport'

const DepartureManager = ({ delegation, onUpdate }) => {
    const [departureSessions, setDepartureSessions] = useState(
        delegation.departureInfo?.departureSessions || []
    )

    const handleAddSession = (newSession) => {
        const updatedSessions = [...departureSessions, newSession]
        setDepartureSessions(updatedSessions)
        
        // تحديث عدد المغادرين
        const totalDeparted = updatedSessions.reduce((total, session) => 
            total + session.members.length, 0
        )
        
        // تحديث حالة الوفد
        const newStatus = totalDeparted === parseInt(delegation.membersCount) 
            ? 'all_departed' 
            : totalDeparted > 0 
                ? 'partial_departed' 
                : 'not_departed'
        
        if (onUpdate) {
            onUpdate({
                ...delegation,
                delegationStatus: newStatus,
                departureInfo: {
                    ...delegation.departureInfo,
                    totalMembers: parseInt(delegation.membersCount),
                    departedMembers: totalDeparted,
                    departureSessions: updatedSessions
                }
            })
        }
    }

    const handleUpdateSession = (updatedSession) => {
        const updatedSessions = departureSessions.map(session => 
            session.id === updatedSession.id ? updatedSession : session
        )
        setDepartureSessions(updatedSessions)
        
        // تحديث عدد المغادرين
        const totalDeparted = updatedSessions.reduce((total, session) => 
            total + session.members.length, 0
        )
        
        // تحديث حالة الوفد
        const newStatus = totalDeparted === parseInt(delegation.membersCount) 
            ? 'all_departed' 
            : totalDeparted > 0 
                ? 'partial_departed' 
                : 'not_departed'
        
        if (onUpdate) {
            onUpdate({
                ...delegation,
                delegationStatus: newStatus,
                departureInfo: {
                    ...delegation.departureInfo,
                    totalMembers: parseInt(delegation.membersCount),
                    departedMembers: totalDeparted,
                    departureSessions: updatedSessions
                }
            })
        }
    }

    const handleDeleteSession = (sessionId) => {
        const updatedSessions = departureSessions.filter(session => session.id !== sessionId)
        setDepartureSessions(updatedSessions)
        
        // تحديث عدد المغادرين
        const totalDeparted = updatedSessions.reduce((total, session) => 
            total + session.members.length, 0
        )
        
        // تحديث حالة الوفد
        const newStatus = totalDeparted === parseInt(delegation.membersCount) 
            ? 'all_departed' 
            : totalDeparted > 0 
                ? 'partial_departed' 
                : 'not_departed'
        
        if (onUpdate) {
            onUpdate({
                ...delegation,
                delegationStatus: newStatus,
                departureInfo: {
                    ...delegation.departureInfo,
                    totalMembers: parseInt(delegation.membersCount),
                    departedMembers: totalDeparted,
                    departureSessions: updatedSessions
                }
            })
        }
    }

    const totalDeparted = departureSessions.reduce((total, session) => 
        total + session.members.length, 0
    )
    const remainingMembers = parseInt(delegation.membersCount) - totalDeparted
    
    // حساب الأعضاء المتاحين للمغادرة (الذين لم يغادروا بعد)
    const availableMembers = delegation.members?.filter(member => 
        member.memberStatus !== 'departed'
    ) || []

    return (
        <div className="departure-management bg-white border border-neutral-300 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">إدارة المغادرات</h3>
                <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">
                        <span className="font-medium">المغادرون: {totalDeparted}</span>
                        <span className="mx-2">|</span>
                        <span className="font-medium">المتبقون: {remainingMembers}</span>
                        <span className="mx-2">|</span>
                        <span className="font-medium">المتاحون: {availableMembers.length}</span>
                    </div>
                    <DepartureReportExport delegation={delegation} />
                    <AddDepartureSession 
                        delegation={delegation}
                        onAdd={handleAddSession}
                        remainingMembers={availableMembers.length}
                    />
                </div>
            </div>

            {departureSessions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                    <Icon icon="material-symbols:flight-takeoff" fontSize={48} className="mx-auto mb-4" />
                    <p>لم يتم تسجيل أي مغادرات بعد</p>
                    <p className="text-sm">اضغط على "إضافة جلسة مغادرة" لبدء تسجيل المغادرات</p>
                    {availableMembers.length === 0 && (
                        <p className="text-sm text-orange-600 mt-2">جميع الأعضاء قد غادروا بالفعل</p>
                    )}
                </div>
            ) : (
                <DepartureSessionsList 
                    sessions={departureSessions}
                    delegation={delegation}
                    onDelete={handleDeleteSession}
                    onUpdate={handleUpdateSession}
                />
            )}
        </div>
    )
}

export default DepartureManager
