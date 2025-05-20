import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../utils/supabaseClient';

export interface Incident {
  id: string;
  user_id: string;
  title: string;
  description: string;
  incident_date: string;
  location: string;
  status: string;
  image_url?: string;
  created_at: string;
}

export function useIncidents() {
  const [incidents, setIncidents] = useState<Incident[]>([]);

  const resolveImageUrl = (imagePath: string): string => {
    const { data } = supabase.storage.from('incident-images').getPublicUrl(imagePath);
    return data?.publicUrl || imagePath;
  };

  const fetchIncidents = useCallback(async () => {
    const { data, error } = await supabase
      .from('incidents')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Fetch incidents error:', error);
      return;
    }

    const incidentsWithUrls = data.map((incident) => ({
      ...incident,
      image_url: incident.image_url && !incident.image_url.startsWith('http')
        ? resolveImageUrl(incident.image_url)
        : incident.image_url,
    }));

    setIncidents(incidentsWithUrls);
  }, []);

  useEffect(() => {
    fetchIncidents();

    const channel = supabase
      .channel('realtime:public:incidents')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'incidents' },
        (payload) => {
          const newIncident = payload.new;
          if (newIncident.image_url && !newIncident.image_url.startsWith('http')) {
            newIncident.image_url = resolveImageUrl(newIncident.image_url);
          }
          setIncidents((prev) => [newIncident as Incident, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchIncidents]);

  return { incidents, fetchIncidents };
}
