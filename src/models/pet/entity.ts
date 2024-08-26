import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import Species from "./enums/species";
import Size from "./enums/size";
import AdopterEntity from "../adopter/entity";


@Entity()
export default class PetEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    name: string;
    @Column()
    species: Species;
    @Column({nullable: true})
    size?: Size;
    @Column()
    dateOfBirth: Date;
    @Column()
    adopted: boolean;
    @ManyToOne(() => AdopterEntity, adopter => adopter.pets)
    adopter!: AdopterEntity;

    constructor(name: string, species: Species, dateOfBirth: Date, adopeted: boolean, size?: Size) {
        this.name = name;
        this.species = species;
        this.dateOfBirth = dateOfBirth;
        this.adopted = adopeted;
        this.size = size;
    }

}