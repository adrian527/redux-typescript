export interface Subscriber {
  notify: (data: unknown) => void;
}

class SubscriberList {
  private subscribers: Subscriber[] = [];

  constructor() {
    this.addSubscriber = this.addSubscriber.bind(this);
    this.notifyAll = this.notifyAll.bind(this);
  }

  public addSubscriber(subscriber: Subscriber): void {
    this.subscribers.push(subscriber);
  }

  public notifyAll(storeData: unknown): void {
    this.subscribers.forEach((subscriber) => subscriber.notify(storeData));
  }
}

export default SubscriberList;
