import { useEffect, useState } from "react";
import {ThreeCircles} from 'react-loader-spinner'

import './deletedNotes.css'
import ContextUpdateNotes from "../../context/ContextUpdateNotes";
import Header from '../Header/header';
import SideBar from '../SideBar/sideBar';
import NotesItem from '../NotesItem/notesItem';


const DeletedNotes = () => {
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
    },[])
    
    return(
        <ContextUpdateNotes.Consumer>
            {value => {
                const {filterNotesList, setActiveNav} = value
                const isNotFound = filterNotesList.length === 0

                setActiveNav('Trash');

                return(
                    <div className='deleted-main-section'>
                        <Header />
                        <div className='deleted-body-container'>
                            <SideBar />
                            {isLoading ? (
                                <div className="loading-screen-container">
                                    <ThreeCircles color="rgb(0, 207, 243)" height="60" width="60" />
                                </div>
                            ):(
                                <div className='deleted-main-container'>
                                    {isNotFound ?
                                        (
                                            <div className="not-found-notes-container">
                                                <img
                                                    src="https://res.cloudinary.com/dhoeemazz/image/upload/v1722658700/nhynysa5wc0pdarxkr5h.jpg"
                                                    alt="No Notes"
                                                />
                                                <h1>No Deleted Notes Found</h1>
                                                <p>
                                                    No notes in the trash. Deleted notes will be shown here.
                                                </p>
                                            </div>
                                        ):(
                                            <ul className='notes-items-container'>
                                                {filterNotesList.map(eachNote => (
                                                    <NotesItem noteItem={eachNote} key={eachNote.id} />
                                                ))}
                                            </ul>
                                        )
                                    }
                                
                                </div>
                            )}
                            
                        </div>
                    </div>
                )
            }}
        </ContextUpdateNotes.Consumer>
    )
}

export default DeletedNotes