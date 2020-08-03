import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

// debounceTime sirve para reaccionar después de un tiempo de inactividad dentro del formulario
import {debounceTime} from 'rxjs/operators'; 
import { HttpClient } from '@angular/common/http';
import { jitOnlyGuardedExpression } from '@angular/compiler/src/render3/util';

// Animación de SweetAlert2
import Swal from 'sweetalert2'


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  // Declaro una instancia para controlar todo el formulario
  formulario : FormGroup

  // Variable para recibir todo el contenido del Json
  conversion : any;

  // Declaro 2 array, uno para los departamentos y otro para las ciudades que vendrán del json
  states: any;
  cities:any;

   // Carga la Lista de los Departamentos y Ciudades Automáticamente
   changeCountry(country) {
    this.cities = this.states.find(elemento => elemento.departamento == country).ciudades;
  }

  constructor(private http:HttpClient, private formBuilder:FormBuilder) 
  {
    // Inicialización inmediata  :: ngOnInit se usa frecuentemente para haer peticiones de datos 
    this.buildForm();
  }

   // Hago una instancia del formulario y dentro de un objeto con clave : valor
  // Hay 2 parámetros, el primero es un valor inicial y el segundo un array de validaciones
  private buildForm() {

    // Declaro la validacion del Formulario
    this.formulario = this.formBuilder.group
    ({
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      name: ['', [Validators.required,Validators.maxLength(50)]],
      email: ['', [Validators.required,Validators.email]]
    });

    this.formulario.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe(value => {
      console.log(value);
    }); 
  }

  // Limpieza de Código
  // - Recuper los campos para que no sea tan repetitiva el llamado a dichos campos cuando trabaje con los errores
  get stateField(){
    return this.formulario.get('state');
  }
  get cityField(){
    return this.formulario.get('city');
  }
  get nameField(){
    return this.formulario.get('name');
  }
  get emailField(){
    return this.formulario.get('email');
  }

  // Metodo que envia el formulario al Backend en Formato Json directamente
  enviar(event: Event)
  {
    // Cancelo el refresh nativo de html de toda la página
    event.preventDefault();
    

    // Pregunto si el formulario es válido
    if(this.formulario.valid){
      const url_post = 'http://localhost:3002/contacto/create';
      
      // Obtenfo todos valores del formulario
      const valores = this.formulario.value;
      this.http.post(url_post, valores)
      .subscribe((result)=>{
        console.warn("result",result)
      })
      console.warn(valores);

      // Animación de Confirmación
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Datos Almacenados Exitosamente!',
        showConfirmButton: false,
        timer: 2200
      })

    }else{
      // Activo todos los errores en el formulario
      this.formulario.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    // Consumo de API REST :: Obtengo los datos de la url 
    // https://jsonplaceholder.typicode.com/users
    this.http.get("https://raw.githubusercontent.com/skrpions/Colombia/master/colombia.json")
    .subscribe( 
    // En caso de todo salga bien
    data => {

      // Recibo el json 
      this.states = data;
      console.log("Respuesta states",this.states);
      
    }),

    // En caso de que ocurra un error
    error => console.log(error),

    // En caso de que ocurra cualquiera de las 2 anteriores
    () => console.log("Petición Finalizada");
  
  }

}
