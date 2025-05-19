import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';  
import { 
  IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonInput, IonItem, IonLabel, IonList, IonTextarea, IonDatetime,
  IonImg
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

const IncidentReportContainer: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [incidentDate, setIncidentDate] = useState('');
  const [location, setLocation] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).slice(2)}.${fileExt}`;
    const filePath = `incidents/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('incident-images')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from('incident-images').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async () => {
    setUploading(true);
    let imageUrl = null;
    if (imageFile) {
      try {
        imageUrl = await uploadImage(imageFile);
      } catch (e) {
        alert('Image upload failed: ' + e);
        setUploading(false);
        return;
      }
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();
    const user = userData?.user;
    if (!user) {
      alert('You must be logged in to report incidents.');
      setUploading(false);
      return;
    }

    const { data, error } = await supabase.from('incidents').insert([
      {
        user_id: user.id,
        title,
        description,
        incident_date: incidentDate,
        location,
        status: 'Open',
        image_url: imageUrl,
      },
    ]);

    if (error) {
      alert('Failed to submit incident: ' + error.message);
    } else {
      alert('Incident reported successfully!');
      // Reset form
      setTitle('');
      setDescription('');
      setIncidentDate('');
      setLocation('');
      setImageFile(null);
    }
    setUploading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Report New Incident</h2>
      <IonItem>
        <IonLabel position="floating">Title</IonLabel>
        <IonInput value={title} onIonChange={e => setTitle(e.detail.value!)} />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Description</IonLabel>
        <IonTextarea value={description} onIonChange={e => setDescription(e.detail.value!)} />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Incident Date</IonLabel>
        <IonDatetime
          value={incidentDate}
          onIonChange={e => {
            const value = e.detail.value;
            if (typeof value === 'string') {
              setIncidentDate(value);
            }
          }}
        />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Location</IonLabel>
        <IonInput value={location} onIonChange={e => setLocation(e.detail.value!)} />
      </IonItem>
      <IonItem>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </IonItem>
      <IonButton expand="block" onClick={handleSubmit} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Submit Incident'}
      </IonButton>
    </div>
  );
};

export default IncidentReportContainer;
