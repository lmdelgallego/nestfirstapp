import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { v4 } from 'uuid';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  private tasks: Array<Task> = [
    {
      id: '1',
      title: 'Task Title',
      description: 'Task Description',
      status: TaskStatus.PENDING,
      createAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  getAllTasks() {
    return this.tasks;
  }

  getTaskById(id: string) {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  createTask(title: string, description: string) {
    const dateCreated = new Date().toISOString();
    const task: Task = {
      id: v4(),
      title,
      description,
      status: TaskStatus.PENDING,
      createAt: dateCreated,
      updatedAt: dateCreated,
    };

    this.tasks.push(task);
    return task;
  }
  updateTask(id: string, updateFields: UpdateTaskDto): Task {
    const task = this.getTaskById(id);
    const newTask = Object.assign(task, updateFields);
    newTask.updatedAt = new Date().toISOString();
    this.tasks = this.tasks.map((task) => (task.id === id ? newTask : task));
    return newTask;
  }
  deleteTask(id: string) {
    const task = this.getTaskById(id);
    if (!task) {
      throw new Error('Task not found');
    }
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return task;
  }
}
