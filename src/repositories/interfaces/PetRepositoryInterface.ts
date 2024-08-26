import PetEntity from "../../models/pet/entity";
import Size from "../../models/pet/enums/size";

export default interface PetRepositoryInterface {
    createPet(pet:PetEntity): void | Promise<void>;
    readPets(): Promise<PetEntity[]> | Array<PetEntity>;
    updatePet(id: number, pet:PetEntity): Promise<{ success: boolean; message?: string }> | void;
    deletePet(id: number, pet:PetEntity): Promise<{ success: boolean; message?: string }> | void;
    adoptedPet(idPet: number, idAdopter: number): Promise<{ success: boolean; message?: string }>;
    searchByGeneric<Field extends keyof PetEntity>(field: Field, value: PetEntity[Field]): Promise<PetEntity[]> | PetEntity[];
}