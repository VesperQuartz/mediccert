"use client";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon, LoaderIcon } from "lucide-react";
import { toast } from "sonner";
import { FormErrorMessage } from "@/components/form-error";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sigMap } from "@/lib/converter";
import { orpc } from "@/lib/orpc";
import { cn } from "@/lib/utils";
import { generateSchema } from "@/types/schema";

export const GenerateCertificate = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(orpc.generateCert.mutationOptions());

  const form = useForm({
    defaultValues: {
      firstName: "",
      surname: "",
      contractorCompanyName: "",
      periodicalCheck: false,
      prolongedMedicalCheck: false,
      fitForAssignedTask: false,
      // workUnit: false,
      certNo: "",
      DOB: "",
      position: "",
      sigKey: "",
      location: "",
      fitWithRestrictions: "",
      forx: "",
      unfit: "",
      currentDate: "",
    },
    validators: {
      onChange: generateSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await mutation.mutateAsync(value);
        if (res?.data) {
          const link = document.createElement("a");
          link.href = res.data;
          link.download = `certificate_${value.surname}_${format(new Date(value.currentDate), "yyyy-MM-dd")}.docx`;
          link.click();
          toast.success("Certificate generated successfully");

          queryClient.invalidateQueries({
            queryKey: orpc.getStats.key(),
          });
          queryClient.invalidateQueries({
            queryKey: orpc.listHistory.key(),
          });
        }
      } catch (error) {
        toast.error("Failed to generate certificate");
        console.error(error);
      }
    },
  });

  return (
    <div className="flex min-h-screen flex-col items-center p-10">
      <Card className="w-full max-w-4xl py-4">
        <CardHeader>
          <CardTitle className="text-center">Generate Certificate</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="relative flex min-h-[70px] flex-col items-start">
                <form.Field name="certNo">
                  {(field) => {
                    return (
                      <div className="w-full">
                        <Input
                          className="w-full rounded-xs border border-gray-300"
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          value={field.state.value}
                          name={field.name}
                          id={field.name}
                          placeholder="Enter the certificate number"
                        />
                        <FormErrorMessage field={field} />
                      </div>
                    );
                  }}
                </form.Field>
              </div>
              <div className="relative flex min-h-[70px] flex-col items-start">
                <form.Field name="contractorCompanyName">
                  {(field) => {
                    return (
                      <div className="w-full">
                        <Input
                          className="w-full rounded-xs border border-gray-300"
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          value={field.state.value}
                          name={field.name}
                          id={field.name}
                          placeholder="Enter the company name"
                        />
                        <FormErrorMessage field={field} />
                      </div>
                    );
                  }}
                </form.Field>
              </div>

              <div className="relative flex min-h-[70px] flex-col items-start">
                <form.Field name="firstName">
                  {(field) => {
                    return (
                      <div className="w-full">
                        <Input
                          className="w-full rounded-xs border border-gray-300"
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          value={field.state.value}
                          name={field.name}
                          id={field.name}
                          placeholder="Enter first name"
                        />
                        <FormErrorMessage field={field} />
                      </div>
                    );
                  }}
                </form.Field>
              </div>
              <div className="relative flex min-h-[70px] flex-col items-start">
                <form.Field name="surname">
                  {(field) => {
                    return (
                      <div className="w-full">
                        <Input
                          className="w-full rounded-xs border border-gray-300"
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          value={field.state.value}
                          name={field.name}
                          id={field.name}
                          placeholder="Enter last name"
                        />
                        <FormErrorMessage field={field} />
                      </div>
                    );
                  }}
                </form.Field>
              </div>
              <div className="relative flex min-h-[70px] flex-col items-start">
                <form.Field name="DOB">
                  {(field) => {
                    return (
                      <div className="flex w-full flex-col gap-2">
                        <Popover>
                          <PopoverTrigger
                            render={
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !field.state.value && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.state.value ? (
                                  format(new Date(field.state.value), "PPP")
                                ) : (
                                  <span>Pick date of birth</span>
                                )}
                              </Button>
                            }
                          ></PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              captionLayout="dropdown"
                              fromYear={1900}
                              toYear={new Date().getFullYear()}
                              selected={
                                field.state.value
                                  ? new Date(field.state.value)
                                  : undefined
                              }
                              onSelect={(date) =>
                                field.handleChange(
                                  date ? date.toISOString() : "",
                                )
                              }
                              initialFocus
                            />
                          </PopoverContent>{" "}
                        </Popover>
                        <FormErrorMessage field={field} />
                      </div>
                    );
                  }}
                </form.Field>
              </div>
              <div className="relative flex min-h-[70px] flex-col items-start">
                <form.Field name="currentDate">
                  {(field) => {
                    return (
                      <div className="flex w-full flex-col gap-2">
                        <Popover>
                          <PopoverTrigger
                            render={
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !field.state.value && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.state.value ? (
                                  format(new Date(field.state.value), "PPP")
                                ) : (
                                  <span>Pick certificate date</span>
                                )}
                              </Button>
                            }
                          ></PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              captionLayout="dropdown"
                              fromYear={1900}
                              toYear={new Date().getFullYear() + 10}
                              selected={
                                field.state.value
                                  ? new Date(field.state.value)
                                  : undefined
                              }
                              onSelect={(date) =>
                                field.handleChange(
                                  date ? date.toISOString() : "",
                                )
                              }
                              initialFocus
                            />
                          </PopoverContent>{" "}
                        </Popover>
                        <FormErrorMessage field={field} />
                      </div>
                    );
                  }}
                </form.Field>
              </div>
              <div className="relative flex min-h-[70px] flex-col items-start">
                <form.Field name="position">
                  {(field) => {
                    return (
                      <div className="w-full">
                        <Input
                          className="w-full rounded-xs border border-gray-300"
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          value={field.state.value}
                          name={field.name}
                          id={field.name}
                          placeholder="Enter position"
                        />
                        <FormErrorMessage field={field} />
                      </div>
                    );
                  }}
                </form.Field>
              </div>
              <div className="relative flex min-h-[70px] flex-col items-start">
                <form.Field name="location">
                  {(field) => {
                    return (
                      <div className="w-full">
                        <Input
                          className="w-full rounded-xs border border-gray-300"
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          value={field.state.value}
                          name={field.name}
                          id={field.name}
                          placeholder="Enter the Location"
                        />
                        <FormErrorMessage field={field} />
                      </div>
                    );
                  }}
                </form.Field>
              </div>
              <div className="relative flex min-h-[70px] flex-col items-start">
                <form.Field name="fitWithRestrictions">
                  {(field) => {
                    return (
                      <div className="w-full">
                        <Input
                          className="w-full rounded-xs border border-gray-300"
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          value={field.state.value}
                          name={field.name}
                          id={field.name}
                          placeholder="Fit with restrictions"
                        />
                        <FormErrorMessage field={field} />
                      </div>
                    );
                  }}
                </form.Field>
              </div>
              <div className="relative flex min-h-[70px] flex-col items-start">
                <form.Field name="forx">
                  {(field) => {
                    return (
                      <div className="w-full">
                        <Input
                          className="w-full rounded-xs border border-gray-300"
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          value={field.state.value}
                          name={field.name}
                          id={field.name}
                          placeholder="Fit with restrictions for"
                        />
                        <FormErrorMessage field={field} />
                      </div>
                    );
                  }}
                </form.Field>
              </div>
              <div className="relative flex min-h-[70px] flex-col items-start">
                <form.Field name="unfit">
                  {(field) => {
                    return (
                      <div className="w-full">
                        <Input
                          className="w-full rounded-xs border border-gray-300"
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          value={field.state.value}
                          name={field.name}
                          id={field.name}
                          placeholder="Temporarily unfit to work for"
                        />
                        <FormErrorMessage field={field} />
                      </div>
                    );
                  }}
                </form.Field>
              </div>
            </div>
            <div>
              <form.Field name="sigKey">
                {(field) => {
                  return (
                    <div>
                      <Select
                        value={field.state.value}
                        id={field.name}
                        onValueChange={(e) => field.handleChange(String(e))}
                        items={sigMap}
                      >
                        <SelectTrigger className="w-full border border-black">
                          <SelectValue placeholder="Select Dr Signature" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {sigMap.map((item) => (
                              <SelectItem key={item.id} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      <FormErrorMessage field={field} />
                    </div>
                  );
                }}
              </form.Field>
            </div>

            <div className="flex flex-row items-center gap-2 pt-2">
              <form.Field name="periodicalCheck">
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
              <Label> Periodical Annual Medical Check (AMC)</Label>
            </div>
            <div className="flex flex-row items-center gap-2">
              <form.Field name="prolongedMedicalCheck">
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
              <Label>
                Medical Check after prolonged sickness absence (≥ 4 weeks)
              </Label>
            </div>
            <div className="flex flex-row items-center gap-2">
              <form.Field name="fitForAssignedTask">
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
              <Label>Fit for the assigned work/tasks and location</Label>
            </div>
            <div className="flex flex-row items-center gap-2">
              <form.Field name="fitForAssignedTask">
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
              <Label>Unfit for the assigned work / tasks and location</Label>
            </div>

            <div>
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <Button
                    className="cursor-pointer"
                    disabled={!canSubmit || mutation.isPending}
                    type="submit"
                  >
                    <p>
                      {mutation.isPending || isSubmitting ? (
                        <LoaderIcon className="animate-spin" />
                      ) : (
                        "Generate"
                      )}
                    </p>
                  </Button>
                )}
              </form.Subscribe>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
