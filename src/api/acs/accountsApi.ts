import { Moment } from 'moment';
import instance from '../instance'
import { AxiosResponse } from 'axios';

export type AccountDTO = {
    id: string;
    mail: string;
    firstName: string;
    lastName: string;
    birtDay: Moment;
    gender: string;
    isAdmin: boolean;
}

export type CardDTO = {
    ownerId: string;
    cardNumber: string;
    balance: number;
}

export type ProfileDTO = {
    account: AccountDTO;
    card: CardDTO;
}

class AccountsApi {
    static async getProfile(token?: string) {
        return instance.get<ProfileDTO>(`/accounts/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
}

export default AccountsApi;