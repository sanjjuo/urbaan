import { Button, Checkbox, Typography } from '@material-tailwind/react';
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa6';
import { IoIosArrowBack, IoMdCloudUpload } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useContext } from 'react';
import { AppContext } from '../../../../StoreContext/StoreContext';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const AddProduct = () => {
    const { BASE_URL } = useContext(AppContext) //BASE URL
    const navigate = useNavigate()
    const [fields, setFields] = useState([{ property: "", value: "" }])
    const [attributeFields, setAttributeFields] = useState([{ color: "", sizes: [{ size: "", stock: "" }] }]);
    const [productTitle, setProductTitle] = useState('')
    const [productCategory, setProductCategory] = useState('')
    const [productSubCategory, setProductSubCategory] = useState('')
    const [productActualPrice, setProductActualPrice] = useState('')
    const [productDiscount, setProductDiscount] = useState('')
    const [productOfferPrice, setProductOfferPrice] = useState('')
    const [checkboxes, setCheckboxes] = useState({
        latest: false,
        offer: false,
        featured: false,
    });
    const [productDescription, setProductDescription] = useState('')
    const [productImage, setProductImage] = useState([])
    const [productManuName, setProductManuName] = useState('')
    const [productManuBrand, setProductManuBrand] = useState('')
    const [productManuAddress, setProductManuAddress] = useState('')
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [filteredSubCategories, setFilteredSubCategories] = useState([]); //for getting subcategory having same catgeory id


    // handle image
    const handleProductImageUpload = (e) => {
        const files = Array.from(e.target.files); // Convert FileList to array
        setProductImage((prevImages) => [...prevImages, ...files]); // Append new files
    };


    // manage text color based ob bg-color
    const getContrastYIQ = (color) => {
        if (!/^#([0-9A-F]{3}){1,2}$/i.test(color)) return 'text-black'; // Default to black for invalid or empty colors
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        const yiq = (r * 299 + g * 587 + b * 114) / 1000;
        return yiq >= 128 ? 'text-black' : 'text-white';
    };



    // handle add new inputs at specification section
    const handleAddInputFields = () => {
        setFields([...fields, { property: "", value: "" }])
    }

    // handle inputs at specification section
    const handleInputChange = (e, i) => {
        const { name, value } = e.target
        const onChangeField = [...fields]
        onChangeField[i][name] = value
        setFields(onChangeField)
    }

    // handle to delete inputs at specification section
    const handleDeleteInputField = (i) => {
        if (fields.length > 1) {
            const deleteInput = [...fields];
            deleteInput.splice(i, 1);
            setFields(deleteInput);
        }
    };

    // handle add new inputs at attributes section with color size stock
    const handleAddAttributesFields = () => {
        setAttributeFields([...attributeFields, { color: "", sizes: [{ size: "", stock: "" }] }]);
    };


    // Handle input changes
    const handleAttributeInputChange = (index, fieldName, value) => {
        const updatedFields = attributeFields.map((field, i) =>
            i === index ? { ...field, [fieldName]: value } : field
        );
        setAttributeFields(updatedFields);
    };

    // handle to delete inputs at attributes section
    const handleDeleteAttributeInputField = (i) => {
        if (attributeFields.length > 1) {
            const updatedFields = [...attributeFields];
            updatedFields.splice(i, 1);
            setAttributeFields(updatedFields);
        }
    };


    // Handler for checkbox change
    const handleCheckboxChange = (e, checkboxName) => {
        setCheckboxes({ ...checkboxes, [checkboxName]: e.target.checked });
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


    // price computation
    useEffect(() => {
        if (productActualPrice && productDiscount) {
            // Convert discount percentage to decimal and calculate offer price
            const discountValue = parseFloat(productDiscount) / 100;
            const calculatedOfferPrice = productActualPrice - (productActualPrice * discountValue);
            setProductOfferPrice(calculatedOfferPrice.toFixed(2)); // Limit to 2 decimal places
        }
    }, [productActualPrice, productDiscount]);


    // subcategory display based on category id
    useEffect(() => {
        if (productCategory) {
            const filtered = subCategories.filter(
                (subcategory) => subcategory.MainCategory.id === productCategory
            );
            setFilteredSubCategories(filtered);
        } else {
            setFilteredSubCategories([]);
        }
    }, [productCategory, subCategories]);

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
    const handleCreateProductSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("Authorization is missing");
                return;
            }

            const productFormData = new FormData();
            productFormData.append('title', productTitle);
            productFormData.append('category', productCategory);
            productFormData.append('subcategory', productSubCategory);
            productFormData.append('actualPrice', productActualPrice);
            productFormData.append('discount', productDiscount);
            productFormData.append('offerPrice', productOfferPrice);
            productFormData.append('isLatestProduct', checkboxes.latest);
            productFormData.append('isOfferProduct', checkboxes.offer);
            productFormData.append('isFeaturedProduct', checkboxes.featured);
            productFormData.append('description', productDescription);

            // Convert fields array to backend-compatible object format
            const convertFieldsToObject = () => {
                return fields.reduce((acc, { property, value }) => {
                    acc[property] = value;
                    return acc;
                }, {});
            };
            // Append the transformed features to productFormData
            productFormData.append("features", JSON.stringify(convertFieldsToObject()));

            // // Handle images
            productImage.forEach((image, index) => {
                productFormData.append(`images[${index}]`, image); 
            });

            // Handle colors
            const attributes = attributeFields.reduce((acc, field) => {
                const existingColor = acc.find(attr => attr.color === field.color);
                if (existingColor) {
                    existingColor.sizes.push({ size: field.size, stock: parseInt(field.stock) });
                } else {
                    acc.push({ color: field.color, sizes: [{ size: field.size, stock: parseInt(field.stock) }] });
                }
                return acc;
            }, []);
            productFormData.append('colors', JSON.stringify(attributes));

            productFormData.append('manufacturerName', productManuName);
            productFormData.append('manufacturerBrand', productManuBrand);
            productFormData.append('manufacturerAddress', productManuAddress);


            // Log each entry in the FormData
            for (const [key, value] of productFormData.entries()) {
                console.log(`Key: ${key}, Value: ${value}`);
            }


            const headers = {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            };

            const response = await axios.post(`${BASE_URL}/admin/products/create-product`, productFormData, { headers });
            console.log(response.data);
            alert("Product is created");

            // Reset form
            setProductTitle('');
            setProductCategory('');
            setProductSubCategory('');
            setProductActualPrice('');
            setProductDiscount('');
            setProductOfferPrice('');
            setCheckboxes({ latest: false, offer: false, featured: false });
            setFields([{ property: "", value: "" }]);
            setAttributeFields([{ color: "", size: "", stock: "" }]);
            setProductDescription('');
            setProductImage([]);
            setProductManuName('');
            setProductManuBrand('');
            setProductManuAddress('');
        } catch (error) {
            console.error("Error in form submission:", error.response.data);
            alert("Product is not created");
        }
    };



    return (
        <>
            <p onClick={() => navigate(-1)} className='flex items-center cursor-pointer hover:text-primary'>
                <IoIosArrowBack /> Back</p>
            <h1 className='text-2xl lg:text-3xl font-semibold'>Create Product</h1>
            <form action='' className="grid lg:grid-cols-2 gap-10 mt-5" onSubmit={handleCreateProductSubmit}>
                <div className='bg-white rounded-xl shadow-md'>
                    <div className='p-5'>
                        <h2 className="text-xl font-medium mb-3 lg:mb-0 text-secondary">Product Information</h2>
                    </div>
                    <hr />
                    <div className='p-5 space-y-6'>
                        {/* title */}
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="" className='font-normal text-base'>Product title</label>
                            <input
                                type="text"
                                name="name"
                                value={productTitle}
                                onChange={(e) => setProductTitle(e.target.value)}
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
                                    value={productCategory}
                                    onChange={(e) => setProductCategory(e.target.value)}
                                    className="w-full text-sm text-gray-500 font-light bg-gray-100/50 border p-2 rounded focus:outline-none focus:cursor-pointer"
                                >
                                    <option value="Option 1">Select Category</option>
                                    {
                                        categories.map((category) => (
                                            <option key={category.id} value={category.id} className='capitalize'>{category.name}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            {/* subcategory */}
                            <div className='flex flex-col gap-1 w-full'>
                                <label className='font-normal text-base'>Sub Category</label>
                                <select
                                    name="selectField"
                                    value={productSubCategory}
                                    onChange={(e) => setProductSubCategory(e.target.value)}
                                    className="w-full text-sm text-gray-500 font-light bg-gray-100/50 border p-2 rounded focus:outline-none focus:cursor-pointer"
                                >
                                    <option value="Option 1">Select SubCategory</option>
                                    {
                                        filteredSubCategories.map((subcategory) => (
                                            <option key={subcategory.id} value={subcategory.id} className='capitalize'>{subcategory.title}</option>
                                        ))
                                    }

                                </select>
                            </div>
                        </div>
                        {/* price */}
                        <div className='flex justify-between items-center gap-2'>
                            <div className='flex flex-col gap-1 w-1/3'>
                                <label className='font-normal text-base'>Actual Price</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={productActualPrice}
                                    onChange={(e) => setProductActualPrice(e.target.value)}
                                    id=""
                                    placeholder='Actual Price'
                                    className='border-[1px] w-full 
                                    bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500
                                     focus:outline-none'/>
                            </div>
                            <div className='flex flex-col gap-1 w-1/3'>
                                <label className='font-normal text-base'>Discount (%)</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={productDiscount}
                                    onChange={(e) => setProductDiscount(e.target.value)}
                                    id=""
                                    placeholder='Discount'
                                    className='border-[1px] w-full
                                    bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500
                                     focus:outline-none'/>
                            </div>
                            {/* offer price */}
                            <div className='flex flex-col gap-1 w-1/3'>
                                <label htmlFor="" className='font-normal text-base'>Offer Price</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={productOfferPrice}
                                    onChange={(e) => setProductOfferPrice(e.target.value)}
                                    id=""
                                    placeholder='Offer price'
                                    className='border-[1px] w-full
                                    bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500
                                     focus:outline-none'/>
                            </div>
                        </div>
                        {/* checkboxes eg:latest, featured, offer */}
                        <div className='flex items-center justify-between'>
                            <Checkbox label={
                                <Typography className='font-custom text-secondary text-base font-normal'>Latest Products</Typography>}
                                color='pink'
                                value={checkboxes.latest}
                                onChange={(e) => handleCheckboxChange(e, 'latest')}
                                className='border-2 border-primary rounded-sm w-4 h-4'
                            />
                            <Checkbox label={
                                <Typography className='font-custom text-secondary text-base font-normal'>Offer Products</Typography>}
                                color='pink'
                                value={checkboxes.offer}
                                onChange={(e) => handleCheckboxChange(e, 'offer')}
                                className='border-2 border-primary rounded-sm w-4 h-4'
                            />
                            <Checkbox label={
                                <Typography className='font-custom text-secondary text-base font-normal'>Featured Products</Typography>}
                                color='pink'
                                value={checkboxes.featured}
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
                                fields.map((field, index) => (
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
                                value={productDescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                                rows="10"
                                className="w-full border-[1px] bg-gray-100/50 p-2 rounded resize-none overflow-y-scroll focus:outline-none
                                        placeholder:text-sm placeholder:font-light placeholder:text-gray-500 hide-scrollbar"
                                placeholder="Enter your description here..."
                                style={{ maxHeight: '250px' }}
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* second col */}

                {/* photo upload */}
                <div className='bg-white rounded-xl shadow-md p-5 space-y-6'>
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
                            {productImage.length === 0 ? (
                                <p className="text-xs text-gray-600 font-normal flex justify-center items-center h-full">
                                    Your selected images display here
                                </p>
                            ) : (
                                productImage.map((image, index) => (
                                    <li key={index} className="flex items-start justify-between bg-primary/15 rounded-md p-2">
                                        <div className="flex gap-3 items-start">
                                            <div className="w-[60px] h-[60px]">
                                                <img src={URL.createObjectURL(image)} alt="" className="w-full h-full object-cover rounded-md" />
                                            </div>
                                            <p className="text-secondary font-normal text-xs">{image.name}</p> {/* Display file name */}
                                        </div>
                                        <MdDelete
                                            onClick={() => setProductImage((prevImages) => prevImages.filter((_, imgIndex) => imgIndex !== index))}
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
                            value={productManuName}
                            onChange={(e) => setProductManuName(e.target.value)}
                            id=""
                            placeholder='Enter Name'
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
                            value={productManuBrand}
                            onChange={(e) => setProductManuBrand(e.target.value)}
                            id=""
                            placeholder='Enter Brand'
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
                            value={productManuAddress}
                            onChange={(e) => setProductManuAddress(e.target.value)}
                            id=""
                            placeholder='Enter Address'
                            className='border-[1px] 
                        bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500
                            focus:outline-none'/>
                    </div>

                    {/* color size stock */}
                    <div className='flex flex-col gap-1'>
                        <div className='flex items-center justify-between'>
                            <label htmlFor="">Set Product Attributes</label>
                            <FaPlus
                                className="text-2xl text-primary cursor-pointer"
                                onClick={handleAddAttributesFields}
                            />
                        </div>
                        {attributeFields.map((field, index) => (
                            <div key={index} className="flex items-center gap-2 mb-2">
                                {/* Color Picker */}
                                <div className="w-1/2">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-primary text-white rounded-md font-custom tracking-wider flex items-center justify-center gap-2 p-2 cursor-pointer relative">
                                            <input
                                                type="color"
                                                value={field.color}
                                                onChange={(e) => handleAttributeInputChange(index, "color", e.target.value)}
                                                className="absolute w-full h-full opacity-0 cursor-pointer"
                                            />
                                            <FaPlus className="text-xl" />
                                        </div>
                                        <input
                                            type="text"
                                            value={field.color}
                                            placeholder="Enter color code"
                                            onChange={(e) => handleAttributeInputChange(index, "color", e.target.value)}
                                            className={`w-full p-2 text-center bg-gray-100/50 border rounded-md text-sm uppercase placeholder:capitalize 
                                            focus:outline-none ${getContrastYIQ(field.color)}`}
                                            style={{ backgroundColor: field.color }}
                                        />
                                    </div>
                                </div>

                                {/* Size Input */}
                                <div className="w-1/4">
                                    <input
                                        type="text"
                                        value={field.size}
                                        placeholder="Enter size"
                                        onChange={(e) => handleAttributeInputChange(index, "size", e.target.value)}
                                        className="border w-full bg-gray-100/50 p-2 rounded-md uppercase placeholder:text-sm focus:outline-none placeholder:capitalize"
                                    />
                                </div>

                                {/* Stock Input */}
                                <div className="w-1/4">
                                    <input
                                        type="text"
                                        value={field.stock}
                                        placeholder="Enter stock"
                                        onChange={(e) => handleAttributeInputChange(index, "stock", e.target.value)}
                                        className="border w-full bg-gray-100/50 p-2 rounded-md placeholder:text-sm focus:outline-none placeholder:capitalize"
                                    />
                                </div>

                                {/* Delete Button */}
                                <MdDelete
                                    className="text-xl text-primary cursor-pointer"
                                    onClick={() => handleDeleteAttributeInputField(index)}
                                />
                            </div>
                        ))}
                    </div>

                    {/* button */}
                    <div className='flex justify-center items-center !mt-5'>
                        <Button type='submit' className='bg-buttonBg font-custom font-normal tracking-wider'>submit product</Button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default AddProduct
