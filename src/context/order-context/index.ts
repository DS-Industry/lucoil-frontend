 import React from "react";

interface IOrderContext {
    order: IOrder | any,
    setOrder: any,
}
interface IOrder {
    carWash: any,
    bayNumber: number,
    title: string,
    address: string,
    distance: number,
    sum: number,
    paymentId?: number,
    carWashId?: number,
    PartnerCard?: number,
}

export const OrderContext = React.createContext<IOrderContext>({
    order: null,
    setOrder: () => {}

});