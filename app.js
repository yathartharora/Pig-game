/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore,activePlayer,dice1,dice2,gamePlaying,previous;


init();

document.querySelector('.btn-roll').addEventListener('click', function btn(){

    if(gamePlaying){
        dice1 = Math.floor(Math.random()*6 + 1);
        dice2 = Math.floor(Math.random()*6 + 1);
        if(dice1===6 && dice2==6){
          nextPlayer();
        }

        document.getElementById('dice1').style.display = 'block';
        document.getElementById('dice2').style.display = 'block';
        document.getElementById('dice1').src = 'dice-'+dice1+'.png';
        document.getElementById('dice2').src = 'dice-'+dice2+'.png';
        /*var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-'+dice+'.png';*/

        if(dice1>1 || dice2>1){
        roundScore += (dice1 + dice2);
        document.querySelector('#current-'+ activePlayer).textContent = roundScore;
        } else{
          nextPlayer();
        }
    }


});

  document.querySelector('.btn-hold').addEventListener('click',function()  {

    if(gamePlaying){

        scores[activePlayer] += roundScore;
        previous = 0;

        var input = document.querySelector('.final-score').value;
        if(input===0){
          input = 100;
        }


        document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

        if(scores[activePlayer]>=input){
          document.querySelector('#name-'+activePlayer).textContent = 'WINNER';
          document.querySelector('.dice').style.display = 'none';
          document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('winner');
          gamePlaying = false;
        } else{
          nextPlayer();
        }
    }
  });

function nextPlayer() {
  if(activePlayer===0){
    activePlayer=1;
  }else{
    activePlayer=0;
  }
  roundScore=0;

  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.querySelector('.dice').style.display = 'none';

}

document.querySelector('.btn-new').addEventListener('click',init);

function init() {

  scores = [0,0];
  activePlayer = 0;
  roundScore = 0;
  previous = 0;
  gamePlaying = true;
  document.getElementById('dice1').style.display = 'none';
  document.getElementById('dice2').style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player-1';
  document.getElementById('name-1').textContent = 'Player-2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');


}
//dice = Math.floor(Math.random()*6 + 1)
//console.log(dice);
//document.querySelector('#current-'+ activePlayer).textContent = dice;
//document.querySelector('#current-'+ activePlayer).innerHTML = '<em>' + dice + '<em>';
