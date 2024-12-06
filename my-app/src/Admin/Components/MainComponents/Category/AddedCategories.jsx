import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';
import { AppContext } from "../../../../StoreContext/StoreContext";
import { DeleteModal } from '../../DeleteModal/DeleteModal';
import { ReadMoreModal } from '../../ReadMoreModal/ReadMoreModal';
import axios from 'axios';
import { Card } from '@material-tailwind/react';

const AddedCategories = ({ createEdit, setCreateEdit }) => {
    const { open, handleOpen } = useContext(AppContext);
    const [selectedItem, setSelectedItem] = useState(null);
    const [adminCategory, setAdminCategory] = useState([]);

    const handleReadmore = (cat) => {
        setSelectedItem(cat);
        handleOpen("readMoreModal");
        console.log(cat);  
    }

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const BASE_URL = import.meta.env.VITE_BASE_URL;
                const response = await axios.get(`${BASE_URL}/admin/category/get`);
                setAdminCategory(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategory();
    }, []);

    return (
        <>
            {adminCategory.map((category) => (
                <Card className="p-5 space-y-6 relative" key={category.id}>
                    <div className='w-full h-32'>
                        <img src={category.imageUrl} alt={category.name} className='h-full w-full object-cover rounded-lg' />
                    </div>
                    <div>
                        <h2 className="font-bold text-2xl text-secondary capitalize">{category.name}</h2>
                        <h2 className="font-normal text-secondary capitalize">{category.description}</h2>
                    </div>
                    <div className="flex items-center justify-between">
                        {/* Read More Link */}
                        <Link
                            onClick={() => handleReadmore(category)}
                            className="text-buttonBg text-sm flex items-center gap-2 hover:text-blue-900"
                        >
                            <p>Read more</p> <FaArrowRight />
                        </Link>

                        {/* Buttons */}
                        <div className="flex gap-2 text-sm">
                            <button
                                onClick={() => setCreateEdit("edit")}
                                className={`text-buttonBg bg-editBg w-14 h-7 flex justify-center items-center rounded-md hover:bg-buttonBg 
                                hover:text-editBg ${createEdit === "edit" ? "!bg-buttonBg text-editBg" : ""}`}>
                                Edit
                            </button>
                            <button
                                onClick={() => handleOpen('deleteModal')}
                                className="text-deleteBg bg-primary/20 w-14 h-7 flex justify-center items-center rounded-md hover:bg-primary hover:text-white">
                                Delete
                            </button>
                        </div>
                    </div>
                </Card>
            ))}

            <DeleteModal
                open={open === "deleteModal"}
                handleOpen={handleOpen}
                title="Are you sure?"
                description="Do you really want to delete this item? This action cannot be undone."
            />
            <ReadMoreModal
                open={open === "readMoreModal"}
                handleOpen={handleOpen}
                category={selectedItem}
            />
        </>
    );
};

export default AddedCategories;
