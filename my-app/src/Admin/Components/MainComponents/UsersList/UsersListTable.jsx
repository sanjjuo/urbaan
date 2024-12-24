import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, CardBody, CardFooter, IconButton, Menu, MenuHandler, MenuItem, MenuList, Typography } from "@material-tailwind/react";
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { AppContext } from "../../../../StoreContext/StoreContext";
import AppLoader from '../../../../Loader';
import axios from 'axios';

const TABLE_HEAD = ["user name", "mobile", "address", "city", "state", "pincode", "Action"];

const UsersListTable = () => {
    const [userList, setUserList] = useState([]);
    const { BASE_URL } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    // Get current items to display
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUserList = userList.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle next and prev page
    const handleNextPage = () => {
        if (currentPage < Math.ceil(userList.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    useEffect(() => {
        const fetchUserList = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/admin/users/view-all/`);
                setUserList(response.data.users); // Ensure you access the correct field in the API response
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching users:", error);
                setIsLoading(false);
            }
        };
        fetchUserList();
    }, [BASE_URL]);

    return (
        <>
            {isLoading || userList.length === 0 ? (
                <div className="col-span-2 flex justify-center items-center h-[50vh]">
                    <AppLoader />
                </div>
            ) : (
                <Card className="w-full shadow-sm rounded-xl bg-white border-[1px]">
                    <CardBody>
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr className="bg-quaternary">
                                    {TABLE_HEAD.map((head) => (
                                        <th
                                            key={head}
                                            className="border-b border-blue-gray-100 p-4"
                                        >
                                            <Typography
                                                variant="small"
                                                className="font-semibold font-custom text-secondary leading-none text-base uppercase"
                                            >
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {currentUserList.map((user, index) => {
                                    const isLast = index === currentUserList.length - 1;
                                    const classes = isLast ? "p-4" : "p-4 border-b border-gray-300";
                                    const firstAddress = user.addresses?.[0] || {}; // Safely access the first address

                                    return (
                                        <tr key={user.id}>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    className="font-normal capitalize font-custom text-sm"
                                                >
                                                    {user.name}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    className="font-normal capitalize font-custom text-sm"
                                                >
                                                    {user.phone || "N/A"}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    className="font-normal capitalize font-custom text-sm"
                                                >
                                                    {firstAddress.address || "N/A"}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    className="font-normal capitalize font-custom text-sm"
                                                >
                                                    {firstAddress.city || "N/A"}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    className="font-normal capitalize font-custom text-sm"
                                                >
                                                    {firstAddress.state || "N/A"}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    className="font-normal font-custom text-xs"
                                                >
                                                    {firstAddress.pincode || "N/A"}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Menu>
                                                    <MenuHandler>
                                                        <IconButton variant="text">
                                                            <HiOutlineDotsHorizontal className="text-primary text-2xl cursor-pointer" />
                                                        </IconButton>
                                                    </MenuHandler>
                                                    <MenuList>
                                                        <Link
                                                            to={{
                                                                pathname: '/adminHome/userDetails',
                                                            }}
                                                            state={{ user }}
                                                        >
                                                            <MenuItem className="font-custom text-buttonBg hover:!text-buttonBg">View</MenuItem>
                                                        </Link>
                                                        <MenuItem className="font-custom text-processingBg hover:!text-processingBg">
                                                            Suspend
                                                        </MenuItem>
                                                        <MenuItem className="font-custom text-primary hover:!text-primary">
                                                            Delete
                                                        </MenuItem>
                                                    </MenuList>
                                                </Menu>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </CardBody>
                    <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                        <Button
                            variant="outlined"
                            size="sm"
                            className='font-custom border-gray-300 font-normal capitalize text-sm cursor-pointer hover:bg-black hover:text-white'
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                        >
                            Prev. page
                        </Button>

                        <div className="flex items-center gap-2">
                            {[...Array(Math.ceil(userList.length / itemsPerPage))].map((_, index) => (
                                <IconButton key={index} variant="text" size="sm" onClick={() => paginate(index + 1)}>
                                    {index + 1}
                                </IconButton>
                            ))}
                        </div>

                        <Button
                            variant="outlined"
                            size="sm"
                            className='font-custom border-gray-300 font-normal capitalize text-sm cursor-pointer hover:bg-black hover:text-white'
                            onClick={handleNextPage}
                            disabled={currentPage === Math.ceil(userList.length / itemsPerPage)}
                        >
                            Next page
                        </Button>
                    </CardFooter>
                </Card>
            )}
        </>
    );
};

export default UsersListTable;
