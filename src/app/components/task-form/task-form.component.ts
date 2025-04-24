import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {

  //https://angular.dev/guide/forms/reactive-forms#generate-a-new-component-and-import-the-reactiveformsmodule

  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private taskService: TaskService, 
    private router: Router
  ) {
    // Initialisation du FormGroup
    this.taskForm = this.fb.group({
      description: new FormControl(''),
      isCompleted: new FormControl(false),
    });
  }


  submit() {
    console.log('submit taskForm');

    if (this.taskForm.valid) {
      this.addTask();
    }
  }

  addTask() {
    const newTask: Task = {
      description: this.taskForm.value.description, 
      isCompleted: this.taskForm.value.isCompleted,
    } as Task; //cast pour ignorer l'id lors dans la requête HTTP

    this.taskService.addTask(newTask).subscribe(
      () => {
        console.log('Ajout de la tâche complétée');
        this.router.navigate(['/']); //Retour à la liste des tâches
      },
      (error) => {
        console.error('Erreur lors de l’ajout de la tâche :', error);
      }
    );
  }

}
