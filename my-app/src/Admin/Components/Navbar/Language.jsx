import React, { useState } from "react";
import {
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import {
    ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Flag from "react-world-flags";

export function LanguageSelector() {
    const [openMenu, setOpenMenu] = React.useState(false);
    const [lang, setLang] = React.useState("US");

    const countries = [
        {
            code: "US", // Use the country code here (ISO-3166-1 alpha-2)
            name: "English",
        },
        {
            code: "IN", // India
            name: "Hindi",
        },
    ];

    return (
        <>
            <Menu open={openMenu} handler={setOpenMenu}>
                <MenuHandler>
                    <Button
                        size="sm"
                        className="hidden shadow-none items-center gap-2 lg:flex bg-transparent text-secondary font-custom capitalize
                        font-normal text-base outline-none hover:shadow-none focus:outline-none"
                    >
                        <Flag code={lang} className="w-6 h-4" /> {/* Display the selected flag icon */}
                        {countries.find(({ code }) => code === lang)?.name}
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`h-3.5 w-3.5 transition-transform ${openMenu ? "rotate-180" : ""}`}
                        />
                    </Button>
                </MenuHandler>
                <MenuList className="hidden max-h-72 w-20 lg:block shadow-none">
                    {countries.map(({ code, name }) => (
                        <MenuItem
                            key={name}
                            className="flex items-center gap-2 font-custom text-base"
                            onClick={() => setLang(code)} // Set flag code on selection
                        >
                            <Flag code={code} className="w-6 h-4" /> {/* Display the flag icon */}
                            {name}
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </>
    );
}
