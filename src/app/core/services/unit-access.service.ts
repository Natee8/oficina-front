import { inject, Injectable } from '@angular/core';
import { User } from '../../features/auth/login/model/user.dto';
import { JwtService } from './jwt.service';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class UnitAccessService {
  private userService = inject(UserService);

  hasFullAccess(): boolean {
    const user = this.userService.getUser() as User | null;
    const normalizedRole = user?.role?.trim().toLowerCase();

    return (
      Boolean(user?.fullAccess) ||
      normalizedRole === 'admin' ||
      normalizedRole === 'administrador' ||
      JwtService.hasFullAccess() ||
      JwtService.isAdmin()
    );
  }

  getAccessibleUnitIds(): number[] {
    const user = this.userService.getUser() as User | null;
    const userUnitIds = this.normalizeUnitIds(user?.unitIds);

    if (userUnitIds.length) {
      return userUnitIds;
    }

    return this.normalizeUnitIds(JwtService.getUnitIds());
  }

  filterAllowedUnits<T extends { id: number }>(units: T[]): T[] {
    if (this.hasFullAccess()) {
      return units;
    }

    const allowedUnitIds = this.getAccessibleUnitIds();

    if (!allowedUnitIds.length) {
      return [];
    }

    return units.filter((unit) => allowedUnitIds.includes(unit.id));
  }

  private normalizeUnitIds(value: unknown): number[] {
    if (Array.isArray(value)) {
      return value
        .map((item) => Number(item))
        .filter((item) => Number.isInteger(item) && item > 0);
    }

    if (typeof value === 'string') {
      return value
        .split(',')
        .map((item) => Number(item.trim()))
        .filter((item) => Number.isInteger(item) && item > 0);
    }

    if (typeof value === 'number' && Number.isInteger(value) && value > 0) {
      return [value];
    }

    return [];
  }
}