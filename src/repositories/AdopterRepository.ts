import AdopterEntity from "../models/adopter/entity";
import {Repository} from "typeorm";
import AdopterRepositoryInterface from "./interfaces/AdopterRepositoryInterface";
import AddressEntity from "../models/address/entity";

export class AdopterRepository implements AdopterRepositoryInterface {
    private repository: Repository<AdopterEntity>;

    constructor(repository: Repository<AdopterEntity>){
        this.repository = repository;
    }

    async createAdopter(adopter: AdopterEntity): Promise<void> {
        await this.repository.save(adopter);
    } 

    async readAdopters(): Promise<AdopterEntity[]> {
        return await this.repository.find();
    }
        
    async updateAdopter(id: number, newData: AdopterEntity): Promise<{ success: boolean; message?: string }> {
        try {
            const adopterToUpdate = await this.repository.findOne({ where: { id } });

            if (!adopterToUpdate) {
            return { success: false, message: "Adopter not find" };
            }

            Object.assign(adopterToUpdate, newData);

            await this.repository.save(adopterToUpdate);

            return { success: true };
        } catch (error) {
            console.log(error);
            return { success: false, message: "An error occurred when try to update adopter." };
        }
    }

    async deleteAdopter(id: number): Promise<{ success: boolean; message?: string }> {
        try {
            const adopterToRemove = await this.repository.findOne({ where: { id } });

            if (!adopterToRemove) {
            return { success: false, message: "Adopter not find." };
            }

            await this.repository.remove(adopterToRemove);

            return { success: true };
        } catch (error) {
            return { success: false, message: "An error occurred when try to delete adopter." };
        } 
    }

    async updateAdopterAddress(idAdopter: number, address: AddressEntity): Promise<{ success: boolean; message?: string; }> {
        const adopter = await this.repository.findOne({where: {id: idAdopter}});

        if (!adopter) {
            return { success: false, message: "Adopter not find." };
        }

        const newAddress = new AddressEntity(address.city, address.state);
        adopter.address = newAddress;
        await this.repository.save(adopter);
        return { success: true};
    }

}
  