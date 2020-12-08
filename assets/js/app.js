//-------- VARIABLES ----------
const listaTweets = document.querySelector('#lista-tweets');



//----------- EVENT LISTENERS ---------------
eventListeners();

function eventListeners(){
     //Cuando se envia el formulario
     document.querySelector('#formulario').addEventListener('submit', agregarTweet);

}

listaTweets.addEventListener('click', borrarTweet);

document.addEventListener('DOMContentLoaded', cargarTweetsLocalStorage())

// ---------- FUNCIONES -------------

// Añadir tuit del formulario

function agregarTweet(e){
     e.preventDefault();
     let tweet = document.getElementById('tweet').value;

     // crear boton
     const botonBorrar = document.createElement('a');
     botonBorrar.classList = 'borrar-tweet'
     botonBorrar.innerText = 'X';
     botonBorrar.style.color = '#ff0000';

     // crear elemento y añadirle texto
     const li = document.createElement('li');
     li.innerText = tweet;
     li.appendChild(botonBorrar);
     listaTweets.appendChild(li);

     // AÑADIR A LOCAL STORAGE
     agregarLocalStorage(tweet);   

     // BORRAR CONTENIDO 
     document.getElementById('tweet').value = ""

}
// ELIMINAR TWEET
function borrarTweet(e){
     e.preventDefault();
     console.log(e.target.classList);
     if (e.target.classList.contains('borrar-tweet')){
          e.target.parentElement.remove();
          borrarTweetLocalStorage(e.target.parentElement.innerText);
          // alert('Tweet eliminado');
         
     }
}

// AGREGAR tweet A LOCAL STORAGE

function agregarLocalStorage(tweet){
     let tweets;
     tweets = obtenerTweetsLocalStorage();
     tweets.push(tweet);
     localStorage.setItem('Tweets', JSON.stringify(tweets));
     
}

function obtenerTweetsLocalStorage(){
     let tweets;
     // revisamos los valores de local storage
     if (localStorage.getItem('Tweets') === null){
          tweets= [];
     } else {
          tweets = JSON.parse(localStorage.getItem('Tweets'));
     }
     return tweets;
}

// CARGAR TWEETS DESDE LOCALSTORAGE

function cargarTweetsLocalStorage(){
     let tweets; 
     tweets = obtenerTweetsLocalStorage();

     console.log(tweets);

     for (e in tweets){
          const botonBorrar = document.createElement('a');
          botonBorrar.classList = 'borrar-tweet'
          botonBorrar.innerText = 'X';
          botonBorrar.style.color = '#ff0000';
          const li = document.createElement('li');
          li.innerText = tweets[e];
          li.appendChild(botonBorrar);
          listaTweets.appendChild(li);
     }
}

function borrarTweetLocalStorage(tweet){
     let tweets, tweetBorrar;
     // Elimina la X del tuit
     tweetBorrar = tweet.substring(0, tweet.length - 1);

     tweets = obtenerTweetsLocalStorage();

     // for (e in tweets){
     //      if(tweetBorrar === tweets[e]){
     //           tweets.splice(e, 1);
     //      }
     // }
     tweets.forEach(function(elemento, index){
          if(tweetBorrar === elemento){
               tweets.splice(index, 1)
          }
     });


     localStorage.setItem('Tweets', JSON.stringify(tweets));
     
}

