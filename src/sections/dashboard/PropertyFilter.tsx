import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"


const PropertyFilter = () => {
    return (
        <div className='flex border shadow-xs rounded-md my-2'>
            {/* area select */}
            <Select>
                <SelectTrigger className="text-sm w-[6rem] border-0 border-r-2 rounded-none shadow-none">
                    <SelectValue placeholder="Zone" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>zones</SelectLabel>
                        <SelectItem value="all">All Zone</SelectItem>
                        <SelectItem value="zone_1">zone_1</SelectItem>
                        <SelectItem value="zone_2">zone_2</SelectItem>
                        <SelectItem value="zone_3">zone_3</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            {/* search */}
            <Input className='border-0 shadow-none text-sm' placeholder='Search Property' />
            <div className='py-2 pr-2.5'><Search size={18} className='text-primary-foreground' /></div>
        </div>
    )
}

export default PropertyFilter