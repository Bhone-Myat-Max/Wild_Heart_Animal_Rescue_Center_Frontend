"use client";

import SettingForm from "@/templates/User/SettingForm";
export default function SettingPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">⚙️ Profile Settings</h1>

      <SettingForm />
    </div>
  );
}