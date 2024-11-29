import React, { createContext, useState } from 'react'

export const AppContext = createContext();

const StoreContext = ({ children }) => {
    const [open, setOpen] = useState(null);

    const handleOpen = (modal) => setOpen(modal);
    return (
        <>
            <AppContext.Provider value={{
                open,
                handleOpen
            }}>
                {children}
            </AppContext.Provider>
        </>
    )
}

export default StoreContext