import ImagePicker from 'react-native-image-crop-picker';
import {PermissionsAndroid, Toast, Alert} from 'react-native';
import {Input} from 'native-base';

export const requestPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple(
      [
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ],
      {
        title: 'Permission',
        message: 'Storage access is requiered',
        buttonPositive: 'OK',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.warn(err);
  }
};

export const cameraImagesCover = async () => {
  try {
    const image = await ImagePicker.openCamera({
      width: 300,
      height: 400,
      mediaType: 'photo',
      // cropping: true,
    });

    return image.path;
  } catch (err) {
    console.error(err);
  }
};

export const cameraPickCover = async () => {
  console.log('i m called');
  try {
    const image = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      mediaType: 'photo',
      // cropping: true,
      // multiple: true,
    });

    return image;
  } catch (err) {
    console.error(err);
  }
};

//   export default {cameraImagesCover,cameraPickCover};
