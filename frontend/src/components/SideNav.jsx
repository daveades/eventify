import { useState } from 'react';

export default function SideNav() {
    // State to toggle the menu
    const [isOpen, setIsOpen] = useState(true);

    // Function to toggle the menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="relative">
            <div 
                className={`flex px-2 duration-300 flex-col absolute lg:relative h-screen z-40 p-8 shadow-md bg-white transition-width ease-in-out ${isOpen ? 'w-64' : 'lg:w-16 w-0'}`}>
                 <button 
                onClick={toggleMenu} 
                className='absolute lg:relative my-2 cursor-pointer text-2xl font-[900] text-white bg-slate-300 rounded-full w-12 p-4 py-2 text-center h-fit z-50'>
                {isOpen ? '⟨' : '⟩'} {/* Change icon based on menu state */}
            </button>
                <span className={`font-bold text-brand-blue tracking-wide text-4xl ${isOpen ? 'block' : 'hidden'}`}>
                    eventify
                </span>

                <div className='flex flex-col gap-8 mt-24 px-2 font-medium'>
                    {isOpen && (
                        <>
                        <hr />
                            <span className="text-lg text-slate-600 py-4 px-2 rounded-lg hover:bg-slate-400 hover:text-white">Explore</span>
                            <hr />
                            <span className="text-lg block py-4 px-2 bg-slate-400 rounded-lg h-full text-white">Dashboard</span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
