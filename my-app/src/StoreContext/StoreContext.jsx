import React, { createContext, useState } from 'react'
import { products } from '../data';

export const AppContext = createContext();

const StoreContext = ({ children }) => {
    const [open, setOpen] = useState(null);
    const [openDrawer, setDrawerOpen] = useState(false);
    const [openBottomDrawer, setBottomDrawerOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // modal
    const handleOpen = (modal) => setOpen(modal);

    // drawer
    const handleOpenDrawer = () => setDrawerOpen(true);
    const handleCloseDrawer = () => setDrawerOpen(false);

    // product details
    const handleProductDetails = (details) => {
        setSelectedProduct(details)
    }

    // bottom drawer
    const handleOpenBottomDrawer = () => setBottomDrawerOpen(true);
    const handleCloseBottomDrawer = () => setBottomDrawerOpen(false);

    // catgeory handle
    const filteredByCategory = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;
  


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
                handleCloseBottomDrawer,
                setSelectedCategory,
                filteredByCategory
            }}>
                {children}
            </AppContext.Provider>
        </>
    )
}

export default StoreContext