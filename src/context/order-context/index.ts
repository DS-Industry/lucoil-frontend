 import React from "react";

interface IOrderContext {
    order: IOrder | null,
    setOrder: any,
}
interface IOrder {
    carWash: any,
    bayNumber: number,
    sum: number,
    paymentId?: number,
    carWashId?: number,
    PartnerCard?: number,
}

export const OrderContext = React.createContext<IOrderContext>({
    order: null,
    setOrder: () => {}

});