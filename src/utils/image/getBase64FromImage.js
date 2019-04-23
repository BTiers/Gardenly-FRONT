export default function getBase64FromImage(url, onSuccess, onError) {
  const xhr = new XMLHttpRequest();

  xhr.responseType = 'arraybuffer';
  xhr.open('GET', url);

  xhr.onload = () => {
    const bytes = new Uint8Array(xhr.response);
    const binary = [].map.call(bytes, byte => String.fromCharCode(byte)).join('');
    const mediaType = xhr.getResponseHeader('content-type');
    const base64 = ['data:', mediaType ? `${mediaType};` : '', 'base64,', btoa(binary)].join('');
    onSuccess(base64);
  };
  xhr.onerror = onError;
  xhr.send();
}
