import { Moment } from 'moment';
import instance from '../instance'
import { AxiosResponse } from 'axios';

export type LoginDTO = {
    mail: string;
    password: string;
};

export type SessionToken = {
    id: string,
    mail: string,
    token: string,
    expiration: Moment,
    role: string,
}

export type Challenge = {
    id: string,
    code: string
}

export type ChallengeAttemptResult = {
    id: string;
    isSuccess: boolean;
    remainingAttempts: number;
    sessionToken: SessionToken
}

class AuthApi {
    static async authenticateAsync(loginDTO?: LoginDTO) {
        return instance.post<LoginDTO, AxiosResponse<SessionToken>>(`/auth/login`, loginDTO, { withCredentials: true });
    }

    static async otpChallengeAttemptAsync(challenge: Challenge, token?: string) {
        return instance.post<Challenge, AxiosResponse<ChallengeAttemptResult>>(`/auth/login/2fa/otp`, challenge, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    static async otpChallengeRequestAsync(token?: string) {
        return instance.get<Challenge>(`/auth/login/2fa/otp`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
}

export default AuthApi;