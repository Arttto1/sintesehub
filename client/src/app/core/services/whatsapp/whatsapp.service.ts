import { inject, Injectable } from '@angular/core';
import {
  ConnectionStatusGQL,
  IsWhatsappConfiguredGQL,
  QrCodeGQL,
} from '../../../../generated/graphql';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WhatsappService {
  private readonly connectionStatusGQL = inject(ConnectionStatusGQL);
  private readonly qrcodeGQL = inject(QrCodeGQL);
  private readonly isWhatsappConfiguredGQL = inject(IsWhatsappConfiguredGQL);

  isWhatsappConfigured(username: string) {
    return firstValueFrom(this.isWhatsappConfiguredGQL.fetch({ username }));
  }

  connectionStatus(username: string) {
    return firstValueFrom(
      this.connectionStatusGQL.fetch({ username }, { fetchPolicy: 'no-cache' }),
    );
  }

  qrcode(username: string) {
    return firstValueFrom(this.qrcodeGQL.fetch({ username }, { fetchPolicy: 'no-cache' }));
  }
}
