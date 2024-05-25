import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { SKILL_VALUES } from "../constants";

export const SelectField = () => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="skill"
      render={({ field, fieldState: { error } }) => (
        <FormItem className="grow">
          <FormLabel className="sr-only">Your Skill</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
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
  );
};

