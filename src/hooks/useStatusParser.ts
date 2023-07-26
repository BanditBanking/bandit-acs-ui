const statusMap: Record<number, string> = {
    0: "Pending",
    1: "Complete",
    2: "Denied"
}

export const useStatusParser = (status: number) => statusMap[status];