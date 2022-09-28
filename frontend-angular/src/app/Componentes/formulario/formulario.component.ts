import { ContactoService } from './../../Servicios/contacto.service';
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
        private formBuilder: FormBuilder,
        private _departamentosSvc: DepartamentosService,
        private _contactoSvc: ContactoService
    ) {
        this.buildForm();
    }

    private buildForm() {

        this.formulario = this.formBuilder.group
            ({
                department: ['', [Validators.required, Validators.maxLength(30)]],
                city: ['', [Validators.required, Validators.maxLength(50)]],
                name: ['', [Validators.required, Validators.maxLength(50)]],
                email: ['', [Validators.required, Validators.maxLength(30), Validators.email]]
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

        try {

            department === ''
                ?
                (
                    this.formulario.get('city')?.reset(''),
                    this.cities = []
                )
                : this.cities = this.departments.find(elemento => elemento.Departamento === department).Ciudades;

        } catch (error) {
            console.log('Error: ', error);
        }
    }

    public send(event: Event): void {

        // Cancelo el refresh nativo de html de toda la página
        event.preventDefault();

        if (this.formulario.valid) {

            // Obtenfo todos valores del formulario
            const contacto = this.formulario.value;

            this._contactoSvc.create(contacto).subscribe((response: any) => {

                // Condicional de corto circuito
                response.success === true && this.sweetAlert();

            });

        } else {
            // Activo todos los errores en el formulario
            this.formulario.markAllAsTouched();
        }

    }

    sweetAlert(): void {

        // Animación de Confirmación
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Datos Almacenados Exitosamente!',
            showConfirmButton: false,
            timer: 2200
        });

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
