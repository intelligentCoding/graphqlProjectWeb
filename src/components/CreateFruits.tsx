import React from "react";
import { Formik, Form } from "formik";
import { Box, Button, FormControl, FormLabel, Select, useToast } from "@chakra-ui/core";
import { CustomInput } from "./Input";
import { CreatFruitUsersInput, useCreateFruitsMutation, useLoginMutation } from "../generated/graphql";
import { errorMap } from "../utils";

interface CreateFruitsProps {
  onClose: () => void
}

export const CreateFruits: React.FC<CreateFruitsProps> = ({onClose}) => {
  const toast = useToast()
  const toastIdRef = React.useRef()
  const [, createFruits,] = useCreateFruitsMutation()
  const initialValues = {
    Fruitsname: ''
  }
  return (
    <>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, { setFieldError, setErrors }) => {
            try {
              const response = await createFruits({name: values.Fruitsname})
              if(response.error) {
                const {code} = response.error.graphQLErrors[0].extensions
                let message = response.error.message
                if(code === 'FRUIT_ALREADY_EXIST') {
                  message= "This fruit already exists please add a different fruit"
                  toast({ description: message, status: 'error'})
                  setFieldError('Fruitsname', message)
                }
              } else {
                onClose()
              }
            } catch (error) {
              console.log(error)
            }
            return
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormControl>
                
                <CustomInput
                  name="Fruitsname"
                  type="text"
                  placeholder="Please Enter Fruit's name"
                  label="Min"
                />
                <Box mt={6}>
                  <Button
                    isDisabled={isSubmitting}
                    isLoading={isSubmitting}
                    type="submit"
                    variantColor="orange"
                  >
                    Add Fruit
                  </Button>
                </Box>
              </FormControl>
            </Form>
          )}
        </Formik>
    </>
  );
};
//in next.js have to export default component
export default CreateFruits;
