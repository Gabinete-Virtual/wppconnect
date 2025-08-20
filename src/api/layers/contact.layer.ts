import { Page } from 'puppeteer';
import { evaluateAndReturn } from '../helpers';
import { RetrieverLayer } from './retriever.layer';
import { CreateConfig } from '../../config/create-config';
import { Wid } from '../model/wid';
import { ControlsLayer } from './controls.layer';
import { ContactModel } from '@wppconnect/wa-js/dist/whatsapp';

export class ContactLayer extends ControlsLayer {
  constructor(public page: Page, session?: string, options?: CreateConfig) {
    super(page, session, options);
  }

  /**
   * Cria novo contato
   * @param contactId Buisness profile id ('5533999999999@c.us')
   * @param name Nome do contato
   * @param surname Sobrenome do contato (opcional)
   * @param syncAdressBook Sincronizar com a agenda do dispositivo (opcional, padrão: false)
   * @returns Retorna o Wid do contato criado
   */
  public async createContact(
    contactId: string,
    name: string,
    surname?: string,
    syncAdressBook?: boolean
  ): Promise<ContactModel> {
    return evaluateAndReturn(
      this.page,
      ({ contactId, name, surname, syncAdressBook }) => {
        return window.WPP.contact.save(contactId, name, {
          surname: surname || null,
          syncAdressBook: syncAdressBook || false,
        });
      },
      { contactId, name, surname, syncAdressBook }
    );
  }

  /**
   * Remover Contato
   * @param contactId Buisness profile id ('5533999999999@c.us')
   * @returns Retorna true se o contato foi removido com sucesso
   */
  public async deleteContact(contactId: string): Promise<ContactModel> {
    return evaluateAndReturn(
      this.page,
      ({ contactId }) => window.WPP.contact.remove(contactId),
      { contactId }
    );
  }
}
