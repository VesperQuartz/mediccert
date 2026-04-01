"use client";
import { useForm } from "@tanstack/react-form";
import { LoaderIcon, Lock, LockOpen, Mail } from "lucide-react";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  email: z.email(),
  password: z.string(),
  rememberMe: z.boolean(),
});

const Auth = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validators: {
      onChange: formSchema,
    },
    onSubmit: async (values) => {
      try {
        const { email, password, rememberMe } = values.value;
        await authClient.signIn.email(
          {
            email,
            password,
            rememberMe,
            callbackURL: "/",
          },
          {
            onError: (error) => {
              console.log(error);
              toast.error(error.error.message);
            },
          },
        );
      } catch (error) {
        console.log("catched_error", error);
      }
    },
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-37 md:w-75">
        <Image
          src="/MRD_Logo.png"
          loading="eager"
          width={1840}
          height={677}
          alt="logo"
          className=""
        />
      </div>
      <Card className="py-4">
        <CardHeader>
          <CardTitle className="text-center">Sign in</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <div className="relative flex flex-col items-end justify-center">
              <form.Field name="email">
                {(field) => {
                  return (
                    <Input
                      className="w-full rounded-xs border border-gray-300 md:w-96"
                      onChange={(e) => field.handleChange(e.target.value)}
                      autoComplete="email"
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      name={field.name}
                      id={field.name}
                      placeholder="Email"
                      type="email"
                    />
                  );
                }}
              </form.Field>
              <Mail
                className="absolute m-1 justify-items-start"
                stroke="grey"
                strokeOpacity={100}
                strokeWidth={1}
              />
            </div>
            <div className="relative flex flex-col items-end justify-center">
              <form.Field name="password">
                {(field) => {
                  return (
                    <Input
                      className="w-full rounded-xs border border-gray-300 md:w-96"
                      onChange={(e) => field.handleChange(e.target.value)}
                      autoComplete="current-password"
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      name={field.name}
                      id={field.name}
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                    />
                  );
                }}
              </form.Field>
              {showPassword ? (
                <LockOpen
                  className="absolute m-1 cursor-pointer justify-items-start"
                  stroke="grey"
                  strokeOpacity={100}
                  onClick={() => setShowPassword(!showPassword)}
                  strokeWidth={1}
                />
              ) : (
                <Lock
                  className="absolute m-1 cursor-pointer justify-items-start"
                  stroke="grey"
                  strokeOpacity={100}
                  onClick={() => setShowPassword(!showPassword)}
                  strokeWidth={1}
                />
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-row items-center gap-2">
                <form.Field name="rememberMe">
                  {(field) => {
                    return (
                      <Checkbox
                        className="border border-gray-500"
                        name={field.name}
                        onCheckedChange={field.handleChange}
                        onBlur={field.handleBlur}
                        value={String(field.state.value)}
                        id={field.name}
                      />
                    );
                  }}
                </form.Field>
                <p>Remember me</p>
              </div>
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

export default Auth;
