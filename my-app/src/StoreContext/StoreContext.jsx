import React, { createContext, useState } from 'react';

export const AppContext = createContext();

const StoreContext = ({ children }) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL; // base url
    const [open, setOpen] = useState(null);
    const [openDrawer, setDrawerOpen] = useState(false);
    const [openBottomDrawer, setBottomDrawerOpen] = useState(false);
    const [openSizeDrawer, setOpenSizeDrawer] = useState(false);
    const [modalType, setModalType] = useState(null); // New state for modal type
    const [viewCart, setViewCart] = useState([]) //for UserCart.jsx and navbar
    const [wishlist, setWishlist] = useState([]) //for favouriteProduct.jsx and navbar
    const [profile, setProfile] = useState([]) //for userprofile and mobile sidebar
    const [couponDiscountTotalPrice, setCouponDiscountTotalPrice] = useState({
        originalAmount: 0,
        discountValue: 0,
    }); //for getting discount and previous value in userCart.jsx
    const [getAddress, setGetAddress] = useState([])


    // Handle modal
    const handleOpen = (modal, type) => {
        setOpen(modal);
        setModalType(type); // Set the modal type
    };

    // Handle drawer
    const handleOpenDrawer = () => setDrawerOpen(true);
    const handleCloseDrawer = () => setDrawerOpen(false);

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
                openBottomDrawer,
                handleOpenBottomDrawer,
                handleCloseBottomDrawer,
                handleOpenSizeDrawer,
                handleCloseSizeDrawer,
                openSizeDrawer,
                modalType, // Provide modal type
                viewCart,
                setViewCart,
                wishlist,
                setWishlist,
                profile,
                setProfile,
                couponDiscountTotalPrice,
                setCouponDiscountTotalPrice,
                getAddress,
                setGetAddress
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default StoreContext;
