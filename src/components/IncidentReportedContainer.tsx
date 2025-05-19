// IncidentReportedContainer.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import {
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonImg, IonList
} from '@ionic/react';

interface Incident {
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

const IncidentReportedContainer: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);

  const fetchIncidents = async () => {
    const { data, error } = await supabase
      .from('incidents')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching incidents:', error);
      return;
    }

    const updated = data.map((incident) => {
      if (incident.image_url && !incident.image_url.startsWith('http')) {
        const { data: { publicUrl } } = supabase
          .storage
          .from('incident-images')
          .getPublicUrl(incident.image_url);
        return { ...incident, image_url: publicUrl };
      }
      return incident;
    });

    setIncidents(updated as Incident[]);
  };

  useEffect(() => {
    fetchIncidents();

    const channel = supabase
      .channel('realtime-incidents')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'incidents',
      }, payload => {
        const newIncident = payload.new;

        // Convert image_url to public URL if needed
        if (newIncident.image_url && !newIncident.image_url.startsWith('http')) {
          const { data: { publicUrl } } = supabase
            .storage
            .from('incident-images')
            .getPublicUrl(newIncident.image_url);
          newIncident.image_url = publicUrl;
        }

        setIncidents(prev => [newIncident as Incident, ...prev]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>All Reported Incidents</h2>
      <IonList>
        {incidents.map((incident) => (
          <IonCard key={incident.id}>
            <IonCardHeader>
              <IonCardTitle>{incident.title}</IonCardTitle>
              <small>Reported by: {incident.user_id}</small>
            </IonCardHeader>
            <IonCardContent>
              <p>{incident.description}</p>
              <p><strong>Date:</strong> {new Date(incident.incident_date).toLocaleDateString()}</p>
              <p><strong>Location:</strong> {incident.location}</p>
              <p><strong>Status:</strong> {incident.status}</p>
              {incident.image_url && (
                <IonImg src={incident.image_url} alt="Incident Image" />
              )}
            </IonCardContent>
          </IonCard>
        ))}
      </IonList>
    </div>
  );
};

export default IncidentReportedContainer;
