import { Knex, knex } from 'knex';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import snakecaseKeys from 'snakecase-keys';
import camelcaseKeys from 'camelcase-keys';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly configService: ConfigService) {}

  private knexInstance: Knex;

  onModuleInit() {
    this.knexInstance = knex({
      client: 'pg',
      connection: {
        host: this.configService.get('SUPABASE_HOST'),
        port: this.configService.get('SUPABASE_PORT'),
        user: this.configService.get('SUPABASE_USER'),
        password: this.configService.get('SUPABASE_PASSWORD'),
        database: this.configService.get('SUPABASE_DB'),
        // ssl: { rejectUnauthorized: false },
      },
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        directory: './migrations',
      },
      seeds: {
        directory: './seeds',
      },
    });
  }

  get db() {
    return this.knexInstance;
  }

  async onModuleDestroy() {
    if (this.knexInstance) {
      await this.knexInstance.destroy();
    }
  }

  async create<T>(table: string, data: any): Promise<T> {
    const snake = snakecaseKeys(data);
    const [row] = await this.db(table).insert(snake).returning('*');
    return camelcaseKeys(row);
  }
  async get<T>(table: string, where: Record<string, any>): Promise<T[]> {
    const snakeWhere = snakecaseKeys(where);
    const rows = await this.db(table).where(snakeWhere);
    return rows.map((row) => camelcaseKeys(row));
  }
}
