import { Dispatch, SetStateAction, createContext } from 'react';

type SelectedGuildContext = {
	selected: string;
	setSelected: Dispatch<SetStateAction<string>>;
};

export const SelectedContext = createContext<SelectedGuildContext>(
	{} as SelectedGuildContext
);
