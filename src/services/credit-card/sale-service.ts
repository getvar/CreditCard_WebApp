import type { ApiResponse } from "../../models/generic-models";
import type { SaleAdd } from "../../models/sale-models";
import api from "../axios-util";

const controllerPart = '/Sale';

export const saleService = {
  async addUser(sale: SaleAdd): Promise<ApiResponse> {
    return await api.post(controllerPart, sale);
  },

  async getSales(): Promise<ApiResponse> {
    return await api.get(controllerPart);
  },

};

export default saleService;
