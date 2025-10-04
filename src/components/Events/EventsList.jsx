import { Icon } from "@iconify/react/dist/iconify.js"
import { NavLink } from "react-router"
import { events } from "../../constants"


const EventsList = ({ events: customEvents, categoryId }) => {
    // استخدام البيانات الممررة أو البيانات الافتراضية
    const eventsData = customEvents || events;
    
    return (
        <div className="flex flex-col gap-4">
            {
                eventsData.map((event, index) => (
                    <NavLink 
                        key={event.id || index} 
                        to={categoryId ? `/category/${categoryId}/event/${event.id || index}` : `/edex/${index}`} 
                        className="box bg-white w-full border border-neutral-300 rounded-xl flex flex-col transition-all ease-out hover:shadow cursor-pointer hover:border-primary-400"
                    >
                        <div className="w-full border-b p-6 border-neutral-300 flex items-center gap-4 pb-6">
                            <div className="w-18 h-18 rounded-full grid place-items-center bg-gradient-to-b from-[#F4CB00] to-[#F4B400]">
                                <Icon icon="stash:calendar-star-solid" fontSize={42} className="text-white" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <h2 className="font-bold text-xl">{event.name}</h2>
                                <div className="text-neutral-400 flex items-center gap-1">
                                    <Icon icon={'mingcute:location-fill'} fontSize={22} />
                                    <span>مركز مصر للمعارض الدولية</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex items-center gap-6 p-6 justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-neutral-100 grid place-items-center text-neutral-800">
                                    <Icon icon="solar:calendar-bold" fontSize={26} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm text-neutral-400">التاريخ</span>
                                    <span className="font-medium">{event.date}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-neutral-100 grid place-items-center text-neutral-800">
                                    <Icon icon={'fa:globe'} fontSize={26} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm text-neutral-400">عدد الوفود</span>
                                    <span className="font-medium">{event.delegationCount}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-neutral-100 grid place-items-center text-neutral-800">
                                    <Icon icon={'fa:users'} fontSize={22} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm text-neutral-400">عدد الاعضاء</span>
                                    <span className="font-medium">{event.membersCount}</span>
                                </div>
                            </div>
                        </div>
                    </NavLink>
                ))
            }
        </div>
    )
}

export default EventsList