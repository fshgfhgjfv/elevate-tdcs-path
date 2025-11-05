import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { LogOut, Plus, Edit, Trash2, Upload, Eye, Users, BookOpen, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  content_url: string | null;
  thumbnail_url: string | null;
  price: number | null;
  published: boolean;
  created_at: string;
  created_by: string;
}

interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  enrolled_at: string;
  completed: boolean;
  progress: number;
  courses: {
    title: string;
  } | null;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [uploading, setUploading] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [contentUrl, setContentUrl] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [published, setPublished] = useState(false);

  useEffect(() => {
    checkAdminAndFetchData();
  }, []);

  const checkAdminAndFetchData = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/abcadmin');
        return;
      }

      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (!roles) {
        toast.error('Access denied');
        navigate('/abcadmin');
        return;
      }

      await fetchCourses();
      await fetchEnrollments();
    } catch (error) {
      console.error('Auth check error:', error);
      navigate('/abcadmin');
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to load courses');
      console.error(error);
    } else {
      setCourses(data || []);
    }
  };

  const fetchEnrollments = async () => {
    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        *,
        courses (title)
      `)
      .order('enrolled_at', { ascending: false });

    if (error) {
      toast.error('Failed to load enrollments');
      console.error(error);
    } else {
      setEnrollments(data || []);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Logged out successfully');
    navigate('/abcadmin');
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPrice('');
    setContentUrl('');
    setThumbnailFile(null);
    setPublished(false);
    setEditingCourse(null);
  };

  const openEditModal = (course: Course) => {
    setEditingCourse(course);
    setTitle(course.title);
    setDescription(course.description || '');
    setPrice(course.price?.toString() || '');
    setContentUrl(course.content_url || '');
    setPublished(course.published);
    setShowCourseModal(true);
  };

  const handleSubmitCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      let thumbnailUrl = editingCourse?.thumbnail_url || null;

      // Upload thumbnail if provided
      if (thumbnailFile) {
        const fileExt = thumbnailFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('course-materials')
          .upload(filePath, thumbnailFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('course-materials')
          .getPublicUrl(filePath);

        thumbnailUrl = publicUrl;
      }

      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      
      const courseData = {
        title,
        slug,
        description,
        content_url: contentUrl || null,
        thumbnail_url: thumbnailUrl,
        price: price ? parseFloat(price) : null,
        published,
        created_by: session.user.id,
      };

      if (editingCourse) {
        const { error } = await supabase
          .from('courses')
          .update(courseData)
          .eq('id', editingCourse.id);

        if (error) throw error;
        toast.success('Course updated successfully');
      } else {
        const { error } = await supabase
          .from('courses')
          .insert([courseData]);

        if (error) throw error;
        toast.success('Course created successfully');
      }

      await fetchCourses();
      setShowCourseModal(false);
      resetForm();
    } catch (error: any) {
      console.error('Error saving course:', error);
      toast.error(error.message || 'Failed to save course');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', courseId);

      if (error) throw error;
      toast.success('Course deleted successfully');
      await fetchCourses();
    } catch (error: any) {
      console.error('Error deleting course:', error);
      toast.error(error.message || 'Failed to delete course');
    }
  };

  const togglePublish = async (course: Course) => {
    try {
      const { error } = await supabase
        .from('courses')
        .update({ published: !course.published })
        .eq('id', course.id);

      if (error) throw error;
      toast.success(course.published ? 'Course unpublished' : 'Course published');
      await fetchCourses();
    } catch (error: any) {
      console.error('Error toggling publish:', error);
      toast.error(error.message || 'Failed to update course');
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const stats = {
    totalCourses: courses.length,
    publishedCourses: courses.filter(c => c.published).length,
    totalEnrollments: enrollments.length,
    activeStudents: new Set(enrollments.map(e => e.user_id)).size,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCourses}</div>
              <p className="text-xs text-muted-foreground">
                {stats.publishedCourses} published
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEnrollments}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeStudents}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published Courses</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.publishedCourses}</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Courses Section */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Courses</CardTitle>
                <CardDescription>Manage your course catalog</CardDescription>
              </div>
              <Dialog open={showCourseModal} onOpenChange={(open) => {
                setShowCourseModal(open);
                if (!open) resetForm();
              }}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Course
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingCourse ? 'Edit Course' : 'Create New Course'}</DialogTitle>
                    <DialogDescription>
                      {editingCourse ? 'Update course details' : 'Add a new course to your catalog'}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmitCourse} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Course Title *</Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g., Cyber Master Pro"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Course description..."
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price">Price (₹)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="0.00"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contentUrl">Content URL</Label>
                      <Input
                        id="contentUrl"
                        value={contentUrl}
                        onChange={(e) => setContentUrl(e.target.value)}
                        placeholder="https://..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="thumbnail">Thumbnail Image</Label>
                      <Input
                        id="thumbnail"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="published"
                        checked={published}
                        onCheckedChange={setPublished}
                      />
                      <Label htmlFor="published">Publish course</Label>
                    </div>

                    <Button type="submit" disabled={uploading} className="w-full">
                      {uploading ? 'Saving...' : editingCourse ? 'Update Course' : 'Create Course'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      No courses yet. Create your first course!
                    </TableCell>
                  </TableRow>
                ) : (
                  courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.title}</TableCell>
                      <TableCell>₹{course.price || 'Free'}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          course.published 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                        }`}>
                          {course.published ? 'Published' : 'Draft'}
                        </span>
                      </TableCell>
                      <TableCell>{new Date(course.created_at).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => togglePublish(course)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEditModal(course)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteCourse(course.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Enrollments Section */}
        <Card>
          <CardHeader>
            <CardTitle>Student Enrollments</CardTitle>
            <CardDescription>View all student course enrollments</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Enrolled</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enrollments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      No enrollments yet
                    </TableCell>
                  </TableRow>
                ) : (
                  enrollments.map((enrollment) => (
                    <TableRow key={enrollment.id}>
                      <TableCell>{enrollment.user_id.substring(0, 8)}...</TableCell>
                      <TableCell>{enrollment.courses?.title || 'N/A'}</TableCell>
                      <TableCell>{enrollment.progress}%</TableCell>
                      <TableCell>{new Date(enrollment.enrolled_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          enrollment.completed 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        }`}>
                          {enrollment.completed ? 'Completed' : 'In Progress'}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
