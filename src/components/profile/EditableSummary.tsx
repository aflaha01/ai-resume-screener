// "use client";

// import { useState } from "react";
// import { FileText, CheckCircle, X, Sparkles } from "lucide-react";
// import { enhanceSummary } from "@/services/ai.service";

// interface EditableSummaryProps {
//   summary?: string[];
//   isEditing: boolean;
//   onSummaryChange: (summary: string[]) => void;
// }

// export default function EditableSummary({ 
//   summary = [], 
//   isEditing,
//   onSummaryChange 
// }: EditableSummaryProps) {
//   const [localSummary, setLocalSummary] = useState(summary);
//   const [enhancing, setEnhancing] = useState(false);

//   const handleUpdateParagraph = (index: number, value: string) => {
//     const updatedSummary = [...localSummary];
//     updatedSummary[index] = value;
//     setLocalSummary(updatedSummary);
//     onSummaryChange(updatedSummary);
//   };

//   const handleAddParagraph = () => {
//     const updatedSummary = [...localSummary, ""];
//     setLocalSummary(updatedSummary);
//     onSummaryChange(updatedSummary);
//   };

//   const handleRemoveParagraph = (index: number) => {
//     const updatedSummary = localSummary.filter((_, i) => i !== index);
//     setLocalSummary(updatedSummary);
//     onSummaryChange(updatedSummary);
//   };

//   const handleAiEnhance = async () => {
//     if (!localSummary.length) return;

//     try {
//       setEnhancing(true);

//       const improved = await enhanceSummary(localSummary);

//       setLocalSummary(improved);
//       onSummaryChange(improved);
//     } catch (err) {
//       alert("Failed to enhance summary with AI");
//     } finally {
//       setEnhancing(false);
//     }
//   };

//   if (!isEditing && (!summary || summary.length === 0)) return null;

//   return (
//     <div className="bg-white rounded-lg border border-gray-200 p-6">
//       {/* Header with AI Enhance */}
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-3">
//           <FileText className="w-5 h-5 text-gray-700" />
//           <h2 className="text-lg font-semibold text-gray-900">
//             Professional Summary
//           </h2>
//         </div>

//         {isEditing && localSummary.length > 0 && (
//           <button
//             type="button"
//             onClick={handleAiEnhance}
//             disabled={enhancing}
//             className="flex items-center gap-2 px-3 py-1.5 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
//           >
//             <Sparkles className="w-4 h-4" />
//             {enhancing ? "Enhancing..." : "AI Enhance"}
//           </button>
//         )}
//       </div>

//       <div className="space-y-4">
//         {localSummary.map((paragraph, index) => (
//           <div key={index} className="group">
//             {isEditing ? (
//               <div className="flex items-start gap-2">
//                 <textarea
//                   value={paragraph}
//                   onChange={(e) =>
//                     handleUpdateParagraph(index, e.target.value)
//                   }
//                   rows={3}
//                   className="flex-1 p-3 bg-gray-50 text-gray-700 rounded-lg text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
//                   placeholder="Enter summary paragraph..."
//                 />
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveParagraph(index)}
//                   className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 mt-2"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>
//             ) : (
//               <p className="text-gray-700 leading-relaxed">
//                 {paragraph}
//               </p>
//             )}
//           </div>
//         ))}

//         {isEditing && (
//           <button
//             type="button"
//             onClick={handleAddParagraph}
//             className="w-full p-3 border border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors text-sm flex items-center justify-center gap-2"
//           >
//             <CheckCircle className="w-4 h-4" />
//             Add another paragraph
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { FileText, Sparkles } from "lucide-react";
import { enhanceSummary, generateSummary } from "@/services/ai.service";

interface EditableSummaryProps {
  summary?: string[];
  isEditing: boolean;
  onSummaryChange: (summary: string[]) => void;

  //  Needed for AI Generate
  skills?: string[];
  experience?: string[];
  projects?: string[];
  education?: string[];
}

export default function EditableSummary({ 
  summary = [], 
  isEditing,
  onSummaryChange,
  skills = [],
  experience = [],
  projects = [],
  education = [],
}: EditableSummaryProps) {
  const initialText = summary?.join("\n\n") || "";
  const [text, setText] = useState(initialText);

  const [enhancing, setEnhancing] = useState(false);
  const [generating, setGenerating] = useState(false);


  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);

    const paragraphs = newText
      .split(/\n\s*\n/)
      .map(p => p.trim())
      .filter(p => p.length > 0);

    onSummaryChange(paragraphs);
  };

  //  AI Enhance existing summary
  const handleAiEnhance = async () => {
    if (!text.trim()) return;

    try {
      setEnhancing(true);

      const currentParagraphs = text
        .split(/\n\s*\n/)
        .map(p => p.trim())
        .filter(p => p.length > 0);

      const improved = await enhanceSummary(currentParagraphs);

      const improvedText = improved.join("\n\n");
      setText(improvedText);
      onSummaryChange(improved);
    } catch (err) {
      alert("Failed to enhance summary with AI");
    } finally {
      setEnhancing(false);
    }
  };

  // AI Generate summary when empty
  const handleAiGenerate = async () => {
    try {
      setGenerating(true);

      const generated = await generateSummary({
        skills,
        experience,
        projects,
        education,
      });

      const generatedText = generated.join("\n\n");
      setText(generatedText);
      onSummaryChange(generated);
    } catch (err) {
      alert("Failed to generate summary with AI");
    } finally {
      setGenerating(false);
    }
  };

  if (!isEditing && (!summary || summary.length === 0)) return null;

  const hasText = text.trim().length > 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Header with AI buttons */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-gray-700" />
          <h2 className="text-lg font-semibold text-gray-900">
            Professional Summary
          </h2>
        </div>

        {isEditing && (
          <div className="flex gap-2">
            {/* AI Generate — only when empty */}
            {!hasText && (
              <button
                type="button"
                onClick={handleAiGenerate}
                disabled={generating}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                {generating ? "Generating..." : "AI Generate"}
              </button>
            )}

            {/* AI Enhance — only when text exists */}
            {hasText && (
              <button
                type="button"
                onClick={handleAiEnhance}
                disabled={enhancing}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                {enhancing ? "Enhancing..." : "AI Enhance"}
              </button>
            )}
          </div>
        )}
      </div>

      <div>
        {isEditing ? (
          <textarea
            value={text}
            onChange={handleTextChange}
            rows={8}
            className="w-full p-4 bg-gray-50 text-gray-700 rounded-lg text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
            placeholder="Write your professional summary here, or use AI to generate one..."
          />
        ) : (
          <div className="prose max-w-none">
            {summary.map((paragraph, index) => (
              <p
                key={index}
                className="text-gray-700 leading-relaxed mb-4 last:mb-0"
              >
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
