import type { ProductSignal } from "./prospectingTypes";

export interface ScoreBreakdown {
  score: number;
  confidence: number;
  reasons: string[];
}

export function scoreLuxurySignal(signal: ProductSignal): ScoreBreakdown {
  const desirability = signal.desirability * 0.27;
  const giftability = signal.giftability * 0.18;
  const margin = signal.marginPotential * 0.17;
  const visual = signal.visualPotential * 0.18;
  const seasonality = signal.seasonality * 0.12;
  const saturationPenalty = signal.saturationRisk * 0.18;
  const score = Math.round(desirability + giftability + margin + visual + seasonality - saturationPenalty + 10);
  const confidence = Math.max(62, Math.min(96, Math.round((signal.desirability + signal.visualPotential + signal.marginPotential) / 3)));

  const reasons = [
    signal.desirability >= 84 ? "Désirabilité forte sur signaux premium" : "Désirabilité correcte et stable",
    signal.giftability >= 84 ? "Angle cadeau haut de gamme évident" : "Angle cadeau secondaire mais exploitable",
    signal.saturationRisk <= 40 ? "Risque de saturation maîtrisé" : "Marché actif, différenciation visuelle nécessaire",
    signal.visualPotential >= 86 ? "Potentiel visuel élevé pour une fiche premium" : "Potentiel visuel suffisant avec direction artistique sobre",
  ];

  return { score: Math.max(0, Math.min(100, score)), confidence, reasons };
}

export function getScoreLabel(score: number): string {
  if (score >= 86) return "Priorité Maison";
  if (score >= 76) return "Opportunité forte";
  if (score >= 66) return "À surveiller";
  return "À affiner";
}
