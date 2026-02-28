import type { INodeProperties } from 'n8n-workflow';

export const requestProperties: INodeProperties[] = [
	{
		displayName: 'Method',
		name: 'method',
		type: 'options',
		options: [
			{
				name: 'GET',
				value: 'GET'
			},
			{
				name: 'POST',
				value: 'POST'
			},
			{
				name: 'PUT',
				value: 'PUT'
			},
			{
				name: 'DELETE',
				value: 'DELETE'
			},
		],
		default: 'GET',
	},
	{
		displayName: 'Endpoint',
		name: 'endpoint',
		type: 'string',
		default: '',
		description: 'url do fluig. Ex: /api/public/2.0/users/getCurrent',
	},
	{
		displayName: 'Body',
		name: 'body',
		type: 'json',
		typeOptions: {
			rows: 20,
		},
		default: '{}',
		description: 'Body da requisição. Ex: {"name": "John", "age": 30}',
		displayOptions: {
			hide: {
				endpoint: ['GET']
			},
		},
	},
];
