import { ComponentProps, FC } from 'react';
import useBlink from '../../hooks/useBlink';
import { HapticFormSubmit } from '../../types';
import Form from './Form';

const HapticForm: FC<
	Omit<ComponentProps<typeof Form>, 'success' | 'failure' | 'onSubmit'> & {
		onSubmit: HapticFormSubmit;
	}
> = (props) => {
	const [success, triggerSuccess] = useBlink();
	const [failure, triggerFailure] = useBlink();
	return (
		<Form
			{...props}
			success={success}
			failure={failure}
			onSubmit={(ev, value) => {
				props.onSubmit(ev, value, triggerSuccess, triggerFailure);
			}}
		/>
	);
};

export default HapticForm;
