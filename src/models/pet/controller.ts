import {Request, Response} from "express";
import Species from "./enums/species";
import {PetRepository} from "../../repositories/PetRepository";
import PetEntity from "./entity";
import Size from "./enums/size";

export class PetController {

    constructor(private repository: PetRepository) {}

    createPet = (req: Request, res: Response) => {
        const {name, species, size, dateOfBirth, adopted} = <PetEntity>req.body;

        if (!Object.values(Species).includes(species)) {
            return res.status(400).json("Invalid species");
        }

        if (size && !(size in Size)) {
            return res.status(400).json("Invalid size");
        }

        const newPet: PetEntity = new PetEntity(name, species, dateOfBirth, adopted, size);
        this.repository.createPet(newPet);
        return res.status(201).json(newPet);
    }

    readPets = async (req: Request, res: Response) => {
        const petsList = await this.repository.readPets();
        return res.status(200).json(petsList);
    }

    updatePet = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { success, message } = await this.repository.updatePet(
            Number(id),
            req.body as PetEntity
        );

        if (!success) {
            return res.status(404).json({ message });
        }
        return res.sendStatus(204);
    }

    deletePet = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { success, message } = await this.repository.deletePet(Number(id));

        if (!success) {
            return res.status(404).json({ message });
        }
        return res.sendStatus(204);
    }

    async adoptPet(req: Request, res: Response) {
        const { pet_id, adopter_id } = req.params;
      
        const { success, message } = await this.repository.adoptedPet(
          Number(pet_id),
          Number(adopter_id)
        );
      
        if (!success) {
          return res.status(404).json({ message });
        }
        return res.sendStatus(204);
      }
    
    async searchByGeneric(req: Request, res: Response) {
        const {field, value} = req.query;
        
        const pets = await this.repository.searchByGeneric(field as keyof PetEntity, value as string);
    
        return res.status(200).json(pets);
    }

}