import { Injectable } from "@devisfuture/electron-modular";

@Injectable()
export class DeleteService {
  private target: TItem | null = null;

  setTarget(item: TItem): void {
    this.target = item;
  }

  getTarget(): TItem | null {
    return this.target;
  }

  clearTarget(): void {
    this.target = null;
  }
}
