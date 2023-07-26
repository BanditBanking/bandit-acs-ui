import { useLayoutContext } from "../../../../context/layoutContext";
import { useState } from "react";
import { AuthApi } from "../../../../api/acs";
import { useApiContext } from "../../../../context/apiContext";
import popupStyles from "../Popup.module.scss";
import { ErrorText, FormButton, PasswordInput, TextInput } from "../../forms/Fields";

export const SingleFactorAuthentication = ({ onComplete }: { onComplete: () => void }) => {
    const [mail, setMail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const { setApiKey } = useApiContext();

    const handleLogin = () => {
        AuthApi.authenticateAsync({ mail, password }).then((response) => {
            console.log(response.data.token)
            setApiKey(response.data.token);
            onComplete();
        }).catch((error) => {
            if (error.response.status = 403) {
                setErrorMessage("Invalid credentials");
            }
        })
    }

    const handleRegister = () => {
        console.log("register")
    }

    return (
        <>
            <h1>Log in</h1>
            <form className={popupStyles.loginForm} onSubmit={handleLogin}>
                <TextInput name="Email" onChange={setMail} />
                <PasswordInput name="Password" onChange={setPassword} />
                <ErrorText text={errorMessage} />
                <FormButton name="nextBtn" onClick={handleLogin}>Next</FormButton>
            </form>

            {/*<div className={popupStyles.registerBanner}>
                <p>No account? <span className={popupStyles.registerLink} onClick={handleRegister}>Register here</span></p>
            </div>*/}
        </>
    );
}