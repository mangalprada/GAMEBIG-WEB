import { useCallback, useEffect, useState, ChangeEvent, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import LoadingLottie from '../Loaders/Dots';
import { useAuth } from '@/context/authContext';
import ProfileAvatar from './ProfileAvatar';
import firebase, { storage } from 'firebase/firebaseClient';
import Modal from '../Modal/Modal';
import FixedButton from '../Buttons/FixedButton';
import TextButton from '../Buttons/TextButton';

type Props = { onUpload?: (url: string) => void };

const EditAvatar = ({ onUpload }: Props) => {
  const { userData } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [src, setSrc] = useState<any>('');
  const imgRef = useRef<any>(null);
  const previewCanvasRef = useRef<any>(null);
  const [crop, setCrop] = useState<any>({
    unit: '%',
    width: 30,
    aspect: 1 / 1,
  });
  const [completedCrop, setCompletedCrop] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const { setUserData } = useAuth();

  const onSelectFile = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setSrc(reader.result));
      reader.readAsDataURL(target.files[0]);
      setIsModalOpen(true);
    }
  };

  const uploadPicture = (file: Blob) => {
    try {
      const uploadTask = storage
        .ref(`/users/profilePic/${userData.uid}`)
        .put(file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(Math.ceil(progress));
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED:
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING:
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          console.log(error, 'error uploading image');
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            setUserData({ ...userData, photoURL: downloadURL });
            if (onUpload) onUpload(downloadURL);
            setLoading(false);
          });
        }
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleUploadClick = () => {
    if (!previewCanvasRef.current || !completedCrop) {
      return;
    }
    setLoading(true);
    let file = null;
    previewCanvasRef.current.toBlob((blob: any) => {
      file = new File([blob], 'fileName.jpg', { type: 'image/jpeg' });
      uploadPicture(file);
    }, 'image/png');
    closeModal();
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);

  return (
    <div className="flex flex-col items-center">
      <div>
        <ProfileAvatar photoURL={userData.photoURL} />
        <div className="fixed mt-[-5.6rem] ml-6">
          {loading ? (
            <div className="bg-gray-900 rounded">
              <span className="text-lg font-sans font-bold text-indigo-600 mx-1 my-0.5">
                {progress + ' % done'}
              </span>
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col bg-indigo-600 justify-cente rounded-lg my-4 active:opacity-40 cursor-pointer">
        <button className="text-white font-bold py-1 px-9 w-full cursor-pointer">
          <span className="font-sans font-semibold cursor-pointer text-lg">
            Update Picture
          </span>
        </button>
        <input
          className="cursor-pointer fixed mt-[0.3rem] ml-[0rem] opacity-0"
          type="file"
          name="documents[]"
          accept="image/*"
          onChange={onSelectFile}
        />
      </div>

      <Modal isOpen={isModalOpen}>
        <div className="flex flex-col mx-auto px-4 md:px-16 mt-4">
          <div className="flex w-full justify-between items-center">
            <TextButton type="normal" name="Cancel" onClick={closeModal} />
            <FixedButton name="Upload" onClick={handleUploadClick} />
          </div>
          <ReactCrop
            src={src}
            onImageLoaded={onLoad}
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
          />
          <span className="font-sans font-semibold text-center text-xl text-gray-300 my-8">
            Preview
          </span>
          <div className="flex justify-center">
            <canvas
              ref={previewCanvasRef}
              style={{
                width: Math.round(completedCrop?.width ?? 0),
                height: Math.round(completedCrop?.height ?? 0),
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditAvatar;
