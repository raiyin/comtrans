import $api from "../http";
import { AxiosResponse } from 'axios';
import { UserDto } from "../types/auth";

export default class UserService {

    static fetchUsers(): Promise<AxiosResponse<UserDto[]>> {
        return $api.get<UserDto[]>('/users');
    }
}
