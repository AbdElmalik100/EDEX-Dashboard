import EventsList from '../components/Events/EventsList'
import Stats from '../components/Stats'

const Home = () => {
    return (
        <div className='content'>
            <Stats />
            <div className='mt-8 bg-white border border-neutral-300 rounded-2xl p-6'>
                {/* <EmptyEvent /> */}
                <div className='flex items-center gap-4 justify-between mb-6'>
                    <h2 className='text-2xl font-bold'>اخر الاحداث و المعارض</h2>
                </div>
                <EventsList />
            </div>
        </div>
    )
}

export default Home