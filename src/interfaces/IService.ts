interface IService<T> {
  create(obj: T): Promise<T>,
  readAll(): Promise<T[] | []>,
}

export default IService;
