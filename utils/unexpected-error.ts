import { RequestError } from '@/api';
import { i18n } from '@/lang';
import { useNotificationsStore } from '@/stores/';
import { APIError } from '@/types';

let store: any;

export function unexpectedError(error: Error | RequestError | APIError): void {
	if (!store) store = useNotificationsStore();

	const code =
		(error as RequestError).response?.data?.errors?.[0]?.extensions?.code ||
		(error as APIError)?.extensions?.code ||
		'UNKNOWN';

	const message = (error as RequestError).response?.data?.errors?.[0]?.message || error.message || undefined;

	// eslint-disable-next-line no-console
	console.warn(error);

	store.add({
		title: i18n.global.t(`errors.${code}`),
		text: message,
		type: 'error',
		dialog: true,
		error,
	});
}
