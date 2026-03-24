import { IsNumberString, IsOptional } from 'class-validator'

export class queryPaginationDTO {
  @IsOptional()
  @IsNumberString()
  page?: string

  @IsOptional()
  @IsNumberString()
  size?: string
}

export interface PaginatedResponseDTO<T> extends queryPaginationDTO {
  data: T[]
  meta: {
    total: number,
    lastpage: number,
    currentpage: number,
    totalPerPage: number,
    prevPage: number | null,
    nextPage: number | null
  }
}
