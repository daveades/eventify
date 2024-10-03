import { useState, useEffect } from 'react';
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

export default function Overview() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [create, setCreate] = useState(false)
    const [newEventName, setNewEventName] = useState('');
    const [newEventDate, setNewEventDate] = useState('');
    const labels = ["7 Days Ago", "6 Days Ago", "5 Days Ago", "4 Days Ago", "3 Days Ago", "2 Days Ago", "1 Day Ago", "Event Day"];
    const data = {
      labels: labels,
      datasets: [
        {
          label: "RSVPs Over Time",
          backgroundColor: "#1E3A8A",
          borderColor: "#1E3A8A",
          data: [0, 0, 0, 0,0, 0, 0, 0], // Example RSVP count leading up to the event
        },
      ],
    };

    const options = {
        scales: {
          x: {
            grid: {
              display: false, // Hide X-axis grid lines
            },
          },
          y: {
            grid: {
              display: false, // Hide Y-axis grid lines
            },
          },
        },
      };

        useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch('https://eventify-72np.onrender.com/my_events', {
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
            const response = await fetch('https://eventify-72np.onrender.com/events', {
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
                <img className='h-12 float-right cursor-pointer' src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png" alt="" />
                <h1 className='text-xl font-bold'>Hi Lawrence! 🎉</h1>
                <p>What event are you rsvp-ing today</p>
                <div className="shadow my-10 w-full mx-0 md:p-10 py-14 h-fit flex flex-col items-start rounded-xl justify-center bg-blue-900 text-white">
                    <p className="text-3xl font-medium text-left">Your Event, Your Guests, Seamlessly Connected</p>
                    <p>Eventify ensures that every detail is taken care of, allowing you to focus on what truly matters—celebrating with your loved ones. Let us help you create extraordinary experiences that will be cherished for a lifetime.</p>
                </div>
            </div>
            <div className='grid grid-cols-2 '>
            <div>
            <div onClick={()=>setCreate(true)} className='cursor-pointer mt-12 shadow bg-slate-50 w-fit px-4 flex justify-around items-center gap-2 py-3 rounded-xl h-fit '>
                <span className='text-base text-center text-xl tracking-wide'>Create a new event</span>
                <button  className=' flex items-center justify-center text-3xl font-bold '>
                    <span>+</span>
                </button>
            </div>

           {create &&
                <div className="flex flex-col items-start mt-6">
                <input
                    type="text"
                    placeholder="Event Name"
                    value={newEventName}
                    onChange={(e) => setNewEventName(e.target.value)}
                    className="border outline-none rounded p-2 mb-2"
                    required
                />
                <input
                    type="date"
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    className="border rounded p-2 mb-4"
                    required
                />
                <button onClick={createEvent} className='text-white bg-blue-600 hover:bg-blue-700 rounded p-2 px-6 font-medium'>Done</button>
            </div>}
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
           </div>
           <div>
           <Line data={data} options={options}/>
           </div>

            </div>
        </div>
    );
}
