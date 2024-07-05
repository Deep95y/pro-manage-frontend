import React, { useState } from "react";
import Modal from "react-modal";
import Delete from "./delete";
import EditModel from "./editmodel";
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
            console.log("Link copied to clipboard:", shareLink);

            // Hide the copied message after 3 seconds (3000 milliseconds)
            setTimeout(() => {
                setShowCopiedMessage(false);
                console.log("Copied message hidden");
            }, 3000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    return (
        <>
            <div style={{ height: '5.625rem', width: '6.25rem', background: 'white', borderRadius: '.625rem' }}>
                <p style={{ marginLeft: '.625rem', cursor: 'pointer' }} onClick={handleOpen}>Edit</p>
                <p style={{ marginLeft: '.625rem', cursor: 'pointer' }} onClick={() => handleShare(id)}>Share</p>
                {showShare ? (
                    <div style={{
                        background: '#F6FFF9',
                        height: '2.5rem',
                        width: '8.125rem',
                        border: '.0625rem solid #48C1B5',
                        boxShadow: '0rem .25rem 1rem 0rem #100B2714',
                        textAlign: 'center',
                        fontSize: '.9375rem',
                        fontFamily: 'sans-serif',
                        borderRadius: '.625rem',
                        position: 'absolute',
                        marginLeft: '70%'
                    }}>
                        <p style={{ marginTop: '.625rem' }}>Link Copied</p>
                    </div>
                ):(
                    null
                )}
                <p style={{ marginLeft: '.625rem', cursor: 'pointer' }} onClick={openBox}>Delete</p>
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
