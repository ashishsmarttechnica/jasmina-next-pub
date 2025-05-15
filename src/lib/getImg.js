export default function getImg(url) {
  if (url) {
    return url.startsWith("http")
      ? url
      : `${process.env.NEXT_PUBLIC_IMAGE_URL}${url}`;
  }
}
