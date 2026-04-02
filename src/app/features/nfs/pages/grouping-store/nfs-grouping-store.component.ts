import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NfsService } from '../../service/nfs.service';
import { NfLojaDto, NfPlacaDto } from '../../model/nfs.dto';
import { snackBarErrorConfig, snackBarSuccessConfig } from '../../../../core/config/snackbar.config';

@Component({
  selector: 'app-nfs-grouping-store',
  standalone: true,
  templateUrl: './nfs-grouping-store.component.html',
  styleUrls: ['./nfs-grouping-store.component.scss'],
  imports: [CommonModule, FormsModule],
  providers: [NfsService],
})
export class NfsGroupingStoreComponent {
  private readonly templateFilePath = '/assets/planilhas/planilha_exemplo.xlsx';

  groups: NfLojaDto[] = [];
  totalGeral = 0;
  totalLinhas = 0;
  loading = false;
  error = '';
  expandedGroups: boolean[] = [];
  searchTerms: Record<number, string> = {};

  constructor(
    private nfsService: NfsService,
    private snackBar: MatSnackBar,
  ) {}

  get uploadDone(): boolean {
    return this.groups.length > 0;
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.loading = true;
    this.error = '';
    this.groups = [];

    this.nfsService.uploadNfs(file).subscribe({
      next: (res) => {
        this.groups = res.lojas;
        this.totalGeral = res.totalGeral;
        this.totalLinhas = res.totalLinhasProcessadas;
        this.expandedGroups = res.lojas.map(() => false);
        this.searchTerms = {};
        this.loading = false;
        this.snackBar.open('Agrupamento realizado com sucesso!', 'Fechar', snackBarSuccessConfig);
      },
      error: (err) => {
        this.error = err?.error?.message || 'Erro ao processar o arquivo. Verifique se está no formato correto.';
        this.loading = false;
        this.snackBar.open(this.error, 'Fechar', snackBarErrorConfig);
      },
    });
  }

  toggleGroup(i: number): void {
    this.expandedGroups[i] = !this.expandedGroups[i];
  }

  filteredPlacas(i: number): NfPlacaDto[] {
    const term = (this.searchTerms[i] ?? '').toLowerCase();
    if (!term) return this.groups[i].placas;
    return this.groups[i].placas.filter((p) =>
      p.placa.toLowerCase().includes(term)
    );
  }

  formatCurrency(v: number): string {
    return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  formatValue(v: number): string {
    return v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  copyPlaca(placa: NfPlacaDto): void {
    const lines = [
      placa.placa,
      ...placa.servicos.map((s) => `${s.tpServico} - ${s.obsConsultor}: ${this.formatCurrency(s.valor)}`),
      `Total: ${this.formatCurrency(placa.totalPlaca)}`,
    ];
    navigator.clipboard.writeText(lines.join('\n'));
  }

  copyAll(group: NfLojaDto): void {
    const lines: string[] = [group.loja];
    group.placas.forEach((p) => {
      lines.push(p.placa);
      p.servicos.forEach((s) => lines.push(`  ${s.tpServico} - ${s.obsConsultor}: ${this.formatCurrency(s.valor)}`));
      lines.push(`  Total: ${this.formatCurrency(p.totalPlaca)}`);
    });
    navigator.clipboard.writeText(lines.join('\n'));
  }

  downloadTemplate(): void {
    try {
      const anchor = document.createElement('a');
      anchor.href = this.templateFilePath;
      anchor.download = 'planilha_exemplo.xlsx';
      anchor.click();
      this.snackBar.open('Planilha baixada com sucesso!', 'Fechar', snackBarSuccessConfig);
    } catch {
      this.snackBar.open('Erro ao baixar a planilha de exemplo.', 'Fechar', snackBarErrorConfig);
    }
  }
}
