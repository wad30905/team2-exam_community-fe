export const replaceUrlsWithHyperlinks = (text: string) => {
  const regex =/(https?:\/\/[^\s]+)/g;

  const replacement = '<a href="$1" style="color: #5928E5; text-decoration: underline; cursor: pointer;" target="_blank">$1</a>';

  const replacedText = text.replace(regex, replacement);

  return replacedText;
}
