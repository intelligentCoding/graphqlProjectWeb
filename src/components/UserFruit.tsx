import React, { InputHTMLAttributes } from "react";
import NextLink from "next/link";

import { useField } from "formik";
import { FormControl, FormLabel, Input, FormErrorMessage, Textarea, Box, StatGroup, Stat, StatLabel, StatNumber, Link, Heading, Button} from "@chakra-ui/core";
import { PageWrapper } from "./PageWrapper";

export interface UserFruitProps {
  id: number
  userId: number
  fruitId: number
  max: number
  min: number
  fruitName: string
}


export const UserFruit: React.FC<UserFruitProps> = ({id, fruitId , max, min, fruitName}) => {
  const userFruit = {
    id,
    fruitId,
    max,
    min,
    fruitName,
  } 
  return (
    <>
    <Box
      bg="#3362FF"
      alignItems="center"
      m={2}
      w="100%"
      p={4}
      color="white"
      key={id}
    >
      <StatGroup>
        <Stat>
          <StatLabel>Fruit Name</StatLabel>
          <StatNumber>{fruitName}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Minimum Fruits</StatLabel>
          <StatNumber>{min}</StatNumber>
        </Stat>

        <Stat>
          <StatLabel>Maximum Fruits</StatLabel>
          <StatNumber>
            {max}
          </StatNumber>
        </Stat>
        {/* TODO: */}
        {/* <Button variantColor='blue'>Edit</Button> */}
      </StatGroup>
    </Box>
  </>
  );
};