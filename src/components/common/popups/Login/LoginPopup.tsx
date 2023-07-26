import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useLayoutContext } from "../../../../context/layoutContext";
import { useState } from "react";

import styles from "./LoginPopup.module.scss";
import popupStyles from "../Popup.module.scss";
import cn from "classnames";
import { SingleFactorAuthentication } from "./SingleFactorAuthentication";
import { TwoFactorAuthentication } from "./TwoFactorAuthentication";

export const LoginPopup = () => {
    const { setLoginPopupActive } = useLayoutContext();
    const [isFirstFactorAuthenticated, setIsFirstFactorAuthenticated] = useState<boolean>(false);


    return (
        <div className={popupStyles.popup}>
            <div className={cn(styles.main, popupStyles.popupFrame)}>
                <div className={popupStyles.topControls}>
                    <FontAwesomeIcon className={popupStyles.closeIcon} icon={faTimes} onClick={() => setLoginPopupActive(false)} />
                </div>
                <div className={popupStyles.popupMainContent}>
                    {!isFirstFactorAuthenticated && <SingleFactorAuthentication onComplete={() => setIsFirstFactorAuthenticated(true)} />}
                    {isFirstFactorAuthenticated && <TwoFactorAuthentication />}
                </div>
            </div>
        </div>
    );
}