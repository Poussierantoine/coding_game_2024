export const readlineAbstraction = (() => {
  // @ts-expect-error ignore error, it will work only in production
  return readline();
}) as unknown as () => string;

export class ReadlineProvider {

  readline(){
    return readlineAbstraction();
  }
}

export class FakeReadlineProvider extends ReadlineProvider {
  private inputs: string[] = [];
  private index: number = 0;

  readline() {
    if (this.index >= this.inputs.length) {
      throw new Error('No more inputs available');
    }
    return this.inputs[this.index++];
  }

  feed(inputs: string[]) {
    this.inputs.push(...inputs);
  }
}