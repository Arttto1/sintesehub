import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WhatsappService } from '../../core/services/whatsapp/whatsapp.service';
import { WarmogToastService } from '../../core/services/warmog-toast/warmog-toast.service';

@Component({
  selector: 'whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class WhatsappComponent implements OnInit, OnDestroy {
  private readonly whatsappService = inject(WhatsappService);
  private readonly toastService = inject(WarmogToastService);

  loading = signal<boolean>(true);

  whatsappConfigured = signal<boolean>(false);

  whatsappProdMode = signal<boolean>(false);
  whatsappConnected = signal<boolean>(false);

  qrCodeLoading = signal<boolean>(false);
  qrCodeBase64 = signal<string | null>(null);
  qrCodeCountdown = signal<number>(0);
  private countdownInterval: any;

  testNumbers = ['17991677556', '17991791111'];
  testNumbersGroup = new FormGroup({
    testNumbersArray: new FormArray(this.testNumbers.map((number) => new FormControl(number))),
  });

  async ngOnInit() {
    await this.checkWhatsappConfiguration();

    if (this.whatsappConfigured()) {
      await this.checkConnection();
    }

    this.loading.set(false);
  }

  async checkWhatsappConfiguration() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user) {
      this.toastService.showError('Erro! Faça login novamente.');
      return;
    }

    try {
      const response = await this.whatsappService.isWhatsappConfigured(user.username);
      this.whatsappConfigured.set(response.data?.isWhatsappConfigured);
    } catch (error) {
      this.toastService.showError('Erro ao verificar configuração do WhatsApp.');
    }
  }

  async checkConnection() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user) {
      this.toastService.showError('Erro! Faça login novamente.');
      return;
    }

    try {
      const response = await this.whatsappService.connectionStatus(user.username);
      this.whatsappConnected.set(response.data?.connectionStatus);
    } catch (error) {
      this.toastService.showError('Erro ao verificar status de conexão.');
    }
  }

  toggleWhatsappMode() {
    this.whatsappProdMode.update((value) => !value);
  }

  async generateQrCode() {
    this.qrCodeBase64.set(null);
    this.stopQrCodeTimer(); // Para qualquer timer anterior

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user) {
      this.toastService.showError('Erro! Faça login novamente.');
      return;
    }

    try {
      this.qrCodeLoading.set(true);
      const response = await this.whatsappService.qrcode(user.username);
      this.qrCodeBase64.set(response.data.qrcode);
      this.qrCodeLoading.set(false);

      // Inicia contador regressivo assim que recebe o QR Code
      this.startQrCodeTimer();
    } catch (error) {
      this.qrCodeLoading.set(false);
      this.toastService.showError('Erro ao gerar QR Code.');
    }
  }

  startQrCodeTimer() {
    this.qrCodeCountdown.set(30); // 30 segundos

    this.countdownInterval = setInterval(() => {
      const currentTime = this.qrCodeCountdown();
      if (currentTime > 0) {
        this.qrCodeCountdown.set(currentTime - 1);
      } else {
        // Quando chega a 0, limpa o QR Code e para o timer
        this.qrCodeBase64.set(null);
        this.stopQrCodeTimer();
      }
    }, 1000);
  }

  stopQrCodeTimer() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }
    this.qrCodeCountdown.set(0);
  }

  ngOnDestroy() {
    this.stopQrCodeTimer();
  }
}
