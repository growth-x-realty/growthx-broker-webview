import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
    return (
        <nav className='bg-primary/30 flex justify-between p-3'>
            <p ><span className='font-semibold'>Growthx</span> | Broker</p>
            <Drawer direction='top'>
                <DrawerTrigger asChild>
                    <Menu />
                </DrawerTrigger>
                <DrawerContent>
                    <div className='bg-primary/30 flex justify-between p-3'>
                        <p ><span className='font-semibold'>Growthx</span> | Broker</p>
                        <DrawerClose asChild>
                            <X />
                        </DrawerClose>
                    </div>
                    <div className='bg-primary/30 py-7 flex flex-col items-center gap-2 text-lg'>
                        <a>Home</a>
                        <a>About</a>
                        <a>Contact us</a>
                        <a>Logout</a>
                    </div>
                </DrawerContent>
            </Drawer>
        </nav>
    )
}

export default Navbar