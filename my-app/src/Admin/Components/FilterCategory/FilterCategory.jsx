import React, { useState } from "react";
import {
    Menu,
    MenuHandler,
    MenuList,
    Button,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../../StoreContext/StoreContext";
import axios from "axios";


export default function FilterCategory() {
    const { BASE_URL } = useContext(AppContext)
    const [selectedCategory, setSelectedCategory] = useState("Category")
    const [categories, setCategories] = useState([])

    // Handle status selection
    const handleOrderStatusSelect = (category) => {
        setSelectedCategory(category);
    };

    // Prevent the click event from propagating to the Menu component
    const handleClickInside = (event) => {
        event.stopPropagation();
    };

    // fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/admin/category/get`);
                setCategories(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error, ": Error fetching data");
            }
        }
        fetchCategories();
    }, [])

    return (
        <Menu>
            <MenuHandler>
                <Button
                    className="!bg-white text-secondary rounded-xl cursor-pointer flex items-center gap-5 p-3 font-custom capitalize text-base font-normal
                   border-gray-300 border-[1px] shadow-none focus:shadow-none focus:outline-none hover:shadow-none outline-none"
                >
                    <div className="flex gap-1 whitespace-nowrap">
                        {selectedCategory}
                    </div>
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className="h-3.5 w-3.5 transition-transform"
                    />
                </Button>
            </MenuHandler>
            <MenuList className="rounded-2xl w-full max-w-lg p-0">
                <div className="border-b-[1px] p-5 hover:outline-none focus:outline-none">
                    <h1 className="text-secondary font-semibold text-lg text-center">Select Category</h1>
                    <ul className="mt-5 text-secondary flex flex-wrap justify-center items-center gap-2">
                        {categories.map((category) => (
                            <li
                                key={category.id}
                                onClick={(e) => {
                                    handleOrderStatusSelect(category.name);
                                    handleClickInside(e);  // Prevent Menu from closing
                                }}
                                className="cursor-pointer border-[1px] border-gray-400 text-sm w-[30%] p-2 flex justify-center items-center 
                                rounded-full hover:bg-primary hover:text-white"
                            >
                                {category.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='p-5 flex flex-col justify-center items-center gap-5 hover:outline-none focus:outline-none'>
                    <p className="text-sm">*You can choose multiple categories</p>
                    <Button className="bg-primary font-custom text-sm tracking-wider font-normal capitalize py-2 px-4">
                        Apply now
                    </Button>
                </div>
            </MenuList>
        </Menu>
    );
}
