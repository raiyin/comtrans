import { LoginData, RegisterData } from "../types/auth";

const proto = 'https://';
const domain = 'localhost';
const port = '7121';

export const register = async (registerData: RegisterData) => {
    try {

        const requestURL = `${proto}${domain}:${port}/auth/register`;
        const request = new Request(requestURL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Options'
            },
            redirect: 'follow',
            body: JSON.stringify(registerData),
        });

        const response = await fetch(request);

        if (!response.ok) {
            return null;
        }

        return response.json();
    } catch (error) {
        return null;
    }
};

export const login = async (loginData: LoginData) => {
    try {

        const requestURL = `${proto}${domain}:${port}/auth/login`;
        const request = new Request(requestURL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Options'
            },
            redirect: 'follow',
            body: JSON.stringify(loginData),
        });

        const response = await fetch(request);

        if (!response.ok) {
            return null;
        }

        return response.json();
    } catch (error) {
        return null;
    }
};
