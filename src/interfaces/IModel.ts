export interface IModel<T> {
  create(obj: T): Promise<T>,
  readAll(): Promise<T[] | []>,
  // readOne(id: string): Promise<T | null>,
  // update(id: string, obj: T): Promise<T | null>,
  // delete(id: string): Promise<T | null>,
}
