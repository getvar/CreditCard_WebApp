import type { ApiResponse } from "../../models/generic-models";
import api from "../axios-util";

const controllerPart = '/Master';

export const masterService = {
  async getIdentificationTypes(): Promise<ApiResponse> {
    return await api.get(`${controllerPart}/GetIdentificationTypes`);
  },
};

export default masterService;

