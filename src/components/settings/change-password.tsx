"use client";

import { useForm } from "@tanstack/react-form";
import { LoaderIcon } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { FormErrorMessage } from "@/components/form-error";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const ChangePassword = () => {
  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validators: {
      onChange: passwordSchema,
    },
    onSubmit: async ({ value }) => {
      const { error } = await authClient.changePassword({
        newPassword: value.newPassword,
        currentPassword: value.currentPassword,
        revokeOtherSessions: true,
      });

      if (error) {
        toast.error(error.message || "Failed to change password");
        return;
      }

      toast.success("Password changed successfully");
      form.reset();
    },
  });

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className="flex flex-col gap-2">
            <form.Field name="currentPassword">
              {(field) => (
                <div className="grid gap-1.5">
                  <Label htmlFor={field.name}>Current Password</Label>
                  <Input
                    type="password"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="border border-black"
                    placeholder="Enter current password"
                  />
                  <FormErrorMessage field={field} />
                </div>
              )}
            </form.Field>
          </div>

          <div className="flex flex-col gap-2">
            <form.Field name="newPassword">
              {(field) => (
                <div className="grid gap-1.5">
                  <Label htmlFor={field.name}>New Password</Label>
                  <Input
                    type="password"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    className="border border-black"
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter new password"
                  />
                  <FormErrorMessage field={field} />
                </div>
              )}
            </form.Field>
          </div>

          <div className="flex flex-col gap-2">
            <form.Field name="confirmPassword">
              {(field) => (
                <div className="grid gap-1.5">
                  <Label htmlFor={field.name}>Confirm Password</Label>
                  <Input
                    type="password"
                    id={field.name}
                    name={field.name}
                    className="border border-black"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Confirm new password"
                  />
                  <FormErrorMessage field={field} />
                </div>
              )}
            </form.Field>
          </div>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit || isSubmitting}>
                {isSubmitting ? (
                  <LoaderIcon className="mr-2 size-4 animate-spin" />
                ) : null}
                Update Password
              </Button>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
    </Card>
  );
};
