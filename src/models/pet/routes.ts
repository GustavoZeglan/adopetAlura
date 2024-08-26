import express from "express";
import { PetController } from "./controller";
import { PetRepository } from "../../repositories/PetRepository";
import { AdopterRepository } from "../../repositories/AdopterRepository";
import { AppDataSource } from "../../config/dataSource";

const router = express.Router();
const petRepository = new PetRepository(AppDataSource.getRepository("PetEntity"), AppDataSource.getRepository("AdopterEntity"))
const petController = new PetController(petRepository);

router.get("/", (req, res) => petController.readPets(req, res));
router.post("/", (req, res) => petController.createPet(req, res));
router.put("/:id", (req, res) => petController.updatePet(req, res));
router.delete("/:id", (req, res) => petController.deletePet(req, res));
router.put("/:pet_id/:adopter_id", (req, res) => petController.adoptPet(req, res));
router.get("/filter", (req, res) => petController.searchByGeneric(req, res));

export default router;