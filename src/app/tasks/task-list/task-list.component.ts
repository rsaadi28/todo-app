import { Component, OnInit } from '@angular/core';
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

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
      this.filteredTasks = tasks;
    });
  }

  filterTasks(status: 'all' | 'completed' | 'incomplete') {
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
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id);
  }
}
