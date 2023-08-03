import { Tag, TagLabel } from '@chakra-ui/react';
import React from 'react';

interface ITagInfo {
	width?: string;
	label: string | number;
	bgColor: string;
	color: string;
	fontSize: string;
	height: string;
	fontWeight?: string;
}

export const TagInfo: React.FC<ITagInfo> = ({
	label,
	color,
	bgColor,
	fontSize,
	height,
	fontWeight = '600',
}) => {
	return (
		<Tag
			w="auto"
			h={height}
			paddingLeft="10px"
			paddingRight="10px"
			paddingTop="10px"
			paddingBottom="10px"
			borderRadius="4px"
			bg={bgColor}
			whiteSpace="nowrap"
		>
			<TagLabel fontWeight={fontWeight} fontSize={fontSize} color={color}>
				{label}
			</TagLabel>
		</Tag>
	);
};
