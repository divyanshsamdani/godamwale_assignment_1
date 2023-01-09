import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'root',
        database: 'warehouse',
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
      
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;