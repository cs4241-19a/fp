import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataSharingService {
    public isUserUpdated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}
