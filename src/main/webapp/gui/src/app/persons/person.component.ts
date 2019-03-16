import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PersonService } from './person.service';
import { Person } from './person';

@Component({
    selector: 'app-person',
    templateUrl: './person.component.html',
    styleUrls: ['./person.component.css']
})

export class PersonComponent implements OnInit {

    //Component properties
    allPersons: Person[];
    statusCode: number;
    requestProcessing = false;
    personIdToUpdate = null;
    processValidation = false;
    //Create form
    personForm = new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        age: new FormControl('', Validators.required),
        occupation: new FormControl('', Validators.required)
    });

    //Create constructor to get service instance
    constructor(private personService: PersonService) {
    }

    ngOnInit(): void {
        // this.getAllPersons();
    }

    onPersonFormSubmit() {
        this.processValidation = true;

        if (this.personForm.invalid) {
            return; //Validation failed, exit from method.
        }

        this.preProcessConfigurations();
        let person = this.personForm.value;
        // this.personService.createPerson(person)
        //     .subscribe(data => console.log(data), error => console.log(error));

        this.personService.createPerson(person)
            .subscribe(successCode => {
                this.statusCode = successCode;
                this.backToCreatePerson();
            },
                errorCode => this.statusCode = errorCode
            );

    }

    backToCreatePerson() {
        this.personForm.reset();
        this.processValidation = false;
    }

    preProcessConfigurations() {
        this.statusCode = null;
        this.requestProcessing = true;
    }
}