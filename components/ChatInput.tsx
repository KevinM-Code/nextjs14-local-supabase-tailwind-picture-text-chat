"use client";
import React, { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@/lib/store/user";
import { Imessage, useMessage } from "@/lib/store/messages";
import { BUCKET_NAME } from "@/lib/constant";

import { useForm } from "react-hook-form";

export default function ChatInput() {
  const user = useUser((state) => state.user);
  const addMessage = useMessage((state) => state.addMessage);
  const setOptimisticIds = useMessage((state) => state.setOptimisticIds);
  const supabase = supabaseBrowser();
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();  

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  let uploadedPath: any;

  const onSubmit = async (data: any) => {
    if (data.text.trim()) {
      const id = uuidv4();

      if (selectedFile) {
        const { data, error: imgError } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(selectedImage, selectedFile);

        if (data) {
          uploadedPath = data?.fullPath;
        }

        if (imgError) {
          toast.error("Upload Error " + imgError);
        }
      }

      const newMessage = {
        id,
        text: data.text,
        send_by: user?.email,
        is_edit: false,
        created_at: new Date().toISOString(),
        img_path: uploadedPath,
        user_id: user?.id,
      };

      addMessage(newMessage as Imessage);
      setOptimisticIds(newMessage.id);
      const { error } = await supabase.from("messages").insert({
        text: data.text,
        id,
        user_id: user?.id,
        send_by: user?.email,
        img_path: uploadedPath,
      });
      if (error) {
        toast.error(error.message);
      }
      reset()
    } else {
      toast.error("Message field can not be empty!!");
    }
  };  

  return (
    <div className="p-5">
      <div className="App">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <input
              type="file"
              {...register("file")}
              className="file-input file-input-bordered w-full text-black"
              onChange={({ target }) => {
                if (target.files) {
                  const file = target.files[0];
                  if (file) {
                    setSelectedImage(URL.createObjectURL(file));
                    setSelectedFile(file);
                  }
                }
              }}
            />
          </div>
          <div className="mb-5">
            <input
              type="text"
              placeholder="Type Message"
              {...register("text")}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(onSubmit);
                }
              }}
              className="input input-bordered w-full text-black"
            />
          </div>
          <input type="submit" className="btn btn-neutral" />
        </form>
      </div>
    </div>
  );
 
}
