import { Moment } from "moment";

import styles from './Transaction.module.scss';
import { STATUS_MAP } from "../../../constants";
import cn from 'classnames';

export type TransactionProps = {
    date?: Moment;
    merchantName?: string;
    amount?: number;
    status?: number;
}

export const Transaction = ({ date, merchantName, amount, status }: TransactionProps) => {
    return (
        <div className={styles.transaction}>
            <span>{date?.format("DD/MM/YYYY HH:mm")}</span>
            <span className={styles.merchantName}>{merchantName}</span>
            <span>{amount} $</span>
            <div className={styles.status}>
                <div className={cn(styles.dot,
                    {
                        [styles.unknown]: status === 1,
                        [styles.warn]: status === 0,
                        [styles.error]: status === 2,
                        [styles.success]: status === 3,
                    })}></div>
                <span>{STATUS_MAP[status ?? 3]}</span>
            </div>
        </div>
    )
}