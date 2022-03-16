import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {v4 as uuid} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Task } from './dto/task.entity';
import { TasksRepository } from './dto/tasks.repository';
import { TaskStatus } from './task.status.enum';


@Injectable()
export class TasksService {
    constructor (
        @InjectRepository(TasksRepository)
        private taskRepositoty: TasksRepository,
    ){}
        getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
            return this.taskRepositoty.getTasks(filterDto);

        }
    // private tasks: Task [] = [];

//     getAllTasks() : Task[] {
//         return this.tasks;
//     }

//     //filter
//     getTasksWithFilters(filterDto : GetTaskFilterDto) : Task[] {
//         const {status, search} = filterDto;

//         // define a temporary array to hold the result
//         let tasks = this.getAllTasks();

//         //do something with status
//         if (status) {
//             tasks = tasks.filter((task)=> task.status === status);
//         }


//         // do something with search
//         if (search) {
//             tasks = tasks.filter((task) =>{
//                 if (task.title.includes(search) || task.description.includes(search)) {
//                     return true;
//                 }

//                 return false;

//             });
//         }
//         //return final result
//         return tasks;

//     }

        async getTaskById(id: string) : Promise<Task> {
            const found = await this.taskRepositoty.findOne(id)

            if (!found) {
                            throw new NotFoundException(`task with "${id}" not foun`);

            }
            return found;

        }


//     getTaskById(id: string): Task {
//         //try to get task
//         const found =  this.tasks.find((task) => task.id === id);

//         // if not found, throw an error (404 not found)
//         if (!found) {
//             throw new NotFoundException(`task with "${id}" not foun`);

//         }

//         //otherwise, return the found task

//         return found;
        

//     }

        createTask(createTaskDto: CreateTaskDto): Promise<Task> {
         return this.taskRepositoty.createTask(createTaskDto);
        }  

//     createTask(createTaskDto: CreateTaskDto): Task {
//         const {title, description} = createTaskDto;
//         const task: Task = {
//            id:uuid(),
//            title,
//            description,
//            status : TaskStatus.OPEN,
//         };

//         this.tasks.push(task);
//         return task;
//     }

        async deleteTask(id: string): Promise <void> {
            const result =  await this.taskRepositoty.delete(id);
            // await this.taskRepositoty.delete([]);
            if (result.affected === 0 ) {
                throw new NotFoundException(`Task with ID "${id}" not found`);
            } 
        }

//    deleteTask(id: string): void {
//        const found = this.getTaskById(id)
//        this.tasks =  this.tasks.filter((task) => task.id !==found.id);

//    }
        async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
            const task = await this.getTaskById(id);

            task.status = status;
            await this.taskRepositoty.save(task);
            return task;
            


        }

//    updateTaskStatus(id: string , status: TaskStatus) {
//        const task = this.getTaskById(id);
//        task.status = status;
//        return task;
//    }
}
