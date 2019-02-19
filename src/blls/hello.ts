export default class Hello {
  private first: string
  private last: string
  private word: string

  constructor (first: string, last: string) {
    this.first = first
    this.last = last
  }

  join (): this {
    this.word = this.first + this.last
    return this
  }

  print (): string {
    return this.word
  }
}
