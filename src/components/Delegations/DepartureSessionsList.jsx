import { Icon } from "@iconify/react/dist/iconify.js"
import { Button } from "@/components/ui/button"
import { formatTime } from "../../utils"
import DeletePopup from "../DeletePopup"
import EditDepartureSession from "./EditDepartureSession"

const DepartureSessionsList = ({ sessions, delegation, onDelete, onUpdate }) => {
    if (sessions.length === 0) {
        return null
    }

    return (
        <div className="space-y-4">
            <h4 className="font-medium text-lg">جلسات المغادرة المسجلة</h4>
            
            {sessions.map((session, index) => (
                <div key={session.id} className="border border-neutral-300 rounded-2xl p-4 bg-neutral-50">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <Icon icon="material-symbols:flight-takeoff" className="text-primary-600" />
                            <h5 className="font-medium">جلسة مغادرة #{index + 1}</h5>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                                {session.members.length} عضو
                            </span>
                            <EditDepartureSession 
                                session={session}
                                delegation={delegation}
                                onUpdate={onUpdate}
                            />
                            <DeletePopup 
                                item={session}
                                onConfirm={() => onDelete(session.id)}
                            >
                                <Button variant="outline" size="sm" className="!ring-0">
                                    <Icon icon="mynaui:trash" />
                                </Button>
                            </DeletePopup>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                            <span className="text-muted-foreground">التاريخ:</span>
                            <p className="font-medium">{session.date}</p>
                        </div>
                        <div>
                            <span className="text-muted-foreground">سعت:</span>
                            <p className="font-medium">{session.time ? session.time.replace(':', '') : ''}</p>
                        </div>
                        <div>
                            <span className="text-muted-foreground">المطار:</span>
                            <p className="font-medium">{session.hall}</p>
                        </div>
                        <div>
                            <span className="text-muted-foreground">شركة الطيران:</span>
                            <p className="font-medium">{session.airline}</p>
                        </div>
                        <div>
                            <span className="text-muted-foreground">رقم الرحلة:</span>
                            <p className="font-medium">{session.flightNumber}</p>
                        </div>
                        <div>
                            <span className="text-muted-foreground">الوجهة:</span>
                            <p className="font-medium">{session.destination}</p>
                        </div>
                        <div>
                            <span className="text-muted-foreground">المستقبل:</span>
                            <p className="font-medium">{session.receptor}</p>
                        </div>
                        <div>
                            <span className="text-muted-foreground">الشحنات:</span>
                            <p className="font-medium">{session.shipments}</p>
                        </div>
                    </div>

                    {session.notes && (
                        <div className="mt-3 p-3 bg-white rounded-xl border">
                            <span className="text-muted-foreground font-medium">ملاحظات:</span>
                            <p className="text-foreground mt-1">{session.notes}</p>
                        </div>
                    )}

                    <div className="mt-3">
                        <span className="text-muted-foreground font-medium">الأعضاء المغادرون:</span>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {session.members.map(memberId => {
                                const member = delegation.members?.find(m => m.id === memberId)
                                return member ? (
                                    <span 
                                        key={memberId}
                                        className="px-2 py-1 bg-primary-100 text-primary-800 rounded-xl text-xs"
                                    >
                                        {member.rank} {member.name}
                                    </span>
                                ) : (
                                    <span 
                                        key={memberId}
                                        className="px-2 py-1 bg-neutral-200 text-neutral-600 rounded-xl text-xs"
                                    >
                                        عضو #{memberId}
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DepartureSessionsList
