import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  imports: [NgFor, NgIf],
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
}
