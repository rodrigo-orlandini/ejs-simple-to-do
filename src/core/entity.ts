import { randomUUID } from 'node:crypto';

export class Entity<E> {
  private _id: string;
  protected props: E;

  protected constructor(props: E, id?: string) {
    this.props = props;

    this._id = id ?? randomUUID().replaceAll('-', '').slice(0, 24);
  }

  get id() {
    return this._id;
  }
}
