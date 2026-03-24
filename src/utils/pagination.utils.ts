import { PaginatedResponseDTO, queryPaginationDTO } from "src/common/dtos/query-pagination.dto"

const DEFAULT_PAGE_NUMBER = 1
const DEFAULT_PAGE_SIZE = 10

export const paginate = ( query?: queryPaginationDTO ): { skip: number, take: number } => {
  const size = Math.abs(Number(query?.size ?? DEFAULT_PAGE_SIZE))
  const page = Math.abs(Number(query?.page ?? DEFAULT_PAGE_NUMBER))

  return {
    skip: (page - 1) * size,
    take: size,
  }
}

export const paginateOutput = <T> (
  data: T[],
  query?: queryPaginationDTO,
  total?: number
) : PaginatedResponseDTO<T> => {
  const size = Math.abs(Number(query?.size ?? DEFAULT_PAGE_SIZE))
  const page = Math.abs(Number(query?.page ?? DEFAULT_PAGE_NUMBER))
  const lastPage = Math.ceil(total ? total / size : 0)
  const prevPage = page > 1 ? page - 1 : null
  const nextPage = page < lastPage ? page + 1 : null

  if(!data.length){
    return {
      data,
      meta: {
        total: 0,
        lastpage: 0,
        currentpage: page,
        totalPerPage: size,
        prevPage: null,
        nextPage: null,
      },
    }
  }

  return {
    data,
    meta: {
      total: total ?? 0,
      lastpage: lastPage,
      currentpage: page,
      totalPerPage: size,
      prevPage,
      nextPage,
    },
    page: page.toString(),
    size: size.toString(),
  }
}
