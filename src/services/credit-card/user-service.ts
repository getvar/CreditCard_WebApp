import type { ApiResponse } from "../../models/generic-models";
import type { UserEdit, UserManage } from "../../models/user-models";
import api from "../axios-util";

const controllerPart = '/User';

export const userService = {
  async addUser(user: UserManage): Promise<ApiResponse> {
    return await api.post(controllerPart, user);
  },

  async getUser(): Promise<ApiResponse> {
    return await api.get(controllerPart);
  },

  async updateUser(user: UserEdit): Promise<ApiResponse> {
    return await api.put(controllerPart, user);
  },
};

export default userService;

