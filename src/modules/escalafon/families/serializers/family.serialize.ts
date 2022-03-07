export class FamilySerialize {
  private mode!: "CHILD" | "PARENT";
  get displayMode() {
    return this.mode == "CHILD" ? "Hijo (a)" : "Cónyuge";
  }
}
