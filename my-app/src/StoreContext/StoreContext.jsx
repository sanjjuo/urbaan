import React, { createContext, useState } from 'react'

export const AppContext = createContext();

const StoreContext = ({ children }) => {
    const [open, setOpen] = useState(null);
    const [openDrawer, setDrawerOpen] = useState(false);

    const handleOpen = (modal) => setOpen(modal);
    const handleOpenDrawer = () => setDrawerOpen(true);
    const handleCloseDrawer = () => setDrawerOpen(false);

    return (
        <>
            <AppContext.Provider value={{
                open,
                handleOpen,
                openDrawer,
                handleOpenDrawer,
                handleCloseDrawer
            }}>
                {children}
            </AppContext.Provider>
        </>
    )
}

export default StoreContext