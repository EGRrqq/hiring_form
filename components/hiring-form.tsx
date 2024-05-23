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
});

export function HiringForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      skill: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Card>
      <CardHeader>
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel className="sr-only">Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Phone"
                        type="tel"
                        className="remove-number-arrows"
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
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel className="sr-only">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="skill"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel className="sr-only">Your Skill</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Your Skill" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {skillValues.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          className="grow bg-indigo-600"
          type="submit"
        >
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}

