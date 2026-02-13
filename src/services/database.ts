import { supabase } from '@/integrations/supabase/client';

export const dbService = {
  // Profiles
  async createProfile(userId: string, name: string, role: string = 'student') {
    const { data, error } = await supabase
      .from('profiles')
      .insert({ id: userId, name, role })
      .select()
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async updateProfile(userId: string, updates: { name?: string; role?: string }) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  // Courses
  async createCourse(course: {
    course_name: string;
    description?: string;
    category?: string;
    price?: number;
    level?: string;
    duration_weeks?: number;
  }) {
    const { data, error } = await supabase
      .from('courses')
      .insert([course])
      .select()
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getCourses() {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
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

  async updateCourse(courseId: string, updates: Partial<{
    course_name: string;
    description: string;
    category: string;
    price: number;
    level: string;
    duration_weeks: number;
  }>) {
    const { data, error } = await supabase
      .from('courses')
      .update(updates)
      .eq('id', courseId)
      .select()
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  // Purchases
  async createPurchase(userId: string, courseId: string) {
    const { data, error } = await supabase
      .from('purchases')
      .insert([{ user_id: userId, course_id: courseId }])
      .select()
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getUserPurchases(userId: string) {
    const { data, error } = await supabase
      .from('purchases')
      .select('id, course_id, courses(id, course_name, description, price)')
      .eq('user_id', userId)
      .order('purchased_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async checkPurchase(userId: string, courseId: string) {
    const { data, error } = await supabase
      .from('purchases')
      .select('id')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .maybeSingle();

    if (error) throw error;
    return !!data;
  },

  // Course Recordings
  async createRecording(recording: {
    course_id: string;
    title: string;
    recording_url: string;
    duration_minutes?: number;
  }) {
    const { data, error } = await supabase
      .from('course_recordings')
      .insert([recording])
      .select()
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getCourseRecordings(courseId: string) {
    const { data, error } = await supabase
      .from('course_recordings')
      .select('*')
      .eq('course_id', courseId)
      .order('uploaded_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Video Progress
  async updateVideoProgress(userId: string, recordingId: string, progressData: {
    progress_percent?: number;
    completed?: boolean;
  }) {
    const { data: existing } = await supabase
      .from('video_progress')
      .select('id')
      .eq('user_id', userId)
      .eq('recording_id', recordingId)
      .maybeSingle();

    if (existing) {
      const { data, error } = await supabase
        .from('video_progress')
        .update(progressData)
        .eq('user_id', userId)
        .eq('recording_id', recordingId)
        .select()
        .maybeSingle();

      if (error) throw error;
      return data;
    } else {
      const { data, error } = await supabase
        .from('video_progress')
        .insert([{ user_id: userId, recording_id: recordingId, ...progressData }])
        .select()
        .maybeSingle();

      if (error) throw error;
      return data;
    }
  },

  async getVideoProgress(userId: string, recordingId: string) {
    const { data, error } = await supabase
      .from('video_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('recording_id', recordingId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  // Contact
  async createContact(contact: {
    name: string;
    email: string;
    message: string;
  }) {
    const { data, error } = await supabase
      .from('contact')
      .insert([contact])
      .select()
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  // Leads
  async createLead(lead: {
    name: string;
    email: string;
    type: 'Book Demo' | 'Download Brochure' | 'Shipping Info';
  }) {
    const { data, error } = await supabase
      .from('leads')
      .insert([lead])
      .select()
      .maybeSingle();

    if (error) throw error;
    return data;
  },
};
