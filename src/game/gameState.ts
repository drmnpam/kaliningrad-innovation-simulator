import { initialCharacters, initialProjects, supportMeasures } from "./gameData";
import {
  applySupportEffects,
  calculateInnovationScore,
  canApplySupport,
  generateTurnOutcome,
  investInProject,
  toggleProjectActive,
} from "./gameLogic";

export type ProjectStage = "idea" | "rnd" | "prototype" | "pilot" | "commercial";

export type ProjectSector =
  | "bio"
  | "med_devices"
  | "machinery"
  | "industry"
  | "neuronet"
  | "other";

export type SupportType =
  | "regional_engineering_subsidy"
  | "fasie_start"
  | "fasie_commercialization"
  | "fasie_development"
  | "free_prototyping";

export type GameEventType =
  | "grant_approved"
  | "grant_rejected"
  | "project_delay"
  | "project_breakthrough"
  | "rule_change"
  | "info";

export type CharacterMood = "neutral" | "happy" | "sad" | "thinking" | "surprised";

export type CharacterRole = "advisor" | "engineer";

export type CharacterMessage = {
  id: string;
  text: string;
};

export type CharacterState = {
  name: "Екатерина" | "Владислав";
  role: CharacterRole;
  mood: CharacterMood;
  currentMessage: CharacterMessage | null;
};

export type Company = {
  name: string;
  cash: number;
  ownFundsSpent: number;
  grantsReceived: number;
  reputation: number;
  year: number;
  turn: number;
};

export type Project = {
  id: string;
  name: string;
  sector: ProjectSector;
  stage: ProjectStage;
  trl: number;
  budgetNeeded: number;
  spent: number;
  successChanceModifier: number;
  isActive: boolean;
  isSuccessful: boolean | null;
  unlockedAtTurn: number;
};

export type SupportMeasure = {
  id: string;
  name: string;
  type: SupportType;
  description: string;
  maxAmount: number;
  coveragePercent: number;
  requiresCofinancing: boolean;
  applicableStages: ProjectStage[];
  applicableSectors: ProjectSector[] | "any";
};

export type ActiveSupport = {
  projectId: string;
  supportId: string;
  amountApproved: number;
};

export type GameEvent = {
  id: string;
  type: GameEventType;
  message: string;
  impact?: (state: GameState) => GameState;
};

export type GameState = {
  company: Company;
  projects: Project[];
  supports: SupportMeasure[];
  activeSupports: ActiveSupport[];
  turnEvents: GameEvent[];
  maxTurns: number;
  isGameOver: boolean;
  showTurnSummary: boolean;
  characters: CharacterState[];
};

export type GameAction =
  | { type: "START_NEW_GAME" }
  | { type: "APPLY_SUPPORT_TO_PROJECT"; projectId: string; supportId: string }
  | { type: "INVEST_IN_PROJECT"; projectId: string; amount: number }
  | { type: "TOGGLE_PROJECT_ACTIVE"; projectId: string }
  | { type: "END_TURN" }
  | { type: "SHOW_TURN_SUMMARY" }
  | { type: "CLOSE_TURN_SUMMARY" }
  | { type: "FINISH_GAME" };

export const createInitialState = (): GameState => ({
  company: {
    name: "Балтийская технологическая компания",
    cash: 18_000_000,
    ownFundsSpent: 0,
    grantsReceived: 0,
    reputation: 55,
    year: 2026,
    turn: 1,
  },
  projects: initialProjects.map((project) => ({ ...project })),
  supports: supportMeasures.map((support) => ({ ...support })),
  activeSupports: [],
  turnEvents: [],
  maxTurns: 16,
  isGameOver: false,
  showTurnSummary: false,
  characters: initialCharacters.map((character) => ({
    ...character,
    currentMessage: character.currentMessage ? { ...character.currentMessage } : null,
  })),
});

// Central reducer for all gameplay transitions. It delegates calculations to pure helpers.
export function gameReducer(state: GameState, action: GameAction): GameState {
  if (state.isGameOver && action.type !== "START_NEW_GAME" && action.type !== "CLOSE_TURN_SUMMARY") {
    return state;
  }

  switch (action.type) {
    case "START_NEW_GAME":
      return createInitialState();
    case "APPLY_SUPPORT_TO_PROJECT": {
      const project = state.projects.find((item) => item.id === action.projectId);
      const support = state.supports.find((item) => item.id === action.supportId);

      if (!project || !support) {
        return state;
      }

      const eligibility = canApplySupport(state, project, support);
      if (!eligibility.ok) {
        return {
          ...state,
          turnEvents: [
            {
              id: `support-reject-${Date.now()}`,
              type: "info",
              message: eligibility.reason,
            },
          ],
          characters: state.characters.map((character) =>
            character.name === "Екатерина"
              ? {
                  ...character,
                  mood: "thinking",
                  currentMessage: {
                    id: "support-not-eligible",
                    text: eligibility.reason,
                  },
                }
              : character,
          ),
          showTurnSummary: true,
        };
      }

      return applySupportEffects(state, project, support);
    }
    case "INVEST_IN_PROJECT":
      return investInProject(state, action.projectId, action.amount);
    case "TOGGLE_PROJECT_ACTIVE":
      return toggleProjectActive(state, action.projectId);
    case "END_TURN": {
      const nextState = generateTurnOutcome(state);
      return nextState.company.turn > nextState.maxTurns
        ? {
            ...nextState,
            isGameOver: true,
            showTurnSummary: true,
          }
        : nextState;
    }
    case "SHOW_TURN_SUMMARY":
      return { ...state, showTurnSummary: true };
    case "CLOSE_TURN_SUMMARY":
      return { ...state, showTurnSummary: false, turnEvents: [] };
    case "FINISH_GAME":
      return {
        ...state,
        isGameOver: true,
        showTurnSummary: true,
      };
    default:
      return state;
  }
}

export function restoreGameState(candidate: unknown): GameState | null {
  if (!candidate || typeof candidate !== "object") {
    return null;
  }

  const restored = candidate as Partial<GameState>;
  if (!restored.company || !Array.isArray(restored.projects) || !Array.isArray(restored.characters)) {
    return null;
  }

  type PersistedCharacterState = Omit<CharacterState, "name"> & { name: CharacterState["name"] | "Влад" };

  const characters = ((restored.characters ?? []) as PersistedCharacterState[]).map((character) => ({
    ...character,
    name: character.name === "Влад" ? "Владислав" : character.name,
  })) as CharacterState[];

  const initialState = createInitialState();

  // Merge projects: carry over unlockedAtTurn from initial data if missing in old saves
  const projects = (restored.projects ?? initialState.projects).map((project) => {
    const initial = initialState.projects.find((p) => p.id === project.id);
    return {
      ...project,
      unlockedAtTurn: (project as Project).unlockedAtTurn ?? initial?.unlockedAtTurn ?? 1,
    };
  });

  return {
    ...initialState,
    ...restored,
    projects,
    characters,
    turnEvents: (restored.turnEvents ?? []).map((event) => ({
      id: event.id,
      type: event.type,
      message: event.message,
    })),
  };
}

export { calculateInnovationScore };
