import { Model, ModelStatic, FindOptions, CreateOptions, UpdateOptions, DestroyOptions } from 'sequelize';

export class BaseRepository<T extends Model> {
  protected model: ModelStatic<T>;

  constructor(model: ModelStatic<T>) {
    this.model = model;
  }

  async findAll(options?: FindOptions): Promise<T[]> {
    return await this.model.findAll(options);
  }

  async findById(id: number): Promise<T | null> {
    return await this.model.findByPk(id);
  }

  async findOne(options: FindOptions): Promise<T | null> {
    return await this.model.findOne(options);
  }

  async create(data: any, options?: CreateOptions): Promise<T> {
    return await this.model.create(data, options);
  }

  async update(id: number, data: any): Promise<[number, T[]]> {
    return await this.model.update(data, {
      where: { id } as any,
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    return await this.model.destroy({
      where: { id } as any,
    });
  }
}