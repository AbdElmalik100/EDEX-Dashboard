import Members from "../../components/Members/Members"
import { useParams } from "react-router"
import { members, delegations } from "../../data"
import { formatTime } from "../../utils"
import DepartureManager from "../../components/Delegations/DepartureManager"

const EdexMembers = () => {
    const { delegationId } = useParams()
    
    // العثور على الوفد المحدد
    const selectedDelegation = delegations.find(d => d.id === delegationId)
    
    // تصفية الأعضاء الذين ينتمون لهذا الوفد
    const delegationMembers = members.filter(member => member.delegation.id === delegationId)
    
    return (
        <div className="content">
            <div className="delegationDetails mb-6 p-4 bg-white border border-neutral-300 rounded-2xl">
                <h2 className="text-xl font-bold mb-4">تفاصيل الوفد</h2>
                {selectedDelegation ? (
                    <div className="space-y-6">
                        {/* معلومات الوصول */}
                        <div>
                            <h3 className="text-lg font-semibold mb-3 text-primary-600">معلومات الوصول</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <span className="text-muted-foreground">الجنسية:</span>
                                    <p className="font-medium">{selectedDelegation.nationality}</p>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">رئيس الوفد:</span>
                                    <p className="font-medium">{selectedDelegation.delegationHead}</p>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">عدد الأعضاء:</span>
                                    <p className="font-medium">{selectedDelegation.membersCount}</p>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">مطار الوصول:</span>
                                    <p className="font-medium">{selectedDelegation.arrivalInfo?.arrivalHall}</p>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">شركة طيران الوصول:</span>
                                    <p className="font-medium">{selectedDelegation.arrivalInfo?.arrivalAirline}</p>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">رقم رحلة الوصول:</span>
                                    <p className="font-medium">{selectedDelegation.arrivalInfo?.arrivalFlightNumber}</p>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">تاريخ الوصول:</span>
                                    <p className="font-medium">{selectedDelegation.arrivalInfo?.arrivalDate}</p>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">سعت الوصول:</span>
                                    <p className="font-medium">{formatTime(selectedDelegation.arrivalInfo?.arrivalTime)}</p>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">مستقبل الوصول:</span>
                                    <p className="font-medium">{selectedDelegation.arrivalInfo?.arrivalReceptor}</p>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">وجهة الوصول:</span>
                                    <p className="font-medium">{selectedDelegation.arrivalInfo?.arrivalDestination}</p>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">شحنات الوصول:</span>
                                    <p className="font-medium">{selectedDelegation.arrivalInfo?.arrivalShipments}</p>
                                </div>
                            </div>
                        </div>

                        {/* إدارة المغادرات */}
                        <div>
                            <h3 className="text-lg font-semibold mb-3 text-primary-500">إدارة المغادرات</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                <div>
                                    <span className="text-muted-foreground">إجمالي الأعضاء:</span>
                                    <p className="font-medium">{selectedDelegation.departureInfo?.totalMembers || selectedDelegation.membersCount}</p>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">عدد المغادرين:</span>
                                    <p className="font-medium">{selectedDelegation.departureInfo?.departedMembers || 0}</p>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">المتبقون:</span>
                                    <p className="font-medium">{(selectedDelegation.departureInfo?.totalMembers || parseInt(selectedDelegation.membersCount)) - (selectedDelegation.departureInfo?.departedMembers || 0)}</p>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">عدد جلسات المغادرة:</span>
                                    <p className="font-medium">{selectedDelegation.departureInfo?.departureSessions?.length || 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-red-600">لم يتم العثور على الوفد المحدد</p>
                )}
            </div>
            
            {/* إدارة المغادرات */}
            {selectedDelegation && (
                <DepartureManager 
                    delegation={selectedDelegation}
                    onUpdate={(updatedDelegation) => {
                        // هنا يمكن إضافة منطق تحديث البيانات
                        console.log('تم تحديث الوفد:', updatedDelegation)
                    }}
                />
            )}
            
            <Members members={delegationMembers} showDelegationInfo={true} />
        </div>
    )
}

export default EdexMembers