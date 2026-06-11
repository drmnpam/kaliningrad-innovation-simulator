import { characterHints } from "../game/gameTexts";
import type { CharacterState } from "../game/gameState";
import { CharacterFace, GameCharacter } from "./GameCharacter";

type AdvisorEkaterinaProps = {
  character: CharacterState;
  isAnimated: boolean;
};

function AdvisorAvatar() {
  return (
    <>
      <span className="char-advisor__hair-back" />
      <span className="char-advisor__hair-fringe" />
      <div className="char-advisor__head">
        <CharacterFace />
        <span className="char-advisor__earring" />
      </div>
      <div className="char-advisor__pose">
        <span className="char-advisor__arm char-advisor__arm--left" />
        <div className="char-advisor__blazer">
          <span className="char-advisor__collar" />
          <span className="char-advisor__lapel char-advisor__lapel--left" />
          <span className="char-advisor__lapel char-advisor__lapel--right" />
          <span className="char-advisor__blouse" />
        </div>
        <span className="char-advisor__arm char-advisor__arm--right" />
        <div className="char-advisor__tablet">
          <span className="char-advisor__tablet-line" />
          <span className="char-advisor__tablet-line" />
          <span className="char-advisor__tablet-line short" />
        </div>
        <span className="char-advisor__skirt" />
        <span className="char-advisor__leg char-advisor__leg--left" />
        <span className="char-advisor__leg char-advisor__leg--right" />
        <span className="char-advisor__shoe char-advisor__shoe--left" />
        <span className="char-advisor__shoe char-advisor__shoe--right" />
      </div>
    </>
  );
}

export function AdvisorEkaterina({ character, isAnimated }: AdvisorEkaterinaProps) {
  return (
    <GameCharacter
      name={character.name}
      roleLabel="советник"
      mood={character.mood}
      message={character.currentMessage}
      isAnimated={isAnimated}
      detailHint={characterHints.advisor}
      variant="advisor"
      avatar={<AdvisorAvatar />}
    />
  );
}
