"use client";

import { useState } from "react";
import { User, Mail, Phone } from "lucide-react";

interface EditableInfoCardProps {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  isEditing: boolean;
  onChange: (value: string) => void;
}

export default function EditableInfoCard({
  label,
  value,
  icon: Icon,
  isEditing,
  onChange,
}: EditableInfoCardProps) {
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
    onChange(e.target.value);
  };

  if (!isEditing && !value) return null;
  
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex items-center gap-2 mb-2">
        {Icon && <Icon className="w-4 h-4 text-gray-600" />}
        <label className="text-sm font-medium text-gray-700">{label}</label>
      </div>
      {isEditing ? (
        <input
          type="text"
          value={localValue}
          onChange={handleChange}
          className="w-full p-2 bg-white text-gray-900 rounded text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={`Enter ${label.toLowerCase()}...`}
        />
      ) : (
        <div className="text-gray-900 font-medium">{value}</div>
      )}
    </div>
  );
}

export function getBasicInfoIcon(label: string): React.ComponentType<{ className?: string }> {
  switch (label.toLowerCase()) {
    case 'email':
      return Mail;
    case 'phone':
      return Phone;
    default:
      return User;
  }
}