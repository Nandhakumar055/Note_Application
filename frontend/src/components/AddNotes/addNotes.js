import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import './addNotes.css';
import ContextUpdateNotes from "../../context/ContextUpdateNotes";
import Header from '../Header/header';

const AddNotes = () => {
    // Extract 'path' and 'id' parameters from the URL using useParams
    const { path, id } = useParams();
    const navigate = useNavigate();
    
    // State to manage the current note's input fields (title, notes, date)
    const [userNote, setUserNote] = useState({
        title: '',
        notes: '',
        date: '',
    });
    
    // State to manage the list of notes
    const [notesList, setNotesList] = useState([]);
    
    // useEffect to populate the form with existing note data when editing
    useEffect(() => {
        if (path === 'edit' && notesList.length > 0) {
            const thisNote = notesList.find((each) => each.id === +id);
            if (thisNote) {
                setUserNote({
                    title: thisNote.title,
                    notes: thisNote.notes,
                    date: thisNote.date,
                });
            }
        }
    }, [path, id, notesList]);

    // Function to handle input changes and update userNote state
    const onChangeUserInput = (event) => {
        const { name, value } = event.target;
        setUserNote({
            ...userNote,
            [name]: value
        });
    };

    return (
        <ContextUpdateNotes.Consumer>
            {value => {
                // Destructure the context values
                const { notesList: contextNotesList, addNewNotesItem, updateNoteItem, activeNoteDetails } = value;

                // Update the notesList state with context data
                setNotesList(contextNotesList);

                // Function to handle form submission for adding or editing a note
                const onSubmitNote = (event) => {
                    event.preventDefault();
                    if (path === 'edit') {
                        // Update an existing note
                        const updatedNote = {
                            ...userNote,
                            id: +id,
                            isStarClicked: activeNoteDetails.isStarClicked,
                            isArchived: activeNoteDetails.isArchived,
                            isDeleted: activeNoteDetails.isDeleted,
                            activeNavItem: activeNoteDetails.activeNavItem,
                        };

                        // Update the note and navigate back to the appropriate page
                        updateNoteItem(updatedNote);
                        activeNoteDetails.activeNavItem === 'Overview' ? navigate("/") : navigate("/archived-notes");    
                    } else {
                        // Add a new note
                        const newNote = {
                            ...userNote,
                            id: notesList.length + 1,
                            isStarClicked: false,
                            isArchived: false,
                            isDeleted: false,
                            activeNavItem: 'Overview'
                        };
                        // Add the new note to the list and navigate back to the home page
                        addNewNotesItem(newNote);
                        navigate("/");
                    }
                };

                // Update Illustration Image Url
                const getIllustrationImageUrl = path === 'edit' ? 
                "https://res.cloudinary.com/dhoeemazz/image/upload/v1723187094/6170328_3048232_imanqe.svg":
                "https://res.cloudinary.com/dhoeemazz/image/upload/v1723187078/5421749_2810817_kkchuq.svg"

                return (
                    <div className='add-note-main-section-container'>
                        <Header />
                        <div className='add-note-main-container'>
                            <div className='add-note-section-card'>
                                <form className='add-note-from-container' onSubmit={(event) => onSubmitNote(event)}>
                                    <div className='input-container'>
                                        <label className='label' htmlFor='Title'>Title</label>
                                        <input
                                            className='user-input'
                                            type='text'
                                            placeholder='Type your title'
                                            name='title'
                                            id='Title'
                                            onChange={onChangeUserInput}
                                            value={userNote.title}
                                            required
                                        />
                                    </div>
                                    <div className='input-container'>
                                        <label className='label' htmlFor='NoteText'>Notes</label>
                                        <textarea
                                            className='user-note-text'
                                            placeholder='Type your note'
                                            id='NoteText'
                                            name='notes'
                                            onChange={onChangeUserInput}
                                            value={userNote.notes}
                                            required
                                        />
                                    </div>
                                    <div className='input-container'>
                                        <label className='label' htmlFor='Date'>Date</label>
                                        <input
                                            className='user-input'
                                            type='date'
                                            placeholder='Set your date'
                                            id='Date'
                                            name='date'
                                            onChange={onChangeUserInput}
                                            value={userNote.date}
                                            required
                                        />
                                    </div>
                                    <button type='submit' className='add-button'>{path === 'edit' ? 'Update Now' : 'Add Now'}</button>
                                </form>
                                <div className='form-detail-container'>
                                    <h1>{path === 'edit' ? 'Edit Your Note' : 'Add Your Note'}</h1>
                                    <img
                                        src={getIllustrationImageUrl}
                                        alt="No Notes"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }}
        </ContextUpdateNotes.Consumer>
    );
};

export default AddNotes;
