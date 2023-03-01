import Item from "../../../domain/entity/Item";
import ItemRepository from "../../../domain/repository/itemRepository";

export default class ItemRepositoryDatabase implements ItemRepository {

  findById(idItem: number): Promise<Item> {
    throw new Error("Method not implemented.");
  }
}