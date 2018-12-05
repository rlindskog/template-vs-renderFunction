const Vue = require('vue')
const { renderToString } = require('vue-server-renderer').createRenderer()
const assert = require('assert')

let mockData = [{ name: 'David' }, { name: 'Erik' }, { name: 'Ryan' }]

async function main() {
  console.time('template')
  let template = await renderToString(new Vue({
    data: () => ({ mockData }),
    template: `
      <ul>
          <li v-for="thing in mockData">{{ thing.name }}</li>
      </ul>
    `
  }));
  console.timeEnd('template')
  
  console.time('renderFunction')
  let renderFunction = await renderToString(new Vue({
    data: () => ({ mockData }),
    render (createElement) {
      return createElement('ul',
        mockData.map(thing => createElement('li', thing.name))
      )
    }
  }))
  console.timeEnd('renderFunction')

  console.log(template)
  console.log(renderFunction)
  assert(template === renderFunction)
}

main()