import { 
    IonButton,
    IonButtons,
      IonContent, 
      IonHeader,
      IonIcon, 
      IonLabel, 
      IonMenuButton, 
      IonPage,
      IonRouterOutlet, 
      IonTabBar, 
      IonTabButton, 
      IonTabs,  
      IonTitle, 
      IonToolbar 
  } from '@ionic/react';
  import { IonReactRouter } from '@ionic/react-router';
  import { bookOutline, search, star } from 'ionicons/icons';
  import { Route, Redirect } from 'react-router';


  import Report_Incident from './home-tabs/Report_Incident';
import Incident_Logs from './home-tabs/Incident_Logs';
  
  
  const Home: React.FC = () => {
     
    const tabs = [
      {name:'Report_Incident', tab:'Report_Incident',url: '/it35-lab/app/home/Report_Incident', icon: bookOutline},
      {name:'Incident_Logs', tab:'Incident_Logs',url: '/it35-lab/app/home/Incident_Logs', icon: star},
      
    ]
    return (
      <IonReactRouter>
        <IonTabs>
          <IonTabBar slot="bottom">
            {tabs.map((item, index) => (
              <IonTabButton key={index} tab={item.tab} href={item.url}>
                <IonIcon icon={item.icon} />
                <IonLabel>{item.name}</IonLabel>
              </IonTabButton>
            ))}
            
          </IonTabBar>
        <IonRouterOutlet>
          <Route exact path="/it35-lab/app/home/Report_Incident" render={Report_Incident} />
          <Route exact path="/it35-lab/app/home/Incident_Logs" render={Incident_Logs} />
          <Route exact path="/it35-lab/app/home">
            <Redirect to="/it35-lab/app/home/Report_Incident" />
          </Route>
        </IonRouterOutlet>
        </IonTabs>
      </IonReactRouter>
    );
  };
  
  export default Home;