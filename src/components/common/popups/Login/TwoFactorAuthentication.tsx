import { useState } from "react";
import styles from "./TwoFactorAuthentication.module.scss";
import cn from 'classnames';
import { OtpProcedure } from "./2FAProcedures/OTPProcedure";
import { useApiContext } from "../../../../context/apiContext";
import { useLayoutContext } from "../../../../context/layoutContext";
import { SessionToken } from "../../../../api/acs/authApi";

export const TwoFactorAuthentication = () => {
    const [procedure, setProcedure] = useState<"OTP" | "SMS" | "Mail" | "ID">("OTP");
    const { setApiKey, setIsConnected, setUsername } = useApiContext();
    const { setLoginPopupActive } = useLayoutContext();


    const onComplete = (sessionToken: SessionToken) => {
        setApiKey(sessionToken.token);
        setIsConnected(true);
        setUsername(sessionToken.mail);
        setLoginPopupActive(false);
    }

    return (
        <div className={styles.main}>
            <h1>Two-Factor Authentication</h1>
            <div className={styles.methodSelection}>
                <label>Choose a 2FA procedure</label>
                <div className={styles.procedures}>
                    <div className={cn(styles.procedure, { [styles.selected]: procedure === "OTP" })} onClick={() => setProcedure("OTP")}>
                        <span>OTP</span>
                    </div>
                    <div className={cn(styles.procedure, { [styles.selected]: procedure === "SMS" })} onClick={() => setProcedure("SMS")}>
                        <span>SMS</span>
                    </div>
                    <div className={cn(styles.procedure, { [styles.selected]: procedure === "Mail" })} onClick={() => setProcedure("Mail")}>
                        <span>Mail</span>
                    </div>
                    <div className={cn(styles.procedure, { [styles.selected]: procedure === "ID" })} onClick={() => setProcedure("ID")}>
                        <span>ID</span>
                    </div>
                </div>
            </div>
            <div className={styles.challenge}>
                <label>Steps</label>
                {procedure === "OTP" && <OtpProcedure onComplete={onComplete} />}
                {procedure !== "OTP" && <p>Requires a DLC</p>}
            </div>
        </div>
    )
}