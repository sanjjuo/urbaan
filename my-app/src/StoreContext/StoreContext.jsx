import React, { createContext, useState } from 'react';

export const AppContext = createContext();

const StoreContext = ({ children }) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL; // base url
    const [open, setOpen] = useState(null);
    const [openDrawer, setDrawerOpen] = useState(false);
    const [openBottomDrawer, setBottomDrawerOpen] = useState(false);
    const [openSizeDrawer, setOpenSizeDrawer] = useState(false);
    const [productDetails, setProductDetails] = useState(() => {
        // Load product details from localStorage
        const savedDetails = localStorage.getItem('productDetails');
        return savedDetails ? JSON.parse(savedDetails) : {};
    });
    const [modalType, setModalType] = useState(null); // New state for modal type
    const [viewCart, setViewCart] = useState([]) //for UserCart.jsx and navbar

    // Handle modal
    const handleOpen = (modal, type) => {
        setOpen(modal);
        setModalType(type); // Set the modal type
    };



    // Handle drawer
    const handleOpenDrawer = () => setDrawerOpen(true);
    const handleCloseDrawer = () => setDrawerOpen(false);

    // Handle product details
    const handleProductDetails = (details) => {
        setProductDetails(details);
        // Persist product details in localStorage
        localStorage.setItem('productDetails', JSON.stringify(details));
    };

    // Handle view all bottom drawer
    const handleOpenBottomDrawer = () => setBottomDrawerOpen(true);
    const handleCloseBottomDrawer = () => setBottomDrawerOpen(false);

    // handle size chart bottom drawer
    const handleOpenSizeDrawer = (e) => {
        e.preventDefault();
        setOpenSizeDrawer(true);
    }
    const handleCloseSizeDrawer = () => setOpenSizeDrawer(false);


    return (
        <AppContext.Provider
            value={{
                BASE_URL,
                open,
                handleOpen,
                openDrawer,
                handleOpenDrawer,
                handleCloseDrawer,
                setProductDetails,
                handleProductDetails,
                productDetails,
                openBottomDrawer,
                handleOpenBottomDrawer,
                handleCloseBottomDrawer,
                handleOpenSizeDrawer,
                handleCloseSizeDrawer,
                openSizeDrawer,
                modalType, // Provide modal type
                viewCart,
                setViewCart,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default StoreContext;
