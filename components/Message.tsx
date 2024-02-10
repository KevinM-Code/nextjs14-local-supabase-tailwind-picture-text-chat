import { Imessage, useMessage } from "@/lib/store/messages";
import React, { Fragment } from "react";
import Image from "next/image";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export default function Message({ message, currentUser}: { message: Imessage, currentUser: any}) {

	return (
		<Fragment>
			{currentUser !== message.user_id ? (
				<div className="chat chat-start">
					<div className="chat-image avatar">
						<div className="mr-5">
							<MessageMenu message={message} />
						</div>
						<div className="w-10 rounded-full">
							<img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
						</div>
					</div>
					<div className="chat-header">
						<div className="font-bold">
							{message.send_by}
						</div>
						<div>
							{new Date(message.created_at).toDateString()}
						</div>
					</div>
					<div className="chat-bubble">
						{message.text ? message.text : ""}
						{message.img_path ? (
							<Image
								src={"http://localhost:8000/storage/v1/object/public/" + message.img_path}
								width={100}
								height={100}
								alt="Upload"
								className="rounded"
							/>
						) : ""}
					</div>
				</div>
			) : (
				<div className="chat chat-end">
					<div className="chat-image avatar">
						<div className="w-10 rounded-full">
							<img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
						</div>
						<div className="ml-5">
							<MessageMenu message={message} />
						</div>
					</div>
					<div className="chat-header">
						<div className="font-bold">
							{message.send_by}
						</div>
						<div>
							{new Date(message.created_at).toDateString()}
						</div>
					</div>
					<div className="chat-bubble">
						{message.text ? message.text : ""}
						{message.img_path ? (
							<Image
								src={"http://localhost:8000/storage/v1/object/public/" + message.img_path}
								width={100}
								height={100}
								alt="Upload"
								className="rounded"
							/>
						) : ""}
					</div>
				</div>
			)}
		</Fragment>
	);
}

const MessageMenu = ({ message }: { message: Imessage }) => {
	const setActionMessage = useMessage((state) => state.setActionMessage);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<MoreHorizontal />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Action</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => {
						document.getElementById("trigger-edit")?.click();
						setActionMessage(message);
					}}
				>
					Edit
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						document.getElementById("trigger-delete")?.click();
						setActionMessage(message);
					}}
				>
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
