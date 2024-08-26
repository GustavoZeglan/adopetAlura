import PetRepositoryInterface from "./interfaces/PetRepositoryInterface";
import {Repository} from "typeorm";
import PetEntity from "../models/pet/entity";
import AdopterEntity from "../models/adopter/entity";

export class PetRepository  implements  PetRepositoryInterface {
    private petRepository: Repository<PetEntity>;
    private adopterRepository: Repository<AdopterEntity>;

    constructor(petRepository: Repository<PetEntity>, adopterRepository: Repository<AdopterEntity>){
        this.petRepository = petRepository;
        this.adopterRepository = adopterRepository;
    }

    createPet(pet: PetEntity): void {
        this.petRepository.save(pet);
    }

    async deletePet(id: number): Promise<{ success: boolean; message?: string }> {
        try {
            const petToRemove = await this.petRepository.findOne({ where: { id } });
      
            if (!petToRemove) {
              return { success: false, message: "Pet not find." };
            }
      
            await this.petRepository.remove(petToRemove);
      
            return { success: true };
          } catch (error) {
            return {
              success: false,
              message: "An error occurred when try to delete the pet.",
            };
          }
    }

    async readPets(): Promise<PetEntity[]> {
        const pets = await this.petRepository.find();
        return pets;
    }

    async updatePet(id: number, newData: PetEntity): Promise<{ success: boolean; message?: string }> {
        try {
            const petToUpdate = await this.petRepository.findOne({ where: { id } });
      
            if (!petToUpdate) {
              return { success: false, message: "Pet not find" };
            }
      
            Object.assign(petToUpdate, newData);
      
            await this.petRepository.save(petToUpdate);
      
            return { success: true };
          } catch (error) {
            console.log(error);
            return {
              success: false,
              message: "An error occured when updating the pet.",
            };
          }
    }

    async adoptedPet(idPet: number, idAdopter: number): Promise<{ success: boolean; message?: string }> {
      const pet = await this.petRepository.findOne({ where: { id: idPet } });
      if (!pet) {
        return { success: false, message: "Pet not find" };
      }
    
      const adotante = await this.adopterRepository.findOne({ where: { id: idAdopter }});
      
      if (!adotante) {
        return { success: false, message: "Adopter not find." };
      }
    
      pet.adopter = adotante;
      pet.adopted = true;
      await this.petRepository.save(pet);
      return { success: true };
    }

    async searchByGeneric<Field extends keyof PetEntity>(field: Field, value: PetEntity[Field]): Promise<PetEntity[]> {
      const pets = await this.petRepository.find({where: {[field]:value}})
      return pets;
    }

}