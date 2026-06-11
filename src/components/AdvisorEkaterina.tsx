import { characterHints } from "../game/gameTexts";
import type { CharacterMood, CharacterState } from "../game/gameState";
import { GameCharacter } from "./GameCharacter";

type AdvisorEkaterinaProps = {
  character: CharacterState;
  isAnimated: boolean;
};

function AdvisorAvatar({ mood }: { mood: CharacterMood }) {
  const mouthPath =
    mood === "happy"
      ? "M34 44 Q40 50 46 44"
      : mood === "sad"
        ? "M34 48 Q40 42 46 48"
        : mood === "surprised"
          ? "M37 46 A3 3 0 1 1 43 46 A3 3 0 1 1 37 46"
          : mood === "thinking"
            ? "M36 46 Q40 44 44 46"
            : "M35 45 Q40 48 45 45";

  return (
    <svg className="char-svg char-svg--advisor" viewBox="0 0 80 96" aria-hidden="true">
      <ellipse cx="40" cy="88" rx="26" ry="5" fill="rgba(31,107,71,0.12)" />
      <path
        d="M18 58 Q40 52 62 58 L58 78 Q40 84 22 78 Z"
        fill="#2d7a54"
        stroke="#1f5c40"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M34 58 L40 66 L46 58" fill="#f7f4ec" />
      <ellipse cx="28" cy="66" rx="7" ry="16" fill="#f5c9a8" />
      <ellipse cx="52" cy="66" rx="7" ry="16" fill="#f5c9a8" />
      <rect x="48" y="62" width="14" height="18" rx="3" fill="#eef5f1" stroke="#7a9e8c" strokeWidth="1.5" />
      <path d="M51 66 H59 M51 70 H57 M51 74 H55" stroke="#7a9e8c" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="40" cy="34" r="18" fill="#f5c9a8" />
      <path
        d="M22 28 C24 14 34 8 40 8 C46 8 56 14 58 28 C54 22 46 18 40 18 C34 18 26 22 22 28 Z"
        fill="#3d2b22"
      />
      <path d="M22 30 C18 38 20 48 24 52" fill="none" stroke="#3d2b22" strokeWidth="6" strokeLinecap="round" />
      <path d="M58 30 C62 38 60 48 56 52" fill="none" stroke="#3d2b22" strokeWidth="6" strokeLinecap="round" />
      <ellipse cx="33" cy="33" rx="3.5" ry="4.5" fill="#fff" />
      <ellipse cx="47" cy="33" rx="3.5" ry="4.5" fill="#fff" />
      <circle cx="34" cy="34" r="1.8" fill="#2b3330" />
      <circle cx="48" cy="34" r="1.8" fill="#2b3330" />
      <path d="M28 38 Q30 40 32 38" stroke="#c97862" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M48 38 Q50 40 52 38" stroke="#c97862" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d={mouthPath} stroke="#8b4f45" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="56" cy="36" r="2" fill="#d4a017" />
    </svg>
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
      avatar={<AdvisorAvatar mood={character.mood} />}
    />
  );
}
