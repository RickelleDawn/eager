import React from "react";


const MODAL_STYLE = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#747577',
    padding: '25px 50px 35px 50px',
    border: '2px solid #90ECD2',
    borderRadius: '3px',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-start',
    height: '375px',
    width: '300px',
    zindex: 1000
    
}

const OVERLAY_STYLE = {
    position: 'fixed',
    height: '100vh',
    width: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .8)',
    zindex: 1000
}

export default function Modal({ open, children, onClose}) {

    if (!open) return null

    return (
        <>
        <div style={OVERLAY_STYLE} />
        <div style={MODAL_STYLE}>
            {children}
            
        </div>
        </>
    )
}