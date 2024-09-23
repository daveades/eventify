import { useState, useEffect } from 'react';

export default function Explore() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch events from API
    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch('https://api.example.com/events');
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error("Error fetching events:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            {loading ? (
                // Skeleton Loading with pulse animation
                <div className="space-y-4">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="animate-pulse flex space-x-4">
                            <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                            <div className="flex-1 space-y-4 py-1">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                // Map and display events
                <div className="space-y-4">
                    {events.map((event, index) => (
                        <div key={index} className="p-4 bg-white rounded shadow-md">
                            <h2 className="text-lg font-bold">{event.title}</h2>
                            <p className="text-sm text-gray-600">{event.date}</p>
                            <p className="text-gray-800">{event.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
