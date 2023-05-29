'use client';
import { FC, PropsWithChildren, useState } from 'react';
import { SelectedContext } from '../../context/SelectedContext';

export const SelectedProvider: FC<PropsWithChildren> = ({ children }) => {
	const [selected, setSelected] = useState<string>('');
	return (
		<SelectedContext.Provider value={{ selected, setSelected }}>
			{children}
		</SelectedContext.Provider>
	);
};
