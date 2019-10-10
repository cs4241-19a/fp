import {NgModule} from '@angular/core';
import {ThemeModule} from '../@theme/theme.module';
import {UserListComponent} from './user-list.component';
import {NotificationListComponent} from './notification-list.component';
import {NbCardModule, NbListModule, NbTooltipModule, NbUserModule} from '@nebular/theme';
import {GoalDialogComponent} from './goal-dialog.component';

const components = [
    UserListComponent,
    NotificationListComponent,
    GoalDialogComponent
];

@NgModule({
    imports: [
        ThemeModule,
        NbListModule,
        NbUserModule,
        NbCardModule,
        NbTooltipModule
    ],
    declarations: [...components],
    exports: [...components],
    entryComponents: [NotificationListComponent, GoalDialogComponent],
})
export class CommonModule {
}
