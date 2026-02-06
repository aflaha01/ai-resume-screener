"use client";

import { useState } from "react";
import { CheckCircle, X, Code, Award, GraduationCap, Building, BookOpen } from "lucide-react";

interface EditableSectionProps {
  title: string;
  items?: string[];
  icon: React.ComponentType<{ className?: string }>;
  isEditing: boolean;
  onItemsChange: (items: string[]) => void;
}

export default function EditableSection({
  title,
  items = [],
  icon: Icon,
  isEditing,
  onItemsChange,
}: EditableSectionProps) {
  const [localItems, setLocalItems] = useState(items);
  const [newItem, setNewItem] = useState("");

  const handleAddItem = () => {
    if (newItem.trim()) {
      const updatedItems = [...localItems, newItem.trim()];
      setLocalItems(updatedItems);
      onItemsChange(updatedItems);
      setNewItem("");
    }
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = localItems.filter((_, i) => i !== index);
    setLocalItems(updatedItems);
    onItemsChange(updatedItems);
  };

  const handleUpdateItem = (index: number, value: string) => {
    const updatedItems = [...localItems];
    updatedItems[index] = value;
    setLocalItems(updatedItems);
    onItemsChange(updatedItems);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index?: number) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (index !== undefined) {
        const nextInput = document.getElementById(`${title}-item-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        } else {
          handleAddItem();
        }
      } else {
        handleAddItem();
      }
    }
  };

  if (!isEditing && (!localItems || localItems.length === 0)) return null;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-5 h-5 text-gray-700" />}
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        </div>
      </div>
      
      {title === "Skills" ? (
        <div className="flex flex-wrap gap-2">
          {localItems.map((item, index) => (
            <div key={index} className="relative group">
              {isEditing ? (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleUpdateItem(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    id={`${title}-item-${index}`}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[100px]"
                  />
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200">
                  {item}
                </span>
              )}
            </div>
          ))}
          {isEditing && (
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add new..."
                className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-full text-sm font-medium border border-dashed border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[100px]"
              />
              <button
                onClick={handleAddItem}
                className="text-gray-400 hover:text-green-500 transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {localItems.map((item, index) => (
            <div key={index} className="flex items-start gap-3 group">
              {isEditing ? (
                <>
                  <div className="flex items-center gap-2 flex-1">
                    <textarea
                      value={item}
                      onChange={(e) => handleUpdateItem(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      id={`${title}-item-${index}`}
                      rows={2}
                      className="flex-1 p-2 bg-gray-50 text-gray-700 rounded-lg text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                    <button
                      onClick={() => handleRemoveItem(index)}
                      className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 leading-relaxed">{item}</p>
                </>
              )}
            </div>
          ))}
          {isEditing && (
            <div className="flex items-start gap-3">
              <textarea
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add new item..."
                rows={2}
                className="flex-1 p-2 bg-gray-50 text-gray-700 rounded-lg text-sm border border-dashed border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <button
                onClick={handleAddItem}
                className="text-gray-400 hover:text-green-500 transition-colors flex-shrink-0 mt-2"
              >
                <CheckCircle className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function getIconComponent(iconName: string): React.ComponentType<{ className?: string }> {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Code,
    Award,
    GraduationCap,
    Building,
    BookOpen,
    CheckCircle,
    X,
  };
  
  return iconMap[iconName] || Code; 
}