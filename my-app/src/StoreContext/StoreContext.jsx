import axios from 'axios';
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
    const [profile, setProfile] = useState([]) //for userprofile and mobile sidebar
    const [getAddress, setGetAddress] = useState([])
    const [openUserNotLogin, setOpenUserNotLogin] = useState(false); //for non-logged users
    const [favProduct, setFavproduct] = useState([]) //this is for displaying heartfilled icon if product is in wishlist
    const [cart, setCart] = useState([]) //is for updating cart length in product details and navbar
    const [fav, setFav] = useState([]) // is for updating fav length in product details and navbar


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
    const userId = localStorage.getItem('userId');
    useEffect(() => {
        const fetchWishlistProducts = async () => {
            if (!userId) return;
            try {
                const response = await axios.get(`${BASE_URL}/user/wishlist/view/${userId}`);
                setFavproduct(response.data || []);
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            }
        };

        fetchWishlistProducts();
    }, [BASE_URL, userId]);


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
                profile,
                setProfile,
                getAddress,
                setGetAddress,
                openUserNotLogin,
                setOpenUserNotLogin,
                handleOpenUserNotLogin,
                favProduct,
                cart,
                setCart,
                fav,
                setFav
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default StoreContext;
