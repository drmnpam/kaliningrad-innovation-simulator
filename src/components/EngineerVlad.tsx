import { characterHints } from "../game/gameTexts";
import type { CharacterState } from "../game/gameState";
import { CharacterFace, GameCharacter } from "./GameCharacter";

type EngineerVladProps = {
  character: CharacterState;
  isAnimated: boolean;
};

function EngineerAvatar() {
  return (
    <>
      <span className="char-engineer__goggles" />
      <div className="char-engineer__head">
        <span className="char-engineer__hair" />
        <CharacterFace />
      </div>
      <div className="char-engineer__pose">
        <span className="char-engineer__arm char-engineer__arm--left" />
        <div className="char-engineer__jacket">
          <span className="char-engineer__stripe" />
          <span className="char-engineer__pocket" />
          <span className="char-engineer__badge-pin" />
        </div>
        <span className="char-engineer__arm char-engineer__arm--right" />
        <span className="char-engineer__wrench" />
        <span className="char-engineer__blueprint">
          <span />
          <span />
          <span />
        </span>
        <span className="char-engineer__pants" />
        <span className="char-engineer__leg char-engineer__leg--left" />
        <span className="char-engineer__leg char-engineer__leg--right" />
        <span className="char-engineer__boot char-engineer__boot--left" />
        <span className="char-engineer__boot char-engineer__boot--right" />
        <span className="char-engineer__bench" />
      </div>
    </>
  );
}

export function EngineerVlad({ character, isAnimated }: EngineerVladProps) {
  return (
    <GameCharacter
      name="Влад"
      roleLabel="инженер"
      mood={character.mood}
      message={character.currentMessage}
      isAnimated={isAnimated}
      detailHint={characterHints.engineer}
      variant="engineer"
      avatar={<EngineerAvatar />}
    />
  );
}
