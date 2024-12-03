import React, { createContext, useState } from 'react'

export const AppContext = createContext();

const StoreContext = ({ children }) => {
    const [open, setOpen] = useState(null);
    const [openDrawer, setDrawerOpen] = useState(false);
    const [openBottomDrawer, setBottomDrawerOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState([])
    // const [categoryDrawer, setCategoryDrawer]

    const handleOpen = (modal) => setOpen(modal);
    const handleOpenDrawer = () => setDrawerOpen(true);
    const handleCloseDrawer = () => setDrawerOpen(false);
    const handleProductDetails = (details) => {
        setSelectedProduct(details)
    }
    const handleOpenBottomDrawer = () => setBottomDrawerOpen(true);
    const handleCloseBottomDrawer = () => setBottomDrawerOpen(false);

    return (
        <>
            <AppContext.Provider value={{
                open,
                handleOpen,
                openDrawer,
                handleOpenDrawer,
                handleCloseDrawer,
                setSelectedProduct,
                handleProductDetails,
                selectedProduct,
                openBottomDrawer,
                handleOpenBottomDrawer,
                handleCloseBottomDrawer
            }}>
                {children}
            </AppContext.Provider>
        </>
    )
}

export default StoreContext