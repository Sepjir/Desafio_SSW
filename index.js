// Almacenando modulos NODE JS en variables
const http = require('http')
const url = require('url')
const fs = require('fs')

// fecha en formato DD/MM/AAAA
let fecha = new Date()

let dia = fecha.getDate()
let mes = fecha.getMonth() + 1
let ano = fecha.getFullYear()

let diaMesAno = ""

if (mes < 10) {
    diaMesAno = `${dia} / 0${mes} / ${ano}`
} if (dia < 10) {
    diaMesAno = `0${dia} / ${mes} / ${ano}`
} if (dia < 10 && mes < 10) {
    diaMesAno = `0${dia} / 0${mes} / ${ano}`
}else {
    diaMesAno = `${dia} / ${mes} / ${ano}`
}

//Creando servidor sobre puerto 8080 en Localhost, con condicionantes de creación de archivos en urls descritas
http
  .createServer(function (req, res) {
    const params = url.parse(req.url, true).query;
    const nombre = params.archivo;
    const contenido = params.contenido;
    const nuevoNombre = params.nuevoNombre;
    const reNombre = params.nombre;

    if (req.url.includes("/crear")) {
      fs.writeFile(
        nombre,
        `Fecha: ${diaMesAno}
${contenido}`,
        "utf-8",
        () => {
          res.write(`El archivo de nombre "${nombre}" ha sido creado`);
          console.log(
            `El archivo "${nombre}" ha sido creado con fecha ${diaMesAno}`
          );
          res.end();
        }
      );
    }
    if (req.url.includes("/leer")) {
      fs.readFile(nombre, "utf-8", (err, data) => {
        res.write(`El contenido del archivo ${nombre} es el siguiente:

${data}`);
        console.log(`Contenido del archivo : ${String(data)}`);
        res.end();
      });
    }
    if (req.url.includes("/renombrar")) {
      fs.rename(reNombre, nuevoNombre, (err, data) => {
        res.write(`Archivo "${reNombre}" se ha renombrado a "${nuevoNombre}"`);
        console.log(`Archivo "${reNombre}" se renombro a "${nuevoNombre}"`);
        res.end();
      });
    }
    if (req.url.includes("/eliminar")) {
      console.log(
        `Tu solicitud para eliminar el archivo "${nombre}" se está procesando`
      );
      res.write(
        `Tu solicitud para eliminar el archivo "${nombre}" se está procesando`
      );
      res.end();

      setTimeout(() => {
        fs.unlink(nombre, (err, data) => {
          console.log(`Archivo "${nombre}" eliminado con exito`);
          res.write(`Archivo "${nombre}" eliminado con exito`);
          res.end();
        });
      }, 3000);
    }
  })
  .listen(8080, () => console.log("Servidor levantado en puerto 8080"));