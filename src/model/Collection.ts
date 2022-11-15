import axios, { AxiosResponse } from "axios";
import { Eventing } from "./Eventing";
export class Collection<T, K> {
  models: T[] = [];
  eventing: Eventing = new Eventing();
  constructor(
    private rootUrl: "http://localhost:3000/users",
    private deserialize: (json: K) => T
  ) {}
  get on() {
    return this.eventing.on;
  }

  get trigger() {
    return this.eventing.trigger;
  }

  fetch() {
    return axios.get(this.rootUrl).then((response: AxiosResponse) => {
      response.data.forEach((value: K) => {
        this.models.push(this.deserialize(value));
        this.trigger("collection");
      });
    });
  }
}
