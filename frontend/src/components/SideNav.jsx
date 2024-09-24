import { useState } from 'react';

export default function SideNav({ setView }) {
    const [isOpen, setIsOpen] = useState(true);
    const [activeView, setActiveView] = useState('explore'); // State to track active view

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleViewClick = (view) => {
        setActiveView(view); // Update active view state
        setView(view);       // Update parent view state
    };

    return (
        <div className="relative">
            <div
                className={`flex px-2 duration-300 flex-col absolute lg:relative h-screen z-40 p-8 shadow-md bg-white transition-width ease-in-out ${isOpen ? 'w-64' : 'lg:w-16 w-0'}`}>
                <button
                    onClick={toggleMenu}
                    className='absolute left-full lg:relative my-2 cursor-pointer text-2xl font-[900] text-white shadow bg-slate-300 rounded-full w-12 p-4 py-2 text-center h-fit z-50'>
                    {isOpen ? '⟨' : '⟩'}
                </button>
                <span className={`font-bold text-brand-blue tracking-wide text-4xl ${isOpen ? 'block' : 'hidden'}`}>
                    eventify
                </span>

                <div className='flex flex-col gap-8 mt-24 px-2 font-medium'>
                    {isOpen && (
                        <>
                            <hr />
                            <span
                                className={`text-lg py-4 px-2 rounded-lg cursor-pointer ${
                                    activeView === 'explore'
                                        ? 'bg-slate-400 text-white'  // Active styles
                                        : 'text-slate-600 hover:bg-slate-400 hover:text-white'  // Inactive hover styles
                                }`}
                                onClick={() => handleViewClick('explore')}
                            >
                                Explore
                            </span>
                            <hr />
                            <span
                                className={`text-lg py-4 px-2 rounded-lg cursor-pointer ${
                                    activeView === 'overview'
                                        ? 'bg-slate-400 text-white'  // Active styles
                                        : 'text-slate-600 hover:bg-slate-400 hover:text-white'  // Inactive hover styles
                                }`}
                                onClick={() => handleViewClick('overview')}
                            >
                                Dashboard
                            </span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
