var estudiantes = [];
var storage = window.localStorage;
//Local Storage
window.onload = function Cargar() 
{
  if (typeof (storage) !== "undefined") 
  {
    if (storage.length > 0) 
    {
      estudiantes = JSON.parse(storage.getItem("estudiantes"));
      cargarTabla(estudiantes);
    }
  }
  else 
  {
    alert("NO ENCONTRADO");
  }
};

function limpiarFormulario(inputs){
  inputs.forEach(function(v,i){
    var nombre = document.getElementById(v).value ="";
  });
}


function buscarEstudiantePorMatricula(matricula){
  var estudiante = null;

  estudiantes.forEach(function(v,i) {
    if (v.matricula === matricula) {
      estudiante=v;
    }
  });
}

function editarEstudiante(btnEditar){
  var matricula = btnEditar.getAttribute("data-matricula");
  //alert(matricula);
  var estudiante = buscarEstudiantePorMatricula(matricula);

  if (estudiante == null) {
    console.log("No encontrado...");
    return;
  }

  nombre = document.getElementById("nombre").value = estudiante.nombre;
  matricula = document.getElementById("matricula").value = estudiante.matricula;
  identificacion = document.getElementById("identificacion").value = estudiante.identificacion;
}


//Funcion que realiza el agregado de los estudiantes
function agregarEstudiante(estudiante){
  estudiantes.push(estudiante);
  
  storage.setItem("estudiantes", JSON.stringify(estudiantes));
  
  var tablaEstudiante = document.getElementById("tablaEstudiante");
  
  var tr = document.createElement("tr");
  var tdNombre = document.createElement("td");
  var tdMatricula = document.createElement("td");
  var tdIdentificacion = document.createElement("td");
  var tdActions = document.createElement("td");

  var btnEditar = document.createElement("button");
  btnEditar.className = "btn btn-primary"
  btnEditar.textContent ="Editar";
  btnEditar.setAttribute("onclick", "editarEstudiante(this);")
  btnEditar.setAttribute("data-matricula", estudiante.matricula);
  tdActions.appendChild(btnEditar);
  
  
  tdNombre.textContent = estudiante.nombre;
  tdMatricula.textContent = estudiante.matricula;
  tdIdentificacion.textContent = estudiante.identificacion;
  
  
  tr.appendChild(tdNombre);
  tr.appendChild(tdMatricula);
  tr.appendChild(tdIdentificacion);
  tr.appendChild(tdActions);

  tablaEstudiante.appendChild(tr);
  
}
//Leemos los estudiantes a introducir si no estan vacios se insertan
function leerEstudiante(){

  var nombre = document.getElementById("nombre").value;
  var matricula = document.getElementById("matricula").value;
  var identificacion = document.getElementById("identificacion").value;

  var est = new Estudiante();
  est.nombre =nombre;
  est.matricula = matricula;
  est.identificacion = identificacion;
  
  if(nombre !== "" && matricula !== "" && identificacion !== ""){

    agregarEstudiante(est);
    limpiarFormulario(["nombre","matricula","identificacion"]);
    
  }else {

    alert("Campos en blanco");
  }

}

//Cargamos Tabla
function cargarTabla(estudiantes)
{
  this.estudiantes = [];
  estudiantes.forEach(
    function(v,i)
    {
      agregarEstudiante(v);
    }
    );
}