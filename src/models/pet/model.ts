import Species from "./enums/species";

type PetModel = {
    id: number,
    name: string,
    species: Species,
    dateOfBirth: Date,
    adopted: boolean,
}

export default PetModel;