import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {  
  tasks: Task[] = [];
  error: boolean = false; // Indique si une erreur est survenue

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (response) => {
        console.log("Données reçues :", response.tasks);
        this.tasks = response.tasks;
        this.error = response.error; // Récupère l'indicateur d'erreur
        if (this.error) {
          alert("Erreur de connexion à l'API");
        }
      }
    });
  }

  addTask() {
    const newTask: Task = {
      description: 'Nouvelle tâche', isCompleted: false,
    } as Task; //cast pour ignorer l'id lors dans la requête HTTP

    this.taskService.addTask(newTask).subscribe(
      (task) => {
        this.tasks.push(task); // Ajoute la nouvelle tâche à la liste affichée
      },
      (error) => {
        console.error('Erreur lors de l’ajout de la tâche :', error);
      }
    );
  }

  deleteTask(arg0: number) {
    throw new Error('Method not implemented.');
  }
}
