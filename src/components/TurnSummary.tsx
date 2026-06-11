import { calculateInnovationScore } from "../game/gameState";
import { formatMoney } from "../game/gameLogic";
import { uiTexts } from "../game/gameTexts";
import type { GameEventType, GameState } from "../game/gameState";

type TurnSummaryProps = {
  state: GameState;
  onClose: () => void;
};

const eventMeta: Record<GameEventType, { label: string; className: string }> = {
  grant_approved: { label: "Грант", className: "event-good" },
  grant_rejected: { label: "Отказ", className: "event-bad" },
  project_delay: { label: "Задержка", className: "event-warn" },
  project_breakthrough: { label: "Прогресс", className: "event-good" },
  rule_change: { label: "Правила", className: "event-info" },
  info: { label: "Событие", className: "event-info" },
};

export function TurnSummary({ state, onClose }: TurnSummaryProps) {
  if (!state.showTurnSummary) {
    return null;
  }

  const score = calculateInnovationScore(state);
  const successful = state.projects.filter((project) => project.isSuccessful).length;

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section
        className={`modal turn-summary${state.isGameOver ? " modal--final" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Итоги хода"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <p className="eyebrow">{state.isGameOver ? "Финал партии" : "Итоги квартала"}</p>
            <h2>{state.isGameOver ? "Партия завершена" : `Ход ${Math.max(1, state.company.turn - 1)}`}</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Закрыть">
            ×
          </button>
        </div>

        <ul className="event-cards">
          {state.turnEvents.length > 0 ? (
            state.turnEvents.map((event) => {
              const meta = eventMeta[event.type];

              return (
                <li key={event.id} className={`event-card ${meta.className}`}>
                  <span className="event-card__tag">{meta.label}</span>
                  <p>{event.message}</p>
                </li>
              );
            })
          ) : (
            <li className="event-card event-info">
              <span className="event-card__tag">Событие</span>
              <p>{uiTexts.noEvents}</p>
            </li>
          )}
        </ul>

        <div className="summary-strip">
          <div className="summary-chip">
            <span>Индекс</span>
            <strong>{score}</strong>
          </div>
          <div className="summary-chip">
            <span>Деньги</span>
            <strong>{formatMoney(state.company.cash)}</strong>
          </div>
          <div className="summary-chip">
            <span>Репутация</span>
            <strong>{state.company.reputation}</strong>
          </div>
        </div>

        {state.isGameOver ? (
          <div className="final-banner">
            <p className="final-note">
              Успешных проектов: <strong>{successful}</strong>. Привлечено поддержки:{" "}
              <strong>{formatMoney(state.company.grantsReceived)}</strong>.
            </p>
            <p className="final-score">Итоговый индекс инновационности: {score}</p>
          </div>
        ) : null}

        <button className="button primary full" type="button" onClick={onClose}>
          {uiTexts.close}
        </button>
      </section>
    </div>
  );
}
