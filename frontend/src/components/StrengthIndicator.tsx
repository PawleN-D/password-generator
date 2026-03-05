interface Props {
  length: number;
  classCount: number;
}

type Strength = "Weak" | "Fair" | "Strong" | "Very Strong";

function getStrength(length: number, classCount: number): Strength {
  const score = classCount + (length >= 16 ? 2 : length >= 12 ? 1 : 0);
  if (score <= 2) return "Weak";
  if (score === 3) return "Fair";
  if (score === 4) return "Strong";
  return "Very Strong";
}

const barWidth: Record<Strength, string> = {
  Weak: "w-1/4",
  Fair: "w-2/4",
  Strong: "w-3/4",
  "Very Strong": "w-full",
};

const barColor: Record<Strength, string> = {
  Weak: "bg-red-400",
  Fair: "bg-orange-400",
  Strong: "bg-green-500",
  "Very Strong": "bg-blue-500",
};

const labelColor: Record<Strength, string> = {
  Weak: "text-red-400",
  Fair: "text-orange-400",
  Strong: "text-green-500",
  "Very Strong": "text-blue-500",
};

export function StrengthIndicator({ length, classCount }: Props) {
  if (classCount === 0) return null;
  const strength = getStrength(length, classCount);

  return (
    <div className="mt-2">
      <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-300 ${barWidth[strength]} ${barColor[strength]}`} />
      </div>
      <span className={`text-xs mt-1 block ${labelColor[strength]}`}>{strength}</span>
    </div>
  );
}