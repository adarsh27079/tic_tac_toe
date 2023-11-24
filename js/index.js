   const audioFile =new Audio('./assets/tune.mp3');
   const dancingGif =document.getElementById('gif');
   const darkMode=document.getElementById('toggle-Btn');
   const Header =document.getElementById('header');
   const msg =document.getElementById('message');
   const main =document.getElementById('main');
   const body = document.body;
   let playingCongrats =true;
   
   //darkMode
   darkMode.addEventListener('click', () => {
     Header.classList.toggle("bg-gray-900")
     Header.classList.toggle("text-white")
     darkMode.classList.toggle("bg-pink-400")
     main.classList.toggle("bg-black")
     body.classList.toggle('dark');
     msg.classList.toggle('text-white')
     const boardCell = document.getElementsByClassName('cell');
     
     for(let i=0; i<boardCell.length; i++){
       boardCell[i].classList.toggle('text-white');
       boardCell[i].classList.toggle('bg-blue-900');
     }
     
   })
  
  
    const playerX = "X";
    const playerO = "O";
    
    let currentPlayer = playerX;
    let board=[ '', '', '', '', '', '', '', '', ''];
    let gameActive =true;
    
    
    const winningCombination =[
      [0,1,2], [3,4,5], [6,7,8], 
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
      ];
      
      
      //funtion to handle cell onclick
      function makeMove(cellIndex){
        if(gameActive && board[cellIndex] === ''){
          board[cellIndex] = currentPlayer;
          renderBoard();
          checkGameStatus();
          togglePlayer();
        }
      }
      
      //togglePlayer
      function togglePlayer(){
        currentPlayer = (currentPlayer === playerX) ? playerO : playerX;
      }
      
      //function for checkGameStatus
      function checkGameStatus(){
        playingCongrats =true;
        if(checkWin()){
          displayMessage('player'+currentPlayer+'wins :)');
          congrats();
          gameActive=false;
        }else if(checkDraw()){
          displayMessage('Draw!, play again');
          gameActive=false;
        }
      }
      
      
      function removeHighlight() {
        const cells = document.getElementsByClassName('cell');
        for (let i = 0; i < cells.length; i++) {
         cells[i].classList.remove('bg-pink-400');
         }
      }
      
      
      //function  for checkwin
      function checkWin(){
        const cell=document.getElementsByClassName('cell');
        for(let i=0; i<winningCombination.length; i++){
          const [a,b,c]= winningCombination[i];
          if(board[a] !=='' && board[a]===board[b] && board[a]===board[c]){
            cell[a].classList.add('bg-pink-400');
            cell[b].classList.add('bg-pink-400');
            cell[c].classList.add('bg-pink-400');
            return true;
           
          }
          
        }
        return false;
      }
      
      
      // Function to check for a draw
       function checkDraw() {
         return !board.includes('');
        }
     
     
     //function to reset the game
     function resetGame(){
       console.log('reset game fired');
       playingCongrats =false;
       currentPlayer =playerX;
       board=[ '', '', '', '', '', '', '', '', ''];
       gameActive =true;
       displayMessage('');
       congrats();
       clearBoard();
       removeHighlight();
       renderBoard();
     }
     
      //clear board
      function clearBoard(){
         const cell=document.getElementsByClassName('cell');
         for(let i=0; i<cell.length; i++){
          cell[i].textContent ='';
        }
      };
    
      //rendering board
      function renderBoard(){
        const cell = document.getElementsByClassName('cell');
        for(let i=0; i<=8; i++){
          cell[i].textContent = board[i];
        }
      };
      
     //display message
     function displayMessage(message){
       const messageDiv =document.getElementById('message');
       messageDiv.textContent =message;
     }
      
      renderBoard();
      
      //congratulaton on winning
      function congrats(){
        if(!playingCongrats){
          audioFile.pause();
          audioFile.currentTime = 0;
        }else{
        audioFile.play();
        audioFile.loop=true;
        audioFile.volume=0.5;
        msg.innerHTML='<image class="w-56" id="gif" src="assets/dancing.gif" alt="dancing.gif" />'
        }
      }