import API from './API';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-simple-toast';
import {getApiKey} from '../utils/LocalStorage';

export const checkInternetConnection = () => {
    NetInfo.fetch().then((state) => {
        if (state.isConnected === false) {
      Toast.showWithGravity(
                'No internet connection',
                Toast.SHORT,
                Toast.BOTTOM,
            );
        }
    });
};

export const userLogin = async (phone, password, fcm_id, deviceId) => {
    let body = {
        emailormob: phone,
        password: password,
        fcm_id: fcm_id,
        device_id: deviceId
    };
    return await API({
        method: 'POST',
        url: 'register/login',
        data: body,
    }).then((res) => {
        return res;
    });
};

export const register = async (phone, fcm_id) => {
    let body = null;
    if (fcm_id !== '') {
        body = {
            emailormob: phone,
            action: 'signup',
            fcm_id: fcm_id,
        };
    } else {
        body = {
            emailormob: phone,
            action: 'signup',
        };
    }
    return await API({
        method: 'POST',
        url: 'register/generateOTP',
        data: body,
    }).then((res) => {
        return res;
    });
};

export const verifyOTP = async (name, phone, password, otp) => {
    const body = {
        username: name,
        emailormob: phone,
        password: password,
        otp: otp,
    };
    return await API({
        method: 'POST',
        url: 'register/signup',
        data: body,
    }).then((res) => {
        return res;
    });
};

export const forgotPassword = async (mobile) => {
    const body = {
        emailormob: mobile,
        action: 'forgotPassword',
    };
    return await API({
        method: 'POST',
        url: 'register/generateOTP',
        data: body,
    }).then((res) => {
        return res;
    });
};

export const resetPassword = async (phone, otp, password) => {
    const body = {
        emailormob: phone,
        otp: otp,
        newPassword: password,
    };
    return await API({
        method: 'POST',
        url: 'register/forgotPassword',
        data: body,
    }).then((res) => {
        return res;
    });
};

export const updateDocumentData = async (user, type, ocrReadData) => {
    const token = await getApiKey();
    let body = {
        userId: user,
        fileType: type,
        data: ocrReadData,
    };
    return await API({
        method: 'POST',
        url: `data/saveData?userId=${user}&fileType=${type}&data=${ocrReadData}`,
        data: body,
        headers: {
            Authorization: token,
        },
    }).then((res) => {
        return res;
    });
};

export const fetchUserProfileData = async (userId) => {
    const token = await getApiKey();
    let body = {
        userId: userId,
    };
    return await API({
        method: 'POST',
        url: `profile/fetchProfile`,
        data: body,
        headers: {
            Authorization: token,
        },
    }).then((res) => {
        return res;
    });
};

export const updateUserProfileData = async (data) => {
    const token = await getApiKey();
    return await API({
        method: 'POST',
        url: `profile/editBasicDetails`,
        data: data,
        headers: {
            Authorization: token,
        },
    }).then((res) => {
        return res;
    });
};

export const resendOTP = async (phone) => {
    const token = await getApiKey();
    const body = {
        emailormob: phone,
    };
    return await API({
        method: 'POST',
        url: 'users/verify_resend_otp/',
        data: body,
        headers: {
            Authorization: token,
        },
    }).then((res) => {
        return res;
    });
};

export const updateEmergencyDetailsData = async (data) => {
    const token = await getApiKey();
    return await API({
        method: 'POST',
        url: `profile/editEmergencyDetails`,
        headers: {
            Authorization: token,
        },
        data: data,
    }).then((res) => {
        return res;
    });
};

export const updateMedicalDetailsData = async (data) => {
    const token = await getApiKey();
    return await API({
        method: 'POST',
        url: `profile/editMedicalDetails`,
        data: data,
        headers: {
            Authorization: token,
        },
    }).then((res) => {
        return res;
    });
};
