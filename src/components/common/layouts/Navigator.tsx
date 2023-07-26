import { useLayoutContext } from "../../../context/layoutContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt, faHistory, faSignOutAlt, faBars, faUser, faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useApiContext } from "../../../context/apiContext";
import { LoginPopup } from "../popups/Login/LoginPopup";

import cn from "classnames";
import styles from "./Navigator.module.scss";
import { PaymentPopup } from "../popups/PaymentPopup";
import { useEffect } from "react";
import { FormButton } from "../forms/Fields";

type Props = {
    children: React.ReactNode;
    title?: string;
    requiresAuthentication?: boolean
}

export const Navigator = ({ children, title, requiresAuthentication }: Props) => {

    const layout = useLayoutContext();
    const { userRole, isConnected, username, setApiKey, setIsConnected, setUsername } = useApiContext();

    const onLogout = () => {
        setIsConnected(false);
        setApiKey("");
    }

    return (
        <main>
            <div className={cn(styles.sidebar, { [styles.collapsed]: !layout.isSideBarOpen })}>
                <div className={styles.logoDetails}>
                    <FontAwesomeIcon className={styles.icon} icon={faBuildingColumns} />
                    <span className={styles.logoName}>{process.env.REACT_APP_DASHBOARD_TITLE}</span>
                </div>
                <div className={styles.linkSection}>
                    <ul className={styles.navLinks}>
                        <li className={cn({ [styles.selected]: layout.currentPage == "dashboard" })}>
                            <Link to="/" onClick={() => layout.setCurrentPage("dashboard")}>
                                <FontAwesomeIcon className={styles.icon} icon={faTachometerAlt} />
                                <span className={styles.linkName}>Dashboard</span>
                            </Link>
                        </li>
                        <li className={cn({ [styles.selected]: layout.currentPage == "history" })}>
                            <Link to="/history" onClick={() => layout.setCurrentPage("history")}>
                                <FontAwesomeIcon className={styles.icon} icon={faHistory} />
                                <span className={styles.linkName}>History</span>
                            </Link>
                        </li>
                        {userRole == "Admin" &&
                            <li className={cn({ [styles.selected]: layout.currentPage == "history" })}>
                                <Link to="/history">
                                    <FontAwesomeIcon className={styles.icon} icon={faHistory} />
                                    <span className={styles.linkName}>Dashboard</span>
                                </Link>
                            </li>
                        }
                    </ul>

                    <ul className={styles.navLinks}>
                        {isConnected &&
                            <li className={styles.exit}>
                                <a onClick={onLogout}>
                                    <FontAwesomeIcon className={styles.icon} icon={faSignOutAlt} />
                                    <span className={styles.linkName}>Logout</span>
                                </a>
                            </li>
                        }
                    </ul>
                </div>
            </div>

            <section className={styles.mainSection}>
                <nav>
                    <div className={styles.sidebarButton}>
                        <div onClick={() => layout.setSidebarOpen(!layout.isSideBarOpen)}><FontAwesomeIcon className={styles.icon} icon={faBars} /></div>
                        {title && <span className={styles.pageTitle}>{title}</span>}
                    </div>
                    {isConnected ?

                        <Link className={styles.username} to="/dashboard">
                            <FontAwesomeIcon className={styles.userIcon} icon={faUser} />
                            <p>{username}</p>
                        </Link>

                        :

                        <div className={styles.profileDetails} onClick={() => layout.setLoginPopupActive(true)}>
                            <p className={styles.loginBtn}>Log In</p>
                        </div>
                    }
                </nav>

                <div className={styles.mainContent}>
                    {requiresAuthentication && !isConnected &&
                        <div className={styles.authRequired}>
                            <h2>Connection required</h2>
                            <p>You must be connected in order to access this content</p>

                            <div className={styles.actions}>
                                <FormButton className={styles.loginBtn} name="loginBtn" onClick={() => layout.setLoginPopupActive(true)}>Login</FormButton>
                            </div>
                        </div>
                    }
                    {children}
                </div>

                {layout.isLoginPopupActive && <LoginPopup />}
            </section>
        </main >
    );
};