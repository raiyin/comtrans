import { RegisterData } from "../types/auth";

const proto = 'https://';
const domain = 'localhost';
const port = '7121';

export const register = async (registerData: RegisterData) => {
    const requestURL = `${proto}${domain}:${port}/auth/register`;
    const request = new Request(requestURL, {
        method: 'POST',
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

    if (response.ok) {
        return response.json();
    };

    const error = {
        status: response.status,
        customError: 'An error occurred, please refresh the page or try again later.',
    };
    throw error;
};
