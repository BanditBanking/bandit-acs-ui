import { useSearchParams } from "react-router-dom";

export type PortalQueryParams = {
    amount: number,
    orderId: string,
    merchantId: string,
    merchantName: string,
    activitySector: string,
    redirectUrl: string,
}

export const usePortalQueryParams = (): PortalQueryParams => {
    const [searchParams] = useSearchParams();
    const amountStr = searchParams.get('amount');
    const amount = amountStr ? parseFloat(amountStr) : 0;

    return {
        amount,
        orderId: searchParams.get('orderId') ?? "",
        merchantId: searchParams.get('merchantId') ?? "",
        merchantName: searchParams.get('merchantName') ?? "",
        activitySector: searchParams.get('activitySector') ?? "",
        redirectUrl: searchParams.get('redirectUrl') ?? "",
    }
}