import type { GameState } from "../game/gameState";
import { AdvisorEkaterina } from "./AdvisorEkaterina";
import { EngineerVlad } from "./EngineerVlad";

type CharactersPanelProps = {
  state: GameState;
};

export function CharactersPanel({ state }: CharactersPanelProps) {
  const ekaterina = state.characters.find((character) => character.name === "Екатерина");
  const vlad = state.characters.find((character) => character.name === "Владислав");

  return (
    <aside className="characters-panel" aria-label="Советники">
      {ekaterina ? (
        <AdvisorEkaterina
          key={ekaterina.currentMessage?.id ?? "ekaterina-default"}
          character={ekaterina}
          isAnimated
        />
      ) : null}
      {vlad ? (
        <EngineerVlad key={vlad.currentMessage?.id ?? "vlad-default"} character={vlad} isAnimated />
      ) : null}
    </aside>
  );
}
