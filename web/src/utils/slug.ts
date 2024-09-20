export class Slugger {
  constructor() {}

  fromPath(path: string) {
    const slug = path
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    return slug;
  }
}
