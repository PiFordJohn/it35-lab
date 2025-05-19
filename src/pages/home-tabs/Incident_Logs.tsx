import { 
  IonButtons,
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar 
} from '@ionic/react';
import IncidentReportedContainer from '../../components/IncidentReportedContainer';

const Incident_Logs: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Incident Reports</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IncidentReportedContainer />
      </IonContent>
    </IonPage>
  );
};

export default Incident_Logs;
