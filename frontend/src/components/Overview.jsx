import { useState, useEffect } from 'react';

export default function Overview() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newEventName, setNewEventName] = useState('');
    const [newEventDate, setNewEventDate] = useState('');

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch('https://eventify-0i10.onrender.com/my_events', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt_token')}`, // Adjust this to your JWT storage method
                },
            });
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error("Error fetching events:", error);
        } finally {
            setLoading(false);
        }
    };

    const createEvent = async () => {
        try {
            const response = await fetch('https://eventify-0i10.onrender.com/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
                },
                body: JSON.stringify({ name: newEventName, date: newEventDate }),
            });

            if (response.ok) {
                fetchEvents(); // Refresh the events list
                setNewEventName('');
                setNewEventDate('');
            } else {
                const errorData = await response.json();
                console.error("Error creating event:", errorData);
            }
        } catch (error) {
            console.error("Error creating event:", error);
        }
    };

    return (
        <div className="flex flex-col w-full px-8 py-10">
            <div>
                <h1 className='text-lg font-medium'>Hi Lawrence! 🎉</h1>
                <p>What event are you rsvp-ing today</p>
                <div className="shadow my-10 w-full p-10 h-fit flex items-center rounded-xl justify-center bg-white">
                    <p className="text-3xl font-medium text-center">Your Event, Your Guests, Seamlessly Connected</p>
                </div>
            </div>

            <div className='shadow mt-20 w-fit px-4 flex justify-around items-center gap-2 py-6 rounded-xl h-fit bg-white'>
                <span className='text-lg text-center text-xl tracking-wide'>Create a new event</span>
                <button onClick={createEvent} className='bg-slate-300 rounded-full px-2 flex items-center justify-center text-2xl font-bold text-white'>
                    <span>+</span>
                </button>
            </div>

            <div className="flex flex-col mt-6">
                <input
                    type="text"
                    placeholder="Event Name"
                    value={newEventName}
                    onChange={(e) => setNewEventName(e.target.value)}
                    className="border rounded p-2 mb-2"
                />
                <input
                    type="date"
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    className="border rounded p-2 mb-4"
                />
            </div>

            <div>
                <p className='text-lg font-medium p-2'>Your Events</p>
                {loading ? (
                    <p>Loading events...</p>
                ) : events.length > 0 ? (
                    events.map((event) => (
                        <div key={event.id} className="border p-2 rounded mb-2">
                            <h3 className="font-bold">{event.name}</h3>
                            <p>{event.date}</p>
                        </div>
                    ))
                ) : (
                    <p className='px-2'>None for now</p>
                )}
            </div>

            <img className='w-60 mt-4' src="https://lh3.googleusercontent.com/proxy/FQS2rszFIwg1EcqyVYbRgyfQFTHl_GFyxZzt5KqWHqzYDS_zIraBR4iOdCM_8Lg7kcFSZUVk5mc-SvLLqdCiGfE01RoqFo1pOqCtRQ" alt="" />
        </div>
    );
}
