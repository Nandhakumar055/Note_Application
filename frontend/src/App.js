import { useState, useEffect, useRef } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

import './App.css';
import Notes from './components/Notes/notes';
import NoteDetails from './components/NoteDetails/noteDetails';
import AddNotes from './components/AddNotes/addNotes';
import ArchivedNotes from './components/ArchivedNotes/archivedNotes';
import DeletedNotes from './components/DeletedNotes/deletedNotes'
import ContextUpdateNotes from './context/ContextUpdateNotes';
import NotFoundPage from './components/NotFoundPage/notFoundPage';

// Initial Notes Data: This serves as default data for the notes list
const initialNotesData = [
    {
        id: 1,
        title: "Grocery Shopping List",
        notes: "Today, I need to pick up the following items from the grocery store: milk, eggs, bread, fresh vegetables, and chicken. Additionally, I should remember to buy some snacks for the week and a new carton of orange juice.",
        date: "2024-07-08",
        isStarClicked: false,
        isArchived: false,
        isDeleted : false, 
        activeNavItem : 'Overview'
    },
    {
        id: 2,
        title: "Weekend Plans",
        notes: "This weekend, I plan to visit the new art exhibit downtown. Afterward, I’ll meet up with friends for lunch at our favorite cafe. Sunday will be a relaxing day spent reading a new book and going for a walk in the park.",
        date: "2024-07-10",
        isStarClicked: false,
        isArchived: false,
        isDeleted : false,
        activeNavItem : 'Overview'
    },
    {
        id: 3,
        title: "Exercise Routine",
        notes: "My current exercise routine includes a mix of cardio and strength training. On Monday, Wednesday, and Friday, I focus on running and cycling. On Tuesday and Thursday, I incorporate weightlifting and bodyweight exercises. Weekends are reserved for yoga and stretching to aid recovery.",
        date: "2024-07-12",
        isStarClicked: false,
        isArchived: false,
        isDeleted : false,
        activeNavItem : 'Overview'
    },
    {
        id: 4,
        title: "Travel Packing List",
        notes: "For my upcoming trip, I need to pack the following items: passport, travel itinerary, clothes for various weather conditions, toiletries, and a first aid kit. Additionally, I should bring a camera to capture memories, a power bank for my devices, and some snacks for the journey.",
        date: "2024-07-13",
        isStarClicked: false,
        isArchived: false,
        isDeleted : false,
        activeNavItem : 'Overview'
    },
    {
        id: 5,
        title: "Home Maintenance Tasks",
        notes: "This week, I need to complete several home maintenance tasks. First, I'll check and replace the air filters in the HVAC system. Next, I'll clean the gutters to ensure proper drainage. Finally, I need to inspect the roof for any damage and schedule a professional if necessary.",
        date: "2024-07-15",
        isStarClicked: false,
        isArchived: false,
        isDeleted : false,
        activeNavItem : 'Overview'
    },
    {
        id: 6,
        title: "Morning Routine",
        notes: "My morning routine includes several key activities to start the day right. I begin with a glass of water and a light breakfast, followed by a 20-minute meditation session. After that, I do a quick workout, take a shower, and then spend a few minutes planning my tasks for the day.",
        date: "2024-07-17",
        isStarClicked: false,
        isArchived: false,
        isDeleted : false,
        activeNavItem : 'Overview'
    },
]

const App = () => {
    // Load initial notes from localStorage or fallback to initialNotesData
    const initialNotesList = JSON.parse(localStorage.getItem('notesData')) || initialNotesData;
    // State for managing the list of notes
    const [notesList, setNotesList] = useState(initialNotesList);
    // State for managing the filtered list of notes based on the active navigation item
    const [filterNotesList, setFilterNotesList] = useState([]);
    // State for controlling the visibility of the sidebar
    const [isShowSidebar, setShowSidebar] = useState(true);
    // State for tracking the active navigation item
    const [activeNav, setActiveNav] = useState('Overview');
    // State for storing the details of the currently active note
    const [activeNoteDetails, setActiveNoteDetails] = useState({});
    // Reference for the sidebar element to handle click outside detection
    const [sidebarRef] = useState(useRef(null));


    // Effect to save notes to localStorage and update filtered notes list based on active navigation item
    useEffect(() => {
        localStorage.setItem('notesData', JSON.stringify(notesList));
        setFilterNotesList(notesList.filter(eachNote => eachNote.activeNavItem === activeNav));
    }, [notesList, activeNav]);

    // Effect to close the sidebar when clicking outside of it
    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setShowSidebar(true);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Function to add a new note to the notes list
    const addNewNotes = (newNote) => {
        setNotesList([...notesList, newNote]);
    };

    // Function to remove a note by moving it to the 'Trash', or restore it to the 'Overview'
    const removeAndRestoreNote = (id) => {
        if (!activeNoteDetails.isDeleted === true) {
            setNotesList(prevNotes =>
                prevNotes.map(each => (each.id === id ? 
                    {...each, activeNavItem:'Trash', isDeleted: true, isArchived: false } : {...each} 
                ))
            );
        } else {
            setNotesList(prevNotes =>
                prevNotes.map(each => (each.id === id ? 
                    {...each, activeNavItem:'Overview', isDeleted: false } : {...each} 
                ))
            );
        }
    };

    // Function to permanently delete a note
    const setPermanentDelete = (id) => {
        setNotesList(prevNotes => prevNotes.filter(eachNote => eachNote.id !== id));
    };

    // Function to archive a note or restore it from the archive
    const updateArchiveNote = (id) => {
        if (!activeNoteDetails.isArchived === true) {
            setNotesList(prevNotes =>
                prevNotes.map(each => (each.id === id ? 
                    {...each, activeNavItem:'Archived', isArchived: true } : {...each} 
                ))
            );
        } else {
            setNotesList(prevNotes =>
                prevNotes.map(each => (each.id === id ? 
                    {...each, activeNavItem:'Overview', isArchived: false } : {...each} 
                ))
            );
        }
    };

    // Function to update the details of an existing note
    const updateNote = (updatedNote) => {
        setNotesList(notesList.map(note => note.id === updatedNote.id ? updatedNote : note));
    };

    // Function to toggle the 'starred' status of a note
    const getStarButtonToggle = (id) => {
        setNotesList(prevNotes =>
            prevNotes.map(each => (each.id === id ? 
                {...each, isStarClicked:!each.isStarClicked} : {...each} 
            ))
        );
    };

    // Function to toggle the visibility of the sidebar
    const setShowSidebarToggle = (set) => {
        setShowSidebar(!set);
    };

    // Function to change the active navigation item
    const onChangeActiveNav = (nav) => {
        setActiveNav(nav);
    };

    // Function to get the active note details
    const getActiveNoteDetails = (id) => {
        setActiveNoteDetails(notesList.find(each => each.id === id));
    };

    return (
        <ContextUpdateNotes.Provider
            value={{
                notesList: notesList,
                filterNotesList: filterNotesList,
                addNewNotesItem: addNewNotes,
                updateNoteItem: updateNote,
                starToggle: getStarButtonToggle,
                isShowSidebar: isShowSidebar,
                setShowSidebar: setShowSidebarToggle,
                activeNav: activeNav,
                setActiveNav: onChangeActiveNav,
                removeAndRestoreNoteItem: removeAndRestoreNote,
                setPermanentDelete: setPermanentDelete,
                updateArchiveNote: updateArchiveNote,
                activeNoteDetails: activeNoteDetails,
                setActiveNoteDetails: getActiveNoteDetails,
                sidebarRef: sidebarRef,
            }}
        >
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" Component={Notes} />
                    <Route exact path="/your/:notes/:id" Component={NoteDetails} />
                    <Route exact path="/add-notes" Component={AddNotes} />
                    <Route exact path="/:path/:id" Component={AddNotes} />
                    <Route exact path="/archived-notes" Component={ArchivedNotes} />
                    <Route exact path="/deleted-notes" Component={DeletedNotes} />
                    <Route path="/404-NotFound" Component={NotFoundPage} />
                    <Route path="*" element={<Navigate to="/404-NotFound" />} />
                </Routes>
            </BrowserRouter>
        </ContextUpdateNotes.Provider>
    );
};

export default App;