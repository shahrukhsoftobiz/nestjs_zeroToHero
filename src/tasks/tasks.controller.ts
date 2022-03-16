import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Task } from './dto/task.entity';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TasksService} from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService) {}
        @Get()
        getTasks(@Query() filterDto: GetTaskFilterDto): Promise<Task[]> {
            return this.tasksService.getTasks(filterDto);
        }

    // @Get()
    // getTasks( @Query()  filterDto: GetTaskFilterDto): Task [] {
    //     //if we have any filter defined, call tasksService.getTasksWilFilters
    //     //otherwise just get all task

    //     if (Object.keys(filterDto).length) {

    //         return this.tasksService.getTasksWithFilters(filterDto);
    //     } else {
    //         return this.tasksService.getAllTasks();
    //     }
        
    // }

    // typeorm code
        @Get('/:id')
        getTaskById(@Param('id') id: string): Promise<Task>{
            return this.tasksService.getTaskById(id);
        }

    // @Get('/:id')
    // getTaskById(@Param('id') id: string): Task {
    //     return this.tasksService.getTaskById(id)
    // }
        
        @Post()
        createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
            return this.tasksService.createTask(createTaskDto);
        }
    // @Post()
    // createTask(@Body() createTaskDto: CreateTaskDto) : Task {
    //     return this.tasksService.createTask(createTaskDto);

    // }

        @Delete('/:id')
        deleteTask(@Param('id')id: string) : Promise<void> {
            return this.tasksService.deleteTask(id);
        }

    // @Delete('/:id')
    // deleteTask(@Param('id') id: string) : void {
    //     this.tasksService.deleteTask(id);
    // }

        @Patch('/:id/status')
        updateTaskStatus(
            @Param('id') id: string,
            @Body() updateTaskStatusDto: UpdateTaskStatusDto,
        ): Promise<Task> {
            const {status} = updateTaskStatusDto;
            return this.tasksService.updateTaskStatus(id, status);
        }

    // @Patch('/:id/status')
    // updateTaskStatus(
    //     @Param('id') id: string,
    //     //update validation
    //     @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    // ): Task {
    //     const {status} = updateTaskStatusDto;
    //     return this.tasksService.updateTaskStatus(id, status);

    }
