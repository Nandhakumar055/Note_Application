import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md"

import './deletePopup.css'
import ContextUpdateNotes from "../../context/ContextUpdateNotes";
import { useNavigate } from "react-router-dom";


const DeletePopup = ({id}) => {
  const [popup, setPopup] = useState(false)
  const navigate = useNavigate()

  return (
    <ContextUpdateNotes.Consumer>
      {value => {
        const {setPermanentDelete} = value 

        const onClickConfirmDelete = () => {
          setPermanentDelete(id)
          navigate("/deleted-notes")
        }


        return(
          <div>
            <button onClick={() => {setPopup(true)}} className='trigger-delete-button'>
              <MdDelete size={20} />
              <p>Remove</p>
            </button>
            <Modal open={popup} onClose={() => {setPopup(false)}} center>
              <div className='popup-card'>
                <RiDeleteBin5Fill size={50} color="red"/>
                <p>
                  Are you sure, you want to delete the Note?
                </p>
                <div className='popup-buuton-container'>
                  <button className='cancel-button' onClick={() => {setPopup(false)}}>Cancel</button>
                  <button className='confirm-button' onClick={onClickConfirmDelete}>Confirm</button>
                </div>
              </div>
            </Modal>
          </div>
        )
      }}
    </ContextUpdateNotes.Consumer>
  );
}

export default DeletePopup