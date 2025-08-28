import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"


const PropertyFilter = ({ search, setSearch }: { search: string, setSearch: (value: string) => void }) => {
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
                    </SelectGroup>
                </SelectContent>
            </Select>
            {/* search */}
            <Input className='border-0 shadow-none text-sm' placeholder='Type name or address ...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className='py-2 pr-2.5'><Search size={18} className='text-primary-foreground' /></div>
        </div>
    )
}

export default PropertyFilter