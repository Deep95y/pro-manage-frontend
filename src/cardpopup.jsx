import React, { useState } from "react";
import Modal from "react-modal";
import Delete from "./delete";
import EditModel from "./editmodel";
import Sharedtask from './sharedtask';
import { useNavigate } from "react-router-dom";

const Cardpopup = ({ id, fetchTasks, period }) => {
    const [showbox, setshowbox] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const [showCopiedMessage, setShowCopiedMessage] = useState(false);

    const navigate = useNavigate();

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.90)',
        },
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            background: "transparent",
            margin: 0,
            padding: 0,
            border: "none",
            outline: "none",
            position: "fixed",
            boxSizing: "border-box",
            overflow: "hidden",
        },
    };

    Modal.setAppElement('#root');

    const openBox = () => {
        setshowbox(true);
    };

    const closeBox = () => {
        setshowbox(false);
    };

    const handleOpen = () => {
        setEditPopup(true);
    };

    const handleClose = () => {
        fetchTasks(period);
        setEditPopup(false);
    };

    const handleShare = async (id) => {
        setShowShare(true);
        const shareLink = `${window.location.origin}/sharedtask/${id}`;
        try {
            await navigator.clipboard.writeText(shareLink);
            setShowCopiedMessage(true);

            // Hide the copied message after 3 seconds (3000 milliseconds)
            setTimeout(() => {
                setShowCopiedMessage(false);
            }, 3000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    return (
        <>
            <div style={{ height: '90px', width: '100px', background: 'white', borderRadius: '10px' }}>
                <p style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={handleOpen}>Edit</p>
                <p style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => handleShare(id)}>Share</p>
                {showShare && (
                    <div style={{
                        background: '#F6FFF9',
                        height: '40px',
                        width: '130px',
                        border: '1px solid #48C1B5',
                        boxShadow: '0px 4px 16px 0px #100B2714',
                        textAlign: 'center',
                        fontSize: '15px',
                        fontFamily: 'sans-serif',
                        borderRadius: '10px',
                        position: 'absolute',
                        marginLeft: '70%'
                    }}>
                        <p style={{ marginTop: '10px' }}>Link Copied</p>
                    </div>
                )}
                <p style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={openBox}>Delete</p>
            </div>

            <Modal
                isOpen={showbox}
                onRequestClose={closeBox}
                style={customStyles}
            >
                <Delete closeBox={closeBox} id={id} fetchTasks={fetchTasks} period={period} />
            </Modal>

            <Modal
                isOpen={editPopup}
                onRequestClose={handleClose}
                style={customStyles}
            >
                <EditModel handleClose={handleClose} id={id} />
            </Modal>
        </>
    );
}

export default Cardpopup;
