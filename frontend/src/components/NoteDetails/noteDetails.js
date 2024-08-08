import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IoMdArchive } from "react-icons/io";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";

import './noteDetails.css';
import Header from '../Header/header';
import ContextUpdateNotes from "../../context/ContextUpdateNotes";
import DeletePopup from "../DeletePopup/deletePopup";

const NoteDetails = () => {
    // Extract the note ID from the URL parameters
    const { id } = useParams();
    // Hook to navigate programmatically
    const navigate = useNavigate();

    return (
        <ContextUpdateNotes.Consumer>
            {value => {
                // Destructure the context methods and values
                const { removeAndRestoreNoteItem, updateArchiveNote, activeNoteDetails, activeNav, setActiveNoteDetails } = value;

                // Function to handle delete button click
                const onClickDeleteButton = () => {
                    removeAndRestoreNoteItem(+id); // Remove the note and convert id to number
                    activeNav === "Overview" ? navigate("/") : navigate("/archived-notes") // Navigate to the Homepage or Archived page after deletion
                };

                // Function to handle restore button click in Trash
                const onClickRestore = () => {
                    removeAndRestoreNoteItem(+id); // Restore the note
                    navigate("/deleted-notes"); // Navigate to the deleted notes page after restoration
                };

                // Function to handle archive/unarchive button click
                const onClickArchiveButton = () => {
                    updateArchiveNote(+id); // Archive or unarchive the note
                    // Navigate to the archived or Overview notes page
                    activeNav === "Overview" ? navigate("/") : navigate("/archived-notes")
                };

                // Function to render delete/restore button based on the active navigation item
                const DeletedNotesComponents = () => (
                    activeNav === 'Trash' ? (
                        <DeletePopup id={+id} /> // Render delete confirmation popup if in Trash
                    ) : (
                        <div className='delete-button' onClick={onClickDeleteButton}>
                            <MdDelete size={20} />
                            <p>Remove</p>
                        </div>
                    )
                );

                // Set the active note details in context for the current note
                setActiveNoteDetails(+id);

                // Determine the style of the archive button based on whether the note is archived
                const ArchivedButtonStyle = activeNoteDetails.isArchived ? 'active-archive-button' : 'in-active-archive-button';

                // Function to render the appropriate UI based on whether the note is deleted or not
                const getChangeUI = () => {
                    if (activeNoteDetails.isDeleted) {
                        return (
                            <div className='restore-button' onClick={onClickRestore}>
                                <MdOutlineSettingsBackupRestore size={20} />
                                <p>Restore</p>
                            </div>
                        );
                    } else {
                        return (
                            <Link to={`/edit/${id}`} className='edit-button link'>
                                <FaEdit size={20} />
                                <p>Edit</p>
                            </Link>
                        );
                    }
                };

                return (
                    <div className='note-details-main-container'>
                        <Header />
                        <div className='note-details-section'>
                            <div className='note-details-card'>
                                {/* Render the note's title and date */}
                                <div className='title-and-date'>
                                    <h1>{activeNoteDetails.title}</h1>
                                    <h5>{activeNoteDetails.date}</h5>
                                </div>
                                {/* Render the note's content */}
                                <p className='note-details-text'>{activeNoteDetails.notes}</p>
                                {/* Render the edit/delete or restore/delete buttons */}
                                <div className='edit-and-delete-note'>
                                    {getChangeUI()}
                                    {DeletedNotesComponents()}
                                </div>
                                {/* Render the archive/unarchive button if the note is not in Trash */}
                                {activeNoteDetails.activeNavItem !== 'Trash' &&
                                    <button className={`archived-button ${ArchivedButtonStyle}`} onClick={onClickArchiveButton}>
                                        <IoMdArchive size={20} color="white" />
                                        <p>{activeNoteDetails.isArchived ? 'UnArchive' : 'Archive'}</p>
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                );
            }}
        </ContextUpdateNotes.Consumer>
    );
};

export default NoteDetails;
