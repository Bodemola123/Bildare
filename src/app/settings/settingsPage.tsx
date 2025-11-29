"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { FaPlus, FaUser } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dim0l22lo/image/upload";
const UPLOAD_PRESET = "avatar_upload";
const MAX_FILE_SIZE_BYTES = 1 * 1024 * 1024; // 1 MB

const categories = [
  "Blockchain",
  "Web3",
  "Artificial Intelligence",
  "E commerce",
  "SAAS",
  "Dashboards",
  "Meme",
  "Bots",
  "Landing Page",
  "Lifestyle",
  "Social Media",
  "Travel",
];

interface FilterButtonProps {
  label: string;
  active: boolean;
  disabled: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, active, disabled, onClick }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`flex items-center gap-2 px-[10px] py-[6px] text-sm font-medium rounded-2xl border transition-colors duration-200 
      ${active
        ? "bg-[#B9F50033] border-[#292A251A] text-[#B9F500]"
        : `bg-[#1C1D19] border-[#292A251A] text-white ${
            disabled ? "opacity-50 cursor-not-allowed" : "hover:border-[#292A251A] hover:bg-[#B9F50033] hover:text-[#B9F500]"
          }`}`}
  >
    {label}
    <FaPlus
      size={11}
      className={`transform transition-transform duration-200 ${active ? "rotate-45 scale-110" : !disabled ? "group-hover:rotate-45 group-hover:scale-110" : ""}`}
    />
  </button>
);

const SettingsPage = () => {
  const { username, interests, profile, referralCode, referralCount, userId, clearAuth, fetchSession } = useAuth();

  const [selectedInterests, setSelectedInterests] = useState<string[]>(interests || []);
  const [usernameValue, setUsernameValue] = useState(username || "");
  const [editing, setEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(profile?.avatar_url || "/default-avatar.png");
  const [loading, setLoading] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setUsernameValue(username || "");
    setSelectedInterests(interests || []);
    setAvatarPreview(profile?.avatar_url || "/default-avatar.png");
  }, [username, interests, profile]);

  const toggleInterest = (category: string) => {
    if (!editing) return;
    setSelectedInterests(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast.error("File size must be less than 1MB.");
      return;
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const uploadAvatar = async (): Promise<string | null> => {
    if (!avatarFile) return null;

    const formData = new FormData();
    formData.append("file", avatarFile);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(CLOUDINARY_UPLOAD_URL, { method: "POST", body: formData });
    const data = await res.json();
    return data.secure_url || null;
  };

  const handleUpdateProfile = async () => {
    if (!editing) return;

    // Check if changes were made
    const isUsernameChanged = usernameValue !== username;
    const isInterestsChanged = JSON.stringify(selectedInterests) !== JSON.stringify(interests);
    const isAvatarChanged = !!avatarFile;

    if (!isUsernameChanged && !isInterestsChanged && !isAvatarChanged) {
      toast("No changes detected.");
      setEditing(false);
      return;
    }

    setLoading(true);

    try {
      const avatar_url = isAvatarChanged ? await uploadAvatar() : profile?.avatar_url;

      const res = await fetch("https://bildare-backend.onrender.com/user/update-user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username: usernameValue,
          interests: selectedInterests,
          avatar_url,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Profile updated.");
        await fetchSession(); // refresh session to reflect changes
        setEditing(false);
        setAvatarFile(null);
      } else {
        toast.error(data.error || "Failed to update profile.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!userId) return;

    setDeleting(true);
    try {
      const res = await fetch("https://bildare-backend.onrender.com/admin/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }),
      });

      if (res.ok) {
        toast.success("Account deleted.");
        await clearAuth();
      } else {
        const err = await res.json();
        toast.error(err.message || "Failed to delete account.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="bg-[#1F201C] mt-[300px] md:mt-0 w-full lg:max-w-[858px] mx-auto flex flex-col rounded-2xl gap-8 p-6 sm:p-8">
      <h1 className="text-white text-sm font-semibold">Settings</h1>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Sidebar */}
        <div className="flex items-center gap-4 py-2.5 w-[152px] text-[#B9F500]">
          <FaUser className="text-base" />
          <p className="text-sm font-medium">Account</p>
        </div>

        <div className="bg-[#757575] w-[1px] self-stretch"></div>

        {/* Main */}
        <div className="flex flex-col gap-6 max-w-[602px]">
          <h1 className="text-white font-semibold text-sm">Account</h1>

          {/* Avatar */}
          <div className="flex items-center gap-6">
            <img src={avatarPreview} alt="avatar" className="w-[60px] h-[60px] rounded-full object-cover" />
            {editing && (
              <label className="py-1.5 px-8 border border-[#292A251A] flex items-center gap-2 rounded-2xl bg-[#292A25] text-white cursor-pointer">
                <LuImagePlus className="text-base" />
                <span className="font-medium">Change Avatar</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </label>
            )}
          </div>

          {/* Username */}
          <div className="w-full space-y-1">
            <Label className="text-base font-normal text-white">User name</Label>
            {editing && <p className="text-yellow-400 text-sm">Username can only be changed every 30 days.</p>}
            <div className="relative">
              <FaUser className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#969696]" />
              <Input
                disabled={!editing}
                value={usernameValue}
                onChange={(e) => setUsernameValue(e.target.value)}
                className={`!h-[62px] w-full px-6 py-2 !bg-[#292A25] text-white placeholder:text-[#969696] border border-transparent !rounded-[16px] !focus:ring-0 transition-all duration-200
                  ${!editing ? "opacity-50 cursor-not-allowed" : ""}`}
              />
            </div>
          </div>

          {/* Interests */}
          <div className="w-full space-y-2">
            <Label className="text-base font-normal text-white">Interests</Label>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <FilterButton
                  key={category}
                  label={category}
                  active={selectedInterests.includes(category)}
                  disabled={!editing}
                  onClick={() => toggleInterest(category)}
                />
              ))}
            </div>
          </div>

          {/* Referral info */}
          <div className="w-full space-y-2">
            <Label className="text-base font-normal text-white">Referral code</Label>
            <p className="text-white bg-[#292A25] px-6 py-4 rounded-[16px] opacity-80">{referralCode}</p>
          </div>

          <div className="w-full space-y-2">
            <Label className="text-base font-normal text-white">Number of referrals</Label>
            <Input
              disabled
              value={referralCount}
              className="!h-[62px] w-full px-6 py-2 !bg-[#292A25] text-white opacity-70 border border-transparent !rounded-[16px]"
            />
          </div>

          {/* Buttons */}
          <div className="w-full flex justify-between mt-4">
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-6 py-3 rounded-xl bg-red-900 text-white font-semibold cursor-pointer"
            >
              Delete Account
            </button>


<button
  onClick={async () => {
    if (!editing) {
      setEditing(true); // enable edit mode
      return;
    }

    // Check if any changes were made before calling API
    const isUsernameChanged = usernameValue !== username;
    const isInterestsChanged = JSON.stringify(selectedInterests) !== JSON.stringify(interests);
    const isAvatarChanged = !!avatarFile;

    if (!isUsernameChanged && !isInterestsChanged && !isAvatarChanged) {
      toast("No changes detected."); // only show this
      return; // don't call API
    }

    await handleUpdateProfile(); // only call API if changes exist
  }}
  disabled={loading}
  className={`px-6 py-3 rounded-xl bg-[#B9F500] text-black font-semibold cursor-pointer ${
    loading ? "opacity-50 cursor-not-allowed" : ""
  }`}
>
  {editing ? (loading ? "Saving..." : "Save Profile") : "Update Profile"}
</button>


          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-[#1F201C] p-6 rounded-2xl w-[400px] flex flex-col gap-4">
            <h2 className="text-white font-semibold text-lg">Confirm Delete</h2>
            <p className="text-white text-base">
              Are you sure you want to delete your account? This action is irreversible.
            </p>

            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg border border-white text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleting}
                className={`px-4 py-2 rounded-lg bg-red-600 cursor-pointer text-white ${deleting ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {deleting ? "Deleting..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
