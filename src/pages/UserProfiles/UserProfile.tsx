import { useState, useEffect, ChangeEvent, FormEvent, useRef } from "react";
import PageMeta from "../../components/common/PageMeta";
import { useUser } from "../../context/UserContext";
import { EnvelopeIcon, LockIcon, UserIcon, PencilIcon, CheckCircleIcon } from "../../icons";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal";
import { useModal } from "../../hooks/useModal";

export default function UserProfile() {
    const { user, updateUser } = useUser();
    const { isOpen, openModal, closeModal } = useModal();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        phone: user.phone || "+1 (555) 123-4567",
    });
    const [isSaving, setIsSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [tfaEnabled, setTfaEnabled] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [isPasswordSaving, setIsPasswordSaving] = useState(false);

    const completionRate = Object.values(formData).filter(v => v !== "").length * 33.3;

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => setSuccessMessage(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                updateUser({ image: base64String });
                setSuccessMessage("Profile photo updated!");
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditPhotoClick = () => {
        fileInputRef.current?.click();
    };

    const handleUpdate = (e: FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        // Simulating API call
        setTimeout(() => {
            updateUser(formData);
            setIsSaving(false);
            setSuccessMessage("Profile updated successfully!");
        }, 800);
    };

    const handlePasswordChange = (e: FormEvent) => {
        e.preventDefault();
        setIsPasswordSaving(true);

        // Simulate password change
        setTimeout(() => {
            updateUser({ lastPasswordChange: "Just now" });
            setIsPasswordSaving(false);
            closeModal();
            setSuccessMessage("Password updated successfully!");
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        }, 1200);
    };

    return (
        <>
            <PageMeta
                title="Admin Profile | Football Admin Dashboard"
                description="Manage your account settings and security preferences."
            />
            <div className="p-4 mx-auto max-w-screen-2xl lg:p-10">
                <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">Admin Profile</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your account settings and security preferences</p>
                    </div>
                    {successMessage && (
                        <div className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-600 bg-green-50 border border-green-100 rounded-xl dark:bg-green-500/10 dark:border-green-500/20 animate-in fade-in slide-in-from-top-2">
                            <CheckCircleIcon className="w-5 h-5" />
                            {successMessage}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* Left Column */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="p-8 bg-white border border-gray-200 rounded-3xl dark:bg-gray-900 dark:border-gray-800">
                            <div className="flex flex-col items-center">
                                <div className="relative mb-6 group">
                                    <div className="w-32 h-32 overflow-hidden border-4 border-gray-100 rounded-full dark:border-gray-800">
                                        <img
                                            src={user.image}
                                            alt="Profile"
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <button
                                        onClick={handleEditPhotoClick}
                                        className="absolute bottom-0 right-0 flex items-center justify-center p-2.5 bg-white border border-gray-200 rounded-full shadow-lg dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                                    >
                                        <PencilIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                    </button>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                </div>

                                <h2 className="text-xl font-bold text-gray-800 dark:text-white/90">{user.name}</h2>
                                <div className="mt-3 px-4 py-1.5 text-[10px] font-bold text-white bg-orange-600 rounded-full uppercase tracking-widest">
                                    {user.role}
                                </div>

                                <div className="w-full mt-10">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-semibold text-gray-500">Profile Completion</span>
                                        <span className="text-xs font-bold text-brand-500">{Math.round(completionRate)}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full dark:bg-gray-800">
                                        <div
                                            className="h-full transition-all duration-500 rounded-full bg-brand-500"
                                            style={{ width: `${completionRate}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="w-full mt-10 p-5 bg-gray-50 rounded-2xl dark:bg-white/[0.03]">
                                    <span className="block text-[10px] font-bold text-gray-400 uppercase mb-4 tracking-[0.2em]">Contact Details</span>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="flex items-center justify-center w-10 h-10 bg-white rounded-xl border border-gray-200 shadow-sm dark:bg-gray-900 dark:border-gray-800">
                                            <EnvelopeIcon className="w-4 h-4 text-gray-500" />
                                        </div>
                                        <div>
                                            <span className="block text-xs font-semibold text-gray-800 dark:text-white/90">{user.email}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center justify-center w-10 h-10 bg-white rounded-xl border border-gray-200 shadow-sm dark:bg-gray-900 dark:border-gray-800">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18.36 15.33l-1.35-1.35a1 1 0 00-1.41 0l-.63.63a1 1 0 01-1.28.1 12.04 12.04 0 01-4.76-4.76 1 1 0 01.1-1.28l.63-.63a1 1 0 000-1.41L8.3 5.28a1 1 0 00-1.41 0l-1.63 1.63A4 4 0 004 9.75c0 7 5.75 12.75 12.75 12.75a4 4 0 002.84-1.26l1.63-1.63a1 1 0 000-1.41l-2.86-2.87z" fill="gray" />
                                            </svg>
                                        </div>
                                        <div>
                                            <span className="block text-xs font-semibold text-gray-800 dark:text-white/90">{user.phone}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Suggested: Account Health */}
                        <div className="p-6 bg-white border border-gray-200 rounded-3xl dark:bg-gray-900 dark:border-gray-800">
                            <h3 className="mb-4 text-sm font-bold text-gray-800 dark:text-white/90">Account Security</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">2FA Status</p>
                                        <p className="text-[10px] text-gray-500">Extra layer of protection</p>
                                    </div>
                                    <button
                                        onClick={() => setTfaEnabled(!tfaEnabled)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${tfaEnabled ? 'bg-brand-500' : 'bg-gray-200 dark:bg-gray-800'}`}
                                    >
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${tfaEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Personal Information */}
                        <div className="p-8 bg-white border border-gray-200 rounded-3xl dark:bg-gray-900 dark:border-gray-800">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="flex items-center justify-center w-11 h-11 bg-gray-100 rounded-xl dark:bg-white/[0.05]">
                                    <UserIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 dark:text-white/90">Personal Information</h3>
                                    <p className="text-xs text-gray-500">Update your profile details</p>
                                </div>
                            </div>

                            <form onSubmit={handleUpdate} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Name</Label>
                                        <div className="relative group">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-brand-500">
                                                <UserIcon className="w-5 h-5" />
                                            </span>
                                            <Input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="pl-12 h-12 bg-gray-50 border-transparent focus:bg-white focus:border-brand-500 dark:bg-white/[0.03]"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</Label>
                                        <div className="relative group">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-brand-500">
                                                <EnvelopeIcon className="w-5 h-5" />
                                            </span>
                                            <Input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="pl-12 h-12 bg-gray-50 border-transparent focus:bg-white focus:border-brand-500 dark:bg-white/[0.03]"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone Number</Label>
                                        <div className="relative group">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-brand-500">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M18.36 15.33l-1.35-1.35a1 1 0 00-1.41 0l-.63.63a1 1 0 01-1.28.1 12.04 12.04 0 01-4.76-4.76 1 1 0 01.1-1.28l.63-.63a1 1 0 000-1.41L8.3 5.28a1 1 0 00-1.41 0l-1.63 1.63A4 4 0 004 9.75c0 7 5.75 12.75 12.75 12.75a4 4 0 002.84-1.26l1.63-1.63a1 1 0 000-1.41l-2.86-2.87z" fill="currentColor" />
                                                </svg>
                                            </span>
                                            <Input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="pl-12 h-12 bg-gray-50 border-transparent focus:bg-white focus:border-brand-500 dark:bg-white/[0.03]"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end mt-4">
                                    <Button
                                        type="submit"
                                        disabled={isSaving}
                                        className="bg-gray-900 hover:bg-gray-800 text-white px-10 rounded-2xl font-bold h-12 transition-all shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-70"
                                    >
                                        {isSaving ? "Saving..." : "Update Profile"}
                                    </Button>
                                </div>
                            </form>
                        </div>

                        {/* Enhancement: Activity & Security */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-8 bg-white border border-gray-200 rounded-3xl dark:bg-gray-900 dark:border-gray-800">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex items-center justify-center w-11 h-11 bg-gray-100 rounded-xl dark:bg-white/[0.05]">
                                        <LockIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800 dark:text-white/90">Security</h3>
                                </div>
                                <ul className="space-y-4">
                                    <li className="flex items-center justify-between text-xs font-medium text-gray-500 border-b border-gray-50 pb-3 dark:border-gray-800/50">
                                        <span>Last password change</span>
                                        <span className="text-gray-800 dark:text-white/70">{user.lastPasswordChange}</span>
                                    </li>
                                    <li className="flex items-center justify-between text-xs font-medium text-gray-500">
                                        <span>Active sessions</span>
                                        <span className="px-2 py-0.5 bg-brand-50 text-brand-600 rounded-md dark:bg-brand-500/10">{user.activeSessions} Active</span>
                                    </li>
                                </ul>
                                <button
                                    onClick={openModal}
                                    className="w-full mt-6 py-3.5 text-sm font-bold text-gray-900 bg-white border-2 border-gray-900 rounded-2xl hover:bg-gray-50 dark:bg-transparent dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/[0.03] transition-all active:scale-[0.98]"
                                >
                                    Manage Password
                                </button>
                            </div>

                            <div className="p-8 bg-white border border-gray-200 rounded-3xl dark:bg-gray-900 dark:border-gray-800">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white/90 mb-6">Recent Activity</h3>
                                <div className="space-y-6">
                                    {[
                                        { action: "Profile Updated", time: "Just now", icon: <CheckCircleIcon className="w-4 h-4 text-green-500" /> },
                                        { action: "Logged in on Chrome", time: "2 hours ago", icon: <UserIcon className="w-4 h-4 text-brand-500" /> }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-lg dark:bg-white/[0.03]">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-800 dark:text-white/90">{item.action}</p>
                                                <p className="text-[10px] text-gray-500">{item.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Change Password Modal */}
            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[480px]">
                <div className="p-8">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="flex items-center justify-center w-11 h-11 bg-gray-100 rounded-xl dark:bg-white/[0.05]">
                            <LockIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white/90">Update Password</h3>
                            <p className="text-xs text-gray-500">Secure your account with a new password</p>
                        </div>
                    </div>

                    <form onSubmit={handlePasswordChange} className="space-y-6">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Current Password</Label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={passwordData.currentPassword}
                                onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                                className="h-12 bg-gray-50 border-transparent focus:bg-white focus:border-brand-500 dark:bg-white/[0.03]"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">New Password</Label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                                className="h-12 bg-gray-50 border-transparent focus:bg-white focus:border-brand-500 dark:bg-white/[0.03]"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Confirm New Password</Label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={passwordData.confirmPassword}
                                onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                className="h-12 bg-gray-50 border-transparent focus:bg-white focus:border-brand-500 dark:bg-white/[0.03]"
                                required
                            />
                        </div>

                        <div className="flex gap-3 mt-8">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={closeModal}
                                className="flex-1 rounded-2xl h-12 font-bold"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isPasswordSaving}
                                className="flex-1 bg-gray-900 hover:bg-gray-800 text-white rounded-2xl font-bold h-12 transition-all shadow-lg"
                            >
                                {isPasswordSaving ? "Updating..." : "Update Password"}
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}
