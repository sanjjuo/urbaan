import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Typography,
} from "@material-tailwind/react";
import { HiMiniUserCircle } from "react-icons/hi2";
import { IoMdSettings } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function UserProfile() {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem('userId')
        navigate("/login-user")
        toast.success("Logout successfully")
    }

    return (
        <Menu>
            <MenuHandler>
                <Avatar
                    variant="circular"
                    alt="tania andrew"
                    className="cursor-pointer w-8 h-8"
                    src="/userProfile.jpg"
                />
            </MenuHandler>
            <MenuList>
                <Link to='/user-profile' className='outline-none'>
                    <MenuItem className="flex items-center gap-2 text-xl hover:!text-primary">
                        <HiMiniUserCircle />
                        <Typography variant="small" className="font-medium font-custom">
                            My Profile
                        </Typography>
                    </MenuItem>
                </Link>
                <hr className="my-2 border-blue-gray-50" />
                <Link to='/login-user' className='outline-none'>
                    <MenuItem onClick={handleLogout} className="flex items-center gap-2 text-xl hover:!text-primary">
                        <FaSignOutAlt />
                        <Typography variant="small" className="font-medium font-custom">
                            Sign Out
                        </Typography>
                    </MenuItem>
                </Link>
            </MenuList>
        </Menu>
    );
}