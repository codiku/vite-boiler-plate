import { CommitList } from "./commits-list/commit-list";
import { SearchCommitsForm } from "./search-commits-form/search-commits-form";

export const Home = () => {
  return (
    <div className="p-8">
      <h1 className="scroll-m-20 mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Commit finder
      </h1>
      <div className="flex flex-wrap justify-center gap-4 lg:flex-nowrap">
        <div className="md:min-w-96 gap">
          <SearchCommitsForm />
        </div>
        <div className="w-full">
          <CommitList />
        </div>
      </div>
    </div>
  );
};