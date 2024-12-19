import React, { useContext } from 'react'
import { Card, Typography, CardFooter, Button, IconButton } from "@material-tailwind/react";
import { AppContext } from "../../../../StoreContext/StoreContext"
import { DeleteModal } from '../../DeleteModal/DeleteModal';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import AppLoader from '../../../../Loader';
import toast from 'react-hot-toast';

const TABLE_HEAD = ["Sub Category", "Category", "Status", "Action"];


const AddedSubCategories = ({ createEditSub, handleEditCategory }) => {
    const { open, handleOpen, modalType, BASE_URL } = useContext(AppContext)
    const [subCategory, setSubCategory] = useState([])
    const [selectedCatId, setSelectedCatId] = useState(null); // Track selected category ID 
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchSubCategory = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/admin/Subcategory/get`);
                setSubCategory(response.data)
                console.log(response.data);
                setIsLoading(false)
            } catch (error) {
                console.log(error);
            }
        }
        fetchSubCategory();
    }, [])


    const handleSubCategoryDelete = async (subCategoryId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("Authorization is missing")
                return;
            }

            const headers = {
                Authorization: `Bearer ${token}`
            };

            const response = await axios.delete(`${BASE_URL}/admin/Subcategory/delete/${subCategoryId}`, { headers })
            console.log(response.data);
            handleOpen();
            toast.success('Subcategory is deleted')
        } catch (error) {
            console.log(error);
            alert("Sub category is not deleted")
        }
    }


    return (
        <>
            {
                isLoading || subCategory.length === 0 ? (
                    <div className='col-span-2 flex justify-center items-center h-[50vh]'>
                        <AppLoader />
                    </div>
                ) : (
                    <>
                        <Card className=" w-full shadow-none bg-transparent">
                            <table className="w-full table-auto text-left border-collapse">
                                <thead className='bg-white bg-transparent'>
                                    <tr className='bg-white'>
                                        {TABLE_HEAD.map((head) => (
                                            <th
                                                key={head}
                                                className="border-b border-gray-300 p-4 text-center"
                                            >
                                                <Typography
                                                    variant="small"
                                                    className="font-semibold uppercase font-custom text-base leading-none text-secondary"
                                                >
                                                    {head}
                                                </Typography>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className='bg-transparent'>
                                    {subCategory.map((subCat, index) => {
                                        const isLast = index === subCategory.length - 1;
                                        const classes = isLast
                                            ? "p-4 text-center"
                                            : "p-4 border-b border-gray-300 text-center";
                                        return (
                                            <tr key={subCat.id} className="bg-transparent">
                                                <td className={classes}>
                                                    <div className="flex items-center gap-3">
                                                        <div className='w-[60px] h-[60px] rounded-md'>
                                                            <img src={`${BASE_URL}/uploads/category/${subCat.SubImageUrl}`} alt={subCat.title} className='w-full h-full object-cover rounded-md' />
                                                        </div>
                                                        <Typography
                                                            variant="small"
                                                            className="font-normal capitalize font-custom text-sm"
                                                        >
                                                            {subCat.title}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <div className="flex items-center gap-2">
                                                        <Typography
                                                            variant="small"
                                                            className="font-normal capitalize font-custom text-sm"
                                                        >
                                                            {subCat.MainCategory.name}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <Button
                                                        className={`${subCat.isActive ? "bg-green-500 text-white" : "bg-red-500 text-white"
                                                            } text-sm font-custom capitalize font-normal py-1 px-3 rounded-3xl`}
                                                    >
                                                        {subCat.isActive ? "Active" : "Inactive"}
                                                    </Button>
                                                </td>
                                                <td className={classes}>
                                                    <div className="flex justify-center gap-2 text-sm">
                                                        <button
                                                            onClick={() => { handleEditCategory(subCat); setSelectedCatId(subCat.id); }}
                                                            className={`text-buttonBg bg-editBg w-14 h-7 flex justify-center items-center rounded-md hover:bg-buttonBg 
                                                        hover:text-editBg ${createEditSub === "editSub" && selectedCatId === subCat.id ? "!bg-buttonBg text-editBg" : ""}`}>
                                                            Edit
                                                        </button>
                                                        <button onClick={() => { handleOpen("deleteModal"); setSelectedCatId(subCat.id) }} className="text-deleteBg bg-primary/20 w-14 h-7 flex justify-center items-center rounded-md
                                                        hover:bg-primary hover:text-white">
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                                <Button variant="outlined" size="sm" className='font-custom border-gray-300 font-normal capitalize 
                    text-sm cursor-pointer hover:bg-black hover:text-white'>
                                    Prev. page
                                </Button>
                                <div className="flex items-center gap-2">
                                    <IconButton variant="outlined" size="sm">
                                        1
                                    </IconButton>
                                    <IconButton variant="text" size="sm">
                                        2
                                    </IconButton>
                                    <IconButton variant="text" size="sm">
                                        3
                                    </IconButton>
                                    <IconButton variant="text" size="sm">
                                        ...
                                    </IconButton>
                                    <IconButton variant="text" size="sm">
                                        8
                                    </IconButton>
                                    <IconButton variant="text" size="sm">
                                        9
                                    </IconButton>
                                    <IconButton variant="text" size="sm">
                                        10
                                    </IconButton>
                                </div>
                                <Button variant="outlined" size="sm" className='font-custom border-gray-300 font-normal capitalize text-sm 
                    cursor-pointer hover:bg-black hover:text-white'>
                                    Next page
                                </Button>
                            </CardFooter>
                        </Card>
                    </>
                )
            }

            <DeleteModal
                open={open === "deleteModal"} // Distinguish by modalType
                handleOpen={handleOpen}
                title="Are you sure?"
                description="Do you really want to delete this item? This action cannot be undone."
                handleDelete={handleSubCategoryDelete}
                SubCatId={selectedCatId}
                modalType="subcategories"
            />
        </>
    )
}

export default AddedSubCategories
