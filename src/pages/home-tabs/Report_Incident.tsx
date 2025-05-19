import { 
  IonButtons,
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar 
} from '@ionic/react';
import IncidentReportContainer from '../../components/IncidentReportContainer';

const Report_Incident: React.FC = () => {
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
        <IncidentReportContainer />
      </IonContent>
    </IonPage>
  );
};

export default Report_Incident;
