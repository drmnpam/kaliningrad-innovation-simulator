import type { CSSProperties } from "react";
import { sectorLabels, stageLabels, stageOrder } from "../game/gameData";
import { calculateSuccessChance, formatMoney } from "../game/gameLogic";
import type { GameState, Project, ProjectStage } from "../game/gameState";

type ProjectsPanelProps = {
  state: GameState;
  onInvest: (projectId: string, amount: number) => void;
  onToggleActive: (projectId: string) => void;
};

export function ProjectsPanel({ state, onInvest, onToggleActive }: ProjectsPanelProps) {
  return (
    <section className="panel projects-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Портфель</p>
          <h2>Проекты компании</h2>
        </div>
        <span className="panel-count">{state.projects.length} направлений</span>
      </div>
      <div className="projects-grid">
        {state.projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            reputation={state.company.reputation}
            grantCount={state.activeSupports.filter((item) => item.projectId === project.id).length}
            canInvest={state.company.cash > 0 && !state.isGameOver}
            onInvest={onInvest}
            onToggleActive={onToggleActive}
            style={{ animationDelay: `${index * 60}ms` }}
          />
        ))}
      </div>
    </section>
  );
}

type ProjectCardProps = {
  project: Project;
  reputation: number;
  grantCount: number;
  canInvest: boolean;
  onInvest: (projectId: string, amount: number) => void;
  onToggleActive: (projectId: string) => void;
  style?: CSSProperties;
};

function StagePipeline({ stage }: { stage: ProjectStage }) {
  const currentIndex = stageOrder.indexOf(stage);

  return (
    <div className="stage-pipeline" aria-label={`Стадия: ${stageLabels[stage]}`}>
      {stageOrder.map((step, index) => (
        <span
          key={step}
          className={`stage-pipeline__dot${index <= currentIndex ? " is-done" : ""}${index === currentIndex ? " is-current" : ""}`}
          title={stageLabels[step]}
        />
      ))}
      <span className="stage-pipeline__label">{stageLabels[stage]}</span>
    </div>
  );
}

function ProjectCard({
  project,
  reputation,
  grantCount,
  canInvest,
  onInvest,
  onToggleActive,
  style,
}: ProjectCardProps) {
  const progress = Math.min(100, Math.round((project.spent / project.budgetNeeded) * 100));
  const successChance = calculateSuccessChance(project, reputation);
  const status = project.isSuccessful ? "на-рынке" : project.isActive ? "активен" : "пауза";
  const statusLabel = project.isSuccessful ? "на рынке" : project.isActive ? "активен" : "пауза";

  return (
    <article
      className={`project-card sector-${project.sector}${project.isActive ? "" : " muted"}${project.isSuccessful ? " is-commercial" : ""}`}
      style={style}
    >
      <div className="project-card__accent" aria-hidden="true" />
      <div className="project-title-row">
        <div className="project-title-block">
          <span className="sector-tag">{sectorLabels[project.sector]}</span>
          <h3>{project.name}</h3>
        </div>
        <div className="project-badges">
          {grantCount > 0 ? (
            <span className="badge badge-grant">грант{grantCount > 1 ? ` ×${grantCount}` : ""}</span>
          ) : null}
          <span className={`status status-${status}`}>{statusLabel}</span>
        </div>
      </div>

      <StagePipeline stage={project.stage} />

      <dl className="project-meta">
        <div>
          <dt>TRL</dt>
          <dd>
            <span className="trl-badge">{project.trl}</span>/9
          </dd>
        </div>
        <div>
          <dt>Шанс прогресса</dt>
          <dd className={successChance >= 60 ? "chance-high" : successChance >= 35 ? "chance-mid" : "chance-low"}>
            {successChance}%
          </dd>
        </div>
        <div>
          <dt>Потрачено</dt>
          <dd>{formatMoney(project.spent)}</dd>
        </div>
        <div>
          <dt>Бюджет</dt>
          <dd>{formatMoney(project.budgetNeeded)}</dd>
        </div>
      </dl>

      <div className="budget-row">
        <span>Освоение бюджета</span>
        <span>{progress}%</span>
      </div>
      <div className="progress-track slim">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="project-actions">
        <button
          className="button small primary"
          type="button"
          onClick={() => onInvest(project.id, 1_000_000)}
          disabled={!canInvest || project.isSuccessful !== null}
        >
          +1 млн
        </button>
        <button
          className="button small ghost"
          type="button"
          onClick={() => onToggleActive(project.id)}
          disabled={project.isSuccessful !== null}
        >
          {project.isActive ? "Пауза" : "Возобновить"}
        </button>
      </div>
    </article>
  );
}
