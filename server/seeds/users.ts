import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    {
      id: '11111111-1111-1111-1111-111111111111',
      username: 'sintese',
      name: 'Sintese Digital',
      niche: 'odontologia',
      whatsapp_connected: false,
      evo_key: 'a04afec5be4c52a1882fd99c36e9d44d',
      evo_domain: 'https://evolutionsintese.gruposintesedigital.com',
      agent_webhook: '',
      password: '$2a$12$eUM9dXCNLaQi2Y2DlAwQ7eXpteN3tgWgd5RFpkvzfUqR3nYqF6r0O',
      password_visible: 'sintese',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
