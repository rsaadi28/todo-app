import { TestBed } from '@angular/core/testing';
import { TaskService, Task } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskService]
    });

    service = TestBed.inject(TaskService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy(); // Verifica se o serviço foi criado corretamente
  });

  it('should add a task', () => {
    const newTask: Task = {
      id: '1',
      title: 'New Task',
      description: 'This is a new task',
      completed: false,
      createdAt: new Date()
    };

    service.addTask(newTask); // Adiciona uma nova tarefa


  });

});
