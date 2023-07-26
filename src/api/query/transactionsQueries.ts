import { useQuery } from 'react-query';
import { useApiContext } from '../../context/apiContext';
import { TransactionsApi } from '../acs';

const queryKeys = {
    transactionsRequest: "TRANSACTIONS_REQUEST"
};

export const useTransactions = () => {
    const { apiKey } = useApiContext();
    return useQuery(queryKeys.transactionsRequest, () => TransactionsApi.getTransactions(apiKey).then((response) => response.data));
}