import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';
import { AppContext } from "../../../../StoreContext/StoreContext"
import { DeleteModal } from '../../DeleteModal/DeleteModal';
import { ReadMoreModal } from '../../ReadMoreModal/ReadMoreModal';

const AddedCategories = ({ createEdit, setCreateEdit }) => {
    const { open, handleOpen } = useContext(AppContext);
    const [selectedItem, setSelectedItem] = useState(null);

    const addedCategories = [
        {
            id: "1",
            category: "Kurti",
            subCategories: ["Kurti", "Kurti Set", "Ethnic Wear", "Dress"],
        },
        {
            id: "2",
            category: "Kurti",
            subCategories: ["Top & Bottom Set", "Top, Bottom Dupatta Set"],
        },
        {
            id: "3",
            category: "Bottom",
            subCategories: ["Pants", "Leggings", "Pallazo", "Jeans"],
        },
        {
            id: "4",
            category: "Maternity Wear",
            subCategories: ["Pre Maternity", "Post Maternity", "Maternity Nighty"],
        },
        {
            id: "5",
            category: "Night Wear",
            subCategories: ["Pajamas", "Nighties", "Lounge Sets", "Robes", "Sleep Shirts"],
        },
        {
            id: "6",
            category: "Churidar Material",
            subCategories: ["Cotton", "Silk", "Chiffon", "Georgette", "Crepe"],
        }
        
    ];

    return (
        <>
            {addedCategories.map((item) => (
                <div
                    className="bg-white rounded-xl shadow-md p-5 h-64 space-y-6 relative"
                    key={item.id}
                >
                    {/* Category Header */}
                    <div className="flex items-center justify-between">
                        <h2 className="font-bold text-2xl">{item.category}</h2>
                        <div className="flex gap-2 text-sm">
                            <button
                                onClick={() => setCreateEdit("edit")}
                                className={`text-buttonBg bg-editBg w-14 h-7 flex justify-center items-center rounded-md hover:bg-buttonBg 
                                    hover:text-editBg ${createEdit === "edit" ? "!bg-buttonBg text-editBg" : ""}`}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() =>
                                    handleOpen('deleteModal')
                                }
                                className="text-deleteBg bg-primary/20 w-14 h-7 flex justify-center items-center rounded-md hover:bg-primary hover:text-white"
                            >
                                Delete
                            </button>
                        </div>
                    </div>

                    {/* Subcategories List */}
                    <ul className="space-y-1 text-secondary/50 text-sm">
                        {item.subCategories.map((sub, i) => (
                            <li key={i} className="font-normal">{sub}</li>
                        ))}
                    </ul>

                    {/* Read More Link */}
                    <Link
                        to="#"
                        onClick={() => {
                            setSelectedItem(item); // Set the selected item
                            handleOpen("readMoreModal");
                        }}
                        className="absolute bottom-5 text-buttonBg text-sm flex items-center gap-2 hover:text-blue-900"
                    >
                        Read more <FaArrowRight />
                    </Link>
                </div>
            ))}

            <DeleteModal
                open={open === "deleteModal"}
                handleOpen={handleOpen}
                title="Are you sure ?"
                description="Do you really want to delete this item? This action cannot be undone."
            />
            <ReadMoreModal
                open={open === "readMoreModal"}
                handleOpen={handleOpen}
                item={selectedItem}
            />
        </>
    );
};

export default AddedCategories;
