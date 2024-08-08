import { useEffect, useState } from 'react';
import { FaBarsStaggered } from "react-icons/fa6";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { IoMdArchive } from "react-icons/io";
import { FcFullTrash } from "react-icons/fc";
import { AiFillWindows } from "react-icons/ai";

import './sideBar.css';
import { SidebarMainContainer } from './style.js';
import ContextUpdateNotes from "../../context/ContextUpdateNotes";
import FeatureItem from '../FeatureItem/featureItem.js';

// List of features with their icons and navigation paths
const feturesListItems = [
    {
        id: 1,
        featureName: "Overview",
        icon: <AiFillWindows size={20} />,
        navigationPath: '/'
    },
    {
        id: 2,
        featureName: "Archived",
        icon: <IoMdArchive size={20} />,
        navigationPath: '/archived-notes'
    },
    {
        id: 3,
        featureName: "Trash",
        icon: <FcFullTrash size={20} />,
        navigationPath: '/deleted-notes'
    }
];

const SideBar = () => {
    // State to track the screen width and feature list
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [featuresList] = useState([...feturesListItems]);

    // useEffect to handle screen resize and update screen width state
    useEffect(() => {
        const screenResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener("resize", screenResize);
        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("resize", screenResize);
        };
    }, []);

    return (
        <ContextUpdateNotes.Consumer>
            {value => {
                const { setShowSidebar, isShowSidebar, activeNav, setActiveNav, sidebarRef } = value;

                // Function to toggle the visibility of the sidebar
                const onClickSidebarToggle = () => {
                    setShowSidebar(isShowSidebar);
                };

                // Function to determine if the screen width is below the mobile threshold
                const isMobileScreenSize = () => {
                    return screenWidth < 768;
                };

                // Function to update the active feature in the sidebar
                const updateActiveFeture = (activeId) => {
                    setActiveNav(activeId);
                };

                // Function to close the sidebar, typically used in mobile view
                const onClickCloseSidebar = () => {
                    setShowSidebar(false);
                };

                // Determine the CSS class to apply based on sidebar visibility
                const isShowbar = isShowSidebar ? 'sidebar-container' : 'not-show-sidebar';

                return (
                    <>
                        {/* Conditionally render the sidebar based on screen size and visibility */}
                        {isShowSidebar || isMobileScreenSize() ? (
                            <SidebarMainContainer 
                                isMobileSize={isMobileScreenSize() && isShowSidebar} 
                                className='sidebar-main-container' 
                                ref={sidebarRef}
                            >
                                <div className={isShowbar}>
                                    <div className='feature-heading-and-toggle'>
                                        <h4>Features</h4>
                                        {/* Toggle button to close the sidebar */}
                                        <FaAngleDoubleLeft 
                                            size={18} 
                                            color='rgb(80, 0, 184)' 
                                            onClick={onClickSidebarToggle} 
                                            cursor={"pointer"} 
                                        />
                                    </div>
                                    {/* List of feature items rendered dynamically */}
                                    <ul className='features-item-container'>
                                        {featuresList.map(eachFeature => (
                                            <FeatureItem 
                                                featureItem={eachFeature} 
                                                key={eachFeature.id} 
                                                updateActiveFeture={updateActiveFeture}
                                                isActiveFeature={eachFeature.featureName === activeNav}
                                                onClickCloseSidebar={onClickCloseSidebar}
                                            />
                                        ))}
                                    </ul>
                                </div>
                            </SidebarMainContainer>
                        ) : (
                            // Render the sidebar toggle button if the sidebar is not visible
                            <div className='nav-side-container'>
                                <FaBarsStaggered 
                                    size={20} 
                                    onClick={onClickSidebarToggle} 
                                    color="rgb(80, 0, 184)" 
                                    className='nav-bar' 
                                />
                            </div>
                        )}
                    </>
                );
            }}
        </ContextUpdateNotes.Consumer>
    );
};

export default SideBar;
