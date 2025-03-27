import {useRouter} from "next/navigation";
import {FaHeart} from "react-icons/fa";
import {GoClock} from "react-icons/go";
import {HiOutlineFire} from "react-icons/hi2";
import TimeDifferenceComponent from "@/components/home/TimeDifferenceComponent";

type Props = {
    uuid: string;
    single_image: string;
    name: string;
    discounted_price: number;
    price: number;
    category_name: string;
    created_at: string;
}


export default function CardProductByRowComponent({
                                                      uuid,
                                                      single_image,
                                                      name,
                                                      discounted_price,
                                                      price,
                                                      category_name,
                                                      created_at
                                                  }: Props) {
    const router = useRouter();
    const env = process.env.NEXT_PUBLIC_O2_API_URL;

    return (
        <div
            key={uuid}
            onClick={() => router.push(`/product/${uuid}`)}
            className="relative min-w-[290px] h-[240px] rounded-xl bg-white p-3 cursor-pointer hover:shadow-sm hover:transform hover:-translate-y-1 transition-transform duration-200"
        >
            <div
                className="rounded-xl w-full h-[60%] flex items-center justify-center bg-cover bg-center"
                style={{
                    backgroundImage: `url(${env}${single_image})`
                }}
            />
            <div
                className="absolute top-5 right-5 bg-white flex justify-center items-center rounded-[6px] w-7 h-7"
            >
                <FaHeart className="w-5 h-5 text-primary-light"/>
            </div>
            <div className="flex flex-col gap-1 justify-start">
                <p className="text-base font-light mt-2">{name}</p>
                <div className="flex justify-start items-center gap-1">
                    <p className="font-light text-gray-500 text-sm">
                        ${discounted_price || price}
                    </p>
                    <span className="w-1 h-1 rounded-full bg-accent"></span>
                    <p className="font-light text-gray-500 text-sm">{category_name}</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex justify-start items-center gap-1">
                        <GoClock className="text-gray-500 w-[14px] h-[14px]"/>
                        <p className="font-light text-gray-500 text-sm">
                            <TimeDifferenceComponent createdAt={created_at}/>
                        </p>
                    </div>
                    <span className="w-1 h-1 rounded-full bg-primary"></span>
                    <div className="flex justify-start items-center gap-1">
                        <HiOutlineFire className="text-gray-500 w-[14px] h-[14px]"/>
                        <p className="font-light text-gray-500 text-sm">បានលក់</p>
                    </div>
                </div>
            </div>
        </div>
    );
}