import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-list',
  imports: [NgFor, NgIf, FormsModule, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {  
  tasks: Task[] = [];
  error: boolean = false; // Indique si une erreur est survenue

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
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

  addTaskDefault() {
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

  deleteTask(task: Task) {   
    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        console.log('Tâche supprimée');

        //Modifier l'affichage de la liste
        const indexTask: number = this.tasks.indexOf(task)

        if(indexTask !== -1) {
          this.tasks.splice(indexTask, 1);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de la tâche :', err);
      }
    });
  }

}
