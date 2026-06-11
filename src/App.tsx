import { useEffect, useReducer, useState } from "react";
import { CharactersPanel } from "./components/CharactersPanel";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { ProjectsPanel } from "./components/ProjectsPanel";
import { SupportPanel } from "./components/SupportPanel";
import { TutorialModal } from "./components/TutorialModal";
import { TurnSummary } from "./components/TurnSummary";
import { createInitialState, gameReducer, restoreGameState } from "./game/gameState";

const STORAGE_KEY = "kaliningrad-innovation-game";
const TUTORIAL_KEY = "kaliningrad-innovation-tutorial-seen";

function loadInitialState() {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return createInitialState();
  }

  try {
    return restoreGameState(JSON.parse(saved)) ?? createInitialState();
  } catch {
    return createInitialState();
  }
}

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, undefined, loadInitialState);
  const [isTutorialOpen, setIsTutorialOpen] = useState(() => window.localStorage.getItem(TUTORIAL_KEY) !== "1");

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const closeTutorial = () => {
    window.localStorage.setItem(TUTORIAL_KEY, "1");
    setIsTutorialOpen(false);
  };

  return (
    <main className={`app-shell${state.isGameOver ? " app-shell--game-over" : ""}`}>
      <Header
        state={state}
        onNewGame={() => dispatch({ type: "START_NEW_GAME" })}
        onEndTurn={() => dispatch({ type: "END_TURN" })}
      />
      <Dashboard state={state} />
      <div className="game-layout">
        <CharactersPanel state={state} />
        <div className="main-panels">
          <ProjectsPanel
            state={state}
            onInvest={(projectId, amount) => dispatch({ type: "INVEST_IN_PROJECT", projectId, amount })}
            onToggleActive={(projectId) => dispatch({ type: "TOGGLE_PROJECT_ACTIVE", projectId })}
          />
          <SupportPanel
            state={state}
            onApply={(projectId, supportId) => dispatch({ type: "APPLY_SUPPORT_TO_PROJECT", projectId, supportId })}
          />
        </div>
      </div>
      <TurnSummary state={state} onClose={() => dispatch({ type: "CLOSE_TURN_SUMMARY" })} />
      <TutorialModal isOpen={isTutorialOpen} onClose={closeTutorial} />
    </main>
  );
}
