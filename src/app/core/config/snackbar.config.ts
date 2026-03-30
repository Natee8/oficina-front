import { MatSnackBarConfig } from '@angular/material/snack-bar';

export const snackBarSuccessConfig: MatSnackBarConfig = {
  duration: 1000,
  horizontalPosition: 'right',
  verticalPosition: 'top',
  panelClass: ['snackbar-success'],
};

export const snackBarErrorConfig: MatSnackBarConfig = {
  duration: 10000,
  horizontalPosition: 'right',
  verticalPosition: 'top',
  panelClass: ['snackbar-error'],
};
