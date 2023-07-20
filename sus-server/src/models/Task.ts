export default class Task {
  user: string;

  url?: string;

  shortId?: string;

  type: 'shortening' | 'stats';

  constructor({
    user, url, shortId, type = 'shortening',
  }: { user: string, url?: string, shortId?: string, type: 'shortening' | 'stats' }) {
    this.user = user;
    this.url = url;
    this.shortId = shortId;
    this.type = type;
  }
}
