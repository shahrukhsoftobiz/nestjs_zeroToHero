import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../task.status.enum";

export class GetTaskFilterDto {
    @IsOptional()
    //update validation
    @IsEnum(TaskStatus)
    status? : TaskStatus;

    @IsOptional()

    //update validation
    @IsString()
    search? : string;
}