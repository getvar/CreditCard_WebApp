
import type { CardAdd, CardEdit } from "../../models/card-models";
import type { ApiResponse } from "../../models/generic-models";
import api from "../axios-util";

const controllerPart = '/Card';

export const cardService = {
  async addCard(card: CardAdd): Promise<ApiResponse> {  
    return await api.post(controllerPart, card);
  },

  async getCards(): Promise<ApiResponse> {
    return await api.get(controllerPart);
  },

  async updateUser(card: CardEdit): Promise<ApiResponse> {
    return await api.put(controllerPart, card);
  },

  async deleteCard(cardId: string): Promise<ApiResponse> {
    return await api.delete(`${controllerPart}/${cardId}`);
  },
};

export default cardService;

