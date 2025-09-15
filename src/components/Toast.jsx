import React, { useEffect } from 'react'

export const Toast = ({message, type = "info", onClose}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className='toast toast-top toast-end mt-8'>
            <div
                className={`alert ${
                    type === "success"
                        ? "alert-success"
                        : type === "error"
                        ? "alert-error"
                        : "alert-info"
                }`}
            >
                <span>{message}</span>
            </div>
        </div>
    );
}
