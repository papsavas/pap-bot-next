'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { Guild } from 'types';
import { useSelected } from '../../hooks/useSelected';

//use default icon
const GuildLink: FC<{ guild: Guild }> = ({ guild }) => {
	const { id, name, iconURL } = guild;
	const [selected, setSelected] = useSelected(guild.id);

	return (
		<li id={id} onClick={() => setSelected()}>
			<Link href={`/guilds/${id}`} className="group relative flex items-center">
				<span
					className={`
          absolute -left-[24%] h-[50%] w-[5px] rounded-xl
          bg-white opacity-0 transition-all duration-300
          group-hover:opacity-100
          ${selected && 'scale-y-150 opacity-100'}
         `}
				/>
				<Image
					src={iconURL!}
					width={128}
					height={128}
					alt={`${name} guild`}
					priority={false}
					className="rounded-2xl object-contain"
				/>
			</Link>
		</li>
	);
};

export default GuildLink;
