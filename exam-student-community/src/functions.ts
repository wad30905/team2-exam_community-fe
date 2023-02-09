export const replaceUrlsWithHyperlinks = (text: string) => {
  const regex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9]+\.[^\s]+)/g;
  // const parts = text.split(regex);
  // const matches = text.match(regex) || [];

  // let result = '';
  // for (let i = 0; i < parts.length; i++) {
  //   result += parts[i];
  //   if (matches[i]) {
  //     result += `<a href="${matches[i]}" style="color: blue; text-decoration: underline; cursor: pointer;">${matches[i]}</a>`;
  //   }
  // }

  const replacement = '<a href=//$1 style="color: #5928E5; text-decoration: underline; cursor: pointer;">$1</a>';

  const replacedText = text.replace(regex, replacement);

  return replacedText;
}
