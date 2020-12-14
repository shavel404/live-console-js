const randState = ()=> Math.random() > 0.5? 1:0

const getRandomInt = () => Math.floor(Math.random() * (10 - 3) + 3) 

const init = (desk, usefile) =>{

  let m, n

  if (!usefile){
    
    m = getRandomInt()
    n = getRandomInt()

    for(let i = 0; i < m; i++){
      desk[i] = new Array(n)
      for (let j = 0; j < n; j++)
        desk[i][j] = randState()
    }
  }
    else{
      desk = stateDefault
      m = desk.length
      n = desk[0].length
    }

  return [desk, m, n]

}

const changeState = (desk, m, n) =>{

  let newDesk = []

  for(let i = 0; i < m; i++){
    newDesk[i] = new Array(m)

    for (let j = 0; j < n; j++){

      newDesk[i][j] = desk[i][j]

      const live = detect(desk, m, n, i, j)
   
      if (desk[i][j] === 1 && (live < 2 || live > 3)){
          newDesk[i][j] = 0
      }
        else 
          if (desk[i][j] === 0 && live ===3)
              newDesk[i][j] = 1
    }
     
  }

  return newDesk

}

const output = (desk, m, n) =>{

  let log

  for(let i = 0; i < m; i++){
    log = ''
    for (let j = 0; j < n; j++)
      log+=`[${desk[i][j]}]`
    
    console.log(`${log}   ${i+1}`)    //строки нумирую чтоб в хроме не стакались одинаковые
  }

  log = ''

  for (let i = 0; i < m*3+2;i++)
    log+='_'

  console.log(log)

}

//определяет количество живых клеток вокруг клетки 
const detect = (desk, m,  n, i, j) =>{

  let live = 0
 
  for(let k = i - 1; k < (i - 1) + 3; k++)
    for(let l = j - 1; l < (j - 1) + 3; l++)
      if(!(k === i && l ===j))
        if (k >= 0 && l >= 0 && k < m && l < n)
          if (desk[k][l] === 1) live++
      
  return live

}


const start = (usefile = false) =>{

  let desk = [], m, n

  [desk, m, n] = init(desk, usefile)

  setInterval(()=>{

    output(desk, m, n)
    desk = changeState(desk, m, n)

  },1000)

}