import { useState } from "react";
import { AuthGate } from "@/components/AuthGate";
import { PanelShell } from "@/components/layout/PanelShell";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "done";
  priority: "low" | "medium" | "high" | "urgent";
  due_date: string;
  assigned_to: string;
}

interface CalendarEntry {
  id: string;
  title: string;
  platform: "linkedin" | "twitter" | "blog" | "newsletter";
  scheduled_date: string;
  status: "draft" | "scheduled" | "published";
}

const PRIORITY_COLORS: Record<string, string> = {
  low: "#3B82F6", medium: "#F59E0B", high: "#EF4444", urgent: "#EC4899",
};
const PLATFORM_COLORS: Record<string, string> = {
  linkedin: "#3B82F6", twitter: "#06B6D4", blog: "#A78BFA", newsletter: "#22C55E",
};
const STATUS_LABELS: Record<string, string> = {
  todo: "A Faire", in_progress: "En Cours", done: "Fait",
};

const SEED_TASKS: Task[] = [
  { id: "t1", title: "Finaliser proposal BICICI Phase 2", description: "Mise a jour scope + pricing", status: "in_progress", priority: "urgent", due_date: "2026-04-12", assigned_to: "KH" },
  { id: "t2", title: "Review Wave RFP response", description: "Revue strategie + equipe", status: "todo", priority: "high", due_date: "2026-04-18", assigned_to: "AT" },
  { id: "t3", title: "Onboarding nouveau consultant", description: "Setup outils + formation StrateisOS", status: "todo", priority: "medium", due_date: "2026-04-20", assigned_to: "KH" },
  { id: "t4", title: "Dashboard monitoring KPIs Q1", description: "Rapport KPIs trimestriel", status: "in_progress", priority: "high", due_date: "2026-04-15", assigned_to: "KH" },
  { id: "t5", title: "Deploiement IdeeLab v3.2", description: "Nouvelles fonctionnalites IA", status: "done", priority: "medium", due_date: "2026-04-08", assigned_to: "AT" },
  { id: "t6", title: "Audit securite Supabase", description: "RLS policies review", status: "done", priority: "high", due_date: "2026-04-05", assigned_to: "KH" },
  { id: "t7", title: "Preparer pitch AfricArena", description: "Deck + demo IdeeLab", status: "todo", priority: "urgent", due_date: "2026-04-13", assigned_to: "AT" },
];

const SEED_CALENDAR: CalendarEntry[] = [
  { id: "c1", title: "Africa Tech Ecosystem Q1 Review", platform: "linkedin", scheduled_date: "2026-04-11", status: "scheduled" },
  { id: "c2", title: "Why fintech is booming in WAEMU", platform: "linkedin", scheduled_date: "2026-04-14", status: "draft" },
  { id: "c3", title: "Thread: 5 lessons from consulting in Africa", platform: "twitter", scheduled_date: "2026-04-15", status: "draft" },
  { id: "c4", title: "IdeeLab monthly product update", platform: "blog", scheduled_date: "2026-04-18", status: "draft" },
  { id: "c5", title: "Strateis newsletter #12", platform: "newsletter", scheduled_date: "2026-04-20", status: "draft" },
];

function KanbanColumn({ title, tasks, color }: { title: string; tasks: Task[]; color: string }) {
  return (
    <div className="flex flex-col min-h-0">
      <div className="flex items-center gap-2 mb-1.5 px-1">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
        <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-text-dim">{title}</span>
        <span className="font-mono text-[9px] text-text-muted ml-auto">{tasks.length}</span>
      </div>
      <div className="flex-1 overflow-y-auto space-y-1">
        {tasks.map((t) => (
          <div key={t.id} className="bg-bg-card border border-border-subtle rounded p-2 hover:border-gold/30 transition-colors">
            <div className="flex items-start gap-1.5">
              <span
                className="w-1 h-1 rounded-full shrink-0 mt-1"
                style={{ background: PRIORITY_COLORS[t.priority] }}
              />
              <span className="font-sans text-[11px] text-text leading-snug">{t.title}</span>
            </div>
            <div className="flex items-center gap-2 mt-1.5 ml-2.5">
              <span
                className="font-mono text-[7px] font-bold uppercase px-1 py-0.5 rounded"
                style={{ color: PRIORITY_COLORS[t.priority], background: `${PRIORITY_COLORS[t.priority]}12`, border: `1px solid ${PRIORITY_COLORS[t.priority]}30` }}
              >
                {t.priority}
              </span>
              <span className="font-mono text-[8px] text-text-muted">{t.due_date.slice(5)}</span>
              <span className="font-mono text-[8px] text-text-dim ml-auto">{t.assigned_to}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OperationsContent() {
  const [tasks] = useState<Task[]>(SEED_TASKS);

  const todo = tasks.filter((t) => t.status === "todo");
  const inProgress = tasks.filter((t) => t.status === "in_progress");
  const done = tasks.filter((t) => t.status === "done");

  return (
    <div className="flex flex-col gap-1.5" style={{ padding: "6px 8px" }}>
      {/* Quick Actions */}
      <div className="flex gap-1.5">
        {[
          { label: "New Task", icon: "➕", color: "#22C55E" },
          { label: "New Note", icon: "📝", color: "#D4A853" },
          { label: "New Brief", icon: "📄", color: "#3B82F6" },
          { label: "New Deliverable", icon: "📦", color: "#A78BFA" },
        ].map((a) => (
          <button
            key={a.label}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded bg-bg-panel border border-border hover:border-gold/30 hover:bg-bg-hover transition-all"
          >
            <span className="text-xs">{a.icon}</span>
            <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-text-dim">{a.label}</span>
          </button>
        ))}
      </div>

      {/* Kanban */}
      <PanelShell title="Task Board" icon="📌" count={tasks.length}>
        <div className="grid grid-cols-3 gap-1.5 p-2 min-h-[300px]">
          <KanbanColumn title={STATUS_LABELS.todo} tasks={todo} color="#F59E0B" />
          <KanbanColumn title={STATUS_LABELS.in_progress} tasks={inProgress} color="#3B82F6" />
          <KanbanColumn title={STATUS_LABELS.done} tasks={done} color="#22C55E" />
        </div>
      </PanelShell>

      {/* Editorial Calendar */}
      <PanelShell title="Editorial Calendar" icon="📅" count={SEED_CALENDAR.length}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {["Date", "Title", "Platform", "Status"].map((h) => (
                  <th key={h} className="font-mono text-[8px] text-text-dim uppercase tracking-wider text-left px-3 py-1.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SEED_CALENDAR.map((entry) => (
                <tr key={entry.id} className="border-b border-border-subtle hover:bg-bg-hover transition-colors">
                  <td className="font-mono text-[9px] text-text-dim px-3 py-2">{entry.scheduled_date.slice(5)}</td>
                  <td className="font-sans text-[11px] text-text px-3 py-2">{entry.title}</td>
                  <td className="px-3 py-2">
                    <span
                      className="font-mono text-[8px] font-bold uppercase px-1.5 py-0.5 rounded"
                      style={{ color: PLATFORM_COLORS[entry.platform], background: `${PLATFORM_COLORS[entry.platform]}12`, border: `1px solid ${PLATFORM_COLORS[entry.platform]}30` }}
                    >
                      {entry.platform}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <span className={`font-mono text-[8px] font-bold uppercase ${entry.status === "published" ? "text-green" : entry.status === "scheduled" ? "text-blue" : "text-text-dim"}`}>
                      {entry.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PanelShell>
    </div>
  );
}

export function OperationsPage() {
  return (
    <AuthGate>
      <OperationsContent />
    </AuthGate>
  );
}
