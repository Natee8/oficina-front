import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-actions',
  standalone: true,
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownActions {
  menuEl: HTMLElement | null = null;
  @Output() onEdit = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();
  @Output() onStatus = new EventEmitter<void>();
  @Output() onDownload = new EventEmitter<void>();

  toggleMenu(button: HTMLElement) {
    if (this.menuEl) {
      this.closeMenu();
      return;
    }

    const rect = button.getBoundingClientRect();

    this.menuEl = document.createElement('div');
    this.menuEl.className = 'dropdown-global';

    this.menuEl.style.position = 'fixed';
    this.menuEl.style.top = `${rect.bottom + 4}px`;
    this.menuEl.style.left = `${rect.right - 180}px`;

    this.menuEl.innerHTML = `
    <div class="item edit"><i class="fa-solid fa-pen"></i> Editar OS</div>
    <div class="item status"><i class="fa-solid fa-arrows-rotate"></i> Alterar status</div>
    <div class="item download"><i class="fa-solid fa-download"></i> Baixar documento</div>
    <div class="item danger"><i class="fa-solid fa-trash"></i> Excluir</div>
  `;

    document.body.appendChild(this.menuEl);

    this.bindEvents();
  }

  bindEvents() {
    this.menuEl?.querySelector('.edit')?.addEventListener('click', () => {
      this.onEdit.emit();
      this.closeMenu();
    });

    this.menuEl?.querySelector('.status')?.addEventListener('click', () => {
      this.onStatus.emit();
      this.closeMenu();
    });

    this.menuEl?.querySelector('.download')?.addEventListener('click', () => {
      this.onDownload.emit();
      this.closeMenu();
    });

    this.menuEl?.querySelector('.danger')?.addEventListener('click', () => {
      this.onDelete.emit();
      this.closeMenu();
    });

    setTimeout(() => {
      document.addEventListener('click', this.handleOutsideClick);
    });
  }

  handleOutsideClick = (event: any) => {
    if (this.menuEl && !this.menuEl.contains(event.target)) {
      this.closeMenu();
    }
  };

  closeMenu() {
    if (this.menuEl) {
      document.body.removeChild(this.menuEl);
      this.menuEl = null;
      document.removeEventListener('click', this.handleOutsideClick);
    }
  }
}
