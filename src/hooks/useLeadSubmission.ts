import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface LeadData {
  name: string;
  email: string;
  phone: string;
  message?: string;
  source: string;
}

export const useLeadSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const submitLead = async (leadData: LeadData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('leads')
        .insert([leadData]);

      if (error) throw error;

      toast({
        title: 'Success!',
        description: 'Your request has been submitted. We will contact you shortly.',
      });

      return { success: true, error: null };
    } catch (error: any) {
      console.error('Error submitting lead:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit your request. Please try again.',
        variant: 'destructive',
      });
      return { success: false, error };
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitLead, isSubmitting };
};
