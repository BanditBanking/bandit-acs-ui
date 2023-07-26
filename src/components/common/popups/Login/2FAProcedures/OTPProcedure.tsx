import styles from "./OTPProcedure.module.scss";
import { TextInput, FormButton } from "../../../forms/Fields";
import { AuthApi } from "../../../../../api/acs";
import { useState } from "react";
import { useApiContext } from "../../../../../context/apiContext";
import { SessionToken } from "../../../../../api/acs/authApi";
import { useOTPChallenge } from "../../../../../api/query/authQueries";

export type OTPProcedureProps = {
    onComplete: (credentials: SessionToken) => void;
}

export const OtpProcedure = ({ onComplete }: OTPProcedureProps) => {
    const { data: challenge } = useOTPChallenge();
    const [code, setChallengeCode] = useState<string>("");
    const { apiKey, setChallengeType } = useApiContext();

    const challengeAttempt = () => {
        AuthApi.otpChallengeAttemptAsync({ id: challenge?.id ?? "", code: code }, apiKey).then((response) => {
            if (response.data.isSuccess) {
                setChallengeType(0)
                onComplete(response.data.sessionToken)
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className={styles.main}>
            <p>1. Enter the following code in your OTP provider app</p>
            <span className={styles.challengeCode}>{challenge?.code}</span>
            <p>2. Complete the challenge using your card pin</p>
            <div className={styles.otpContainer}>
                <img className={styles.otpImage} src="otpCalc.png"></img>
            </div>
            <p>3. Enter the OTP response here:</p>
            <div className={styles.responseContainer}>
                <TextInput className={styles.responseField} name="otpResponse" noLabel onChange={setChallengeCode} />
            </div>
            <FormButton className={styles.completeBtn} name="Validate" onClick={challengeAttempt}>Challenge verification</FormButton>
        </div>
    );
};