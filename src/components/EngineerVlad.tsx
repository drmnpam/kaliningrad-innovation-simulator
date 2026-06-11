import { characterHints } from "../game/gameTexts";
import type { CharacterMood, CharacterState } from "../game/gameState";
import { GameCharacter } from "./GameCharacter";

type EngineerVladProps = {
  character: CharacterState;
  isAnimated: boolean;
};

function EngineerAvatar({ mood }: { mood: CharacterMood }) {
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
    <svg className="char-svg char-svg--engineer" viewBox="0 0 80 96" aria-hidden="true">
      <ellipse cx="40" cy="88" rx="26" ry="5" fill="rgba(184,116,18,0.12)" />
      <path
        d="M20 58 Q40 52 60 58 L56 76 Q40 82 24 76 Z"
        fill="#3a4850"
        stroke="#243038"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <rect x="24" y="64" width="32" height="4" rx="2" fill="#e8c84a" />
      <ellipse cx="26" cy="66" rx="7" ry="15" fill="#efb98a" />
      <ellipse cx="54" cy="66" rx="7" ry="15" fill="#efb98a" />
      <rect x="8" y="68" width="16" height="6" rx="2" fill="#8a9aa3" transform="rotate(-24 16 71)" />
      <rect x="56" y="64" width="14" height="12" rx="2" fill="#e8f0f5" stroke="#5a8aa8" strokeWidth="1.2" />
      <path d="M58 68 H68 M58 72 H66" stroke="#5a8aa8" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="40" cy="34" r="18" fill="#efb98a" />
      <path
        d="M22 24 C26 10 34 6 40 6 C46 6 54 10 58 24 C52 18 46 16 40 16 C34 16 28 18 22 24 Z"
        fill="#8b5a2b"
      />
      <rect x="18" y="18" width="44" height="10" rx="5" fill="#f0c040" stroke="#c99212" strokeWidth="1.2" />
      <ellipse cx="33" cy="33" rx="3.5" ry="4.5" fill="#fff" />
      <ellipse cx="47" cy="33" rx="3.5" ry="4.5" fill="#fff" />
      <circle cx="34" cy="34" r="1.8" fill="#2b3330" />
      <circle cx="48" cy="34" r="1.8" fill="#2b3330" />
      <path d="M28 38 Q30 40 32 38" stroke="#d48a62" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M48 38 Q50 40 52 38" stroke="#d48a62" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d={mouthPath} stroke="#8b4f45" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
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
      avatar={<EngineerAvatar mood={character.mood} />}
    />
  );
}
