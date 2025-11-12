//La página HTML (`index.html`) tiene una lista (`ul`) con el id `listaUsuarios` donde se mostrarán los detalles de los usuarios.


//- Obtiene datos simulados de usuarios desde la API JSONPlaceholder `https://jsonplaceholder.typicode.com/users`.
// - Agrega una edad aleatoria a cada usuario.
// - Cada usuario tendrá una imagen asociada por `ID` (están en la carpeta assets/img) son extensión `.jpeg`  
// - Muestra detalles específicos de cada usuario en la lista en el DOM: name, age, username, img, phone, email, company, address
// - address tendrá estos datos como valor: usuario.address.street, usuario.address.suite, usuario.address.city

// spread operator. Crea un nuevo array con el objeto y con los nuevos datos a añadir (age, img, address con los nuevos datos)

const fotos = ['./assets/img/1.jpeg', './assets/img/2.jpeg', './assets/img/3.jpeg', './assets/img/4.jpeg', './assets/img/5.jpeg', './assets/img/6.jpeg', './assets/img/7.jpeg', './assets/img/8.jpeg', './assets/img/9.jpeg', './assets/img/10.jpeg'];
console.log(fotos);

const listaUsuarios = document.getElementById('listaUsuarios');

function obtenerUsuarios() {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      if (!response.ok) throw new Error('El servidor no responde');
      return response.json();
    })
    .then(data => {
      console.log(data);
      // Recorrer array
      const template = data.map((user, index) => {
        // Edad aleatoria entre 18 y 65
        const edad = Math.floor(Math.random() * (65 - 18 + 1)) + 18;

        // Destructuring de los campos que nos interesan
        const {
          name,
          username,
          phone,
          email,
          company: { name: companyName },
          address: { street, suite, city }
        } = user;

        // Crear nuevo objeto usando spread
        const userCompleto = {
          ...user,
          age: edad,
          img: fotos[index],
          address: `${street}, ${suite}, ${city}`
        };


        return `<li class="usuario">
        <div class="datos">
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Edad:</strong> ${userCompleto.age}</p>
          <p><strong>Usuario:</strong> ${username}</p>
          <p><strong>Teléfono:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
        </div>
        <div class="foto">
         <img src="${userCompleto.img}" alt="${name}">
        </div>
          <div class="company">
          <p><strong>Empresa:</strong> ${companyName}</p>
          <p><strong>Dirección:</strong> ${userCompleto.address}</p>
          </li>
          </div>
        `;
      }).join('');
      listaUsuarios.innerHTML = template;
    })
    .catch(error => {
      listaUsuarios.innerText = error.message;
    });
}

obtenerUsuarios()




