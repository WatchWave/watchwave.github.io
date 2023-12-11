import { Switch } from '@nextui-org/react';
import { genresProps } from '@/types';

const ToggleButton = ({
	genre,
	setFilteredGenres,
	defaultPressed,
}: {
	genre: genresProps;
	defaultPressed: boolean;
	setFilteredGenres: React.Dispatch<React.SetStateAction<string[] | null>>;
}) => {
	return (
		<Switch isSelected={defaultPressed} onValueChange={() => setFilteredGenres((prev) => [...prev!, genre.name.toLowerCase()])}>
			{genre.name}
		</Switch>
	);
};

export default ToggleButton;
