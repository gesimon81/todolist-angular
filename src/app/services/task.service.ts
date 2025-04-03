import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<{ tasks: Task[]; error: boolean }> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      map((data) => ({ tasks: data, error: false })), // Transforme la réponse en { tasks, error }
      catchError((error: HttpErrorResponse) => {
        console.error('Erreur de connexion à l\'API :', error.message);
        return of({ tasks: [], error: true }); // Retourne une liste vide et signale l'erreur
      })
    );
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }
}
