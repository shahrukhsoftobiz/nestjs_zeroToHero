import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
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
        getTasks(@Query() filterDto: GetTaskFilterDto, @GetUser() user:User,): Promise<Task[]> {
            return this.tasksService.getTasks(filterDto, user);
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
        getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task>{
            return this.tasksService.getTaskById(id, user);
        }

    // @Get('/:id')
    // getTaskById(@Param('id') id: string): Task {
    //     return this.tasksService.getTaskById(id)
    // }
        
        @Post()
        createTask(@Body() createTaskDto: CreateTaskDto, 
           @GetUser() user:User,): Promise<Task> {
            return this.tasksService.createTask(createTaskDto,user);
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
            @GetUser() user: User,
            @Body() updateTaskStatusDto: UpdateTaskStatusDto
        ): Promise<Task> {
            const {status} = updateTaskStatusDto;
            return this.tasksService.updateTaskStatus(id, status, user);
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
