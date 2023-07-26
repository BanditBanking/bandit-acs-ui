import { useQuery } from 'react-query';
import { useApiContext } from '../../context/apiContext';
import { AuthApi } from '../acs';

const queryKeys = {
    otpRequest: "OTP_REQUEST"
};

export const useOTPChallenge = () => {
    const { apiKey } = useApiContext();
    return useQuery(queryKeys.otpRequest, () => AuthApi.otpChallengeRequestAsync(apiKey).then((response) => response.data),
        { cacheTime: 60000, staleTime: 60000 })
}