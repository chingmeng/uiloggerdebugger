
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

    if (searchText) {
      this.presentArray = this.consoleArray.filter((ee: any) => {

        const list = [
          {identifier: '@content ', source: ee.content}, 
          {identifier: '@tag ', source: ee.tag}, 
          {identifier: '@screen ', source: ee.currentScreen}, 
          {identifier: '@pscreen ', source: ee.previousScreen}, 
          {identifier: '@datetime ', source: ee.now}, 
        ];

        let queries = [] as any[];
        searchText.split('&&').forEach((query) => {
          if(list.some((k) => query.includes(k.identifier))) {
            list.forEach((e) => {
              if (query.includes(e.identifier)) {
                queries.push({text: query.replace(e.identifier, ''), identifier: e.identifier, source: e.source })
              }
            })
          } else {
            queries.push({text: query, ...ee});
          }
        })

        const checkShouldSearch = (queries) => {
          let shouldQuery = true;
          queries.forEach((query) => {
            if (query.identifier) {
              const matchText = query.source?.toString().toLowerCase().includes(query?.text?.toString().toLowerCase());
              shouldQuery = shouldQuery && matchText;
            } else {
              // If no identifier in string, just do normal match text.
              const matchText = 
                query.content?.toString().toLowerCase().includes(query?.text?.toString().toLowerCase()) ||
                query.tag?.toString().toLowerCase().includes(query?.text?.toString().toLowerCase());
              shouldQuery = shouldQuery && matchText;
            }
          })
         return shouldQuery 
       }

       return checkShouldSearch(queries);
      })
    } else {
      this.presentArray = this.consoleArray
    }
  }

  getTags() {
    return [...this.tags, "ALL"]
  }
}
