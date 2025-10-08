import { useState, useEffect } from "react"
import { Icon } from "@iconify/react/dist/iconify.js"
import AddEvent from "../../components/Events/AddEvent"
import EmptyEvent from "../../components/Events/EmptyEvent"
import EventsList from "../../components/Events/EventsList"
import { Button } from "@/components/ui/button"
import Stats from "../../components/Stats"

const Equestrianism = () => {
    const [subEvents, setSubEvents] = useState([]);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [stats, setStats] = useState({
        delegationNum: 0,
        militaryDelegationNum: 0,
        civilDelegationNum: 0,
        memebersNum: 0
    });

    useEffect(() => {
        const loadEvents = () => {
            // جلب الأحداث الفرعية للفروسية من localStorage
            const savedEvents = localStorage.getItem('mainEvents');
            if (savedEvents) {
                try {
                    const events = JSON.parse(savedEvents);
                    // البحث عن حدث الفروسية بالـ ID أو الاسم (للدعم المتوافق)
                    const equestrianismEvent = events.find(event => 
                        event.id === 2 || // ID الخاص بالفروسية
                        event.name === 'الفروسية' || 
                        event.englishName === 'equestrianism'
                    );
                    if (equestrianismEvent && equestrianismEvent.sub_events) {
                        setSubEvents(equestrianismEvent.sub_events);
                        setCurrentEvent(equestrianismEvent);
                        
                        // حساب الإحصائيات الحقيقية
                        const subEventIds = equestrianismEvent.sub_events.map(se => se.id);
                        
                        // جلب الوفود
                        const savedDelegations = localStorage.getItem('delegations');
                        let delegationCount = 0;
                        let militaryCount = 0;
                        let civilCount = 0;
                        
                        if (savedDelegations) {
                            const delegations = JSON.parse(savedDelegations);
                            const filteredDelegations = delegations.filter(d => 
                                subEventIds.includes(d.subEventId) || subEventIds.includes(parseInt(d.subEventId))
                            );
                            
                            delegationCount = filteredDelegations.length;
                            militaryCount = filteredDelegations.filter(d => d.type === 'military').length;
                            civilCount = filteredDelegations.filter(d => d.type === 'civil').length;
                        }
                        
                        // جلب الأعضاء
                        const savedMembers = localStorage.getItem('members');
                        let memberCount = 0;
                        
                        if (savedMembers) {
                            const members = JSON.parse(savedMembers);
                            const filteredMembers = members.filter(m => 
                                subEventIds.includes(m.subEventId) || subEventIds.includes(parseInt(m.subEventId))
                            );
                            memberCount = filteredMembers.length;
                        }
                        
                        setStats({
                            delegationNum: delegationCount,
                            militaryDelegationNum: militaryCount,
                            civilDelegationNum: civilCount,
                            memebersNum: memberCount
                        });
                    } else {
                        setSubEvents([]);
                        setCurrentEvent(null);
                        setStats({
                            delegationNum: 0,
                            militaryDelegationNum: 0,
                            civilDelegationNum: 0,
                            memebersNum: 0
                        });
                    }
                } catch (error) {
                    console.error('خطأ في تحليل بيانات الأحداث:', error);
                    setSubEvents([]);
                    setCurrentEvent(null);
                    setStats({
                        delegationNum: 0,
                        militaryDelegationNum: 0,
                        civilDelegationNum: 0,
                        memebersNum: 0
                    });
                }
            } else {
                setSubEvents([]);
                setCurrentEvent(null);
                setStats({
                    delegationNum: 0,
                    militaryDelegationNum: 0,
                    civilDelegationNum: 0,
                    memebersNum: 0
                });
            }
        }
        
        loadEvents()
        
        // الاستماع لتغييرات localStorage
        const handleStorageChange = () => {
            loadEvents()
        }
        
        window.addEventListener('storage', handleStorageChange)
        window.addEventListener('eventAdded', handleStorageChange)
        window.addEventListener('eventDeleted', handleStorageChange)
        window.addEventListener('eventUpdated', handleStorageChange)
        window.addEventListener('delegationAdded', handleStorageChange)
        window.addEventListener('delegationDeleted', handleStorageChange)
        window.addEventListener('memberAdded', handleStorageChange)
        window.addEventListener('memberDeleted', handleStorageChange)
        
        return () => {
            window.removeEventListener('storage', handleStorageChange)
            window.removeEventListener('eventAdded', handleStorageChange)
            window.removeEventListener('eventDeleted', handleStorageChange)
            window.removeEventListener('eventUpdated', handleStorageChange)
            window.removeEventListener('delegationAdded', handleStorageChange)
            window.removeEventListener('delegationDeleted', handleStorageChange)
            window.removeEventListener('memberAdded', handleStorageChange)
            window.removeEventListener('memberDeleted', handleStorageChange)
        }
    }, []);

    return (
        <div className="content">
            <Stats 
                delegationNum={stats.delegationNum} 
                militaryDelegationNum={stats.militaryDelegationNum} 
                civilDelegationNum={stats.civilDelegationNum} 
                memebersNum={stats.memebersNum} 
            />
            <div className="mt-8 bg-white border border-neutral-300 rounded-2xl p-6">
                {subEvents.length === 0 ? (
                    <EmptyEvent />
                ) : (
                    <>
                        <div className="flex items-center gap-4 justify-between mb-6">
                            <Button variant="outline" className="!ring-0">
                                <Icon icon={'fluent:filter-32-filled'} />
                                <span>فلتر</span>
                            </Button>
                            <AddEvent />
                        </div>
                        <EventsList events={subEvents} mainEventName={currentEvent?.name} mainEventEnglishName={currentEvent?.englishName} />
                    </>
                )}
            </div>
        </div>
    )
}

export default Equestrianism