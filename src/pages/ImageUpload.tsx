import { UploadImage } from '../components/form/uploadImage.js'
import {useLocation} from 'react-router-dom';
import '../styles/form/imagePage.css'

export const ImageUpload = () => {
    const location = useLocation();
  return (
    <>
        <UploadImage cardId={location.state.tempCardId}/>
    </>
  )
}
