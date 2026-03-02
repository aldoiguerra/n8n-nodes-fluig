
import type {
	IHookFunctions,
	IExecuteFunctions,
	IExecuteSingleFunctions,
	ILoadOptionsFunctions,
	IHttpRequestMethods,
	IDataObject,
	IHttpRequestOptions,
} from 'n8n-workflow';
import OAuth from './vendor/oauth-1.0a';
import crypto from 'crypto';

export async function fluigApiRequest(
	this: IHookFunctions | IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	qs: IDataObject = {},
	body: string,
) {

	const credentials = await this.getCredentials('fluigOAuth1Api');
	const serverUrl = credentials['server_url'];

	// Initialize
	const oauth = new OAuth({
		consumer: {
			key: credentials['consumer_key'] as string,
			secret: credentials['consumer_secret'] as string,
		},
		signature_method: 'HMAC-SHA1',
		hash_function(base_string: string, key: string) {
			return crypto
				.createHmac('sha1', key)
				.update(base_string)
				.digest('base64')
		},
	})

	// Note: The token is optional for some requests
	const token = {
		key: credentials['token_access'] as string,
		secret: credentials['token_secret'] as string,
	}


	let bodyData = null;
	if (method === 'GET') bodyData = null;
	else bodyData = JSON.parse(body as string);


	const request_data = {
		url: `${serverUrl}${endpoint}`,
		method: method,
		data: {},
	}

	const options: IHttpRequestOptions = {
		method: request_data.method,
		qs,
		body: bodyData,
		json: true,
		baseURL: `${serverUrl}`,
		url: request_data.url,
		headers: {
			// 'Content-Type': 'application/json',
			...oauth.toHeader(oauth.authorize(request_data, token))
		} as IDataObject,
	};
	if (credentials['skipSslCertificateValidation']) {
		options['skipSslCertificateValidation'] = true; // Esta linha desabilita a verificação SSL
	}

	const response = await this.helpers.httpRequest(options);

	return response;
}

export function fluigAuth(
	method: IHttpRequestMethods,
	endpoint: string,
	credentials: IDataObject = {},
) {

	const serverUrl = credentials['server_url'];

	// Initialize
	const oauth = new OAuth({
		consumer: {
			key: credentials['consumer_key'] as string,
			secret: credentials['consumer_secret'] as string,
		},
		signature_method: 'HMAC-SHA1',
		hash_function(base_string: string, key: string) {
			return crypto
				.createHmac('sha1', key)
				.update(base_string)
				.digest('base64')
		},
	})

	// Note: The token is optional for some requests
	const token = {
		key: credentials['token_access'] as string,
		secret: credentials['token_secret'] as string,
	}

	const request_data = {
		url: `${serverUrl}${endpoint}`,
		method: method,
		data: {},
	}

	return oauth.toHeader(oauth.authorize(request_data, token)).Authorization;
}