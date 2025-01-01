import React, { createContext, useState } from 'react';
import { useEffect } from 'react';

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
    const [getAddress, setGetAddress] = useState([])
    const [openUserNotLogin, setOpenUserNotLogin] = useState(false); //for non-logged users


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

    // handle non logged users modal
    const handleOpenUserNotLogin = () => setOpenUserNotLogin(!openUserNotLogin);

    // fetch favourite for enabling the heart icon filled
    const fetchWishlistProducts = async (userId) => {
        try {
            const response = await axios.get(`${BASE_URL}/user/wishlist/view/${userId}`);
            setWishlist(response.data || {});
        } catch (error) {
            console.error('Error fetching wishlist:', error);
            toast.error('Failed to fetch wishlist');
        }
    };

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        fetchWishlistProducts(userId);
    }, [BASE_URL]); 


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
                getAddress,
                setGetAddress,
                openUserNotLogin,
                setOpenUserNotLogin,
                handleOpenUserNotLogin,
                fetchWishlistProducts
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default StoreContext;
