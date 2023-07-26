import styles from "./Home.module.scss";
import text from "../../i18n";
import { Navigator } from "../common/layouts/Navigator";
import { useNavigate } from "react-router";
import moment from "moment";
import { FormButton } from "../common/forms/Fields";

export const Home = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/portal', { state: { amount: 104, merchantId: "bandit-acs-achile", merchantName: "Achile", activitySector: "Dogs", redirectUrl: "https://tristesse.lol" } });
    };

    return (
        <Navigator>
            <div className={styles.home}>
                <p>This button aims to demonstrates how a typical redirection would work. It isn't supposed to be used in production</p>
                <FormButton name="begugPortal" onClick={handleClick}>Debug Portal</FormButton>
            </div>
        </Navigator >
    );
};
