import { ICardData } from "./card-data.interface";

export interface IItemDetail {
  id: number;
  name: string;
  grade: string;
  refinement: number;
  cards: Array<ICardData>;
  price: string;
  currency: string;
}