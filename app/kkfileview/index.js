const frame = document.createElement('iframe')
const link = 'http://localhost:5500/public/test.pdf'
const resource = encodeURIComponent('aHR0cDovL2xvY2FsaG9zdDo1NTAwL3B1YmxpYy90ZXN0LnBkZg==')
frame.src = `http://localhost:5500/api/proxy/kkfileview/onlinePreview?url=${resource}`
frame.style.height = '100%'
frame.style.width = '100%'

console.info('body', frame, link, resource)
const body = document.body
body.appendChild(frame)
