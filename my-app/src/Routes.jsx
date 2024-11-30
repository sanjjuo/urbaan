import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LoginSignUp from "./Admin/LoginSignUp/LoginSignUp";
import Home from "./Admin/Home/Home";
import Dashboard from "./Admin/Components/MainComponents/DashBoard/DashBoard";
import Products from "./Admin/Components/MainComponents/Products/Products";
import Category from "./Admin/Components/MainComponents/Category/Category";
import SubCategory from "./Admin/Components/MainComponents/SubCategory/SubCategory";
import OrderList from "./Admin/Components/MainComponents/OrderList/OrderList";
import Coupons from "./Admin/Components/MainComponents/Coupons/Coupons";
import UsersList from "./Admin/Components/MainComponents/UsersList/UsersList";
import Invoice from "./Admin/Components/MainComponents/Invoice/Invoice";
import AddProduct from "./Admin/Components/MainComponents/Products/AddProduct";
import ViewUserDetails from "./Admin/Components/MainComponents/UsersList/ViewUserManagement";
import EditProduct from "./Admin/Components/MainComponents/Products/EditProduct";
import ScrollToTop from "./ScrollToTop";
import { LoginSignUpUser } from './User/LoginSignUpUser/LoginSignUpUser';
import { Otp } from './User/Otp/Otp';
import UserHome from './User/Home/Home';
import UserNavbar from './User/Components/Navbar/Navbar';
import Footer from './User/Components/Footer/Footer';

const FullRoutes = () => {
    return (
        <Router>
            <RoutesWithLocation />
        </Router>
    );
}

const RoutesWithLocation = () => {
    const location = useLocation();

    // Check if the current path belongs to the admin section
    const isAdminRoute = location.pathname.startsWith('/admin');
    // Check if the current path is the login or OTP page
    const isLoginOrOtpPage = location.pathname === '/login-user' || location.pathname === '/otp';

    return (
        <>
            <ScrollToTop />
            {/* Hide Navbar on login and OTP pages and Show Navbar only if not on an admin route */}
            {!isAdminRoute && !isLoginOrOtpPage && <UserNavbar />}
            <Routes>
                {/* Routes of user section */}
                <Route path='/' element={<UserHome />} />
                <Route path='/login-user' element={<LoginSignUpUser />} />
                <Route path='/otp' element={<Otp />} />

                {/* Routes of admin section */}
                <Route path='/admin-login' element={<LoginSignUp />} />
                <Route path='/adminHome' element={<Home />}>
                    <Route path='' element={<Dashboard />} />
                    <Route path='product' element={<Products />} />
                    <Route path='category' element={<Category />} />
                    <Route path='subcategory' element={<SubCategory />} />
                    <Route path='orderlist' element={<OrderList />} />
                    <Route path='coupon' element={<Coupons />} />
                    <Route path='userslist' element={<UsersList />} />
                    <Route path='invoice' element={<Invoice />} />
                    <Route path='addProduct' element={<AddProduct />} />
                    <Route path='userDetails' element={<ViewUserDetails />} />
                    <Route path='editProduct' element={<EditProduct />} />
                </Route>
            </Routes>
            {/* Hide Footer on login and OTP pages and Show Footer only if not on an admin route */}
            {!isAdminRoute && !isLoginOrOtpPage && <Footer />}
        </>
    );
}

export default FullRoutes;
