import { request } from '@/apis/api'
import { Button } from '@/components/ui/button'
import { DialogTitle } from '@/components/ui/dialog'
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { apiParams, nav } from '@/constants'
import type { RequestLogout } from '@/types/request'
import type { ErrorResponse, ResponseLogout } from '@/types/response'
import { useMutation } from '@tanstack/react-query'
import { Menu, X } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router'
import { toast } from 'sonner'

const Navbar = () => {
    const navigate = useNavigate();
    const { isPending, mutate: requestLogout } = useMutation({
        mutationFn: request<RequestLogout, ResponseLogout>,
        onError: (error: ErrorResponse) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            window.localStorage.clear();
            navigate(nav.root);
        }
    })
    const mutationHandler = () => {
        requestLogout({ apiParam: apiParams.LOGOUT, body: {} })
    }
    return (
        <nav className='bg-primary/30 flex justify-between p-3'>
            <p ><span className='font-semibold'>Growthx</span> | Broker</p>
            <Drawer direction='top'>
                <DrawerTrigger asChild>
                    <Menu />
                </DrawerTrigger>
                <DrawerContent aria-describedby='navbar'>
                    <DialogTitle>
                        <div className='bg-primary/30 flex justify-between p-3'>
                            <p ><span className='font-semibold'>Growthx</span> | Broker</p>
                            <DrawerClose asChild>
                                <X />
                            </DrawerClose>
                        </div>
                    </DialogTitle>
                    <div className='bg-primary/30 py-7 flex flex-col items-center gap-2 text-lg'>
                        <NavLink to={nav.root}>Home</NavLink>
                        {/* <NavLink to={"#"}>About</NavLink> */}
                        <NavLink to={nav.contactus}>Contact us</NavLink>
                        <Button disabled={isPending} onClick={mutationHandler} variant={"ghost"} className='border-2 border-slate-500 text-slate-6001'>Logout</Button>
                    </div>
                </DrawerContent>
            </Drawer>
        </nav>
    )
}

export default Navbar