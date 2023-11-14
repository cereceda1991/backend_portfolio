import Client from '../schemas/client.schema';

export const generateUniqueVerificationCode = async () => {
  const min = 1000;
  const max = 9999;
  let isUnique = false;
  let code;

  while (!isUnique) {
    code = Math.floor(Math.random() * (max - min + 1)) + min;

    // Verifica la unicidad del código
    const existingClient = await Client.findOne({ verificationCode: code });
    if (!existingClient) {
      isUnique = true;
    }
  }

  return code;
};
