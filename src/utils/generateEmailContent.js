import fs from 'fs';

export const generateEmailContent = (templateName, variables) => {
  const templatePath = `public/mails/templates/${templateName}.html`;
  const templateContent = fs.readFileSync(templatePath, 'utf8');

  let emailContent = templateContent;

  for (const variable in variables) {
    emailContent = emailContent.replace(`[${variable}]`, variables[variable]);
  }

  return emailContent;
};
