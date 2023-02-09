import fs from 'fs';

export const replaceUrlsWithHyperlinks = (text: string) => {
  const regex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9]+\.[^\s]+)/g;
  const parts = text.split(regex);
  const matches = text.match(regex) || [];

  let result = '';
  for (let i = 0; i < parts.length; i++) {
    result += parts[i];
    if (matches[i]) {
      result += `<a href="${matches[i]}">${matches[i]}</a>`;
    }
  }

  return result;
};

// const transformTextFile = async (inputPath: string, outputPath: string) => {
//   const text = await fs.promises.readFile(inputPath, 'utf-8');
//   const transformedText = replaceUrlsWithHyperlinks(text);
//   await fs.promises.writeFile(outputPath, transformedText);
// };
