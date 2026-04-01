"use client";

import { useForm } from "@tanstack/react-form";
import {
  LoaderIcon,
  Lock,
  LockOpen,
  Mail,
  UserRoundCogIcon,
} from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { z } from "zod";
import { FormErrorMessage } from "@/components/form-error";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(6),
  role: z.enum(["admin", "user"]),
});

type FormValues = z.infer<typeof formSchema>;
export const CreateUser = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      role: "user",
      name: "",
    } satisfies FormValues as FormValues,
    validators: {
      onChange: formSchema,
    },
    onSubmit: async (values) => {
      const { email, password, name, role } = values.value;
      await authClient.admin.createUser(
        {
          email,
          password,
          name,
          role,
          data: {},
        },
        {
          onSuccess: (data) => {
            console.log(data);
            toast.success(`User created successfully`);
            form.reset();
          },
          onError: (error) => {
            toast.error(error.error.message);
          },
        },
      );
    },
  });

  return (
    <div className="flex flex-col">
      {/* <div className="w-37 md:w-75"> */}
      {/*   <Image */}
      {/*     src="/MRD_Logo.png" */}
      {/*     width={1840} */}
      {/*     height={677} */}
      {/*     alt="logo" */}
      {/*     className="" */}
      {/*   /> */}
      {/* </div> */}
      <Card className="my-4 w-fit py-4">
        <CardHeader>
          <CardTitle className="text-center">Create user</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <div className="relative flex flex-col justify-center">
              <form.Field name="name">
                {(field) => {
                  return (
                    <div>
                      <Input
                        placeholder="Full Name"
                        className="w-full rounded-xs border border-gray-300 md:w-96"
                        name={field.name}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        value={String(field.state.value)}
                        id={field.name}
                      />
                      <FormErrorMessage field={field} />
                    </div>
                  );
                }}
              </form.Field>
              <UserRoundCogIcon
                className="absolute right-1 m-1"
                stroke="grey"
                strokeOpacity={100}
                strokeWidth={1}
              />
            </div>

            <div className="relative flex flex-col">
              <form.Field name="email">
                {(field) => {
                  return (
                    <div>
                      <Input
                        className="w-full rounded-xs border border-gray-300 md:w-96"
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        value={field.state.value}
                        name={field.name}
                        id={field.name}
                        placeholder="Email"
                        type="email"
                      />
                      <FormErrorMessage field={field} />
                    </div>
                  );
                }}
              </form.Field>
              <Mail
                className="absolute right-1 m-1 justify-items-start"
                stroke="grey"
                strokeOpacity={100}
                strokeWidth={1}
              />
            </div>
            <div className="relative flex flex-col">
              <form.Field name="password">
                {(field) => {
                  return (
                    <div>
                      <Input
                        className="w-full rounded-xs border border-gray-300 md:w-96"
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        value={field.state.value}
                        name={field.name}
                        id={field.name}
                        placeholder="Password"
                        type={showPassword ? "password" : "text"}
                      />
                      <FormErrorMessage field={field} />
                    </div>
                  );
                }}
              </form.Field>
              {showPassword ? (
                <LockOpen
                  className="absolute right-1 m-1 cursor-pointer justify-items-start"
                  stroke="grey"
                  strokeOpacity={100}
                  onClick={() => setShowPassword(!showPassword)}
                  strokeWidth={1}
                />
              ) : (
                <Lock
                  className="absolute right-1 m-1 cursor-pointer justify-items-start"
                  stroke="grey"
                  strokeOpacity={100}
                  onClick={() => setShowPassword(!showPassword)}
                  strokeWidth={1}
                />
              )}
            </div>
            <div>
              <form.Field name="role">
                {(field) => {
                  return (
                    <div>
                      <Select
                        onOpenChange={(open) => {
                          console.log("was open", open);
                        }}
                        value={field.state.value}
                        // biome-ignore lint/suspicious/noExplicitAny: Does not matter>
                        onValueChange={(e: any) => {
                          field.handleChange(e);
                        }}
                      >
                        <SelectTrigger className="w-full max-w-48 border-gray-300">
                          <SelectValue placeholder="Select user role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Role</SelectLabel>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="user">Normal User</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormErrorMessage field={field} />
                    </div>
                  );
                }}
              </form.Field>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                >
                  {([canSubmit, isSubmitting]) => (
                    <Button
                      className="cursor-pointer"
                      disabled={!canSubmit}
                      type="submit"
                    >
                      <p>
                        {isSubmitting ? (
                          <LoaderIcon className="animate-spin" />
                        ) : (
                          "Continue"
                        )}
                      </p>
                    </Button>
                  )}
                </form.Subscribe>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
