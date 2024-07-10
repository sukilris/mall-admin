export type BaseResponse<T = any> = {
  msg: string;
  code: number;
  data?: T;
};

export type ListRespData<T> = {
  list: T[];
};

export type PaginationInfo = {
  page: number;
  limit: number;
  total: number;
};

export type ListResponse<T> = BaseResponse<
  ListRespData<T> & { pagination?: PaginationInfo }
>;
