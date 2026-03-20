import { evalueazaSanse } from "@/lib/sanse-estimative";

interface Props {
  motiveSelectate: string[];
  motiveCustom?: string | null;
}

const CONFIG = {
  ridicate: {
    emoji: "🟢",
    label: "Ridicate",
    barColor: "bg-green-500",
    badgeBg: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    borderColor: "border-green-200 dark:border-green-800",
  },
  medii: {
    emoji: "🟡",
    label: "Medii",
    barColor: "bg-yellow-400",
    badgeBg: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    borderColor: "border-yellow-200 dark:border-yellow-800",
  },
  reduse: {
    emoji: "🔴",
    label: "Reduse",
    barColor: "bg-red-500",
    badgeBg: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    borderColor: "border-red-200 dark:border-red-800",
  },
} as const;

export function SanseEstimativeCard({ motiveSelectate, motiveCustom }: Readonly<Props>) {
  const evaluare = evalueazaSanse(motiveSelectate, motiveCustom);
  const cfg = CONFIG[evaluare.nivel];

  return (
    <div className={`rounded-xl border ${cfg.borderColor} bg-card p-6 space-y-4`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-base">Șanse estimative</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Estimare heuristică — nu constituie consultanță juridică
          </p>
        </div>
        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${cfg.badgeBg}`}>
          {cfg.emoji} {cfg.label}
        </span>
      </div>

      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Probabilitate estimată de succes</span>
          <span className="font-medium text-foreground">{evaluare.scor}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${cfg.barColor}`}
            style={{ width: `${evaluare.scor}%` }}
          />
        </div>
      </div>

      {/* Explanation */}
      <p className="text-sm text-muted-foreground">{evaluare.explicatie}</p>

      {/* Strong motives */}
      {evaluare.motivePuternice.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-foreground">✅ Motive puternice:</p>
          <ul className="space-y-1">
            {evaluare.motivePuternice.map((m) => (
              <li key={m} className="text-xs text-muted-foreground flex items-start gap-1.5">
                <span className="mt-0.5 text-green-500">•</span>
                {m}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Weak motives */}
      {evaluare.motiveSlabe.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-foreground">⚠️ Motive generice (mai greu de probat):</p>
          <ul className="space-y-1">
            {evaluare.motiveSlabe.map((m) => (
              <li key={m} className="text-xs text-muted-foreground flex items-start gap-1.5">
                <span className="mt-0.5 text-yellow-500">•</span>
                {m}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
