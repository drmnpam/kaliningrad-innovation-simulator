import { tutorialTexts, uiTexts } from "../game/gameTexts";

type TutorialModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function TutorialModal({ isOpen, onClose }: TutorialModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal wide" role="dialog" aria-modal="true" aria-label="Обучение">
        <div className="modal-header">
          <div>
            <p className="eyebrow">Обучение</p>
            <h2>{tutorialTexts.title}</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Закрыть">
            ×
          </button>
        </div>
        <p>{tutorialTexts.intro}</p>
        <ol className="tutorial-list">
          {tutorialTexts.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ol>
        <button className="button primary full" type="button" onClick={onClose}>
          {uiTexts.close}
        </button>
      </section>
    </div>
  );
}
