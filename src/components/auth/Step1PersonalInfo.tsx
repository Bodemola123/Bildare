"use client";

import React, { useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "../ui/select";
import { UserRound } from "lucide-react";
import { toast } from "sonner";
import { RiImageAddFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { GoX } from "react-icons/go";

interface Props {
  username: string;
  setUsername: (v: string) => void;
  role: string;
  setRole: (v: string) => void;
  avatarUrl: string | null;
  setAvatarUrl: (v: string | null) => void;
}

/**
 * Cloudinary configuration:
 * - Replace CLOUDINARY_UPLOAD_URL with your upload endpoint, e.g.
 *   https://api.cloudinary.com/v1_1/<your-cloud-name>/upload
 * - Replace UPLOAD_PRESET with your unsigned preset name (if using unsigned)
 */
const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dim0l22lo/image/upload";
const UPLOAD_PRESET = "avatar_upload";
const MAX_FILE_SIZE_BYTES = 1 * 1024 * 1024; // 1 MB

const Step1PersonalInfo: React.FC<Props> = ({
  username,
  setUsername,
  role,
  setRole,
  avatarUrl,
  setAvatarUrl,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

  const openPicker = () => fileInputRef.current?.click();

  const handleFile = async (file?: File) => {
    if (!file) return;
    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast(`File is too large. Max size is ${MAX_FILE_SIZE_BYTES / 1024 / 1024} MB`);
      return;
    }

    // Preview locally while uploading
    const previewUrl = URL.createObjectURL(file);
    setAvatarUrl(previewUrl);

    // Upload to Cloudinary
    try {
      setUploading(true);
      const fd = new FormData();
      fd.append("file", file);
      fd.append("upload_preset", UPLOAD_PRESET);

      const res = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: fd,
      });

      const json = await res.json();

      if (!res.ok) {
        console.error("Cloudinary upload failed", json);
        toast("Avatar upload failed. Try again.");
        return;
      }

      const cloudUrl = json.secure_url || json.url;
      if (!cloudUrl) {
        toast("Avatar upload failed: no URL returned");
        return;
      }

      // set final avatar url to cloud url
      setAvatarUrl(cloudUrl);
      toast("Avatar uploaded");
    } catch (err) {
      console.error("Upload error", err);
      toast("Avatar upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  const removeAvatar = () => {
    setAvatarUrl(null);
  };

  return (
    <div className="w-full flex flex-col gap-4 items-center px-16 mt-2">
<div className="flex flex-col items-center gap-3 relative">

  {/* REMOVE BUTTON AT TOP OF MAIN DIV */}
  {avatarUrl && (
    <button
      onClick={(e) => {
        e.stopPropagation();
        removeAvatar();
      }}
      className="absolute -top-6 right-0 bg-black/60 rounded-full p-1 text-white text-xs z-10"
      title="Remove avatar"
    >
      <GoX/>
    </button>
  )}

  <div
    onClick={openPicker}
    className="h-28 w-28 md:h-[124px] md:w-[124px] rounded-full bg-[#1C1D19] flex items-center justify-center cursor-pointer border-2 border-dashed border-[#3C3D39] overflow-hidden relative"
  >
    {avatarUrl ? (
      <img src={avatarUrl} alt="avatar preview" className="object-cover w-full h-full" />
    ) : (
      <RiImageAddFill className="text-white text-3xl" />
    )}
  </div>

  <input
    ref={fileInputRef}
    type="file"
    accept="image/*"
    className="hidden"
    onChange={handleFileChange}
  />

  <div className="text-xs text-[#BFBFBF]">
    Max file size: {MAX_FILE_SIZE_BYTES / 1024 / 1024} MB
  </div>
</div>


{/* Username */}
<div className="w-full space-y-2">
  <Label 
    htmlFor="username" 
    className="text-base font-normal text-[#969696]"
  >
    User name
  </Label>

  <div className="relative group">
    <FaUser 
      className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#969696] group-focus-within:text-[#ffffff] transition-colors duration-200" 
    />

    <Input
      id="username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      placeholder="JohnDoe"
      className="
        h-[56px] w-full px-6 py-2
        !bg-[#1D1E1A] text-white
        placeholder:text-[#969696]
        border border-transparent !rounded-[38px]
        focus:border-none 
        !focus:ring-0 
        transition-all duration-200
      "
    />
  </div>
</div>

{/* Role */}
<div className="w-full space-y-2">
  <Label 
    htmlFor="role" 
    className="text-base font-normal text-[#969696]"
  >
    Role
  </Label>

  <Select value={role} onValueChange={(v) => setRole(v)}>
    <SelectTrigger
      className="
        !h-[56px] w-full bg-[#1D1E1A] text-white !rounded-[38px] 
        border border-transparent 
        !focus:border-none 
        transition-all duration-200 !px-6 !py-2
      "
    >
        <div className="px-4 py-2">
            <SelectValue placeholder="Select a role" />
        </div>
      
    </SelectTrigger>

    <SelectContent
      className="bg-[#252621] text-white !px-6 !py-2 rounded-xl border border-[#333] shadow-lg"
    >
      <SelectGroup>
        <SelectLabel className="text-[#B9F500] text-sm px-2">
          Roles
        </SelectLabel>
        <SelectItem value="Creator" className="hover:bg-[#333428]">
          Creator
        </SelectItem>
        <SelectItem value="Developer" className="hover:bg-[#333428]">
          Developer
        </SelectItem>
        <SelectItem value="Designer" className="hover:bg-[#333428]">
          Designer
        </SelectItem>
        <SelectItem value="Product" className="hover:bg-[#333428]">
          Product
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</div>


    </div>
  );
};

export default Step1PersonalInfo;
