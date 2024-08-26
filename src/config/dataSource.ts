import {DataSource} from "typeorm";
import PetEntity from "../models/pet/entity";
import AdopterEntity from "../models/adopter/entity";
import AddressEntity from "../models/address/entity";

export const AppDataSource: DataSource = new DataSource({
    type: "sqlite",
    database: "./src/config/database.sqlite",
    entities: [PetEntity, AdopterEntity, AddressEntity],
    synchronize: true,
});

