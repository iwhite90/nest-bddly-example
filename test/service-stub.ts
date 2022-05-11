export class ServiceStub {
  orders: string[] = [];

  getHello = () => 'Hello World!';

  addOrder = (order: string) => {
    this.orders.push(order);
    return this.orders.length - 1;
  };

  getOrder = (index: number) => {
    return this.orders[index];
  };
}
