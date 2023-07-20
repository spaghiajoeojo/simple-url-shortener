export default class Task {
  user: string;

  url?: string;

  shortId?: string;

  type: 'shortening' | 'stats' | 'translate';

  constructor({
    user, url, shortId, type = 'shortening',
  }: { user: string, url?: string, shortId?: string, type: 'shortening' | 'stats' | 'translate' }) {
    this.user = user;
    this.url = url;
    this.shortId = shortId;
    this.type = type;
  }
}
