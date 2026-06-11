import { uiTexts } from "../game/gameTexts";
import type { GameState } from "../game/gameState";

type HeaderProps = {
  state: GameState;
  onNewGame: () => void;
  onEndTurn: () => void;
};

export function Header({ state, onNewGame, onEndTurn }: HeaderProps) {
  const turn = Math.min(state.company.turn, state.maxTurns);
  const progress = Math.round((turn / state.maxTurns) * 100);
  const quarter = ((state.company.turn - 1) % 4) + 1;

  return (
    <header className="app-header">
      <div className="header-main">
        <p className="eyebrow">ИИЦ • ФАСИЭ • технологический бизнес</p>
        <h1>{uiTexts.title}</h1>
        <p className="subtitle">{uiTexts.subtitle}</p>
        <div className="header-meta">
          <span className="company-chip">{state.company.name}</span>
          <div className="quarter-track" aria-label={`Прогресс партии: ${turn} из ${state.maxTurns} ходов`}>
            <div className="quarter-fill" style={{ width: `${progress}%` }} />
            <span>
              {state.company.year} · квартал {quarter} · ход {turn}/{state.maxTurns}
            </span>
          </div>
        </div>
      </div>
      <div className="header-actions">
        <button className="button ghost" type="button" onClick={onNewGame}>
          {uiTexts.newGame}
        </button>
        <button className="button primary" type="button" onClick={onEndTurn} disabled={state.isGameOver}>
          {state.isGameOver ? "Партия завершена" : uiTexts.endTurn}
        </button>
      </div>
    </header>
  );
}
