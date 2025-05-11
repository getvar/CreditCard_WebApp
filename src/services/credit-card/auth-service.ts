
import type { UserLogin } from "../../models/auth-models";
import type { ApiResponse } from "../../models/generic-models";
import api from "../axios-util";

const controllerPart = '/Auth';

export const authService = {
  async login(user: UserLogin): Promise<ApiResponse> {  
    return await api.post(controllerPart, user);
  },
};

export default authService;
