import { Icon } from "@iconify/react/dist/iconify.js";
import AddEvent from "../../components/Events/AddEvent";
import EmptyEvent from "../../components/Events/EmptyEvent";
import EventsList from "../../components/Events/EventsList";
import { Button } from "@/components/ui/button"
import Stats from "../../components/Stats";

const Edex = () => {
    return (
        <div className="content">
            <Stats delegationNum={86} militaryDelegationNum={52} civilDelegationNum={17} memebersNum={170} />
            <div className="mt-8 bg-white border border-neutral-300 rounded-2xl p-6">
                {/* <EmptyEvent /> */}
                <div className="flex items-center gap-4 justify-between mb-6">
                    <Button variant="outline" className="!ring-0">
                        <Icon icon={'fluent:filter-32-filled'} />
                        <span>فلتر</span>
                    </Button>
                    <AddEvent />
                </div>
                <EventsList />
            </div>
        </div>
    );
};

export default Edex;
