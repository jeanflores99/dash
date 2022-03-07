export class BadgeSerialize {
  private departament!: string;
  private province!: string;
  private district!: string;

  get displayDescriptor() {
    return `${this.departament} / ${this.province} / ${this.district}`.toLowerCase();
  }
}
