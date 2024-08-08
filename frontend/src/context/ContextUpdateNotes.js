import React from "react";

// Creating a context for managing the state and functionality related to notes
const ContextUpdateNotes = React.createContext({
    // Array to store all notes
    notesList: [],

    // Array to store filtered notes based on certain criteria (e.g., search, category)
    filterNotesList: [],

    // Function to add a new note to the notesList
    addNewNotesItem: () => {},

    // Function to update an existing note in the notesList
    updateNoteItem: () => {},

    // Function to toggle the "starred" status of a note
    starToggle: () => {},

    // Boolean value to control the visibility of the sidebar
    isShowSidebar: false, 

    // Function to show or hide the sidebar
    setShowSidebar: () => {}, 

    // String to keep track of the currently active navigation item (e.g., Overview, Trash)
    activeNav : 'Overview',

    // Function to set the active navigation item
    setActiveNav : () => {},

    // Function to remove a note and optionally restore it from the trash
    removeAndRestoreNoteItem: () => {},

    // Function to permanently delete a note from the trash
    setPermanentDelete: () => {},

    // Function to archive or unarchive a note
    updateArchiveNote: () => {},

    // Object to store details of the currently active note
    activeNoteDetails: {},

    // Function to set the details of the currently active note
    setActiveNoteDetails: () => {}
});

export default ContextUpdateNotes;
