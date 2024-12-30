import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService, Task } from '../task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
  standalone: false
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  taskId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });

    this.taskId = this.route.snapshot.paramMap.get('id');
    if (this.taskId) {
      this.loadTaskForEdit(this.taskId);
    }
  }

  private loadTaskForEdit(taskId: string): void {
    const taskToEdit = this.taskService.getTaskById(taskId);
    if (taskToEdit) {
      this.taskForm.patchValue({
        title: taskToEdit.title,
        description: taskToEdit.description,
      });
    } else {
      console.error(`Task with ID ${taskId} not found.`);
      this.router.navigate(['/tasks']);
    }
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const formValue = this.taskForm.value;
    const currentDate = new Date();

    const task: Task = this.taskId
      ? {
        ...this.taskService.getTaskById(this.taskId)!,
        title: formValue.title,
        description: formValue.description,
        updatedAt: currentDate,
      }
      : {
        id: uuidv4(),
        title: formValue.title,
        description: formValue.description,
        completed: false,
        createdAt: currentDate,
        updatedAt: null,
      };

    if (this.taskId) {
      this.taskService.updateTask(task);
    } else {
      this.taskService.addTask(task);
    }

    this.router.navigate(['/tasks']);
  }

  // Função para mensagens de erro
  getErrorMessage(controlName: string, messages: { [key: string]: string }): string | null {
    const control = this.taskForm.get(controlName);
    if (control?.touched || control?.dirty) {
      for (const error in messages) {
        if (control?.hasError(error)) {
          return messages[error];
        }
      }
    }
    return null;
  }

  // Métodos específicos para os campos
  get titleError(): string | null {
    return this.getErrorMessage('title', {
      required: 'O campo título não pode ficar vazio.',
      minlength: 'O título deve ter pelo menos 3 caracteres.',
    });
  }

  get descriptionError(): string | null {
    return this.getErrorMessage('description', {
      required: 'O campo descrição não pode ficar vazio.',
      minlength: 'A descrição deve ter pelo menos 10 caracteres.',
    });
  }
}
