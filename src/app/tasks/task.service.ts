import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt?: Date | null;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor() {
    this.loadTasks();
  }

  private loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
    this.tasksSubject.next(tasks);
  }

  private saveTasks(tasks: Task[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.tasksSubject.next(tasks);
  }

  getTasks() {
    return this.tasks$.subscribe();  // Retorna a lista de tarefas
  }

  addTask(task: Task) {
    const tasks = [...this.tasksSubject.value, task];
    this.saveTasks(tasks);
  }

  // Método para recuperar uma tarefa por ID (para edição)
  getTaskById(id: string): Task | undefined {
    return this.tasksSubject.value.find(task => task.id === id);
  }


  updateTask(updatedTask: Task) {
    const tasks = this.tasksSubject.value.map((task) => {
      // Verifica se a tarefa está sendo atualizada
      if (task.id === updatedTask.id) {
        return {
          ...task,
          ...updatedTask,
          updatedAt: new Date()
        };
      }
      return task;  // Caso contrário, retorna a tarefa sem alterações
    });
    this.saveTasks(tasks);  // Salva as tarefas atualizadas no localStorage
  }

  deleteTask(id: string) {
    const tasks = this.tasksSubject.value.filter((task) => task.id !== id);
    this.saveTasks(tasks);
  }

  toggleComplete(id: string) {
    const tasks = this.tasksSubject.value.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.saveTasks(tasks);
  }
}
