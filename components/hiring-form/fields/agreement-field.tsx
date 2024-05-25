import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormContext } from "react-hook-form";

export const AgreementField = () => {
  const form = useFormContext();

  return (
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
              <FormLabel>I’m agree with every data you collect</FormLabel>
            </span>
          </div>
          <FormMessage className="sr-only" />
        </FormItem>
      )}
    />
  );
};

