let playerText=document.querySelector('#playerText')
let restartBtn=document.querySelector('#restartBtn')
let boxes=Array.from(document.getElementsByClassName('box')) 
let winnerIndicator=getComputedStyle(document.body).getPropertyValue('--winning-blocks')

console.log(boxes)

const O_TEXT='O'
const X_TEXT='X'
let currentPlayer=X_TEXT
let spaces=Array(9).fill(null)

const startGame=()=>{
    boxes.forEach(box=>box.addEventListener('click',boxClicked))
}

function boxClicked(e){
    const id=e.target.id
    // console.log(id)
    if(spaces[id]===null){
        spaces[id]=currentPlayer
        e.target.innerText=currentPlayer
        currentPlayer=currentPlayer==X_TEXT?O_TEXT:X_TEXT

        if(playerWon()!==false){
            playerText=`${currentPlayer} has Won!!!`
            let winningBlocks=playerWon()
            winningBlocks.map(box=>boxes[box].style.backgroundColor=winnerIndicator)
            return
        }
    }
}

const winningCombo=[
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
]

function playerWon(){
    for (const condition of winningCombo) {
        let [a,b,c]=condition

        if(spaces[a]&&(spaces[a]==spaces[b]&&spaces[a]==spaces[c])){
            return [a,b,c]
        }
    }
    return false
}


restartBtn.addEventListener('click',restart)

function restart(){
    spaces.fill(null)
    boxes.forEach(box=>{
        box.innerText=''
        box.style.backgroundColor=''
    })
    currentPlayer=X_TEXT
    playerText='Tic Tac Toe'
}

startGame()