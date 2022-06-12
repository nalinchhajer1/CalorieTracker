import React, {useEffect, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {Alert, Platform, Text, TouchableOpacity} from 'react-native';
import AddFoodItemStyles from './styles/AddFoodItemStyles';
import {Ionicons} from '@expo/vector-icons';
import storage from '@react-native-firebase/storage';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';

const FoodImageContainer = ({
  loggedInUserId,
  onUserAddedImage,
  serverImage,
  onChangeImageUploadingState,
}) => {
  const [image, setImage] = useState(serverImage ? {uri: serverImage} : null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  useEffect(() => {
    setImage(serverImage ? {uri: serverImage} : null);
  }, [serverImage]);

  const uploadImage = source => {
    const {uri, name} = source;
    const filename = name ?? uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const path = `${loggedInUserId}/${filename}`;

    setUploading(true);
    onChangeImageUploadingState(true);
    setTransferred(0);
    const task = storage().ref(path).putFile(uploadUri);
    // set progress state
    task.on('state_changed', snapshot => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100,
      );
    });

    task
      .then(args => {
        return storage().ref(path).getDownloadURL();
      })
      .then(downloadUrl => {
        setTransferred(0);
        setUploading(false);
        onChangeImageUploadingState(false);
        onUserAddedImage(downloadUrl);
      })
      .catch(e => {
        Alert.alert(
          'Photo upload failed!',
          'Photo upload failed due to ' + e.toString(),
        );
        setTransferred(0);
        setUploading(false);
        onChangeImageUploadingState(false);
        setImage(null);
      });
  };

  const selectPhotoTapped = async () => {
    if (uploading === true) {
      return;
    }
    const options = {
      maxWidth: 200,
      maxHeight: 200,
      mediaType: 'photo',
    };
    try {
      await launchImageLibrary(options, response => {
        if (response.didCancel) {
          // do nothing
        } else if (response.errorMessage) {
          Alert.alert(
            'Select Image failed!',
            'Failed due to ' + response.errorMessage,
          );
        } else {
          const assets = response.assets[0];
          const source = {
            uri: assets.uri,
            type: assets.type,
            name: assets.fileName,
          };
          setImage(source);
          uploadImage(source);
        }
      });
    } catch (e) {
      Alert.alert('Select Image failed!', 'Failed due to ' + e.toString());
    }
  };

  return (
    <TouchableOpacity
      style={AddFoodItemStyles.imageContainer}
      onPress={selectPhotoTapped}>
      {image !== null ? (
        <FastImage
          source={{uri: image.uri}}
          style={AddFoodItemStyles.imageDisplay}
          opacity={uploading ? 0.2 : 1}
        />
      ) : (
        <Ionicons name={'md-camera'} size={30} color={'tomato'} />
      )}

      {transferred > 0 && (
        <Text style={AddFoodItemStyles.imageUploadProgressText}>
          {transferred}
          {'%'}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const mapStateToProps = state => ({
  loggedInUserId: state.loginState.loggedInUserId,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(FoodImageContainer);
