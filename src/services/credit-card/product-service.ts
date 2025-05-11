import type { ApiResponse } from "../../models/generic-models";
import api from "../axios-util";

const controllerPart = '/Product';

export const productService = {
  async getProducts(): Promise<ApiResponse> {
    return await api.get(controllerPart);
  },
};

export default productService;
