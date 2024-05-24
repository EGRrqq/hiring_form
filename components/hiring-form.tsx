"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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

const skillValues = ["Junior", "Middle", "Senior", "Lead", "CTO"] as const;

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter your name",
  }),
  phone: z.string().refine((n) => parsePhoneNumber(n).valid, {
    message: "Please enter a valid phone number",
  }),
  email: z.string().email({ message: "Please enter a valid email" }),
  skill: z.enum(skillValues, {
    message: "Please select your skill",
  }),
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field, fieldState: { error } }) => (
                  <FormItem className="grow">
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
                  <FormItem className="grow">
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
                      {skillValues.map((s) => (
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
              name="agreement"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <div className="flex flex-inline items-start space-x-3 space-y-0 ">
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

