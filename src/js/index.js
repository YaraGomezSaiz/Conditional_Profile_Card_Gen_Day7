/** IMPORT NECESARIO POR USAR WEBPACK */
import "../style/index.scss";

/**
 VARIABLES INCLUIDAS EN EL FORMULARIO
*    {
        includeCover: true, // if includeCover is true the algorithm should
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the url of the image that will used as background for the profile cover
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
        socialMediaPosition: "left", // social media bar position (left or right)
        
        twitter: null, // social media usernames
        github: "alesanchezr",
        linkedin: null,
        instagram: null,

        name: null,
        lastname: null,
        role: null,
        country: null,
        city: null
    }
 */

/*FUNCION RENDER se utiliza para introducir los valores de las variables en el HTML */

function render(variables = {}) {
  //se imprime por consola el valor de las variables introducidas
  console.log("These are the current variables: ", variables); //print on the console

  //Se define la opcion de que insertar en caso de que los valores sean nulos
  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover == false) cover = "<div class='cover'></div>";

  let name_aux = variables.name;
  if (variables.name === null) {
    name_aux = "Name";
  }

  let role_aux = variables.role;
  if (variables.role === null) {
    role_aux = "Role";
  }

  let city_aux = variables.city;
  if (variables.city == null) {
    city_aux = "City";
  }

  let country_aux = variables.country;
  if (variables.country === null) {
    country_aux = "Country";
  }

  //Se reemplaza toda la etiqueta "<div class="widget"> </div> por lo que se escribe a continuacion

  document.querySelector("#widget_content").innerHTML = `<div class="widget">
            ${cover}
          <img src="${variables.avatarURL}" class="photo" />
           <h1> ${name_aux}</h1>
          <h2>${role_aux}</h2>
          <h3> ${city_aux}, ${country_aux} </h3>
          <ul class="${variables.socialMediaPosition}">
            <li><a href="${variables.twitter}"><i class="fa fa-twitter"></i></a></li>
            <li><a href="${variables.github}"><i class="fa fa-github"></i></a></li>
            <li><a href="${variables.linkedin}"><i class="fa fa-linkedin"></i></a></li>
            <li><a href="${variables.instagram}"><i class="fa fa-instagram"></i></a></li>
          </ul>
        </div>
    `;
}

/**
 FUNCION WINDOW.ONLOAD Realiza lo que se defina en la funcion al cargar la pagina- 
 function () -pone valores por defecto en todas las variables
 */
window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should
    includeCover: true,
    // this is the url of the image that will used as background for the profile cover
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    // this is the url for the profile avatar
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    // social media bar position (left or right)
    socialMediaPosition: "position-left",
    // social media usernames
    twitter: null,
    github: "alesanchezr",
    linkedin: null,
    instagram: null,
    name: null,
    lastname: null,
    role: null,
    country: null,
    city: null
  };

  //LLAMADA FUNCION RENDER

  render(window.variables); //render the card for the first time

  /*FUNCION QUE COMPRUEBA CUANDO SE PRODUCE UN CAMBIO EN CADA SELECTOR "picker" (campos de texto o selectores)
Si detecta un cambio asigna los valores con "Object.assign(target, source);" y los pasa como param de render*/

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new valus
    });
  });
};
