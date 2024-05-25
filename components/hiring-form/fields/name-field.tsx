import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export const NameField = () => {
  const form = useFormContext();

  return (
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
  );
};

