import { AxiosPromise, AxiosResponse } from "axios";
import { Callback } from "./Eventing";

interface ModelEvent {
  on(eventName: string, callbackFn: Callback): void;
  trigger(eventName: string): void;
}

interface ModelSync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface ModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K];
  set(update: T): void;
  getAll(): T;
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private event: ModelEvent,
    private sync: ModelSync<T>,
    private attributes: ModelAttributes<T>
  ) {}

  on = this.event.on;

  trigger = this.event.trigger;

  get get() {
    return this.attributes.get;
  }

  set(update: T) {
    this.attributes.set(update);
    this.event.trigger("update");
  }

  fetch() {
    const id = this.get("id");
    if (typeof id !== "number") {
      throw new Error("cannot fetch without id");
    }

    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data);
      this.trigger("fetch");
    });
  }

  save(): void {
    this.sync.save(this.attributes.getAll()).then((response) => {
      this.trigger("save");
    });
  }
}
