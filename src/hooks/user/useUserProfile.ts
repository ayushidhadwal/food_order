import {useEffect} from 'react';
import useSWR from 'swr';

import {Axios} from '../../lib/Axios';
import {ApiEndpoints, UserProfile} from '../../services';
import {ErrMessage} from '../../utils/toastMessages';

const fetcher = async (url: string): Promise<UserProfile> => {
  const response = await Axios.get(url);
  const status = response.status;

  if (status === 200) {
    const {id, name, email, phone, otp_verify, profile_img} =
      response.data.Data;

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

export const useUserProfile = () => {
  const {data, error, isLoading} = useSWR(
    ApiEndpoints.user.getProfile,
    fetcher,
  );

  useEffect(() => {
    if (error?.message) {
      ErrMessage(error.message);
    }
  }, [error?.message]);

  return {
    profile: data,
    isLoading,
  };
};
