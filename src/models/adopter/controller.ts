import { AdopterRepository } from "../../repositories/AdopterRepository";
import AddressEntity from "../address/entity";
import AdopterEntity from "./entity";
import { Request, Response } from "express";


export class AdopterController {

    constructor(private repository: AdopterRepository) {}

    async createAdopter(req: Request, res: Response) {
        try {
        const { name, password, phone, photo, address } = <AdopterEntity>req.body;
    
        const newAdopter = new AdopterEntity(name, password, phone, photo, address);
    
        await this.repository.createAdopter(newAdopter);
        return res.status(201).json(newAdopter);
        } catch (error) {
        return res.status(500).json({ error: 'Error when create adopter.' });
        }
    }

    async updateAdopter(req: Request, res: Response) {
        const { id } = req.params;
        const { success, message } = await this.repository.updateAdopter(Number(id), req.body as AdopterEntity);
    
        if (!success) {
          return res.status(404).json({ message });
        }
    
        return res.sendStatus(204);
      }
    
      async readAdopters(req: Request, res: Response) {
        const listaDeAdotantes = await this.repository.readAdopters();
        return res.json(listaDeAdotantes);
      }
    
      async deleteAdopter(req: Request, res: Response) {
        const { id } = req.params;
    
        const { success, message } = await this.repository.deleteAdopter(
          Number(id)
        );
    
        if (!success) {
          return res.status(404).json({ message });
        }
        return res.sendStatus(204);
    
    }

    async updateAdopterAddress(req: Request, res: Response) {
      const { id } = req.params;

      const {success, message} = await this.repository.updateAdopterAddress(Number(id), req.body as AddressEntity);

      if (!success) {
        return res.status(404).json(message);
      }


      return res.sendStatus(204);
    }

}