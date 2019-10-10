export class Location {
  lat: number;
  long: number;
  name: string;
  address: string;

  constructor() {
  }
  getLat(): number {
    return this.lat;
  }
  setLat(num: number): void {
    this.lat = num;
  }
  getLong(): number {
    return this.long;
  }
  setLong(num: number): void {
    this.long = num;
  }
  getName(): string {
    return this.name;
  }
  setName(name: string): void {
    this.name = name;
  }
  getAddress(): string {
    return this.address;
  }
  setAddress(adr: string): void {
    this.address = adr;
  }
}
