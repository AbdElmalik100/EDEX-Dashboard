import { EmptyEvent } from '../components/Events/EmptyEvent'
import EventsList from '../components/Events/EventsList'
import Stats from '../components/Stats'

const Home = () => {
    return (
        <div className='content'>
            <Stats />
            <div className='mt-8 bg-white border border-neutral-300 rounded-2xl p-6'>
                {/* <EmptyEvent /> */}
                <EventsList />
            </div>
        </div>
    )
}

export default Home