import { Cmd, Directive, Meta } from "./types";
import * as JsSearch from "js-search";
class App {
  private metaInputs: HTMLInputElement | null = null;
  private cmdInputs: HTMLInputElement | null = null;
  private results: Cmd[] | Directive[] = [];
  private cmdSearch = "";
  constructor(private metas: Meta[]) {}

  render() {
    this.metaInputs = document.querySelector<HTMLInputElement>("#meta-input");
    this.cmdInputs = document.querySelector<HTMLInputElement>("#cmd-input");
    this.metaInputs?.addEventListener("change", this.onSearch.bind(this));
  }

  onSearch() {
    const search = new JsSearch.Search(["slug", "name"]);
    search.addIndex("name");
    //search.addIndex("description");
    search.addIndex("slug");
    //search.addIndex(["option", "description"]);
    search.addDocuments(this.metas);
    const meta = search.search(this.metaInputs?.value ?? "")[0] as Meta;

    this.cmdInputs?.addEventListener("input", () => {
      if (meta) {
        meta.paths.forEach(this.fetch.bind(this));
      }
    });
  }

  private fetch(filename: string) {
    const search = new JsSearch.Search("isbn");
    search.addIndex("name");
    //search.addIndex("description");
    search.addIndex(["option", "name"]);
    //search.addIndex(["option", "description"]);
    const cmdSearch = this.cmdInputs?.value ?? "";
    if (cmdSearch.length > 0) {
      fetch(filename)
        .then<Directive[] | Cmd[]>((response) => response.json())
        .then((data) => {
          search.addDocuments(data);
          this.mergeAndPrint(
            search.search(this.cmdInputs?.value ?? "") as Cmd[]
          );
        })
        .catch((error) =>
          console.error("Error fetching the JSON file:", error)
        );
    }
  }
  private mergeAndPrint(results: Cmd[] | Directive[]) {
    for (const r of results) {
      if (!this.results.includes(r)) {
        this.results.push(r);
      }
    }

    console.log(this.results);
  }
}

fetch("/meta.json")
  .then<Meta[]>((response) => response.json())
  .then((meta) => {
    new App(meta).render();
  });
