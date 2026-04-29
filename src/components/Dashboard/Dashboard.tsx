import { useRef } from 'react';
import type { DashboardProps } from '../../types';
import { TaskFilter } from '../TaskFilter/TaskFilter';
import { TaskForm } from '../TaskForm/TaskForm';
import { TaskList } from '../TaskList/TaskList';

export const Dashboard = ({
	tasks,
	stats,
	filters,
	sort,
	editingTask,
	theme,
	onThemeToggle,
	onSubmitTask,
	onCancelEdit,
	onEditTask,
	onStatusChange,
	onDeleteTask,
	onMoveUp,
	onMoveDown,
	onFilterChange,
	onSortChange,
	onClearFilters,
	onExport,
	onImport,
}: DashboardProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<main className="min-h-screen bg-gradient-to-br from-slate-100 via-cyan-50 to-emerald-100 p-4 transition-colors dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
			<div className="mx-auto max-w-6xl space-y-4">
				<header className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
					<div className="flex flex-wrap items-center justify-between gap-3">
						<div>
							<h1 className="text-2xl font-bold text-slate-900 dark:text-white">Task Dashboard</h1>
							<p className="text-sm text-slate-600 dark:text-slate-300">Plan work, track status, and stay focused.</p>
						</div>
						<div className="flex flex-wrap gap-2">
							<button
								type="button"
								onClick={onThemeToggle}
								className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 dark:border-slate-600 dark:text-slate-200"
							>
								Theme: {theme}
							</button>
							<button
								type="button"
								onClick={onExport}
								className="rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white hover:bg-teal-700"
							>
								Export
							</button>
							<button
								type="button"
								onClick={() => inputRef.current?.click()}
								className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
							>
								Import
							</button>
							<input
								ref={inputRef}
								type="file"
								accept="application/json"
								className="hidden"
								onChange={(e) => {
									const file = e.target.files?.[0];
									if (file) {
										onImport(file);
									}
									e.currentTarget.value = '';
								}}
							/>
						</div>
					</div>
				</header>

				<section className="grid grid-cols-2 gap-3 md:grid-cols-5">
					<StatCard label="Total" value={stats.total} />
					<StatCard label="Pending" value={stats.pending} />
					<StatCard label="In Progress" value={stats.inProgress} />
					<StatCard label="Completed" value={stats.completed} />
					<StatCard label="Overdue" value={stats.overdue} />
				</section>

				<TaskFilter
					filters={filters}
					sort={sort}
					onFilterChange={onFilterChange}
					onSortChange={onSortChange}
					onClearFilters={onClearFilters}
				/>

				<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
					<div className="lg:col-span-1">
						<TaskForm
							initialValues={editingTask ?? undefined}
							onSubmit={onSubmitTask}
							onCancel={editingTask ? onCancelEdit : undefined}
						/>
					</div>
					<div className="lg:col-span-2">
						<TaskList
							tasks={tasks}
							onStatusChange={onStatusChange}
							onDelete={onDeleteTask}
							onEdit={onEditTask}
							onMoveUp={onMoveUp}
							onMoveDown={onMoveDown}
						/>
					</div>
				</div>
			</div>
		</main>
	);
};

const StatCard = ({ label, value }: { label: string; value: number }) => {
	return (
		<article className="rounded-xl border border-white/70 bg-white/90 p-3 shadow-sm transition hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-900">
			<p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</p>
			<p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
		</article>
	);
};
