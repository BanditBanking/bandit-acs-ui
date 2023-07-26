import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { setAppLanguage } from "./i18n";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./components/pages/Home";
import styles from "./App.module.scss";
import { ContextProviders } from "./context";
import { DEFAULT_BANK_ID } from "./constants";
import { History } from "./components/pages/History";
import { Portal } from "./components/pages/Portal";

const queryClient = new QueryClient();

function setLanguage() {
    const lan = localStorage.getItem("languagePreference") ?? window.navigator.language;
    setAppLanguage(lan);
}

function App() {

    useEffect(() => {
        setLanguage();
        document.documentElement.style.setProperty('--primary', process.env.REACT_APP_DASHBOARD_COLOR ?? "#FFFFFF");
    }, []);

    return (
        <div className={styles.app}>
            <ContextProviders storageKey={DEFAULT_BANK_ID}>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/history" element={<History />} />
                            <Route path="/portal" element={<Portal />} />
                        </Routes>
                    </BrowserRouter>
                </QueryClientProvider>
            </ContextProviders>
        </div>
    );
}

export default App;
