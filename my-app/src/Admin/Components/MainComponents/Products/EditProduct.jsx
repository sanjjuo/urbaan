import { Button, Checkbox, Typography } from '@material-tailwind/react';
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa6';
import { IoIosArrowBack, IoMdCloudUpload } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaCircle } from "react-icons/fa";
import { useContext } from 'react';
import { AppContext } from '../../../../StoreContext/StoreContext';
import axios from 'axios';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const sizes = ['xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl', '5xl'];

const EditProduct = () => {
    const { BASE_URL } = useContext(AppContext)
    const navigate = useNavigate()
    const location = useLocation();
    const initialProducts = location.state.product;
    const [editProdcolor, setEditProdColor] = useState("#FFFFFF");
    const [editProdColorIcon, setEditProdColorIcon] = useState([]);
    const [editProdFields, setEditProdFields] = useState([{ property: "", value: "" }])
    const [editProdTitle, setEditProdTitle] = useState('')
    const [editProdCategory, setEditProdCategory] = useState('')
    const [editProdSubCategory, setEditProdSubCategory] = useState('')
    const [editProdActualPrice, setEditProdActualPrice] = useState('')
    const [editProdDiscount, setEditProdDiscount] = useState('')
    const [editProdOfferPrice, setEditProdOfferPrice] = useState('')
    const [editProdStock, setEditProdStock] = useState('')
    const [editProdCheckboxes, setEditProdCheckboxes] = useState({
        latest: false,
        offer: false,
        featured: false,
    });
    const [editProdDescription, setEditProdDescription] = useState('')
    const [editProdImage, setEditProdImage] = useState([])
    const [editProdManuName, setEditProdManuName] = useState('')
    const [editProdManuBrand, setEditProdManuBrand] = useState('')
    const [editProdManuAddress, setEditProdManuAddress] = useState('')
    const [editProdSize, setEditProdSize] = useState([])
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [filteredSubCategories, setFilteredSubCategories] = useState([]); //for getting subcategory having same catgeory id


    useEffect(() => {
        if (initialProducts) {
            setEditProdTitle(initialProducts.title)
            setEditProdCategory(initialProducts.category._id)
            setEditProdSubCategory(initialProducts.subcategory._id)
            setEditProdActualPrice(initialProducts.actualPrice)
            setEditProdDiscount(initialProducts.discount)
            setEditProdOfferPrice(initialProducts.offerPrice)
            setEditProdStock(initialProducts.stock)
            setEditProdCheckboxes({
                latest: initialProducts.isLatestProduct || false,
                offer: initialProducts.isOfferProduct || false,
                featured: initialProducts.isFeaturedProduct || false,
            });
            // Convert `features` object to array
            const featuresArray = Object.entries(initialProducts.features)
                .filter(([key, value]) => value !== null && value !== "")
                .map(([key, value]) => ({ property: key, value }));

            setEditProdFields(featuresArray);
            setEditProdDescription(initialProducts.description)
            setEditProdImage(initialProducts.images || [])
            setEditProdManuName(initialProducts.manufacturerName)
            setEditProdManuBrand(initialProducts.manufacturerBrand)
            setEditProdManuAddress(initialProducts.manufacturerAddress)
            setEditProdColorIcon(initialProducts.colors)
            setEditProdSize(initialProducts.sizes)
        }
    }, [initialProducts])



    // handle image
    const handleProductImageUpload = (e) => {
        const files = Array.from(e.target.files); // Convert FileList to array
        setEditProdImage((prevImages) => [...prevImages, ...files]); // Append new files
    };

    // handle Add color on each icon and input field
    const handleAddColor = (e) => {
        const newColor = e.target.value;
        if (!editProdColorIcon.includes(newColor)) {
            setEditProdColorIcon([...editProdcolor, newColor]);
        }
    };

    // manage text color based ob bg-color
    const getContrastYIQ = (hexColor) => {
        const r = parseInt(hexColor.substr(1, 2), 16);
        const g = parseInt(hexColor.substr(3, 2), 16);
        const b = parseInt(hexColor.substr(5, 2), 16);
        const yiq = (r * 299 + g * 587 + b * 114) / 1000;
        return yiq >= 128 ? "text-black" : "text-white";
    };

    // handle add new inputs at specification section
    const handleAddInputFields = () => {
        setEditProdFields([...editProdFields, { property: "", value: "" }])
    }

    // handle inputs at specification section
    const handleInputChange = (e, i) => {
        const { name, value } = e.target
        const onChangeField = [...editProdFields]
        onChangeField[i][name] = value
        setEditProdFields(onChangeField)
    }

    // handle to delete inputs at specification section
    const handleDeleteInputField = (i) => {
        if (editProdFields.length > 1) {
            const deleteInput = [...editProdFields];
            deleteInput.splice(i, 1);
            setEditProdFields(deleteInput);
        }
    };


    // Handler for checkbox change
    const handleCheckboxChange = (e, checkboxName) => {
        setEditProdCheckboxes({ ...editProdCheckboxes, [checkboxName]: e.target.checked });
    };


    // handle size
    const toggleSize = (size) => {
        setEditProdSize((prev) =>
            prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
        );
    };

    // price computation
    useEffect(() => {
        if (editProdActualPrice && editProdDiscount) {
            // Convert discount percentage to decimal and calculate offer price
            const discountValue = parseFloat(editProdDiscount) / 100;
            const calculatedOfferPrice = editProdActualPrice - (editProdActualPrice * discountValue);
            setEditProdOfferPrice(calculatedOfferPrice.toFixed(2)); // Limit to 2 decimal places
        }
    }, [editProdActualPrice, editProdDiscount]);


    // subcategory display based on category id
    useEffect(() => {
        if (editProdCategory) {
            const filtered = subCategories.filter(
                (subcategory) => subcategory.MainCategory.id === editProdCategory
            );
            setFilteredSubCategories(filtered);
        } else {
            setFilteredSubCategories([]);
        }
    }, [editProdCategory, subCategories]);



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

    // fetch Sub categories
    useEffect(() => {
        const fetchSubCategories = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/admin/Subcategory/get`);
                setSubCategories(response.data)
                console.log(response.data);
            } catch (error) {
                console.log(error, ": error fetching sub categories");
            }
        }
        fetchSubCategories();
    }, [])

    // form submission
    const handleEditProductSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("Authorization is missing")
                return;
            }

            const editproductFormData = new FormData();
            editproductFormData.append('title', editProdTitle);
            editproductFormData.append('category', editProdCategory);
            editproductFormData.append('subcategory', editProdSubCategory);
            editproductFormData.append('actualPrice', editProdActualPrice);
            editproductFormData.append('discount', editProdDiscount);
            editproductFormData.append('offerPrice', editProdOfferPrice);
            editproductFormData.append('stock', editProdStock);
            // Append checkbox states to the FormData
            editproductFormData.append('isLatestProduct', editProdCheckboxes.latest);
            editproductFormData.append('isOfferProduct', editProdCheckboxes.offer);
            editproductFormData.append('isFeaturedProduct', editProdCheckboxes.featured);
            // Iterate over `fields` and append each property and value to the FormData
            editProdFields.forEach((field) => {
                editproductFormData.append(`features[${field.property}]`, field.value);
            });
            editproductFormData.append('description', editProdDescription);
            // Append images to the FormData
            editproductFormData.append('images', editProdImage.map((img) => img.url));
            editproductFormData.append('manufacturerName', editProdManuName);
            editproductFormData.append('manufacturerBrand', editProdManuBrand);
            editproductFormData.append('manufacturerAddress', editProdManuAddress);
            // Append color array as a comma-separated string to FormData
            editproductFormData.append('colors', editProdColorIcon.map(color => `"${color}"`).join(', '));
            // Append sizes array as a comma-separated string to FormData
            editproductFormData.append('sizes', editProdSize.map(size => `"${size}"`).join(','));

            // Log each entry in the FormData
            for (const [key, value] of editproductFormData.entries()) {
                console.log(`Key: ${key}, Value: ${value}`);
            }

            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-type': 'multipart/form-data',
            };

            const response = await axios.post(`${BASE_URL}/admin/products/create-product`, editproductFormData, { headers })
            console.log(response.data);
            alert("Product is created")
            // Reset form
            setEditProdTitle('');
            setEditProdCategory('');
            setEditProdSubCategory('');
            setEditProdActualPrice('');
            setEditProdDiscount('');
            setEditProdOfferPrice('');
            setEditProdStock('');
            setEditProdCheckboxes({ latest: false, offer: false, featured: false });
            setEditProdFields([{ property: "", value: "" }]);
            setEditProdDescription('');
            setEditProdImage([]);
            setEditProdColor('#FFFFFF');
            setEditProdColorIcon([]);
            setEditProdManuName('');
            setEditProdManuBrand('');
            setEditProdManuAddress('');
            setEditProdSize([]);
        } catch (error) {
            console.error("Error in form submission:", error);
            alert("Product is not created")
            console.error("Error:", error.response || error.message);
            alert(`Error: ${error.response?.data?.message || "Something went wrong"}`);
        }
    }



    return (
        <>
            <p onClick={() => navigate(-1)} className='flex items-center cursor-pointer hover:text-primary'>
                <IoIosArrowBack /> Back</p>
            <h1 className='text-2xl lg:text-3xl font-semibold'>Edit Product</h1>
            <form action='' className="grid lg:grid-cols-2 gap-10 mt-5" onSubmit={handleEditProductSubmit}>
                <div className='bg-white rounded-xl shadow-md'>
                    <div className='p-5'>
                        <h2 className="text-xl font-medium mb-3 lg:mb-0 text-secondary">Product Information</h2>
                    </div>
                    <hr />
                    <div className='p-5 space-y-5'>
                        {/* title */}
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="" className='font-normal text-base'>Product title</label>
                            <input
                                type="text"
                                name="name"
                                value={editProdTitle}
                                onChange={(e) => setEditProdTitle(e.target.value)}
                                id=""
                                placeholder='Enter Product title'
                                className='border-[1px] 
                                    bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500
                                     focus:outline-none'/>
                        </div>

                        {/* category */}
                        <div className='flex justify-between items-center gap-2'>
                            <div className='flex flex-col gap-1 w-full'>
                                <label className='font-normal text-base'>Product Category</label>
                                <select
                                    name="selectField"
                                    value={editProdCategory}
                                    onChange={(e) => setEditProdCategory(e.target.value)}
                                    className="w-full text-sm text-secondary font-light bg-gray-100/50 border p-2 rounded focus:outline-none focus:cursor-pointer"
                                >
                                    <option value="Option 1" >Select Category</option>
                                    {
                                        categories.map((category) => (
                                            <option className='text-gray-500 capitalize' key={category.id} value={category.id}>{category.name}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            {/* subcategory */}
                            <div className='flex flex-col gap-1 w-full'>
                                <label className='font-normal text-base'>Sub Category</label>
                                <select
                                    name="selectField"
                                    value={editProdSubCategory}
                                    onChange={(e) => setEditProdSubCategory(e.target.value)}
                                    className="w-full text-sm text-secondary font-light bg-gray-100/50 border p-2 rounded focus:outline-none focus:cursor-pointer"
                                >
                                    <option value="Option 1">Select SubCategory</option>
                                    {
                                        filteredSubCategories.map((subcategory) => (
                                            <option className='text-gray-500 capitalize' key={subcategory.id} value={subcategory.id}>{subcategory.title}</option>
                                        ))
                                    }

                                </select>
                            </div>
                        </div>
                        {/* price */}
                        <div className='flex justify-between items-center gap-2'>
                            <div className='flex flex-col gap-1 w-full'>
                                <label className='font-normal text-base'>Actual Price</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={editProdActualPrice}
                                    onChange={(e) => editProdActualPrice(e.target.value)}
                                    id=""
                                    placeholder='Actual Price'
                                    className='border-[1px] 
                                    bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500
                                     focus:outline-none'/>
                            </div>
                            <div className='flex flex-col gap-1 w-full'>
                                <label className='font-normal text-base'>Discount (%)</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={editProdDiscount}
                                    onChange={(e) => setEditProdDiscount(e.target.value)}
                                    id=""
                                    placeholder='Discount'
                                    className='border-[1px] 
                                    bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500
                                     focus:outline-none'/>
                            </div>
                        </div>
                        {/* offer price */}
                        <div className='flex items-center gap-2'>
                            <div className='flex flex-col gap-1 w-1/2'>
                                <label htmlFor="" className='font-normal text-base'>Offer Price</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={editProdOfferPrice}
                                    onChange={(e) => setEditProdOfferPrice(e.target.value)}
                                    id=""
                                    placeholder='Offer price'
                                    className='border-[1px] 
                                    bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500
                                     focus:outline-none'/>
                            </div>
                            <div className='flex flex-col gap-1 w-1/2'>
                                <label htmlFor="" className='font-normal text-base'>Stock</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={editProdStock}
                                    onChange={(e) => setEditProdStock(e.target.value)}
                                    id=""
                                    placeholder='50'
                                    className='border-[1px] 
                                    bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500
                                     focus:outline-none'/>
                            </div>
                        </div>
                        {/* checkboxes eg:latest, featured, offer */}
                        <div className='flex items-center justify-between'>
                            <Checkbox label={
                                <Typography className='font-custom text-secondary text-base font-normal'>Latest Products</Typography>}
                                color='pink'
                                checked={editProdCheckboxes.latest}
                                onChange={(e) => handleCheckboxChange(e, 'latest')}
                                className='border-2 border-primary rounded-sm w-4 h-4'
                            />
                            <Checkbox label={
                                <Typography className='font-custom text-secondary text-base font-normal'>Offer Products</Typography>}
                                color='pink'
                                checked={editProdCheckboxes.offer}
                                onChange={(e) => handleCheckboxChange(e, 'offer')}
                                className='border-2 border-primary rounded-sm w-4 h-4'
                            />
                            <Checkbox label={
                                <Typography className='font-custom text-secondary text-base font-normal'>Featured Products</Typography>}
                                color='pink'
                                checked={editProdCheckboxes.featured}
                                onChange={(e) => handleCheckboxChange(e, 'featured')}
                                className='border-2 border-primary rounded-sm w-4 h-4'
                            />
                        </div>

                        {/* specifications */}
                        <div className='flex flex-col gap-1'>
                            <div className='flex items-center justify-between'>
                                <label htmlFor="" className='font-normal text-base'>Specifications</label>
                                <FaPlus
                                    className="text-2xl text-primary cursor-pointer"
                                    onClick={handleAddInputFields}
                                />
                            </div>
                            {
                                editProdFields.map((field, index) => (
                                    <div className='flex items-center gap-2' key={index}>
                                        <input
                                            type="text"
                                            name="property"
                                            value={field.property}
                                            onChange={(e) => handleInputChange(e, index)}
                                            placeholder='Property'
                                            className='border-[1px] w-1/2 
                                                    bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500
                                                    focus:outline-none'
                                        />
                                        <input
                                            type="text"
                                            name="value"
                                            value={field.value}
                                            onChange={(e) => handleInputChange(e, index)}
                                            placeholder='Value'
                                            className='border-[1px] w-1/2
                                                    bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500
                                                    focus:outline-none'
                                        />
                                        <MdDelete
                                            className="text-xl text-primary cursor-pointer"
                                            onClick={() => handleDeleteInputField(index)}
                                        />
                                    </div>
                                ))
                            }
                        </div>


                        {/* description */}
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="" className='font-normal text-base'>Product Description</label>
                            <textarea
                                name="description"
                                value={editProdDescription}
                                onChange={(e) => setEditProdDescription(e.target.value)}
                                rows="10"
                                className="w-full border-[1px] bg-gray-100/50 p-2 rounded resize-none overflow-y-scroll focus:outline-none
                                        placeholder:text-sm placeholder:font-light placeholder:text-gray-500"
                                placeholder="Enter your description here..."
                                style={{ maxHeight: '150px' }}
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* second col */}

                {/* photo upload */}
                <div className='bg-white rounded-xl shadow-md p-5 space-y-5'>
                    <div className='flex gap-5'>
                        <div className="flex flex-col justify-center items-center w-72 h-56 border-4 border-dashed border-primary rounded-xl">
                            <input
                                type="file"
                                id="file"
                                className="hidden"
                                accept="image/*"
                                multiple
                                onChange={handleProductImageUpload}
                            />
                            <label htmlFor="file" className="flex flex-col items-center cursor-pointer">
                                <IoMdCloudUpload className="text-primary text-5xl" />
                                <p className="text-secondary text-xs">Browse files to upload</p>
                            </label>
                        </div>

                        <ul className="flex-1 space-y-2 h-56 overflow-y-auto hide-scrollbar">
                            {editProdImage.length === 0 ? (
                                <p className="text-xs text-gray-600 font-normal flex justify-center items-center h-full">
                                    Your selected images display here
                                </p>
                            ) : (
                                editProdImage.map((image, index) => (
                                    <li key={index} className="flex items-start justify-between bg-primary/15 rounded-md p-2">
                                        <div className="flex gap-3 items-start">
                                            <div className="w-[60px] h-[60px]">
                                                <img src={URL.createObjectURL(image)} alt="" className="w-full h-full object-cover rounded-md" />
                                            </div>
                                            <p className="text-secondary font-normal text-xs">{image.name}</p> {/* Display file name */}
                                        </div>
                                        <MdDelete
                                            onClick={() => setEditProdImage((prevImages) =>
                                                prevImages.filter((_, imgIndex) => imgIndex !== index))}
                                            className="text-deleteBg text-lg cursor-pointer hover:text-primary"
                                        />
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>

                    {/* manufacter name */}
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="" className='font-normal text-base'>Manufacturer Name</label>
                        <input
                            type="text"
                            name="name"
                            value={editProdManuName}
                            onChange={(e) => setEditProdManuName(e.target.value)}
                            id=""
                            placeholder='Enter Manufacturer Name'
                            className='border-[1px] 
                        bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500
                            focus:outline-none'/>
                    </div>

                    {/* manufacter brand */}
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="" className='font-normal text-base'>Manufacturer Brand</label>
                        <input
                            type="text"
                            name="name"
                            value={editProdManuBrand}
                            onChange={(e) => setEditProdManuBrand(e.target.value)}
                            id=""
                            placeholder='Enter Manufacturer Brand'
                            className='border-[1px] 
                        bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500
                            focus:outline-none'/>
                    </div>

                    {/* manufacter address */}
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="" className='font-normal text-base'>Manufacturer Address</label>
                        <input
                            type="text"
                            name="name"
                            value={editProdManuAddress}
                            onChange={(e) => setEditProdManuAddress(e.target.value)}
                            id=""
                            placeholder='Enter Manufacturer Address'
                            className='border-[1px] 
                        bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500
                            focus:outline-none'/>
                    </div>

                    {/* color */}
                    <div>
                        <div className='flex items-center justify-between'>
                            <label htmlFor="" className='font-normal text-base'>Colour</label>
                            <MdDelete
                                className="text-xl text-primary cursor-pointer"
                                onClick={() => {
                                    setEditProdColor('#FFFFFF');
                                    setEditProdColorIcon([])
                                }}
                            />
                        </div>
                        <div className='flex items-center gap-2 mt-2'>
                            <div className='w-full border-2 h-12 rounded-lg' style={{ backgroundColor: editProdcolor }} >
                                <input
                                    type='text'
                                    value={editProdcolor}
                                    multiple
                                    onChange={(e) => setEditProdColor(e.target.value)}
                                    className={`w-full text-center uppercase rounded-lg bg-transparent text-sm flex justify-center items-center focus:outline-none h-full ${getContrastYIQ(
                                        editProdcolor
                                    )}`}
                                />
                            </div>
                            <div className="border-primary rounded-md w-full border-2 text-primary font-custom tracking-wider flex items-center justify-center gap-2 px-3 py-2 cursor-pointer relative">
                                <input
                                    type="color"
                                    value={editProdcolor}
                                    onChange={(e) => {
                                        setEditProdColor(e.target.value)
                                        handleAddColor(e);
                                    }}
                                    name="colorPicker"
                                    id="colorPicker"
                                    className="w-full bg-transparent absolute opacity-0 pointer-events-none"
                                />
                                <label
                                    htmlFor="colorPicker"
                                    className="flex items-center gap-1 cursor-pointer"
                                    onClick={() => document.getElementById('colorPicker').click()}
                                >
                                    <FaPlus /> Add Color
                                </label>
                            </div>
                        </div>
                        <ul className='mt-5 flex items-center gap-3'>
                            {
                                editProdColorIcon.map((colorRound, index) => (
                                    <li key={index} className='cursor-pointer'>
                                        <FaCircle className='text-3xl' color={colorRound} />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    {/* size */}
                    <div>
                        <h3 className="text-secondary text-base">Size</h3>
                        <ul className="mt-2 flex items-center gap-2">
                            {sizes.map((size, index) => (
                                <li
                                    key={index}
                                    onClick={() => toggleSize(size)}
                                    className={`uppercase border-2 border-gray-300 w-10 h-10 flex items-center justify-center rounded-md text-xs cursor-pointer 
                                     ${editProdSize.includes(size) ? "bg-primary text-white border-primary"
                                            : "border-gray-300"}`}
                                >
                                    {size}
                                </li>
                            ))}
                        </ul>
                    </div>


                    {/* button */}
                    <div className='flex justify-center items-center mt-2'>
                        <Button type='submit' className='bg-buttonBg font-custom font-normal tracking-wider'>submit product</Button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default EditProduct
