import { FaStar } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";

import './notesItem.css'
import ContextUpdateNotes from "../../context/ContextUpdateNotes";
import DeletePopup from "../DeletePopup/deletePopup";

const NotesItem = (props) => {
    // Destructure the note item from props
    const { noteItem } = props;
    const { id, title, notes, isStarClicked, activeNavItem } = noteItem;

    return (
        <ContextUpdateNotes.Consumer>
            {value => {
                // Destructure the context methods and values
                const { removeAndRestoreNoteItem, starToggle, setActiveNoteDetails } = value;

                // Function to handle delete icon click
                const onClickDeleteIcon = () => {
                    removeAndRestoreNoteItem(id);
                };

                // Function to handle restore icon click
                const onClickRestoreIcon = () => {
                    removeAndRestoreNoteItem(id);
                };

                // Function to handle star button toggle
                const onClickStarButton = () => {
                    starToggle(id);
                };

                // Set the active note details in context
                setActiveNoteDetails(id);

                console.log(activeNavItem);

                // Function to render delete/restore button based on the active navigation item
                const DeletedNotesComponents = () => (
                    activeNavItem === 'Trash' ? (
                        <DeletePopup id={id} />
                    ) : (
                        <button className="delete-icon-button" onClick={onClickDeleteIcon}>
                            <MdDelete size={25} color="rgb(0, 132, 255)" />
                        </button>
                    )
                );

                // Function to render the note view for the Overview page
                const getHomeNotesView = () => {
                    return (
                        <Link to={`/your/notes/${id}`} className='note-item link'>
                            <div>
                                <div className='title-and-star'>
                                    <h4>{title}</h4>
                                    <Link to='/' className='link'>
                                        <FaStar size={25} color={isStarClicked ? "rgb(255, 208, 0)" : "rgb(172, 172, 172)"} onClick={onClickStarButton} />
                                    </Link>
                                </div>
                                <p className="note-text">{notes}</p>
                            </div>
                            <div className='bottom-button-container'>
                                <Link to={`/edit/${id}`} className="edit-icon-button link">
                                    <FaEdit size={25} color="rgb(0, 132, 255)" />
                                </Link>
                                <Link className='link'>
                                    {DeletedNotesComponents()}
                                </Link>
                            </div>
                        </Link>
                    );
                };

                // Function to render the note view for the Trash page
                const getDeletedNotesView = () => {
                    return (
                        <Link to={`/your/deleted-notes/${id}`} className='note-item link'>
                            <div>
                                <div className='title-and-star'>
                                    <h4>{title}</h4>
                                    <Link to='/deleted-notes' className='link'>
                                        <FaStar size={25} color={isStarClicked ? "rgb(255, 208, 0)" : "rgb(172, 172, 172)"} onClick={onClickStarButton} />
                                    </Link>
                                </div>
                                <p className="note-text">{notes}</p>
                            </div>
                            <div className='bottom-button-container'>
                                <Link to="/deleted-notes" className='link'>
                                    <button className="restore-icon-button" onClick={onClickRestoreIcon}>
                                        <MdOutlineSettingsBackupRestore size={28} color="rgb(0, 132, 255)" />
                                    </button>
                                </Link>
                                <Link to="/deleted-notes" className='link'>
                                    {DeletedNotesComponents()}
                                </Link>
                            </div>
                        </Link>
                    );
                };

                // Function to render the note view for the Archived page
                const getArchivedNotesView = () => {
                    return (
                        <Link to={`/your/archived-notes/${id}`} className='note-item link'>
                            <div>
                                <div className='title-and-star'>
                                    <h4>{title}</h4>
                                    <Link to='/archived-notes' className='link'>
                                        <FaStar size={25} color={isStarClicked ? "rgb(255, 208, 0)" : "rgb(172, 172, 172)"} onClick={onClickStarButton} />
                                    </Link>
                                </div>
                                <p className="note-text">{notes}</p>
                            </div>
                            <div className='bottom-button-container'>
                                <Link to={`/edit/${id}`} className="edit-icon-button link">
                                    <FaEdit size={25} color="rgb(0, 132, 255)" />
                                </Link>
                                <Link to="/archived-notes" className='link'>
                                    {DeletedNotesComponents()}
                                </Link>
                            </div>
                        </Link>
                    );
                };

                // Function to render the appropriate view based on the active navigation item
                const getAllNotesItemView = () => {
                    switch (activeNavItem) {
                        case "Overview":
                            return getHomeNotesView();
                        case "Trash":
                            return getDeletedNotesView();
                        case "Archived":
                            return getArchivedNotesView();
                        default:
                            return null;
                    }
                };

                return (
                    <li className='notes-item-card'>
                        {getAllNotesItemView()}
                    </li>
                );
            }}
        </ContextUpdateNotes.Consumer>
    );
};

export default NotesItem;
