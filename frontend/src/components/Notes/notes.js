import { RiStickyNoteAddFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";
import {ThreeCircles} from 'react-loader-spinner'


import './notes.css';
import Header from '../Header/header';
import NotesItem from '../NotesItem/notesItem';
import ContextUpdateNotes from '../../context/ContextUpdateNotes';
import SideBar from "../SideBar/sideBar";

const Notes = () => {
    // State to keep track of the search input
    const [searchInput, setSearchInput] = useState("");
    // Loading Screen 
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
    },[])

    // Function to update the search input state when the user types in the search box
    const onChangeSearch = event => {
        setSearchInput(event.target.value);
    };

    return (
        <ContextUpdateNotes.Consumer>
            {value => {
                // Destructure necessary values from the context
                const { notesList, filterNotesList, setActiveNav } = value;
                
                // Set the active navigation to 'Overview'
                setActiveNav('Overview');

                // Filter the notes based on the search input
                const searchResult = filterNotesList.filter(eachItem =>
                    eachItem.title.toLowerCase().includes(searchInput.toLowerCase()),
                );

                // Determine if no notes are found either in the entire list or in the search result
                const isNotFound = notesList.length === 0 || searchResult.length === 0;

                return (
                    <div className='notes-app-container'>
                        {/* Header component */}
                        <Header />
                        <div className='notes-body-container'>
                            {/* Sidebar component for navigation */}
                            <SideBar />
                            <div className='notes-main-section'>
                                <div className='notes-main-container'>
                                    {/* Main heading for the notes section */}
                                    <h1 className='main-heading'>Notes</h1>
                                    <div className='search-and-add-button'>
                                        {/* Link to add a new note */}
                                        <Link to="/add-notes" className='add-note-button'>
                                            <RiStickyNoteAddFill size={25} />
                                            <p>Add Note</p>
                                        </Link>
                                        {/* Search input field */}
                                        <div className='search-container'>
                                            <IoSearch size={30} className='search-icon' />
                                            <input
                                                type="text"
                                                placeholder="search your notes title"
                                                onChange={onChangeSearch}
                                            />
                                        </div>
                                    </div>
                                    {isLoading ? (
                                        <div className="home-loading-screen-container">
                                            <ThreeCircles color="rgb(0, 207, 243)" height="60" width="60" />
                                        </div>
                                    ):(
                                        <div className='notes-items-section'>
                                            {isNotFound ? (
                                                // Display a message and image if no notes are found
                                                <div className="not-found-notes-container">
                                                    <img
                                                        src="https://res.cloudinary.com/dhoeemazz/image/upload/v1722658700/nhynysa5wc0pdarxkr5h.jpg"
                                                        alt="No Notes"
                                                    />
                                                    <h1>No Notes Found</h1>
                                                    <p>No notes to display. Create a new note to get started!</p>
                                                </div>
                                            ) : (
                                                // Display the list of notes that match the search criteria
                                                <ul className='notes-items-container'>
                                                    {searchResult.map(eachNote => (
                                                        <NotesItem noteItem={eachNote} key={eachNote.id} />
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    )}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }}
        </ContextUpdateNotes.Consumer>
    );
};

export default Notes;
