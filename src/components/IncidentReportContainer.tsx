import React, { useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { supabase } from '../utils/supabaseClient';
import {
  IonButton, IonItem, IonLabel, IonInput, IonTextarea,
  IonDatetime, IonImg
} from '@ionic/react';

const IncidentReportContainer: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [incidentDate, setIncidentDate] = useState('');
  const [location, setLocation] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const takePhoto = async () => {
    const image = await Camera.getPhoto({
      quality: 80,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });

    const response = await fetch(image.dataUrl!);
    const blob = await response.blob();
    const file = new File([blob], `photo_${Date.now()}.jpeg`, { type: 'image/jpeg' });

    setImageFile(file);
    setPreview(image.dataUrl!);
  };

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).slice(2)}.${fileExt}`;
    const filePath = `incidents/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('incident-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    return filePath;
  };

  const handleSubmit = async () => {
    setUploading(true);
    let imagePath = null;

    if (imageFile) {
      try {
        imagePath = await uploadImage(imageFile);
      } catch (e) {
        alert('Image upload failed: ' + e);
        setUploading(false);
        return;
      }
    }

    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;

    if (!user) {
      alert('You must be logged in to report incidents.');
      setUploading(false);
      return;
    }

    const { data: insertedIncident, error } = await supabase.from('incidents').insert([{
      user_id: user.id,
      title,
      description,
      incident_date: incidentDate,
      location,
      status: 'Open',
      image_url: imagePath,
    }]).select().single();

    if (error) {
      alert('Failed to submit incident: ' + error.message);
    } else {
      alert('Incident reported successfully!');
      await supabase.from('incident_report_logs').insert([{
        incident_id: insertedIncident.id,
        user_id: user.id,
        action: 'Created',
      }]);

      // Reset form
      setTitle('');
      setDescription('');
      setIncidentDate('');
      setLocation('');
      setImageFile(null);
      setPreview(null);
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

      <IonItem lines="none">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <IonButton onClick={takePhoto} expand="block">Take Photo</IonButton>
      </IonItem>

      {preview && (
        <IonImg src={preview} alt="Image Preview" style={{ margin: '20px 0' }} />
      )}

      <IonButton expand="block" onClick={handleSubmit} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Submit Incident'}
      </IonButton>
    </div>
  );
};

export default IncidentReportContainer;
