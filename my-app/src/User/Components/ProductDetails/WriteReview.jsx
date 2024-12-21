import { Button } from '@material-tailwind/react';
import React, { useState } from 'react';
import { IoIosArrowBack, IoMdCloudUpload } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const WriteReview = () => {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [reviewText, setReviewText] = useState("");

    // Image selector
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    // Handle text change in the textarea
    const handleTextChange = (e) => {
        setReviewText(e.target.value);
        setShowSuggestions(false); // Hide suggestions when typing starts
    };

    // Suggestions for the review
    const suggestions = [
        "✨ Highlight the best feature.",
        "❤️ Share what you loved most.",
        "💡 Describe how it helped you.",
        "💰 Mention its great value.",
        "👍 Would you recommend it?",
    ];

    

    return (
        <>
            <div className="bg-white shadow-md py-4 px-4 w-full sticky top-0">
                <h1
                    className="flex items-center gap-2 text-xl font-medium cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    <IoIosArrowBack className="text-secondary text-2xl cursor-pointer" /> Write a Review
                </h1>
            </div>
            <div className="p-4 xl:py-16 xl:px-32 lg:py-16 lg:px-32 bg-userBg h-[calc(100vh-4rem)] overflow-y-auto">
                <div className="grid grid-cols-1 gap-5">
                    {/* Image Upload Section */}
                    <div className="flex justify-center items-center w-full xl:h-56 lg:h-56 h-44 border-4 border-dashed border-primary rounded-xl">
                        {!selectedImage ? (
                            <>
                                <input
                                    type="file"
                                    id="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                <label
                                    htmlFor="file"
                                    className="flex flex-col items-center cursor-pointer"
                                >
                                    <IoMdCloudUpload className="text-primary text-5xl" />
                                    <p className="text-secondary text-xs">Add Photo or Video</p>
                                </label>
                            </>
                        ) : (
                            <img
                                src={selectedImage}
                                alt="Uploaded"
                                className="w-full h-full rounded-lg"
                            />
                        )}
                    </div>

                    {/* Review Typing Section */}
                    <div>
                        <h1 className="flex items-center gap- text-lg xl:text-xl lg:text-xl font-semibold cursor-pointer">
                            Write your Review
                        </h1>
                        <div className="relative mt-4">
                            {showSuggestions && !reviewText && (
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-lg p-4 shadow-md w-60 z-10">
                                    <h3 className="text-gray-700 font-semibold mb-2">Suggestions:</h3>
                                    <ul className="text-gray-600 text-xs space-y-1">
                                        {suggestions.map((suggestion, index) => (
                                            <li key={index}>{suggestion}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <textarea
                                name="description"
                                className="w-full h-96 border-2 border-gray-400 bg-transparent p-2 rounded-lg resize-none overflow-y-scroll hide-scrollbar focus:outline-none 
                                placeholder:text-sm xl:placeholder:text-sm
                                lg:placeholder:text-sm placeholder:font-light placeholder:text-gray-500"
                                placeholder="Would you like to write anything about this Product?"
                                value={reviewText}
                                onChange={handleTextChange}
                                onFocus={() => !reviewText && setShowSuggestions(true)}
                                onBlur={() => setShowSuggestions(false)}
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div className="hidden xl:flex lg:flex justify-center mt-10">
                    <Button className="bg-primary font-custom font-normal text-sm capitalize w-52">
                        Submit Review
                    </Button>
                </div>

                <div className="bg-white shadow-md fixed bottom-0 inset-x-0 flex justify-center z-50 p-4 lg:hidden xl:hidden md:hidden">
                    <Button className="bg-primary font-custom font-normal text-sm capitalize w-full">
                        Submit Review
                    </Button>
                </div>
            </div>
        </>
    );
};

export default WriteReview;
