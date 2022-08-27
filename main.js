function onClick(event) {
  //anula el evento por defecto que tiene un boton dentro de un formulario
  //cuando se presiona un boton dentro de un formulario lo que hace el evento es buscar
  //dentro del formulario el sript asociado e intenta enviar informacion
  //por eso se anula la accion normal del boton antes de enviar hay que procesar
  event.preventDefault();

  const mensaje = {
    comercio: document.getElementById("comercio").value,
    titular: document.getElementById("titular").value,
    celular: document.getElementById("celular").value,
    message: document.getElementById("message").value,
  };
  console.log(mensaje);

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(mensaje),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      Swal.fire("Enviado", "Gracias por tu comentario", "success");
      cleanForm();
      /* redirectUrl(); */
    })
    .catch((err) => console.log(err));
}

function cleanForm() {
  let formulario = document.getElementById("formulario");
  formulario.reset();
}
function redirectUrl() {
  window.location.href = "https://google.com";
}

let boton = document.getElementById("enviar");
//cuando se capture el click dek usuario, se ejecuta la funcion onclick
boton.addEventListener("click", onClick);

//---clima

window.addEventListener("load", () => {
  let temperaturaValor = document.getElementById("temperatura-valor");
  let temperaturaDescripcion = document.getElementById(
    "temperatura-descripcion"
  );

  let ubicacion = document.getElementById("ubicacion");
  let iconoAnimado = document.getElementById("icono-animado");

  let vientoVelocidad = document.getElementById("viento-velocidad");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((posicion) => {
      //coordenadas ciudad cultural
      lon = -65.3309438515912;
      lat = -24.18324151358606;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=7e6fa103b201047e0873faf953ba25b6`;
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          //temperatura
          let temp = Math.round(data.main.temp);
          temperaturaValor.textContent = `${temp} ºC`;
          //descripcion temperatura
          let desc = data.weather[0].description;
          temperaturaDescripcion.textContent = desc.toUpperCase();
          //ubicacion
          ubicacion.textContent = data.name;
          //viento
          vientoVelocidad.textContent = `${data.wind.speed} m/s`;
          console.log(data);
          //iconos animados clima
          console.log(data.weather[0].main);
          //asignacion del icono segun descripcion
          switch (data.weather[0].main) {
            case "Thunderstorm":
              iconoAnimado.src = "/assets/iconosAnimadosClima/thunder.svg";
              console.log("TORMENTA");
              break;
            case "Drizzle":
              iconoAnimado.src = "/assets/iconosAnimadosClima/rainy-2.svg";
              console.log("LLOVIZNA");
              break;
            case "Rain":
              iconoAnimado.src = "/assets/iconosAnimadosClima/rainy-7.svg";
              console.log("LLUVIA");
              break;
            case "Snow":
              iconoAnimado.src = "/assets/iconosAnimadosClima/snowy-6.svg";
              console.log("NIEVE");
              break;
            case "Clear":
              iconoAnimado.src = "/assets/iconosAnimadosClima/day.svg";
              console.log("LIMPIO");
              break;
            case "Atmosphere":
              iconoAnimado.src = "/assets/iconosAnimadosClima/weather.svg";
              console.log("ATMOSFERA");
              break;
            case "Clouds":
              iconoAnimado.src = "/assets/iconosAnimadosClima/cloudy-day-1.svg";
              console.log("NUBES");
              break;
            default:
              iconoAnimado.src = "/assets/iconosAnimadosClima/cloudy-day-1.svg";
              console.log("por defecto");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
});
