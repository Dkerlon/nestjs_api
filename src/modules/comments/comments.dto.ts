import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

//Create/Update
export class CommentRequestDTO {
  @ApiProperty({description: "Comment content"})
  @IsString()
  @IsNotEmpty()
  content!: string;
}

class CommentAuthor {
  @ApiProperty() id!: string
  @ApiProperty() name!: string
  @ApiProperty() email!: string
  @ApiProperty({nullable: true}) avatar!: string
  @ApiProperty() role!: string
}

//FindOne
export class CommentListItemDTO {
  @ApiProperty() id!: string
  @ApiProperty() content!: string
  @ApiProperty() taskId!: string
  @ApiProperty() authorId!: string
  @ApiProperty({format:'date-time'}) createdAt!: string
  @ApiProperty({format:'date-time'}) updatedAt!: string

  @ApiProperty({type: CommentAuthor})
  author!: CommentAuthor
}

class CommentTaskDTO {
  @ApiProperty() id!: string
  @ApiProperty() title!: string
  @ApiProperty() projectId!: string

}

//getAll
export class CommentFullDTO extends CommentListItemDTO {
  @ApiProperty({type: CommentTaskDTO})
  task!: CommentTaskDTO
}


