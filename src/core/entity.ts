import { randomUUID } from 'node:crypto';

export class Entity<E> {
  private _id: string;
  protected props: E;

  protected constructor(props: E, id?: string) {
    this.props = props;

    this._id = id ?? randomUUID();
  }

  get id() {
    return this._id;
  }
}
