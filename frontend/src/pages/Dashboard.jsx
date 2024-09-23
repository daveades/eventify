import { useState } from 'react';
import SideNav from '../components/SideNav';
import Explore from '../components/Explore';
import Overview from '../components/Overview';

export default function Dashboard() {
    const [view, setView] = useState('explore'); // State to track current view

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
