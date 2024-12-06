import React, { createContext, useState, useEffect } from 'react';
import { products } from '../data';

export const AppContext = createContext();

const StoreContext = ({ children }) => {
    const [open, setOpen] = useState(null);
    const [openRemoveModal, setOpenRemoveModal] = useState(false);
    const [openDrawer, setDrawerOpen] = useState(false);
    const [openBottomDrawer, setBottomDrawerOpen] = useState(false);
    const [openSizeDrawer, setOpenSizeDrawer] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(
        localStorage.getItem('selectedCategory') || null
    );

    // Save selected category to localStorage when it changes
    useEffect(() => {
        localStorage.setItem('selectedCategory', selectedCategory || '');
    }, [selectedCategory]);

    // Handle modal
    const handleOpen = (modal) => setOpen(modal);

    // remove address modal
    const handleOpenRemoveModal = () => setOpenRemoveModal(!openRemoveModal);

    // Handle drawer
    const handleOpenDrawer = () => setDrawerOpen(true);
    const handleCloseDrawer = () => setDrawerOpen(false);

    // Handle product details
    const handleProductDetails = (details) => {
        setSelectedProduct(details);
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


    // Filter products by category
    const filteredByCategory = selectedCategory
        ? products.filter((product) => product.category === selectedCategory)
        : products;

    return (
        <AppContext.Provider
            value={{
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
                handleCloseBottomDrawer,
                setSelectedCategory,
                filteredByCategory,
                selectedCategory,
                handleOpenSizeDrawer,
                handleCloseSizeDrawer,
                openSizeDrawer,
                openRemoveModal,
                handleOpenRemoveModal
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default StoreContext;
