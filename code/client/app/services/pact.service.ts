import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Pact} from '../shared/models/pact.model';
import {User} from '../shared/models/user.model';

@Injectable()
export class PactService {

    constructor(private http: HttpClient) {
    }

    joinPact(pact: Pact): Observable<Pact> {
        return this.http.post<Pact>('/api/pact/join', pact);
    }

    createPact(pact: Pact): Observable<Pact> {
        return this.http.post<Pact>('/api/pact/create', pact);
    }

    getPact(id: String): Observable<Pact> {
        return this.http.get<Pact>('/api/pact/' + id);
    }

    editPact(pact: Pact): Observable<any> {
        return this.http.put(`/api/pact/${pact._id}`, pact, { responseType: 'text' });
    }

    // Trello board

    postRecipe(id, recipe): Observable<Pact> {
        console.log('posting recipe');
        return this.http.post<Pact>('/api/pact/' + id + '/board/recipe', recipe);
    }

    postExercise(id, exercise): Observable<Pact> {
        console.log('posting exercise');
        return this.http.post<Pact>('/api/pact/' + id + '/board/exercise', exercise);
    }

    deleteRecipe(id, postid): Observable<Pact> {
        return this.http.delete<Pact>('/api/pact/' + id + '/board/recipe/' + postid);
    }

    deleteExercise(id, postid): Observable<Pact> {
        return this.http.delete<Pact>('/api/pact/' + id + '/board/exercise/' + postid);
    }
}
