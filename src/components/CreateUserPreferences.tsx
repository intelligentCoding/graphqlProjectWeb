import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { Badge, Box, Button, FormControl, FormLabel, Select, Stat, StatGroup, StatLabel, StatNumber } from "@chakra-ui/core";
import { PageWrapper } from "./PageWrapper";
import { CustomInput } from "./Input";
import { CreatFruitUsersInput, useCreateFruitUsersMutation, useFruitsQuery, useLoginMutation, usePreferenceCreateQuery } from "../generated/graphql";
import { errorMap } from "../utils";
import { useRouter } from "next/router";
import { NavBar } from "./Navbar";
import { UserFruit, UserFruitProps } from "./UserFruit";
interface TotalMinMax {
  min: number
  max: number
}
interface CreateUserPreferencesProps {
  onClose: () => void
  userId: number
  userFruit?: UserFruitProps
  totalMinMax: TotalMinMax
}

export const CreateUserPreferences: React.FC<CreateUserPreferencesProps> = ({ userFruit, userId, onClose, totalMinMax }) => {
  const [{ data, fetching }] = usePreferenceCreateQuery({
    variables: {
      userId
    },
    requestPolicy: 'network-only'
  })
  const [initialFruitID, setInitialFruitID] = useState<number>()
  const [isError, setIsError] = useState(false)
  const [, createFruitUsers] = useCreateFruitUsersMutation()
  useEffect(() => {
    if (data && data.userById && data.userById.fruitsByUserId) {
      setInitialFruitID(data.userById.fruitsByUserId[0].id)
    }
  }, [data])
  const initialValues: CreatFruitUsersInput = {
    min: userFruit?.min || 0,
    max: userFruit?.max || 0,
    userId: userId,
    fruitId: initialFruitID || 0
  }
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setFieldError, setSubmitting, setErrors }) => {
          if (values.max < values.min) {
            setFieldError('max', "Max value can not be less than min value")
            setSubmitting(false)
          }
          if (values.max <= 0) {
            setFieldError('max', "Max value can not be zero")
            setSubmitting(false)
          }
          if (values.min <= 0) {
            setFieldError('min', "min value can not be zero")
            setSubmitting(false)
          }

          if ((values.max + totalMinMax.max) > data!.userById!.max) {
            setFieldError('max', 'The maximum amount exceeds users per week maximum preference')
            setSubmitting(false)

          }
          if ((values.min + totalMinMax.min) > data!.userById!.min) {
            setFieldError('min', 'The minimum amount exceeds users minimum per week limit')
            setSubmitting(false)
          }
          if (values.fruitId === 0) {
            setFieldError('fruitId', 'Must select a fruit')
            setSubmitting(false)
            setIsError((prev) => !prev)
          }
          if (!isError) {
            try {
              const response = await createFruitUsers({
                creatFruitUsersInput: {
                  min: values.min,
                  max: values.max,
                  fruitId: Number(values.fruitId),
                  userId: values.userId
                }  
              })
              if (response.error) {
                let message = response.error?.message
                toast({ description: message || "There was an error saving the preference", status: 'error' })
              } else{
                onClose()
              }
              
            } catch (error) {
              console.log(error)
              toast({ description: "Error saving Preference", status: 'error' })
            }

          }
        }}
      >
        {({ isSubmitting, errors }) => {
          return (
            <Form>
              <StatGroup>
                <Stat>
                  <StatLabel>Lower</StatLabel>
                  <StatNumber color="white" background="green">{data?.userById?.min}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Total Lower</StatLabel>
                  <StatNumber color="white" background="orange">{totalMinMax.min}</StatNumber>
                </Stat>

                <Stat alignContent="center">
                  <StatLabel>Upper</StatLabel>
                  <StatNumber color="white" background="green">{data?.userById?.max}</StatNumber>
                </Stat>

                <Stat>
                  <StatLabel>Total Upper</StatLabel>
                  <StatNumber color="white" background="orange">{totalMinMax.max}</StatNumber>
                </Stat>
              </StatGroup>
              {data && data?.userById && data?.userById?.max && (
                <Badge background="purple" color="white">{`We can only preffer ${data.userById.max - totalMinMax.max} more fruits for this user`} </Badge>
              )}

              <FormControl>

                <CustomInput
                  name="min"
                  type="number"
                  placeholder="Please enter minimum value"
                  label="Min"
                />
                <CustomInput
                  name="max"
                  type="number"
                  placeholder="Please enter maximum value"
                  label="Max"
                />
                <Field as="select" name="fruitId">
                  <option value={0}>Please select a fruit</option>
                  {data?.userById?.fruitsByUserId?.map((fruit, index) => {
                    return (
                      <option value={fruit.id}>{fruit.Fruitsname}</option>
                    )
                  })}
                </Field>
                {errors.fruitId && (
                  <Badge background="red" color="white">{`Please select a fruit`} </Badge>

                )}

                <Box mt={6}>
                  <Button
                    isLoading={isSubmitting}
                    type="submit"
                    variantColor="orange"
                    isDisabled={Object.keys(errors).length > 0}
                  >
                    Create User Preference
                  </Button>
                </Box>
              </FormControl>
            </Form>
          )
        }}
      </Formik>
    </>
  );
};
//in next.js have to export default component
export default CreateUserPreferences;
function toast(arg0: { description: string; status: string; }) {
  throw new Error("Function not implemented.");
}

