import AdopterEntity from "../../models/adopter/entity";
import AddressEntity from "../../models/address/entity";

export default interface AdopterRepositoryInterface {
  createAdopter(adopter: AdopterEntity): void | Promise<void>;
  readAdopters(): AdopterEntity[] | Promise<AdopterEntity[]>;
  updateAdopter(id: number, adopter: AdopterEntity): Promise<{ success: boolean; message?: string }> | void;
  deleteAdopter(id: number): Promise<{ success: boolean; message?: string }> | void;
  updateAdopterAddress(idAdopter: number, address: AddressEntity): Promise<{ success: boolean; message?: string }>;
}
