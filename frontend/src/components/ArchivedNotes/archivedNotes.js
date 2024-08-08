import { useEffect, useState } from "react";
import {ThreeCircles} from 'react-loader-spinner'

import './archivedNotes.css'
import ContextUpdateNotes from "../../context/ContextUpdateNotes";
import Header from '../Header/header';
import SideBar from '../SideBar/sideBar';
import NotesItem from '../NotesItem/notesItem';


const ArchivedNotes = () => {
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

                setActiveNav('Archived');

                return(
                    <div className='archived-main-section'>
                        <Header />
                        <div className='archived-body-container'>
                            <SideBar />
                            {isLoading ? (
                                <div className="loading-screen-container">
                                    <ThreeCircles color="rgb(0, 207, 243)" height="60" width="60" />
                                </div>
                            ):(
                            <div className='archived-main-container'>
                                {isNotFound ?
                                    (
                                        <div className="not-found-notes-container">
                                            <img
                                                src="https://res.cloudinary.com/dhoeemazz/image/upload/v1722658700/nhynysa5wc0pdarxkr5h.jpg"
                                                alt="No Notes"
                                            />
                                            <h1>No Archived Notes Found</h1>
                                            <p>
                                                You haven't archived any notes yet. Move notes to the archive to see them here.
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

export default ArchivedNotes