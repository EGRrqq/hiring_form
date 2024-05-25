import { v4 as uuidv4 } from "uuid";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileTextIcon, PlusIcon, X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { FILE_TYPES } from "../constants";

export const FileField = () => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="resume"
      render={({
        field: { value, onChange, ...fieldProps },
        fieldState: { error },
      }) => {
        // Add image file with id to FileList
        function addItems(dataTransfer: DataTransfer, image: File) {
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
          Array.from(files).forEach((image) => addItems(dataTransfer, image));
        }

        // Validate and update uploaded file
        function sendFiles(dataTransfer: DataTransfer) {
          const newFiles = dataTransfer.files;
          onChange(newFiles);
        }

        return (
          <FormItem className="flex flex-wrap gap-4 [&>*]:flex-1 [&>*]:basis-[48%]">
            <div className="flex flex-col gap-3.5 mt-2">
              <FormLabel className="text-primary">Dokument hochladen</FormLabel>
              <FormDescription>
                Klicken Sie auf die Schaltfläche oder ziehen Sie ein Dokument im
                PDF-, DOCX-, PNG.
              </FormDescription>

              <ul className="flex flex-wrap gap-2">
                {value &&
                  Array.from(value as FileList).map((f) => (
                    <li className="list-none" key={f.id || uuidv4()}>
                      <Badge
                        variant="secondary"
                        className="flex gap-2 p-1 justify-center items-center w-fit h-fit bg-gray-100 "
                      >
                        <FileTextIcon />
                        <p>{f.name}</p>
                        <Button
                          size="icon"
                          className="bg-transparent hover:bg-transparent h-fit w-fit text-primary focus:ring-indigo-600 focus-visible:ring-indigo-600 "
                          onClick={() => {
                            // Triggered when user delete a new file

                            // FileList is immutable, so we need to create a new one
                            const dataTransfer = new DataTransfer();

                            // Add already existing images
                            if (value) addFiles(dataTransfer, value);

                            if (f.id) removeItem(dataTransfer, f.id);

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

            <div className="relative ">
              <FormControl>
                <Input
                  {...fieldProps}
                  tabIndex={-1}
                  className={`cursor-pointer h-32 opacity-0`}
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

              <div className="pointer-events-none absolute top-0 w-full flex flex-col gap-1 h-full">
                <FormLabel
                  tabIndex={0}
                  className={`focus:ring focus:outline-indigo-600 focus:ring-gray-200 cursor-pointer rounded-3xl border-2 border-dashed flex justify-center items-center text-gray-400 h-full
                    ${error ? "border-destructive" : "gray-400"}
                    `}
                >
                  <PlusIcon size="2rem" />
                </FormLabel>
                <FormMessage />
              </div>
            </div>
          </FormItem>
        );
      }}
    />
  );
};

