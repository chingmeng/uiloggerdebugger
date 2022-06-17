import c from "android/app/src/main/assets/highcharts-files/modules/boost"

export class Console {
  static instance = null
  consoleText = ""
  tags = new Set()
  consoleArray = []
  presentArray = []
  currentScreen = ""
  previousScreen = ""
  navigations = [];
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

  addNavigations(newDestination) {
      const lastItem = this.navigations?.[this.navigations.length - 1];
      if (lastItem === newDestination) return;
      this.navigations.push(newDestination);
      this.navigations = this.navigations.reverse().slice(0, 10).reverse();
  }

  getLatestNavigation() {
    return this.navigations?.[this.navigations.length - 1];
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

  filterBySearchText(searchText: string) {

    const checkShouldSearch = (query, identifier, source) => {
      return searchText.includes(identifier) && source.includes(query);
    }

    if (searchText) {
      this.presentArray = this.consoleArray.filter((e) => {

        if (searchText.startsWith("@")) {

          const list = [
            {identifier: '@content ', source: e.content}, 
            {identifier: '@tag ', source: e.tag}, 
            {identifier: '@screen ', source: e.currentScreen}, 
            {identifier: '@pscreen ', source: e.previousScreen}, 
            {identifier: '@datetime ', source: e.now}, 
          ];
          
          let query = searchText;
          list.forEach((e) => {
            query = query.replace(e.identifier, '');
          })

          let shouldPick = false;
          list.forEach((e) => {
            shouldPick = shouldPick || checkShouldSearch(query, e.identifier, e.source);
          })

          return shouldPick

        }
        return e.tag.includes(searchText) || e.currentScreen.includes(searchText) || e.content.includes(searchText);
      })
    } else {
      this.presentArray = this.consoleArray
    }
  }

  getTags() {
    return [...this.tags, "ALL"]
  }
}
