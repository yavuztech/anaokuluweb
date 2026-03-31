import { useId, useState } from 'react';
import { uploadImageToCloudinary } from '../../lib/cloudinary';
import styled from 'styled-components';

const Root = styled.div.attrs({ className: 'image-upload-field' })``;
const FieldLabel = styled.label``;
const TextInput = styled.input``;
const Actions = styled.div.attrs({ className: 'image-upload-field__actions' })``;
const PickerLabel = styled.label.attrs({ className: 'secondary-button image-upload-field__picker' })``;
const FileInput = styled.input``;
const ErrorBanner = styled.div.attrs({ className: 'status-banner status-banner--danger' })``;
const Preview = styled.div.attrs({ className: 'image-upload-field__preview' })``;
const PreviewImage = styled.img.attrs({ className: 'admin-item-card__thumb' })``;

type ImageUploadFieldProps = {
  label: string;
  value: string;
  onChange: (nextValue: string) => void;
};

export function ImageUploadField({ label, value, onChange }: ImageUploadFieldProps) {
  const inputId = useId();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const uploadedUrl = await uploadImageToCloudinary(file);
      onChange(uploadedUrl);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'Gorsel yuklenemedi.');
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  };

  return (
    <Root>
      <FieldLabel>
        {label}
        <TextInput value={value} onChange={(event) => onChange(event.target.value)} placeholder="https://..." />
      </FieldLabel>
      <Actions>
        <PickerLabel htmlFor={inputId}>
          {isUploading ? 'Cloudinary yukleniyor...' : 'Cloudinary ile gorsel sec'}
        </PickerLabel>
        <FileInput id={inputId} type="file" accept="image/*" onChange={handleFileChange} hidden />
      </Actions>
      {error && <ErrorBanner>{error}</ErrorBanner>}
      {value && (
        <Preview>
          <PreviewImage src={value} alt="Yuklenen gorsel onizlemesi" />
        </Preview>
      )}
    </Root>
  );
}