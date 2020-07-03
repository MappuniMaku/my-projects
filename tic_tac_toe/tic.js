'use strict';

let game =
{
  step: 0,
  arr: [1, 1, 1, 1, 1, 1, 1, 1, 1],
  row1: 0,
  row2: 0,
  row3: 0,
  col1: 0,
  col2: 0,
  col3: 0,
  diag1: 0,
  diag2: 0,
  corners1: 0,
  corners2: 0,
  corners3: 0,

  putCross(n)
  {
    if (!document.getElementById(n).classList.contains('disabled'))
    {
      this.step++;
      document.getElementById(n).classList.add('cross');
      document.getElementById(n).classList.add('disabled');
      this.arr[n] = 2;
      this.evaluate();
    };
  },

  evaluate()
  {
    if (this.step == 1)
    {
      if (this.arr[4] == 1) this.putZero(4);
      else this.putZero(0);
    };

    if (this.step == 2)
    {
      if (this.checkDanger())
      {
        if (this.checkCorners())
        {
          if (this.checkSemiCorners()) this.createThreat();
        };
      };
    };

    if (this.step == 3)
    {
      if (this.checkVictory())
      {
        if (this.checkDanger())
        {
          this.createThreat();
        };
      };
    };

    if (this.step == 4)
    {
      if (this.checkVictory())
      {
        if (this.checkDanger())
        {
          this.randomZero();
        };
      };
    };

    if (this.step == 5)
    {
      setTimeout("alert('Ничья!')", 100);
    };
  },

  checkDanger()
  {
    this.calculateAll();

    if (this.row1 == 5)
    {
      for (let i = 0; i <= 2; i++)
      {
        if (this.arr[i] == 1) this.putZero(i);
      };
      return false;
    };

    if (this.row2 == 5)
    {
      for (let i = 3; i <= 5; i++)
      {
        if (this.arr[i] == 1) this.putZero(i);
      };
      return false;
    };

    if (this.row3 == 5)
    {
      for (let i = 6; i <= 8; i++)
      {
        if (this.arr[i] == 1) this.putZero(i);
      };
      return false;
    };

    if (this.col1 == 5)
    {
      for (let i = 0; i <= 6; i += 3)
      {
        if (this.arr[i] == 1) this.putZero(i);
      };
      return false;
    };

    if (this.col2 == 5)
    {
      for (let i = 1; i <= 7; i += 3)
      {
        if (this.arr[i] == 1) this.putZero(i);
      };
      return false;
    };

    if (this.col3 == 5)
    {
      for (let i = 2; i <= 8; i += 3)
      {
        if (this.arr[i] == 1) this.putZero(i);
      };
      return false;
    };

    if (this.diag1 == 5)
    {
      for (let i = 2; i <= 6; i += 2)
      {
        if (this.arr[i] == 1) this.putZero(i);
      };
      return false;
    };

    return true;
  },

  calculateAll()
  {
    this.row1 = this.arr[0] + this.arr[1] + this.arr[2];
    this.row2 = this.arr[3] + this.arr[4] + this.arr[5];
    this.row3 = this.arr[6] + this.arr[7] + this.arr[8];

    this.col1 = this.arr[0] + this.arr[3] + this.arr[6];
    this.col2 = this.arr[1] + this.arr[4] + this.arr[7];
    this.col3 = this.arr[2] + this.arr[5] + this.arr[8];

    this.diag1 = this.arr[2] + this.arr[4] + this.arr[6];
    this.diag2 = this.arr[0] + this.arr[4] + this.arr[8];

    this.corners1 = this.arr[0] + this.arr[8];
    this.corners2 = this.arr[2] + this.arr[6];
    this.corners3 = this.arr[4] + this.arr[8];

    this.semiCorner1 = this.arr[0] + this.arr[1] + this.arr[2] + this.arr[5];
    this.semiCorner2 = this.arr[0] + this.arr[3] + this.arr[6] + this.arr[7];
    this.semiCorner3 = this.arr[0] + this.arr[1] + this.arr[2] + this.arr[3];
    this.semiCorner4 = this.arr[2] + this.arr[5] + this.arr[8] + this.arr[7];
    this.semiCorner5 = this.arr[6] + this.arr[7] + this.arr[8] + this.arr[3];
    this.semiCorner6 = this.arr[2] + this.arr[5] + this.arr[8] + this.arr[1];
    this.semiCorner7 = this.arr[6] + this.arr[7] + this.arr[8] + this.arr[5];
    this.semiCorner8 = this.arr[0] + this.arr[3] + this.arr[6] + this.arr[1];
  },

  checkCorners()
  {
    if (this.corners1 == 4 || this.corners2 == 4)
    {
      this.putZero(1);
      return false;
    };

    if (this.corners3 == 4)
    {
      this.putZero(2);
      return false;
    };

    return true;
  },

  checkSemiCorners()
  {
    if (this.semiCorner1 == 6 || this.semiCorner6 == 6)
    {
      this.putZero(2);
      return false;
    };
    if (this.semiCorner4 == 6 || this.semiCorner7 == 6)
    {
      this.putZero(8);
      return false;
    };
    if (this.semiCorner2 == 6 || this.semiCorner5 == 6)
    {
      this.putZero(6);
      return false;
    };
    if (this.semiCorner3 == 6 || this.semiCorner8 == 6)
    {
      this.putZero(0);
      return false;
    };
    return true;
  },

  checkVictory()
  {
    this.calculateAll();

    if (this.row1 == 1)
    {
      for (let i = 0; i <= 2; i++)
      {
        if (this.arr[i] == 1) this.putZero(i);
      };
      this.defeat();
      return false;
    };

    if (this.row2 == 1)
    {
      for (let i = 3; i <= 5; i++)
      {
        if (this.arr[i] == 1) this.putZero(i);
      };
      this.defeat();
      return false;
    };

    if (this.row3 == 1)
    {
      for (let i = 6; i <= 8; i++)
      {
        if (this.arr[i] == 1) this.putZero(i);
      };
      this.defeat();
      return false;
    };

    if (this.col1 == 1)
    {
      for (let i = 0; i <= 6; i += 3)
      {
        if (this.arr[i] == 1) this.putZero(i);
      };
      this.defeat();
      return false;
    };

    if (this.col2 == 1)
    {
      for (let i = 1; i <= 7; i += 3)
      {
        if (this.arr[i] == 1) this.putZero(i);
      };
      this.defeat();
      return false;
    };

    if (this.col3 == 1)
    {
      for (let i = 2; i <= 8; i += 3)
      {
        if (this.arr[i] == 1) this.putZero(i);
      };
      this.defeat();
      return false;
    };

    if (this.diag1 == 1)
    {
      for (let i = 2; i <= 6; i += 2)
      {
        if (this.arr[i] == 1) this.putZero(i);
      };
      this.defeat();
      return false;
    };

    if (this.diag2 == 1)
    {
      for (let i = 0; i <= 8; i += 4)
      {
        if (this.arr[i] == 1) this.putZero(i);
      };
      this.defeat();
      return false;
    };

    return true;
  },

  createThreat()
  {
    if (this.row1 == 2)
    {
      for (let i = 0; i <= 2; i++)
      {
        if (this.arr[i] == 1) return this.putZero(i);
      };
    };

    if (this.row2 == 2)
    {
      for (let i = 3; i <= 5; i++)
      {
        if (this.arr[i] == 1) return this.putZero(i);
      };
    };

    if (this.row3 == 2)
    {
      for (let i = 6; i <= 8; i++)
      {
        if (this.arr[i] == 1) return this.putZero(i);
      };
    };

    if (this.col1 == 2)
    {
      for (let i = 0; i <= 6; i += 3)
      {
        if (this.arr[i] == 1) return this.putZero(i);
      };
    };

    if (this.col2 == 2)
    {
      for (let i = 1; i <= 7; i += 3)
      {
        if (this.arr[i] == 1) return this.putZero(i);
      };
    };

    if (this.col3 == 2)
    {
      for (let i = 2; i <= 8; i += 3)
      {
        if (this.arr[i] == 1) return this.putZero(i);
      };
    };

    if (this.diag1 == 2)
    {
      for (let i = 2; i <= 6; i += 2)
      {
        if (this.arr[i] == 1) return this.putZero(i);
      };
    };

    if (this.diag2 == 2)
    {
      for (let i = 0; i <= 8; i += 4)
      {
        if (this.arr[i] == 1) return this.putZero(i);
      };
    };
  },

  defeat()
  {
    for (let i = 0; i < this.arr.length; i++)
    {
      document.getElementById(i).classList.add('disabled');
    };

    setTimeout("alert('Вы проиграли!')", 100);
  },

  randomZero()
  {
    for (let i = 0; i < this.arr.length; i++)
    {
      if (this.arr[i] == 1) return this.putZero(i);
    };
  },

  putZero(n)
  {
    document.getElementById(n).classList.add('zero');
    document.getElementById(n).classList.add('disabled');
    this.arr[n] = 0;
  },
};