import {Component, OnInit} from '@angular/core';
import {PactService} from '../services/pact.service';
import {ToastComponent} from '../shared/toast/toast.component';
import {AuthService} from '../services/auth.service';
import {NbThemeService} from '@nebular/theme';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

    isLoading = true;
    imgSrc = 'assets/six-pact-logo-transparent brown.png';


    constructor(private pactService: PactService,
                public toast: ToastComponent,
                private authService: AuthService,
                private themeService: NbThemeService
    ) {
        const id = authService.currentUser._id;
    }

    ngOnInit(): void {
        this.isLoading = false;
    }

}
