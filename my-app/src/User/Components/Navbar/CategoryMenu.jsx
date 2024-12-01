import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
    Typography,
} from "@material-tailwind/react";


export function CategoryMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    return (
        <Menu size='lg'>
            <MenuHandler>
                <Typography className="p-1 font-medium font-custom flex items-center gap-1 text-sm">Categories
                <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
                </Typography>
            </MenuHandler>
            <MenuList className='flex justify-between gap-5 max-h-72'>
                <div className='outline-none'>
                    <MenuItem>Kurti</MenuItem>
                    <MenuItem>Bottom</MenuItem>
                    <MenuItem>Kurti Set</MenuItem>
                    <MenuItem>Maternity wear</MenuItem>
                </div>
                <div className='outline-none'>
                    <MenuItem>Night wear</MenuItem>
                    <MenuItem>Running Material</MenuItem>
                    <MenuItem>Churidar Material</MenuItem>
                    <MenuItem>Offer Zone</MenuItem>
                </div>
            </MenuList>
        </Menu>
    );
}