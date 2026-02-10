import { User } from "../constants/user";

export function getTotalPaid(user: User) {
  return user.orders.reduce((sum, order) => sum + order.price, 0);
}
