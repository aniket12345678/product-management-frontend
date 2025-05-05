# product-management-frontend




App.tsx

import { FormProvider, useForm } from 'react-hook-form';
import Form1 from './Form1';
import Form2 from './Form2';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

function App() {

  // const form1Validate = z.object({
  //   drop_down_val: z.literal("1"),
  //   first_name: z.string().min(1, "First name is required"),
  //   last_name: z.string().min(1, "Last name is required"),
  //   dob: z.date({ required_error: "Date of Birth is required" }),
  //   email: z.string().optional(),
  //   password: z.string().optional(),
  // });

  const validate = z.object({
    drop_down_val: z.string(),
    place: z.string().min(1, "Place is required"),
  }).and(
    z.union([
      z.object({
        drop_down_val: z.literal("1"),
        first_name: z.string().min(1, "First name is required"),
        last_name: z.string().min(1, "Last name is required"),
        dob: z.date({ required_error: "Date of Birth is required" }),
        email: z.string().optional(),
        password: z.string().optional(),
      }),
      z.object({
        drop_down_val: z.literal("2"),
        email: z.string().email("Invalid email"),
        // password: z.string().min(6, "Password must be at least 6 characters"),
        // first_name: z.string().optional(),
        first_name: z.string().min(1, "First name is required"),
        last_name: z.string().optional(),
      })
    ])
  );


  const methods = useForm({
    resolver: zodResolver(validate),
    defaultValues: {
      drop_down_val: "0",
      place: '',
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    }
  });

  const submitForm = (values) => {
    console.log('values:- ', values);
  }

  const dropDown = methods.watch("drop_down_val");

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submitForm)}>
          <select id="" {...methods.register("drop_down_val")}>
            <option value={1}>form1</option>
            <option value={2}>form2</option>
          </select>
          <input
            type="text"
            {...methods.register("place")}
            placeholder='Place'
          />
          {methods.formState.errors.first_name?.message && <div>{methods.formState.errors.first_name.message}</div>}
          {
            dropDown === "1" &&
            <Form1 />
          }
          {
            dropDown === "2" &&
            <Form2 />
          }
          <button type='submit'>save</button>
        </form>
      </FormProvider>
    </>
  )
}

export default App





Form1.tsx

import { Controller, useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Form1 = () => {
    const { register, control, formState: { errors } } = useFormContext();
    return (
        <div>
            <input
                type="text"
                {...register("first_name")}
                placeholder='first name'
            />
            {errors.first_name?.message && <div>{errors.first_name.message}</div>}
            <input
                type="text"
                {...register("last_name", {
                    required: "Enter Last Name"
                })}
                placeholder='last name'
            />
            {errors.last_name?.message && <div>{errors.last_name.message}</div>}
            <Controller
                control={control}
                name="dob" // or any name you want for the date field
                render={({ field }) => (
                    <DatePicker
                        placeholderText="Select date"
                        onChange={(date) => field.onChange(date)}
                        selected={field.value}
                        dateFormat="yyyy-MM-dd"
                    />
                )}
            />
            {errors.dob?.message && <div>{errors.dob.message}</div>}
        </div>
    )
}

export default Form1




Form2.tsx


import { useFormContext } from 'react-hook-form'

const Form2 = () => {
    const { register, formState: { errors } } = useFormContext();
    return (
        <div>
            <input
                type="email"
                {...register("email", {
                    required: "Enter email",
                })}
                placeholder='email'
            />
            {errors.email?.message && <div>{errors.email.message}</div>}
            <input
                type="password"
                {...register("password", {
                    required: "Enter password"
                })}
                placeholder='password'
            />
            {errors.password?.message && <div>{errors.password.message}</div>}
        </div>
    )
}

export default Form2
