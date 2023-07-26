import styles from "./History.module.scss";
import { Navigator } from "../common/layouts/Navigator";
import { Transaction } from "../common/items/Transaction";
import { useTransactions } from "../../api/query/transactionsQueries";
import moment from "moment";

export const History = () => {

    const { data: transactions } = useTransactions();

    console.log(transactions)

    return (
        <Navigator title="History" requiresAuthentication>
            <div className={styles.history}>
                <div className={styles.transactionsContainer}>
                    {transactions?.map((t => <Transaction date={moment(t.requestTime)} merchantName={t.merchantName} amount={t.amount} status={t.status} />))}
                </div>
            </div>
        </Navigator>
    );
};
