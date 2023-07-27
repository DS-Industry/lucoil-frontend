import { Tag, TagLabel } from "@chakra-ui/react";
import React from "react";

interface ITagInfo {
    label: string,
    bgColor: string,
    color: string,
    fontSize: string,
    height: string

}

export const TagInfo : React.FC<ITagInfo> = ({label, color, bgColor, fontSize, height}) => {
    return (
        <>
            <Tag  h={height} paddingLeft='10px' paddingRight='10px' paddingTop='10px' paddingBottom='10px' borderRadius='4px' bg={bgColor}>
                <TagLabel fontWeight='600' fontSize={fontSize} color={color}>{label}</TagLabel>
            </Tag>
        </>
    )
}