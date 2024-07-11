import { GithubApi } from "@/api/github-api";
import { GitHubCommit } from "@/api/github-api.types";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export const CommitList = () => {
  const { data } = useQuery<GitHubCommit[]>({
    queryKey: ["commits"],
    queryFn: async () => {
      return await GithubApi.fetchCommits({
        startDate: new Date(
          new Date().setDate(new Date().getDate() - 30)
        ).toISOString(),
        endDate: new Date().toISOString(),
        repo: "facebook/react",
      });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Commits found</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[calc(100vh-14rem)] overflow-y-auto w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Link</TableHead>
              </TableRow>
            </TableHeader>
            {data && data?.length > 0 ? (
              <TableBody>
                {data?.map((commitElement) => (
                  <TableRow key={commitElement?.commit?.tree?.sha}>
                    <TableCell className="font-medium">
                      {new Date(
                        commitElement?.commit?.author?.date
                      ).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{commitElement?.commit?.author?.name}</TableCell>
                    <TableCell>
                      <a target="_blank" href={commitElement?.html_url}>
                        Link
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    No commits found
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
