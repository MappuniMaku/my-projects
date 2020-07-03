'use strict';

let calculator = {
  
  result: 0,
  nextValue: 0,
  action: undefined,
  arr1: [],
  arr2: [],
  indicator1: 0,
  indicator2: 0,
  nextValueNegative: false,

  addNumber(number)
  {
    if (document.getElementById("result").innerHTML == '' && !(this.indicator2 == 0 && this.indicator1 == 'next'))
    {
      if ( (this.indicator1 == 0 || this.indicator1 == 'negative') && this.indicator2 == 0 )
      {
        if (this.arr1.length == 0 && number == '.')
        {
          this.arr1.push('0.');
          document.getElementById("value1").innerHTML += '0.';
        } else
        {
          if ( (this.arr1.includes('.') || this.arr1.includes('0.')) && number == '.' )
          {
            alert('Нельзя ввести более одного отделителя дробной части!')
          } else
          {
            this.arr1.push(number);
            document.getElementById("value1").innerHTML += number;
          };
        };

      } else
      {
        if (this.arr2.length == 0 && number == '.')
        {
          this.arr2.push('0.');
          document.getElementById("value2").innerHTML += '0.';
        } else
        {
          if ( (this.arr2.includes('.') || this.arr2.includes('0.')) && number == '.' )
          {
            alert('Нельзя ввести более одного отделителя дробной части!')
          } else
          {
            this.arr2.push(number);
            document.getElementById("value2").innerHTML += number;
          };
        };
      };
    };
  },

  read()
  {
    if (this.indicator1 != 'next')
    {
      this.arr1.forEach( (item) => this.result += '' +  item );
    };
    this.arr2.forEach( (item) => this.nextValue += '' +  item );

    if (this.indicator1 == 'negative')
    {
      this.result = 0 - +this.result;
    } else
    {
      this.result = +this.result;
    };

    if (this.nextValueNegative)
    {
      this.nextValue = 0 - +this.nextValue;
    } else
    {
      this.nextValue = +this.nextValue;
    };

      return this;
  },

  sum()
  {
    this.result += this.nextValue;
    return this.result;
  },

  sub()
  {
    this.result -= this.nextValue;
    return this.result;
  },

  mul()
  {
    this.result *= this.nextValue;
    return this.result;
  },

  div()
  {
    this.result /= this.nextValue;
    return this.result;
  },

  pow()
  {
    this.result **= this.nextValue;
    return this.result;
    },

  insertAction(userActionInput)
  {
    if (this.arr1.length != 0)
    {
      this.action = userActionInput;
      this.indicator2 = 1;

      if (userActionInput == 'sum') document.getElementById("action").innerHTML = '+';
      if (userActionInput == 'sub') document.getElementById("action").innerHTML = '-';
      if (userActionInput == 'mul') document.getElementById("action").innerHTML = '*';
      if (userActionInput == 'div') document.getElementById("action").innerHTML = '/';
      if (userActionInput == 'pow') document.getElementById("action").innerHTML = '^';

      if (document.getElementById("equals").innerHTML == '=')
      {
        document.getElementById("value1").innerHTML = this.result;
        document.getElementById("secondNegative").innerHTML = '';
        document.getElementById("secondBracket").innerHTML = '';
        this.nextValueNegative = false;
        document.getElementById("negative").innerHTML = '';
        document.getElementById("value2").innerHTML = '';
        document.getElementById("equals").innerHTML = '';
        document.getElementById("result").innerHTML = '';

        this.arr2 = [];
        this.nextValue = 0;
      };
    };

    if (this.arr1.length == 0 && this.action == 'sub')
    {
      this.indicator1 = 'negative';
      this.indicator2 = 0;
      this.action = undefined;
      document.getElementById("negative").innerHTML = '-';
      document.getElementById("action").innerHTML = '';
    };
  },

  changeSign()
  {
    if (this.indicator2 == 0 && document.getElementById("negative").innerHTML != '-' && document.getElementById("equals").innerHTML != '=' && this.indicator1 != 'next')
    {
      this.indicator1 = 'negative';
      this.indicator2 = 0;
      this.action = undefined;
      document.getElementById("negative").innerHTML = '-';
      document.getElementById("action").innerHTML = '';
    } else if (this.indicator2 == 0 && document.getElementById("negative").innerHTML == '-' && document.getElementById("equals").innerHTML != '=' && this.indicator1 != 'next')
    {
      this.indicator1 = 0;
      this.indicator2 = 0;
      this.action = undefined;
      document.getElementById("negative").innerHTML = '';
      document.getElementById("action").innerHTML = '';
    } else if (this.indicator2 == 1 && this.action == 'sum' && document.getElementById("equals").innerHTML != '=')
    {
      this.insertAction('sub');
    } else if (this.indicator2 == 1 && this.action == 'sub' && document.getElementById("equals").innerHTML != '=')
    {
      this.insertAction('sum');
    } else if (document.getElementById("equals").innerHTML == '=')
    {
      this.result *= -1;

      document.getElementById("value1").innerHTML = this.result;
      document.getElementById("negative").innerHTML = '';
      //сбрасываем действие
      document.getElementById("action").innerHTML = '';
      document.getElementById("secondNegative").innerHTML = '';
      document.getElementById("secondBracket").innerHTML = '';
      this.nextValueNegative = false;
      document.getElementById("value2").innerHTML = '';
      document.getElementById("equals").innerHTML = '';
      document.getElementById("result").innerHTML = '';

      this.arr2 = [];
      this.nextValue = 0;

      this.indicator2 = 0;
    } else if (this.indicator1 == 'next' && this.indicator2 == 0)
    {
      this.result *= -1;

      document.getElementById("value1").innerHTML = this.result;
    } else if ( (this.action == 'mul' || this.action == 'div' || this.action == 'pow') && document.getElementById("equals").innerHTML != '=' && this.nextValueNegative == false)
    {
      this.nextValueNegative = true;
      document.getElementById("secondNegative").innerHTML = '(-';
    } else if (this.nextValueNegative)
    {
      document.getElementById("secondNegative").innerHTML = '';
      this.nextValueNegative = false;
    };
  },

  calculate()
  {
    if (this.arr2.length != 0 && document.getElementById("equals").innerHTML != '=')
    {
      this.read()[this.action]();

      document.getElementById("equals").innerHTML = '=';
      if (this.nextValueNegative) document.getElementById("secondBracket").innerHTML = ')';
      document.getElementById("result").innerHTML = this.result;

      this.indicator1='next';
    };
  },

  clearAll()
  {
    this.result = 0;
    this.nextValue = 0;
    this.action = undefined;
    this.arr1 = [];
    this.arr2 = [];
    this.indicator1 = 0;
    this.indicator2 = 0;
    this.nextValueNegative = false;
    document.getElementById("negative").innerHTML = '';
    document.getElementById("value1").innerHTML = '';
    document.getElementById("value2").innerHTML = '';
    document.getElementById("secondNegative").innerHTML = '';
    document.getElementById("secondBracket").innerHTML = '';
    document.getElementById("action").innerHTML = '';
    document.getElementById("equals").innerHTML = '';
    document.getElementById("result").innerHTML = '';
  },

  clearCurrent()
  {
    if (this.indicator1 == 0 && this.indicator2 == 0)
    {
      this.arr1 = [];
      document.getElementById("value1").innerHTML = '';
    } else if (this.indicator1 == 'negative' && this.indicator2 == 0)
    {
      this.indicator1 = 0;
      this.arr1 = [];
      document.getElementById("negative").innerHTML = '';
      document.getElementById("value1").innerHTML = '';
    } else if (this.indicator2 = 1 && document.getElementById("equals").innerHTML != '=')
    {
      this.arr2 = [];
      this.action = undefined;
      document.getElementById("value2").innerHTML = '';
      document.getElementById("action").innerHTML = '';
      document.getElementById("secondNegative").innerHTML = '';
      document.getElementById("secondBracket").innerHTML = '';
      this.nextValueNegative = false;
      this.indicator2 = 0;
    } else if (this.indicator1 = 'next' && document.getElementById("equals").innerHTML != '=')
    {
      this.arr2 = [];
      this.action = undefined;
      document.getElementById("value2").innerHTML = '';
      document.getElementById("action").innerHTML = '';
      document.getElementById("secondNegative").innerHTML = '';
      document.getElementById("secondBracket").innerHTML = '';
      this.nextValueNegative = false;
    } else if (document.getElementById("equals").innerHTML == '=')
    {
      this.clearAll();
    };
  },
};