import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-blue-950 flex justify-between items-center px-10 h-16'>
            <div className="logo font-bold text-white text-2xl">
                <span className='text-white' >&lt;</span>
                Pass
                <span className='text-blue-600' >OP/&gt;</span>
            </div>
            {/* <ul>
                <li className='flex gap-4'>
                    <a className='hover:font-bold text-white' href="/">Home</a>
                    <a className='hover:font-bold text-white' href="/">About</a>
                    <a className='hover:font-bold text-white' href="/">Contact</a>
                </li>
            </ul> */}
            <button className='bg-blue-300 h-[40px] flex p-2  rounded-full justify-center items-center hover:border-[3px] border-white'>
                <img className='h-[15px] ' src="https://i.postimg.cc/QxmwNJHG/image.png" alt="github" />
                <span className='p-2'> Git hub
                </span>
            </button>
        </nav>
    )
}

export default Navbar
