import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// debounceTime sirve para reaccionar después de un tiempo de inactividad dentro del formulario
import { HttpClient } from '@angular/common/http';

// Animación de SweetAlert2
import Swal from 'sweetalert2';
import { DepartamentosService } from '../../Servicios/departamentos.service';


@Component({
    selector: 'app-formulario',
    templateUrl: './formulario.component.html',
    styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

    // Declaro una instancia para controlar todo el formulario
    formulario: FormGroup;
    public departamentos = [{}];

    // Variable para recibir todo el contenido del Json
    conversion: any;

    // Declaro 2 array, uno para los departamentos y otro para las ciudades que vendrán del json
    public states: any[] = [{}];
    public cities: string[] = [];



    constructor(
        private http: HttpClient,
        private formBuilder: FormBuilder,
        private _departamentosSvc: DepartamentosService
    ) {
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
                name: ['', [Validators.required, Validators.maxLength(50)]],
                email: ['', [Validators.required, Validators.email]]
            });

        this.formulario.valueChanges
            .subscribe(value => {
                console.log(value);

                if (value.state === '') {
                    this.formulario.get('city').reset;

                }
            });
    }

    // Limpieza de Código
    // - Recuper los campos para que no sea tan repetitiva el llamado a dichos campos cuando trabaje con los errores
    get stateField() {
        return this.formulario.get('state');
    }
    get cityField() {
        return this.formulario.get('city');
    }
    get nameField() {
        return this.formulario.get('name');
    }
    get emailField() {
        return this.formulario.get('email');
    }

    ngOnInit(): void {
        try {

            // Consumo de API REST :: Obtengo los datos de la url 
            this._departamentosSvc.getDepartamentos().subscribe(Departamentos => {

                this.llenarDepartamentos(Object.entries(Departamentos));

            });

        } catch (error) {
            console.log('Error: ', error);
        }

    }

    private llenarDepartamentos(departamentos: any): void {
        //console.log('Departamentos & Ciudades: ', departamentos);

        for (const departamento of departamentos) {

            this.departamentos.push({
                Departamento: departamento[0],
                Ciudades: departamento[1]
            });

        }

        // Elimino el primero elemento del array : Vacio
        this.departamentos.shift();

        console.log('Departamentos: ', this.departamentos);
        this.states = this.departamentos;

    }

    // Carga la Lista de los Departamentos y Ciudades Automáticamente
    changeCountry(country) {
        try {
            this.cities = this.states.find(elemento => elemento.Departamento == country).Ciudades;

        } catch (error) {
            console.log('Error: ', error);

        }
    }

    // Metodo que envia el formulario al Backend en Formato Json directamente
    enviar(event: Event) {
        // Cancelo el refresh nativo de html de toda la página
        event.preventDefault();


        // Pregunto si el formulario es válido
        if (this.formulario.valid) {
            const url_post = 'http://localhost:3002/contacto/create';

            // Obtenfo todos valores del formulario
            const valores = this.formulario.value;
            this.http.post(url_post, valores)
                .subscribe((result) => {
                    console.warn("result", result)
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

        } else {
            // Activo todos los errores en el formulario
            this.formulario.markAllAsTouched();
        }
    }

}
