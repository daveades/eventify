import hero from '../../public/hero-illustration.png'

export default function Dashboard (){
    return(
            <div className=" flex flex-col  w-full px-8 py-10  ">
                <div>
                <h1 className='text-lg font-medium'>Hi Lawrence! 🎉</h1>
                <p>What event are you rsvp-ing today</p>
                <div className=" shadow my-10 w-full p-10 h-fit flex items-center rounded-xl justify-center bg-white">
                    <p className="text-3xl font-medium text-center">Your Event, Your Guests, Seamlessly Connected</p>
                </div>
                </div>
                <div className='shadow mt-20 w-fit px-4 flex justify-around items-center gap-2 py-6 rounded-xl h-fit bg-white'>
                    <span className='text-lg text-center text-xl tracking-wide '>Create a new event</span>
                        <button className='bg-slate-300 rounded-full px-2 flex items-center justify-center text-2xl font-bold text-white'><span>+</span></button>
                </div>
                <div>
                    <p className='text-lg font-medium p-2'>Your Events </p>
                </div>
                <p className='px-2'>None for now</p>
                <img className='w-60' src="https://lh3.googleusercontent.com/proxy/FQS2rszFIwg1EcqyVYbRgyfQFTHl_GFyxZzt5KqWHqzYDS_zIraBR4iOdCM_8Lg7kcFSZUVk5mc-SvLLqdCiGfE01RoqFo1pOqCtRQ" alt="" />
            </div>
    )
}