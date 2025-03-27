import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Button} from "@/components/ui/button";
import * as React from "react";
import {PiSlidersHorizontalBold} from "react-icons/pi";

// Define types
type CategoryOption = "AC" | "DH";

interface SubOption {
    value: string;
    label: string;
}

interface SubOptions {
    AC: SubOption[];
    DH: SubOption[];
}

export default function FilterComponent() {
    // State with type
    const [mainCategory, setMainCategory] = React.useState<CategoryOption | "">("");

    // Typed sub-options
    const subOptions: SubOptions = {
        "AC": [
            {value: "a", label: "Option A"},
            {value: "b", label: "Option B"},
            {value: "c", label: "Option C"}
        ],
        "DH": [
            {value: "d", label: "Option D"},
            {value: "e", label: "Option E"},
            {value: "f", label: "Option F"},
            {value: "g", label: "Option G"},
            {value: "h", label: "Option H"}
        ]
    };

    // Handle main select change with typed parameter
    const handleMainChange = (value: CategoryOption) => {
        setMainCategory(value);
    };

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <div
                    className={`cursor-pointer absolute top-[5px] right-[10px] bg-primary rounded-full p-2 flex justify-between items-center`}>
                    <PiSlidersHorizontalBold className={`text-white w-5 h-5`}/>
                </div>
            </DrawerTrigger>
            <DrawerContent className={`h-[500px] bg-white flex justify-start items-start`}>
                <div className="w-full flex flex-col items-start">
                    <DrawerHeader className={`w-full flex flex-col justify-start items-start`}>
                        <DrawerTitle className={` text-xl`}>កំណត់ការស្វែងរក!</DrawerTitle>

                        {/* Main Select */}
                        <DrawerDescription
                            className={`text-start font-light text-lg text-gray-600`}>
                            សេវាកម្ម
                        </DrawerDescription>
                        <Select
                            onValueChange={handleMainChange} value={mainCategory}>
                            <SelectTrigger className="w-full h-[50px] text-base">
                                <SelectValue placeholder="ជ្រើសរើសសេវាកម្ម"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem className={` text-base`} value="AC">AC</SelectItem>
                                    <SelectItem className={` text-base`} value="DH">DH</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        {/* Sub Select */}
                        <DrawerDescription
                            className={`text-start font-light text-lg text-gray-600 mt-4`}>
                            ប្រភេទ
                        </DrawerDescription>
                        <Select disabled={!mainCategory}>
                            <SelectTrigger className="w-full h-[50px] text-base">
                                <SelectValue placeholder="ជ្រើសរើសប្រភេទសេវាកម្ម"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {mainCategory && subOptions[mainCategory]?.map((option) => (
                                        <SelectItem className={` text-base `} key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </DrawerHeader>

                    <DrawerFooter className={`flex flex-row w-full justify-end`}>
                        <DrawerClose asChild>
                            <Button variant="outline">បោះបង់</Button>
                        </DrawerClose>
                        <Button className={`text-white`}>បញ្ជូនមតិកែលម្អ</Button>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}