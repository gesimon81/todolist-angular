import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

export const routes: Routes = [
    { path: '', component: TaskListComponent },
    { path: 'form', component: TaskFormComponent},
    { path: '**', component: TaskListComponent },
];
