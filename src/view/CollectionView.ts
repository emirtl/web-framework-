import { Collection } from "./../model/Collection";
export abstract class CollectionView<T, K> {
  constructor(private parent: Element, private collection: Collection<T, K>) {}

  protected abstract renderItem(model: T, itemParent: Element): void;

  render(): void {
    this.parent.innerHTML = "";
    const templateElement = document.createElement("template");
    for (const item of this.collection.models) {
      const itemParent = document.createElement("div");
      this.renderItem(item, itemParent);
      templateElement.content.append(itemParent);
    }
    this.parent.append(templateElement.content);
  }
}
