export class Console {
  static instance = null
  consoleText = ""
  tags = new Set()
  consoleArray = []
  presentArray = []
  currentScreen = ""
  previousScreen = ""
  url = ""
  envName=""

  static getInstance() {
    if (Console.instance == null) {
      Console.instance = new Console()
      Console.instance.presentArray = Console.instance.consoleArray
    }
    return this.instance
  }

  add(tag, content, now) {
    this.tags.add(tag)

    this.consoleArray.unshift({
      tag,
      content,
      now,
      currentScreen: this.currentScreen,
      previousScreen: this.previousScreen,
      url: this.url,
    })

    this.presentArray = [...this.consoleArray]
  }

  clear() {
    this.consoleArray = []
    this.presentArray = []
  }

  getArray() {
    return this.presentArray;
  }

  setArrayByTag(tag: string) {
    if (tag !== "ALL") {
      this.presentArray = this.consoleArray.filter((e) => e.tag === tag)
    } else {
      this.presentArray = this.consoleArray
    }
  }

  getTags() {
    return [...this.tags, "ALL"]
  }
}
