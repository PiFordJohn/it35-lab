import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonImg, IonList } from '@ionic/react';
import { useIncidents } from '../utils/useIncidents';

interface Props {
  refreshKey?: number; // not mandatory, just to re-render when needed
}

const IncidentReportedContainer: React.FC<Props> = () => {
  const { incidents } = useIncidents();

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
              {incident.image_url && <IonImg src={incident.image_url} alt="Incident" />}
            </IonCardContent>
          </IonCard>
        ))}
      </IonList>
    </div>
  );
};

export default IncidentReportedContainer;
