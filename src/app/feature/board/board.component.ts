import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { KanbanService } from '../../shared/services/kanban.service';
import { Task } from '../../core/models';
import { LoadingIndicatorComponent } from '../../shared/components/loading-indicator/loading-indicator.component';

@Component({
  selector: 'app-board',
  imports: [CommonModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    LoadingIndicatorComponent,
    ReactiveFormsModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  private kanbanService = inject(KanbanService);
  private fb = inject(FormBuilder);

  loading = signal(true);
  groups = this.kanbanService.tasksByColumn;
  newTaskForm!: FormGroup;

  ngOnInit() {
    this.kanbanService.loadFromJson().then(() => this.loading.set(false));

    // initialize form with default column
    const cols = this.kanbanService.columns$();
    this.newTaskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      columnId: [cols.length ? cols[0].id : '', Validators.required]
    });
  }

  /** Add a new task if form is valid */
  addTask() {
    if (this.newTaskForm.invalid) return;
    const { title, description, columnId } = this.newTaskForm.value;
    const id = Date.now().toString();

    this.kanbanService.addTask({ id, columnId, title, description: description || undefined });
    this.newTaskForm.reset({ title: '', description: '', columnId });
  }

  /** Remove a task by id */
  deleteTask(id: string) {
    const ok = window.confirm('Are you sure you want to delete this task?');
    if (ok) {
      this.kanbanService.deleteTask(id);
    }
  }

  /** Handle drag-drop across columns */
  drop(event: CdkDragDrop<Task[]>, toColumnId: string) {
    const prev = event.previousContainer.data;
    const curr = event.container.data;

    if (event.previousContainer === event.container) {
      moveItemInArray(curr, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(prev, curr, event.previousIndex, event.currentIndex);
      const moved = curr[event.currentIndex];
      this.kanbanService.moveTask(moved.id, toColumnId);
    }
  }
}
