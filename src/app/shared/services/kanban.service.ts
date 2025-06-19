import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Column, Task, Board } from '../../core/models';

@Injectable({
  providedIn: 'root'
})
export class KanbanService {
  private http = inject(HttpClient);

  private _columns = signal<Column[]>([]);
  private _tasks = signal<Task[]>([]);

  readonly columns$ = this._columns.asReadonly();
  readonly tasks$ = this._tasks.asReadonly();

  // Computed signal that groups tasks under their respective columns
  readonly tasksByColumn = computed(() => {
    return this._columns().map(col => ({
      column: col,
      tasks: this._tasks().filter(t => t.columnId === col.id)
    }));
  });

  // Loads Kanban board data (columns and tasks) from a local JSON file
  loadFromJson(): Promise<void> {
    return this.http
      .get<Board>('/assets/kanban.json')
      .toPromise()
      .then((b: Board | undefined) => {
        if (!b) {
          throw new Error('Board data is undefined');
        }
        this._columns.set(b.columns);
        this._tasks.set(b.tasks);
      });
  }

  // Moves a task to a different column by updating its columnId
  moveTask(taskId: string, toColumnId: string) {
    this._tasks.update(ts =>
      ts.map(t => (t.id === taskId ? { ...t, columnId: toColumnId } : t))
    );
  }

  // Adds a new task to the task list
  addTask(task: Task) {
    this._tasks.update(ts => [...ts, task]);
  }

  // Deletes a task from the task list based on its id
  deleteTask(id: string) {
    this._tasks.update(ts => ts.filter(t => t.id !== id));
  }
}
