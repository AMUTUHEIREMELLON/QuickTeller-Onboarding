import * as Application from 'expo-application';
import { Platform } from 'expo-modules-core';

export const getDeviceId = async () => {
    if (Platform.OS === 'android') {
      return Application.androidId;
    } else {
        let deviceId = await SecureStore.getItemAsync('deviceId');

        if (!deviceId) {
        return null;
        }

        return deviceId;
    }
};
