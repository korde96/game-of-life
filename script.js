var app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'Hello Vue.js!',
    size: 25,
    grid: Array(25).fill(0).map((i)=> Array(25).fill(0)),
    play: false
  },
  watch: {
    size: function(){
      let s = parseInt(this.size,10)
      this.grid = Array(s).fill(0).map((i)=> Array(s).fill(0))
    }

  },
  methods: {
    togglePlay: function () {
      Vue.set(this, "play", !this.play)
    },
    toggleLife(row, col) {
      let cell = this.grid[row][col]
      Vue.set(this.grid[row], col, (cell + 1) % 2)
    },
    next () {
      Vue.set(this, 'grid', this.getNextState())
    },
    reset () {
      let s = parseInt(this.size,10)
      Vue.set(this, 'grid', Array(s).fill(0).map((i)=> Array(s).fill(0)))
      this.play = false
    },
    getAliveNeighbourCount(row,col){
      let count = 0;
      for (let y = row - 1; y <= row + 1; y++) {
        for (let x = col - 1; x <= col + 1; x++) {
          if (y >= 0 && y < this.size && x >= 0 && x < this.size) {
            count += this.grid[y][x] ? 1 : 0;
          }
        }
      }
      count -= this.grid[row][col] ? 1 : 0;
      return count;
    },
    getNextState () {
       return this.grid.map((row, rowId) => {
         return row.map((cell, colId) => {
           let nearCellsAlive = this.getAliveNeighbourCount(rowId, colId)          
           if (cell === 0 && nearCellsAlive === 3) {
             return 1
           } else if (cell === 1 && (nearCellsAlive > 3 || nearCellsAlive < 2)) {
             return 0
           } else {
             return cell
           }
         })
      })
    }
  },
  mounted: function () {
    window.setInterval(() => {
      if(this.play == true)
        this.next()
    }, 1000)
  }
})