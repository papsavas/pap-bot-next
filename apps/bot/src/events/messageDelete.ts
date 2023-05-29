import { makeEvent } from '../lib/makeEvent';

const messageDelete = makeEvent({
	event: 'messageDelete',
	async execute(message) {},
});

export default messageDelete;
