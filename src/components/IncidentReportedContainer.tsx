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
    } else {
      setIncidents(data as Incident[]);
    }
  };

  useEffect(() => {
    fetchIncidents();
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
              {incident.image_url && <IonImg src={incident.image_url} />}
            </IonCardContent>
          </IonCard>
        ))}
      </IonList>
    </div>
  );
};

export default IncidentReportedContainer;
