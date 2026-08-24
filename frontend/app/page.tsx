'use client';

import { useEffect, useMemo, useState } from 'react';
import { extensions, initialCompletedTaskIds, phases } from './roadmap';

type Filter = 'all' | 'current' | 'completed' | 'pending';

const storageKey = 'cloud-engineering-lab-progress-v1';

export default function Home() {
  const allTasks = useMemo(() => phases.flatMap((phase) => phase.tasks), []);
  const [completed, setCompleted] = useState<Set<string>>(
    () => new Set(initialCompletedTaskIds),
  );
  const [filter, setFilter] = useState<Filter>('all');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const hydrationTimer = window.setTimeout(() => {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        try {
          setCompleted(new Set(JSON.parse(saved) as string[]));
        } catch {
          window.localStorage.removeItem(storageKey);
        }
      }
      setHydrated(true);
    }, 0);

    return () => window.clearTimeout(hydrationTimer);
  }, []);

  useEffect(() => {
    if (hydrated) {
      window.localStorage.setItem(storageKey, JSON.stringify([...completed]));
    }
  }, [completed, hydrated]);

  const currentTaskIndex = allTasks.findIndex((task) => !completed.has(task.id));
  const safeCurrentIndex = currentTaskIndex === -1 ? allTasks.length : currentTaskIndex;
  const currentTask = allTasks[safeCurrentIndex] ?? null;
  const currentPhase = currentTask
    ? phases.find((phase) => phase.tasks.some((task) => task.id === currentTask.id))
    : phases.at(-1);
  const completedCount = completed.size;
  const progress = Math.round((completedCount / allTasks.length) * 100);
  const completedPhases = phases.filter((phase) =>
    phase.tasks.every((task) => completed.has(task.id)),
  ).length;

  const visiblePhases = phases.filter((phase) => {
    const completeCount = phase.tasks.filter((task) => completed.has(task.id)).length;
    if (filter === 'current') return phase.id === currentPhase?.id;
    if (filter === 'completed') return completeCount === phase.tasks.length;
    if (filter === 'pending') return completeCount < phase.tasks.length;
    return true;
  });

  function toggleTask(taskId: string) {
    const taskIndex = allTasks.findIndex((task) => task.id === taskId);
    const isDone = completed.has(taskId);
    if (!isDone && taskIndex !== safeCurrentIndex) return;

    setCompleted((previous) => {
      const next = new Set(previous);
      if (next.has(taskId)) {
        for (let index = taskIndex; index < allTasks.length; index += 1) {
          next.delete(allTasks[index].id);
        }
      } else {
        next.add(taskId);
      }
      return next;
    });
  }

  function resetProgress() {
    if (window.confirm('브라우저에 저장된 진행도를 초기 상태로 되돌릴까요?')) {
      setCompleted(new Set(initialCompletedTaskIds));
    }
  }

  return (
    <main className="site-shell">
      <header className="topbar" id="top">
        <a className="brand" href="#top" aria-label="Cloud Engineering Lab 홈">
          <span className="brand-mark">CE</span>
          <span>Cloud Engineering Lab</span>
        </a>
        <nav className="nav-links" aria-label="페이지 탐색">
          <a href="#journey">Journey</a>
          <a href="#roadmap">Roadmap</a>
          <a href="#evidence">Evidence</a>
        </nav>
        <span className="status-pill"><i /> Learning in progress</span>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">PERSONAL LEARNING CONTROL PLANE</p>
          <h1>배운 것을 쌓고,<br /><em>운영 경험으로 증명합니다.</em></h1>
          <p className="hero-copy">
            구축에서 장애 대응까지. 부트캠프 핵심 역량을 하나의 서비스에 연결한
            Cloud · Infrastructure · DevOps 실습 로드맵입니다.
          </p>
          <a className="primary-link" href="#current-task">지금 할 Task 보기 <span>↘</span></a>
        </div>
        <div className="progress-card" aria-label={`전체 진행률 ${progress}퍼센트`}>
          <div className="progress-card-head">
            <span>OVERALL PROGRESS</span>
            <strong>{String(completedCount).padStart(2, '0')} / {allTasks.length}</strong>
          </div>
          <div className="progress-number">{String(progress).padStart(2, '0')}<span>%</span></div>
          <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
          <p>현재 위치 <b>{currentPhase?.title ?? 'Journey complete'}</b></p>
        </div>
      </section>

      <section className="stats-strip" aria-label="진행 현황 요약">
        <div><span>PHASES</span><strong>{completedPhases}<i> / {phases.length}</i></strong></div>
        <div><span>HANDS-ON TASKS</span><strong>{completedCount}<i> / {allTasks.length}</i></strong></div>
        <div><span>WORKLOGS</span><strong>0<i> + 1 draft</i></strong></div>
        <div><span>INCIDENTS</span><strong>0<i> / 10 planned</i></strong></div>
      </section>

      <section className="journey" id="journey" aria-labelledby="journey-title">
        <div className="section-heading">
          <div><p className="eyebrow">THE JOURNEY</p><h2 id="journey-title">전체 학습 경로</h2></div>
          <p className="section-note">기초부터 운영까지, 앞 Task의 증거가 다음 Task를 엽니다.</p>
        </div>
        <div className="phase-rail">
          {phases.map((phase, index) => {
            const phaseDone = phase.tasks.filter((task) => completed.has(task.id)).length;
            const isCurrent = phase.id === currentPhase?.id;
            const isComplete = phaseDone === phase.tasks.length;
            return (
              <a
                className={`phase-node ${isCurrent ? 'is-current' : ''} ${isComplete ? 'is-complete' : ''}`}
                href={`#phase-${phase.id}`}
                key={phase.id}
                aria-label={`${phase.title}, ${phaseDone}/${phase.tasks.length} 완료`}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <b>{phase.title.split(' · ')[0]}</b>
                <small>{phaseDone}/{phase.tasks.length}</small>
              </a>
            );
          })}
        </div>
      </section>

      <section className="current-task" id="current-task" aria-labelledby="current-task-title">
        <div className="current-label"><span>NEXT</span><b>{String(safeCurrentIndex + 1).padStart(2, '0')}</b></div>
        {currentTask ? (
          <>
            <div>
              <p className="eyebrow">ONE TASK AT A TIME</p>
              <h2 id="current-task-title">{currentTask.title}</h2>
              <p>{currentTask.intent}</p>
            </div>
            <div className="task-action">
              <span>완료 증거</span>
              <b>{currentTask.evidence}</b>
              <button onClick={() => toggleTask(currentTask.id)}>완료 표시</button>
            </div>
          </>
        ) : (
          <div><p className="eyebrow">JOURNEY COMPLETE</p><h2 id="current-task-title">모든 핵심 Task를 완료했습니다.</h2></div>
        )}
      </section>

      <section className="roadmap" id="roadmap" aria-labelledby="roadmap-title">
        <div className="section-heading roadmap-heading">
          <div><p className="eyebrow">CORE ROADMAP</p><h2 id="roadmap-title">11 Phases · {allTasks.length} Tasks</h2></div>
          <div className="filters" aria-label="로드맵 필터">
            {(['all', 'current', 'completed', 'pending'] as Filter[]).map((item) => (
              <button className={filter === item ? 'active' : ''} key={item} onClick={() => setFilter(item)}>
                {{ all: '전체', current: '현재', completed: '완료', pending: '남은 단계' }[item]}
              </button>
            ))}
          </div>
        </div>

        <div className="phase-list">
          {visiblePhases.map((phase) => {
            const phaseDone = phase.tasks.filter((task) => completed.has(task.id)).length;
            return (
              <article className="phase-card" id={`phase-${phase.id}`} key={phase.id}>
                <header>
                  <div className="phase-number">{phase.label}</div>
                  <div className="phase-title-block">
                    <p className="eyebrow">PHASE {phase.label}</p>
                    <h3>{phase.title}</h3>
                    <p>{phase.description}</p>
                  </div>
                  <div className="phase-score">
                    <strong>{phaseDone}<span>/{phase.tasks.length}</span></strong>
                    <small>{phaseDone === phase.tasks.length ? 'COMPLETE' : phase.id === currentPhase?.id ? 'IN PROGRESS' : 'QUEUED'}</small>
                  </div>
                </header>
                <div className="phase-body">
                  <div className="outcome">
                    <span>EXIT CRITERIA</span>
                    <p>{phase.outcome}</p>
                    <div className="skill-tags">{phase.skills.map((skill) => <i key={skill}>{skill}</i>)}</div>
                  </div>
                  <ol className="task-list">
                    {phase.tasks.map((task) => {
                      const taskIndex = allTasks.findIndex((entry) => entry.id === task.id);
                      const isDone = completed.has(task.id);
                      const isCurrent = taskIndex === safeCurrentIndex;
                      const isLocked = !isDone && !isCurrent;
                      return (
                        <li className={`${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`} key={task.id}>
                          <button
                            className="task-check"
                            onClick={() => toggleTask(task.id)}
                            disabled={isLocked}
                            aria-label={`${task.title} ${isDone ? '완료 취소' : isCurrent ? '완료 표시' : '잠김'}`}
                          >
                            {isDone ? '✓' : String(taskIndex + 1).padStart(2, '0')}
                          </button>
                          <details open={isCurrent}>
                            <summary>{task.title}<span>{isDone ? 'DONE' : isCurrent ? 'NOW' : 'LOCKED'}</span></summary>
                            <p>{task.intent}</p>
                            <small>Evidence — {task.evidence}</small>
                          </details>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="evidence-section" id="evidence" aria-labelledby="evidence-title">
        <div className="section-heading">
          <div><p className="eyebrow">OPERATING LOOP</p><h2 id="evidence-title">결과보다 증거를 남깁니다.</h2></div>
          <p className="section-note">모든 Phase는 같은 운영 루프를 반복합니다.</p>
        </div>
        <div className="operating-loop" aria-label="구축, 장애 발생, 진단, 복구, 문서화 순환">
          {['BUILD', 'BREAK', 'DIAGNOSE', 'RECOVER', 'DOCUMENT'].map((step, index) => (
            <div key={step}><span>{String(index + 1).padStart(2, '0')}</span><b>{step}</b>{index < 4 && <i>→</i>}</div>
          ))}
        </div>
        <div className="evidence-grid">
          <article><span>WORKLOG</span><strong>What I did</strong><p>명령, 설정, 관찰 결과와 배운 점을 자신의 언어로 기록합니다.</p></article>
          <article><span>INCIDENT</span><strong>How I diagnosed</strong><p>증상보다 조사 순서와 판단 근거, 복구 검증을 중심으로 남깁니다.</p></article>
          <article><span>ARCHITECTURE</span><strong>Why it is built this way</strong><p>요청 흐름, 신뢰 경계, 비용과 기술 선택의 이유를 설명합니다.</p></article>
        </div>
      </section>

      <section className="extensions" aria-labelledby="extensions-title">
        <div><p className="eyebrow">OPTIONAL EXTENSIONS</p><h2 id="extensions-title">핵심 여정 이후의 선택지</h2></div>
        <div className="extension-list">
          {extensions.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}
        </div>
      </section>

      <footer>
        <div><span className="brand-mark">CE</span><p>Build · Break · Diagnose · Recover · Document</p></div>
        <div className="source-links">
          <span>CURRICULUM REFERENCES</span>
          <a href="https://aws.amazon.com/training/restart/" target="_blank" rel="noreferrer">AWS re/Start ↗</a>
          <a href="https://kakaotechbootcamp.com/source/curriculum/ktb_curriculum_cloud_26.2.12.pdf" target="_blank" rel="noreferrer">Kakao Tech Bootcamp ↗</a>
        </div>
        <button className="reset-button" onClick={resetProgress}>진행도 초기화</button>
      </footer>
    </main>
  );
}
