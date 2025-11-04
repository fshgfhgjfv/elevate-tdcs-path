// Filename: DashboardLeaderboard.tsx
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  Search,
  Trophy,
  Medal,
  Award,
  ArrowUp,
  ArrowDown,
  Loader2,
  AlertTriangle,
} from "lucide-react";

// The Student interface remains the same
interface Student {
  rank: number;
  username: string;
  country: string;
  scorePoints: number;
}

// Props for the new component, including a way to highlight the current user
interface DashboardLeaderboardProps {
  currentUsername?: string;
}

// MOCK_DATA: In a real app, this data would come from your API
// We add more data to make pagination and sorting more meaningful
const MOCK_LEADERBOARD_DATA: Student[] = [
  { rank: 1, username: "Manish Pande", country: "India", scorePoints: 25 },
  { rank: 2, username: "Sebastian Ofuccio", country: "Italy", scorePoints: 17 },
  { rank: 3, username: "GemAi", country: "USA", scorePoints: 10 },
  { rank: 4, username: "TECHhelp_4U", country: "India", scorePoints: 9 },
  { rank: 5, username: "Priti Singh", country: "India", scorePoints: 7 },
  { rank: 6, username: "Alex Johnson", country: "UK", scorePoints: 6 },
  { rank: 7, username: "Maria Garcia", country: "Spain", scorePoints: 5 },
  { rank: 8, username: "Chen Wei", country: "China", scorePoints: 4 },
  { rank: 9, username: "Sarah Ahmed", country: "Egypt", scorePoints: 3 },
  { rank: 10, username: "John Smith", country: "Canada", scorePoints: 2 },
  { rank: 11, username: "Yuki Tanaka", country: "Japan", scorePoints: 2 },
  { rank: 12, username: "Fatima Al-Fassi", country: "Morocco", scorePoints: 2 },
  { rank: 13, username: "Liam Murphy", country: "Ireland", scorePoints: 1 },
  { rank: 14, username: "Ana Silva", country: "Brazil", scorePoints: 1 },
  { rank: 15, username: "David Kim", country: "South Korea", scorePoints: 1 },
];

// Helper to get the top 3 icons
const getRankIcon = (rank: number) => {
  if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
  if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
  if (rank === 3) return <Award className="w-5 h-5 text-amber-600" />;
  return <span className="text-muted-foreground">#{rank}</span>;
};

// Type for our sorting state
type SortConfig = {
  key: keyof Student;
  direction: "asc" | "desc";
};

const ITEMS_PER_PAGE = 5;

const DashboardLeaderboard = ({
  currentUsername = "Sarah Ahmed", // Example: Highlight "Sarah Ahmed" by default
}: DashboardLeaderboardProps) => {
  // --- State Management ---
  const [data, setData] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "rank",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);

  // --- Data Fetching Effect ---
  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      setError(null);

      // Simulate API call delay
      setTimeout(() => {
        try {
          // In a real app:
          // const response = await fetch('/api/leaderboard');
          // const result = await response.json();
          // setData(result.data);

          // For demo:
          setData(MOCK_LEADERBOARD_DATA);
          setIsLoading(false);
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : "An unknown error occurred";
          setError(`Failed to fetch leaderboard data: ${errorMessage}`);
          setIsLoading(false);
        }
      }, 1500); // 1.5 second delay
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  // --- Memoized Data Processing ---

  // 1. Get Top 3 (unaffected by sorting/filtering)
  const topThree = useMemo(() => {
    return [...data]
      .sort((a, b) => a.rank - b.rank)
      .slice(0, 3);
  }, [data]);

  // 2. Sort data
  const sortedData = useMemo(() => {
    const sortableData = [...data];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  // 3. Filter data
  const filteredData = useMemo(() => {
    return sortedData.filter(
      (student) =>
        student.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.country.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [sortedData, searchQuery]);

  // 4. Paginate data
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage]);

  // --- Event Handlers ---

  // Handle changing the sort column
  const requestSort = (key: keyof Student) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    setCurrentPage(1); // Reset to page 1 on sort
  };

  // Handle search input, reset to page 1
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // --- Render Helper Components ---

  // A single skeleton row for the table
  const SkeletonRow = () => (
    <TableRow>
      <TableCell className="w-20">
        <Skeleton className="h-5 w-10" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-32" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-24" />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="h-5 w-16 ml-auto" />
      </TableCell>
    </TableRow>
  );

  // A single skeleton card for the Top 3
  const SkeletonTopCard = () => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-6 w-6" />
        <Skeleton className="h-6 w-12" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-6 w-32 mb-1" />
        <Skeleton className="h-4 w-20" />
      </CardContent>
    </Card>
  );

  // Helper for rendering sortable table headers
  const SortableTableHead = ({
    columnKey,
    title,
    className = "",
  }: {
    columnKey: keyof Student;
    title: string;
    className?: string;
  }) => (
    <TableHead className={className}>
      <Button
        variant="ghost"
        onClick={() => requestSort(columnKey)}
        className="px-0 py-0 h-auto hover:bg-transparent"
      >
        {title}
        {sortConfig.key === columnKey && (
          <span className="ml-1">
            {sortConfig.direction === "asc" ? (
              <ArrowUp className="w-4 h-4" />
            ) : (
              <ArrowDown className="w-4 h-4" />
            )}
          </span>
        )}
      </Button>
    </TableHead>
  );

  // --- Main Render ---

  if (error) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          Student Leaderboard
        </h1>
        <p className="text-muted-foreground">
          Top performing students based on score points
        </p>
      </motion.div>

      {/* --- Top 3 Showcase --- */}
      <div className="grid gap-4 md:grid-cols-3">
        {isLoading ? (
          <>
            <SkeletonTopCard />
            <SkeletonTopCard />
            <SkeletonTopCard />
          </>
        ) : (
          <AnimatePresence>
            {topThree.map((student, index) => (
              <motion.div
                key={student.rank}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Rank #{student.rank}
                    </CardTitle>
                    {getRankIcon(student.rank)}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{student.username}</div>
                    <p className="text-xs text-muted-foreground">
                      {student.country}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* --- Main Rankings Table --- */}
      <Card>
        <CardHeader>
          <CardTitle>All Rankings</CardTitle>
          <CardDescription>
            Sort by column or search for a specific student or country.
          </CardDescription>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search by name or country..."
              className="pl-10"
              value={searchQuery}
              onChange={handleSearchChange}
              disabled={isLoading} // Disable input while loading
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <SortableTableHead
                    columnKey="rank"
                    title="Rank"
                    className="w-20"
                  />
                  <SortableTableHead columnKey="username" title="Username" />
                  <SortableTableHead columnKey="country" title="Country" />
                  <SortableTableHead
                    columnKey="scorePoints"
                    title="Score Points"
                    className="text-right"
                  />
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  // Show Skeleton Rows while loading
                  <>
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                  </>
                ) : paginatedData.length === 0 ? (
                  // Show No Results message
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center py-8 text-muted-foreground"
                    >
                      {searchQuery
                        ? "No students found matching your search"
                        : "No leaderboard data available"}
                    </TableCell>
                  </TableRow>
                ) : (
                  // Render the actual data
                  paginatedData.map((student) => (
                    <TableRow
                      key={student.rank}
                      className={
                        student.username === currentUsername
                          ? "bg-primary/10 hover:bg-primary/20"
                          : "hover:bg-muted/50"
                      }
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {getRankIcon(student.rank)}
                          {student.rank > 3 && student.rank}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{student.username}</span>
                        {student.username === currentUsername && (
                          <Badge variant="outline" className="ml-2">
                            You
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{student.country}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="secondary" className="font-bold">
                          {student.scorePoints} pts
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* --- Pagination Controls --- */}
          <div className="flex items-center justify-between space-x-2 pt-4">
            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1 || isLoading}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages || isLoading}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardLeaderboard;