import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// debounceTime sirve para reaccionar después de un tiempo de inactividad dentro del formulario
import { HttpClient } from '@angular/common/http';
import { DepartamentosService } from '../../Servicios/departamentos.service';

// Animación de SweetAlert2
import Swal from 'sweetalert2';


@Component({
    selector: 'app-formulario',
    templateUrl: './formulario.component.html',
    styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

    public formulario: FormGroup;
    public departments: any[] = [];
    public cities: string[] = [];

    constructor(
        private http: HttpClient,
        private formBuilder: FormBuilder,
        private _departamentosSvc: DepartamentosService
    ) {
        this.buildForm();
    }

    private buildForm() {

        this.formulario = this.formBuilder.group
            ({
                department: ['', [Validators.required]],
                city: ['', [Validators.required]],
                name: ['', [Validators.required, Validators.maxLength(50)]],
                email: ['', [Validators.required, Validators.email]]
            });

        this.formulario.valueChanges
            .subscribe(value => {
                console.log(value);
            });
    }

    ngOnInit(): void {

        this.getDepartments();

    }

    private getDepartments(): void {

        try {

            // Consumo de API REST :: Obtengo los datos de la url 
            this._departamentosSvc.getDepartamentos().subscribe(Departments => {

                let allDepartaments = Departments;

                this.loadDepartments(Object.entries(allDepartaments));

            });

        } catch (error) {
            console.log('Error: ', error);
        }

    }

    private loadDepartments(allDepartments: any): void {

        allDepartments.map((department: any) => {

            this.departments.push({
                Departamento: department[0],
                Ciudades: department[1]
            });

        });

    }

    public changeDepartment(department: string): void {

        console.log('depts in change: ', department);

        try {

            this.cities = this.departments.find(elemento => elemento.Departamento === department).Ciudades;

        } catch (error) {
            console.log('Error: ', error);
        }
    }

    public send(event: Event): void {
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

    // - Recuper los campos para que no sea tan repetitiva el llamado a dichos campos cuando trabaje con los errores
    get departmentField() {
        return this.formulario.get('department');
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

}
