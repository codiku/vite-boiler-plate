import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  searchCommitsFormSchema,
  SearchCommitsFormSchema,
} from "./search-commits-forms.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GithubApi } from "@/api/github-api";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export const SearchCommitsForm = () => {
  const form = useForm<SearchCommitsFormSchema>({
    defaultValues: {
      startDate: new Date(new Date().setDate(new Date().getDate() - 30))
        .toISOString()
        .split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
      repo: "facebook/react",
    },
    resolver: zodResolver(searchCommitsFormSchema),
    mode: "onChange",
  });
  const { isFetching, refetch: fetchCommits } = useQuery({
    queryKey: ["commits"],
    queryFn: () => GithubApi.fetchCommits(form.getValues()),
    enabled: false,
  });

  const submit = async () => {
    fetchCommits();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Search commits</CardTitle>
        <CardDescription>
          Find commits for a given repository between a date range
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submit)}
            className="flex flex-col gap-4 "
          >
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...form.register("startDate")}
                      className="!block"
                    />
                  </FormControl>
                  {form.formState.errors.startDate && (
                    <FormMessage>
                      {form.formState.errors.startDate.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...form.register("endDate")}
                      className="!block"
                    />
                  </FormControl>
                  {form.formState.errors.endDate && (
                    <FormMessage>
                      {form.formState.errors.endDate.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="repo"
              render={() => (
                <FormItem>
                  <FormLabel>Repositories</FormLabel>
                  <FormControl>
                    <Input
                      {...form.register("repo")}
                      placeholder="Type the repository name, ex : facebook/react"
                    />
                  </FormControl>
                  {form.formState.errors.repo && (
                    <FormMessage>
                      {form.formState.errors.repo.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isFetching || !form.formState.isValid}
            >
              Submit{" "}
              {isFetching && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
