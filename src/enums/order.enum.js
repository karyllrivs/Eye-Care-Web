import { makeEnum } from "../utils/enum";

export const OrderStatus = makeEnum(["Pending", "Delivered", "Cancelled"]);
