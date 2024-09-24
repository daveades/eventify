import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideNav from '../components/SideNav';
import Explore from '../components/Explore';
import Overview from '../components/Overview';

export default function Dashboard() {
    const [view, setView] = useState('explore'); // State to track current view
    const navigate = useNavigate(); // Initialize the navigate function

    useEffect(() => {
        const token = localStorage.getItem('jwt_token');
        if (!token) {
            navigate('/signup'); // Redirect to signup if token is not found
        }
    }, [navigate]); // Dependency array ensures this runs only once

    return (
        <div className="flex">
            <SideNav setView={setView} />
            <div className="flex-grow p-8">
                {view === 'explore' && <Explore />}
                {view === 'overview' && <Overview />} 
            </div>
        </div>
    );
}
