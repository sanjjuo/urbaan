import React from 'react';
import Loader from "react-js-loader";

const AppLoader = () => {
    const color = "#C21E56"; 

    return (
        <>
            <div>
                <Loader type="hourglass" bgColor={color} size={100} />
            </div>
        </>
    );
};

export default AppLoader;
