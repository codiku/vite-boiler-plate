import { FetchCommitsBody, GitHubCommit } from "./github-api.types";
import axios, { AxiosError } from "axios";

export class GithubApi {
  static async fetchCommits(body: FetchCommitsBody): Promise<GitHubCommit[]> {
    const response = await axios.get(
      `https://api.github.com/repos/${body.repo}/commits`,
      {
        params: {
          since: body.startDate,
          until: body.endDate,
        },
      }
    );
    return response.data;
  }
}
