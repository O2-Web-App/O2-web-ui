import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";
import * as React from "react";
import {Share2, Copy} from "lucide-react";
import {
    FacebookShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TelegramIcon,
    WhatsappIcon, TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon,
} from "next-share";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {toast} from "sonner";

type Props = {
    linkMetadata: string;
};

export default function ShareBlogComponent({linkMetadata}: Props) {


    const handleCopyLink = () => {
        navigator.clipboard.writeText(linkMetadata).then(() => {
            toast.success("Copied", {
                style: {
                    color: "white",
                    background: "#22bb33",
                    border: '1px solid #22bb33',
                    textAlign: "center",
                    width: 'auto',
                },
                icon: null, // Remove the icon
            });
        }).catch(() => {
            toast.error("Failed to copy the link.", {
                style: {
                    color: "white",
                    background: "#e0391f",
                    border: '1px solid #e0391f',
                    textAlign: "center", // Center-align the text
                },
                icon: null, // Remove the icon
            });
        });
    };

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button
                    className="text-gray-600 bg-background_color shadow-none p-0 m-0 h-auto w-auto"
                    aria-label="Open share options"
                >
                    <Share2 className="w-5 h-5"/>
                </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-white flex flex-col items-start rounded-t-[45px] p-4">
                <DrawerHeader className="w-full text-start p-0">
                    <DrawerTitle className="text-xl uppercase font-semibold">Share</DrawerTitle>
                </DrawerHeader>
                <div className="w-full h-[100px] flex space-x-6 mt-4 overflow-auto overflow-y-hidden scrollbar-hide">
                    <div className="flex flex-col items-center gap-2">
                        <FacebookShareButton url={linkMetadata} aria-label="Share on Facebook">
                            <FacebookIcon size={50} round/>
                        </FacebookShareButton>
                        <p className="text-sm">Facebook</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <TelegramShareButton url={linkMetadata} aria-label="Share on Telegram">
                            <TelegramIcon size={50} round/>
                        </TelegramShareButton>
                        <p className="text-sm">Telegram</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <WhatsappShareButton url={linkMetadata} separator=":: " aria-label="Share on WhatsApp">
                            <WhatsappIcon size={50} round/>
                        </WhatsappShareButton>
                        <p className="text-sm">WhatsApp</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <TwitterShareButton url={linkMetadata} aria-label="Twitter">
                            <TwitterIcon size={50} round/>
                        </TwitterShareButton>
                        <p className="text-sm">Twitter</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <LinkedinShareButton url={linkMetadata} aria-label="LinkedIn">
                            <LinkedinIcon size={50} round/>
                        </LinkedinShareButton>
                        <p className="text-sm">LinkedIn</p>
                    </div>
                </div>
                <hr className="w-full h-[2px] bg-gray-200 my-2"/>
                <Label className={`text-lg uppercase mt-5`}>link here</Label>
                <div className=" w-full flex items-center justify-center gap-4 mt-2 h-auto mb-5">
                    <Input
                        className={`w-full h-full rounded-[6px] p-3`}
                        value={linkMetadata}

                    >
                    </Input>
                    <div
                        onClick={handleCopyLink}
                        className=" w-auto h-auto flex items-center gap-2 text-gray-600 bg-background_color shadow-md p-4 rounded-full  "
                        aria-label="Copy link"
                    >
                        <Copy className="w-5 h-5 "/>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}