import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TaskService, Task } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  standalone: false
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  selectedFilter: 'all' | 'completed' | 'incomplete' = 'all'; // Filtro ativo

  constructor(private taskService: TaskService) { }

  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.taskService.tasks$
      .pipe(takeUntil(this.destroy$))
      .subscribe((tasks) => {
        this.tasks = tasks;
        this.filteredTasks = tasks;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  filterTasks(status: 'all' | 'completed' | 'incomplete') {
    this.selectedFilter = status; // Atualiza o filtro ativo

    if (status === 'all') {
      this.filteredTasks = this.tasks;
    } else {
      this.filteredTasks = this.tasks.filter((task) =>
        status === 'completed' ? task.completed : !task.completed
      );
    }
  }

  toggleComplete(id: string) {
    this.taskService.toggleComplete(id);
    this.filterTasks(this.selectedFilter);
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id);
  }
}
