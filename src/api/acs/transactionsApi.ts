import instance from '../instance'
import { AxiosResponse } from 'axios';

export type TransactionRequestDTO = {
    merchantId?: string;
    merchantName?: string;
    activitySector?: string;
    amount?: number;
    challengeType?: number;
    communication?: string;
}

export type TransactionDTO = {
    transactionId: string;
    merchantId: string;
    merchantName: string;
    amount?: number;
    requestTime?: string;
    status: number;
    challengeType: number;
}

class TransactionsApi {
    static async transactionRequestAsync(requestDTO?: TransactionRequestDTO, token?: string) {
        return instance.post<TransactionRequestDTO, AxiosResponse<string>>(`/transactions/request`, requestDTO, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    static async getTransactions(token?: string) {
        return instance.get<TransactionDTO[]>(`/transactions`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
}

export default TransactionsApi;