import { Navigator } from "../common/layouts/Navigator";
import { PaymentPopup } from "../common/popups/PaymentPopup";
import { LoginPopup } from "../common/popups/Login/LoginPopup";
import { useLayoutContext } from "../../context/layoutContext";
import moment from "moment";
import { TransactionsApi } from "../../api/acs";
import { useApiContext } from "../../context/apiContext";
import { useState } from "react";
import { usePortalQueryParams } from "../../hooks/usePortalQueryParams";

export const Portal = () => {
    const { isLoginPopupActive } = useLayoutContext();
    const { merchantId, merchantName, amount, activitySector, redirectUrl, orderId } = usePortalQueryParams();
    const { apiKey, challengeType } = useApiContext();
    const [error, setError] = useState<string>()

    const onPay = () => {
        TransactionsApi.transactionRequestAsync({ merchantId, amount, challengeType, merchantName, activitySector }, apiKey).then((response) => {
            window.location.replace(`${redirectUrl}?bankId=${process.env.REACT_APP_BANK_ID}&orderId=${orderId}&success=true&token=${response.data}`);
        }).catch((error) => {
            if (error.response.status === 402)
                window.location.replace(`${redirectUrl}?orderId=${orderId}&success=error`);
        })
    }

    return (
        <Navigator>
            <PaymentPopup merchantName={merchantName} activitySector={activitySector} amount={amount} date={moment()} onPay={onPay} error={error} />
            {isLoginPopupActive && <LoginPopup />}
        </Navigator>
    );
};
