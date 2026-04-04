import type { AnyFieldApi } from "@tanstack/react-form";
import { Dot } from "lucide-react";

export const FormErrorMessage = ({ field }: { field: AnyFieldApi }) => {
  return (
    <div className="flex min-h-5 flex-col">
      {field.state.meta?.errors?.map((e) => {
        return (
          <div
            key={crypto.randomUUID()}
            className="items-cente flex flex-row items-center"
          >
            <Dot />
            <div className="">
              <p className="text-xs text-destructive">{e?.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
