import type { ReactNode } from "react";
import type { CharacterMessage, CharacterMood } from "../game/gameState";

export interface GameCharacterProps {
  name: string;
  roleLabel: string;
  mood: CharacterMood;
  message: CharacterMessage | null;
  isAnimated?: boolean;
  detailHint: string;
  variant: "advisor" | "engineer";
  avatar: ReactNode;
}

export function GameCharacter({
  name,
  roleLabel,
  mood,
  message,
  isAnimated = false,
  detailHint,
  variant,
  avatar,
}: GameCharacterProps) {
  return (
    <article
      className={`character character--${variant} mood-${mood} ${isAnimated ? "animated" : ""}`}
      title={detailHint}
    >
      <div className={`char-avatar char-avatar--${variant}`} aria-hidden="true">
        {avatar}
      </div>
      <div className="character-copy">
        <div className="character-name-row">
          <h3>{name}</h3>
          <span className={`mood-pill mood-pill--${mood}`}>{roleLabel}</span>
        </div>
        <div className="speech-bubble">
          <p className="character-message">{message?.text ?? "Готовлю рекомендацию по следующему ходу."}</p>
        </div>
      </div>
    </article>
  );
}

export function CharacterFace() {
  return (
    <>
      <span className="char-face__brow char-face__brow--left" />
      <span className="char-face__brow char-face__brow--right" />
      <span className="char-face__eye char-face__eye--left" />
      <span className="char-face__eye char-face__eye--right" />
      <span className="char-face__cheek char-face__cheek--left" />
      <span className="char-face__cheek char-face__cheek--right" />
      <span className="char-face__mouth" />
    </>
  );
}
