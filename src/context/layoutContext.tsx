import React from 'react';
import { noOp } from '../constants';
import { usePersistedState } from '../hooks/usePersistedState';

type LayoutValueType = {
    isSideBarOpen: boolean;
    isLoginPopupActive: boolean;
    isPaymentPopupActive: boolean;
    currentPage: 'dashboard' | 'history';
};

type LayoutModifierType = {
    setSidebarOpen: (isSideBarOpen: boolean) => void;
    setLoginPopupActive: (isLoginPopupActive: boolean) => void;
    setPaymentPopupActive: (isPaymentPopupActive: boolean) => void;
    setCurrentPage: (currentPage: 'dashboard' | 'history') => void;
};

type LayoutContextType = LayoutValueType & LayoutModifierType;

export const LayoutContext = React.createContext<LayoutContextType>({
    isSideBarOpen: true,
    isLoginPopupActive: false,
    isPaymentPopupActive: false,
    currentPage: 'dashboard',
    setSidebarOpen: noOp,
    setCurrentPage: noOp,
    setLoginPopupActive: noOp,
    setPaymentPopupActive: noOp
});

export type ProviderProps = {
    children: React.ReactNode;
    storageKey: string;
};

export const LayoutProvider = ({ children, storageKey }: ProviderProps) => {
    const [storedValues, setStoredValues] = usePersistedState<LayoutValueType>(
        `${storageKey}-layout`,
        {
            isSideBarOpen: true,
            isLoginPopupActive: false,
            isPaymentPopupActive: false,
            currentPage: 'dashboard'
        },
        { version: 0 },
    );

    const layoutContextValue = React.useMemo<LayoutContextType>(() => {
        return {
            isSideBarOpen: storedValues.isSideBarOpen,
            currentPage: storedValues.currentPage,
            isLoginPopupActive: storedValues.isLoginPopupActive,
            isPaymentPopupActive: storedValues.isPaymentPopupActive,
            setSidebarOpen: (isSideBarOpen) => setStoredValues((v) => ({ ...v, isSideBarOpen })),
            setCurrentPage: (currentPage) => setStoredValues((v) => ({ ...v, currentPage })),
            setLoginPopupActive: (isLoginPopupActive) => setStoredValues((v) => ({ ...v, isLoginPopupActive })),
            setPaymentPopupActive: (isPaymentPopupActive) => setStoredValues((v) => ({ ...v, isPaymentPopupActive })),
        };
    }, [setStoredValues, storedValues.isSideBarOpen, storedValues.currentPage, storedValues.isLoginPopupActive, storedValues.isPaymentPopupActive]);

    return <LayoutContext.Provider value={layoutContextValue}>{children} </LayoutContext.Provider>;
};

export const useLayoutContext = () => {
    return React.useContext(LayoutContext);
};