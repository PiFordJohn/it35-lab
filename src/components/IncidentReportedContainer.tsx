import React, { useState } from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonImg,
  IonList,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
} from '@ionic/react';
import { useIncidents } from '../utils/useIncidents';

interface Props {
  refreshKey?: number; // optional
}

const IncidentReportedContainer: React.FC<Props> = () => {
  const { incidents, fetchIncidents } = useIncidents(); // get fetchIncidents for manual refresh
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    setRefreshing(true);
    await fetchIncidents();
    setRefreshing(false);
    event.detail.complete(); // notify refresher that refresh is done
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>All Reported Incidents</h2>

      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
        <IonRefresherContent
          pullingIcon="arrow-down"
          refreshingSpinner="circles"
          pullingText="Pull to refresh"
          refreshingText="Refreshing..."
        />
      </IonRefresher>

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
