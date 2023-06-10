import { UploadImage } from '../components/form/uploadImage.js'
import {useLocation} from 'react-router-dom';
import '../styles/form/imagePage.css'

export const ImageUpload = () => {
    const location = useLocation();
    console.log('id from location:', location.state.tempCardId)
  return (
    <>
        <UploadImage cardId={location.state.tempCardId}/>
    </>
  )
}
