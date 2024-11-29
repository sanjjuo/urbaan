import { Button, ButtonGroup } from '@material-tailwind/react'
import React, { useContext } from 'react'
import { UserSuspendModal } from './UserSuspendModal'
import { UserReactivateModal } from './UserReactivateModal'
import { DeleteModal } from '../../DeleteModal/DeleteModal'
import { AppContext } from "../../../../StoreContext/StoreContext"

const UserLargeImage = () => {
    const { open, handleOpen } = useContext(AppContext)
    return (
        <>
            <div className='flex flex-col justify-center items-center gap-3'>
                <div className='w-56 h-56'>
                    <img src="/profile.jpg" alt="" className='w-full h-full object-cover rounded-2xl' />
                </div>
                <ButtonGroup className='flex gap-2'>
                    <Button onClick={() => handleOpen("suspendModal")} className='rounded-lg font-custom text-sm font-normal capitalize tracking-wider bg-processingBg border-none'>
                        Suspend</Button>
                    <Button onClick={() => handleOpen("reactivateModal")} className='rounded-lg font-custom text-sm font-normal capitalize tracking-wider bg-shippedBg border-none'>
                        Reactivate</Button>
                    <Button onClick={() => handleOpen("deleteProfileModal")} className='rounded-lg font-custom text-sm font-normal capitalize tracking-wider bg-deleteBg border-none'>
                        Delete</Button>
                </ButtonGroup>
            </div>

            <UserSuspendModal open={open === "suspendModal"} handleOpen={handleOpen} />
            <UserReactivateModal open={open === "reactivateModal"} handleOpen={handleOpen} />
            <DeleteModal
                open={open === "deleteProfileModal"}
                handleOpen={handleOpen}
                title="Delete this profile?"
                description="This action is permanent and cannot be undone."
            />
        </>
    )
}

export default UserLargeImage