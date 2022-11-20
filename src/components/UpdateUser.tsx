import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { Box, Button, FormControl, Spinner, useToast } from "@chakra-ui/core";
import { CustomInput } from "./Input";
import {  useUpdateUserMutation, useUserFruitByIdQuery } from "../generated/graphql";
interface UpdateUserProps {
  onClose: () => void
  userId: number
  min: number
  max: number
}

export const UpdateUser: React.FC<UpdateUserProps> = ({ userId, onClose, min, max}) => {
  const toast = useToast();
  const [totalMinMax, setTotalMinMax] = useState<{ max: number, min: number }>({ max: 0, min: 0 })

  const [, updateUser] = useUpdateUserMutation()
  const [{ data, fetching }, executeQuery] = useUserFruitByIdQuery({
    variables: {
      id: userId,
    },
    requestPolicy: 'network-only'
  })
  useEffect(() => {
    const total = data?.fruitsUsers?.reduce((acc, item) => {
      acc.max += item.max
      acc.min += item.min
      return acc
    }, { max: 0, min: 0 })
    if (total) {
      setTotalMinMax(total)
    }
  }, [data])

  const initialValues = {
    min: min,
    max: max,
    userId: userId,
  }
  return (
    <>
      <Formik
        initialValues={initialValues}
        validate={ (values) => {
          const errors: any = {}
          if (values.max <= 0) {
            errors.max = "Max value can not be zero"
          }
          if (values.min <= 0) {
            errors.min =  "min value can not be zero"
          }

          if (values.min > values.max) {
            errors.max = 'Min value can not be greater than max'
          }
          if(values.min < totalMinMax.min ) {
            errors.min = `Total lower limit for this user is ${totalMinMax.min}`
          }
          if(values.max  < totalMinMax.max) {
            errors.max = `Total upper limit for this user is ${totalMinMax.max}`
          }

          return errors
        }}
        onSubmit={async (values) => {

            try {
              const response = await updateUser(values)
              if (response.error) {
                let message = response.error?.message
                toast({ description: message || "There was an error updating user", status: 'error' })
              } else {
                toast({ description: "Succesfully updated user", status: 'success' })
                onClose()
              }
            } catch (error) {
              console.log(error)
              toast({ description: "Error saving Preference", status: 'error' })
            }
        }}
      >
        {({ isSubmitting, errors }) => {
          if(fetching) {
            <Spinner></Spinner>
          }
          return (
            <Form>
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
                  label="Min"
                />
                <Box mt={6}>
                  <Button
                    isLoading={isSubmitting}
                    type="submit"
                    variantColor="orange"
                    isDisabled={Object.keys(errors).length > 0}
                  >
                    Update User
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
export default UpdateUser;


