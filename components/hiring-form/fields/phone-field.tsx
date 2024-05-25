import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export const PhoneField = () => {
  const form = useFormContext();

  return (
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
  );
};

