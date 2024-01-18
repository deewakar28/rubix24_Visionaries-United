/*import React from 'react'
import NavLogo from '../assets/navLogo.svg'
import Ham from '../assets/ham.svg'
import { useState } from 'react'

function MenteeNavbar() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
      };
    return (
        <>
        <div className='h-[12vh] bg-primary flex justify-between items-center text-white w-full md:p-8 pr-4 pl-2'>
      <div className='flex justify-start items-center'>
        <a href="/">
        <img src={NavLogo} alt="" />
        </a>
      </div>
      <div className='md:flex  gap-[5vw] items-center j hidden'>
        <a href="/">Home</a>
        <a href="/Dashboard">DashBoard</a>
        <a href="/Workshop">Workshops</a>
        <a href="">Find a mentor</a>
        <a href="" className='py-2 px-5 rounded-3xl border-[2px] border-secondary'>Log Out</a>
      </div>
      <div className='md:hidden'>
       <button onClick={toggleDropdown}>
       <img src={Ham} className='h-[30px]' alt="" />
       </button>
      </div>

    </div>
    {isDropdownOpen && (
    <div className='w-full h-[88vh] bg-primary flex flex-col gap-6 pt-8'>
    <div>
            <a href="" className='text-[18px] text-white pl-2'>
              DashBoard
            </a>
            <hr className="absolute left-2 right-2 border-white lg:hidden my-2" />
          </div>
          <div>
            <a href="" className='text-[18px] text-white pl-2'>
              Workshops
            </a>
            <hr className="absolute left-2 right-2 border-white lg:hidden my-2" />
          </div>
          <div>
            <a href="" className='text-[18px] text-white pl-2'>
            Find a mentor
            </a>
            <hr className="absolute left-2 right-2 border-white lg:hidden my-2" />
          </div>
          <div className='self-center pt-8'> 
          
            <a href="" className='py-2 px-4 bg-secondary rounded-3xl text-[18px] text-white'>Log Out</a>
           
          </div>
    </div>
    )}
        </>
    )
}

export default MenteeNavbar*/
import React from 'react'
import NavLogo from '../assets/navLogo.png'
import Ham from '../assets/ham.svg'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import moon from '../assets/moon.png'
import sun from '../assets/sun.png'

function MenteeNavbar() {

  const { isLoggedIn , logout } = useAuth(); 
  const [role, setRole] = useState('');
  const [isDarkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const checkUserRole = () => {
      if (isLoggedIn) {
        const storedRole = localStorage.getItem('userRole');
        setRole(storedRole);
      }
    };

    checkUserRole();
  }, [isLoggedIn]);


  const handleLogout = async() => {
    try{
        await signOut(auth);
        logout();
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
    }catch(error){
        console.log(error);
    }
  };

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
      };
      const handleDarkMode = () => {
        if(isDarkMode === false)
        {
          window.document.documentElement.classList.add("dark");
        }
        else
        {
          window.document.documentElement.classList.remove("dark");
        }
        setDarkMode(!isDarkMode);
      };
  return (
    <>
   
    <div className='h-[12vh] dark:bg-primary flex justify-between items-center dark:text-white w-full md:p-8 pr-4 pl-2'>
      <div className='flex justify-start items-center'>
        <a href="/">
        <img src={NavLogo} alt="" className='md:h-[8vh] h-[6vh]'/>
        </a>
      </div>
      <div className='flex gap-4 justify-center items-center'> 
      <div className='md:flex gap-[4vw] items-center hidden'>
        <a href="/">Home</a>
        {role === 'Mentor' ? (
        <a href="/room-code">Create Meeting</a>
      ) : (
        <>
        <a href="/Dashboard">DashBoard</a>
        <a href="/workshop">WorkShop</a>
        <button onClick={() => document.getElementById('targetSection').scrollIntoView({ behavior: 'smooth' })}>
        Find a Mentor
      </button>
        </>
      )}
        
        {isLoggedIn ? (
          <a onClick={handleLogout} className='py-2 px-4 bg-secondary rounded-3xl cursor-pointer text-white'>Logout</a>
        ):(
          <div className="md:flex gap-4 ">
          <a href="/SignIn" className='py-2 px-5 rounded-3xl border-[2px] border-secondary'>Log In</a>
          <a href="/MenteeRegister" className='py-2 px-4 bg-secondary text-white rounded-3xl'>Register</a>
        </div>
        )}
        
      </div>
      <div>
           {!isDarkMode ? (
               <button onClick={handleDarkMode}>
                <img src={moon} alt="" className='h-[30px]'/>
               </button>
              ) : (
                <button onClick={handleDarkMode} >
                  <img src={sun} alt=""  className='h-[30px]'/>
                </button>
              )}
      </div>
      <div className='md:hidden'>
       <button onClick={toggleDropdown}>
       <img src={Ham} className='h-[30px]' alt="" />
       </button>
      </div>
      </div>
    </div>
    {isDropdownOpen && (
    <div className='w-full h-[88vh] bg-primary flex flex-col gap-6 pt-8'>
          <div>
            <a href="/" className='text-[18px] text-white pl-2'>
              Home
            </a>
            <hr className="absolute left-2 right-2 border-white lg:hidden my-2" />
          </div>
          <div>
            <a href="/MentorRegister" className='text-[18px] text-white pl-2'>
              Find a mentor
            </a>
            <hr className="absolute left-2 right-2 border-white lg:hidden my-2" />
          </div>
          <div>
            <a href="/" className='text-[18px] text-white pl-2'>
              Become a mentor
            </a>
            <hr className="absolute left-2 right-2 border-white lg:hidden my-2" />
          </div>
          {isLoggedIn ? (
            <div className='self-center pt-8'> 
          
            <a onClick={handleLogout} className='py-2 px-4 bg-secondary rounded-3xl text-[18px] text-white'>Logout</a>
           
          </div>
          ) : (
            <>
            <div>
            <a href="/SignIn" className='text-[18px] text-white pl-2'>
              Log In
            </a>
            <hr className="absolute left-2 right-2 border-white lg:hidden my-2" />
          </div>
          <div className='self-center pt-8'> 
          
            <a href="/MenteeRegister" className='py-2 px-4 bg-secondary rounded-3xl text-[18px] text-white'>Register</a>
           
          </div>
            </>
          )}
    </div>
    )}
    
</>
    
  )
}

export default MenteeNavbar
