import {Axios} from '../../lib/Axios';
import {ApiEndpoints} from '../ApiEndpoints';
import {ProfileFormValues, UserProfile} from './types';

export const UpdateUserProfile = async (
  profileValues: ProfileFormValues,
): Promise<UserProfile> => {
  const {
    name: userName,
    email: userEmail,
    phone: userPhone,
    userImg: userImg,
  } = profileValues;

  const formData = new FormData();
  formData.append('name', userName);
  formData.append('email', userEmail);
  formData.append('phone', userPhone);
  formData.append('profile_img', {
    name: userImg.name,
    uri: userImg.uri,
    type: userImg.type,
  });

  let config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const response = await Axios.post(
    ApiEndpoints.user.updateProfile,
    formData,
    config,
  );

  if (response.data.status) {
    const {id, name, email, phone, otp_verify, profile_img} =
      response.data.user;

    return {
      id: id,
      name: name,
      email: email,
      phone: phone,
      otpVerify: otp_verify,
      profileImg: profile_img,
    };
  } else {
    throw new Error('No data');
  }
};
