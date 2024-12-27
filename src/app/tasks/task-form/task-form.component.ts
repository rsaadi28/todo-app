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
  taskId: string | null = null;  // Para armazenar o ID da tarefa, se for edição

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute  // Para capturar o ID da tarefa
  ) { }

  ngOnInit(): void {
    // Inicializa o formulário
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });

    // Captura o ID da tarefa da URL (se estiver editando uma tarefa)
    this.taskId = this.route.snapshot.paramMap.get('id');

    if (this.taskId) {
      // Se for edição, carrega os dados da tarefa
      const taskToEdit = this.taskService.getTaskById(this.taskId);
      if (taskToEdit) {
        this.taskForm.patchValue({
          title: taskToEdit.title,
          description: taskToEdit.description
        });
      }
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;

      if (this.taskId) {
        // Caso seja edição, carrega a tarefa original
        const taskToEdit = this.taskService.getTaskById(this.taskId);
        if (taskToEdit) {
          const updatedTask: Task = {
            id: this.taskId,
            title: formValue.title,
            description: formValue.description,
            completed: taskToEdit.completed,  // Preserva o estado de 'completed'
            createdAt: taskToEdit.createdAt,  // Preserva a data de criação original
            updatedAt: new Date(),  // Atualiza a data de edição
          };

          this.taskService.updateTask(updatedTask);  // Atualiza a tarefa no serviço
        }
      } else {
        // Caso seja uma nova tarefa, cria uma nova tarefa
        const newTask: Task = {
          id: uuidv4(),
          title: formValue.title,
          description: formValue.description,
          completed: false,
          createdAt: new Date(),
          updatedAt: null,
        };

        this.taskService.addTask(newTask);  // Adiciona a nova tarefa
      }

      // Redireciona para a lista de tarefas após salvar
      this.router.navigate(['/tasks']);
    }
  }
}
