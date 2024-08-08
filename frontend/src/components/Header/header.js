import { FaUserCircle } from "react-icons/fa";
import { FaBarsStaggered, FaRegUser } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { BiSolidUpArrow } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { useState , useEffect, useRef} from "react";
import { Link } from "react-router-dom";


import './header.css'
import ContextUpdateNotes from "../../context/ContextUpdateNotes";


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return(
        <ContextUpdateNotes.Consumer>
            {value => {

                const {setShowSidebar, isShowSidebar} = value

                const onClickToggle = () => {
                    setShowSidebar(isShowSidebar)
                }

                return(
                    <div className='header-main-container' >
                        <Link to='/' >
                            <img className='app-logo-image' src="https://res.cloudinary.com/dhoeemazz/image/upload/v1723053781/note-high-resolution-logo-transparent_xvbmxd.png" alt="note-logo"/>
                        </Link>
                        <div className='nav-item-container' ref={dropdownRef}>
                            <button className='logout-button'>Logout</button>
                            <div>
                                <FaUserCircle 
                                    size={30}  
                                    color="white" 
                                    onClick={() => {setIsOpen(!isOpen)}}
                                    cursor="pointer"
                                />
                                
                                <div className={`profile-dropdown ${isOpen ? 'open': ''}`} >
                                    <BiSolidUpArrow size={25} color="white" />
                                    <ul className='profile-dropdown-card'  onClick={() => {setIsOpen(false)}}>
                                        <li>
                                            <FaRegUser 
                                                size={18}   
                                                cursor="pointer"
                                            />
                                            <p>Profile</p>
                                        </li>
                                        <li>
                                            <IoSettingsOutline 
                                                size={20}   
                                                cursor="pointer"
                                            />
                                            <p>Setting</p>
                                        </li>
                                        <li>
                                            <TbLogout2 
                                                size={20}   
                                                cursor="pointer"
                                            />
                                            <p>Logout</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {isShowSidebar ? <FaBarsStaggered size={24} className='navbar-icon' ref={dropdownRef} onClick={onClickToggle}/> : 
                            <RxCross2 size={24} className='navbar-icon' onClick={onClickToggle}/>}
                        </div>
                    </div>
                )
            }}
        </ContextUpdateNotes.Consumer>
    )

}    


export default Header