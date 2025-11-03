import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Trophy, Medal, Award } from "lucide-react";

interface Student {
  rank: number;
  username: string;
  country: string;
  scorePoints: number;
}

const leaderboardData: Student[] = [
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
];

const DashboardLeaderboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = leaderboardData.filter((student) =>
    student.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Award className="w-5 h-5 text-amber-600" />;
    return <span className="text-muted-foreground">#{rank}</span>;
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500">🥇 1st</Badge>;
    if (rank === 2) return <Badge className="bg-gradient-to-r from-gray-300 to-gray-500">🥈 2nd</Badge>;
    if (rank === 3) return <Badge className="bg-gradient-to-r from-amber-600 to-amber-800">🥉 3rd</Badge>;
    return rank;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2 gradient-text">Student Leaderboard</h1>
        <p className="text-muted-foreground">
          Top performing students based on score points
        </p>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle>Rankings</CardTitle>
          <CardDescription>
            Students are ranked based on their total score points earned from courses and assessments
          </CardDescription>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search by name or country..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">Rank</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead className="text-right">Score Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      No students found matching your search
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((student) => (
                    <TableRow key={student.rank} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {getRankIcon(student.rank)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{student.username}</span>
                          {student.rank <= 3 && getRankBadge(student.rank)}
                        </div>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardLeaderboard;
