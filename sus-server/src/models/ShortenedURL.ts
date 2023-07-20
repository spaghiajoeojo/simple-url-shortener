export default class ShortenedURL {
  id: string;

  url: string;

  visits: number;

  constructor(id: string, url: string, visits: number) {
    this.id = id;
    this.url = url;
    this.visits = visits;
  }

  toJSON(): any {
    return { id: this.id, url: this.url, visits: this.visits };
  }
}
