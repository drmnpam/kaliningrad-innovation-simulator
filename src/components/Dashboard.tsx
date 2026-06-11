import type { CSSProperties } from "react";
import { calculateInnovationScore } from "../game/gameState";
import { formatMoney } from "../game/gameLogic";
import type { GameState } from "../game/gameState";

type DashboardProps = {
  state: GameState;
};

const metrics = [
  { key: "year", label: "Год", className: "metric--year" },
  { key: "cash", label: "Деньги", className: "metric--cash" },
  { key: "grants", label: "Поддержка", className: "metric--grants" },
  { key: "active", label: "Активные меры", className: "metric--active" },
  { key: "own", label: "Свои средства", className: "metric--own" },
  { key: "reputation", label: "Репутация", className: "metric--reputation" },
] as const;

export function Dashboard({ state }: DashboardProps) {
  const score = calculateInnovationScore(state);
  const completed = state.projects.filter((project) => project.isSuccessful).length;
  const turn = Math.min(state.company.turn, state.maxTurns);
  const cashLow = state.company.cash < 4_000_000;

  const values: Record<(typeof metrics)[number]["key"], { value: string; hint: string }> = {
    year: { value: String(state.company.year), hint: `ход ${turn} из ${state.maxTurns}` },
    cash: { value: formatMoney(state.company.cash), hint: cashLow ? "остаток низкий" : "остаток" },
    grants: { value: formatMoney(state.company.grantsReceived), hint: "гранты и субсидии" },
    active: { value: String(state.activeSupports.length), hint: "одобренных заявок" },
    own: { value: formatMoney(state.company.ownFundsSpent), hint: "вложено компанией" },
    reputation: { value: `${state.company.reputation}/100`, hint: `${completed} проектов на рынке` },
  };

  return (
    <section className="dashboard" aria-label="Показатели компании">
      {metrics.map((metric) => (
        <div
          key={metric.key}
          className={`metric ${metric.className}${metric.key === "cash" && cashLow ? " metric--alert" : ""}`}
        >
          <span>{metric.label}</span>
          <strong>{values[metric.key].value}</strong>
          <small>{values[metric.key].hint}</small>
        </div>
      ))}
      <div className="score-panel">
        <div className="score-ring" style={{ "--score": score } as CSSProperties}>
          <span className="score-ring__value">{score}</span>
        </div>
        <div className="score-copy">
          <span>Индекс инновационности</span>
          <strong>{score}</strong>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${score}%` }} />
          </div>
          <small>{score >= 70 ? "сильная позиция" : score >= 40 ? "есть потенциал роста" : "нужен прорыв"}</small>
        </div>
      </div>
    </section>
  );
}
