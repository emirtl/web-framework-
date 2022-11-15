import { Model } from "../model/Model";

export abstract class View<T extends Model<K>, K> {
  regions: { [key: string]: Element } = {};

  constructor(private parent: Element, protected model: T) {
    this.bindModel();
  }

  abstract template(): string;

  regionsMap(): { [key: string]: string } {
    return {};
  }

  abstract eventMaps(): { [key: string]: () => void };

  onRender(): void {}

  bindEvents(fragment: DocumentFragment) {
    const eventMaps = this.eventMaps();
    for (const key in eventMaps) {
      const [event, selector] = key.split(":");
      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(event, eventMaps[key]);
      });
    }
  }

  bindRegions(fragment: DocumentFragment) {
    const regionsMap = this.regionsMap();
    for (const key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);
      if (element) {
        this.regions[key] = element;
      }
    }
  }

  bindModel = () => {
    this.model.on("update", () => {
      this.render();
    });
  };

  render() {
    this.parent.innerHTML = "";
    const template = document.createElement("template");
    template.innerHTML = this.template();
    this.bindEvents(template.content);
    this.bindRegions(template.content);
    this.onRender();
    this.parent.append(template.content);
  }
}
