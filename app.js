// variables
const listaTweets = document.getElementById('lista-tweets');


// event listener
eventListener();

function eventListener() {
	//cuando se envia el formulario
	// si usas query selector y te quieres referir a un id tienes que colocar #fomulario
	document.getElementById('formulario').addEventListener('submit', agregarTweet); //cuando un formulario lo envias el listener se llama submit 

	//borrar tweets
	listaTweets.addEventListener('click', borrarTweet); // dentro de los parentesis se le escribe el evento y la funcion 

	//contenido cargado 
	document.addEventListener('DOMContentLoaded', localStorageListo);
}

//funciones 

//añadir twwet del formulario 
function agregarTweet(e) {
	e.preventDefault(); //por que va a intentar abrir lo que tienes en el action del form y la acion por default es abrirlo y eso te generario un error 
	console.log('formulario enviado'); 
	// leer el valor del text area
	const tweet = document.getElementById('tweet').value;
	// crear boton de eliminar 
	const botonBorrar = document.createElement('a');
	botonBorrar.classList = 'borrar-tweet'; //para crearle una clase al elemento que estas creando 
	botonBorrar.innerText = 'X'; //innerText = '' viene a ser lo que vas a queres que diga en el nuevo elemento
	//crear elemento y añadirle el contenido a la lista 
	const li = document.createElement('li'); //para crear un elemento hacia el html
	// definir los elementos que se van a cargar al li
	li.innerText = tweet; //innerText representa el medio para poder escribir el texto que se quiere escribir
	li.appendChild(botonBorrar);  //agregar el enlace a el li(o tweet) que hemos creado
	//en esta linea va a agregar un elemento al padre en la utima pocicion que en este caso es el ultimo tweet creado
	listaTweets.appendChild(li); //agrega un nuevo nodo al final de la lista de un elemento hijo de un elememto padre



	// Añadir al local storage
	agregarTweetLocalStorage(tweet);


}

//borrar tweets
function borrarTweet(e){
	e.preventDefault();
	if(e.target.className === 'borrar-tweet'){ // classList te regresa todas las clases como si fuese un arreglo, class name te regresa todas las clases que hallan 
		//Con "classList", puede agregar o eliminar una clase sin afectar a ninguna otra que pueda tener el elemento. Pero si asigna "className", eliminará cualquier clase existente mientras agrega la nueva (o si asigna una cadena vacía, las eliminará a todas).
		
		e.target.parentElement.remove(); // cuando des click en la x va a obteener la clase del li ya qye parentElement te regresa el elemento cpntenedor
		borrarTweetLocalStorage(e.target.parentElement.innerText);
		
	} 
	

}

// agregar el tweet a local storage
function agregarTweetLocalStorage(tweet) { //tenemos que pasarle el texto que estamos agregando
	let tweets;
	tweets = obtenerTweetsLocalStorage();
	// añadir el nuevo tweet

	tweets.push(tweet); //le agregamos lo que estamos leyendo del texto escrito 
	// convertir de string a arreglo para local storage
	localStorage.setItem('tweets', JSON.stringify(tweets)); //stringify convierte un json a un strin

	
}
//comprobar que haya elementos en localstorage, retorna un arreglo




//leer los tweets que estan en el local storage
function obtenerTweetsLocalStorage(){
	let tweets; //inicializar una variable 
	// revisamos los valores del local storage
	if(localStorage.getItem('tweets') === null) { //vamos a revisar si este esta vacio
		tweets = []; //entonces esta variable inicia con una variable vacia 

	} else { // en el caso que ya posea algun elemento anterior 
		tweets = JSON.parse(localStorage.getItem('tweets'));

	}
	return tweets;
}

//mostrar datos de local storage en la lista 
function localStorageListo() {
	let tweets;

	tweets = obtenerTweetsLocalStorage(); //nos va aretornar dependiendo de la funcion de arriba 

	tweets.forEach( function(tweet) {
		//crear el boton eliminar
		const botonBorrar = document.createElement('a');
		botonBorrar.classList = 'borrar-tweet';
		botonBorrar.innerText = 'X';

		//crear elemento y añadirle el contenido a la lista
		const li = document.createElement('li');
		li.innerText = tweet;
		//añade el boton de borrar al tweet
		li.appendChild(botonBorrar);
		//añade el tweet a la lista
		listaTweets.appendChild(li);
	});
}

//eliminar tweet del local storage
function borrarTweetLocalStorage(tweet) {

	let tweets, tweetBorrar;
	//elimina la x del tweet
	tweetBorrar = tweet.substring(0, tweet.length - 1); //mediante substring se va a cortar y sacar la X y tweet lenth nos va a dar del 0 al 9 menos 1

	tweets = obtenerTweetsLocalStorage();

	tweets.forEach( function(tweet, index) { //te va a retornar el indice actual 
		if(tweetBorrar === tweet){ //si el tweet que quiero borrar es igual al tweet actual 
			tweets.splice(index, 1); // splice toma dos parametros la pocicion del arreglo que queremos eliminar y que tan lejos quieres ir en esa eliminacion 
		}
	});

	localStorage.setItem('tweets', JSON.stringify(tweets));
}








