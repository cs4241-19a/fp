import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {NbDialogService} from '@nebular/theme';
import {PactService} from '../services/pact.service';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/user.service';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
    @ViewChild('contentTemplate', {static: false}) contentTemplate: TemplateRef<any>;

    isLoading = true;
    user;
    pact;
    test_data_a;
    test_data_b;

    constructor(private dialogService: NbDialogService,
                private pactService: PactService,
                private auth: AuthService,
                private userService: UserService,) {
    }

    ngOnInit() {
        this.getPact();
    }

    getPact() {
        this.userService.getUser(this.auth.currentUser).subscribe(
            data => {
                this.user = data;
                // @ts-ignore
                this.pactService.getPact(data.pact).subscribe(
                    pact => {
                        this.isLoading = false;
                        if (!pact){
                            return;
                        }
                        this.pact = pact;
                        this.test_data_a = pact.board.recipes;
                        this.test_data_b = pact.board.exercises;
                        console.log(pact);
                    }
                );
            }
        );
    }

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
        }
    }

    // addRecipe(t, b) {
    //     this.test_data_a.unshift({title: t, content: b});
    // }
    //
    // addExercise(t, b) {
    //     this.test_data_b.unshift({title: t, content: b});
    // }

    deleteRecipe(c){
        // delete card
        console.log(c);
        this.pactService.deleteRecipe(this.pact._id,  c._id).subscribe(pact =>
        {
            this.pact = pact;
            this.test_data_a = pact.board.recipes;
            this.test_data_b = pact.board.exercises;
        });
    }

    deleteExercise(c){
        // delete card
        console.log(c);
        this.pactService.deleteExercise(this.pact._id,  c._id).subscribe(pact =>
        {
            this.pact = pact;
            this.test_data_a = pact.board.recipes;
            this.test_data_b = pact.board.exercises;
        });
    }

    /**
     * Open a dialog
     * @param dialog
     * @param boardCol
     */
    open(dialog: TemplateRef<any>, boardCol) {
        this.dialogService.open(dialog, {hasBackdrop: true, context: boardCol})
            .onClose.subscribe(values => {
            console.log(values);
            if (values[0] == 'Recipes') {
                // this.addRecipe(values[1], values[2]);
                this.pactService.postRecipe(this.pact._id, {title: values[1], content: values[2]}).subscribe(pact =>
                {
                    this.pact = pact;
                    this.test_data_a = pact.board.recipes;
                    this.test_data_b = pact.board.exercises;
                });
            } else {
                // this.addExercise(values[1], values[2]);
                this.pactService.postExercise(this.pact._id, {title: values[1], content: values[2]}).subscribe(pact =>
                {
                    this.pact = pact;
                    this.test_data_a = pact.board.recipes;
                    this.test_data_b = pact.board.exercises;
                });
            }
        });
    }


}
