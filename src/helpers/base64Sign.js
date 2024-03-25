const createSignatureFormData = (uri, fileData, name, imageName) => {
  const Region = fileData.Region;
  const BranchName = fileData.BranchName;
  const AgentName = fileData.AgentName;
  const TempUseSessionId = fileData.TempUseSessionId;
  const InstCode = fileData.InstitutionCode;
  const UploadedBy = fileData.Recruiter;
  const UserId = fileData.UserId;
  const InstName = fileData.InstName;

  const data = new FormData();
  data.append(name, {
    name: imageName,
    type: 'image/png',
    uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''),
  });
  data.append('Region', Region);
  data.append('BranchName', BranchName);
  data.append('AgentName', AgentName);
  data.append('TempUseSessionId', TempUseSessionId);
  data.append('InstCode', InstCode);
  data.append('UserId', UserId);
  data.append('UploadedBy', UploadedBy);
  data.append('InstName', InstName);
  return data;
};

const uploadBase64 = async (base64String) => {
  //Without this the FilySystem crashes with 'bad base-64'
  const base64Data = base64String.replace('data:image/png;base64,', '');
  const filename = 'signature-image-temp.png';

  try {
    const uri = FileSystem.cacheDirectory + filename;
    await FileSystem.writeAsStringAsync(uri, base64Data, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const savedUser = await AsyncStorage.getItem('loginResponse');
    if (!savedUser) return;
    const user = JSON.parse(savedUser);

    // fileData is current form state
    const docData = { ...fileData, user };

    const formData = createSignatureFormData(
      uri,
      docData,
      'Signature',
      filename
    );

    // Upload this formData
  } catch (e) {
    console.log('*Error*');
    console.log(e);
  }
};
