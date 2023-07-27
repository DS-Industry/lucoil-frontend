import React from "react";

interface IOrderContext {
    order: object,
}

export const OrderContext = React.createContext({
    order: null,
    setOrder: () => {}

});