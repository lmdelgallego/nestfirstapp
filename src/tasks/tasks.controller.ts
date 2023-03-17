import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private service: TasksService) {}

  @Get()
  getAllTasks() {
    return this.service.getAllTasks();
  }

  @Post()
  createTask(@Body() newTask: CreateTaskDto): Task {
    return this.service.createTask(newTask.title, newTask.description);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    // validate id
    return this.service.deleteTask(id);
  }

  @Patch(':id')
  updateTask(@Param('id') id: string, @Body() updateTask: UpdateTaskDto) {
    return this.service.updateTask(id, updateTask);
  }
}
