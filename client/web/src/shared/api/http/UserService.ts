import { UserDto } from "shared/api";
import $api from ".";
import { AxiosResponse } from 'axios';

export default class UserService {

    static fetchUsers(): Promise<AxiosResponse<UserDto[]>> {
        return $api.get<UserDto[]>('/users');
    }
}
