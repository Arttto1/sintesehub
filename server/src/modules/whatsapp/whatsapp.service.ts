import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { DatabaseService } from 'src/infra/database/database.service';
import { MeService } from '../me/me.service';
import { User } from '../users/dto/user.dto';

@Injectable()
export class WhatsappService {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly meService: MeService,
    private readonly httpService: HttpService,
  ) {}

  async isWhatsappConfigured(username: string): Promise<boolean> {
    const user = await this.meService.meByUsername(username);
    console.log('🚀 ~ WhatsappService ~ isWhatsappConfigured ~ user:', user);

    return !!user.evo_domain && !!user.evo_key && !!user.agent_webhook;
  }

  async connectionStatus(username: string): Promise<boolean> {
    // const connected = await this.dbService
    //   .db('users')
    //   .select('whatsapp_connected')
    //   .where({ username })
    //   .first();

    // return connected.whatsapp_connected;

    const user = await this.meService.meByUsername(username);

    const instance = await this.fetchInstance(user);

    return instance.connectionStatus === 'open';
  }

  async qrcode(username: string): Promise<string> {
    const user = await this.meService.meByUsername(username);

    try {
      const instance = await this.fetchInstance(user);

      if (instance) {
        const deleted = await this.deleteInstance(user, instance.name);
        if (!deleted) {
          throw new Error('Erro ao deletar instância existente');
        }

        // Aguarda 1 segundo após deletar a instância
        await new Promise((resolve) => setTimeout(resolve, 300));
      }

      const newInstance = await this.createInstance(user);
      console.log('🚀 ~ WhatsappService ~ qrcode ~ newInstance:', newInstance);

      return newInstance.qrcode?.base64;
    } catch (error) {
      throw new Error(`Erro ao gerar QR Code: ${error}`);
    }
  }

  async fetchInstance(user: User): Promise<any> {
    const getInstanceUrl = `${user.evo_domain}/instance/fetchInstances?instanceName=${user.username.replace(/\s/g, '')}`;

    try {
      const response = await firstValueFrom(
        this.httpService.get(getInstanceUrl, {
          headers: {
            apikey: user.evo_key,
          },
        }),
      );

      return response.data[0];
    } catch (error) {
      if (error.status === 404) return null;

      throw new Error(`Error fetching instance: ${error.message}`);
    }
  }

  async deleteInstance(user: User, instanceName: string): Promise<any> {
    const deleteInstanceUrl = `${user.evo_domain}/instance/delete/${instanceName}`;

    try {
      const response = await firstValueFrom(
        this.httpService.delete(deleteInstanceUrl, {
          headers: {
            apikey: user.evo_key,
          },
        }),
      );

      return response.data.status === 'SUCCESS';
    } catch (error) {
      console.error('Error deleting instance', error.response.data);
    }
  }

  async createInstance(user: User): Promise<any> {
    const createInstanceUrl = `${user.evo_domain}/instance/create`;

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          createInstanceUrl,
          {
            instanceName: user.username.replace(/\s/g, ''),
            token: 'SINTESE123',
            integration: 'WHATSAPP-BAILEYS',
            qrcode: true,
            groups_ignore: true,
          },
          {
            headers: {
              apikey: user.evo_key,
            },
          },
        ),
      );
      return response.data;
    } catch (error) {
      console.error('Error creating instance', error.response.data);
    }
  }
}
