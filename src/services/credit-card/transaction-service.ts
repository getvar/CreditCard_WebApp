import type { ApiResponse } from "../../models/generic-models";
import api from "../axios-util";

const controllerPart = '/Transaction';

export const transactionService = {
  async getTransactions(): Promise<ApiResponse> {
    return await api.get(controllerPart);
  },
};

export default transactionService;

