"use client";

import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { parsePhoneNumber } from "awesome-phonenumber";
import { Badge } from "../ui/badge";
import { FileTextIcon, PlusIcon, X } from "lucide-react";
import { SKILL_VALUES, FILE_TYPES } from "./constants";
import {
  AgreementField,
  SelectField,
  NameField,
  PhoneField,
  EmailField,
  FileField,
} from "./fields";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter your name",
  }),
  phone: z.string().refine((n) => parsePhoneNumber(n).valid, {
    message: "Please enter a valid phone number",
  }),
  email: z.string().email({ message: "Please enter a valid email" }),
  skill: z.enum(SKILL_VALUES, {
    message: "Please select your skill",
  }),
  resume: z
    .custom<FileList>(
      (val) => val instanceof FileList,
      "Please select your files"
    )
    .refine((files) => files.length > 0, "Please select your files")
    .refine(
      (files) =>
        Array.from(files).every((file) => FILE_TYPES.includes(file.type)),
      "Unsupported file format"
    ),
  agreement: z.boolean().refine((f) => f, {
    message: "Please agree to our data collection",
  }),
});

export function HiringForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      resume: undefined,
      skill: undefined,
      agreement: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Card>
      <CardHeader className="gap-3.5">
        <CardTitle>Drop us a line</CardTitle>
        <CardDescription>
          Our documentary campaigns feature leading figures, organisations and
          leaders, in open and candid discussions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="flex flex-col gap-4">
            <NameField />

            <div className="flex flex-wrap gap-4 [&>*]:grow">
              <PhoneField />
              <EmailField />
            </div>

            <SelectField />
            <FileField />
            <AgreementField />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          className="grow bg-indigo-600 hover:bg-indigo-500 rounded-2xl focus:ring-indigo-600 focus-visible:ring-indigo-600 focus:hover:ring-indigo-500 focus-visible:hover:ring-indigo-500 "
          type="submit"
        >
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}

