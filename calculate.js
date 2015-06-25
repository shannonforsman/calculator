var sum = document.getElementById('sum')
var clear = document.getElementById('clear')
var body = document.body

var Calculate = function () {
  this.clicked = false
  this.numStr = ''
  this.numInt = 0
  this.sum = 0
  this.operator = ''
  this.operatorList = {
    '+': function (num, sum) {
      return num + sum
    },
    '-': function (num, sum) {
      return sum - num
    },
    '*': function (num, sum) {
      return sum * num
    },
    '/': function (num, sum) {
      return sum / num
    }
  }
}

Calculate.prototype.math = function (num) {
  this.numStr += num
}

Calculate.prototype.operators = function (operator) {
  if (operator === '=') {
    this.numInt = parseFloat(this.numStr)
    this.sum = this.operatorList[this.operator](this.numInt, this.sum)
    return this.sum
  }
  if (this.clicked === true) {
    this.numInt = parseFloat(this.numStr)
    this.sum = this.operatorList[this.operator](this.numInt, this.sum)
    this.numStr = ''
    this.operator = operator
    return this.sum
  }
  this.operator = operator
  this.clicked = true
  this.numInt = parseFloat(this.numStr)
  this.numStr = ''
  this.sum = this.numInt
}

Calculate.prototype.clear = function () {
  calculation = new Calculate()
  sum.innerHTML = ''
}

var calculation = new Calculate()

body.addEventListener('click', function (e) {
  if (e.target.dataset.num) {
    calculation.math(e.target.dataset.num)
    sum.innerHTML = calculation.numStr
  }
})

body.addEventListener('click', function (e) {
  if (e.target.dataset.operator) {
    calculation.operators(e.target.dataset.operator)
    sum.innerHTML = Math.round(calculation.sum * 100) / 100
  }
})

clear.addEventListener('click', calculation.clear)
