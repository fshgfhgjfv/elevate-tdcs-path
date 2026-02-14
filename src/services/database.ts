import { supabase } from '@/integrations/backend/client';

export const dbService = {
  // Profiles
  async createProfile(userId: string, fullName: string, _role: string = 'student') {
    const { data, error } = await supabase
      .from('profiles')
      .insert({ user_id: userId, full_name: fullName })
      .select()
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async updateProfile(userId: string, updates: { full_name?: string; phone?: string; enrolled_course?: string; enrollment_status?: string }) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  // Courses
  async getCourses() {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getCourse(courseId: string) {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  // Course Access
  async getUserCourseAccess(userId: string) {
    const { data, error } = await supabase
      .from('course_access')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    return data || [];
  },

  async checkCourseAccess(userId: string, courseName: string) {
    const { data, error } = await supabase
      .from('course_access')
      .select('id')
      .eq('user_id', userId)
      .eq('course_name', courseName)
      .maybeSingle();

    if (error) throw error;
    return !!data;
  },

  // Course Recordings
  async getCourseRecordings(courseName: string) {
    const { data, error } = await supabase
      .from('course_recordings')
      .select('*')
      .eq('course_name', courseName)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Leads (Contact, Book Demo, Brochure, Counselor)
  async createLead(lead: {
    name: string;
    email: string;
    phone: string;
    message?: string;
    source?: string;
  }) {
    const { data, error } = await supabase
      .from('leads')
      .insert({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        message: lead.message || null,
        source: lead.source || null,
      })
      .select()
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  // Payment Submissions
  async createPaymentSubmission(submission: {
    user_id: string;
    full_name: string;
    email: string;
    phone: string;
    course_name: string;
    transaction_id: string;
    amount_paid: number;
    screenshot_url?: string;
  }) {
    const { data, error } = await supabase
      .from('payment_submissions')
      .insert(submission)
      .select()
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getUserPaymentSubmissions(userId: string) {
    const { data, error } = await supabase
      .from('payment_submissions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Enrollments
  async getUserEnrollments(userId: string) {
    const { data, error } = await supabase
      .from('enrollments')
      .select('*, courses(*)')
      .eq('user_id', userId)
      .order('enrolled_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Hardware Orders
  async trackOrder(orderNumber: string, email: string) {
    const { data, error } = await supabase
      .rpc('get_order_by_tracking', {
        p_order_number: orderNumber,
        p_email: email,
      });

    if (error) throw error;
    return data || [];
  },
};
