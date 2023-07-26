import { useQuery } from 'react-query';
import { useApiContext } from '../../context/apiContext';
import { AccountsApi } from '../acs';

const queryKeys = {
    profileRequest: "PROFILE_REQUEST"
};

export const useProfile = () => {
    const { apiKey } = useApiContext();
    return useQuery(queryKeys.profileRequest, () => AccountsApi.getProfile(apiKey).then((response) => response.data))
}