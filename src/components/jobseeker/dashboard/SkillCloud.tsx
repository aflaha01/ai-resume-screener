type SkillCloudProps = {
  skills: string[];
};

export default function SkillCloud({ skills }: SkillCloudProps) {
  if (!skills.length) {
    return <p className="text-gray-500">No skills added yet.</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <span
          key={index}
          className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium"
        >
          {skill}
        </span>
      ))}
    </div>
  );
}
