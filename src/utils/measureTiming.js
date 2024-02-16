class MeasureF {
  constructor(f, arg) {
    this.f = f;
    this.arg = arg;
    let start = performance.now();
    this.f(this.arg); //(this.arg);
    let end = performance.now();
    let timing = end - start;
    console.log(`handleAadToCart timing is ${timing}`);
  }
  get timing() {
    return this.timing;
  }
}
export default MeasureF;
