import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { dbService } from '@/services/database';

export default function DatabaseTest() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const testContactSubmission = async () => {
    setLoading(true);
    try {
      const result = await dbService.createContact({
        name: 'Test User',
        email: 'test@example.com',
        message: 'This is a test message from the database connection test.'
      });
      setResults(result);
      toast({ title: 'Success', description: 'Contact submitted successfully!' });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const testLeadSubmission = async () => {
    setLoading(true);
    try {
      const result = await dbService.createLead({
        name: 'Test Lead',
        email: 'lead@example.com',
        type: 'Book Demo'
      });
      setResults(result);
      toast({ title: 'Success', description: 'Lead created successfully!' });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const testCourseCreation = async () => {
    setLoading(true);
    try {
      const result = await dbService.createCourse({
        course_name: 'Test Course',
        description: 'A test course to verify database connectivity',
        category: 'Cybersecurity',
        price: 99.99,
        level: 'Beginner',
        duration_weeks: 8
      });
      setResults(result);
      toast({ title: 'Success', description: 'Course created successfully!' });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const testGetCourses = async () => {
    setLoading(true);
    try {
      const result = await dbService.getCourses();
      setResults(result);
      toast({ title: 'Success', description: `Found ${result.length} courses` });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Database Connection Test</CardTitle>
            <CardDescription>
              Test various database operations to verify Supabase connectivity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={testContactSubmission}
                disabled={loading}
                variant="default"
                className="w-full"
              >
                {loading ? 'Testing...' : 'Test Contact Submission'}
              </Button>
              <Button
                onClick={testLeadSubmission}
                disabled={loading}
                variant="default"
                className="w-full"
              >
                {loading ? 'Testing...' : 'Test Lead Creation'}
              </Button>
              <Button
                onClick={testCourseCreation}
                disabled={loading}
                variant="default"
                className="w-full"
              >
                {loading ? 'Testing...' : 'Test Course Creation'}
              </Button>
              <Button
                onClick={testGetCourses}
                disabled={loading}
                variant="default"
                className="w-full"
              >
                {loading ? 'Testing...' : 'Test Get Courses'}
              </Button>
            </div>

            {results && (
              <div className="mt-8 p-4 bg-slate-100 rounded-lg">
                <Label className="text-base font-semibold mb-2 block">Results:</Label>
                <pre className="bg-white p-4 rounded text-xs overflow-auto max-h-96 border border-slate-200">
                  {JSON.stringify(results, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
