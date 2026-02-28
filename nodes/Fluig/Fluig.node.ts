import {
	NodeConnectionTypes,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestMethods,
} from 'n8n-workflow';
import { requestProperties } from './resources/request';
import { fluigApiRequest } from './resources/fluigRequest';

export class Fluig implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Fluig',
		name: 'fluig',
		icon: { light: 'file:../../icons/fluig.svg', dark: 'file:../../icons/fluig.dark.svg' },
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["endpoint"]}}',
		description: 'Connect to Fluig API',
		defaults: {
			name: 'Fluig',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'fluigOAuth1Api',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://tdn.totvs.com/display/public/fluig/Fluig+API',
			url: '',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			...requestProperties
		],
	};

	methods = {
		listSearch: {
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {

		const endpoint = this.getNodeParameter('endpoint', 0);
		const method = this.getNodeParameter('method', 0);
		const body = this.getNodeParameter('body', 0);

		const responseData = await fluigApiRequest.call(this, method as IHttpRequestMethods, endpoint as string, {}, body as string);

		// Retornar apenas o JSON
		return [this.helpers.returnJsonArray(responseData)];
	}

}
