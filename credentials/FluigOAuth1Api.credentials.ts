import type { Icon, ICredentialType, INodeProperties } from 'n8n-workflow';

export class FluigOAuth1Api implements ICredentialType {
	name = 'fluigOAuth1Api';

	displayName = 'Fluig OAuth1 API';

	icon: Icon = { light: 'file:../icons/fluig.svg', dark: 'file:../icons/fluig.dark.svg' };

	documentationUrl = 'https://tdn.totvs.com/display/public/fluig/Fluig+API';

	properties: INodeProperties[] = [
		{
			displayName: 'Server URL',
			name: 'server_url',
			type: 'string',
			default: '',
			description: 'url do fluig. Ex: https://fluig.minhaempresa.com',
		},
		{
			displayName: 'Consumer Key',
			name: 'consumer_key',
			type: 'string',
			default: '',
			description: 'Chave consumidora para acesso ao serviço. Ex: 7b1fe918-6ea2',
		},
		{
			displayName: 'Consumer Secret',
			name: 'consumer_secret',
			type: 'string',
			default: '',
			typeOptions: {
				password: true,
			},
			description: 'Chave secreta para acesso ao serviço. Ex: 7b1fe918-6ea2',
		},
		{
			displayName: 'Token access',
			name: 'token_access',
			type: 'string',
			default: '',
			description: 'Chave consumidora para acesso ao serviço. Ex: 7b1fe918-6ea2',
		},
		{
			displayName: 'Token Secret',
			name: 'token_secret',
			type: 'string',
			default: '',
			typeOptions: {
				password: true,
			},
			description: 'Chave secreta para acesso ao serviço. Ex: 7b1fe918-6ea2',
		},
	];
}
