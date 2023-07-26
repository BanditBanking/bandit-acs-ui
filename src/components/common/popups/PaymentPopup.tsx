import { ErrorText, FormButton } from "../forms/Fields";
import { useApiContext } from "../../../context/apiContext";
import { useLayoutContext } from "../../../context/layoutContext";

import styles from "./PaymentPopup.module.scss";
import popupStyles from "./Popup.module.scss";
import cn from "classnames";
import { Moment } from "moment";
import { useDecimalSplitter } from "../../../hooks/useDecimalSplitter";
import { useProfile } from "../../../api/query/accountsQueries";

export type PaymentPopupProps = {
    amount: number;
    merchantName: string;
    activitySector: string;
    date: Moment;
    error?: string;
    onPay: () => void;
}

export const PaymentPopup = ({ amount, merchantName, activitySector, date, onPay, error }: PaymentPopupProps) => {
    const { isConnected } = useApiContext();
    const { setLoginPopupActive } = useLayoutContext();
    const { data: profile } = useProfile();
    const { integerPart: priceInteger, decimalPart: priceDecimal } = useDecimalSplitter(amount);

    return (
        <div className={popupStyles.popup}>
            <div className={cn(styles.main, popupStyles.popupFrame)}>
                <h1>Proceed to payment</h1>
                <div className={styles.infoSection}>
                    <div className={styles.card}>
                        <div className={styles.amount}>
                            <label>Amount</label>
                            <p className={styles.price}>
                                <span>$</span><span>{priceInteger}</span><span className={styles.decimals}>.{priceDecimal}</span>
                            </p>
                        </div>
                        <div className={styles.beneficiaryDetails}>
                            <div className={styles.detailSection}>
                                <label>Beneficiary</label>
                                <p>{merchantName}</p>
                            </div>
                            <div className={styles.detailSection}>
                                <label>Sector of activity</label>
                                <p>{activitySector}</p>
                            </div>
                            <div className={styles.detailSection}>
                                <label>Date</label>
                                <p>{date.format('DD/MM/YY')}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {isConnected ?
                    <>
                        <div className={styles.balance}>
                            <label>Balance</label>
                            <p className={styles.balanceAmount}>
                                <span>$</span><span>{profile?.card.balance}</span>
                            </p>
                        </div>
                        {error && <ErrorText text={error} />}
                        <FormButton name="pay" className={styles.btn} onClick={onPay}>Pay</FormButton>
                    </>

                    :

                    <FormButton name="connectToPay" className={styles.btn} onClick={() => setLoginPopupActive(true)}>Connect to pay</FormButton>
                }
            </div>
        </div>
    );
};