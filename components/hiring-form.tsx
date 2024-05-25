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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { parsePhoneNumber } from "awesome-phonenumber";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { FileTextIcon, PlusIcon, X } from "lucide-react";

const SKILL_VALUES = ["Junior", "Middle", "Senior", "Lead", "CTO"] as const;
const FILE_TYPES = [
  "application/pdf",
  // .docx
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
];

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
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel className="sr-only">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      className={`rounded-2xl bg-gray-200 ring-inset focus:ring-indigo-600 focus-visible:ring-indigo-600 
                       ${
                         error
                           ? "outline outline-destructive focus-visible:ring-destructive "
                           : ""
                       }
                     `}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-wrap gap-4 [&>*]:grow">
              <FormField
                control={form.control}
                name="phone"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Phone"
                        type="tel"
                        className={`remove-number-arrows rounded-2xl bg-gray-200 ring-inset focus:ring-indigo-600 focus-visible:ring-indigo-600 
                       ${
                         error
                           ? "outline outline-destructive focus-visible:ring-destructive "
                           : ""
                       }
                      `}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        type="email"
                        className={`rounded-2xl bg-gray-200 ring-inset focus:ring-indigo-600 focus-visible:ring-indigo-600 
                       ${
                         error
                           ? "outline outline-destructive focus-visible:ring-destructive "
                           : ""
                       }
                     `}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="skill"
              render={({ field, fieldState: { error } }) => (
                <FormItem className="grow">
                  <FormLabel className="sr-only">Your Skill</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={`rounded-2xl bg-gray-200 ring-inset focus:ring-indigo-600 focus-visible:ring-indigo-600 
                       ${
                         error
                           ? "outline outline-destructive focus-visible:ring-destructive "
                           : ""
                       }
                     `}
                      >
                        <SelectValue placeholder="Your Skill" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent className="rounded-2xl bg-gray-100">
                      {SKILL_VALUES.map((s) => (
                        <SelectItem
                          key={s}
                          value={s}
                          className={`cursor-pointer data-[state=checked]:font-bold [&_svg]:hidden px-4 focus:bg-gray-50`}
                        >
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="resume"
              render={({
                field: { value, onChange, ...fieldProps },
                fieldState: { error },
              }) => {
                interface IFileWithId extends File {
                  id: string;
                }

                // Add image file with id to FileList
                function addItems(
                  dataTransfer: DataTransfer,
                  image: IFileWithId
                ) {
                  image.id = uuidv4();
                  dataTransfer.items.add(image);
                }

                function removeItem(dataTransfer: DataTransfer, id: string) {
                  const files = dataTransfer.files;
                  const filesArr = Array.from(files);
                  const fileIndex = filesArr.findIndex((i) => i.id === id);

                  dataTransfer.items.remove(fileIndex);
                }

                function addFiles(dataTransfer: DataTransfer, files: FileList) {
                  Array.from(files).forEach((image) =>
                    addItems(dataTransfer, image)
                  );
                }

                // Validate and update uploaded file
                function sendFiles(dataTransfer: DataTransfer) {
                  const newFiles = dataTransfer.files;
                  onChange(newFiles);
                }

                return (
                  <FormItem className="flex flex-wrap gap-4 [&>*]:flex-1 [&>*]:basis-[48%]">
                    <div className="flex flex-col gap-3.5 mt-2">
                      <FormLabel className="text-primary">
                        Dokument hochladen
                      </FormLabel>
                      <FormDescription>
                        Klicken Sie auf die Schaltfläche oder ziehen Sie ein
                        Dokument im PDF-, DOCX-, PNG.
                      </FormDescription>

                      <ul className="flex flex-col gap-2">
                        {value &&
                          Array.from(value).map((f) => (
                            <li className="list-none" key={f.id}>
                              <Badge
                                variant="secondary"
                                className="flex gap-2 p-1 justify-center items-center w-fit h-fit bg-gray-100"
                              >
                                <FileTextIcon />
                                <p>{f.name}</p>
                                <Button
                                  size="icon"
                                  className="bg-transparent hover:bg-transparent h-fit w-fit text-primary"
                                  onClick={() => {
                                    // Triggered when user delete a new file

                                    // FileList is immutable, so we need to create a new one
                                    const dataTransfer = new DataTransfer();

                                    // Add already existing images
                                    if (value) addFiles(dataTransfer, value);

                                    removeItem(dataTransfer, f.id);

                                    sendFiles(dataTransfer);
                                  }}
                                >
                                  <X />
                                </Button>
                              </Badge>
                            </li>
                          ))}
                      </ul>
                    </div>

                    <FormControl>
                      <Input
                        {...fieldProps}
                        className="sr-only"
                        type="file"
                        multiple
                        accept={FILE_TYPES.join(",")}
                        onChange={(e) => {
                          // Triggered when user uploaded a new file

                          // FileList is immutable, so we need to create a new one
                          const dataTransfer = new DataTransfer();

                          // Add old images
                          if (value) addFiles(dataTransfer, value);
                          // Add newly uploaded images
                          addFiles(dataTransfer, e.target.files!);

                          sendFiles(dataTransfer);
                        }}
                      />
                    </FormControl>

                    <div className="flex flex-col gap-1">
                      <FormLabel
                        className={`cursor-pointer rounded-3xl border-2 border-dashed flex justify-center items-center p-8 text-gray-400
                    ${error ? "border-destructive" : "gray-400"}
                    `}
                      >
                        <PlusIcon size="2rem" />
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="agreement"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <div className="flex flex-inline items-start space-x-3 space-y-0 mt-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className={`border-0 outline outline-gray-200 data-[state=checked]:bg-transparent data-[state=checked]:text-indigo-600 focus:ring-indigo-600 focus-visible:ring-indigo-600 ${
                          error
                            ? "outline-destructive"
                            : "data-[state=checked]:outline-indigo-600"
                        }`}
                      />
                    </FormControl>
                    <span className="space-y-1 leading-none">
                      <FormLabel>
                        I’m agree with every data you collect
                      </FormLabel>
                    </span>
                  </div>
                  <FormMessage className="sr-only" />
                </FormItem>
              )}
            />
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

